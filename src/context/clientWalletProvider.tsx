"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

// Dynamic import with no SSR to prevent hydration issues
const WalletContextProvider = dynamic(
  () => import("./walletContextProvider"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    ),
  }
);

export default function ClientWalletProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <WalletContextProvider>{children}</WalletContextProvider>;
}
