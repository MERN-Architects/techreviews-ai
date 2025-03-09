import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (q && typeof q === 'string') {
      const searchQuery = q.toLowerCase();
      const filteredProducts = productsData.products.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery) ||
          product.category.toLowerCase().includes(searchQuery) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );
      });
      setResults(filteredProducts);
    }
  }, [q]);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">
          Search Results for "{q}"
        </h1>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((product) => (
              <Link
                key={product._id}
                href={product.pageLink}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discount && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-600">
                      {product.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-bold">
                        ${product.price}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-gray-600">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
} 