"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/src/components/lib/utils";
import useOnClickOutside from "./hooks/useClickOutside";
import { Icons } from "./shared/Icons";

type Props = {
  title: string;
  answer: string;
};

export function RevealCard({ title, answer }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setOpen(false), []);

  useOnClickOutside(ref, handleClose);

  return (
    <div
      className={cn(
        "w-full z-50 absolute -bottom-[50vh] h-fit  items-center justify-center flex cursor-pointer",
      )}
    >
      <div
        ref={ref}
        onClick={() => setOpen(true)}
        className="w-fit flex text-center relative"
      >
        <Icons.borderLeft className="absolute -top-6 -left-8.5" />
        {open ? (
          <span className="text-white text-3xl font-bold">{answer}</span>
        ) : (
          <span className="text-white text-4xl font-bold drop-shadow-[0_0_12px_rgba(206,183,255,0.9)]">
            {title}
          </span>
        )}
        <Icons.borderRight className="absolute -bottom-7.75 -right-5.25" />
      </div>
    </div>
  );
}
