/* A study's curve in miniature: static, faint, no annotations — the
   floor index showing its drawings. Server-safe. */
export function LineThumb({
  d,
  ghostD,
  width,
  height,
}: {
  d: string;
  ghostD?: string;
  width: number;
  height: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      className="w-44 text-chalk-faint"
    >
      <path d={d} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
      {ghostD ? (
        <path
          d={ghostD}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="6 8"
          opacity={0.6}
        />
      ) : null}
    </svg>
  );
}
