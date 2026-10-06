# E-Mail & Formular-Konfigurationsanleitung (Kauf-Auto)

Dieses Dokument erklärt Schritt für Schritt, wie das Fahrzeugankaufs-Formular mit **Cloudinary** (Bildspeicher & Zoom-Vorschau) und **Plesk SMTP / Nodemailer** (E-Mail-Zustellung) eingerichtet und konfiguriert ist.

---

## 1. Übersicht & Funktionsweise (Option 1)

```
[ Kunde füllt Formular aus & wählt Fotos ]
                     │
                     ▼
       [ Next.js API (/api/acquisition) ]
         │                            │
         ▼ (Fotos hochladen)          ▼ (Fahrzeugdaten + Bild-Links)
   [ Cloudinary CDN ]        [ Nodemailer (Plesk SMTP) ]
         │                            │
         ▼ (Sichere CDN URLs)         ▼
   [ Schnelle Speicherung ]    [ E-Mail an ankauf@kauf-auto.de ]
                                      │
                                      ▼
                      [ Postfach / Smartphone / Desktop ]
                      • HTML-Übersicht aller Fahrzeugdaten
                      • Kundenkontakt mit Klick-Anruf (tel:) & E-Mail (mailto:)
                      • Foto-Galerie mit Direkt-Zoom in voller HD-Auflösung
```

### Warum diese Lösung?
- **Keine Dateigrößen-Probleme**: Smartphone-Fotos sind oft 5–15 MB groß. Wenn 5 Fotos angehängt werden (50 MB), blockieren E-Mail-Server und Hosting-Limits (Vercel 4.5 MB Limit) den Upload.
- **Beste Bildqualität**: Fotos werden in Originalauflösung auf Cloudinary gespeichert.
- **Klick- & Zoom-Funktion**: In der E-Mail sieht der Empfänger übersichtliche Vorschaubilder. Ein Klick/Tipp auf ein beliebiges Bild öffnet sofort die hochauflösende Originalansicht im Browser mit nativer **Pinch-to-Zoom** (Fingerzoom am Handy) und **Doppelklick-Vergrößerung** zur genauen Schadens- und Zustandsbegutachtung.

---

## 2. Schritt 1: E-Mail-Konto in Plesk erstellen

Basierend auf Ihrem Plesk-Bildschirm (`https://85.214.12.58/.../kauf-auto.de`):

1. **E-Mail-Adresse**: Tragen Sie z. B. `ankauf` ein (Ergibt: `ankauf@kauf-auto.de`).
2. **Passwort**:
   - Klicken Sie auf **Generieren** (oder vergeben Sie ein sicheres Kennwort).
   - Klicken Sie auf **Anzeigen** und **kopieren Sie dieses Passwort**. Sie benötigen es für die `.env.local` Datei.
3. **Mailbox**: Lassen Sie **Standardgröße (Unbegrenzt)** ausgewählt.
4. **Speichern**: Klicken Sie unten auf **OK**.

---

## 3. Schritt 2: DNS & Spam-Schutz konfigurieren (Sehr wichtig!)

Da Ihr Server auf der IP `85.214.12.58` läuft, verlangen Empfänger wie Gmail, Outlook und Web.de korrekte DNS-Einträge, damit Ihre E-Mails zuverlässig im Posteingang landen:

### A. SPF-Record (TXT)
Stellen Sie sicher, dass in den DNS-Einstellungen von `kauf-auto.de` folgender TXT-Eintrag existiert:
```txt
v=spf1 +a +mx +ip4:85.214.12.58 ~all
```

### B. DKIM-Signierung in Plesk aktivieren
1. In Plesk zu **Websites & Domains** > **kauf-auto.de** > **E-Mail-Einstellungen** gehen.
2. Haken setzen bei: **"DKIM-Spamschutzsystem zum Signieren ausgehender E-Mail-Nachrichten verwenden"**.
3. Auf **OK** klicken.

