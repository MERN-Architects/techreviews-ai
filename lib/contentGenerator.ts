import OpenAI from 'openai';
import { Product } from '@/types';
import slugify from 'slugify';
import ProductModel from '@/models/Product';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ProductData {
  category: string;
  productName: string;
  basePrice: number;
  specifications: Record<string, string>;
}

export async function generateProductReview(data: ProductData): Promise<Partial<Product>> {
  try {
    // Generate the main review content
    const reviewPrompt = `Write a detailed product review for ${data.productName} in the ${data.category} category.
    Include the following sections:
    1. Brief overview (2-3 sentences)
    2. Detailed analysis of key features
    3. Performance evaluation
    4. Build quality and design
    5. Value for money
    6. Pros (3-5 points)
    7. Cons (2-3 points)
    8. Final verdict

    Specifications to consider:
    ${Object.entries(data.specifications)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')}
    `;

    const reviewCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: reviewPrompt }],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const reviewContent = reviewCompletion.choices[0].message.content || '';

    // Generate SEO metadata
    const seoPrompt = `Generate SEO metadata for a product review of ${data.productName}:
    1. Meta title (50-60 characters)
    2. Meta description (150-160 characters)
    3. Focus keywords (5-7 keywords)
    
    Consider the product category: ${data.category}`;

    const seoCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: seoPrompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    const seoContent = seoCompletion.choices[0].message.content || '';
    const [metaTitle, metaDescription, keywordsText] = seoContent.split('\n\n');

    // Generate pros and cons
    const prosConsPrompt = `List the main pros and cons for ${data.productName}:
    Consider: performance, features, price, build quality, and user experience.`;

    const prosConsCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prosConsPrompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    const prosConsContent = prosConsCompletion.choices[0].message.content || '';
    const [prosText, consText] = prosConsContent.split('\n\nCons:');
    const pros = prosText
      .replace('Pros:', '')
      .split('\n')
      .filter(Boolean)
      .map((pro) => pro.trim().replace(/^-\s*/, ''));
    const cons = consText
      .split('\n')
      .filter(Boolean)
      .map((con) => con.trim().replace(/^-\s*/, ''));

    // Generate product image using DALL·E
    const imagePrompt = `Professional product photo of ${data.productName}, ${data.category}, white background, studio lighting, photorealistic`;
    const imageResponse = await openai.images.generate({
      prompt: imagePrompt,
      n: 1,
      size: '1024x1024',
    });

    // Generate gallery images
    const galleryPrompts = [
      `${data.productName} from front angle`,
      `${data.productName} from side view`,
      `${data.productName} close-up details`,
    ];

    const galleryImages = await Promise.all(
      galleryPrompts.map((prompt) =>
        openai.images.generate({
          prompt: `Professional product photo of ${prompt}, white background, studio lighting, photorealistic`,
          n: 1,
          size: '1024x1024',
        })
      )
    );

    const productData: Partial<Product> = {
      title: data.productName,
      slug: slugify(data.productName, { lower: true }),
      description: reviewContent.split('\n\n')[0], // First paragraph as description
      content: reviewContent,
      price: data.basePrice,
      rating: 0, // Will be updated based on user reviews
      reviewCount: 0,
      imageUrl: imageResponse.data[0].url ?? '',
      gallery: galleryImages
        .map((img) => img.data[0].url)
        .filter((url): url is string => url !== undefined),
      pros,
      cons,
      specifications: data.specifications,
      category: data.category,
      metaTitle: metaTitle.replace('Meta title: ', ''),
      metaDescription: metaDescription.replace('Meta description: ', ''),
      keywords: keywordsText
        .replace('Keywords: ', '')
        .split(',')
        .map((k) => k.trim()),
      author: 'TechReviews.AI',
      status: 'published',
    };

    return productData;
  } catch (error) {
    console.error('Error generating review:', error);
    throw error;
  }
}

export async function generateBatchReviews(products: ProductData[]) {
  const reviews = [];

  for (const product of products) {
    try {
      console.log(`Generating review for ${product.productName}...`);
      const review = await generateProductReview(product);
      const savedReview = await ProductModel.create(review);
      reviews.push(savedReview);

      // Add delay to respect API rate limits
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error generating review for ${product.productName}:`, error);
    }
  }

  return reviews;
} 