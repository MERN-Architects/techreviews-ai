import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import { Product } from '../types';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const categories = ['Gaming', 'Laptops', 'Smartphones', 'Smart Home'];

async function generateProductWithAI(): Promise<Product> {
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  try {
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
    if (!response) throw new Error('No response from OpenAI');
    
    const aiData = JSON.parse(response);
    const productId = `product_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    return {
      _id: productId,
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
        amazon: `https://amazon.com/dp/${Math.random().toString(36).substring(7)}`
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
  } catch (error) {
    console.error('Error generating product:', error);
    throw error;
  }
}

async function updateProductsFile(count: number = 1) {
  try {
    console.log(`Generating ${count} products...`);
    
    for (let i = 0; i < count; i++) {
      console.log(`Generating product ${i + 1} of ${count}...`);
      const newProduct = await generateProductWithAI();
      
      await prisma.product.create({
        data: newProduct
      });
      
      console.log(`✅ Product ${i + 1} created successfully`);
      
      // Wait for 1 second between requests to avoid rate limiting
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log('✅ All products generated successfully!');
  } catch (error) {
    console.error('❌ Error updating products:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run script if executed directly
if (require.main === module) {
  const count = parseInt(process.argv[2]) || 1;
  updateProductsFile(count);
}

export { updateProductsFile, generateProductWithAI }; 