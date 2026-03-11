"use client";

interface ScoreRingProps {
  score: number;
  maxScore: number;
  size?: number;
  strokeWidth?: number;
  grade?: string;
  label?: string;
}

function getScoreColor(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.8) return "var(--color-score-excellent)";
  if (pct >= 0.6) return "var(--color-score-good)";
  if (pct >= 0.4) return "var(--color-score-medium)";
  return "var(--color-score-poor)";
}

export default function ScoreRing({
  score,
  maxScore,
  size = 160,
  strokeWidth = 12,
  grade,
  label,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = score / maxScore;
  const offset = circumference * (1 - pct);
  const color = getScoreColor(score, maxScore);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E7E5E4"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>
            {score}
          </span>
          {grade && (
            <span className="text-lg font-semibold text-muted">{grade}</span>
          )}
        </div>
      </div>
      {label && <span className="text-sm font-medium text-muted">{label}</span>}
    </div>
  );
}
