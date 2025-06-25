import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: '/login',
},
  callbacks: {
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role

      }
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.role = user.email === "m.limaco0191@gmail.com" ? "admin" : "user"
      }
      return token
    },
  },
})
