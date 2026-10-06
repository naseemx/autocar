import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let val = match[2].trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  });
}

async function sendUpdatedSampleEmail() {
  const host = process.env.SMTP_HOST || 'mail.kauf-auto.de';
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });

  const reference = 'ACQ-5921';
  const brand = 'Mercedes-Benz';
  const model = 'C 220 d Avantgarde';
  const year = '2022';
  const mileage = '48.500';
  const transmission = 'Automatik (9G-TRONIC)';
  const fuelType = 'Diesel';
  const performance = '200';
  const seats = '5';
  const doors = '4';
  const vehicleType = 'Limousine';
  const ownerName = 'Michael Schneider';
  const ownerPhone = '+49 170 1234567';
  const ownerEmail = 'schneider.m@example.de';
  const locationDisplay = '10115 Berlin, Mitte';
  const priceDisplay = '€ 32.500 – € 34.000';
  const notes = '1. Hand, lückenlos scheckheftgepflegt bei Mercedes-Benz, unfallfrei, Sommer- und Winterräder vorhanden.';

  const samplePhotoUrl = 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760682/kauf-auto/images/hero-suv.jpg';

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
              <div style="font-size: 12px; font-weight: 700; color: #0F2744; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 2px solid #0F2744; padding-bottom: 6px; margin-bottom: 12px;">
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
                    <a href="tel:${ownerPhone}" style="color: #0F2744; font-weight: 700; text-decoration: underline;">${ownerPhone}</a>
                  </td>
                </tr>
                <tr style="background-color: #F8FAFC;">
                  <td style="padding: 8px 12px; color: #64748B; border-bottom: 1px solid #E2E8F0;">E-Mail-Adresse</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #E2E8F0;">
                    <a href="mailto:${ownerEmail}" style="color: #0F2744; font-weight: 600; text-decoration: underline;">${ownerEmail}</a>
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

              <div style="margin-top: 14px; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-left: 3px solid #0F2744; padding: 12px 14px; font-size: 13px;">
                <div style="font-weight: 700; color: #475569; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                  Zusätzliche Angaben des Kunden
                </div>
                <div style="color: #1E293B; line-height: 1.5; white-space: pre-line;">${notes}</div>
              </div>
            </div>

            <!-- Photo Gallery Section -->
            <div style="margin-top: 28px; padding-top: 22px; border-top: 1px solid #E2E8F0;">
              <div style="font-size: 13px; font-weight: 700; color: #0F2744; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px;">
                Fahrzeugfotos (1)
              </div>
              <p style="font-size: 12px; color: #64748B; margin: 0 0 16px 0; line-height: 1.5;">
                Klicken Sie auf ein Foto, um die hochauflösende Originalansicht mit Zoomfunktion im Browser zu öffnen:
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px;">
                      <div style="background-color: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 6px; overflow: hidden; text-align: center;">
                        <a href="${samplePhotoUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block;">
                          <img src="${samplePhotoUrl}" alt="Fahrzeugfoto 1" style="width: 100%; height: 130px; object-fit: cover; display: block; border-bottom: 1px solid #E2E8F0;" />
                          <div style="padding: 9px 8px; font-size: 11px; font-weight: 600; color: #0F2744; background-color: #F8FAFC;">
                            Foto 1 in HD öffnen
                          </div>
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Direct Action Buttons -->
            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #E2E8F0; text-align: center;">
              <a href="tel:${ownerPhone}" style="display: inline-block; background-color: #0F2744; color: #FFFFFF !important; font-weight: 600; font-size: 13px; padding: 11px 22px; border-radius: 6px; text-decoration: none; margin: 4px;">
                Telefonisch kontaktieren
              </a>
              <a href="mailto:${ownerEmail}?subject=Ihr%20Angebot%20auf%20kauf-auto.de%20(${reference})" style="display: inline-block; background-color: #1E3A5F; color: #FFFFFF !important; font-weight: 600; font-size: 13px; padding: 11px 22px; border-radius: 6px; text-decoration: none; margin: 4px;">
                Per E-Mail antworten
              </a>
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

  console.log(`Sending updated professional sample email to ${process.env.ADMIN_RECEIVER_EMAIL}...`);

  const info = await transporter.sendMail({
    from: `"Kauf-Auto" <${user}>`,
    to: process.env.ADMIN_RECEIVER_EMAIL || user,
    subject: `Fahrzeuganfrage [${reference}]: ${brand} ${model} (${year})`,
    html: htmlContent,
  });

  console.log('✅ Updated email SENT! Message ID:', info.messageId);
}

sendUpdatedSampleEmail();
