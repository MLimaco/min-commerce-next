import authConfig from "./auth.config"; // Importar configuración común
import NextAuth from "next-auth";
import { NextResponse, NextRequest } from "next/server";

// Inicializar Auth.js con la configuración común
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const session = await auth(req); // Usar auth() para obtener la sesión

  if (!session || session?.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};