import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Database,
  Info,
  LayoutDashboard,
  Network,
  RadioTower,
  ServerCog,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { ARCHITECTURE_DISCLOSURE, architectureNodes } from "@/data/architecture";
import { domainLabels } from "@/data/projects";
import { cn } from "../ui/utils";

const nodeIcons: Record<string, typeof Cpu> = {
  "sensor-node": Cpu,
  gateway: RadioTower,
  "network-server": Network,
  broker: Waypoints,
  backend: ServerCog,
  database: Database,
  "dashboard-bi": LayoutDashboard,
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

const tabId = (id: string) => `arch-node-${id}`;
const PANEL_ID = "arch-node-panel";

export function ArchitectureExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const node = architectureNodes[selectedIndex];
  const last = architectureNodes.length - 1;
  const progress = ((selectedIndex + 1) / architectureNodes.length) * 100;

  const select = (index: number, moveFocus = false) => {
    const next = Math.max(0, Math.min(last, index));
    setSelectedIndex(next);
    if (moveFocus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keyMap: Record<string, number> = {
      ArrowRight: selectedIndex + 1,
      ArrowDown: selectedIndex + 1,
      ArrowLeft: selectedIndex - 1,
      ArrowUp: selectedIndex - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in keyMap)) return;
    event.preventDefault();
    select(keyMap[event.key], true);
  };

  const Icon = nodeIcons[node.id] ?? Cpu;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="font-mono text-xs tracking-[0.16em] text-signal uppercase">
            Stage {node.stepNumber} of {String(architectureNodes.length).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => select(selectedIndex - 1)}
              disabled={selectedIndex === 0}
              aria-label="Previous stage"
              className={cn(
                "grid size-10 place-items-center rounded-md border border-navy-border text-on-dark transition-colors hover:bg-navy-elevated disabled:cursor-not-allowed disabled:opacity-40",
                focusRing,
              )}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => select(selectedIndex + 1)}
              disabled={selectedIndex === last}
              aria-label="Next stage"
              className={cn(
                "grid size-10 place-items-center rounded-md border border-navy-border text-on-dark transition-colors hover:bg-navy-elevated disabled:cursor-not-allowed disabled:opacity-40",
                focusRing,
              )}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="mb-4 h-px w-full overflow-hidden bg-navy-border"
          aria-hidden="true"
        >
          <div
            className="h-full bg-signal transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          role="tablist"
          aria-label="Edge-to-cloud pipeline stages"
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1"
        >
          {architectureNodes.map((n, i) => {
            const isSelected = i === selectedIndex;
            return (
              <button
                key={n.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={tabId(n.id)}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={PANEL_ID}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => select(i)}
                className={cn(
                  "shrink-0 rounded-md border px-3 py-2 text-left transition-colors",
                  isSelected
                    ? "border-signal/60 bg-navy-elevated text-on-dark"
                    : "border-transparent text-on-dark-muted hover:bg-navy-elevated/50 hover:text-on-dark",
                  focusRing,
                )}
              >
                <span
                  className={cn(
                    "block font-mono text-[10px] tracking-[0.14em]",
                    isSelected ? "text-signal" : "text-on-dark-muted",
                  )}
                >
                  {n.stepNumber}
                </span>
                <span className="mt-0.5 block max-w-[9.5rem] truncate text-sm font-medium">
                  {n.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={tabId(node.id)}
        tabIndex={0}
        className={cn("rounded-xl border border-navy-border bg-navy-elevated/80 p-5 sm:p-7", focusRing)}
      >
        <div
          key={node.id}
          className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-200"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-signal/30 bg-signal/10 text-signal">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-xs tracking-[0.14em] text-signal">
                {domainLabels[node.category].toUpperCase()}
              </p>
              <h3 className="font-display mt-1 text-2xl font-semibold tracking-tight text-on-dark">
                {node.title}
              </h3>
            </div>
          </div>

          <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-on-dark">{node.purpose}</p>

          <div className="mt-6">
            <h4 className="mb-2 font-mono text-[11px] font-medium tracking-[0.16em] text-on-dark-muted uppercase">
              Protocols &amp; tech
            </h4>
            <ul className="flex flex-wrap gap-1.5">
              {node.protocolsAndTech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-navy-border bg-navy px-2 py-1 font-mono text-[11px] text-on-dark"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="border-t border-navy-border pt-4">
              <dt className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-signal uppercase">
                <ArrowDownToLine className="size-3.5" aria-hidden="true" />
                Data in
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-on-dark-muted">{node.dataIn}</dd>
            </div>
            <div className="border-t border-navy-border pt-4">
              <dt className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-accent-teal uppercase">
                <ArrowUpFromLine className="size-3.5" aria-hidden="true" />
                Data out
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-on-dark-muted">{node.dataOut}</dd>
            </div>
            <div className="border-t border-navy-border pt-4">
              <dt className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-status-amber uppercase">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                Failure &amp; reliability
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-on-dark-muted">
                {node.failureAndReliabilityNotes}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="flex items-start gap-2 text-sm leading-relaxed text-on-dark-muted">
        <Info className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
        {ARCHITECTURE_DISCLOSURE}
      </p>
    </div>
  );
}
