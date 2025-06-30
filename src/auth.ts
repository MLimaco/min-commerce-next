import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
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
        session.user.role = token.role as "admin" | "user";
        console.log("Sesión generada:", session); // Depuración
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});