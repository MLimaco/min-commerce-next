'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Banners
const banners = [
  {
    id: 1,
    url: "https://simple.ripley.com.pe/home/_next/image?url=https%3A%2F%2Fapi-pe.ripley.com%2Fexperience%2Fecommerce%2Frdex%2Fapi-image-interceptor%2Fv1%2Fimages%2FaEdGILh8WN-LV6NZ_pe-desk-sl1-bth-moda-100625.webp&w=1920&q=100",
    alt: "Promoción moda",
    link: "/categoria/moda"
  },
  {
    id: 2,
    url: "https://simple.ripley.com.pe/home/_next/image?url=https%3A%2F%2Fapi-pe.ripley.com%2Fexperience%2Fecommerce%2Frdex%2Fapi-image-interceptor%2Fv1%2Fimages%2FaEnhobNJEFaPX4XU_pe-desk-sl2-bth-telefonia-110625.webp&w=1920&q=100",
    alt: "Promoción telefonía",
    link: "/categoria/celulares"
  },
  {
    id: 3, 
    url: "https://simple.ripley.com.pe/home/_next/image?url=https%3A%2F%2Fapi-pe.ripley.com%2Fexperience%2Fecommerce%2Frdex%2Fapi-image-interceptor%2Fv1%2Fimages%2FaEhR97h8WN-LV8Ta_pe-desk-sl6-bth-computo-100625.webp&w=1920&q=100",
    alt: "Promoción cómputo",
    link: "/categoria/computacion"
  }
];

export default function SimpleBanner() {
  const [active, setActive] = useState(0);
  
  // Rotar banners automáticamente
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(current => (current + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full" style={{marginTop: '1px'}}>
      <div className="relative">
        {/* Banners - usando tag img estándar en lugar de Image de Next.js */}
        {banners.map((banner, index) => (
          <div 
            key={banner.id} 
            className={`transition-opacity duration-500 ${
              index === active ? 'opacity-100 block' : 'opacity-0 hidden'
            }`}
          >
            <Link href={banner.link}>
              <img 
                src={banner.url}
                alt={banner.alt}
                className="w-full h-auto"
              />
            </Link>
          </div>
        ))}
        
        {/* Controles */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button 
              key={i}
              className={`w-3 h-3 rounded-full ${i === active ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        
        {/* Flechas */}
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-white"
          onClick={() => setActive(prev => (prev === 0 ? banners.length - 1 : prev - 1))}
        >
          &lt;
        </button>
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-white"
          onClick={() => setActive(prev => (prev + 1) % banners.length)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}