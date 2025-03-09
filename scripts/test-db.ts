import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Test connection
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful!');

    // Create test product
    const product = await prisma.product.create({
      data: {
        title: 'Test Product',
        price: 99.99,
        imageUrl: '/images/test-product.jpg',
        description: 'This is a test product',
        amazonUrl: 'https://amazon.com/test',
        asin: 'TEST123'
      }
    });
    console.log('✅ Test product created:', product);

    // Create test category
    const category = await prisma.category.create({
      data: {
        name: 'Test Category',
        slug: 'test-category',
        description: 'This is a test category',
        order: 1
      }
    });
    console.log('✅ Test category created:', category);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 