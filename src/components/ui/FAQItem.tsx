"use client";

import { useState } from "react";

type FAQItemProps = {
  question: string;
  answer: string;
};

export function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-body font-medium">{question}</span>
        <span className="text-accent text-xl leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="pb-5 text-body text-black/70">{answer}</p>
      )}
    </div>
  );
}
