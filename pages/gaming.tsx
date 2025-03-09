import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import productsData from '@/data/products.json';

export default function GamingPage() {
  const gamingProducts = productsData.products.filter(p => p.category === 'Gaming');
  const [selectedPlatform, setSelectedPlatform] = useState('All');

  const platforms = [
    { name: 'All', icon: '🎮' },
    { name: 'PC', icon: '🖥️' },
    { name: 'Console', icon: '🎯' },
    { name: 'Accessories', icon: '🎧' }
  ];

  const filteredProducts = selectedPlatform === 'All' 
    ? gamingProducts 
    : gamingProducts.filter(p => p.title.toLowerCase().includes(selectedPlatform.toLowerCase()));

  return (
    <Layout>
      <Head>
        <title>Gaming Reviews & Recommendations | TechReviews.AI</title>
        <meta
          name="description"
          content="Expert gaming hardware reviews including PCs, consoles, peripherals, and accessories. Find the best gaming gear with our detailed analysis."
        />
        <meta name="keywords" content="gaming reviews, gaming PC, gaming console, gaming accessories, gaming hardware, gaming peripherals" />
        <meta property="og:title" content="Gaming Reviews & Recommendations | TechReviews.AI" />
        <meta property="og:description" content="Expert gaming hardware reviews including PCs, consoles, peripherals, and accessories. Find the best gaming gear with our detailed analysis." />
        <meta property="og:image" content="/images/gaming-banner.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://techreviews.ai/gaming" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[400px] -mt-8 mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gaming-banner.jpg"
            alt="Gaming setup with RGB lighting"
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
              Level Up Your Gaming Setup
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white/90 mb-8"
            >
              Discover the best gaming gear with our in-depth reviews and expert recommendations
            </motion.p>
          </div>
        </div>
      </section>

      {/* Platform Filter */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4 mb-8">
            {platforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => setSelectedPlatform(platform.name)}
                className={`px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedPlatform === platform.name
                    ? 'bg-primary-600 text-white scale-105 shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-105'
                }`}
              >
                <span className="text-2xl">{platform.icon}</span>
                <span>{platform.name}</span>
              </button>
            ))}
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
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gaming Tips Section */}
      <section className="mb-12 bg-gradient-to-br from-gray-900 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Pro Gaming Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Choose Your Platform',
                description: 'Find the perfect gaming platform that matches your style and preferences.',
                icon: '🎮'
              },
              {
                title: 'Optimize Performance',
                description: 'Get the most out of your gaming setup with our optimization guides.',
                icon: '⚡'
              },
              {
                title: 'Stay Competitive',
                description: 'Keep up with the latest gaming gear and technology trends.',
                icon: '🏆'
              }
            ].map((tip) => (
              <motion.div
                key={tip.title}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
              >
                <span className="text-4xl mb-4 block">{tip.icon}</span>
                <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                <p className="text-white/80">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Ahead of the Game</h2>
            <p className="text-lg mb-6">
              Subscribe to our newsletter for the latest gaming reviews and exclusive deals.
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