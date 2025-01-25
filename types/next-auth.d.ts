import NextAuth, {DefaultSession} from "next-auth"
import { CardBoardProfile } from "next-auth-cardboard"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: CardBoardProfile 
  }
}