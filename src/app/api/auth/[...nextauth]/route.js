import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiClient } from "~/services/client";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          const { email, code } = credentials;
          const { data } = await apiClient.post("/auth/login", { email, code });
          const { data: user } = await apiClient.get("/auth/getMe", {
            headers: {
              Authorization: data.jwt.accessToken,
            },
          });

          if (user) {
            // console.log('Authorize return value', { ...data.jwt, ...user });
            return { credentials: data.jwt, user };
          }

          return null;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("JWT callback", { token, user, account });

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // console.log('Session callback', { session, token, user });

      // Send properties to the client, like an access_token and user id from a provider.
      session.user = { ...token.user, ...token.credentials };

      return session;
    },
  },
  pages: {
    signIn: "/auth/verify",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
