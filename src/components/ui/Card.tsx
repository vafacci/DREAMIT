type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-none bg-dream-paper p-6 shadow-[0_12px_36px_-24px_rgba(28,45,122,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}
