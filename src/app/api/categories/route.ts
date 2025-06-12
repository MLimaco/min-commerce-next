import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Obtenemos categorías únicas y las contamos
        const categoriesData = await prisma.product.groupBy({
            by: ['category'],
            _count: {
                id: true
            }
        });

        // Formateamos los datos para la respuesta
        const categories = categoriesData.map(cat => ({
            name: cat.category.charAt(0).toUpperCase() + cat.category.slice(1),
            slug: cat.category,
            count: cat._count.id
        }));

        categories.sort((a, b) => a.name.localeCompare(b.name));


        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json([], { status: 500 });
    }
}