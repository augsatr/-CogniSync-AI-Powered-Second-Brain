"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "warning";
}

export function StatsCard({ icon: Icon, label, value, change, changeType }: StatsCardProps) {
  const changeIcon = {
    up: TrendingUp,
    down: TrendingDown,
    warning: AlertCircle,
  }[changeType];

  const changeColor = {
    up: "text-emerald-400",
    down: "text-red-400",
    warning: "text-amber-400",
  }[changeType];

  const changeBg = {
    up: "bg-emerald-500/10",
    down: "bg-red-500/10",
    warning: "bg-amber-500/10",
  }[changeType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card flex items-start gap-4"
    >
      <div className="w-10 h-10 rounded-xl bg-cogni-500/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-cogni-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-midnight-400 mt-0.5">{label}</div>
        <div className={`flex items-center gap-1 mt-2 text-xs ${changeColor} ${changeBg} px-2 py-0.5 rounded-md w-fit`}>
          {changeIcon && changeIcon({ className: "w-3 h-3" })}
          {change}
        </div>
      </div>
    </motion.div>
  );
}
