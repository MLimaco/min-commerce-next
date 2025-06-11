export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  onSale?: boolean;
  ranking: number;
  deliveryTime: string;
  brand: string;
  seller: string;
}

/**
 * Obtiene todos los productos desde la API
 * @returns Array de productos
 */
export async function getProducts(): Promise<Product[]> {
  // Construye una URL absoluta utilizando la ubicación actual
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                 (typeof window !== 'undefined' ? window.location.origin : '');
  
  // Hacemos una petición GET a nuestro endpoint de productos con URL absoluta
  const response = await fetch(`${baseUrl}/api/products`, {
    cache: 'no-store' // Para asegurar datos frescos
  });
  
  if (!response.ok) {
    throw new Error('Error al obtener productos');
  }
  
  return response.json();
}

/**
 * Obtiene un producto específico por su ID
 * @param id ID del producto
 * @returns Datos del producto
 */
export async function getProduct(id: string): Promise<Product> {
  // Construye una URL absoluta utilizando la ubicación actual
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                 (typeof window !== 'undefined' ? window.location.origin : '');
  
  const response = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Error al obtener el producto');
  }
  
  return response.json();
}

/**
 * Crea un nuevo producto en la base de datos
 * @param product Datos del producto sin ID
 * @returns Producto creado con ID asignado
 */
export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  // Construye una URL absoluta utilizando la ubicación actual
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                 (typeof window !== 'undefined' ? window.location.origin : '');
  
  const response = await fetch(`${baseUrl}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    throw new Error('Error al crear el producto');
  }
  
  return response.json();
}

/**
 * Actualiza un producto existente
 * @param id ID del producto a actualizar
 * @param product Datos actualizados del producto
 * @returns Producto actualizado
 */
export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  // Construye una URL absoluta utilizando la ubicación actual
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                 (typeof window !== 'undefined' ? window.location.origin : '');
  
  const response = await fetch(`${baseUrl}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    throw new Error('Error al actualizar el producto');
  }
  
  return response.json();
}

/**
 * Elimina un producto
 * @param id ID del producto a eliminar
 * @returns Mensaje de confirmación
 */
export async function deleteProduct(id: string): Promise<{message: string}> {
  // Construye una URL absoluta utilizando la ubicación actual
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                 (typeof window !== 'undefined' ? window.location.origin : '');
  
  const response = await fetch(`${baseUrl}/api/products/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Error al eliminar el producto');
  }
  
  return response.json();
}