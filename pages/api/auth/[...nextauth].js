import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jmunroe@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.APP_URL}/api/authentication`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        try {
          const user = await res.json();
          if (user?.success) {
            return user;
          } else {
            throw new Error(user.error);
          }
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if(trigger==="update" && session){
        return {...token, ...session.user}
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    async signIn({profile}){
      try {
        if(profile?.status==="deactivated" || profile?.account?.status==="deactivated"){
          return "/blocked"
        }
        return true;
      } catch (error) {
        console.log(error);
      }
      return true
    }
  },

  pages: {
    signIn: "/authentication",
  },
  session: {
    strategy: "jwt",
    // maxAge: 60 * 60 // 1 Hour
    // maxAge: process.env.JWT_EXPIRATION_DURATION * 60, // 15 min
  },
};
export default NextAuth(authOptions);
