import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Obtener la consulta de búsqueda desde los parámetros
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    // Si no hay consulta, retornar array vacío
    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }
    
    // Buscar productos que coincidan con la consulta
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { brand: { contains: query, mode: 'insensitive' } },
        ]
      },
      select: {
        id: true,
        title: true,
        price: true,
        imageUrl: true,
        ranking: true
      },
      orderBy: [
        { ranking: 'desc' }, // Primero los mejor valorados
        { price: 'asc' }     // A igual valoración, los más baratos primero
      ],
      take: 5 // Limitar a 5 resultados para no sobrecargar
    });
    
    return NextResponse.json(products);
    
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return NextResponse.json([], { status: 500 });
  }
}