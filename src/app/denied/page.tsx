import { auth } from "@/auth";
import Link from "next/link";
import { ShieldX, Home, User } from "lucide-react";

export default async function AccessDeniedPage() {
  const session = await auth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <ShieldX className="mx-auto h-16 w-16 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Acceso Denegado
        </h1>
        
        <p className="text-gray-600 mb-6">
          No tienes permisos suficientes para acceder a esta página.
        </p>

        {/* Mostrar información del usuario actual */}
        {session?.user && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Información de tu cuenta
              </span>
            </div>
            <p className="text-sm text-gray-600">
              <strong>Usuario:</strong> {session.user.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Rol actual:</strong> {session.user.role || 'usuario'}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Si crees que esto es un error, contacta al administrador.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}