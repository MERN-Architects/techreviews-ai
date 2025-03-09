import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import productsData from '@/data/products.json';

export default function SmartHomeCategoryPage() {
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const smartHomeProducts = productsData.products.filter(p => p.category === 'Smart Home');

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Sort products
  const sortedProducts = [...smartHomeProducts].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default: // 'latest'
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
  });

  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  return (
    <Layout>
      <Head>
        <title>Smart Home Products & Reviews | TechReviews.AI</title>
        <meta
          name="description"
          content="Explore our collection of smart home devices, from security cameras to smart lighting. Find detailed reviews and comparisons to automate your home."
        />
        <meta name="keywords" content="smart home devices, home automation, smart security, smart lighting, smart thermostats, IoT devices" />
        <meta property="og:title" content="Smart Home Products & Reviews | TechReviews.AI" />
        <meta property="og:description" content="Explore our collection of smart home devices, from security cameras to smart lighting. Find detailed reviews and comparisons to automate your home." />
        <meta property="og:image" content="/images/smart-home-banner.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://techreviews.ai/category/smart-home" />
      </Head>

      {/* Category Header */}
      <section className="relative h-[300px] -mt-8 mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/placeholder.jpg"
            alt="Smart home devices collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-primary-900/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-4 inline-block mb-4"
            >
              <span className="text-white text-lg">🏠 Smart Home</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Smart Home Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-white/90"
            >
              Transform your home with the latest smart devices and automation solutions
            </motion.p>
          </div>
        </div>
      </section>

      {/* Sort Options */}
      <section className="mb-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold">
              {sortedProducts.length} Products Found
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm sm:text-base">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 sm:px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
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
                        <span className="text-gray-600 text-sm ml-1">{Number(product.rating).toFixed(1)}</span>
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
        </div>
      </section>

      {/* Category Features */}
      <section className="mb-12 bg-gradient-to-br from-gray-50 to-primary-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Smart Home</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Automation',
                description: 'Control your home devices automatically with smart scheduling.',
                icon: '⚡'
              },
              {
                title: 'Security',
                description: 'Keep your home safe with smart security solutions.',
                icon: '🔒'
              },
              {
                title: 'Efficiency',
                description: 'Save energy and reduce costs with smart management.',
                icon: '💡'
              }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 text-center shadow-lg"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-6">
              Get the latest smart home product reviews and automation tips.
            </p>
            <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 w-full"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
} 