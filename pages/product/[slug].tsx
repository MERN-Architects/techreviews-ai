import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import AdSense from '@/components/AdSense';
import { Product } from '@/types';

// Mock data for a single product
const productData: Product = {
  _id: '1',
  title: 'MacBook Pro M3 Max',
  slug: 'macbook-pro-m3-max',
  description: 'The most powerful MacBook Pro ever with the M3 Max chip.',
  content: `
    The new MacBook Pro M3 Max represents the pinnacle of Apple's laptop engineering...
    
    Performance
    -----------
    With up to 128GB of unified memory and a 16-core CPU, the M3 Max delivers unprecedented performance...
    
    Display
    -------
    The 14.2-inch Liquid Retina XDR display offers exceptional color accuracy and brightness...
    
    Battery Life
    -----------
    Despite its powerful hardware, the MacBook Pro M3 Max delivers up to 22 hours of battery life...
  `,
  price: 2499,
  rating: 4.8,
  reviewCount: 156,
  imageUrl: '/images/macbook-pro.jpg',
  gallery: [
    '/images/macbook-pro-1.jpg',
    '/images/macbook-pro-2.jpg',
    '/images/macbook-pro-3.jpg',
  ],
  pros: [
    'Exceptional performance with M3 Max chip',
    'Beautiful Liquid Retina XDR display',
    'Outstanding battery life',
    'Premium build quality',
    'Advanced thermal management',
  ],
  cons: [
    'Premium price point',
    'Limited port selection',
    'Not user upgradeable',
  ],
  specifications: {
    'Processor': 'Apple M3 Max',
    'Memory': 'Up to 128GB unified memory',
    'Storage': 'Up to 8TB SSD',
    'Display': '14.2-inch Liquid Retina XDR',
    'Battery': 'Up to 22 hours',
    'Weight': '3.4 pounds (1.55 kg)',
  },
  affiliateLinks: {
    amazon: 'https://amazon.com/macbook-pro',
    bestbuy: 'https://bestbuy.com/macbook-pro',
  },
  category: 'Laptops',
  tags: ['Apple', 'MacBook', 'Laptop', 'Professional'],
  metaTitle: 'MacBook Pro M3 Max Review (2024) - The Ultimate Pro Laptop?',
  metaDescription: 'In-depth review of the MacBook Pro M3 Max. Discover its groundbreaking performance, stunning display, and impressive battery life. Is it worth the investment?',
  keywords: ['MacBook Pro M3 Max', 'Apple M3 chip', 'Pro laptop review'],
  author: 'TechReviews.AI',
  publishDate: '2024-03-08',
  lastUpdated: '2024-03-08',
  status: 'published',
};

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);

  return (
    <Layout>
      <Head>
        <title>{product.metaTitle}</title>
        <meta name="description" content={product.metaDescription} />
        <meta name="keywords" content={product.keywords.join(', ')} />
      </Head>

      <article className="max-w-4xl mx-auto">
        {/* Product Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <span>By {product.author}</span>
            <span>•</span>
            <span>Updated {product.lastUpdated}</span>
          </div>
        </header>

        {/* Product Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="relative h-96">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.gallery.map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`relative h-20 rounded-lg overflow-hidden ${
                    selectedImage === image ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <Image src={image} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Price and Rating */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating ? 'fill-current' : 'fill-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  ({product.reviewCount} reviews)
                </span>
              </div>
              <span className="text-3xl font-bold text-primary-600">
                ${product.price}
              </span>
            </div>

            {/* Affiliate Links */}
            <div className="space-y-3">
              <a
                href={product.affiliateLinks.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary-600 text-white text-center px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Check Price on Amazon
              </a>
              <a
                href={product.affiliateLinks.bestbuy}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-secondary-600 text-white text-center px-6 py-3 rounded-lg hover:bg-secondary-700 transition-colors"
              >
                View on Best Buy
              </a>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">Pros</h3>
                <ul className="space-y-2">
                  {product.pros.map((pro, index) => (
                    <li key={index} className="flex items-center text-green-600">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-red-600">Cons</h3>
                <ul className="space-y-2">
                  {product.cons.map((con, index) => (
                    <li key={index} className="flex items-center text-red-600">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* AdSense */}
        <div className="mb-8">
          <AdSense
            client="your-client-id"
            slot="your-slot-id"
            format="auto"
            responsive="true"
          />
        </div>

        {/* Product Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div
            dangerouslySetInnerHTML={{
              __html: product.content.replace(/\n/g, '<br />'),
            }}
          />
        </div>

        {/* Specifications */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b">
                <dt className="font-medium text-gray-600">{key}</dt>
                <dd className="text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom AdSense */}
        <div className="mt-8">
          <AdSense
            client="your-client-id"
            slot="your-slot-id-2"
            format="auto"
            responsive="true"
          />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // In a real application, fetch all product slugs from your database
  const paths = [
    {
      params: { slug: 'macbook-pro-m3-max' },
    },
  ];

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // In a real application, fetch product data from your database
  return {
    props: {
      product: productData,
    },
    revalidate: 3600, // Revalidate every hour
  };
}; 