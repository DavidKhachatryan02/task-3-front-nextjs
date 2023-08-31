import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth";
import { fetchUser } from "~/actions/fetchUser";

async function refreshAccessToken(tokens) {
  try {
    const { accessToken, refreshToken } = tokens;
    const tokenResponse = await fetch(
      "http://localhost:3000/auth/refreshToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          accessToken,
          refreshToken,
        },
      }
    );

    return {
      ...tokens,
      accessToken: tokenResponse.data.accessToken,
      refreshToken: tokenResponse.data.refreshToken,
    };
  } catch (error) {
    return {
      ...tokens,
      error: "RefreshAccessTokenError",
    };
  }
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials, req) {
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

        console.log(data.jwt.accessToken);

        if (res.ok && data) {
          const response = await fetch("http://localhost:3000/auth/getMe", {
            headers: {
              Authorization: `Bearer ${data.jwt.accessToken}`,
            },
          });

          const userData = await response.json();
          console.log(userData);
          return userData;
        } else return null;
      },
      callbacks: {
        async jwt({ token, user }) {
          if (!user) {
            token.accessToken = user.data.accessToken;
            token.refreshToken = user.data.refreshToken;
            const newTokens = await refreshAccessToken(token);
            return newTokens;
          }
        },
        async session({ session, token, user }) {
          // Send properties to the client, like an access_token from a provider.
          session.user = token;
          return session;
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
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
