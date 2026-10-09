import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer';

// Configure Cloudinary using existing environment credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Helper to upload a buffer to Cloudinary
function uploadBufferToCloudinary(buffer: Buffer, originalName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const cleanName = originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'kauf-auto/submissions',
        resource_type: 'image',
        public_id: `${Date.now()}_${cleanName}`,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result?.secure_url || '');
        }
      }
    );
    uploadStream.end(buffer);
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // 1. Extract Form Fields
    const reference = (formData.get('reference') as string) || `ACQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const vehicleType = (formData.get('vehicleType') as string) || 'Auto';
    const brand = (formData.get('brand') as string) || (formData.get('customBrand') as string) || '-';
    const model = (formData.get('model') as string) || (formData.get('customModel') as string) || '-';
    const rawYear = (formData.get('year') as string) || '';
    const customYear = (formData.get('customYear') as string) || '';
    const year = (rawYear === 'Other' && customYear ? customYear : rawYear) || customYear || '-';
    const transmission = (formData.get('transmission') as string) || (formData.get('customTransmission') as string) || '-';
    const fuelType = (formData.get('fuelType') as string) || (formData.get('customFuelType') as string) || '-';
    const mileage = (formData.get('mileage') as string) || '-';
    const performance = (formData.get('performance') as string) || '-';
    const seats = (formData.get('seats') as string) || '-';
    const doors = (formData.get('doors') as string) || '-';

    const ownerName = (formData.get('ownerName') as string) || 'Unbekannt';
    const ownerPhone = (formData.get('ownerPhone') as string) || '-';
    const ownerEmail = (formData.get('ownerEmail') as string) || '';
    const ownerCity = (formData.get('ownerCity') as string) || '-';
    const ownerAddress = (formData.get('ownerAddress') as string) || '';
    const ownerPostalCode = (formData.get('ownerPostalCode') as string) || '';
    const priceMin = (formData.get('priceMin') as string) || '';
    const priceMax = (formData.get('priceMax') as string) || '';
    const notes = (formData.get('notes') as string) || '';

    // 2. Upload images to Cloudinary concurrently
    const fileEntries = formData.getAll('images');
    const imageUrls: string[] = [];

    const uploadPromises: Promise<string>[] = [];
    for (const entry of fileEntries) {
      if (entry instanceof File && entry.size > 0) {
        const file = entry;
        const uploadTask = (async () => {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          return await uploadBufferToCloudinary(buffer, file.name || 'car-photo');
        })();
        uploadPromises.push(uploadTask);
      }
    }

    if (uploadPromises.length > 0) {
      const results = await Promise.all(uploadPromises);
      imageUrls.push(...results.filter((url) => Boolean(url)));
    }

    // 3. Prepare Email Transporter
    const smtpHost = process.env.SMTP_HOST || 'mail.kauf-auto.de';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : smtpPort === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.ADMIN_RECEIVER_EMAIL || process.env.SMTP_USER || 'ankauf@kauf-auto.de';
    const fromAddress = process.env.SMTP_FROM || `"Kauf-Auto Ankauf" <${smtpUser || 'ankauf@kauf-auto.de'}>`;

    if (!smtpUser || !smtpPass) {
      console.warn('⚠️ SMTP_USER or SMTP_PASS is missing in environment variables. Email will not be dispatched.');
      return NextResponse.json({
        success: true,
        reference,
        imageUrls,
        warning: 'Form saved and images uploaded, but SMTP credentials are not configured yet in .env.local',
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false, // Prevents certificate domain mismatch errors with Plesk VPS
      },
    });

    // 4. Build Professional Corporate Email Template (Zero emojis, high-contrast, email-client resilient)
    const priceDisplay = priceMin || priceMax
      ? `${priceMin ? `€ ${Number(priceMin).toLocaleString('de-DE')}` : ''} ${priceMin && priceMax ? '–' : ''} ${priceMax ? `€ ${Number(priceMax).toLocaleString('de-DE')}` : ''}`
      : 'Keine Angabe';

    const locationDisplay = [ownerPostalCode, ownerCity, ownerAddress].filter(Boolean).join(', ') || '-';

    const photoGalleryHtml = imageUrls.length > 0
      ? `
        <div style="margin-top: 28px; padding-top: 22px; border-top: 1px solid #E2E8F0;">
          <div style="font-size: 13px; font-weight: 700; color: #0F2744; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px;">
            Fahrzeugfotos (${imageUrls.length})
          </div>
          <p style="font-size: 12px; color: #64748B; margin: 0 0 16px 0; line-height: 1.5;">
            Klicken Sie auf ein Foto, um die hochauflösende Originalansicht mit Zoomfunktion im Browser zu öffnen:
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px;">
                  ${imageUrls.map((url, i) => `
                    <div style="background-color: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 6px; overflow: hidden; text-align: center;">
                      <a href="${url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block;">
                        <img src="${url}" alt="Fahrzeugfoto ${i + 1}" style="width: 100%; height: 130px; object-fit: cover; display: block; border-bottom: 1px solid #E2E8F0;" />
                        <div style="padding: 9px 8px; font-size: 11px; font-weight: 600; color: #0F2744; background-color: #F8FAFC;">
                          Foto ${i + 1} in HD öffnen
                        </div>
                      </a>
                    </div>
                  `).join('')}
                </div>
              </td>
            </tr>
          </table>
        </div>
      `
      : `
        <div style="margin-top: 24px; padding: 14px 18px; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; color: #64748B; font-size: 13px;">
          Keine Fotos vom Verkäufer übermittelt.
        </div>
      `;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fahrzeuganfrage ${reference}</title>
      </head>
      <body style="margin: 0; padding: 24px 12px; background-color: #EEF2F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A; -webkit-font-smoothing: antialiased;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #D1D5DB; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          
          <!-- Corporate Header (Solid High-Contrast Navy Background) -->
          <tr>
            <td bgcolor="#0F2744" style="background-color: #0F2744; border-top: 4px solid #1D4ED8; padding: 26px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; color: #93C5FD !important; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                      KAUF-AUTO.DE &bull; FAHRZEUGANKAUF
                    </div>
                    <h1 style="margin: 0 0 10px 0; font-size: 21px; font-weight: 700; color: #FFFFFF !important; line-height: 1.3;">
                      Neue Fahrzeuganfrage: ${brand} ${model}
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #1E3A5F; border: 1px solid #3B82F6; color: #FFFFFF !important; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;">
                      REFERENZ-NR: ${reference}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 28px 32px;">

              <!-- Vehicle Data Section -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #0F2744; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 2px solid #0F2744; padding-bottom: 6px; margin-bottom: 12px;">
                  Fahrzeugdaten
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; line-height: 1.5;">
                  <tr style="background-color: #F8FAFC;">
                    <td style="padding: 8px 12px; color: #64748B; width: 42%; font-weight: 600; border-bottom: 1px solid #E2E8F0;">Marke &amp; Modell</td>
                    <td style="padding: 8px 12px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">${brand} ${model}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">Erstzulassung</td>
                    <td style="padding: 8px 12px; color: #0F172A; font-weight: 500; border-bottom: 1px solid #E2E8F0;">${year}</td>
                  </tr>
                  <tr style="background-color: #F8FAFC;">
                    <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">Kilometerstand</td>
                    <td style="padding: 8px 12px; color: #0F172A; font-weight: 600; border-bottom: 1px solid #E2E8F0;">${mileage} km</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">Getriebe</td>
                    <td style="padding: 8px 12px; color: #0F172A; font-weight: 500; border-bottom: 1px solid #E2E8F0;">${transmission}</td>
                  </tr>
                  <tr style="background-color: #F8FAFC;">
                    <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">Kraftstoffart</td>
                    <td style="padding: 8px 12px; color: #0F172A; font-weight: 500; border-bottom: 1px solid #E2E8F0;">${fuelType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">Leistung</td>
                    <td style="padding: 8px 12px; color: #0F172A; font-weight: 500; border-bottom: 1px solid #E2E8F0;">${performance} PS</td>
                  </tr>
                  <tr style="background-color: #F8FAFC;">
                    <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">Sitze / Türen</td>
                    <td style="padding: 8px 12px; color: #0F172A; font-weight: 500; border-bottom: 1px solid #E2E8F0;">${seats} Sitze &bull; ${doors} Türen</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">Fahrzeugkategorie</td>
                    <td style="padding: 8px 12px; color: #0F172A; font-weight: 500; border-bottom: 1px solid #E2E8F0;">${vehicleType}</td>
                  </tr>
                </table>
              </div>

              <!-- Seller & Valuation Section -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #0F1724; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 2px solid #0F2744; padding-bottom: 6px; margin-bottom: 12px;">
                  Kontaktdaten &amp; Preisvorstellung
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; line-height: 1.5;">
                  <tr style="background-color: #F8FAFC;">
                    <td style="padding: 8px 12px; color: #64748B; width: 42%; font-weight: 600; border-bottom: 1px solid #E2E8F0;">Name</td>
                    <td style="padding: 8px 12px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">${ownerName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">Telefonnummer</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">
                      ${ownerPhone !== '-' ? `<a href="tel:${ownerPhone}" style="color: #0F2744; font-weight: 700; text-decoration: underline;">${ownerPhone}</a>` : '-'}
                    </td>
                  </tr>
                  <tr style="background-color: #F8FAFC;">
                    <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">E-Mail-Adresse</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">
                      ${ownerEmail ? `<a href="mailto:${ownerEmail}" style="color: #0F2744; font-weight: 600; text-decoration: underline;">${ownerEmail}</a>` : '-'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">Standort</td>
                    <td style="padding: 8px 12px; color: #0F172A; font-weight: 500; border-bottom: 1px solid #E2E8F0;">${locationDisplay}</td>
                  </tr>
                  <tr style="background-color: #F8FAFC;">
                    <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">Preisvorstellung</td>
                    <td style="padding: 8px 12px; color: #0F2744; font-weight: 800; font-size: 14px; border-bottom: 1px solid #E2E8F0;">${priceDisplay}</td>
                  </tr>
                </table>

                ${notes ? `
                  <div style="margin-top: 14px; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-left: 3px solid #0F2744; padding: 12px 14px; font-size: 13px;">
                    <div style="font-weight: 700; color: #475569; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                      Zusätzliche Angaben des Kunden
                    </div>
                    <div style="color: #1E293B; line-height: 1.5; white-space: pre-line;">${notes}</div>
                  </div>
                ` : ''}
              </div>

              <!-- Photo Gallery Section -->
              ${photoGalleryHtml}

              <!-- Direct Action Buttons -->
              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #E2E8F0; text-align: center;">
                ${ownerPhone && ownerPhone !== '-' ? `
                  <a href="tel:${ownerPhone}" style="display: inline-block; background-color: #0F2744; color: #FFFFFF !important; font-weight: 600; font-size: 13px; padding: 11px 22px; border-radius: 6px; text-decoration: none; margin: 4px;">
                    Telefonisch kontaktieren
                  </a>
                ` : ''}
                ${ownerEmail ? `
                  <a href="mailto:${ownerEmail}?subject=Ihr%20Angebot%20auf%20kauf-auto.de%20(${reference})" style="display: inline-block; background-color: #1E3A5F; color: #FFFFFF !important; font-weight: 600; font-size: 13px; padding: 11px 22px; border-radius: 6px; text-decoration: none; margin: 4px;">
                    Per E-Mail antworten
                  </a>
                ` : ''}
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#F8FAFC" style="background-color: #F8FAFC; padding: 16px 32px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 11px; color: #64748B;">
              Kauf-Auto Ankaufsportal &bull; Eingegangen am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })} &bull; Vertrauliche Kundenanfrage
            </td>
          </tr>

        </table>
      </body>
      </html>
    `;

    // 5. Send Mail via Nodemailer (No emojis in subject line)
    await transporter.sendMail({
      from: fromAddress,
      to: receiverEmail,
      replyTo: ownerEmail || undefined,
      subject: `Fahrzeuganfrage [${reference}]: ${brand} ${model} (${year})`,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      reference,
      imageUrls,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Interner Serverfehler beim Verarbeiten des Formulars.';
    console.error('API submission error:', error);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
