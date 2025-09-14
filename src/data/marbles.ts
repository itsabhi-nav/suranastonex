export interface Marble {
  id: string;
  name: string;
  color: string;
  priceContact: string;
  origin: string;
  description: string;
  image: string; // Primary image for cards
  images?: string[]; // Additional images for detail page
  size: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  category: string;
  patterns: string[];
  material: string;
  finish: string;
  sellingStatus: 'Selling Fast' | 'Best Seller' | 'Out of Stock' | 'New Arrival';
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publicId?: string; // Cloudinary public ID for primary image
  publicIds?: string[]; // Cloudinary public IDs for additional images
}

// Default marbles data - can be overridden by admin panel
const defaultMarbles: Marble[] = [
  {
    id: '1',
    name: 'Carrara White',
    color: 'White with Gray Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Carrara, Italy',
    description: 'Classic Italian marble with elegant gray veining on pure white background. The most popular marble for luxury interiors and sculptures.',
    image: '/Carrara White.png',
    size: '60x60cm',
    rarity: 'common',
    category: 'Classic',
    patterns: ['Veining', 'Classic'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'Selling Fast'
  },
  {
    id: '2',
    name: 'Calacatta Gold',
    color: 'White with Gold Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Carrara, Italy',
    description: 'Premium Italian marble featuring dramatic gold veining on white background. Highly sought after for luxury kitchen countertops.',
    image: '/Calacatta-Gold.png',
    size: '60x60cm',
    rarity: 'rare',
    category: 'Premium',
    patterns: ['Gold Veining', 'Dramatic'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'Best Seller'
  },
  {
    id: '3',
    name: 'Nero Marquina',
    color: 'Deep Black with White Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Marquina, Spain',
    description: 'Stunning black marble with striking white veining. Perfect for creating bold contrasts in modern interiors.',
    image: '/Onyx Black.png',
    size: '60x60cm',
    rarity: 'uncommon',
    category: 'Modern',
    patterns: ['White Veining', 'Bold Contrast'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'New Arrival'
  },
  {
    id: '4',
    name: 'Statuario',
    color: 'White with Gray Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Carrara, Italy',
    description: 'Premium white marble with distinctive gray veining. Used by Michelangelo for his sculptures, representing the pinnacle of marble artistry.',
    image: '/Statuario.png',
    size: '60x60cm',
    rarity: 'rare',
    category: 'Premium',
    patterns: ['Distinctive Veining', 'Artistic'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'Out of Stock'
  },
  {
    id: '5',
    name: 'Emperador Dark',
    color: 'Dark Brown with White Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Spain',
    description: 'Rich dark brown marble with elegant white veining. Adds warmth and sophistication to any space.',
    image: '/Emperador.png',
    size: '60x60cm',
    rarity: 'uncommon',
    category: 'Warm',
    patterns: ['Brown Base', 'White Veins'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'Selling Fast'
  },
  {
    id: '6',
    name: 'Bianco Venatino',
    color: 'White with Subtle Gray Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Italy',
    description: 'Clean white marble with subtle gray veining. Perfect for minimalist designs and contemporary spaces.',
    image: '/Carrara White.png',
    size: '60x60cm',
    rarity: 'common',
    category: 'Minimalist',
    patterns: ['Subtle Veining', 'Clean'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'Best Seller'
  },
  {
    id: '7',
    name: 'Crema Marfil',
    color: 'Cream with Light Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Spain',
    description: 'Warm cream-colored marble with light veining. Creates a cozy and inviting atmosphere in any room.',
    image: '/italian.png',
    size: '60x60cm',
    rarity: 'common',
    category: 'Warm',
    patterns: ['Cream Base', 'Light Veins'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'New Arrival'
  },
  {
    id: '8',
    name: 'Arabescato Corchia',
    color: 'White with Gray Swirls',
    priceContact: 'Contact for Best Pricing',
    origin: 'Italy',
    description: 'Elegant white marble with beautiful gray swirl patterns. Each slab is unique with its own artistic design.',
    image: '/italian.png',
    size: '60x60cm',
    rarity: 'rare',
    category: 'Artistic',
    patterns: ['Swirl Patterns', 'Unique Design'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'Best Seller'
  },
  {
    id: '9',
    name: 'Rosso Levanto',
    color: 'Red with White Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Italy',
    description: 'Bold red marble with striking white veining. Makes a dramatic statement in any interior design.',
    image: '/Rosso-Levanto.png',
    size: '60x60cm',
    rarity: 'uncommon',
    category: 'Bold',
    patterns: ['Red Base', 'White Veins'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'Out of Stock'
  },
  {
    id: '10',
    name: 'Verde Alpi',
    color: 'Green with White Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Italy',
    description: 'Unique green marble with white veining. Brings the beauty of nature indoors with its forest-like appearance.',
    image: '/blue.png',
    size: '60x60cm',
    rarity: 'uncommon',
    category: 'Natural',
    patterns: ['Green Base', 'Natural Veins'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'New Arrival'
  },
  {
    id: '11',
    name: 'Bardiglio',
    color: 'Gray with White Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Italy',
    description: 'Sophisticated gray marble with white veining. Perfect for modern and industrial-style interiors.',
    image: '/italian.png',
    size: '60x60cm',
    rarity: 'common',
    category: 'Modern',
    patterns: ['Gray Base', 'Modern Veins'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'Best Seller'
  },
  {
    id: '12',
    name: 'Portoro',
    color: 'Black with Gold Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Italy',
    description: 'Luxurious black marble with golden veining. The most expensive and exclusive marble, perfect for high-end projects.',
    image: '/Onyx Black.png',
    size: '60x60cm',
    rarity: 'legendary',
    category: 'Luxury',
    patterns: ['Black Base', 'Gold Veins'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'Selling Fast'
  },
  {
    id: '13',
    name: 'Botticino',
    color: 'Light Beige',
    priceContact: 'Contact for Best Pricing',
    origin: 'Italy',
    description: 'Warm light beige marble with subtle veining. Creates a timeless and elegant atmosphere in any space.',
    image: '/italian.png',
    size: '60x60cm',
    rarity: 'common',
    category: 'Classic',
    patterns: ['Beige Base', 'Subtle Veins'],
    material: 'Natural Marble',
    finish: 'Polished',
    sellingStatus: 'Selling Fast'
  },
  {
    id: '14',
    name: 'Travertine Silver',
    color: 'Silver Gray',
    priceContact: 'Contact for Best Pricing',
    origin: 'Turkey',
    description: 'Elegant silver-gray travertine with natural holes and texture. Perfect for rustic and Mediterranean-style interiors.',
    image: '/italian.png',
    size: '60x60cm',
    rarity: 'uncommon',
    category: 'Rustic',
    patterns: ['Natural Holes', 'Textured'],
    material: 'Natural Travertine',
    finish: 'Honed',
    sellingStatus: 'New Arrival'
  },
  {
    id: '15',
    name: 'Onyx Gold',
    color: 'Translucent Gold',
    priceContact: 'Contact for Best Pricing',
    origin: 'Pakistan',
    description: 'Rare translucent onyx with golden hues. When backlit, creates a stunning luminous effect perfect for feature walls.',
    image: '/orynx.png',
    size: '60x60cm',
    rarity: 'legendary',
    category: 'Exotic',
    patterns: ['Translucent', 'Golden Hues'],
    material: 'Natural Onyx',
    finish: 'Polished',
    sellingStatus: 'Selling Fast'
  },
  {
    id: '16',
    name: 'Quartzite Taj Mahal',
    color: 'White with Gray Veins',
    priceContact: 'Contact for Best Pricing',
    origin: 'Brazil',
    description: 'Durable quartzite with the appearance of marble. Perfect for high-traffic areas while maintaining marble aesthetics.',
    image: '/italian.png',
    size: '60x60cm',
    rarity: 'rare',
    category: 'Durable',
    patterns: ['Marble-like', 'Durable'],
    material: 'Natural Quartzite',
    finish: 'Polished',
    sellingStatus: 'Out of Stock'
  }
];

// Function to get marbles from API or default data
export const getMarbles = async (): Promise<Marble[]> => {
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/marbles');
      if (response.ok) {
        const data = await response.json();
        // If no admin data exists, return default marbles
        return data.marbles && data.marbles.length > 0 ? data.marbles : defaultMarbles;
      }
    } catch (error) {
      console.error('Error fetching marbles:', error);
    }
  }
  return defaultMarbles;
};

// Synchronous version for backward compatibility (returns default data)
export const getMarblesSync = (): Marble[] => {
  return defaultMarbles;
};

// Export default marbles for backward compatibility
export const marbles = defaultMarbles;

export const getMarbleById = (id: string): Marble | undefined => {
  return defaultMarbles.find(marble => marble.id === id);
};

export const getMarblesByCategory = (category: string): Marble[] => {
  return defaultMarbles.filter(marble => marble.category.toLowerCase() === category.toLowerCase());
};

export const getMarblesByRarity = (rarity: string): Marble[] => {
  return defaultMarbles.filter(marble => marble.rarity === rarity);
};

export const getMarblesByOrigin = (origin: string): Marble[] => {
  return defaultMarbles.filter(marble => marble.origin.toLowerCase().includes(origin.toLowerCase()));
};

export const searchMarbles = (query: string): Marble[] => {
  const lowercaseQuery = query.toLowerCase();
  return defaultMarbles.filter(marble => 
    marble.name.toLowerCase().includes(lowercaseQuery) ||
    marble.color.toLowerCase().includes(lowercaseQuery) ||
    marble.origin.toLowerCase().includes(lowercaseQuery) ||
    marble.description.toLowerCase().includes(lowercaseQuery) ||
    marble.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getUniqueCategories = (): string[] => {
  return [...new Set(defaultMarbles.map(marble => marble.category))];
};

export const getUniqueOrigins = (): string[] => {
  return [...new Set(defaultMarbles.map(marble => marble.origin))];
};

export const getUniqueRarities = (): string[] => {
  return [...new Set(defaultMarbles.map(marble => marble.rarity))];
};

// Get featured marbles for homepage
export const getFeaturedMarbles = (): Marble[] => {
  return defaultMarbles.filter(marble => marble.isFeatured === true);
};

// Get featured marbles by count (for homepage display)
export const getFeaturedMarblesByCount = (count: number = 3): Marble[] => {
  const featured = getFeaturedMarbles();
  return featured.slice(0, count);
};
