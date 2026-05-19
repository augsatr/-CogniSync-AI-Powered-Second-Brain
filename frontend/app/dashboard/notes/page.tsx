"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Plus, FileText, Tag, Sparkles, MoreHorizontal, Clock, Bot } from "lucide-react";

const notes = [
  { id: 1, title: "Q4 Strategy Brainstorm", preview: "Market expansion opportunities in APAC region...", tags: ["strategy", "business"], ai: "Entity extraction complete", time: "2h ago" },
  { id: 2, title: "AI Research Findings", preview: "Key developments in transformer architectures...", tags: ["ai", "research"], ai: "Summary generated", time: "5h ago" },
  { id: 3, title: "Product Meeting Notes", preview: "Discussed roadmap priorities for v2.0...", tags: ["product", "meeting"], ai: "Action items extracted", time: "1d ago" },
  { id: 4, title: "Design System Review", preview: "Component library audit results and...", tags: ["design", "frontend"], ai: "Patterns identified", time: "2d ago" },
  { id: 5, title: "Customer Interview Insights", preview: "Key pain points from user research...", tags: ["research", "ux"], ai: "Sentiment analysis done", time: "3d ago" },
  { id: 6, title: "Competitive Analysis", preview: "Feature comparison across major players...", tags: ["strategy"], ai: "Gap analysis ready", time: "4d ago" },
];

export default function NotesPage() {
  const [search, setSearch] = useState("");

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Smart Notes</h1>
          <p className="text-midnight-400 text-sm mt-1">AI-enhanced notes with auto-extraction and linking</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Note
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-midnight-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="input-field pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card-hover group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-cogni-500/20 flex items-center justify-center">
                <FileText className="w-4 h-4 text-cogni-400" />
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4 text-midnight-400" />
              </button>
            </div>
            <h3 className="text-white font-semibold mb-2 line-clamp-1">{note.title}</h3>
            <p className="text-midnight-400 text-sm mb-4 line-clamp-2 leading-relaxed">{note.preview}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {note.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-cogni-500/10 text-cogni-300 text-xs flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-midnight-700/30">
              <div className="flex items-center gap-1.5 text-xs text-midnight-400">
                <Bot className="w-3 h-3 text-cogni-400" />
                {note.ai}
              </div>
              <div className="flex items-center gap-1 text-xs text-midnight-500">
                <Clock className="w-3 h-3" />
                {note.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
