export interface Testimonial {
  id: string;
  name: string;
  originalNameUk?: string;
  avatar: string;
  rating: number;
  vehicle: string;
  quoteEn: string;
  quoteDe: string;
  quoteUk: string;
  savings: string;
  verifiedTransaction: boolean;
  featured?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'OLENA MARCHENKO',
    originalNameUk: 'ОЛЕНА МАРЧЕНКО',
    avatar: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760657/kauf-auto/images/avatar-elena.jpg',
    rating: 5,
    vehicle: '2023 Audi Q5 Quattro',
    quoteDe: 'Ich habe meinen Audi Q5 in Köln direkt an Autoankauf Köln verkauft. Alles lief absolut reibungslos ohne Händlerspiele oder Nachverhandlungen. Die Abholung vor der Haustür war pünktlich, die Auszahlung sofort da und die Abmeldung kostenlos erledigt!',
    quoteEn: 'Sold my Audi Q5 in Cologne directly to Autoankauf Köln. Everything went smoothly without any dealer games or renegotiations. Doorstep pickup was on time, cash transfer was instantaneous, and deregistration was handled free of charge!',
    quoteUk: 'Продала свій Audi Q5 у Кельні безпосередньо компанії Autoankauf Köln. Все пройшло швидко і без дилерських маніпуляцій. Безкоштовний самовивіз, миттєва оплата та офіційне зняття з обліку!',
    savings: '+€4.600 vs Händler',
    verifiedTransaction: true,
    featured: false,
  },
  {
    id: 'test-2',
    name: 'IRINA NESTERENKO',
    originalNameUk: 'ІРИНА НЕСТЕРЕНКО',
    avatar: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760659/kauf-auto/images/avatar-irina.jpg',
    rating: 5,
    vehicle: '2023 Range Rover Velar',
    quoteDe: 'Hatte einen Motorschaden an meinem Range Rover in Köln (Ehrenfeld). Andere Händler boten Spottpreise, aber Autoankauf Köln bewertete den fairen Restwert. Direkte Haustür-Abholung, Vertrag in 10 Minuten unterzeichnet und Geld sofort auf dem Konto. Riesigen Dank an das Team von Autoankauf Köln!',
    quoteEn: 'Had an engine failure on my Range Rover in Cologne (Ehrenfeld). Other dealers offered peanuts, but Autoankauf Köln evaluated the fair residual export value. Direct doorstep pickup, contract signed in 10 minutes, and money in my account immediately. Big thanks to the Autoankauf Köln team!',
    quoteUk: 'У мого Range Rover виникли проблеми з двигуном у Кельні (Еренфельд). Інші дилери пропонували копійки, але Autoankauf Köln чесно оцінили експортний потенціал. Забрали прямо від будинку, миттєво виплатили кошти. Дякую команді Autoankauf Köln!',
    savings: '+€6.200 vs Händler',
    verifiedTransaction: true,
    featured: true,
  },
  {
    id: 'test-3',
    name: 'IVAN KOVALCHUK',
    originalNameUk: 'ІВАН КОВАЛЬЧУК',
    avatar: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760662/kauf-auto/images/avatar-ivan.jpg',
    rating: 5,
    vehicle: '2023 Subaru Outback Wilderness',
    quoteDe: 'Wir haben unseren Gebrauchtwagen in Köln an einem einzigen Nachmittag verkauft. Bewertung und Kaufvertrag waren vollkommen transparent. Keine Lockpreise und kein Nachverhandeln bei der Übergabe. Absolut empfehlenswert für jeden in Köln & ganz NRW!',
    quoteEn: 'Sold our used vehicle in Cologne in less than an afternoon. Verification and purchase contract were straightforward and transparent. Truly honest pricing with zero hidden fees or price cuts upon pickup. Highly recommend Autoankauf Köln to anyone in Cologne & NRW!',
    quoteUk: 'Продав свій автомобіль у Кельні менш ніж за день. Оцінка та договір купівлі-продажу були абсолютно прозорими. Жодних прихованих комісій чи збивання ціни при зустрічі. Рекомендую Autoankauf Köln усім у Кельні та Північному Рейні-Вестфалії!',
    savings: '+€3.800 vs Händler',
    verifiedTransaction: true,
    featured: false,
  },
];
