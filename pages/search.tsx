import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '../types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps(context: any) {
  const { q } = context.query;
  
  if (!q) {
    return {
      props: {
        products: []
      }
    };
  }

  const searchTerm = q.toLowerCase();
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { category: { contains: searchTerm, mode: 'insensitive' } }
      ]
    }
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  };
}

interface SearchPageProps {
  products: Product[];
}

export default function SearchPage({ products }: SearchPageProps) {
  const router = useRouter();
  const { q } = router.query;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Search Results for "{q}"
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No results found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
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
                <div className="mt-2 flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating ? 'fill-current' : 'fill-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
} 