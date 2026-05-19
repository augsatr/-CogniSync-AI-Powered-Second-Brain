"use client";

import { motion } from "framer-motion";
import { FileText, Upload, Search, FileImage, File, FileSpreadsheet, Bot, Clock, MoreHorizontal } from "lucide-react";

const documents = [
  { id: 1, name: "Q4_Report.pdf", type: "pdf", size: "2.4 MB", status: "Analyzed", ai: "3 key insights found", time: "1h ago" },
  { id: 2, name: "Meeting_Notes.docx", type: "doc", size: "156 KB", status: "Processed", ai: "Summary generated", time: "3h ago" },
  { id: 3, name: "Screenshot_Analysis.png", type: "image", size: "4.1 MB", status: "OCR complete", ai: "Text extracted", time: "5h ago" },
  { id: 4, name: "Research_Paper.pdf", type: "pdf", size: "8.7 MB", status: "Analyzed", ai: "References extracted", time: "1d ago" },
  { id: 5, name: "Budget.xlsx", type: "spreadsheet", size: "892 KB", status: "Processed", ai: "Auto-categorized", time: "2d ago" },
  { id: 6, name: "Contract_Draft.pdf", type: "pdf", size: "1.2 MB", status: "Pending", ai: "Awaiting analysis", time: "3d ago" },
];

const typeIcons = {
  pdf: FileText,
  doc: File,
  image: FileImage,
  spreadsheet: FileSpreadsheet,
};

export default function DocumentsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Document Intelligence</h1>
          <p className="text-midnight-400 text-sm mt-1">AI-powered document analysis with OCR and classification</p>
        </div>
        <label className="btn-primary flex items-center gap-2 cursor-pointer">
          <Upload className="w-4 h-4" />
          Upload Document
          <input type="file" className="hidden" accept=".pdf,.docx,.png,.jpg,.xlsx" />
        </label>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-midnight-400" />
        <input placeholder="Search documents..." className="input-field pl-10" />
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-midnight-700/30">
              {["Name", "Type", "Size", "Status", "AI Analysis", "Uploaded", ""].map((h) => (
                <th key={h} className="text-left px-6 py-4 text-xs font-medium text-midnight-400 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, i) => {
              const Icon = typeIcons[doc.type];
              return (
                <motion.tr
                  key={doc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-midnight-700/30 last:border-0 hover:bg-midnight-800/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cogni-500/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-cogni-400" />
                      </div>
                      <span className="text-sm text-white font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-midnight-400 uppercase">{doc.type}</td>
                  <td className="px-6 py-4 text-sm text-midnight-400">{doc.size}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-md ${
                      doc.status === "Analyzed" ? "bg-emerald-500/10 text-emerald-400" :
                      doc.status === "Processed" ? "bg-cogni-500/10 text-cogni-400" :
                      "bg-amber-500/10 text-amber-400"
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-midnight-400">
                      <Bot className="w-3 h-3 text-cogni-400" />
                      {doc.ai}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-midnight-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {doc.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4 text-midnight-400" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
