'use client';
import { useContext } from 'react';
import { CartContext } from '@/context/cartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Si el carrito está vacío, mostramos un mensaje
  if (cart.length === 0) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-medium mb-6">Tu Carrito</h1>
        <p>Tu carrito está vacío.</p>
        <Link href="/" className="btn-primary inline-block mt-4">
          Ir a comprar
        </Link>
      </div>
    );
  }

    // Calculamos el total del carrito
    return <main className="p-12">
        <article className="p-24">
            <h2 className="text-xl mb-6">Tu Carrito</h2>
            <hr className="mb-6" />
            {cart.length > 0 ? (
                cart.map((cartItem) => (
                    <section key={cartItem.id} className="mb-4 p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">{cartItem.title}</h3>
                            <p className="text-emerald-600">${cartItem.price.toFixed(2)}</p>
                        </div>

                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                                className="px-2 py-1 border rounded hover:bg-gray-100"
                            >
                                -
                            </button>
                            <span className="w-8 text-center">{cartItem.quantity}</span>
                            <button
                                onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                                className="px-2 py-1 border rounded hover:bg-gray-100"
                            >
                                +
                            </button>

                            <button
                                onClick={() => removeFromCart(cartItem.id)}
                                className="ml-4 text-red-500 hover:text-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </section>
                ))
            ) : (
                <p>No hay productos en el carrito</p>
            )}
        </article>
    </main>
}