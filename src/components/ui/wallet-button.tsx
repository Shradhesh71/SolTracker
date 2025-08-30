"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "./button";
import { Wallet, Copy, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function WalletButton() {
  const { wallet, connect, disconnect, connecting, connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);

  const handleConnect = () => {
    if (!wallet) {
      setVisible(true);
    } else {
      connect();
    }
  };

  const handleCopyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyAddress}
          className="font-mono text-sm bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
          <Copy className="w-3 h-3 mr-2" />
          {copied ? "Copied!" : truncateAddress(publicKey.toString())}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnect}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 border-zinc-200 dark:border-zinc-700"
        >
          <LogOut className="w-3 h-3" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={connecting}
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
