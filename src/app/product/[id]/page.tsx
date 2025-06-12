import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductImageGallery from '@/components/ProductImageGallery';
import PriceDisplay from '@/components/PriceDisplay';
import StarRating from '@/components/StarRating';
import AddToCartButton from '@/components/AddToCartButton';
import RelatedProducts from '@/components/RelatedProducts';
import { formatDeliveryTime } from '@/lib/utils';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  return {
    title: product ? `${product.title} | Min-Commerce` : 'Producto no encontrado',
    description: product?.description || 'Detalles del producto',
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  // Obtener productos relacionados de la misma categoría
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
    },
    take: 4,
  });

  const discountPercent = product.onSale ? 10 : 0; // Asumimos un 10% de descuento
  const originalPrice = product.onSale 
    ? (product.price / (1 - discountPercent/100)).toFixed(2) 
    : product.price.toFixed(2);

  return (
    <main className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">&gt;</span>
        <a href={`/categoria/${product.category}`} className="hover:text-gray-700">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </a>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-800">{product.title}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda: Imágenes */}
        <div>
          <ProductImageGallery imageUrl={product.imageUrl} title={product.title} />
        </div>
        
        {/* Columna derecha: Información del producto */}
        <div>
          <div className="mb-2 text-gray-500">{product.brand}</div>
          <h1 className="text-2xl font-medium mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <StarRating rating={product.ranking} />
            <span className="text-sm text-gray-500 ml-2">
              ({product.ranking.toFixed(1)})
            </span>
          </div>
          
          {/* Precio */}
          <PriceDisplay 
            price={product.price} 
            originalPrice={parseFloat(originalPrice)} 
            onSale={product.onSale} 
          />
          
          {/* Vendedor */}
          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-600">Vendido por </span>
            <a href="#" className="text-sm font-medium ml-1 text-blue-600">
              {product.seller}
            </a>
          </div>
          
          {/* Entrega */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Llega {formatDeliveryTime(product.deliveryTime)}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Envío a domicilio</span>
            </div>
          </div>
          
          {/* Botones */}
          <div className="grid grid-cols-1 gap-3">
            <AddToCartButton product={product} />
            <button className="btn-secondary">
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
      
      {/* Descripción */}
      <div className="mt-12">
        <h2 className="text-xl font-medium mb-4">Descripción</h2>
        <div className="bg-white rounded-md shadow-sm p-6">
          <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
        </div>
      </div>
      
      {/* Especificaciones */}
      <div className="mt-12">
        <h2 className="text-xl font-medium mb-4">Especificaciones</h2>
        <div className="bg-white rounded-md shadow-sm p-6">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 text-gray-500 w-1/3">Marca</td>
                <td className="py-3 font-medium">{product.brand}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 text-gray-500">Categoría</td>
                <td className="py-3 font-medium">{product.category}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 text-gray-500">Vendedor</td>
                <td className="py-3 font-medium">{product.seller}</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-500">Tiempo de entrega</td>
                <td className="py-3 font-medium">{product.deliveryTime}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </main>
  );
}