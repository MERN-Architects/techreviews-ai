import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { motion } from 'framer-motion';

const dealsData = {
  'samsung-galaxy-s24-ultra-deal': {
    title: "50% Off Samsung Galaxy S24 Ultra",
    content: "Limited time offer on the latest Samsung flagship phone. Don't miss out on this amazing deal!",
    image: "/images/placeholder.jpg",
    category: "Smartphones",
    originalPrice: "$1,199",
    salePrice: "$599",
    expiryDate: "2024-03-25",
    features: [
      "6.8-inch Dynamic AMOLED 2X display",
      "200MP main camera",
      "Snapdragon 8 Gen 3 processor",
      "5000mAh battery",
      "S Pen included"
    ],
    specifications: {
      display: "6.8-inch QHD+",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB/512GB",
      battery: "5000mAh"
    },
    retailer: {
      name: "Amazon",
      rating: 4.8,
      reviews: 1250,
      shippingInfo: "Free Prime Shipping",
      returnPolicy: "30-day return window"
    }
  },
  'gaming-pc-bundle-deal': {
    title: "Gaming PC Bundle Deal",
    content: "Get a complete gaming setup with RTX 4070 for an unbeatable price. Perfect for serious gamers!",
    image: "/images/placeholder.jpg",
    category: "Gaming",
    originalPrice: "$2,499",
    salePrice: "$1,999",
    expiryDate: "2024-03-30",
    features: [
      "NVIDIA RTX 4070 12GB",
      "Intel Core i7-14700K",
      "32GB DDR5 RAM",
      "1TB NVMe SSD",
      "27\" 1440p 165Hz Monitor"
    ],
    specifications: {
      gpu: "NVIDIA RTX 4070 12GB",
      cpu: "Intel Core i7-14700K",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      psu: "850W Gold"
    },
    retailer: {
      name: "Newegg",
      rating: 4.6,
      reviews: 856,
      shippingInfo: "Free shipping",
      returnPolicy: "14-day return window"
    }
  }
};

const DealDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const deal = dealsData[slug as keyof typeof dealsData];
  
  if (!deal) {
    return (
      <Layout>
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-8">Deal Not Found</h1>
        </div>
      </Layout>
    );
  }

  const discount = Math.round(
    ((parseFloat(deal.originalPrice.replace('$', '')) - parseFloat(deal.salePrice.replace('$', ''))) /
      parseFloat(deal.originalPrice.replace('$', ''))) *
      100
  );

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
              src={deal.image}
              alt={deal.title}
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4 bg-red-600 text-white px-6 py-2 rounded-full text-lg font-bold">
              Save {discount}%
            </div>
          </div>
          
          <span className="text-sm text-red-600 font-semibold">
            {deal.category}
          </span>
          <h1 className="text-4xl font-bold mt-2 mb-4">{deal.title}</h1>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-red-600">{deal.salePrice}</span>
              <span className="ml-2 text-xl text-gray-500 line-through">{deal.originalPrice}</span>
            </div>
            <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
              Expires: {deal.expiryDate}
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-600">{deal.content}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Key Features</h2>
              <ul className="space-y-3">
                {deal.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Specifications</h2>
              <dl className="space-y-3">
                {Object.entries(deal.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <dt className="font-medium text-gray-600 capitalize">{key}:</dt>
                    <dd className="text-gray-800">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Available at {deal.retailer.name}</h2>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < deal.retailer.rating ? 'fill-current' : 'fill-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {deal.retailer.rating}/5 ({deal.retailer.reviews} reviews)
                  </span>
                </div>
              </div>
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
                Get Deal
              </button>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{deal.retailer.shippingInfo}</span>
              <span>{deal.retailer.returnPolicy}</span>
            </div>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
};

export default DealDetail; 