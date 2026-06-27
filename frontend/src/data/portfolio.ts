/* ==============================================
   Portfolio Data — Rupanjana Roy
   Replace placeholder image paths with real photos
   ============================================== */

// --- Types ---

export interface GalleryImage {
  id: number;
  /** Replace with actual image path, e.g. '/images/gallery/photo-01.jpg' */
  src: string;
  alt: string;
  category: CategoryType;
  aspect: 'portrait' | 'landscape' | 'square';
  caption?: string;
}

export type CategoryType =
  | 'editorial'
  | 'commercial'
  | 'fitness'
  | 'runway'
  | 'promotions'
  | 'high-fashion';

export interface Category {
  id: CategoryType;
  title: string;
  subtitle: string;
  /** Replace with actual cover image path */
  coverImage: string;
  count: number;
}

export interface Measurement {
  label: string;
  value: string;
  numericValue?: number;
  unit?: string;
}

export interface ExperienceEntry {
  id: number;
  year: string;
  title: string;
  description: string;
  type: 'runway' | 'editorial' | 'campaign' | 'event';
}

export interface Review {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
}

// --- Profile Data ---

export const profileData = {
  name: 'Rupanjana Roy',
  firstName: 'Rupanjana',
  lastName: 'Roy',
  profession: 'Model | Talent',
  edition: 'AW 2024',
  description:
    'A dynamic, versatile talent for high fashion, editorial, and commercial campaigns. Available for assignments in Gurugram NCR and nationwide.'
};

// --- Contact Data ---

export const contactData = {
  address: 'Gurugram Sector 86',
  phone: '+91 9205007854',
  email: 'rupanjana.roy.modeling@gmail.com',
  website: 'rupanjana-portfolio.vercel.app',
};

// --- Measurements ---

export const measurements: Measurement[] = [
  { label: 'Height', value: "5'5\"", numericValue: 5.5, unit: 'ft' },
  { label: 'Weight', value: '60 kg', numericValue: 60, unit: 'kg' },
  { label: 'Eye Colour', value: 'Black' },
  { label: 'Waist', value: '30 inches', numericValue: 30, unit: 'in' },
  { label: 'Languages', value: 'Hindi, English, Bengali' },
  { label: 'Versatility and Form', value: 'Expression & poise, catwalk & high-fashion pose' },
  { label: 'Category Specialities', value: 'Fitness, commercial, editorial, runway, promotions' },
];

// --- Languages ---

export const languages = ['Hindi', 'English', 'Bengali'];

// --- Categories ---

export const categories: Category[] = [
  {
    id: 'editorial',
    title: 'Editorial',
    subtitle: 'Magazine & Print',
    coverImage: '', // Replace: '/images/categories/editorial.jpg'
    count: 12,
  },
  {
    id: 'commercial',
    title: 'Commercial',
    subtitle: 'Brand Campaigns',
    coverImage: '', // Replace: '/images/categories/commercial.jpg'
    count: 8,
  },
  {
    id: 'fitness',
    title: 'Fitness',
    subtitle: 'Activewear & Health',
    coverImage: '', // Replace: '/images/categories/fitness.jpg'
    count: 6,
  },
  {
    id: 'runway',
    title: 'Runway',
    subtitle: 'Fashion Week',
    coverImage: '', // Replace: '/images/categories/runway.jpg'
    count: 10,
  },
  {
    id: 'promotions',
    title: 'Promotions',
    subtitle: 'Events & Launches',
    coverImage: '', // Replace: '/images/categories/promotions.jpg'
    count: 5,
  },
  {
    id: 'high-fashion',
    title: 'High Fashion',
    subtitle: 'Couture & Luxury',
    coverImage: '', // Replace: '/images/categories/high-fashion.jpg'
    count: 9,
  },
];

// --- Gallery Images ---
// Replace src with actual image paths like '/images/gallery/001.jpg'

export const galleryImages: GalleryImage[] = [
  { id: 1, src: '/images/gallery/IMG_1691.PNG', alt: 'Editorial Portrait', category: 'editorial', aspect: 'portrait', caption: 'nexus universe fashion week' },
  { id: 2, src: '/images/gallery/IMG_1693.PNG', alt: 'Commercial Campaign', category: 'commercial', aspect: 'landscape', caption: 'nexus universe fashion week' },
  { id: 3, src: '/images/gallery/IMG_1696.PNG', alt: 'Runway Show', category: 'runway', aspect: 'portrait', caption: 'nexus universe fashion week' },
  { id: 4, src: '/images/gallery/IMG_1701.PNG', alt: 'High Fashion Couture', category: 'high-fashion', aspect: 'portrait', caption: 'nexus universe fashion week' },
  { id: 5, src: '/images/gallery/IMG_1703.PNG', alt: 'Fitness Activewear', category: 'fitness', aspect: 'square', caption: 'nexus universe fashion week' },
  { id: 6, src: '/images/gallery/IMG_1704.PNG', alt: 'Promotional Launch', category: 'promotions', aspect: 'landscape', caption: 'nexus universe fashion week' },
  { id: 7, src: '/images/gallery/IMG_1708.PNG', alt: 'High Fashion Runway', category: 'high-fashion', aspect: 'portrait', caption: 'portfolio shoot' },
];

// --- Experience ---

export const experienceData: ExperienceEntry[] = [
  {
    id: 1,
    year: '2026',
    title: 'Nexus Universe Fashion Week',
    description: 'Walked at the exclusive Nexus Universe Fashion Week.',
    type: 'runway',
  },
  {
    id: 2,
    year: '2026',
    title: 'Portfolio Shoot',
    description: 'Professional portfolio shoot showcasing versatility and form.',
    type: 'editorial',
  },
];

// --- Reviews ---

export const reviewsData: Review[] = [
  {
    id: 1,
    quote: 'Rupanjana brings an extraordinary presence to every shoot. Her ability to embody different moods and aesthetics is truly remarkable.',
    name: 'Arjun Mehta',
    role: 'Creative Director',
    company: 'Vogue India',
  },
  {
    id: 2,
    quote: 'Working with Rupanjana was a revelation. She understands fashion at a deeper level and translates that understanding into every frame.',
    name: 'Priya Sharma',
    role: 'Fashion Photographer',
    company: 'Studio Luxe',
  },
  {
    id: 3,
    quote: 'A true professional with an innate sense of style. Rupanjana elevated our entire campaign with her energy and grace.',
    name: 'Kabir Singh',
    role: 'Brand Manager',
    company: 'Luxe Couture',
  },
  {
    id: 4,
    quote: 'Her runway presence is magnetic. Rupanjana has the rare ability to make every garment tell a story.',
    name: 'Ananya Desai',
    role: 'Fashion Designer',
    company: 'House of Desai',
  },
];

// --- Social Links ---

export const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/ms.roy.__', icon: 'instagram' },
];

// --- Navigation ---

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
