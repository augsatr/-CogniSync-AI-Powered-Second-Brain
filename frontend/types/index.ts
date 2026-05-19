export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  entities: Entity[];
  summary?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Entity {
  name: string;
  type: "person" | "organization" | "concept" | "technology" | "location" | "event";
  relevance: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "todo" | "in_progress" | "done";
  due_date?: string;
  estimated_minutes?: number;
  ai_score?: number;
  user_id: string;
  created_at: string;
}

export interface Document {
  id: string;
  filename: string;
  file_type: string;
  file_size: number;
  status: "pending" | "processing" | "analyzed" | "error";
  ocr_text?: string;
  summary?: string;
  classification?: string;
  user_id: string;
  uploaded_at: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  weight: number;
  connections: string[];
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
  label?: string;
}

export interface KnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface AIAnalysis {
  entities: Entity[];
  summary: string;
  sentiment: "positive" | "negative" | "neutral";
  recommendations: string[];
}
