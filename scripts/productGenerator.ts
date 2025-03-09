import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';
import { Product } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const categories = ['Gaming', 'Laptops', 'Smartphones', 'Smart Home'];

async function generateProductWithAI(): Promise<Product> {
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  const prompt = `Generate a realistic tech product review for a ${category} product in JSON format with the following structure:
  {
    "name": "Product Name",
    "description": "Detailed product description",
    "features": ["Feature 1", "Feature 2", "Feature 3"],
    "pros": ["Pro 1", "Pro 2", "Pro 3"],
    "cons": ["Con 1", "Con 2"],
    "specifications": {
      "key1": "value1",
      "key2": "value2"
    },
    "price": 999.99,
    "rating": 4.5
  }`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  const response = completion.choices[0].message?.content;
  const aiData = JSON.parse(response || '{}');

  return {
    _id: `product_${Date.now()}`,
    title: aiData.name,
    slug: aiData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: aiData.description,
    content: aiData.description + "\n\n" + aiData.features.join("\n"),
    price: aiData.price,
    rating: aiData.rating,
    reviewCount: Math.floor(Math.random() * 200) + 50,
    imageUrl: "/images/placeholder.jpg",
    gallery: ["/images/placeholder.jpg"],
    pageLink: `/product/${aiData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    pros: aiData.pros || [],
    cons: aiData.cons || [],
    specifications: aiData.specifications || {},
    affiliateLinks: {
      amazon: `https://amazon.com/dp/${Math.random().toString(36).substring(7)}`,
      bestbuy: `https://bestbuy.com/site/${Math.random().toString(36).substring(7)}`
    },
    category: category,
    tags: [category.toLowerCase(), 'tech', 'review'],
    metaTitle: `${aiData.name} Review - TechReviews.AI`,
    metaDescription: aiData.description,
    keywords: [category.toLowerCase(), 'review', 'tech', ...aiData.pros],
    author: "AI Editor",
    publishDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    status: "published"
  };
}

async function updateProductsFile(count: number = 1) {
  try {
    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    let currentData;
    
    try {
      currentData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    } catch (error) {
      currentData = { products: [] };
    }

    console.log(`Generating ${count} products...`);
    
    for (let i = 0; i < count; i++) {
      console.log(`Generating product ${i + 1} of ${count}...`);
      const newProduct = await generateProductWithAI();
      currentData.products = [newProduct, ...currentData.products];
      
      // Wait for 1 second between requests to avoid rate limiting
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    fs.writeFileSync(productsPath, JSON.stringify(currentData, null, 2));
    console.log('Products updated successfully!');
  } catch (error) {
    console.error('Error updating products:', error);
    process.exit(1);
  }
}

// Run script if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const count = parseInt(process.argv[2]) || 1;
  updateProductsFile(count);
}

export { updateProductsFile, generateProductWithAI }; 