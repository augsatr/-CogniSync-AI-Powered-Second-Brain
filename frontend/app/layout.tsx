import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  title: "CogniSync - AI-Powered Second Brain",
  description: "Intelligent knowledge management with AI-powered note taking, task prioritization, and personal knowledge graphs.",
  openGraph: {
    title: "CogniSync - AI-Powered Second Brain",
    description: "Transform your ideas into actionable intelligence.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-midnight-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
