import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma), // Guarda usuarios y cuentas en BD
  session: {
    strategy: "jwt", // MANTENER JWT para middleware
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Añadir rol al token JWT (funcionalidad existente mantenida)
    async jwt({ token, user, account }) {
      console.log("Callback JWT ejecutado");
      if (user || account) {
        const isAdmin = user?.email === "m.limaco0191@gmail.com";
        token.role = isAdmin ? "admin" : "user";
        console.log("Token generado:", token); // Depuración
      }
      return token;
    },
    // Añadir rol a la sesión (funcionalidad existente mantenida)
    async session({ session, token }) {
      console.log("Callback Session ejecutado");
      if (session.user) {
        session.user.role = token.role;
        console.log("Sesión generada:", session); // Depuración
      }
      return session;
    },
    // Registrar login en callback signIn (Parte 2 - Nueva funcionalidad)
    async signIn({ user, account }) {
      try {
        await prisma.sessionLog.create({
          data: {
            userId: user.id!,
            action: 'login',
            provider: account?.provider || 'unknown',
          }
        });
        console.log('Login registrado en SessionLog para usuario:', user.email);
      } catch (error) {
        console.error('Error registrando login:', error);
      }
      return true;
    },
  },
  // Registrar logout en events (Parte 2 - Nueva funcionalidad)
  events: {
    async signOut({ token }) {
      if (token?.sub) {
        try {
          await prisma.sessionLog.create({
            data: {
              userId: token.sub,
              action: 'logout',
            }
          });
          console.log('Logout registrado en SessionLog para usuario ID:', token.sub);
        } catch (error) {
          console.error('Error registrando logout:', error);
        }
      }
    },
  },
  pages: {
    signIn: '/login', // Funcionalidad existente mantenida
  },
  secret: process.env.NEXTAUTH_SECRET, // Funcionalidad existente mantenida
});