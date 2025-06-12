'use client';

import { useContext } from 'react';
import { CartContext } from '@/context/cartContext';
import { Product } from '@/services/productService';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      onSale: product.onSale,
      quantity: 1,
      // Añadir valores predeterminados
      description: product.description || '',
      ranking: product.ranking || 0,
      deliveryTime: product.deliveryTime || '',
      brand: product.brand || '',
      seller: product.seller || ''
    };
    addToCart(cartItem);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="btn-primary flex items-center justify-center cursor-pointer"
    >
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
      Agregar al Carro
    </button>
  );
}