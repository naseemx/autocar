export interface FaqItem {
  id: string;
  number: string;
  question: string;
  questionDe: string;
  questionUk?: string;
  answer: string[];
  answerDe: string[];
  answerUk?: string[];
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    number: '01',
    question: 'WHAT DOCUMENTS DO I NEED TO SELL MY CAR TO AUTOANKAUF KÖLN?',
    questionDe: 'WELCHE UNTERLAGEN BENÖTIGE ICH FÜR DEN AUTOVERKAUF BEI AUTOANKAUF KÖLN?',
    questionUk: 'ЯКІ ДОКУМЕНТИ ПОТРІБНІ ДЛЯ ПРОДАЖУ АВТО В AUTOANKAUF KÖLN?',
    answer: [
      'Registration certificate Part I & II (Fahrzeugschein & Fahrzeugbrief)',
      'Valid official photo ID (Personalausweis or passport)',
      'All available vehicle keys, service records, and current TÜV / HU reports',
      'Power of attorney (Vollmacht) if selling on behalf of another person',
    ],
    answerDe: [
      'Zulassungsbescheinigung Teil I & II (Fahrzeugschein & Fahrzeugbrief)',
      'Gültiges amtliches Ausweisdokument (Personalausweis oder Reisepass)',
      'Alle vorhandenen Fahrzeugschlüssel, Serviceheft sowie aktuelle TÜV / HU-Berichte',
      'Schriftliche Vollmacht bei Verkauf im Auftrag einer anderen Person',
    ],
    answerUk: [
      'Свідоцтво про реєстрацію (Fahrzeugschein та Fahrzeugbrief)',
      'Дійсне посвідчення особи або паспорт',
      'Всі наявні ключі, сервісна книжка та звіти про проходження техогляду (TÜV)',
      'Довіреність, якщо ви продаєте автомобіль від імені іншої особи',
    ],
  },
  {
    id: 'faq-2',
    number: '02',
    question: 'CAN I SELL A CAR WITH ENGINE DAMAGE, ACCIDENT OR WRITE-OFF?',
    questionDe: 'KANN ICH EIN AUTO MIT MOTOR-, GETRIEBE- ODER UNFALLSCHADEN VERKAUFEN?',
    questionUk: 'ЧИ МОЖНА ПРОДАТИ АВТО З ПОШКОДЖЕНИМ ДВИГУНОМ АБО ПІСЛЯ ДТП?',
    answer: [
      'Yes, absolutely! Autoankauf Köln specializes in accident-damaged car purchasing and seamless solutions when you need to sell a car with engine failure.',
      'Even if you need a specialized car buying service (no valid inspection) with expired TÜV, our international car export purchasing network ensures an honest, top valuation.',
      'You avoid high upfront repair shop bills and lengthy disputes over repair estimates.',
    ],
    answerDe: [
      'Ja, absolut! Autoankauf Köln ist auf den Unfallwagen Ankauf spezialisiert und bietet faire Lösungen, wenn Sie ein Auto mit Motorschaden verkaufen möchten.',
      'Selbst wenn Sie einen Autoankauf ohne TÜV (ohne gültige Hauptuntersuchung) benötigen, sichert unser Netzwerk für den Autoexport Ankauf beste Konditionen.',
      'Sie sparen sich teure Werkstattreparaturen und langwierigen Ärger mit Kostenvoranschlägen.',
    ],
    answerUk: [
      'Так, безумовно! Autoankauf Köln спеціалізується на викупі авто з несправними двигунами, коробками передач та після аварій.',
      'Ми чесно оцінюємо залишковий ринковий потенціал та експортний попит без заниження вартості.',
      'Ви уникаєте дорогих витрат на ремонт та тривалого очікування на СТО.',
    ],
  },
  {
    id: 'faq-3',
    number: '03',
    question: 'HOW DOES FREE DOORSTEP PICKUP & IMMEDIATE PAYOUT WORK?',
    questionDe: 'WIE FUNKTIONIEREN DIE KOSTENLOSE HAUSTÜR-ABHOLUNG & SOFORTAUSZAHLUNG?',
    questionUk: 'ЯК ПРАЦЮЄ БЕЗКОШТОВНИЙ САМОВИВІЗ ТА МИТТЄВА ОПЛАТА?',
    answer: [
      'We collect your vehicle in Cologne and across NRW directly at your doorstep 100% free of charge.',
      'Our team verifies the car on-site and issues a legally binding, safe purchase contract (Kaufvertrag).',
      'You receive your money immediately upon key handover — whether you choose to sell your car for cash on the spot or via instant real-time bank transfer.',
    ],
    answerDe: [
      'Wir holen Ihr Fahrzeug in ganz Köln und NRW direkt vor Ihrer Haustür zu 100% kostenlos ab.',
      'Unser geschultes Team prüft das Auto vor Ort und erstellt einen rechtssicheren Kaufvertrag.',
      'Sie erhalten Ihr Geld unmittelbar bei der Schlüsselübergabe – wahlweise können Sie Ihr Auto gegen Barzahlung verkaufen oder per Echtzeit-Banküberweisung.',
    ],
    answerUk: [
      'Ми забираємо ваше авто в Кельні та по всій землі Північний Рейн-Вестфалія прямо від вашого будинку абсолютно безкоштовно.',
      'Наш спеціаліст на місці оформлює офіційний договір купівлі-продажу без прихованих пунктів.',
      'Ви отримуєте кошти миттєво при передачі ключів — готівкою або швидким банківським переказом.',
    ],
  },
  {
    id: 'faq-4',
    number: '04',
    question: 'DOES AUTOANKAUF KÖLN HANDLE VEHICLE DEREGISTRATION (ABMELDUNG)?',
    questionDe: 'ÜBERNIMMT AUTOANKAUF KÖLN DIE KOSTENLOSE FAHRZEUGABMELDUNG?',
    questionUk: 'ЧИ БЕРЕ НА СЕБЕ AUTOANKAUF KÖLN ЗНЯТТЯ АВТО З ОБЛІКУ (ABMELDUNG)?',
    answer: [
      'Yes! Upon request, we take care of the official vehicle deregistration at the Zulassungsstelle completely free of charge.',
      'You will promptly receive the official certificate of deregistration (Abmeldebescheinigung) for your insurance and road tax office.',
      'This saves you valuable time, administrative hassle, and visits to public registration offices.',
    ],
    answerDe: [
      'Ja! Auf Wunsch übernehmen wir die offizielle Abmeldung bei der Zulassungsstelle komplett kostenfrei.',
      'Sie erhalten umgehend den amtlichen Abmeldenachweis für Ihre Kfz-Versicherung und das Finanzamt.',
      'So sparen Sie sich Wartezeiten, Terminstress und Gebühren bei der Behörde.',
    ],
    answerUk: [
      'Так! За вашим бажанням ми безкоштовно знімаємо автомобіль з обліку у відповідних державних органах (Zulassungsstelle).',
      'Ви отримуєте офіційну довідку про зняття з обліку для вашої страхової компанії та податкової.',
      'Це повністю позбавляє вас бюрократії, черг та витрат часу.',
    ],
  },
  {
    id: 'faq-5',
    number: '05',
    question: 'ARE THERE ANY HIDDEN CHARGES OR "UP TO" BAIT PRICES?',
    questionDe: 'GIBT ES VERSTECKTE KOSTEN ODER UNVERBINDLICHE "BIS-ZU"-LOCKPREISE?',
    questionUk: 'ЧИ Є ПРИХОВАНІ ПЛАТЕЖІ АБО МАРКЕТИНГОВІ «ДО» ЦІНИ?',
    answer: [
      'None at all. As a reputable local car buying service, Autoankauf Köln provides clear, concrete offers from the start for passenger car purchasing and used car purchasing.',
      'Our valuation is 100% free and non-binding, with zero handling fees or surprise deductions upon collection.',
      'As a private seller, you sell with peace of mind without any warranty liabilities (Ausschluss der Sachmängelhaftung).',
    ],
    answerDe: [
      'Überhaupt keine. Als seriöser lokaler Autoankauf Service bietet Autoankauf Köln von Beginn an verbindliche Festpreise für den PKW Ankauf und Gebrauchtwagenankauf.',
      'Unsere Bewertung ist 100% kostenlos und unverbindlich – ohne Servicegebühren oder nachträgliche Abzüge bei der Abholung.',
      'Als Privatverkäufer verkaufen Sie vollkommen risikofrei ohne jede Gewährleistungshaftung.',
    ],
    answerUk: [
      'Жодних прихованих комісій. На відміну від сервісів на зразок wirkaufendeinauto, Autoankauf Köln дає чітку та остаточну ціну.',
      'Оцінка є на 100% безкоштовною та ні до чого не зобовʼязує — жодних відрахувань під час передачі авто.',
      'Ви продаєте автомобіль без будь-яких гарантійних зобовʼязань чи претензій у майбутньому.',
    ],
  },
];
