import SimpleBanner from '@/components/SimpleBanner'; // Usar el nuevo componente
import prisma from '@/lib/prisma';
import ProductList from '@/components/ProductList';

export default async function HomePage() {
  try {
    // Consulta directa a la base de datos (Server Component)
    const products = await prisma.product.findMany();

    return (
      <>
        <SimpleBanner />
        <main className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-medium mb-6">Nuestros Productos</h1>
          {products.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            <ProductList products={products} />
          )}
        </main>
      </>
    );
  } catch (error) {
    console.error('Error cargando productos:', error);
    return (
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-medium mb-6">Nuestros Productos</h1>
        <p className="text-red-500">Error al cargar productos. Por favor, intenta nuevamente.</p>
      </main>
    );
  }
}