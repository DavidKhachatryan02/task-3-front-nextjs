import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { fetchUser } from "~/actions/fetchUser";
import { loginUser } from "~/actions/loginUser";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        code: { label: "Code", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          const response = await loginUser({
            username: credentials.username,
            password: credentials.code,
          });

          if (response.status === 200) {
            const { access_token, refresh_token } = response.data;
            return Promise.resolve({ access_token, refresh_token });
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = fetchUser();
      return session;
    },
  },
});
