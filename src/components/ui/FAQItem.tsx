"use client";

import { useState } from "react";

type FAQItemProps = {
  question: string;
  answer: string;
};

export function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-dream-border-dark/80">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-body font-medium">{question}</span>
        <span className="text-xl leading-none text-dream-primary">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="pb-5 text-body text-dream-muted-dark">{answer}</p>
      )}
    </div>
  );
}
