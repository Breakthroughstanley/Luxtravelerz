import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { AuthOptions } from "next-auth";



export const authOptions: AuthOptions = { 
  trustHost: true,
  adapter: PrismaAdapter(prisma),

  providers: [
  GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  allowDangerousEmailAccountLinking: true,
}),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

    async authorize(credentials) {
  if (!credentials?.email) {
    throw new Error("EMAIL_REQUIRED");
  }

  if (!credentials?.password) {
    throw new Error("PASSWORD_REQUIRED");
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  if (!user.password) {
    throw new Error("NO_PASSWORD_SET"); // for Google users trying credentials
  }

  if (!user.emailVerified) {
    throw new Error("EMAIL_NOT_VERIFIED");
  }

  const isValid = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isValid) {
    throw new Error("INVALID_PASSWORD");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
    }),
  ],

  session: {
    strategy: "jwt",
  },

 pages: {
  signIn: "/login",
},

callbacks: {
 async signIn({ user, account }) {
  if (account?.provider === "google") {
    await prisma.user.upsert({
      where: { email: user.email! },
      update: {
        emailVerified: new Date(),
        name: user.name,
        image: user.image,
      },
      create: {
        email: user.email!,
        name: user.name,
        image: user.image,
        emailVerified: new Date(),
      },
    });
  }

  return true;
},



  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
    }

    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
    }

    return session;
  },
},

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };