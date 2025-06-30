'use client';
import { Session } from "next-auth";
import { useContext, useState, useEffect, useRef } from 'react';
import { CartContext } from '@/context/cartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, User, Search, ChevronDown, Menu } from 'lucide-react';
import AuthButton from './AuthButton';

interface HeaderProps {
  session: Session | null; // Definir el prop session
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState([
    { name: 'Promociones', slug: 'promociones' },
    { name: 'Internacional', slug: 'internacional' },
    { name: 'Celulares y teléfonos', slug: 'celulares' },
    { name: 'Computación', slug: 'computacion' },
    { name: 'Electrohogar', slug: 'electrohogar' },
    { name: 'Televisores', slug: 'televisores' },
    { name: 'Videojuegos', slug: 'videojuegos' },
    { name: 'Moda', slug: 'moda' },
  ]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    }

    if (showCategories) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategories]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      try {
        setIsLoadingCategories(true);
        const response = await fetch('/api/categories');

        if (!isMounted) return;

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error cargando categorías:', error);
      } finally {
        setTimeout(() => {
          if (isMounted) {
            setIsLoadingCategories(false);
          }
        }, 300);
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-xl font-medium text-gray-800 transition-colors hover:text-gray-600">
          <span className="font-bold border-b-2 border-teal-500 pb-0.5">MIN</span>-COMMERCE
        </Link>

        <div className="hidden md:block relative" ref={categoriesRef}>
          <button
            className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all ${
              showCategories ? 'text-teal-600 bg-gray-100' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={toggleCategories}
            aria-expanded={showCategories}
            aria-controls="categories-menu"
          >
            <span>Categorías</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${showCategories ? 'rotate-180' : ''}`}
            />
          </button>

          {showCategories && (
            <div
              id="categories-menu"
              className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100 max-h-[70vh] overflow-y-auto animate-fadeIn"
            >
              {isLoadingCategories ? (
                <div className="px-4 py-3 text-gray-600 flex items-center">
                  <div className="animate-spin mr-3 h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full"></div>
                  Cargando...
                </div>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                    onClick={() => setShowCategories(false)}
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-600">No hay categorías disponibles</div>
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 hidden md:flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600 transition-colors"
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-2 md:gap-4">
          <AuthButton />
          <Link
            href="/cart"
            className="relative group"
            aria-label={`Carrito con ${cartItemCount} productos`}
          >
            <div className="flex items-center justify-center p-2 text-gray-700 hover:text-teal-600 transition-colors">
              <ShoppingCart size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cartItemCount}
                </span>
              )}
            </div>
          </Link>
          <button
            className="p-2 md:hidden text-gray-700 hover:text-teal-600 transition-colors"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Menú"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;