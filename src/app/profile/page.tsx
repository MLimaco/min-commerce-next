import { auth } from "@/auth"; // Importar desde auth.ts en lugar de route.ts
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth(); // Usar auth() en lugar de getServerSession(authOptions)

  // Verificar si el usuario está autenticado
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          {session.user?.image && (
            <img 
              src={session.user.image} 
              alt={session.user.name || "Usuario"}
              className="w-16 h-16 rounded-full"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">{session.user?.name}</h2>
            <p className="text-gray-600">{session.user?.email}</p>
            <p className="text-sm text-gray-500">Rol: {session.user?.role || "usuario"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}