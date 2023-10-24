import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

const apiBaseURL = 'https://localhost:7156/api/ValidateUser';

export const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(apiBaseURL, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
          
          const user = await res.json();
          console.log(user);

          if (user) {
            return user;
          }

          return null;
        } catch (err) {
          console.log(err);
        }
      }
    })
  ]
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
