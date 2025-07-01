import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from 'next/link';

export default async function AdminPage() {
  const session = await auth();

  console.log("Sesión actual:", session); // Depuración

  // Verificar si el usuario está autenticado
  if (!session) {
    redirect("/login");
  }

  // Verificar si el usuario tiene rol de administrador
  if (session?.user?.role !== "admin") {
    return (
      <main className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">Acceso denegado. Necesitas permisos de administrador.</p>
          <p className="text-sm text-gray-600">Usuario actual: {session.user?.email}</p>
          <p className="text-sm text-gray-600">Rol detectado: {session.user?.role || "ninguno"}</p>
        </div>
      </main>
    );
  }


  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Productos</h2>
          <p className="text-gray-600 mb-4">Gestiona los productos de la tienda</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Administrar productos
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
          <p className="text-gray-600 mb-4">Gestiona los usuarios registrados</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Administrar usuarios
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Logs de Sesión</h2>
          <p className="text-gray-600 mb-4">Visualiza los logs de login y logout de usuarios</p>
          <Link
            href="/admin/logs"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Ver logs de sesión
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-500">
          Conectado como: <span className="font-semibold">{session.user?.name}</span> (Administrador)
        </p>
      </div>
    </main>
  );
}