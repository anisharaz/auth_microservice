import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [Google],
  trustHost: true,
  callbacks: {
    // * If you have protected route, uncomment this
    // authorized: async ({ auth, request: { nextUrl } }) => {
    //   const isLoggedIn = !!auth?.user;
    //   const isProtected = nextUrl.pathname.startsWith("/protected");
    //   if (isProtected) {
    //     if (isLoggedIn) {
    //       return true;
    //     }
    //     return false;
    //   }
    //   return true;
    // },
    jwt: async ({ token, account, user, profile, session, trigger }) => {
      // trigger=="signUp" will be true when the user is new user
      // You can do some action like sending welcome to new users here
      return token;
    },
    session: async ({ session, token, user, newSession, trigger }) => {
      session.user.userId = token.sub!;
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else return url;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  debug: process.env.MODE === "dev",
  cookies: {
    sessionToken: {
      name: "auth_token",
      options: {
        domain: process.env.JWT_DOMAIN,
        maxAge: 60 * 60 * 24 * 30, // 30 days
      },
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
} satisfies NextAuthConfig;
