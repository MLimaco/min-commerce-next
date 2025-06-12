import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductList from '@/components/ProductList';
import CategoryFilters from '@/components/CategoryFilters';

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { category: string },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = params.category;

  // Obtener todos los productos de esta categoría - modificado para usar campos existentes
  const allCategoryProducts = await prisma.product.findMany({
    where: {
      category: category.toLowerCase(),
    },
    // Selecciona solo campos que existen en tu modelo
    select: {
      id: true,
      title: true,
      price: true,
      brand: true,
      seller: true,
      onSale: true,   // Usamos onSale en lugar de condition
      deliveryTime: true,  // Podemos usar este para filtro de envío
    }
  });

  // Construir los filtros dinámicamente a partir de los datos existentes
  const filterCounts = {
    estado: new Map<string, number>(),
    envio: new Map<string, number>(),
    marca: new Map<string, number>(),
    vendedor: new Map<string, number>(),
  };

  // Contamos los productos para cada posible valor de filtro
  allCategoryProducts.forEach(product => {
    // Usar onSale como sustituto para "estado" del producto
    // Si onSale es true, consideramos que es un producto en oferta especial
    if (product.onSale !== undefined) {
      const estado = product.onSale ? 'oferta' : 'regular';
      const currentCount = filterCounts.estado.get(estado) || 0;
      filterCounts.estado.set(estado, currentCount + 1);
    }

    // Usar deliveryTime para filtro de envío
    // Si el tiempo de entrega es menor a 2 días, lo consideramos envío rápido
    if (product.deliveryTime !== undefined &&
      (typeof product.deliveryTime === 'number'
        ? product.deliveryTime <= 2
        : parseInt(product.deliveryTime) <= 2)) {
      const currentCount = filterCounts.envio.get('rapido') || 0;
      filterCounts.envio.set('rapido', currentCount + 1);
    }

    // Conteo de marcas
    if (product.brand) {
      const currentCount = filterCounts.marca.get(product.brand) || 0;
      filterCounts.marca.set(product.brand, currentCount + 1);
    }

    // Conteo de vendedores
    if (product.seller) {
      const currentCount = filterCounts.vendedor.get(product.seller) || 0;
      filterCounts.vendedor.set(product.seller, currentCount + 1);
    }
  });

  // Convertir los conteos a arrays para el componente de filtros
  const filterData = {
    estado: Array.from(filterCounts.estado, ([value, count]) => ({
      name: value === 'oferta' ? 'En oferta' : 'Precio regular',
      value,
      count
    })),

    envio: filterCounts.envio.has('rapido') ? [
      {
        name: 'Envío rápido (1-2 días)',
        value: 'rapido',
        count: filterCounts.envio.get('rapido') || 0
      }
    ] : [],

    marca: Array.from(filterCounts.marca, ([value, count]) => ({
      name: value,
      value,
      count
    })),

    vendedor: Array.from(filterCounts.vendedor, ([value, count]) => ({
      name: value === 'local' ? 'Tienda Local' :
        value === 'premium' ? 'Vendedor Premium' : value,
      value,
      count
    }))
  };

  // Construir filtros de consulta basados en searchParams, adaptados a tu esquema
  const queryFilters: Record<string, unknown> = {
    category: category.toLowerCase(),
  };

  // Aplicar filtro de estado (usando onSale)
  if (searchParams.estado) {
    const estados = Array.isArray(searchParams.estado) ? searchParams.estado : [searchParams.estado];
    if (estados.includes('oferta')) {
      queryFilters.onSale = true;
    } else if (estados.includes('regular')) {
      queryFilters.onSale = false;
    }
  }

  // Aplicar filtro de envío (usando deliveryTime)
  if (searchParams.envio) {
    const envios = Array.isArray(searchParams.envio) ? searchParams.envio : [searchParams.envio];
    if (envios.includes('rapido')) {
      queryFilters.deliveryTime = {
        lte: 2  // Menor o igual a 2 días
      };
    }
  }

  // Aplicar filtro de marca
  if (searchParams.marca) {
    const marcas = Array.isArray(searchParams.marca) ? searchParams.marca : [searchParams.marca];
    if (marcas.length > 0) {
      queryFilters.brand = {
        in: marcas
      };
    }
  }

  // Aplicar filtro de vendedor
  if (searchParams.vendedor) {
    const vendedores = Array.isArray(searchParams.vendedor) ? searchParams.vendedor : [searchParams.vendedor];
    if (vendedores.length > 0) {
      queryFilters.seller = {
        in: vendedores
      };
    }
  }

  // Consultar productos con filtros
  const filteredProducts = await prisma.product.findMany({
    where: queryFilters,
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Si no hay productos en esta categoría (sin filtros), mostrar 404
  if (allCategoryProducts.length === 0) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-800">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      <div className="mb-4">
        <h1 className="text-2xl font-medium text-gray-900">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} resultados
          {Object.keys(searchParams).length > 0 && ' con los filtros aplicados'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar con filtros */}
        <div className="w-full md:w-64 flex-shrink-0">
          <CategoryFilters
            filterData={filterData}
            categorySlug={category}
          />
        </div>

        {/* Productos */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <div className="bg-gray-50 p-6 rounded-md text-center">
              <h3 className="text-lg font-medium text-gray-700">No se encontraron productos</h3>
              <p className="text-gray-500 mt-2">Intenta con otros filtros o categorías</p>
              <Link
                href={`/categoria/${category}`}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors inline-block"
              >
                Quitar filtros
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}