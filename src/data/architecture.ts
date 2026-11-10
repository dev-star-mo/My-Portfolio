import type { AnomalyDataPoint, ArchitectureNode, TelemetryChannel } from '@/types/portfolio';

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

/* ------------------------------------------------------------------------ */
/* Representative edge-to-cloud reference pipeline                          */
/* ------------------------------------------------------------------------ */

export const ARCHITECTURE_DISCLOSURE =
  'Representative edge-to-cloud reference architecture. Specific protocols and cloud components vary across individual LoRaWAN, NB-IoT, and BLE deployments.';

export const architectureNodes: ArchitectureNode[] = [
  {
    id: 'sensor-node',
    stepNumber: '01',
    title: 'Sensor Node',
    shortLabel: 'Sensor',
    category: 'iot',
    purpose:
      'Measures the physical world at the edge (tank level, flow, temperature, soil, water quality) and packages readings into compact uplink payloads.',
    protocolsAndTech: ['STM32 / ESP32 (ESP-IDF)', 'Ultrasonic, flow & pH/EC probes', 'RS485-Modbus', 'I2C / SPI / UART', 'TinyML (edge inference)'],
    dataIn: 'Analog and digital sensor signals, Modbus registers, microphone audio for edge classification.',
    dataOut: 'Small binary uplink payloads with readings, battery level and status flags on a fixed reporting interval or on threshold events.',
    failureAndReliabilityNotes:
      'Battery-powered nodes sleep between uplinks; thresholds can trigger out-of-schedule alerts. Sensor drift and fouling are handled with calibration and plausibility checks downstream.',
  },
  {
    id: 'gateway',
    stepNumber: '02',
    title: 'LoRaWAN / NB-IoT Gateway',
    shortLabel: 'Gateway',
    category: 'iot',
    purpose:
      'Provides the long-range radio link from field devices to the internet. LoRaWAN uses a site gateway; NB-IoT devices connect directly through the mobile operator network.',
    protocolsAndTech: ['LoRaWAN', 'NB-IoT (Safaricom)', 'BLE (short range)', 'Raspberry Pi + LoRaWAN HAT (mobile gateway)', 'Cellular / Ethernet backhaul'],
    dataIn: 'LoRa radio frames or NB-IoT datagrams from devices in range.',
    dataOut: 'Forwarded radio packets with signal metadata (RSSI, SNR) over IP backhaul.',
    failureAndReliabilityNotes:
      'Gateway placement and antenna height drive coverage. Mobile gateways buffer data while offline and offload it once connectivity returns.',
  },
  {
    id: 'network-server',
    stepNumber: '03',
    title: 'Network Server',
    shortLabel: 'Network server',
    category: 'iot',
    purpose:
      'Authenticates devices, de-duplicates packets heard by multiple gateways, manages device sessions and data rates, and hands decrypted application payloads to integrations.',
    protocolsAndTech: ['LoRaWAN network server', 'OTAA device activation', 'Adaptive data rate (ADR)', 'Downlink scheduling'],
    dataIn: 'Raw uplinks forwarded by one or more gateways.',
    dataOut: 'De-duplicated, decrypted application payloads per device, plus downlink commands back to devices.',
    failureAndReliabilityNotes:
      'Frame counters and de-duplication protect against replays and duplicates. Device registration and keys are managed here, never in frontend code.',
  },
  {
    id: 'broker',
    stepNumber: '04',
    title: 'MQTT / UDP Broker',
    shortLabel: 'Broker',
    category: 'backend',
    purpose:
      'Decouples devices and network servers from application services by delivering messages to subscribers on device topics or UDP endpoints.',
    protocolsAndTech: ['MQTT topics', 'UDP listeners', 'JSON / binary payloads'],
    dataIn: 'Application payloads from the network server, and UDP packets from NB-IoT devices and GPS/GPRS trackers.',
    dataOut: 'Per-device message streams delivered to the processing backend.',
    failureAndReliabilityNotes:
      'Subscribers can reconnect and resume consuming. UDP is connectionless, so the backend validates and acknowledges packets where the device supports it.',
  },
  {
    id: 'backend',
    stepNumber: '05',
    title: 'Node-RED / FastAPI Backend',
    shortLabel: 'Backend',
    category: 'backend',
    purpose:
      'Decodes payloads into engineering units, applies business rules and alert thresholds, controls actuators, and exposes APIs to dashboards and ERP systems.',
    protocolsAndTech: ['Node.js', 'Node-RED', 'FastAPI (Python)', 'SMS alerting', 'Frappe / ERPNext APIs'],
    dataIn: 'Raw device messages from the broker.',
    dataOut: 'Validated readings, SMS threshold alerts, pump control commands and ERP records.',
    failureAndReliabilityNotes:
      'Decoders reject malformed or out-of-range payloads. Alert rules use thresholds and durations to avoid noisy notifications; actuator commands such as pump on/off are tied to tank-level state.',
  },
  {
    id: 'database',
    stepNumber: '06',
    title: 'PostgreSQL / Time-Series DB',
    shortLabel: 'Database',
    category: 'backend',
    purpose:
      'Stores the readings history so dashboards can show real-time and historical views and analysts can query trends across sites.',
    protocolsAndTech: ['PostgreSQL', 'Time-series tables', 'SQL', 'Indexes on device + timestamp'],
    dataIn: 'Validated, timestamped readings and alert events from the backend.',
    dataOut: 'Query results for dashboards, reports and analytics models.',
    failureAndReliabilityNotes:
      'Timestamps and device identifiers make writes idempotent so retried messages do not double-count. Retention and aggregation keep long histories fast to query.',
  },
  {
    id: 'dashboard-bi',
    stepNumber: '07',
    title: 'Operational Dashboard & BI',
    shortLabel: 'Dashboard & BI',
    category: 'analytics',
    purpose:
      'Turns readings into decisions: live operational views for site teams, plus reporting on usage, anomalies and KPIs for management and donors.',
    protocolsAndTech: ['Node.js dashboards', 'React', 'SQL', 'Power BI', 'Python for data analytics'],
    dataIn: 'Current and historical readings, alerts and ERP context.',
    dataOut: 'Dashboards, KPI reports, anomaly flags such as night-flow leaks, and exportable summaries.',
    failureAndReliabilityNotes:
      'Stale-data indicators show when a device has stopped reporting, so a quiet chart is never mistaken for a normal one.',
  },
];
