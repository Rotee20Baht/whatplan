import NextAuth from "next-auth";
import connectDB from "@/app/libs/database";
import User from "@/app/models/userModel";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

connectDB();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     email: { label: "email", type: "text" },
    //     password: { label: "password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) {
    //       throw new Error("Invalid credentials");
    //     }

    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: credentials.email,
    //       },
    //     });

    //     if (!user || !user?.hashedPassword) {
    //       throw new Error("Invalid credentials");
    //     }

    //     const isCorrectPassword = await bcrypt.compare(
    //       credentials.password,
    //       user.hashedPassword
    //     );

    //     if (!isCorrectPassword) {
    //       throw new Error("Invalid credentials");
    //     }

    //     return user;
    //   },
    // }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.type === 'oauth'){
        return await signInWithOAuth({ account, profile })
      }
      return true;
    },
    async jwt({ token, trigger, session }){
      const user = await getUserByEmail({ email: token.email });
      token.user = user;
      return token;
    },
    async session({ session, token }){
      session.user = token.user;
      return session;
    }
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

async function signInWithOAuth({ account, profile }){
  const user = await User.findOne({ email: profile.email })
  if(user) return true;

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider
  })

  await newUser.save();

  return true;
}

async function getUserByEmail({ email }){
  const user = await User.findOne({email}).select('-password');
  if(!user) throw new Error('Email does not exist!');

  return {...user._doc, _id: user._id.toString()}
}