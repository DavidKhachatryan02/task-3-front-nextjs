"use client";

import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";

export default function RootTemplate({ children, session }) {
  // const session =  getServerSession();
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      {children}
    </SessionProvider>
  );
}
