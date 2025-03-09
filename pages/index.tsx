import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Product } from '@/types';
import AdSense from '@/components/AdSense';
import productsData from '@/data/products.json';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  
  // Filter products based on category
  const filteredProducts = activeCategory === 'All' 
    ? productsData.products 
    : productsData.products.filter(product => product.category === activeCategory);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Layout>
      <Head>
        <title>TechReviews.AI - AI-Powered Product Reviews & Recommendations</title>
        <meta
          name="description"
          content="Discover in-depth tech product reviews powered by AI. Find the best laptops, smartphones, gaming gear, and smart home devices with our detailed analysis."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[500px] -mt-8 mb-12">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Tech products collage"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/90" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mb-6"
            >
              AI-Powered Tech Reviews You Can Trust
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Discover the best tech products with our detailed, unbiased reviews powered by
              artificial intelligence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/category/tech"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Explore Reviews
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Popular Reviews</h2>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {[
              { name: 'All', count: productsData.products.length },
              { name: 'Gaming', count: productsData.products.filter(p => p.category === 'Gaming').length },
              { name: 'Laptops', count: productsData.products.filter(p => p.category === 'Laptops').length },
              { name: 'Smartphones', count: productsData.products.filter(p => p.category === 'Smartphones').length },
              { name: 'Smart Home', count: productsData.products.filter(p => p.category === 'Smart Home').length }
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setActiveCategory(category.name);
                  setCurrentPage(1);
                }}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                  activeCategory === category.name
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{category.name}</span>
                <span className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-xs ${
                  activeCategory === category.name
                    ? 'bg-white text-primary-600'
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
          {currentProducts.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              <Link href={product.pageLink} className="block flex-1">
                <div className="relative h-48 sm:h-52 lg:h-56">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.discount}% OFF
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${product.price}
                  </div>
                </div>
                <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs sm:text-sm font-medium">
                      {product.category}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <span className="text-lg">★</span>
                      <span className="text-gray-600 text-sm ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2 flex-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-gray-500">
                      {product.reviewCount} reviews
                    </span>
                    <span className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === number
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      {/* AdSense */}
      <div className="mb-12">
        <AdSense
          client="your-client-id"
          slot="your-slot-id"
          format="auto"
          responsive="true"
        />
      </div>
    </Layout>
  );
} 