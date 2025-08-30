"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface PriceData {
  value: number;
  updateUnixTime: number;
  updateHumanTime: string;
}

export function PriceFeed() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);

  const SOL_ADDRESS = "So11111111111111111111111111111111111111112"; // SOL token address
  const API_KEY = "7c700b03c0ea4ff9b3906f7d412bdc0c";

  const fetchPrice = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://public-api.birdeye.so/defi/price?address=${SOL_ADDRESS}`,
        {
          headers: {
            "X-API-KEY": API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.data && data.data.value !== undefined) {
        if (priceData) {
          setPreviousPrice(priceData.value);
        }
        setPriceData(data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch price");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    
    // Fetch price every 30 seconds
    const interval = setInterval(fetchPrice, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getPriceChange = () => {
    if (!priceData || !previousPrice) return null;
    
    const change = priceData.value - previousPrice;
    const changePercent = (change / previousPrice) * 100;
    
    return {
      change,
      changePercent,
      isPositive: change >= 0,
    };
  };

  const priceChange = getPriceChange();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(price);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <Card className="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 border-zinc-200 dark:border-zinc-700 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <img 
            src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" 
            alt="SOL"
            className="w-6 h-6"
          />
          Solana (SOL)
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchPrice}
          disabled={loading}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      
      <CardContent>
        {error ? (
          <div className="text-center py-4">
            <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchPrice}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : loading && !priceData ? (
          <div className="animate-pulse">
            <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"></div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
          </div>
        ) : priceData ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">
                {formatPrice(priceData.value)}
              </span>
              {priceChange && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  priceChange.isPositive 
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}>
                  {priceChange.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {priceChange.changePercent > 0 ? "+" : ""}
                  {priceChange.changePercent.toFixed(2)}%
                </div>
              )}
            </div>
            
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Last updated: {formatTime(priceData.updateUnixTime)}
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-zinc-500 dark:text-zinc-400">
                Live price feed • Updates every 30s
              </span>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
