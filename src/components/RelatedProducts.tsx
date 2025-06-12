'use client';

import { Product } from '@/services/productService';
import Link from 'next/link';
import Image from 'next/image';
import StarRating from './StarRating';

export default function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-medium mb-6">Productos relacionados</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <Link 
            key={product.id} 
            href={`/${product.id}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 block"
          >
            <div className="h-40 flex items-center justify-center mb-3">
              <Image 
                src={product.imageUrl} 
                alt={product.title}
                width={120}
                height={120} 
                className="max-h-full object-contain" 
              />
            </div>
            <h3 className="text-sm font-medium mb-1 line-clamp-2">{product.title}</h3>
            <div className="flex items-center mb-1">
              <StarRating rating={product.ranking} />
              <span className="text-xs text-gray-500 ml-1">
                ({product.ranking.toFixed(1)})
              </span>
            </div>
            <div className="text-emerald-600 font-bold">
              S/ {product.price.toFixed(2)}
              {product.onSale && (
                <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Oferta</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}