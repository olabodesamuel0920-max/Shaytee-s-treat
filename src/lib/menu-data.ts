import menuJson from "./menu_data.json";

export interface MenuItem {
  name: string;
  flavor?: string;
  price?: number;
  prices?: {
    small?: number;
    medium?: number;
    large?: number;
    regular?: number;
    big?: number;
  };
  variants?: {
    single_sausage?: number;
    double_sausage?: number;
    without_sausage?: number;
    with_sausage?: number;
  };
  includes?: string;
  extras?: string;
  unit?: string;
  image: string;
  category: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  items: MenuItem[];
  free_drizzles?: string[];
}

export interface VibeCategory {
  name: string;
  icon: string;
  image: string;
}

export const menuData = menuJson as {
  brand: string;
  tagline: string;
  location: string;
  contact: string;
  currency: string;
  currency_symbol: string;
  categories: MenuCategory[];
  vibe_categories: VibeCategory[];
};

// Flattened list of all items for search or direct queries
export const allMenuItems: MenuItem[] = menuData.categories.reduce((acc, cat) => {
  const itemsWithCat = cat.items.map(item => ({ ...item, category: cat.id }));
  return [...acc, ...itemsWithCat];
}, [] as MenuItem[]);

// Helper to get formatted price text for display
export const getPriceText = (item: MenuItem): string => {
  if (item.price !== undefined) {
    if (item.price === 0) return "FREE";
    return `₦${item.price.toLocaleString()}`;
  }
  
  if (item.prices) {
    const values = Object.values(item.prices);
    return values.map(v => `₦${v.toLocaleString()}`).join(" / ");
  }

  if (item.variants) {
    const values = Object.values(item.variants);
    return values.map(v => `₦${v.toLocaleString()}`).join(" / ");
  }

  return "Contact Us";
};

// Get single base price (minimum price)
export const getMinPrice = (item: MenuItem): number => {
  if (item.price !== undefined) return item.price;
  
  if (item.prices) {
    const values = Object.values(item.prices) as number[];
    return Math.min(...values);
  }

  if (item.variants) {
    const values = Object.values(item.variants) as number[];
    return Math.min(...values);
  }

  return 0;
};
