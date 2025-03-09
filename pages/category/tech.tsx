import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const techProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro Max Review",
    excerpt: "The latest flagship from Apple brings revolutionary features...",
    image: "/images/placeholder.jpg",
    category: "Smartphones",
    date: "2024-03-20",
    rating: 4.8,
    reviewCount: 156,
    slug: "iphone-15-pro-max-review"
  },
  {
    id: 2,
    title: "MacBook Pro M3 Review",
    excerpt: "Apple's most powerful laptop yet with the new M3 chip...",
    image: "/images/placeholder.jpg",
    category: "Laptops",
    date: "2024-03-19",
    rating: 4.9,
    reviewCount: 128,
    slug: "macbook-pro-m3-review"
  },
  {
    id: 3,
    title: "Sony WH-1000XM5 Review",
    excerpt: "The best noise-cancelling headphones get even better...",
    image: "/images/placeholder.jpg",
    category: "Audio",
    date: "2024-03-18",
    rating: 4.7,
    reviewCount: 89,
    slug: "sony-wh-1000xm5-review"
  }
];

const categories = ["All", "Smartphones", "Laptops", "Audio", "Cameras", "Gaming", "Accessories"];

const TechCategory = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? techProducts 
    : techProducts.filter(product => product.category === activeCategory);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Tech Reviews</h1>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Link href={`/tech-reviews/${product.slug}`} className="block">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-blue-600 font-semibold">
                    {product.category}
                  </span>
                  <h2 className="text-xl font-bold mt-2 mb-3">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {product.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
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
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.reviewCount} reviews)
                      </span>
                    </div>
                    <span className="text-blue-600">Read More →</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TechCategory; 