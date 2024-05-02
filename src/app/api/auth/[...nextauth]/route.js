import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});
export { handler as GET, handler as POST };
