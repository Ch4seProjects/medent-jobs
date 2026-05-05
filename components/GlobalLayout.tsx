import React from "react";

interface GlobalLayoutProps {
  children: React.ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-zinc-50 font-sans">
      <main className="flex flex-col flex-1 min-h-0 w-full max-w-7xl mx-auto px-4 py-8 md:p-8 gap-8 bg-zinc-90">
        {children}
      </main>
    </div>
  );
}
