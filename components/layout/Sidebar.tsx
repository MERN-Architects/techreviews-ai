import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AdSense from '../AdSense';
import productsData from '../../data/products.json';

export default function Sidebar() {
  const products = productsData.products;
  
  // Get top 3 products by rating and review count
  const popularProducts = products
    .sort((a, b) => {
      // First sort by rating
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      // If ratings are equal, sort by review count
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, 3);

  const categories = [
    { 
      name: 'All Reviews', 
      count: products.length,
      slug: 'all'
    },
    { 
      name: 'Gaming', 
      count: products.filter(p => p.category === 'Gaming').length,
      slug: 'gaming'
    },
    { 
      name: 'Laptops', 
      count: products.filter(p => p.category === 'Laptops').length,
      slug: 'laptops'
    },
    { 
      name: 'Smartphones', 
      count: products.filter(p => p.category === 'Smartphones').length,
      slug: 'smartphones'
    },
    { 
      name: 'Smart Home', 
      count: products.filter(p => p.category === 'Smart Home').length,
      slug: 'smart-home'
    }
  ];

  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Categories</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.slug}`}
              className="flex items-center justify-between py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <span className="font-medium dark:text-gray-300">{category.name}</span>
              <span className="bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Top Rated Products</h2>
        <div className="space-y-4">
          {popularProducts.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-4"
            >
              <div className="relative w-20 h-20">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={product.pageLink}
                  className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 line-clamp-2"
                >
                  {product.title}
                </Link>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-primary-600 dark:text-primary-400">{product.category}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      {Number(product.rating).toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount} reviews)</span>
                </div>
                <div className="mt-1">
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">${product.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg shadow-lg p-6 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
      </div>

        {/* Content */}
        <div className="relative">
          <h2 className="text-2xl font-bold mb-2">Stay in the Loop! 🚀</h2>
          <p className="text-sm text-white/90 mb-4">
            Subscribe for exclusive tech reviews, latest gadget releases, and special deals delivered to your inbox.
          </p>
          <form className="space-y-3" onSubmit={(e) => {
            e.preventDefault();
            // Add newsletter subscription logic here
            alert('Thank you for subscribing! We will keep you updated.');
          }}>
            <div className="relative">
          <input
            type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-white/95 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
          <button
            type="submit"
              className="w-full px-4 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
          >
              <span>Subscribe Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
          </button>
        </form>
          <p className="text-xs text-white/80 mt-3 text-center">
            🔒 We respect your privacy. No spam, ever.
          </p>
        </div>
      </div>

      {/* AdSense */}
      <div className="mt-8">
        <AdSense
          client="your-client-id"
          slot="your-slot-id"
          format="auto"
          responsive="true"
        />
      </div>
    </aside>
  );
} 