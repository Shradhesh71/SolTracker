"use client";

import { WalletButton } from "./ui/wallet-button";
import { Coins } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SolTracker
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Solana Price Dashboard
              </p>
            </div>
          </div>

          {/* Wallet Button */}
          <WalletButton />
        </div>
      </div>
    </nav>
  );
}