import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import productsData from '@/data/products.json';

export default function TechReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  const categories = [
    { name: 'All', icon: '🔥' },
    { name: 'Laptops', icon: '💻' },
    { name: 'Smartphones', icon: '📱' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Smart Home', icon: '🏠' }
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  let filteredProducts = selectedCategory === 'All'
    ? productsData.products
    : productsData.products.filter(p => p.category === selectedCategory);

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
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

  return (
    <Layout>
      <Head>
        <title>Expert Tech Reviews & Product Comparisons | TechReviews.AI</title>
        <meta
          name="description"
          content="In-depth tech product reviews, comparisons, and buying guides. Find expert analysis of laptops, smartphones, gaming gear, and smart home devices."
        />
        <meta name="keywords" content="tech reviews, product reviews, technology reviews, gadget reviews, tech comparisons, buying guides" />
        <meta property="og:title" content="Expert Tech Reviews & Product Comparisons | TechReviews.AI" />
        <meta property="og:description" content="In-depth tech product reviews, comparisons, and buying guides. Find expert analysis of laptops, smartphones, gaming gear, and smart home devices." />
        <meta property="og:image" content="/images/tech-reviews-banner.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://techreviews.ai/tech-reviews" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[400px] -mt-8 mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/tech-reviews-banner.jpg"
            alt="Latest technology devices"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-primary-900/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold text-white mb-4"
            >
              Expert Tech Reviews
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white/90 mb-8"
            >
              Unbiased reviews and comparisons to help you make informed decisions
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    selectedCategory === category.name
                      ? 'bg-primary-600 text-white scale-105 shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-105'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {/* Sort Options */}
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
      </section>

      {/* Products Grid */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
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
                title: 'Research',
                description: 'Thorough market research and product analysis.',
                icon: '🔍'
              },
              {
                title: 'Testing',
                description: 'Hands-on testing in real-world conditions.',
                icon: '⚡'
              },
              {
                title: 'Comparison',
                description: 'Side-by-side comparisons with similar products.',
                icon: '⚖️'
              },
              {
                title: 'Verdict',
                description: 'Detailed analysis and final recommendations.',
                icon: '📝'
              }
            ].map((step) => (
              <motion.div
                key={step.title}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 text-center shadow-lg"
              >
                <span className="text-4xl mb-4 block">{step.icon}</span>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss a Review</h2>
            <p className="text-lg mb-6">
              Subscribe to our newsletter for the latest tech reviews and buying guides.
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