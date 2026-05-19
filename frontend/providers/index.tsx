"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1a1f35",
            color: "#fff",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: "12px",
          },
          success: { iconTheme: { primary: "#6366f1", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />
    </SessionProvider>
  );
}
