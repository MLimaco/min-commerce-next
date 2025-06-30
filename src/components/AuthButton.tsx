"use client"
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { User, LogOut } from 'lucide-react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  // Mostrar loading state mientras se carga la sesión
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-2">
        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        {/* Mantener tu Link existente al perfil */}
        <Link 
          href={"/profile"} 
          className="text-xs border border-border rounded-lg px-6 h-8 flex items-center gap-2 hover:bg-muted transition-colors"
        >
          <User size={16} />
          <span>{session.user?.name}</span>
        </Link>
        
        {/* Mantener tu Button existente para cerrar sesión */}
        <Button 
          onClick={() => signOut()}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Cerrar sesión
        </Button>
      </div>
    )
  }

  // Mantener tu Link existente para iniciar sesión
  return (
    <Link 
      href={"/login"} 
      className="text-xs border border-border rounded-lg px-6 h-8 flex items-center gap-2 hover:bg-muted transition-colors"
    >
      <User size={16} />
      Iniciar sesión
    </Link>
  )
}