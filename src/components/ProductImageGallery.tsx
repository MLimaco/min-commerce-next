'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  imageUrl: string;
  title: string;
}

export default function ProductImageGallery({ imageUrl, title }: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(imageUrl);
  
  // En una aplicación real, tendrías múltiples imágenes
  const thumbnails = [imageUrl];
  
  return (
    <div>
      {/* Imagen principal */}
      <div className="bg-white rounded-lg shadow-sm mb-4 h-96 flex items-center justify-center p-4">
        <Image 
          src={mainImage} 
          alt={title} 
          width={400}
          height={400}
          className="max-h-full object-contain" 
          priority
        />
      </div>
      
      {/* Miniaturas - en una app real mostrarías múltiples imágenes */}
      <div className="flex space-x-2">
        {thumbnails.map((thumb, index) => (
          <div 
            key={index}
            className={`w-16 h-16 border rounded-md cursor-pointer p-1 
              ${thumb === mainImage ? 'border-blue-500' : 'border-gray-200'}`}
            onClick={() => setMainImage(thumb)}
          >
            <Image 
              src={thumb} 
              alt={`${title} - thumbnail ${index + 1}`}
              width={60}
              height={60}
              className="w-full h-full object-contain" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}