"use client";

import { Github, Linkedin, Twitter, Heart } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Shradhesh71",
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-gray-100"
    },
    {
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/shradesh-jodawat-147730265/",
      icon: Linkedin,
      color: "hover:text-blue-600"
    },
    {
      name: "Twitter/X",
      url: "https://x.com/Shradeshjain835", 
      icon: Twitter,
      color: "hover:text-blue-400"
    }
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Credits */}
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by</span>
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Shradesh Jodawat
            </span>
          </div>

          {/* Center - Description */}
          <div className="text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
              Solana Price Dashboard with Phantom Wallet Integration
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Powered by Birdeye API & Solana Web3.js
            </p>
          </div>

          {/* Right side - Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors ${link.color} hover:bg-zinc-200 dark:hover:bg-zinc-700`}
                  aria-label={link.name}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} SolTracker. Built for the Solana ecosystem.
          </p>
        </div>
      </div>
    </footer>
  );
}
