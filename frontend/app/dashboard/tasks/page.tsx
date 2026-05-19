"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, Circle, Clock, Brain, Zap, AlertTriangle, Plus, Filter } from "lucide-react";

const tasks = [
  { id: 1, title: "Review Q4 roadmap draft", priority: "high", due: "Today", ai: "Estimated: 45 min", done: false },
  { id: 2, title: "Prepare investor presentation", priority: "high", due: "Tomorrow", ai: "Auto-generated outline ready", done: false },
  { id: 3, title: "Update API documentation", priority: "medium", due: "In 2 days", ai: "Suggested improvements: 3", done: false },
  { id: 4, title: "Research competitor pricing", priority: "medium", due: "In 3 days", ai: "Competitor data collected", done: false },
  { id: 5, title: "Design system audit", priority: "low", due: "Next week", ai: "Auto-prioritized", done: true },
  { id: 6, title: "Team retro notes", priority: "low", due: "Next week", ai: "Summary ready", done: true },
];

const priorityColors = {
  high: "from-red-500 to-rose-500",
  medium: "from-amber-500 to-orange-500",
  low: "from-cogni-500 to-indigo-500",
};

export default function TasksPage() {
  const [filter, setFilter] = useState<"all" | "active" | "done">("active");

  const filtered = tasks.filter(t => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Smart Tasks</h1>
          <p className="text-midnight-400 text-sm mt-1">AI-prioritized tasks based on urgency and dependencies</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="flex items-center gap-2">
        {(["all", "active", "done"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === f
                ? "bg-cogni-500/20 text-cogni-300 border border-cogni-500/30"
                : "text-midnight-400 hover:text-midnight-300 border border-transparent"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`card flex items-start gap-4 group ${
              task.done ? "opacity-60" : ""
            }`}
          >
            <button className="mt-0.5">
              {task.done ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Circle className="w-5 h-5 text-midnight-400 group-hover:text-cogni-400 transition-colors" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className={`text-white font-medium ${task.done ? "line-through" : ""}`}>
                  {task.title}
                </h3>
                <div className={`px-2 py-0.5 rounded-md bg-gradient-to-r ${priorityColors[task.priority]} text-white text-[10px] font-medium`}>
                  {task.priority}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-midnight-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.due}
                </span>
                <span className="flex items-center gap-1">
                  <Brain className="w-3 h-3 text-cogni-400" />
                  {task.ai}
                </span>
              </div>
            </div>
            {task.priority === "high" && !task.done && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs">
                <Zap className="w-3 h-3" />
                Urgent
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
