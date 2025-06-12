import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/products/[id]
 * Obtiene un producto específico por ID
 */
// @ts-expect-error - Next.js 15.3.3 type incompatibility
export async function GET(
  request: NextRequest,
  // @ts-expect-error - Next.js 15.3.3 type incompatibility
  { params }: { params: { id: string } }
) {
  try {
    // Resolver params antes de usar sus propiedades
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    const product = await prisma.product.findUnique({
      where: { id }
    });
    
    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return Response.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/[id]
 * Actualiza un producto existente
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Resolver params antes de usar sus propiedades
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    const body = await request.json();
    
    // Verificar que el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });
    
    if (!existingProduct) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Actualizar el producto
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: body
    });
    
    return Response.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return Response.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/[id]
 * Elimina un producto
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Resolver params antes de usar sus propiedades
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    // Verificar que el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });
    
    if (!existingProduct) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Eliminar el producto
    await prisma.product.delete({
      where: { id }
    });
    
    return Response.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return Response.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}