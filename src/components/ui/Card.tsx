type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-none border border-black/10 bg-white p-6 ${className}`}
    >
      {children}
    </div>
  );
}
