"use client";

import { Search, Bell, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 glass border-b border-midnight-700/30 flex items-center justify-between px-6">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <Search className="w-4 h-4 text-midnight-400" />
        <input
          placeholder="Search anything... AI will help find it"
          className="bg-transparent text-sm text-midnight-200 placeholder-midnight-500 focus:outline-none w-full"
        />
        <span className="px-1.5 py-0.5 rounded bg-midnight-700/50 text-[10px] text-midnight-400 font-mono">⌘K</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl bg-midnight-800/50 flex items-center justify-center hover:bg-midnight-700/50 transition-colors">
          <Bell className="w-4 h-4 text-midnight-400" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cogni-500 text-[9px] flex items-center justify-center text-white font-medium">
            3
          </span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cogni-500/10 border border-cogni-500/20 text-cogni-300 text-xs font-medium hover:bg-cogni-500/20 transition-colors">
          <Sparkles className="w-3 h-3" />
          AI Assistant
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cogni-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
          JD
        </div>
      </div>
    </header>
  );
}
