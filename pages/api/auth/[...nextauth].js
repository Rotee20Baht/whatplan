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
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        const { email, password } =  credentials;
        const user = await signInWithCredentials({ email, password });
        return user;
      },
    }),
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
  if(!user) throw new Error('ไม่พบข้อมูลอีเมลล์ผู้ใช้งานนี้ในระบบ');

  return {...user._doc, _id: user._id.toString()}
}

async function signInWithCredentials({email, password}){
  const user = await User.findOne({ email: email });
  if(!user) throw new Error("ไม่พบข้อมูลอีเมลล์ผู้ใช้งานนี้ในระบบ");
  
  if(!user.password) throw new Error("รหัสผ่านไม่ถูกต้อง")

  const compare = await bcrypt.compare(password, user.password);
  if(!compare) throw new Error("รหัสผ่านไม่ถูกต้อง");

  return {...user._doc, _id: user._id.toString()}
}