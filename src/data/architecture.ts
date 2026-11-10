import type { AnomalyDataPoint, TelemetryChannel } from '@/types/portfolio';

/*
 * All values in this module are synthetic and deterministic (no Math.random),
 * so screenshots and reduced-motion renders are stable. They illustrate typical
 * deployment patterns and are not readings from any real device or customer site.
 */

export const TELEMETRY_HISTORY_LENGTH = 24;
export const TELEMETRY_TICK_MS = 2500;
/** Simulated seconds between successive sample uplinks. */
export const TELEMETRY_SAMPLE_INTERVAL_S = 15;
/** Sample clock origin, 08:00:00, in seconds after midnight. */
export const TELEMETRY_CLOCK_START_S = 8 * 3600;

interface ChannelModel {
  id: string;
  label: string;
  protocol: string;
  unit: string;
  normalRange: string;
  decimals: number;
  base: number;
  amplitude: number;
  period: number;
  ripple: number;
}

const channelModels: ChannelModel[] = [
  {
    id: 'tank-level',
    label: 'Tank Water Level',
    protocol: 'LoRaWAN · Ultrasonic',
    unit: 'm',
    normalRange: '0.50 – 3.00 m',
    decimals: 2,
    base: 2.42,
    amplitude: 0.06,
    period: 40,
    ripple: 0.012,
  },
  {
    id: 'cold-room',
    label: 'Cold Room Temp',
    protocol: 'STM32 · LoRa',
    unit: '°C',
    normalRange: '2.0 – 8.0 °C',
    decimals: 1,
    base: 4.6,
    amplitude: 0.5,
    period: 28,
    ripple: 0.15,
  },
  {
    id: 'uplink-rssi',
    label: 'Uplink Signal',
    protocol: 'NB-IoT · RSSI',
    unit: 'dBm',
    normalRange: '-100 – -60 dBm',
    decimals: 0,
    base: -78,
    amplitude: 4,
    period: 18,
    ripple: 2,
  },
];

const round = (value: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

export function formatSampleClock(step: number): string {
  const total = (TELEMETRY_CLOCK_START_S + step * TELEMETRY_SAMPLE_INTERVAL_S) % 86400;
  const hh = Math.floor(total / 3600);
  const mm = Math.floor((total % 3600) / 60);
  const ss = total % 60;
  return [hh, mm, ss].map((n) => String(n).padStart(2, '0')).join(':');
}

/** Deterministic reading for a channel at a given simulation step. */
export function sampleTelemetryValue(channelId: string, step: number): number {
  const model = channelModels.find((m) => m.id === channelId);
  if (!model) return 0;
  const slow = Math.sin((2 * Math.PI * step) / model.period);
  const fast = Math.sin(step * 1.7 + model.base) * Math.cos(step * 0.6);
  return round(model.base + model.amplitude * slow + model.ripple * fast, model.decimals);
}

export function channelDecimals(channelId: string): number {
  return channelModels.find((m) => m.id === channelId)?.decimals ?? 0;
}

/** Builds the channel snapshot ending at `step` (inclusive). */
export function buildTelemetryChannels(step: number): TelemetryChannel[] {
  return channelModels.map((model) => {
    const history = Array.from({ length: TELEMETRY_HISTORY_LENGTH }, (_, i) => {
      const s = step - (TELEMETRY_HISTORY_LENGTH - 1) + i;
      return { time: formatSampleClock(s), value: sampleTelemetryValue(model.id, s) };
    });
    return {
      id: model.id,
      label: model.label,
      protocol: model.protocol,
      unit: model.unit,
      normalRange: model.normalRange,
      currentValue: history[history.length - 1].value,
      history,
    };
  });
}

export const INITIAL_TELEMETRY_STEP = TELEMETRY_HISTORY_LENGTH - 1;
export const initialTelemetryChannels = buildTelemetryChannels(INITIAL_TELEMETRY_STEP);

/* ------------------------------------------------------------------------ */
/* Synthetic night-flow anomaly series (water distribution main)            */
/* ------------------------------------------------------------------------ */

export type AnomalyRange = '24h' | '7d';

/** Readings deviating more than this fraction from the baseline are flagged. */
export const ANOMALY_TOLERANCE = 0.3;
/** Absolute floor for the tolerance band so near-zero night baselines stay meaningful. */
export const ANOMALY_MIN_BAND_LPM = 2;

/** Typical diurnal demand profile in L/min, indexed by hour of day. */
const hourlyBaselineLpm = [
  4.2, 3.8, 3.6, 3.5, 3.9, 6.5, 14.8, 24.6, 27.3, 22.1, 18.4, 17.2,
  19.6, 18.8, 16.5, 15.9, 18.2, 23.7, 28.4, 26.1, 19.3, 12.6, 8.1, 5.4,
];

/** Small deterministic deviation so the measured series is not identical to baseline. */
const jitter = (i: number) => Math.sin(i * 2.3) * 0.6 + Math.cos(i * 0.9) * 0.4;

const pad = (n: number) => String(n).padStart(2, '0');

const ANOMALY_ANNOTATION = 'Night-flow spike above expected baseline';

function build24h(): AnomalyDataPoint[] {
  return hourlyBaselineLpm.map((baseline, hour) => {
    const isAnomaly = hour === 3;
    const measured = isAnomaly ? 17.8 : baseline + jitter(hour) * (baseline > 10 ? 1.6 : 0.5);
    return {
      timestamp: `${pad(hour)}:00`,
      flowRateLpm: round(measured, 1),
      expectedBaselineLpm: baseline,
      ...(isAnomaly && { isAnomaly: true, annotation: ANOMALY_ANNOTATION }),
    };
  });
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SEVEN_DAY_STEP_H = 3;
const SEVEN_DAY_ANOMALY = { day: 4, hour: 3 };

function build7d(): AnomalyDataPoint[] {
  const points: AnomalyDataPoint[] = [];
  days.forEach((day, d) => {
    for (let hour = 0; hour < 24; hour += SEVEN_DAY_STEP_H) {
      const i = d * 8 + hour / SEVEN_DAY_STEP_H;
      const weekendFactor = d >= 5 ? 0.88 : 1;
      const baseline = round(hourlyBaselineLpm[hour] * weekendFactor, 1);
      const isAnomaly = d === SEVEN_DAY_ANOMALY.day && hour === SEVEN_DAY_ANOMALY.hour;
      const measured = isAnomaly ? 16.9 : baseline + jitter(i) * (baseline > 10 ? 1.8 : 0.5);
      points.push({
        timestamp: `${day} ${pad(hour)}:00`,
        flowRateLpm: round(measured, 1),
        expectedBaselineLpm: baseline,
        ...(isAnomaly && { isAnomaly: true, annotation: ANOMALY_ANNOTATION }),
      });
    }
  });
  return points;
}

export const anomalySeries: Record<AnomalyRange, AnomalyDataPoint[]> = {
  '24h': build24h(),
  '7d': build7d(),
};

export function toleranceBand(baseline: number): [number, number] {
  const delta = Math.max(baseline * ANOMALY_TOLERANCE, ANOMALY_MIN_BAND_LPM);
  return [round(Math.max(baseline - delta, 0), 1), round(baseline + delta, 1)];
}
