import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GamingArticle } from '@/types';

const gamingArticles: Record<string, GamingArticle> = {
  'gta-6-everything-we-know': {
    title: "GTA 6 - Everything We Know So Far",
    content: "The most anticipated game of the decade is finally coming. Here's everything we know about GTA 6...",
    image: "/images/placeholder.jpg",
    category: "Upcoming Games",
    date: "2024-03-20",
    keyFeatures: [
      "First female protagonist in the series",
      "Set in modern-day Vice City",
      "Enhanced graphics with RAGE engine",
      "Dynamic weather system",
      "Improved AI and NPC interactions"
    ],
    releaseInfo: {
      expectedDate: "2025",
      platforms: ["PS5", "Xbox Series X|S", "PC"],
      publisher: "Rockstar Games",
      developer: "Rockstar North"
    }
  },
  'ps5-pro-vs-xbox-series-x': {
    title: "PS5 Pro vs Xbox Series X Comparison",
    content: "A detailed comparison of the next-gen gaming consoles...",
    image: "/images/placeholder.jpg",
    category: "Gaming Hardware",
    date: "2024-03-19",
    comparison: {
      performance: {
        ps5: "Enhanced 4K at 120fps",
        xbox: "Native 4K at 60fps"
      },
      storage: {
        ps5: "1TB NVMe SSD",
        xbox: "1TB Custom NVME"
      },
      price: {
        ps5: "$549",
        xbox: "$499"
      }
    }
  }
};

const GamingDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const article = gamingArticles[slug as keyof typeof gamingArticles];
  
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
          
          <span className="text-sm text-purple-600 font-semibold">
            {article.category}
          </span>
          <h1 className="text-4xl font-bold mt-2 mb-4">{article.title}</h1>
          <span className="text-gray-500">{article.date}</span>

          <div className="prose max-w-none my-8">
            <p className="text-gray-600">{article.content}</p>
          </div>

          {'keyFeatures' in article && article.keyFeatures && (
            <div className="bg-purple-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-purple-700 mb-4">Key Features</h2>
              <ul className="space-y-2">
                {article.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-purple-500 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {'releaseInfo' in article && article.releaseInfo && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Release Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-600">Expected Release</h3>
                  <p>{article.releaseInfo.expectedDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Platforms</h3>
                  <p>{article.releaseInfo.platforms.join(', ')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Publisher</h3>
                  <p>{article.releaseInfo.publisher}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Developer</h3>
                  <p>{article.releaseInfo.developer}</p>
                </div>
              </div>
            </div>
          )}

          {'comparison' in article && article.comparison && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Comparison</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <h3 className="font-semibold text-gray-600">Category</h3>
                </div>
                <div className="col-span-1">
                  <h3 className="font-semibold text-gray-600">PS5</h3>
                </div>
                <div className="col-span-1">
                  <h3 className="font-semibold text-gray-600">Xbox</h3>
                </div>
                {Object.entries(article.comparison).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <div className="col-span-1">
                      <p className="capitalize">{key}</p>
                    </div>
                    <div className="col-span-1">
                      <p>{value.ps5}</p>
                    </div>
                    <div className="col-span-1">
                      <p>{value.xbox}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </article>
    </Layout>
  );
};

export default GamingDetail; 