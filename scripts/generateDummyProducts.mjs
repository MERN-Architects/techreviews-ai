import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categories = ['Gaming', 'Laptops', 'Smartphones', 'Smart Home'];
const brands = ['Apple', 'Samsung', 'Sony', 'Microsoft', 'Google', 'Asus', 'Lenovo', 'Dell'];
const features = [
  'High performance',
  'Long battery life',
  'Premium build quality',
  'Great value for money',
  'Advanced features',
  'User friendly interface',
  'Innovative design',
  'Excellent connectivity'
];

function generateDummyProduct(index) {
  const category = categories[index % categories.length];
  const brand = brands[index % brands.length];
  const productName = `${brand} ${category} Pro ${2024 + (index % 3)}`;
  
  return {
    _id: `product_${Date.now()}_${index}`,
    title: productName,
    slug: productName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: `Experience the next level of ${category.toLowerCase()} with the ${productName}. This premium device offers exceptional performance and innovative features.`,
    content: `Detailed review of the ${productName}. This product represents the pinnacle of ${category.toLowerCase()} technology.`,
    price: 499.99 + (index * 100),
    rating: 4 + (Math.random() * 1),
    reviewCount: 50 + Math.floor(Math.random() * 150),
    imageUrl: "/images/placeholder.jpg",
    gallery: ["/images/placeholder.jpg"],
    pageLink: `/product/${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    pros: [
      features[index % features.length],
      features[(index + 1) % features.length],
      features[(index + 2) % features.length]
    ],
    cons: [
      'Premium price point',
      'Limited availability'
    ],
    specifications: {
      brand: brand,
      model: `Pro ${2024 + (index % 3)}`,
      warranty: '1 year'
    },
    affiliateLinks: {
      amazon: `https://amazon.com/dp/${Math.random().toString(36).substring(7)}`,
    },
    category: category,
    tags: [category.toLowerCase(), brand.toLowerCase(), 'tech', 'review'],
    metaTitle: `${productName} Review - TechReviews.AI`,
    metaDescription: `Comprehensive review of the ${productName}. Find out if this ${category.toLowerCase()} device is worth your investment.`,
    keywords: [category.toLowerCase(), brand.toLowerCase(), 'review', 'tech'],
    author: "Tech Editor",
    publishDate: new Date(Date.now() - (index * 86400000)).toISOString(),
    lastUpdated: new Date().toISOString(),
    status: "published",
    discount: index % 3 === 0 ? 10 : undefined
  };
}

async function generateBulkProducts() {
  console.log('Generating 28 products...');
  
  const productsPath = path.join(process.cwd(), 'data', 'products.json');
  let currentData = { products: [] };
  
  for (let i = 0; i < 28; i++) {
    console.log(`Generating product ${i + 1} of 28...`);
    const newProduct = generateDummyProduct(i);
    currentData.products.push(newProduct);
  }
  
  fs.writeFileSync(productsPath, JSON.stringify(currentData, null, 2));
  console.log('Finished generating products!');
}

generateBulkProducts().catch(console.error); 