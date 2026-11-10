import { useEffect, useId, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Droplets, Pause, Play, Radio, Thermometer } from "lucide-react";
import {
  INITIAL_TELEMETRY_STEP,
  TELEMETRY_TICK_MS,
  buildTelemetryChannels,
  channelDecimals,
  formatSampleClock,
} from "@/data/architecture";
import type { TelemetryChannel } from "@/types/portfolio";
import { cn } from "../ui/utils";

const channelIcons: Record<string, typeof Droplets> = {
  "tank-level": Droplets,
  "cold-room": Thermometer,
  "uplink-rssi": Radio,
};

const CHANNEL_COUNT = 3;

function Sparkline({ values, label }: { values: number[]; label: string }) {
  const gradientId = useId();
  const width = 120;
  const height = 32;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - 3 - ((v - min) / span) * (height - 6);
    return [x, y] as const;
  });
  const line = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="h-8 w-full overflow-visible"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--signal-on-dark)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--signal-on-dark)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${height} ${line} ${width},${height}`} fill={`url(#${gradientId})`} />
      <polyline
        points={line}
        fill="none"
        stroke="var(--signal-on-dark)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={lastX} cy={lastY} r="2.5" fill="var(--signal-on-dark)" />
    </svg>
  );
}

function ChannelRow({ channel }: { channel: TelemetryChannel }) {
  const Icon = channelIcons[channel.id] ?? Radio;
  const decimals = channelDecimals(channel.id);
  const values = channel.history.map((h) => h.value);
  const min = Math.min(...values).toFixed(decimals);
  const max = Math.max(...values).toFixed(decimals);

  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 py-3 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-md bg-navy text-signal">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-on-dark">{channel.label}</p>
          <p className="truncate font-mono text-[11px] text-on-dark-muted">{channel.protocol}</p>
        </div>
      </div>
      <div className="col-span-2 row-start-2 sm:col-span-1 sm:row-start-auto">
        <Sparkline
          values={values}
          label={`${channel.label} trend over the last ${values.length} samples, ranging ${min} to ${max} ${channel.unit}`}
        />
      </div>
      <p className="col-start-2 row-start-1 text-right sm:col-start-auto sm:row-start-auto">
        <span className="font-mono text-lg font-semibold text-on-dark tabular-nums">
          {channel.currentValue.toFixed(decimals)}
        </span>
        <span className="ml-1 font-mono text-xs text-on-dark-muted">{channel.unit}</span>
        <span className="block font-mono text-[10px] text-on-dark-muted/80">
          {channel.normalRange}
        </span>
      </p>
    </li>
  );
}

export function TelemetryDemo({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(INITIAL_TELEMETRY_STEP);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? Boolean(prefersReducedMotion);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setStep((s) => s + 1);
    }, TELEMETRY_TICK_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  const channels = useMemo(() => buildTelemetryChannels(step), [step]);
  const messageCount = (step + 1) * CHANNEL_COUNT;
  const lastUpdated = formatSampleClock(step);
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "surface-dark rounded-xl border border-navy-border bg-navy-elevated p-4 sm:p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="inline-flex items-center rounded-sm border border-status-amber/40 bg-status-amber/10 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-status-amber">
            SIMULATED DEMO · SAMPLE TELEMETRY
          </p>
          <h3 id={titleId} className="font-display mt-2 text-base font-semibold text-on-dark">
            Edge sensor stream
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setUserPaused(!paused)}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-navy-border px-3 text-xs font-medium text-on-dark transition-colors hover:border-signal/50 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-navy-elevated"
        >
          {paused ? (
            <Play className="size-3.5" aria-hidden="true" />
          ) : (
            <Pause className="size-3.5" aria-hidden="true" />
          )}
          {paused ? "Resume" : "Pause"}
        </button>
      </div>

      <ul className="mt-2 divide-y divide-navy-border">
        {channels.map((channel) => (
          <ChannelRow key={channel.id} channel={channel} />
        ))}
      </ul>

      <dl className="mt-2 grid grid-cols-3 gap-2 border-t border-navy-border pt-3 font-mono text-[11px]">
        <div className="min-w-0">
          <dt className="text-on-dark-muted">Stream</dt>
          <dd className="mt-0.5 flex items-center gap-1.5 text-on-dark">
            <span
              aria-hidden="true"
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                paused ? "bg-status-amber" : "bg-signal motion-safe:animate-pulse",
              )}
            />
            {paused ? "Paused" : "Replaying"}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-on-dark-muted">Messages</dt>
          <dd className="mt-0.5 text-on-dark tabular-nums">{messageCount.toLocaleString("en-US")}</dd>
        </div>
        <div className="min-w-0 text-right">
          <dt className="text-on-dark-muted">Last sample</dt>
          <dd className="mt-0.5 text-on-dark tabular-nums">
            <time>{lastUpdated}</time>
          </dd>
        </div>
      </dl>
    </section>
  );
}
