'use client';
import { useContext } from 'react';
import { type Product } from '@/models/product';
import { CartContext } from '@/context/cartContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  // Usamos el contexto para obtener la función addToCart
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    // Creamos el item del carrito
    const cartItem = {
      ...product,
      quantity: 1
    };
    
    console.log(`Producto agregado al carrito: ${product.id}`);
    // Usamos la función del contexto
    addToCart(cartItem);
  }

  return (
    <div className="card hover-lift max-w-xs w-full">
      <div className="relative bg-white h-48 overflow-hidden flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-auto h-auto max-h-48 max-w-full object-contain image-zoom"
        />
        {product.onSale && (
          <span className="badge-accent absolute top-2 right-2">Oferta</span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-grow">
        <span className="badge self-start">{product.category}</span>
        <h3 className="text-lg font-medium line-clamp-2">{product.title}</h3>
        <p className="text-emerald-600 font-bold text-lg mt-auto">${product.price.toFixed(2)}</p>

        <button onClick={handleAddToCart} className="btn-primary mt-2 cursor-pointer">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}