import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import productsData from '@/data/products.json';

export default function SmartHomePage() {
  const smartHomeProducts = productsData.products.filter(p => p.category === 'Smart Home');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', icon: '🏠' },
    { name: 'Security', icon: '🔒' },
    { name: 'Lighting', icon: '💡' },
    { name: 'Climate', icon: '🌡️' },
    { name: 'Entertainment', icon: '🎵' }
  ];

  const filteredProducts = selectedCategory === 'All'
    ? smartHomeProducts
    : smartHomeProducts.filter(p => p.title.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <Layout>
      <Head>
        <title>Smart Home Reviews & Automation Guide | TechReviews.AI</title>
        <meta
          name="description"
          content="Comprehensive smart home device reviews and automation guides. Transform your home with the latest IoT technology and connected devices."
        />
        <meta name="keywords" content="smart home reviews, home automation, IoT devices, smart security, smart lighting, smart thermostats" />
        <meta property="og:title" content="Smart Home Reviews & Automation Guide | TechReviews.AI" />
        <meta property="og:description" content="Comprehensive smart home device reviews and automation guides. Transform your home with the latest IoT technology and connected devices." />
        <meta property="og:image" content="/images/smart-home-banner.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://techreviews.ai/smart-home" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[400px] -mt-8 mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/smart-home-banner.jpg"
            alt="Modern smart home setup"
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
              Transform Your Home
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white/90 mb-8"
            >
              Discover the latest smart home technology and automation solutions
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4 mb-8">
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

      {/* Features Section */}
      <section className="mb-12 bg-gradient-to-br from-gray-50 to-primary-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Smart Home Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Energy Efficiency',
                description: 'Save on utility bills with smart climate control and lighting.',
                icon: '🌱'
              },
              {
                title: 'Enhanced Security',
                description: 'Keep your home safe with smart cameras and sensors.',
                icon: '🔐'
              },
              {
                title: 'Convenience',
                description: 'Control your home from anywhere with smart automation.',
                icon: '📱'
              },
              {
                title: 'Entertainment',
                description: 'Create the perfect atmosphere with smart entertainment systems.',
                icon: '🎭'
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

      {/* Setup Guide */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Smart Home Setup Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Plan Your Setup',
                  description: 'Identify your needs and choose compatible devices.'
                },
                {
                  step: '02',
                  title: 'Install & Connect',
                  description: 'Set up your devices and connect them to your network.'
                },
                {
                  step: '03',
                  title: 'Automate & Enjoy',
                  description: 'Create routines and enjoy your smart home experience.'
                }
              ].map((step) => (
                <div key={step.step} className="relative">
                  <div className="text-6xl font-bold text-primary-100 absolute -top-4 -left-4">
                    {step.step}
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-lg mb-6">
              Get the latest smart home tips and exclusive deals delivered to your inbox.
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