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
    async jwt({ token, profile }) {
      // Include CardBoardProfile in the token during sign-in
      if (profile) {
        token.cardboardProfile = profile as CardBoardProfile;
      }
      console.log("PROFILE", profile)
      return token;
    },
    async session({ session, token }) {
      // Merge CardBoardProfile into the session's user object
      if (token.cardboardProfile) {
        session.user = {
          ...session.user,
          ...token.cardboardProfile, // Add all profile fields to the user object
        };
      }
      console.log("SESSION", session)
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("Real User:", user, "Account:", account, "TypedProfile:", profile as CardBoardProfile);
      return true;
    },
  },
});

export { handler as GET, handler as POST };
