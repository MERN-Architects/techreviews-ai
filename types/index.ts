export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  gallery: string[];
  pros: string[];
  cons: string[];
  specifications: {
    [key: string]: string;
  };
  affiliateLinks: {
    amazon: string;
    [key: string]: string;
  };
  category: string;
  subcategory?: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  author: string;
  publishDate: string;
  lastUpdated: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  parentId?: string;
  order: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
}

export interface Comment {
  _id: string;
  productId: string;
  userId: string;
  content: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface AdConfig {
  placement: string;
  adClient: string;
  adSlot: string;
  format: string;
  responsive: boolean;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonical: string;
  robotsTxt: string;
} 