"use client";

import { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface Node {
  x: number;
  y: number;
  label: string;
  color: string;
  size: number;
}

interface Edge {
  from: number;
  to: number;
  strength: number;
}

const sampleNodes: Node[] = [
  { x: 400, y: 150, label: "AI/ML", color: "#6366f1", size: 24 },
  { x: 200, y: 300, label: "NLP", color: "#8b5cf6", size: 18 },
  { x: 600, y: 300, label: "Computer Vision", color: "#a855f7", size: 18 },
  { x: 150, y: 450, label: "Transformers", color: "#3b82f6", size: 14 },
  { x: 300, y: 450, label: "Knowledge Graphs", color: "#6366f1", size: 14 },
  { x: 500, y: 450, label: "Object Detection", color: "#a855f7", size: 14 },
  { x: 700, y: 450, label: "Image Segmentation", color: "#ec4899", size: 14 },
  { x: 400, y: 300, label: "Deep Learning", color: "#6366f1", size: 20 },
  { x: 250, y: 200, label: "Neural Networks", color: "#6366f1", size: 16 },
  { x: 550, y: 200, label: "CNNs", color: "#a855f7", size: 16 },
  { x: 400, y: 550, label: "Attention", color: "#3b82f6", size: 14 },
  { x: 200, y: 550, label: "BERT", color: "#3b82f6", size: 12 },
  { x: 600, y: 550, label: "YOLO", color: "#ec4899", size: 12 },
];

const sampleEdges: Edge[] = [
  { from: 0, to: 1, strength: 0.8 },
  { from: 0, to: 2, strength: 0.7 },
  { from: 0, to: 7, strength: 0.9 },
  { from: 1, to: 3, strength: 0.6 },
  { from: 1, to: 11, strength: 0.5 },
  { from: 1, to: 4, strength: 0.7 },
  { from: 2, to: 5, strength: 0.6 },
  { from: 2, to: 6, strength: 0.5 },
  { from: 2, to: 9, strength: 0.6 },
  { from: 7, to: 8, strength: 0.8 },
  { from: 7, to: 9, strength: 0.7 },
  { from: 7, to: 10, strength: 0.6 },
  { from: 8, to: 1, strength: 0.5 },
  { from: 9, to: 5, strength: 0.5 },
  { from: 10, to: 3, strength: 0.4 },
  { from: 10, to: 11, strength: 0.6 },
  { from: 10, to: 12, strength: 0.4 },
];

export function KnowledgeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const minZoom = 0.3;
  const maxZoom = 2.5;

  return (
    <div ref={containerRef} className="relative w-full h-full bg-midnight-900/50 overflow-hidden group">
      <svg
        viewBox="0 0 800 700"
        className="w-full h-full"
        style={{ transform: `scale(${zoom})`, transformOrigin: "center center", transition: "transform 0.3s ease" }}
      >
        <defs>
          {sampleEdges.map((edge, i) => (
            <linearGradient key={i} id={`edgeGrad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={sampleNodes[edge.from].color} stopOpacity={0.6} />
              <stop offset="100%" stopColor={sampleNodes[edge.to].color} stopOpacity={0.6} />
            </linearGradient>
          ))}
          {sampleNodes.map((node, i) => (
            <radialGradient key={i} id={`nodeGlow${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={node.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={node.color} stopOpacity={0} />
            </radialGradient>
          ))}
        </defs>

        {sampleEdges.map((edge, i) => {
          const from = sampleNodes[edge.from];
          const to = sampleNodes[edge.to];
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={`url(#edgeGrad${i})`}
              strokeWidth={edge.strength * 2}
              strokeDasharray={hoveredNode !== null ? (edge.from === hoveredNode || edge.to === hoveredNode ? "none" : "4,4") : "none"}
              opacity={hoveredNode !== null ? (edge.from === hoveredNode || edge.to === hoveredNode ? 0.8 : 0.1) : 0.4}
              className="transition-all duration-500"
            />
          );
        })}

        {sampleNodes.map((node, i) => {
          const isHovered = hoveredNode === i;
          const connected = sampleEdges.some(e => (e.from === i && e.to === hoveredNode) || (e.to === i && e.from === hoveredNode));
          const dimmed = hoveredNode !== null && !isHovered && !connected;

          return (
            <g
              key={i}
              onMouseEnter={() => setHoveredNode(i)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer transition-all duration-300"
              opacity={dimmed ? 0.2 : 1}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? node.size + 6 : node.size}
                fill={node.color}
                opacity={0.15}
                className="transition-all duration-300"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? node.size + 3 : node.size}
                fill={`url(#nodeGlow${i})`}
                className="transition-all duration-300"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? node.size + 4 : node.size - 2}
                fill={node.color}
                opacity={isHovered ? 1 : 0.8}
                className="transition-all duration-300"
              />
              {isHovered && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size + 8}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={2}
                  opacity={0.5}
                  className="animate-ping"
                />
              )}
              <text
                x={node.x}
                y={node.y + node.size + 14}
                textAnchor="middle"
                fill={isHovered ? "#fff" : "#a9adc2"}
                fontSize={isHovered ? 13 : 11}
                fontWeight={isHovered ? "600" : "400"}
                className="transition-all duration-300 pointer-events-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredNode !== null && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-xl text-sm text-midnight-200 z-10">
          <span className="font-semibold text-white">{sampleNodes[hoveredNode].label}</span>
          {" — "}
          {sampleEdges.filter(e => e.from === hoveredNode || e.to === hoveredNode).length} connections
        </div>
      )}

      <div className="absolute top-4 right-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setZoom(z => Math.min(maxZoom, z + 0.2))} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-midnight-300 hover:text-white text-sm">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={() => setZoom(z => Math.max(minZoom, z - 0.2))} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-midnight-300 hover:text-white text-sm">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button onClick={() => setZoom(1)} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-midnight-300 hover:text-white text-sm">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
