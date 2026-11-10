import type { ExperienceEntry } from '@/types/portfolio';

export const experience: ExperienceEntry = {
  id: 'upande-limited',
  company: 'Upande Limited',
  role: 'IoT / Backend Engineer',
  period: 'Feb 2023 – Dec 2025',
  location: 'Nairobi, Kenya',
  summary:
    'Designed and implemented end-to-end LoRaWAN sensor systems across 20+ sites. Managed the complete data pipeline from sensor deployment to real-time user dashboards, enabling data-driven decisions for diverse industries.',
  deployments: [
    {
      id: 'cold-chain-monitoring',
      title: 'Cold Chain Monitoring',
      domainTags: ['STM32', 'LoRaWAN', 'Node.js', 'SMS Alerts'],
      problem:
        'Flowers and vaccines need to be stored in conducive temperatures; failure led to significant damage. Management lacked real-time and historical temperature data for cold rooms.',
      roleAndContribution:
        'Deployed STM32 temperature sensors and LoRaWAN door sensors, then built the Node.js processing layer for real-time and historical dashboards with SMS threshold alerts.',
      solution:
        'STM32 temperature sensors in strategic locations reporting to a central gateway. Door sensors paired with LoRaWAN sirens when doors were left open too long, plus SMS alerts on temperature thresholds.',
      outcomeSummary:
        'Cold rooms gained continuous temperature visibility and door/threshold alerting for flower and vaccine storage.',
      iconName: 'Thermometer',
    },
    {
      id: 'school-resource-management',
      title: 'School Resource Management',
      domainTags: ['LoRaWAN', 'Ultrasonic', 'Energy Meters', 'Node.js'],
      problem:
        'A school needed to monitor 50+ residential water/electricity meters, tank levels, and flow rates without manual readings, which was labor-intensive and inefficient.',
      roleAndContribution:
        'Deployed ultrasonic water level, flow, and energy meter sensors over LoRaWAN and processed the telemetry in Node.js for management dashboards.',
      solution:
        'LoRaWAN ultrasonic tank-level sensors with flow and energy meter monitoring feeding Node.js dashboards used by school management.',
      outcomeSummary:
        'Enabled usage-based decision making, identified high-usage residences, and helped ensure water availability through tank monitoring.',
      iconName: 'Building2',
    },
    {
      id: 'amref-wash-projects',
      title: 'Amref WaSH Projects',
      domainTags: ['WaSH', 'RS485-Modbus', 'Frappe/ERP', 'NRW'],
      problem:
        'Amref needed to curb Non-Revenue Water (NRW) in water-scarce regions and provide health/usage data to donors to prove project viability.',
      roleAndContribution:
        'Integrated water quality (pH/EC), tank level, flow, and RS485-Modbus pump sensors; developed Node.js processing and Frappe/ERP API reporting; designed a custom long-range wireless float switch.',
      solution:
        'Sensor suite covering water quality, levels, flow, and pump control, with Node.js processing, ERP reporting, and a wireless float-switch system spanning kilometers to reduce cabling costs while keeping automatic pump control.',
      outcomeSummary:
        'Supported NRW reduction and donor reporting while cutting cabling cost for remote pump control.',
      iconName: 'Droplets',
    },
    {
      id: 'flower-fly-farms',
      title: 'Flower & Fly Farms',
      domainTags: ['Greenhouse', 'LoRaWAN', 'Soil Sensing', 'SMS Alerts'],
      problem:
        'Manual monitoring of greenhouse soil (pH, EC), temperature, and humidity was tedious and risked flower damage if conditions fluctuated.',
      roleAndContribution:
        'Implemented automated LoRaWAN soil, temperature, and humidity sensing with Node.js dashboards and critical SMS threshold alerts.',
      solution:
        'Automated soil quality, temperature, and humidity sensors over LoRaWAN, processed in Node.js for management dashboards with SMS alerts on soil and air thresholds.',
      outcomeSummary:
        'Maintained optimal growing conditions with continuous environmental monitoring and threshold alerting.',
      iconName: 'Wind',
    },
    {
      id: 'water-utility-smart-metering',
      title: 'Water Utility Smart Metering',
      domainTags: ['Smart Metering', 'Retrofit Sensors', 'Node.js', 'OCR R&D'],
      problem:
        'Manual monthly meter reading for hundreds of homes was inefficient. Replacing old meters with smart meters was prohibitively expensive.',
      roleAndContribution:
        'Developed custom sensors to retrofit existing meters, built Node.js billing dashboards, and experimented with AI/OCR camera approaches for automated meter reading.',
      solution:
        'Retrofit sensors capturing meter data via a central gateway, Node.js billing dashboards, and exploratory AI/OCR camera meter-reading workflows.',
      outcomeSummary:
        'Turned legacy meters into reporting endpoints without full meter replacement, supporting billing workflows from the captured data.',
      iconName: 'Activity',
    },
  ],
  rdProjects: [
    {
      id: 'nb-iot-amref-wash',
      title: 'Safaricom NB-IoT Sensor Deployment & UDP Float Switch (Amref WaSH)',
      problem:
        'One site required NB-IoT instead of LoRaWAN to test viability for a full-site deployment and to reduce the high costs of a LoRaWAN installation.',
      solution:
        'Configured sensors on the Safaricom NB-IoT network, developed Node.js processing for each sensor, and used UDP between a wireless float switch and an RS485-Modbus pump controller for automatic on/off control. The site delivered the required data at lower cost than LoRaWAN-powered sites.',
      techHighlights: ['Safaricom NB-IoT', 'UDP float switch', 'RS485-Modbus', 'Node.js'],
      iconName: 'Wifi',
    },
    {
      id: 'lorawan-freight-tracking',
      title: 'LoRaWAN + Raspberry Pi Mobile Gateway Freight Tracking',
      problem:
        'Flowers were arriving in Europe damaged. Existing solutions only offered historical data; the farm needed live tracking during the journey.',
      solution:
        'Built a mobile gateway (Raspberry Pi + LoRaWAN Hat) for trucks so container temperature sensors reported live geo-tagged data from farm to airport, logged data for offload on arrival in Europe, generated a farm-to-Europe freight chart in Node.js, and tested RockBLOCK Iridium satellite integration for mid-flight telemetry.',
      techHighlights: ['Raspberry Pi', 'LoRaWAN', 'RockBLOCK Iridium', 'Node.js'],
      iconName: 'Truck',
    },
    {
      id: 'energy-saving-jiko',
      title: 'Energy Saving Jiko Custom PCB & Firmware R&D',
      problem:
        'Need for metrics like cooking duration and heat efficiency to prove environmental impact to donors.',
      solution:
        'Designed a custom PCB and wrote firmware for a specialized temperature sensor to monitor heat production efficiency in real time.',
      techHighlights: ['Custom PCB', 'Firmware', 'Temperature sensing'],
      iconName: 'Lightbulb',
    },
    {
      id: 'vehicle-gprs-tracking',
      title: 'TK303 Vehicle GPS/GPRS UDP Telemetry & ERP Sync',
      problem: 'Flower farm needed to monitor vehicle locations and historical trips.',
      solution:
        'Deployed TK303 GPS/GPRS trackers, processed UDP data packets via Node.js, and synced telemetry with ERP systems for trip management.',
      techHighlights: ['TK303', 'UDP', 'Node.js', 'ERP sync'],
      iconName: 'MapPin',
    },
  ],
};
