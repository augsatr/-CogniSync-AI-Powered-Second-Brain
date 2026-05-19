"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Network, CheckSquare, FileUp, Brain, Settings, LogOut, Sparkles } from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/notes", icon: FileText, label: "Smart Notes" },
  { href: "/dashboard/graph", icon: Network, label: "Knowledge Graph" },
  { href: "/dashboard/tasks", icon: CheckSquare, label: "Smart Tasks" },
  { href: "/dashboard/documents", icon: FileUp, label: "Documents" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass border-r border-midnight-700/30 flex flex-col h-screen">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cogni-500 to-cogni-600 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">CogniSync</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group",
                active
                  ? "bg-cogni-500/15 text-cogni-300 border border-cogni-500/20"
                  : "text-midnight-400 hover:text-midnight-200 hover:bg-midnight-800/50 border border-transparent"
              )}
            >
              <item.icon className={clsx("w-5 h-5", active && "text-cogni-400")} />
              {item.label}
              {item.label === "Smart Notes" && (
                <span className="ml-auto px-1.5 py-0.5 rounded bg-cogni-500/20 text-[10px] text-cogni-300">
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-midnight-700/30 space-y-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-midnight-400 hover:text-midnight-200 hover:bg-midnight-800/50 transition-all duration-300 w-full">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-midnight-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
