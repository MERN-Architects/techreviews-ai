import { ProductAdvertisingAPIv1 } from 'amazon-paapi';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const api = new ProductAdvertisingAPIv1({
  accessKey: process.env.AMAZON_ACCESS_KEY,
  secretKey: process.env.AMAZON_SECRET_KEY,
  partnerTag: process.env.AMAZON_PARTNER_TAG,
  partnerType: 'Associates',
  marketplace: 'www.amazon.com',
});

async function searchAndSaveProducts(keywords: string) {
  try {
    const response = await api.searchItems({
      Keywords: keywords,
      SearchIndex: 'All',
      ItemCount: 10,
      Resources: [
        'ItemInfo.Title',
        'Offers.Listings.Price',
        'Images.Primary.Large',
        'ItemInfo.Features',
        'ItemInfo.ProductInfo',
      ],
    });

    if (response.ItemsResult?.Items) {
      for (const item of response.ItemsResult.Items) {
        await prisma.product.create({
          data: {
            title: item.ItemInfo?.Title?.DisplayValue || '',
            price: item.Offers?.Listings?.[0]?.Price?.Amount || 0,
            imageUrl: item.Images?.Primary?.Large?.URL || '',
            description: item.ItemInfo?.Features?.DisplayValues?.join('\n') || '',
            amazonUrl: item.DetailPageURL || '',
            asin: item.ASIN || '',
          },
        });
      }
      console.log(`Successfully saved ${response.ItemsResult.Items.length} products`);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Example usage
const keywords = ['electronics', 'books', 'clothing'];
keywords.forEach(keyword => searchAndSaveProducts(keyword)); 