import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { products } from '@/data/products.json';
import RatingStars from '@/components/RatingStars';
import Newsletter from '@/components/Newsletter';

export default function GamingCategoryPage() {
  const [sortBy, setSortBy] = useState('latest');
  const gamingProducts = products.filter(p => p.category === 'Gaming');

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  // Sort products
  const sortedProducts = [...gamingProducts].sort((a, b) => {
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
        <title>Gaming Hardware Reviews & Guides | TechReviews.AI</title>
        <meta
          name="description"
          content="Expert gaming hardware reviews including consoles, PCs, peripherals, and accessories. Find the best gaming gear with our detailed analysis."
        />
        <meta name="keywords" content="gaming hardware, gaming PC, gaming console, gaming accessories, gaming peripherals, gaming reviews" />
        <meta property="og:title" content="Gaming Hardware Reviews & Guides | TechReviews.AI" />
        <meta property="og:description" content="Expert gaming hardware reviews including consoles, PCs, peripherals, and accessories. Find the best gaming gear with our detailed analysis." />
        <meta property="og:image" content="/images/placeholder.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://techreviews.ai/category/gaming" />
      </Head>

      {/* Category Header */}
      <section className="relative h-[300px] -mt-8 mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/placeholder.jpg"
            alt="Gaming hardware collection"
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
              <span className="text-white text-lg">🎮 Gaming</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Gaming Hardware Reviews
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-white/90"
            >
              Level up your gaming experience with our expert reviews and recommendations
            </motion.p>
          </div>
        </div>
      </section>

      {/* Sort Options */}
      <section className="mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {sortedProducts.length} Products Found
            </h2>
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
            {sortedProducts.map((product) => (
              <Link href={`/product/${product.slug}`} key={product._id} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <div className="mt-2">
                  <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
                </div>
                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Features */}
      <section className="mb-12 bg-gradient-to-br from-gray-50 to-primary-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Gaming Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Consoles',
                description: 'Latest gaming consoles and accessories.',
                icon: '🎮'
              },
              {
                title: 'PC Gaming',
                description: 'High-performance gaming PCs and components.',
                icon: '🖥️'
              },
              {
                title: 'Peripherals',
                description: 'Gaming mice, keyboards, and headsets.',
                icon: '🎧'
              },
              {
                title: 'Streaming',
                description: 'Streaming gear and capture devices.',
                icon: '🎥'
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
            <h2 className="text-3xl font-bold mb-4">Stay in the Game</h2>
            <p className="text-lg mb-6">
              Subscribe for the latest gaming hardware reviews and tech news.
            </p>
            <Newsletter />
          </div>
        </div>
      </section>
    </Layout>
  );
} 