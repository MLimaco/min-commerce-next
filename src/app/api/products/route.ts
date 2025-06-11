import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/products
 * Obtiene todos los productos
 */
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validación básica
    if (!body.title || !body.price || !body.imageUrl || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const product = await prisma.product.create({
      data: {
        title: body.title,
        description: body.description || '',
        price: parseFloat(body.price),
        imageUrl: body.imageUrl,
        category: body.category,
        onSale: body.onSale || false,
        ranking: body.ranking || 0,
        deliveryTime: body.deliveryTime || '24 hrs',
        brand: body.brand || 'Genérico',
        seller: body.seller || 'Marketplace'
      }
    })
    
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}