import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper function para centralizar la lógica de control de acceso
function hasAccess(path: string, role: string): boolean {
  if (path.startsWith('/admin')) return role === 'admin';
  if (path.startsWith('/dashboard')) return ['admin', 'user'].includes(role);
  if (path.startsWith('/profile')) return ['admin', 'user'].includes(role);
  if (path.startsWith('/orders')) return ['admin', 'user'].includes(role);
  if (path.startsWith('/settings')) return ['admin', 'user'].includes(role);
  return true; // Por defecto, permitir acceso
}

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Si no hay sesión, redirigir a login para todas las rutas protegidas
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Control de acceso contextual: Rutas que requieren rol específico
  // Principio de menor privilegio aplicado
  const userRole = session?.user?.role || 'user';

  // Usar helper function para verificar acceso
  if (!hasAccess(pathname, userRole)) {
    // Si el usuario está autenticado pero no autorizado, redirigir a página de acceso denegado
    return NextResponse.redirect(new URL('/denied', req.url));
  }

  // Lógica específica para rutas admin (manteniendo funcionalidad existente)
  if (pathname.startsWith('/admin')) {
    // Solo usuarios con rol 'admin' pueden acceder a rutas admin
    if (session?.user?.role !== "admin") {
      // Redirigir a página de acceso denegado personalizada
      return NextResponse.redirect(new URL('/denied', req.url));
    }
  }

  // Middleware condicional por rol - Parte 2
  if (session?.user?.role !== 'admin' && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/denied', req.url));
  }

  // Para rutas como /profile y /dashboard, verificar con helper function
  // /dashboard puede ser accedido por ambos (admin y user)
  // /profile puede ser accedido por usuarios autenticados

  // Si pasa todas las validaciones, continuar con la request
  return NextResponse.next();
}

export const config = {
  // Proteger rutas privadas - expandido para incluir más rutas protegidas
  matcher: [
    '/admin/:path*',    // Todas las rutas admin (requiere rol admin)
    '/profile',         // Perfil de usuario (requiere autenticación)
    '/dashboard',       // Dashboard (requiere autenticación - admin y user)
    '/orders/:path*',   // Órdenes de usuario (si las tienes)
    '/settings/:path*', // Configuraciones (si las tienes)
  ],
};