"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function FilterSection({ title, children }: FilterSectionProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setOpen(e.matches);
    };

    handleChange(media);

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="flex flex-col gap-2 flex-1 relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-between items-center text-xl font-semibold tracking-tight text-black cursor-pointer"
      >
        {title}
        <span className="text-sm">
          {open ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
