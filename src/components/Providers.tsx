"use client"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from 'react';

// Mantener la función existente AuthProvider
export function AuthProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <SessionProvider>{children}</SessionProvider>
}

// Agregar la nueva función Providers para compatibilidad
interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}