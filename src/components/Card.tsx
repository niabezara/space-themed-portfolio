"use client";

import { useState } from "react";
import { cn } from "@/src/components/lib/utils";

type Props = {
  title: string;
  answer: string;
};

export function RevealCard({ title, answer }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen((p) => !p)}
      className={cn(
        "w-full z-50 h-full items-center justify-center flex cursor-pointer",
      )}
    >
      {open ? (
        <span className="text-white text-3xl font-bold">{answer}</span>
      ) : (
        <span className="text-white text-4xl font-bold drop-shadow-[0_0_12px_rgba(206,183,255,0.9)]">
          {title}
        </span>
      )}
    </div>
  );
}