### C. SSL-Zertifikat für Mail aktivieren
1. In Plesk unter **SSL/TLS-Zertifikate** (Let's Encrypt).
2. Sicherstellen, dass die Option **"Mailserver schützen"** / **"Webmail schützen"** aktiviert ist.

---

## 4. Schritt 3: Umgebungsvariablen in `.env.local` eintragen

Öffnen Sie die Datei `.env.local` im Projektordner und tragen Sie Ihre Verbindungsdaten ein:

```env
# Cloudinary (bereits konfiguriert)
CLOUDINARY_CLOUD_NAME=dymoyukvh
CLOUDINARY_API_KEY=734421858714561
CLOUDINARY_API_SECRET=POcwL5viCA-ZGL2NDtLjBMrvObs

# Plesk SMTP E-Mail-Konfiguration (Bereits aktiv & verifiziert)
SMTP_HOST=mail.kauf-auto.de
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=website@kauf-auto.de
SMTP_PASS=Ibrahimellahib1989-
SMTP_FROM="Kauf-Auto" <website@kauf-auto.de>
ADMIN_RECEIVER_EMAIL=website@kauf-auto.de
```

> [!NOTE]
> Falls `mail.kauf-auto.de` noch nicht auflöst, können Sie als Übergangslösung direkt die Server-IP verwenden:
> `SMTP_HOST=85.214.12.58`

---

## 5. Implementierte Dateien im Projekt

| Datei | Funktion |
| :--- | :--- |
| `src/app/api/acquisition/route.ts` | **Server-Endpunkt**: Nimmt FormData entgegen, lädt Fotos parallel zu Cloudinary hoch (`folder: kauf-auto/submissions`), generiert die formatierte E-Mail-Vorlage und versendet sie über Plesk SMTP. |
| `src/components/AcquisitionBar.tsx` | **Frontend-Formular**: Behält die Originaldateien (`File`-Objekte), zeigt beim Absenden einen Ladespinner (`Wird übertragen...`) und sendet alles per `POST` an die API. |
| `.env.local` | Enthält alle Zugangsdaten für Cloudinary und SMTP. |

---

## 6. E-Mail-Layout & Zoom-Funktion

Die empfangene E-Mail enthält:
1. **Fahrzeugübersicht**: Marke, Modell, Baujahr, Kilometerstand, Getriebe, Kraftstoff, Leistung (PS), Sitze, Türen.
2. **Kundenkontakt**:
   - Name, Postleitzahl, Ort, Straße.
   - **Klickbare Telefonnummer**: Direkter Anruf per Klick auf Mobilgeräten.
   - **Klickbare E-Mail-Adresse**: Öffnet direkt das E-Mail-Antwortfenster (`replyTo` ist auf den Kunden gesetzt).
   - Preisvorstellung des Kunden (€).
   - Zusätzliche Notizen / Bemerkungen.
3. **Fotogalerie**:
   - Jedes Foto wird als Karte mit Vorschau gerendert.
   - Unter jedem Bild befindet sich ein Button: **"🔍 Foto in HD öffnen (Zoom)"**.
   - Beim Antippen/Anklicken öffnet sich das Foto in voller Auflösung auf dem Cloudinary CDN – dort kann mit zwei Fingern beliebig nah hineingezoomt werden.

---

## 7. Testen & Fehlerbehebung (Troubleshooting)

### Test durchführen:
1. Tragen Sie das Passwort in `.env.local` ein.
2. Starten Sie den Dev-Server:
   ```bash
   npm run dev
   ```
3. Öffnen Sie die Website, füllen Sie die 3 Schritte im Ankaufsbalken aus, fügen Sie 1–2 Fotos hinzu und klicken Sie auf **"Fahrzeug zur Bewertung einreichen"**.
4. Prüfen Sie das Postfach von `ankauf@kauf-auto.de` (z. B. über Plesk Webmail `https://webmail.kauf-auto.de` oder Ihr Mailprogramm).

### Häufige Fehlermeldungen:

* **Fehler: `535 Incorrect authentication data`**
  * *Ursache*: Falsches Passwort oder falscher Benutzername in `SMTP_USER` / `SMTP_PASS`.
  * *Lösung*: Passwort in Plesk zurücksetzen und in `.env.local` aktualisieren.

* **Fehler: `ETIMEDOUT` auf Port 465**
  * *Ursache*: Port 465 wird von einem zwischengeschalteten Router/Firewall blockiert.
  * *Lösung*: Wechseln Sie in `.env.local` auf Port 587:
    ```env
    SMTP_PORT=587
    SMTP_SECURE=false
    ```

* **Zertifikatsfehler (`SELF_SIGNED_CERT_IN_CHAIN`)**
  * *Status*: Bereits im Code abgesichert durch `tls: { rejectUnauthorized: false }` in `route.ts`. Funktioniert auch, wenn noch kein Zertifikat an den Maildienst gebunden ist.
