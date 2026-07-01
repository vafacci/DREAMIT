type LogoMarkProps = {
  className?: string;
};

const SWOOSH_PATHS = [
  "M 38 168 C 8 118 12 52 72 28",
  "M 48 164 C 22 118 26 62 78 38",
  "M 58 158 C 36 114 40 72 84 48",
  "M 68 150 C 50 108 54 82 90 58",
  "M 78 140 C 64 100 68 92 96 68",
];

export function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {SWOOSH_PATHS.map((d, index) => (
        <path
          key={d}
          d={d}
          stroke="#B2190C"
          strokeWidth={10 - index * 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
