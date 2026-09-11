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
  type: 'runway' | 'editorial' | 'campaign' | 'event' | 'commercial';
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
  website: 'rupanjana.xyz',
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

export interface OutfitSet {
  id: string;
  title: string;
  category: string;
  coverImage: GalleryImage;
  images: GalleryImage[];
}

export const galleryImages: GalleryImage[] = [
  { id: 1, src: '/images/gallery/IMG_1691.PNG', alt: 'Nexus Universe Fashion Week 1', category: 'runway', aspect: 'portrait', caption: 'nexus universe fashion week 1' },
  { id: 2, src: '/images/gallery/IMG_1693.PNG', alt: 'Nexus Universe Fashion Week 1', category: 'runway', aspect: 'landscape', caption: 'nexus universe fashion week 1' },
  { id: 3, src: '/images/gallery/IMG_1696.PNG', alt: 'Nexus Universe Fashion Week 1', category: 'runway', aspect: 'portrait', caption: 'nexus universe fashion week 1' },
  { id: 4, src: '/images/gallery/IMG_1701.PNG', alt: 'Nexus Universe Fashion Week 2', category: 'runway', aspect: 'portrait', caption: 'nexus universe fashion week 2' },
  { id: 5, src: '/images/gallery/IMG_1703.PNG', alt: 'Nexus Universe Fashion Week 2', category: 'runway', aspect: 'square', caption: 'nexus universe fashion week 2' },
  { id: 6, src: '/images/gallery/IMG_1704.PNG', alt: 'Nexus Universe Fashion Week 2', category: 'runway', aspect: 'landscape', caption: 'nexus universe fashion week 2' },
  { id: 7, src: '/images/gallery/IMG_1708.PNG', alt: 'Portfolio Shoot 1', category: 'high-fashion', aspect: 'portrait', caption: 'portfolio shoot 1' },
  { id: 8, src: '/images/gallery/DSC_6048.jpeg', alt: 'Portfolio Shoot 2', category: 'editorial', aspect: 'portrait', caption: 'portfolio shoot 2' },
  { id: 9, src: '/images/gallery/DSC_6049.jpeg', alt: 'Portfolio Shoot 2', category: 'editorial', aspect: 'portrait', caption: 'portfolio shoot 2' },
  { id: 10, src: '/images/gallery/DSC_6050.jpeg', alt: 'Portfolio Shoot 2', category: 'editorial', aspect: 'portrait', caption: 'portfolio shoot 2' },
  { id: 11, src: '/images/gallery/DSC_6051.jpeg', alt: 'Portfolio Shoot 2', category: 'editorial', aspect: 'portrait', caption: 'portfolio shoot 2' },
  { id: 12, src: '/images/gallery/DSC_6059.jpeg', alt: 'Portfolio Shoot 2', category: 'editorial', aspect: 'portrait', caption: 'portfolio shoot 2' },
  { id: 13, src: '/images/gallery/DSC_6063.jpeg', alt: 'Portfolio Shoot 3', category: 'editorial', aspect: 'portrait', caption: 'portfolio shoot 3' },
  { id: 14, src: '/images/gallery/DSC_6088.jpeg', alt: 'Portfolio Shoot 3', category: 'editorial', aspect: 'portrait', caption: 'portfolio shoot 3' },
  { id: 15, src: '/images/gallery/DSC_6089.jpeg', alt: 'Portfolio Shoot 3', category: 'editorial', aspect: 'portrait', caption: 'portfolio shoot 3' },
  { id: 16, src: '/images/gallery/DSC_6090.jpeg', alt: 'Portfolio Shoot 3', category: 'editorial', aspect: 'portrait', caption: 'portfolio shoot 3' },
  { id: 17, src: '/images/gallery/DSC_6095.jpeg', alt: 'Portfolio Shoot 3', category: 'editorial', aspect: 'portrait', caption: 'portfolio shoot 3' },
  { id: 18, src: '/images/gallery/DSC_6096.jpeg', alt: 'Portfolio Shoot 3', category: 'editorial', aspect: 'portrait', caption: 'portfolio shoot 3' },
  { id: 19, src: '/images/gallery/IMG_1710.PNG', alt: 'Delhi Fashion Week 2026', category: 'runway', aspect: 'landscape', caption: 'Delhi Fashion Week 2026' },
  { id: 20, src: '/images/gallery/IMG_1711.PNG', alt: 'Delhi Fashion Week 2026', category: 'runway', aspect: 'landscape', caption: 'Delhi Fashion Week 2026' },
];

export const outfitSets: OutfitSet[] = [
  {
    id: 'nexus-1',
    title: 'Nexus Universe Fashion Week 1',
    category: 'runway',
    coverImage: galleryImages[0], // IMG_1691.PNG
    images: galleryImages.filter(img => img.caption === 'nexus universe fashion week 1'),
  },
  {
    id: 'nexus-2',
    title: 'Nexus Universe Fashion Week 2',
    category: 'runway',
    coverImage: galleryImages[3], // IMG_1701.PNG
    images: galleryImages.filter(img => img.caption === 'nexus universe fashion week 2'),
  },
  {
    id: 'portfolio-1',
    title: 'Portfolio Shoot 1',
    category: 'high-fashion',
    coverImage: galleryImages[6], // IMG_1708.PNG
    images: galleryImages.filter(img => img.caption === 'portfolio shoot 1'),
  },
  {
    id: 'portfolio-2',
    title: 'Portfolio Shoot 2',
    category: 'editorial',
    coverImage: galleryImages[7], // DSC_6048.jpeg
    images: galleryImages.filter(img => img.caption === 'portfolio shoot 2'),
  },
  {
    id: 'portfolio-3',
    title: 'Portfolio Shoot 3',
    category: 'editorial',
    coverImage: galleryImages[12], // DSC_6063.jpeg
    images: galleryImages.filter(img => img.caption === 'portfolio shoot 3'),
  },
  {
    id: 'delhi-2026',
    title: 'Delhi Fashion Week 2026',
    category: 'runway',
    coverImage: galleryImages[18], // IMG_1710.PNG
    images: galleryImages.filter(img => img.caption === 'Delhi Fashion Week 2026'),
  },
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
    title: 'Delhi Fashion Week 2026',
    description: 'Walked at Delhi Fashion Week 2026.',
    type: 'runway',
  },
  {
    id: 3,
    year: '2026',
    title: 'Flipkart commercial shoot',
    description: 'Professional commercial shoot for Flipkart',
    type: 'commercial',
  },
  {
    id: 4,
    year: '2026',
    title: 'Portfolio Shoot',
    description: 'Professional portfolio shoot showcasing versatility and form.',
    type: 'editorial',
  }
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
