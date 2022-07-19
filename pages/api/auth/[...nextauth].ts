import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";

let userAccount = null;

const prisma = new PrismaClient();

const confirmPasswordHash = (plainPassword, hashedPassword) => {
  return new Promise((resolve) => {
    resolve(Object.is(plainPassword,hashedPassword));
  });
};

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        if (credentials.usuario) credentials.user = credentials.usuario;
        try {
          const user = await prisma.usuarios.findFirst({
            where: {
              usuario: credentials.user,
            },
          });

          if (user !== null) {
            //Compare the hash

            const res = await confirmPasswordHash(
              credentials.senha,
              user.senha
            );
            if (res === true) {
              userAccount = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                usuario: user.usuario,
                isActive: user.isActive,
                acess: user.acesso,
              };
              return userAccount;
            } else {
              console.log("Hash not matched logging in");
              return null;
            }
          } else {
            return null;
          }
        } catch (err) {
          console.log("Authorize error:", err);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        //the user object is wrapped in another user object so extract it
        user = user;
        console.log("Sign in callback", user);
        console.log("User id: ", user.id);
        if (typeof user.id !== typeof undefined) {
          if (user.isActive === "1") {
            console.log("User is active");
            return true;
          } else {
            console.log("User is not active");
            return false;
          }
        } else {
          console.log("User id was undefined");
          return false;
        }
      } catch (err) {
        console.error("Signin callback error:", err);
      }
    },
    async session({ session, user, token }) {
      if (userAccount !== null) {
        //session.user = userAccount;
        session.user = {
          name: `${userAccount.firstName} ${userAccount.lastName}`,
          email: userAccount.email,
        };
      } else if (
        typeof token.user !== typeof undefined &&
        typeof session.user === typeof undefined
      ) {
        session.user = token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      console.log("JWT callback. Got User: ", token);
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions)