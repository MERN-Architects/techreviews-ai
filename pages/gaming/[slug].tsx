import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BaseArticle {
  title: string;
  content: string;
  image: string;
  category: string;
  date: string;
}

interface GameArticle extends BaseArticle {
  keyFeatures: string[];
  releaseInfo: {
    expectedDate: string;
    platforms: string[];
    publisher: string;
    developer: string;
  };
}

interface ComparisonArticle extends BaseArticle {
  comparison: {
    performance: {
      ps5: string;
      xbox: string;
    };
    storage: {
      ps5: string;
      xbox: string;
    };
    price: {
      ps5: string;
      xbox: string;
    };
  };
}

function isGameArticle(article: GameArticle | ComparisonArticle): article is GameArticle {
  return 'keyFeatures' in article;
}

function isComparisonArticle(article: GameArticle | ComparisonArticle): article is ComparisonArticle {
  return 'comparison' in article;
}

const gamingArticles: Record<string, GameArticle | ComparisonArticle> = {
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

          {isGameArticle(article) && (
            <>
              <div className="bg-purple-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-bold text-purple-700 mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {article.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-purple-600">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Release Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Expected Release:</p>
                    <p className="font-semibold">{article.releaseInfo.expectedDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Platforms:</p>
                    <p className="font-semibold">{article.releaseInfo.platforms.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Publisher:</p>
                    <p className="font-semibold">{article.releaseInfo.publisher}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Developer:</p>
                    <p className="font-semibold">{article.releaseInfo.developer}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {isComparisonArticle(article) && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Comparison</h2>
              <div className="grid grid-cols-3 gap-4">
                <div></div>
                <div className="text-center font-semibold text-purple-600">PS5 Pro</div>
                <div className="text-center font-semibold text-green-600">Xbox Series X</div>
                {Object.entries(article.comparison).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <div className="font-semibold capitalize">{key}</div>
                    <div className="text-center text-purple-600">{value.ps5}</div>
                    <div className="text-center text-green-600">{value.xbox}</div>
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