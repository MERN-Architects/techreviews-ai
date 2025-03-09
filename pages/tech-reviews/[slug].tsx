import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { motion } from 'framer-motion';

const techReviews = {
  'iphone-15-pro-max-review': {
    title: "iPhone 15 Pro Max Review",
    content: "A comprehensive review of Apple's latest flagship phone...",
    image: "/images/placeholder.jpg",
    category: "Smartphones",
    date: "2024-03-20",
    rating: 4.8,
    pros: [
      "Exceptional camera system",
      "Powerful A17 Pro chip",
      "Premium build quality"
    ],
    cons: [
      "High price tag",
      "Heavy device",
      "Limited customization"
    ]
  },
  'macbook-pro-m3-review': {
    title: "MacBook Pro M3 Review",
    content: "Detailed analysis of the new MacBook Pro with M3 chip...",
    image: "/images/placeholder.jpg",
    category: "Laptops",
    date: "2024-03-19",
    rating: 4.9,
    pros: [
      "Revolutionary M3 performance",
      "Excellent battery life",
      "Beautiful display"
    ],
    cons: [
      "Expensive",
      "Limited ports",
      "Not user upgradeable"
    ]
  }
};

const TechReviewDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const review = techReviews[slug as keyof typeof techReviews];
  
  if (!review) {
    return (
      <Layout>
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-8">Review Not Found</h1>
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
              src={review.image}
              alt={review.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <span className="text-sm text-blue-600 font-semibold">
            {review.category}
          </span>
          <h1 className="text-4xl font-bold mt-2 mb-4">{review.title}</h1>
          
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? 'fill-current' : 'fill-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">{review.rating} / 5</span>
            <span className="ml-4 text-gray-500">{review.date}</span>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-600">{review.content}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-green-700 mb-4">Pros</h2>
              <ul className="space-y-2">
                {review.pros.map((pro, index) => (
                  <li key={index} className="flex items-center text-green-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-red-700 mb-4">Cons</h2>
              <ul className="space-y-2">
                {review.cons.map((con, index) => (
                  <li key={index} className="flex items-center text-red-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
};

export default TechReviewDetail; 