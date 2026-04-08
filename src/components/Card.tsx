"use client";

import { useRef, useState, useCallback } from "react";
import useOnClickOutside from "../hooks/useClickOutside";
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
    <div className="w-full z-50 absolute -bottom-[60vh] h-fit items-center justify-center flex cursor-pointer">
      <div
        ref={ref}
        onClick={() => setOpen(true)}
        className="group w-fit flex text-center relative pt-8 pb-10 px-10"
      >
        <Icons.borderLeft className="absolute -top-6 -left-8.5 MoveUpDown" />

        {open ? (
          <div className="border-[#CEB7FF] max-w-208.25 border-[3px] p-13.5 bg-black/30">
            <span className="text-white text-3xl font-bold">{answer}</span>
          </div>
        ) : (
          <span className="text-white text-4xl font-bold drop-shadow-[0_0_12px_rgba(206,183,255,0.9)]">
            {title}
          </span>
        )}

        <Icons.borderRight className="absolute -bottom-7.75 -right-5.25 MoveDownUp" />
      </div>
    </div>
  );
}
