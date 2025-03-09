import { generateBatchReviews } from '../lib/contentGenerator';
import dbConnect from '../lib/dbConnect';

const productTemplates = [
  {
    category: 'Laptops',
    products: [
      {
        productName: 'MacBook Pro M3 Max',
        basePrice: 2499,
        specifications: {
          'Processor': 'Apple M3 Max',
          'Memory': 'Up to 128GB unified memory',
          'Storage': 'Up to 8TB SSD',
          'Display': '14.2-inch Liquid Retina XDR',
          'Battery': 'Up to 22 hours',
          'Weight': '3.4 pounds (1.55 kg)',
        },
      },
      {
        productName: 'Dell XPS 15',
        basePrice: 1899,
        specifications: {
          'Processor': 'Intel Core i9-13900H',
          'Memory': 'Up to 64GB DDR5',
          'Storage': 'Up to 4TB SSD',
          'Display': '15.6-inch 4K OLED',
          'Battery': 'Up to 12 hours',
          'Weight': '4.23 pounds (1.92 kg)',
        },
      },
    ],
  },
  {
    category: 'Smartphones',
    products: [
      {
        productName: 'iPhone 15 Pro Max',
        basePrice: 1199,
        specifications: {
          'Processor': 'A17 Pro chip',
          'Memory': '8GB RAM',
          'Storage': 'Up to 1TB',
          'Display': '6.7-inch Super Retina XDR',
          'Camera': '48MP main + 12MP ultra-wide + 12MP telephoto',
          'Battery': '4422 mAh',
        },
      },
      {
        productName: 'Samsung Galaxy S24 Ultra',
        basePrice: 1299,
        specifications: {
          'Processor': 'Snapdragon 8 Gen 3',
          'Memory': '12GB RAM',
          'Storage': 'Up to 1TB',
          'Display': '6.8-inch Dynamic AMOLED 2X',
          'Camera': '200MP main + 12MP ultra-wide + 50MP telephoto',
          'Battery': '5000 mAh',
        },
      },
    ],
  },
  {
    category: 'Gaming',
    products: [
      {
        productName: 'PlayStation 5',
        basePrice: 499,
        specifications: {
          'CPU': 'AMD Zen 2',
          'GPU': 'AMD RDNA 2',
          'Memory': '16GB GDDR6',
          'Storage': '825GB SSD',
          'Resolution': 'Up to 4K 120Hz',
          'Features': 'Ray tracing, 3D audio',
        },
      },
      {
        productName: 'Xbox Series X',
        basePrice: 499,
        specifications: {
          'CPU': 'AMD Zen 2',
          'GPU': 'AMD RDNA 2',
          'Memory': '16GB GDDR6',
          'Storage': '1TB SSD',
          'Resolution': 'Up to 4K 120Hz',
          'Features': 'Quick Resume, Ray tracing',
        },
      },
    ],
  },
];

async function generateDailyContent() {
  try {
    await dbConnect();
    
    console.log('Starting daily content generation...');
    
    for (const template of productTemplates) {
      console.log(`Generating reviews for ${template.category}...`);
      
      const products = template.products.map(p => ({
        ...p,
        category: template.category,
      }));
      
      await generateBatchReviews(products);
      
      console.log(`Completed ${template.category} reviews.`);
    }
    
    console.log('Daily content generation completed.');
  } catch (error) {
    console.error('Error in content generation:', error);
  }
}

// Run the script
generateDailyContent(); 