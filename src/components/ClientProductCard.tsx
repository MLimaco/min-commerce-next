'use client';

import ProductCard from '@/components/ProductCard';
import { Product } from '@/services/productService';

export default function ClientProductCard({ product }: { product: Product }) {
  return <ProductCard product={product} />;
}