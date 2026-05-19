const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ access_token: string; user: any }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (email: string, password: string, name: string) =>
      request<{ access_token: string; user: any }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      }),
  },
  notes: {
    list: () => request<any[]>("/notes"),
    create: (data: any) =>
      request<any>("/notes", { method: "POST", body: JSON.stringify(data) }),
    get: (id: string) => request<any>(`/notes/${id}`),
    analyze: (id: string) => request<any>(`/notes/${id}/analyze`),
  },
  tasks: {
    list: () => request<any[]>("/tasks"),
    create: (data: any) =>
      request<any>("/tasks", { method: "POST", body: JSON.stringify(data) }),
    prioritize: (id: string) => request<any>(`/tasks/${id}/prioritize`),
  },
  documents: {
    list: () => request<any[]>("/documents"),
    upload: (formData: FormData) =>
      fetch(`${API_BASE}/documents/upload`, { method: "POST", body: formData }),
    analyze: (id: string) => request<any>(`/documents/${id}/analyze`),
  },
  graph: {
    get: () => request<{ nodes: any[]; edges: any[] }>("/graph"),
  },
  ai: {
    chat: (message: string) =>
      request<{ response: string }>("/ai/chat", {
        method: "POST",
        body: JSON.stringify({ message }),
      }),
    analyze: (text: string) =>
      request<{ entities: any[]; summary: string; sentiment: string }>("/ai/analyze", {
        method: "POST",
        body: JSON.stringify({ text }),
      }),
  },
};
