import { useId, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";
import {
  ANOMALY_MIN_BAND_LPM,
  ANOMALY_TOLERANCE,
  anomalySeries,
  toleranceBand,
} from "@/data/architecture";
import type { AnomalyRange } from "@/data/architecture";
import { cn } from "../ui/utils";

const ranges: { id: AnomalyRange; label: string; description: string }[] = [
  { id: "24h", label: "24h", description: "hourly samples over 24 hours" },
  { id: "7d", label: "7d", description: "3-hourly samples over 7 days" },
];

const PRIMARY = "#0B7A6A";
const TEAL = "#1F9D84";
const AMBER = "#C47A1A";
const AXIS = "#5A645E";
const GRID = "#D5DDD6";

interface ChartRow {
  timestamp: string;
  flow: number;
  baseline: number;
  band: [number, number];
  isAnomaly: boolean;
}

function ChartTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload as ChartRow;
  return (
    <div className="rounded-md border border-border bg-card px-3 py-2 font-mono text-[11px] text-foreground shadow-sm">
      <p className="mb-1 text-muted-foreground">{row.timestamp}</p>
      <p>
        <span className="text-primary">Flow</span> {row.flow.toFixed(1)} L/min
      </p>
      <p>
        <span className="text-accent-teal">Expected</span> {row.baseline.toFixed(1)} L/min
      </p>
      {row.isAnomaly && <p className="mt-1 font-semibold text-amber-ink">Flagged anomaly</p>}
    </div>
  );
}

export function AnomalyChart({ className }: { className?: string }) {
  const [range, setRange] = useState<AnomalyRange>("24h");
  const prefersReducedMotion = useReducedMotion();
  const titleId = useId();
  const summaryId = useId();

  const rows = useMemo<ChartRow[]>(
    () =>
      anomalySeries[range].map((p) => ({
        timestamp: p.timestamp,
        flow: p.flowRateLpm,
        baseline: p.expectedBaselineLpm,
        band: toleranceBand(p.expectedBaselineLpm),
        isAnomaly: Boolean(p.isAnomaly),
      })),
    [range],
  );

  const anomaly = rows.find((r) => r.isAnomaly);
  const activeRange = ranges.find((r) => r.id === range)!;
  const tolerancePct = Math.round(ANOMALY_TOLERANCE * 100);

  return (
    <section
      aria-labelledby={titleId}
      className={cn("rounded-xl border border-border bg-card p-4 sm:p-5", className)}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="inline-flex items-center rounded-sm border border-status-amber/40 bg-status-amber/10 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-amber-ink">
            SYNTHETIC SAMPLE DATA
          </p>
          <h3 id={titleId} className="font-display mt-2 text-base font-semibold text-foreground">
            Night-flow anomaly check
          </h3>
        </div>
        <div
          role="group"
          aria-label="Sample time range"
          className="inline-flex rounded-md border border-border p-0.5"
        >
          {ranges.map((r) => (
            <button
              key={r.id}
              type="button"
              aria-pressed={range === r.id}
              onClick={() => setRange(r.id)}
              className={cn(
                "h-8 min-w-11 rounded-[5px] px-3 font-mono text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                range === r.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <figure className="mt-4" aria-describedby={summaryId}>
        <div className="h-52 w-full sm:h-56" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={rows} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="timestamp"
                tick={{ fill: AXIS, fontSize: 10, fontFamily: "var(--font-family-mono)" }}
                tickLine={false}
                axisLine={{ stroke: GRID }}
                minTickGap={24}
                tickFormatter={(value: string) => (range === "7d" ? value.split(" ")[0] : value)}
                interval={range === "7d" ? 7 : "preserveStartEnd"}
              />
              <YAxis
                tick={{ fill: AXIS, fontSize: 10, fontFamily: "var(--font-family-mono)" }}
                tickLine={false}
                axisLine={false}
                width={44}
                domain={[0, "auto"]}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: GRID, strokeWidth: 1 }} />
              <Area
                dataKey="band"
                type="monotone"
                stroke="none"
                fill={TEAL}
                fillOpacity={0.12}
                isAnimationActive={!prefersReducedMotion}
                activeDot={false}
              />
              <Line
                dataKey="baseline"
                type="monotone"
                stroke={TEAL}
                strokeWidth={1.25}
                strokeDasharray="4 4"
                dot={false}
                activeDot={false}
                isAnimationActive={!prefersReducedMotion}
              />
              <Line
                dataKey="flow"
                type="monotone"
                stroke={PRIMARY}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, fill: PRIMARY, stroke: "none" }}
                isAnimationActive={!prefersReducedMotion}
              />
              {anomaly && (
                <ReferenceDot
                  x={anomaly.timestamp}
                  y={anomaly.flow}
                  r={6}
                  fill={AMBER}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  ifOverflow="extendDomain"
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <ul
          className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-muted-foreground"
          aria-label="Chart legend"
        >
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-0.5 w-4 bg-primary" />
            Measured flow (L/min)
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-0 w-4 border-t border-dashed border-accent-teal" />
            Expected baseline
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2.5 w-4 rounded-[2px] bg-accent-teal/25" />±
            {tolerancePct}% band
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-status-amber" />
            Flagged anomaly
          </li>
        </ul>

        <figcaption id={summaryId} className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Example anomaly highlighted in synthetic sample telemetry ({activeRange.description}).
          Each reading is compared with an expected demand baseline; values outside a ±
          {tolerancePct}% band (minimum ±{ANOMALY_MIN_BAND_LPM} L/min) are flagged.
          {anomaly && (
            <>
              {" "}
              At <span className="font-mono text-amber-ink">{anomaly.timestamp}</span> the flow
              reads <span className="font-mono text-foreground">{anomaly.flow.toFixed(1)} L/min</span>{" "}
              against an expected{" "}
              <span className="font-mono text-foreground">{anomaly.baseline.toFixed(1)} L/min</span>
              —the pattern a leak or unmetered draw-off produces when demand should be near zero.
            </>
          )}
        </figcaption>
      </figure>
    </section>
  );
}
