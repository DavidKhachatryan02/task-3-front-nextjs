'use client';

import { ToastContainer } from "react-toastify";
import { SessionProvider } from 'next-auth/react';

export default function RootTemplate({ children }) {
  return (
    <SessionProvider>
      <ToastContainer />
      {children}
    </SessionProvider>
  );
}
