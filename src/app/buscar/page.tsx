import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import ClientProductGrid from '@/components/ClientProductGrid';

// Búsqueda con Server Components
async function SearchResults({ query }: { query: string }) {
  // Obtener productos que coincidan con la búsqueda
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { brand: { contains: query, mode: 'insensitive' } }
      ]
    },
    orderBy: [
      { ranking: 'desc' }
    ]
  });

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-medium mb-4">No se encontraron resultados</h2>
        <p className="text-gray-600 mb-8">
          No pudimos encontrar productos que coincidan con "{query}"
        </p>
        <Link href="/" className="inline-block bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return <ClientProductGrid products={products} initialSort="featured" />;
}

// Página principal
export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: { q?: string } 
}) {
  const query = searchParams.q || '';
  
  return (
    <main className="container py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-medium">
          {query ? `Resultados para "${query}"` : 'Búsqueda'}
        </h1>
        <div className="text-gray-500 mt-2">
          Mostrando los mejores productos que coinciden con tu búsqueda
        </div>
      </div>
      
      <Suspense fallback={<div className="py-16 text-center">Cargando resultados...</div>}>
        <SearchResults query={query} />
      </Suspense>
    </main>
  );
}

// Generar metadatos dinámicos
export function generateMetadata({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || 'Productos';
  
  return {
    title: `${query} | Min-Commerce`,
    description: `Resultados de búsqueda para "${query}" - Encuentra los mejores productos en Min-Commerce`
  };
}