import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { motion } from 'framer-motion';

const smartHomeArticles = {
  'best-smart-home-hubs-2024': {
    title: "Best Smart Home Hubs 2024",
    content: "Compare the top smart home hubs that can control all your devices...",
    image: "/images/placeholder.jpg",
    category: "Smart Hubs",
    date: "2024-03-20",
    products: [
      {
        name: "Samsung SmartThings Hub",
        price: "$129.99",
        rating: 4.5,
        features: [
          "Wide device compatibility",
          "Easy setup process",
          "Reliable performance"
        ]
      },
      {
        name: "Amazon Echo (4th Gen)",
        price: "$99.99",
        rating: 4.7,
        features: [
          "Built-in Zigbee hub",
          "Excellent sound quality",
          "Alexa integration"
        ]
      }
    ]
  },
  'smart-security-camera-guide': {
    title: "Smart Security Camera Guide",
    content: "Everything you need to know about home security cameras...",
    image: "/images/placeholder.jpg",
    category: "Security",
    date: "2024-03-19",
    features: [
      "Motion detection",
      "Night vision",
      "Two-way audio",
      "Cloud storage",
      "Mobile app control"
    ],
    considerations: [
      "Video quality",
      "Field of view",
      "Storage options",
      "Privacy features",
      "Installation requirements"
    ]
  }
};

const SmartHomeDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const article = smartHomeArticles[slug as keyof typeof smartHomeArticles];
  
  if (!article) {
    return (
      <Layout>
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-8">Article Not Found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-96 mb-8">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <span className="text-sm text-green-600 font-semibold">
            {article.category}
          </span>
          <h1 className="text-4xl font-bold mt-2 mb-4">{article.title}</h1>
          <span className="text-gray-500">{article.date}</span>

          <div className="prose max-w-none my-8">
            <p className="text-gray-600">{article.content}</p>
          </div>

          {'products' in article && article.products && (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {article.products.map((product, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-primary-600 font-semibold mb-2">{product.price}</p>
                  <div className="flex items-center mb-4">
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
                    <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
                  </div>
                  <ul className="space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {'features' in article && article.features && (
            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-green-700 mb-4">Key Features</h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {article.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
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
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {'considerations' in article && article.considerations && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-blue-700 mb-4">Key Considerations</h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {article.considerations.map((consideration, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </article>
    </Layout>
  );
};

export default SmartHomeDetail; 