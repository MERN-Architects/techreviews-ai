import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import productsData from '@/data/products.json';

export default function TechReviewsCategoryPage() {
  const [sortBy, setSortBy] = useState('latest');
  const [category, setCategory] = useState('all');
  const allProducts = productsData.products;

  const sortOptions = [
    { value: 'latest', label: 'Latest Reviews' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Laptops', label: 'Laptops' },
    { value: 'Smartphones', label: 'Smartphones' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Smart Home', label: 'Smart Home' }
  ];

  // Filter by category
  const filteredProducts = category === 'all'
    ? allProducts
    : allProducts.filter(product => product.category === category);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default: // 'latest'
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
  });

  return (
    <Layout>
      <Head>
        <title>In-Depth Tech Reviews & Analysis | TechReviews.AI</title>
        <meta
          name="description"
          content="Expert tech reviews and detailed analysis of laptops, smartphones, gaming gear, and smart home devices. Make informed buying decisions with our comprehensive reviews."
        />
        <meta name="keywords" content="tech reviews, product reviews, laptop reviews, smartphone reviews, gaming reviews, smart home reviews" />
        <meta property="og:title" content="In-Depth Tech Reviews & Analysis | TechReviews.AI" />
        <meta property="og:description" content="Expert tech reviews and detailed analysis of laptops, smartphones, gaming gear, and smart home devices. Make informed buying decisions with our comprehensive reviews." />
        <meta property="og:image" content="/images/placeholder.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://techreviews.ai/category/tech-reviews" />
      </Head>

      {/* Category Header */}
      <section className="relative h-[300px] -mt-8 mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/placeholder.jpg"
            alt="Tech reviews and analysis"
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
              <span className="text-white text-lg">📝 Reviews</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold text-white mb-4"
            >
              In-Depth Tech Reviews
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-white/90"
            >
              Expert analysis and comprehensive reviews to help you make informed decisions
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Options */}
      <section className="mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-xl font-semibold">
              {sortedProducts.length} Reviews Found
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Category:</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
        </div>
      </section>

      {/* Products Grid */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <Link href={product.pageLink} className="block">
                  <div className="relative h-56">
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
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                      <div className="flex items-center text-yellow-400">
                        <span className="text-lg mr-1">★</span>
                        <span className="text-gray-600 text-sm">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{product.reviewCount} reviews</span>
                      <span className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                        Read Review
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Process */}
      <section className="mb-12 bg-gradient-to-br from-gray-50 to-primary-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Review Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Thorough Testing',
                description: 'Extensive hands-on testing in real-world conditions.',
                icon: '🔍'
              },
              {
                title: 'Expert Analysis',
                description: 'In-depth analysis by tech experts.',
                icon: '📊'
              },
              {
                title: 'Fair Comparison',
                description: 'Side-by-side comparisons with similar products.',
                icon: '⚖️'
              },
              {
                title: 'User Feedback',
                description: 'Incorporating real user experiences and reviews.',
                icon: '👥'
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
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className="text-lg mb-6">
              Subscribe to receive our latest tech reviews and expert insights.
            </p>
            <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
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