"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle2, Network, FileUp, Bot } from "lucide-react";

const typeConfig = {
  note: { icon: FileText, color: "bg-blue-500/20 text-blue-400" },
  task: { icon: CheckCircle2, color: "bg-emerald-500/20 text-emerald-400" },
  graph: { icon: Network, color: "bg-purple-500/20 text-purple-400" },
  document: { icon: FileUp, color: "bg-amber-500/20 text-amber-400" },
};

interface Activity {
  id: string;
  type: keyof typeof typeConfig;
  title: string;
  desc: string;
  time: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold">Activity Feed</h3>
          <p className="text-midnight-400 text-xs mt-1">Latest AI-powered actions</p>
        </div>
        <Bot className="w-5 h-5 text-cogni-400" />
      </div>
      <div className="space-y-4">
        {activities.map((activity, i) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-medium">{activity.title}</div>
                <div className="text-xs text-midnight-400 mt-0.5">{activity.desc}</div>
              </div>
              <div className="text-xs text-midnight-500 shrink-0">{activity.time}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
