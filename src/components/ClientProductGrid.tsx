'use client';

import { useState } from 'react';
import { Product } from '@/services/productService';
import Link from 'next/link';
import Image from 'next/image';
import StarRating from './StarRating';
import { useRouter } from 'next/navigation';

export default function ClientProductGrid({
  products,
  initialSort = 'featured'
}: {
  products: Product[];
  initialSort?: string;
}) {
  const [sortBy, setSortBy] = useState(initialSort);
  const router = useRouter();

  // Manejador para cambiar la ordenación
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    
    // Actualiza la URL con los nuevos parámetros
    const url = new URL(window.location.href);
    url.searchParams.set('sort', newSort);
    router.push(url.pathname + url.search);
  };

  return (
    <>
      {/* Ordenar por */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center">
          <span className="mr-2">Ordenar por</span>
          <select 
            className="border rounded-md py-1 px-3"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="featured">Más relevantes</option>
            <option value="price_asc">Menor precio</option>
            <option value="price_desc">Mayor precio</option>
            <option value="newest">Más recientes</option>
          </select>
        </div>
      </div>
      
      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Link href={`/product/${product.id}`}>
              <div className="h-52 p-4 flex items-center justify-center bg-white">
                <Image 
                  src={product.imageUrl} 
                  alt={product.title} 
                  width={200} 
                  height={200}
                  className="h-full w-auto object-contain"
                />
              </div>
              
              <div className="p-4 border-t">
                <h3 className="font-medium mb-1 line-clamp-2">{product.title}</h3>
                
                {/* Precio con descuento */}
                <div className="flex items-center mb-2">
                  {product.onSale && (
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-sm mr-2">
                      {Math.floor(Math.random() * 30) + 20}% OFF
                    </div>
                  )}
                  <p className="text-gray-500 line-through text-sm">
                    S/ {(product.price * (product.onSale ? 1.25 : 1)).toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-baseline mb-3">
                  <p className="text-xl font-bold">S/ {product.price.toFixed(2)}</p>
                </div>
                
                {/* Vendedor y rating */}
                <div className="flex items-center text-sm">
                  <span className="text-gray-600">Por </span>
                  <span className="text-blue-500 ml-1 hover:underline">{product.seller}</span>
                </div>
                
                {product.ranking > 0 && (
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      <StarRating rating={product.ranking} />
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                      ({Math.floor(Math.random() * 10) + 1})
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}