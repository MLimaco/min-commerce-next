'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FilterIcon } from 'lucide-react';

type FilterOption = {
  name: string;
  value: string;
  count: number;
};

type FilterGroupProps = {
  title: string;
  name: string;
  options: FilterOption[];
  activeFilters: string[];
  onChange: (name: string, value: string, checked: boolean) => void;
};

// Componente para cada grupo de filtros
function FilterGroup({ title, name, options, activeFilters, onChange }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (options.length === 0) return null;

  return (
    <div className="mb-6">
      <div 
        className="flex justify-between items-center mb-2 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-gray-800">{title}</h3>
        <button className="text-gray-500">
          {isOpen ? '−' : '+'}
        </button>
      </div>
      
      {isOpen && (
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="checkbox"
                id={`${name}-${option.value}`}
                checked={activeFilters.includes(option.value)}
                onChange={(e) => onChange(name, option.value, e.target.checked)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label htmlFor={`${name}-${option.value}`} className="ml-2 text-gray-700 cursor-pointer flex-1">
                {option.name}
                <span className="text-gray-500 ml-1">({option.count})</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryFilters({ 
  filterData, 
  categorySlug 
}: { 
  filterData: any;
  categorySlug: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Inicializar filtros activos desde la URL al cargar
  useEffect(() => {
    const currentFilters: Record<string, string[]> = {};
    
    // Nombres de filtros que esperamos encontrar en la URL
    const filterNames = ['estado', 'envio', 'marca', 'vendedor'];
    
    filterNames.forEach(name => {
      const values = searchParams.getAll(name);
      if (values.length > 0) {
        currentFilters[name] = values;
      }
    });
    
    setActiveFilters(currentFilters);
  }, [searchParams]);

  // Función para manejar cambios en los filtros
  const handleFilterChange = (name: string, value: string, checked: boolean) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      if (checked) {
        // Añadir el filtro
        if (!newFilters[name]) {
          newFilters[name] = [];
        }
        newFilters[name] = [...newFilters[name], value];
      } else {
        // Quitar el filtro
        if (newFilters[name]) {
          newFilters[name] = newFilters[name].filter(v => v !== value);
          if (newFilters[name].length === 0) {
            delete newFilters[name];
          }
        }
      }
      
      // Actualizar la URL con los nuevos filtros
      updateUrl(newFilters);
      
      return newFilters;
    });
  };

  // Actualizar la URL con los filtros seleccionados
  const updateUrl = (filters: Record<string, string[]>) => {
    const params = new URLSearchParams(searchParams as any);
    
    // Primero eliminar todos los parámetros existentes de filtros
    ['estado', 'envio', 'marca', 'vendedor'].forEach(name => {
      params.delete(name);
    });
    
    // Luego añadir los filtros activos
    Object.entries(filters).forEach(([name, values]) => {
      values.forEach(value => {
        params.append(name, value);
      });
    });
    
    router.push(`/categoria/${categorySlug}?${params.toString()}`);
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setActiveFilters({});
    router.push(`/categoria/${categorySlug}`);
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <>
      {/* Botón de filtros móvil */}
      <div className="md:hidden mb-4">
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <FilterIcon size={16} />
          <span>Filtros</span>
          {hasActiveFilters && (
            <span className="bg-teal-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {Object.values(activeFilters).reduce((acc, curr) => acc + curr.length, 0)}
            </span>
          )}
        </button>
      </div>
      
      {/* Filtros para escritorio (siempre visibles) y móvil (condicionales) */}
      <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} md:block`}>
        <div className="bg-white p-4 md:p-0 rounded-lg shadow-md md:shadow-none mb-4 md:mb-0">
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="font-medium text-lg">Filtros</h2>
            <button 
              className="text-gray-500" 
              onClick={() => setIsMobileFiltersOpen(false)}
            >
              ×
            </button>
          </div>
          
          {/* Grupos de filtros */}
          <FilterGroup
            title="Estado"
            name="estado"
            options={filterData.estado || []}
            activeFilters={activeFilters.estado || []}
            onChange={handleFilterChange}
          />
          
          <FilterGroup
            title="Envío"
            name="envio"
            options={filterData.envio || []}
            activeFilters={activeFilters.envio || []}
            onChange={handleFilterChange}
          />
          
          <FilterGroup
            title="Marca"
            name="marca"
            options={filterData.marca || []}
            activeFilters={activeFilters.marca || []}
            onChange={handleFilterChange}
          />
          
          <FilterGroup
            title="Vendedor"
            name="vendedor"
            options={filterData.vendedor || []}
            activeFilters={activeFilters.vendedor || []}
            onChange={handleFilterChange}
          />
          
          {/* Botón para limpiar filtros */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="mt-4 w-full px-4 py-2 text-sm font-medium text-teal-600 border border-teal-600 rounded-md hover:bg-teal-50 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </>
  );
}