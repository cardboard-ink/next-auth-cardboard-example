import NextAuth from "next-auth";
import Guilded from "next-auth-cardboard";

const handler = NextAuth({
  secret: process.env.SESSION_SECRET!,
  providers: [
    Guilded({
      clientId: process.env.CARDBOARD_CLIENT_ID!,
      clientSecret: process.env.CARDBOARD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log(session, token);
      return session;
    },
    async signIn({ user }) {
      console.log(user);
      return true;
    },
  },
});

export { handler as GET, handler as POST };
