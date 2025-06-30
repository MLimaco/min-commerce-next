import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Añadir rol al token JWT
    async jwt({ token, user, account }) {
      console.log("Callback JWT ejecutado");
      if (user || account) {
        const isAdmin = user?.email === "m.limaco0191@gmail.com";
        token.role = isAdmin ? "admin" : "user";
        console.log("Token generado:", token); // Depuración
      }
      return token;
    },
    // Añadir rol a la sesión
    async session({ session, token }) {
      console.log("Callback Session ejecutado");
      if (session.user) {
        session.user.role = token.role;
        console.log("Sesión generada:", session); // Depuración
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);