import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ClientProductGrid from '@/components/ClientProductGrid';

// Tipos para los filtros
type Filters = {
  onSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  sellers?: string[];
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} | Min-Commerce`,
    description: `Explora nuestra selección de productos en la categoría ${category}`,
  };
}

export default async function CategoryPage({ 
  params, 
  searchParams 
}: { 
  params: { category: string },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = decodeURIComponent(params.category);
  
  // Procesamos los filtros de la URL
  const filters: Filters = {};
  if (searchParams.onSale === 'true') filters.onSale = true;
  if (searchParams.minPrice) filters.minPrice = Number(searchParams.minPrice);
  if (searchParams.maxPrice) filters.maxPrice = Number(searchParams.maxPrice);
  
  // Obtenemos todas las marcas de esta categoría para los filtros
  const brands = await prisma.product.groupBy({
    by: ['brand'],
    where: { 
      category: category.toLowerCase() 
    },
    _count: {
      id: true
    }
  });
  
  // Obtenemos todos los vendedores de esta categoría
  const sellers = await prisma.product.groupBy({
    by: ['seller'],
    where: { 
      category: category.toLowerCase() 
    },
    _count: {
      id: true
    }
  });
  
  // Construimos la consulta base
  let where: any = { category: category.toLowerCase() };
  
  // Aplicamos los filtros
  if (filters.onSale) where.onSale = true;
  if (filters.minPrice) where.price = { ...where.price, gte: filters.minPrice };
  if (filters.maxPrice) where.price = { ...where.price, lte: filters.maxPrice };
  if (filters.brands) where.brand = { in: filters.brands };
  if (filters.sellers) where.seller = { in: filters.sellers };
  
  // Determinamos el orden
  const sortOrder = searchParams.sort as string || 'featured';
  let orderBy: any = { ranking: 'desc' }; // Default: mejor valorados
  
  switch(sortOrder) {
    case 'price_asc':
      orderBy = { price: 'asc' };
      break;
    case 'price_desc':
      orderBy = { price: 'desc' };
      break;
    case 'newest':
      orderBy = { id: 'desc' }; // Asumiendo que los IDs más recientes son productos más nuevos
      break;
  }
  
  // Obtenemos los productos filtrados
  const products = await prisma.product.findMany({
    where,
    orderBy,
  });
  
  // Calculamos el rango de precios para el filtro
  const priceStats = await prisma.product.aggregate({
    where: { category: category.toLowerCase() },
    _min: { price: true },
    _max: { price: true },
  });
  
  // Si no hay productos en esta categoría, mostrar 404
  if (products.length === 0) {
    notFound();
  }

  return (
    <main className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">&gt;</span>
        <Link href="/categoria" className="hover:text-gray-700">Categorías</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-800">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Columna de filtros */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-4">
            {/* Encabezado de la categoría */}
            <h1 className="text-2xl font-medium mb-2">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h1>
            <p className="text-gray-600 mb-6">
              {products.length} resultados
            </p>
            
            {/* Filtros */}
            <div className="space-y-6">
              {/* Filtro de estado */}
              <div>
                <h3 className="font-medium mb-3">Estado</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      defaultChecked={filters.onSale} 
                    />
                    <span>Nuevo</span>
                  </label>
                </div>
              </div>
              
              {/* Filtro de envío */}
              <div>
                <h3 className="font-medium mb-3">Envío</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                    />
                    <span>Envío gratis</span>
                  </label>
                </div>
              </div>
              
              {/* Filtro de marcas */}
              <div>
                <h3 className="font-medium mb-3">Marca</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map(brand => (
                    <label key={brand.brand} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2"
                          defaultChecked={filters.brands?.includes(brand.brand)} 
                        />
                        <span>{brand.brand}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({brand._count.id})</span>
                    </label>
                  ))}
                </div>
                <button className="text-sm text-blue-600 mt-2">Mostrar más</button>
              </div>
              
              {/* Filtro de vendedores */}
              <div>
                <h3 className="font-medium mb-3">Vendedor</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {sellers.map(seller => (
                    <label key={seller.seller} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2"
                          defaultChecked={filters.sellers?.includes(seller.seller)} 
                        />
                        <span>{seller.seller}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({seller._count.id})</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Filtro de descuentos */}
              <div>
                <h3 className="font-medium mb-3">Descuentos</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                      />
                      <span>Desde 60% OFF</span>
                    </div>
                    <span className="text-gray-500 text-sm">(6)</span>
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                      />
                      <span>Desde 50% OFF</span>
                    </div>
                    <span className="text-gray-500 text-sm">(123)</span>
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                      />
                      <span>Desde 40% OFF</span>
                    </div>
                    <span className="text-gray-500 text-sm">(151)</span>
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                      />
                      <span>Desde 30% OFF</span>
                    </div>
                    <span className="text-gray-500 text-sm">(240)</span>
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                      />
                      <span>Desde 25% OFF</span>
                    </div>
                    <span className="text-gray-500 text-sm">(239)</span>
                  </label>
                </div>
                <button className="text-sm text-blue-600 mt-2">Mostrar más</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Lista de productos - AQUÍ USAMOS EL COMPONENTE ClientProductGrid */}
        <div className="flex-1">
          <ClientProductGrid products={products} initialSort={sortOrder} />
        </div>
      </div>
    </main>
  );
}