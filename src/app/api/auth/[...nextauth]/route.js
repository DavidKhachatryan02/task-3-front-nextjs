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
<<<<<<< HEAD
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
=======
        const { email, code } = credentials;

        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
          }),
        });

        const data = await res.json();

        if (res.ok && data) {
          const user = await fetchUser(data.jwt.accessToken);

          console.log("AUTH ROUTE", user);

          return user;
        } else if (res.status === 401) {
          newTokens = await refreshAccessToken(data.jwt);

          const userData = await fetchUser(newTokens.accessToken);

          return { user: userData };
        } else return null;
      },
      callbacks: {
        async jwt({ token, user, account }) {
          // if (!user) {
          //   token.accessToken = user.data.accessToken;
          //   token.refreshToken = user.data.refreshToken;
          //   const newTokens = await refreshAccessToken(token);
          //   return newTokens;
          // }
          console.log({ account });

          return { ...token, ...user };
        },
        async session({ session, user, token }) {
          session.user = token.user;
        },
      },
      session: { strategy: "jwt" },
      // callbacks: {
      //   async signIn({ user, account, profile, email, credentials }) {
      //     const { data } = await apiClient.post(
      //       "/auth/login",
      //       { email: user.email, code: user.code },
      //       {
      //         cache: "no-store",
      //       }
      //     );
      //     if (data) {
      //       console.log(data);
      //     } else {
      //       // Return false to display a default error message
      //       console.log("NO USER");
      //       // Or you can return a URL to redirect to:
      //       // return '/unauthorized'
      //     }
      //   },
      // },
      pages: {
        signIn: "/auth/verify",
>>>>>>> aeae28ef8ad3c7c5c929a16692c0238e2a98082d
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
