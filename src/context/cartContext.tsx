'use client';
import React, { createContext, useState } from 'react';
import { Product } from '@/services/productService';

// Definimos la estructura básica de un elemento del carrito
type CartItem = Product &{
  id: string;
  title: string;
  price: number;
  quantity: number;
  // Puedes añadir más propiedades según necesites
};

// Creamos el contexto
export const CartContext = createContext({
  cart: [] as CartItem[],
  
  // Función para obtener el carrito actual
  getCart: () => [] as CartItem[],
  
  // Función para añadir un item al carrito
  addToCart: (item: CartItem) => {},
  
  // Función para eliminar un item del carrito
  removeFromCart: (itemId: string) => {},
  
  // Función para actualizar la cantidad de un item
  updateQuantity: (itemId: string, quantity: number) => {}
});

// Creamos el componente proveedor del contexto
export const CartProvider = ({ children }) => {
  // Estado para almacenar los items del carrito
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Función que devuelve el carrito actual
  const getCart = () => {
    return cart;
  };
  
  // Función para añadir un producto al carrito
  const addToCart = (item: CartItem) => {
    // Comprobamos si el producto ya existe en el carrito
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      // Si el producto ya existe, actualizamos la cantidad
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCart(updatedCart);
    } else {
      // Si el producto no existe, lo añadimos al carrito
      setCart([...cart, item]);
    }
  };
  
  // Función para eliminar un producto del carrito
  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };
  
  // Función para actualizar la cantidad de un producto
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      // Si la cantidad es 0 o menor, eliminamos el producto
      removeFromCart(itemId);
    } else {
      // Si la cantidad es positiva, actualizamos el producto
      setCart(
        cart.map(item => 
          item.id === itemId 
            ? { ...item, quantity } 
            : item
        )
      );
    }
  };

  return (
    // Proporcionamos el valor del contexto a los componentes hijos
    <CartContext.Provider value={{ 
      cart, 
      getCart, 
      addToCart, 
      removeFromCart, 
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
};