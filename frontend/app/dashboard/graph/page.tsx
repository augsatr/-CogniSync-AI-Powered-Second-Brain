"use client";

import { motion } from "framer-motion";
import { KnowledgeGraph } from "@/components/dashboard/knowledge-graph";
import { Network, Filter, Download, RefreshCw } from "lucide-react";

export default function GraphPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Knowledge Graph</h1>
          <p className="text-midnight-400 text-sm mt-1">Visual intelligence — connections extracted from your notes</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-4"
        >
          <div className="card">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Network className="w-4 h-4 text-cogni-400" />
              Graph Stats
            </h3>
            <div className="space-y-3">
              {[
                { label: "Total Nodes", value: "1,284" },
                { label: "Connections", value: "4,712" },
                { label: "Clusters Found", value: "23" },
                { label: "AI Discoveries", value: "156" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between py-2 border-b border-midnight-700/30 last:border-0">
                  <span className="text-sm text-midnight-400">{stat.label}</span>
                  <span className="text-sm font-semibold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-white font-semibold mb-4">Top Concepts</h3>
            <div className="space-y-2">
              {["Machine Learning", "Product Strategy", "User Research", "API Design", "Data Pipeline"].map((concept) => (
                <div key={concept} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-midnight-800/50 text-sm text-midnight-300 hover:bg-midnight-700/50 transition-colors cursor-pointer">
                  <div className="w-1.5 h-1.5 rounded-full bg-cogni-400" />
                  {concept}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div className="card h-[600px] p-0 overflow-hidden">
            <KnowledgeGraph />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
