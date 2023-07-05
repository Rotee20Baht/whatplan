'use client';
import { SessionProvider } from "next-auth/react";

export default function UserProvider({ children }) {
 return (
  <SessionProvider>
    {children}
  </SessionProvider>
 ) 
} 