export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  type: 'cars' | 'suvs';
  price: number;
  marketPrice: number;
  savings: number;
  mileage: string;
  location: string;
  verifiedOwner: string;
  ownerRating: number;
  inspectionScore: number; // e.g. 98/100
  image: string;
  fuel: string;
  transmission: string;
  vin: string;
  tags: string[];
}

export const VERIFIED_CARS: Vehicle[] = [
  {
    id: 'car-1',
    make: 'Toyota',
    model: 'RAV4 Hybrid XSE AWD',
    year: 2023,
    type: 'suvs',
    price: 32450,
    marketPrice: 36200,
    savings: 3750,
    mileage: '14,200 mi',
    location: 'South Ozone Park, NY (JFK)',
    verifiedOwner: 'Marcus Vance (Verified Owner)',
    ownerRating: 4.9,
    inspectionScore: 99,
    image: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760682/kauf-auto/images/hero-suv.jpg',
    fuel: 'Hybrid',
    transmission: 'Automatic eCVT',
    vin: '4T3W1RFV7PU***892',
    tags: ['Single Owner', 'Clean Title', 'Full Records'],
  },
  {
    id: 'car-2',
    make: 'Mercedes-Benz',
    model: 'Sprinter 2500 Passenger Van',
    year: 2022,
    type: 'suvs',
    price: 54900,
    marketPrice: 61000,
    savings: 6100,
    mileage: '28,100 mi',
    location: 'Queens Hub, NYC',
    verifiedOwner: 'David Sterling (Executive Transport)',
    ownerRating: 5.0,
    inspectionScore: 98,
    image: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760664/kauf-auto/images/badge-van.jpg',
    fuel: 'Diesel',
    transmission: '9G-Tronic',
    vin: 'WD3PF4CD6NP***412',
    tags: ['Executive Spec', 'Escrow Ready', 'Custom Audio'],
  },
  {
    id: 'car-3',
    make: 'Porsche',
    model: 'Macan GTS AWD',
    year: 2023,
    type: 'cars',
    price: 68500,
    marketPrice: 74900,
    savings: 6400,
    mileage: '11,800 mi',
    location: 'Manhattan West Side, NYC',
    verifiedOwner: 'Sarah Jenkins (Architect)',
    ownerRating: 5.0,
    inspectionScore: 100,
    image: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760694/kauf-auto/images/insight-1.jpg',
    fuel: 'Twin-Turbo V6',
    transmission: 'PDK 7-Speed',
    vin: 'WP1AB2A57PL***552',
    tags: ['Sport Chrono', 'Warranty Remaining', 'Ceramic Coated'],
  },
  {
    id: 'car-4',
    make: 'Tesla',
    model: 'Model Y Long Range AWD',
    year: 2024,
    type: 'suvs',
    price: 37800,
    marketPrice: 42500,
    savings: 4700,
    mileage: '8,400 mi',
    location: 'Brooklyn Hub, NY',
    verifiedOwner: 'Michael Chang (Software Lead)',
    ownerRating: 4.9,
    inspectionScore: 97,
    image: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760694/kauf-auto/images/insight-1.jpg',
    fuel: 'Electric (310 mi)',
    transmission: 'Direct Drive',
    vin: '7SAYGDEE1RF***314',
    tags: ['FSD Hardware 4', 'Subzero Weather Pack', 'Zero Dealer Prep'],
  },
  {
    id: 'car-5',
    make: 'Audi',
    model: 'Q5 45 TFSI Quattro',
    year: 2022,
    type: 'cars',
    price: 29900,
    marketPrice: 34500,
    savings: 4600,
    mileage: '24,500 mi',
    location: 'Staten Island Hub, NY',
    verifiedOwner: 'Olena Marchenko (Designer)',
    ownerRating: 5.0,
    inspectionScore: 98,
    image: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760682/kauf-auto/images/hero-suv.jpg',
    fuel: 'Turbo Petrol',
    transmission: 'S tronic 7-Speed',
    vin: 'WA1ANAFY9N2***671',
    tags: ['Clean Carfax', '1-Owner Privately Garaged', 'B&O Sound'],
  },
  {
    id: 'car-6',
    make: 'Subaru',
    model: 'Outback Wilderness Edition',
    year: 2023,
    type: 'suvs',
    price: 33200,
    marketPrice: 37000,
    savings: 3800,
    mileage: '18,300 mi',
    location: 'Long Island / JFK Area',
    verifiedOwner: 'Ivan Kovalchuk (Outdoor Specialist)',
    ownerRating: 4.8,
    inspectionScore: 99,
    image: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760699/kauf-auto/images/lifestyle-banner.jpg',
    fuel: 'Turbo Boxer',
    transmission: 'Lineartronic AWD',
    vin: '4S4BTANC9P3***204',
    tags: ['All-Weather Pack', 'Yakima Racks', 'Pet Guard Clean'],
  }
];
