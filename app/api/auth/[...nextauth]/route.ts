import NextAuth from "next-auth";
import {CardBoard, CardBoardProfile} from "next-auth-cardboard";

const handler = NextAuth({
  secret: process.env.SESSION_SECRET!,
  providers: [
    CardBoard({
      clientId: process.env.CARDBOARD_CLIENT_ID!,
      clientSecret: process.env.CARDBOARD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log(session, token);
      return session;
    },
    async signIn({user, account, profile}) {
      const realUser = user;
      const typedProfile = profile as CardBoardProfile;
      console.log(realUser, account, typedProfile);
      return true;
    },
  },
});

export { handler as GET, handler as POST };
