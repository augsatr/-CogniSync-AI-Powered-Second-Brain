"use client";

import { motion } from "framer-motion";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import {
  FileText, CheckCircle2, Brain, Network,
  TrendingUp, Clock, Zap, BarChart3
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const chartData = [
  { name: "Mon", notes: 12, tasks: 8 },
  { name: "Tue", notes: 19, tasks: 14 },
  { name: "Wed", notes: 8, tasks: 5 },
  { name: "Thu", notes: 15, tasks: 11 },
  { name: "Fri", notes: 22, tasks: 16 },
  { name: "Sat", notes: 10, tasks: 7 },
  { name: "Sun", notes: 5, tasks: 3 },
];

const recentActivity = [
  { id: "1", type: "note", title: "AI Research Notes", desc: "Entity extraction completed", time: "2 min ago" },
  { id: "2", type: "task", title: "Review PR", desc: "Priority escalated to high", time: "15 min ago" },
  { id: "3", type: "graph", title: "Knowledge Graph", desc: "12 new connections found", time: "1 hour ago" },
  { id: "4", type: "document", title: "Q4 Report.pdf", desc: "Document analyzed", time: "2 hours ago" },
  { id: "5", type: "note", title: "Meeting Notes", desc: "Summary generated", time: "3 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-midnight-400 text-sm mt-1">Your workspace intelligence at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={FileText} label="Total Notes" value="247" change="+12 this week" changeType="up" />
        <StatsCard icon={CheckCircle2} label="Tasks Done" value="43" change="92% completion rate" changeType="up" />
        <StatsCard icon={Network} label="Connections" value="1,284" change="+56 new links" changeType="up" />
        <StatsCard icon={Brain} label="AI Insights" value="28" change="3 pending review" changeType="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold">Activity Overview</h3>
              <p className="text-midnight-400 text-xs mt-1">Notes & tasks over the past week</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-midnight-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cogni-500" />
                Notes
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                Tasks
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="notesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="tasksGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#535b85" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#535b85" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#1a1f35",
                    border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Area type="monotone" dataKey="notes" stroke="#6366f1" fill="url(#notesGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="tasks" stroke="#a855f7" fill="url(#tasksGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ActivityFeed activities={recentActivity} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: TrendingUp, label: "AI Productivity Score", value: "94/100", color: "from-emerald-500 to-teal-500" },
          { icon: Clock, label: "Smart Focus Time", value: "4.2 hrs", color: "from-cogni-500 to-indigo-500" },
          { icon: Zap, label: "Automations Active", value: "12", color: "from-amber-500 to-orange-500" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="card flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-2.5`}>
              <item.icon className="w-full h-full text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="text-xs text-midnight-400">{item.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
