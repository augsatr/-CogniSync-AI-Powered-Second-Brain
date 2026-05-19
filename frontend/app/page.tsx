"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Brain, Sparkles, Network, FileText, Bot, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-midnight-900 bg-radial-gradient">
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-midnight-700/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-7 h-7 text-cogni-400" />
            <span className="text-xl font-bold text-white">CogniSync</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="btn-ghost text-sm">Sign In</Link>
            <Link href="/login" className="btn-primary text-sm !px-5 !py-2.5">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cogni-500/10 border border-cogni-500/20 text-cogni-300 text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              AI-Powered Knowledge Management
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Your <span className="gradient-text">Second Brain</span>
              <br />
              Powered by AI
            </h1>
            <p className="text-midnight-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              CogniSync uses advanced AI to intelligently connect your notes, prioritize your tasks, and build a personal knowledge graph — so you never lose a great idea again.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/login" className="btn-primary text-lg !px-8 !py-4 group">
                Start Free
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="btn-secondary text-lg !px-8 !py-4">
                Watch Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Intelligence at Every Layer
            </h2>
            <p className="text-midnight-400 text-lg">AI features that adapt to the way you think.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "Smart Notes", desc: "Auto-extract entities, summarize, and link related ideas across your entire knowledge base.", color: "from-blue-500 to-cyan-500" },
              { icon: Network, title: "Knowledge Graph", desc: "Visualize connections between concepts as a dynamic, interactive graph that reveals hidden patterns.", color: "from-purple-500 to-pink-500" },
              { icon: Bot, title: "AI Task Engine", desc: "Tasks are auto-prioritized by urgency, dependencies, and your personal work patterns.", color: "from-cogni-500 to-indigo-500" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-hover group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 mb-5`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-midnight-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for the Future</h2>
            <p className="text-midnight-400 text-lg">Enterprise-grade security meets cutting-edge AI.</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, stat: "End-to-End", label: "Encryption" },
              { icon: Bot, stat: "Real-time", label: "AI Processing" },
              { icon: Network, stat: "Knowledge", label: "Graph Visualization" },
              { icon: Sparkles, stat: "99.9%", label: "Uptime SLA" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card text-center"
              >
                <item.icon className="w-8 h-8 text-cogni-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{item.stat}</div>
                <div className="text-sm text-midnight-400">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-midnight-800/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-midnight-400 text-sm">
            <Brain className="w-5 h-5 text-cogni-400" />
            CogniSync 2024
          </div>
          <div className="flex items-center gap-6 text-sm text-midnight-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
