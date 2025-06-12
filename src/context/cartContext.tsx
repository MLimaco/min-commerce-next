'use client';
import React, { createContext, useState, useEffect } from 'react';
import { Product } from '@/services/productService';

// Definimos la estructura básica de un elemento del carrito
type CartItem = Product & {
  id: string;
  title: string;
  price: number;
  quantity: number;
  // Puedes añadir más propiedades según necesites
};

type CartContextType = {
  cart: CartItem[];
  getCart: () => CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void; // Nueva función para limpiar el carrito
};

// Valor por defecto del contexto
const defaultCartContext: CartContextType = {
  cart: [],
  getCart: () => [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {} // Implementación vacía por defecto
};

// Clave para localStorage
const CART_STORAGE_KEY = 'min-commerce-cart';

// Helper para manejar localStorage de forma segura
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('Error writing to localStorage:', e);
    }
  }
};

// Creamos el contexto
export const CartContext = createContext<CartContextType>(defaultCartContext);

// Creamos el componente proveedor del contexto
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Estado para almacenar los items del carrito
  const [cart, setCart] = useState<CartItem[]>([]);
  // Estado para controlar si el componente está montado
  const [isMounted, setIsMounted] = useState(false);
  
  // Solo cargar del localStorage cuando el componente está montado en el cliente
  useEffect(() => {
    setIsMounted(true);
    // Cargar carrito desde localStorage al montar el componente
    const storedCart = safeLocalStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);
  
  // Guardar carrito en localStorage cada vez que cambia, pero solo después de montar
  useEffect(() => {
    if (isMounted) {
      safeLocalStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  // Función que devuelve el carrito actual
  const getCart = () => {
    return cart;
  };
  
  // Función para añadir un producto al carrito
  const addToCart = (itemToAdd: CartItem) => {
    setCart(currentCart => {
      // Verificamos si el producto ya existe en el carrito
      const existingItemIndex = currentCart.findIndex(item => item.id === itemToAdd.id);
      
      if (existingItemIndex !== -1) {
        // Si existe, actualizamos la cantidad
        const updatedCart = [...currentCart];
        updatedCart[existingItemIndex].quantity += itemToAdd.quantity;
        return updatedCart;
      } else {
        // Si no existe, lo añadimos al carrito
        return [...currentCart, itemToAdd];
      }
    });
  };
  
  // Función para eliminar un producto del carrito
  const removeFromCart = (itemId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== itemId));
  };
  
  // Función para actualizar la cantidad de un producto
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      // Si la cantidad es 0 o negativa, eliminamos el producto
      removeFromCart(itemId);
      return;
    }
    
    setCart(currentCart => {
      return currentCart.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };
  
  // Función para limpiar completamente el carrito
  const clearCart = () => {
    setCart([]);
  };
  
  // Valor que proporcionamos al contexto
  const value = {
    cart,
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};