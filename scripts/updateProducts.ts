import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { Product } from '../types';

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
    pros: aiData.pros || [],
    cons: aiData.cons || [],
    specifications: aiData.specifications || {},
    affiliateLinks: {
      amazon: `https://amazon.com/dp/${Math.random().toString(36).substring(7)}`,
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

async function fetchLatestProducts(): Promise<Product[]> {
  try {
    // প্রতিদিন একটি নতুন প্রোডাক্ট জেনারেট করুন
    const newProduct = await generateProductWithAI();
    return [newProduct];
  } catch (error) {
    console.error('Error generating product:', error);
    return [];
  }
}

async function updateProductsFile() {
  try {
    // বর্তমান প্রোডাক্ট ডাটা পড়ুন
    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    const currentData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    
    // নতুন প্রোডাক্ট ফেচ করুন
    const newProducts = await fetchLatestProducts();
    
    if (newProducts.length > 0) {
      // নতুন প্রোডাক্ট যোগ করুন
      currentData.products = [...newProducts, ...currentData.products];
      
      // ফাইলে সেভ করুন
      fs.writeFileSync(productsPath, JSON.stringify(currentData, null, 2));
      console.log('Products updated successfully!');
    } else {
      console.log('No new products to add.');
    }
  } catch (error) {
    console.error('Error updating products:', error);
    process.exit(1);
  }
}

// স্ক্রিপ্ট রান করুন যদি ডাইরেক্টলি এক্সিকিউট করা হয়
if (require.main === module) {
  updateProductsFile();
}

export { updateProductsFile }; 