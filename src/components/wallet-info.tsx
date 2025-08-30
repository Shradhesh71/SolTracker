"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Wallet, Copy, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";

export function WalletInfo() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    if (!publicKey || !connected) return;
    
    setLoading(true);
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error("Failed to fetch wallet balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
      
      // Refresh balance every 30 seconds
      const interval = setInterval(fetchBalance, 30000);
      return () => clearInterval(interval);
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, connection]);

  const handleCopyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString());
      toast.success("Address copied to clipboard!");
    }
  };

  const handleViewOnExplorer = () => {
    if (publicKey) {
      window.open(`https://explorer.solana.com/address/${publicKey.toString()}`, "_blank");
    }
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(balance);
  };

  if (!connected) {
    return (
      <Card className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border-zinc-200 dark:border-zinc-700">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Wallet className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            No Wallet Connected
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 text-center">
            Connect your Phantom wallet to view your address and balance
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 border-zinc-200 dark:border-zinc-700 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Wallet Information
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Wallet Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Wallet Address
          </label>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm font-mono border">
              {publicKey ? `${publicKey.toString().slice(0, 8)}...${publicKey.toString().slice(-8)}` : ""}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyAddress}
              className="h-9 w-9 p-0"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewOnExplorer}
              className="h-9 w-9 p-0"
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* SOL Balance */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            SOL Balance
          </label>
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md border flex-1">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-zinc-500">Loading...</span>
              </div>
            ) : (
              <div className="flex-1 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md border">
                <span className="text-lg font-semibold">
                  {balance !== null ? `${formatBalance(balance)} SOL` : "Unable to fetch"}
                </span>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={fetchBalance}
              disabled={loading}
              className="h-9 px-3"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Network Info */}
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Network:</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="font-medium">Devnet</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
