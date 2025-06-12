// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
// Asegúrate de que la configuración sea correcta

export const handler = NextAuth({
  providers: [
    // Tus proveedores aquí
  ],
  // Resto de tu configuración
});

export { handler as GET, handler as POST };