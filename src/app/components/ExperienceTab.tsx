import { motion } from "motion/react";
import { Briefcase, Thermometer, Droplets, MapPin, Search, Lightbulb, Truck, Zap, Activity, Building2, Wind, Wifi } from "lucide-react";

const caseStudies = [
  {
    title: "Cold Chain Monitoring",
    problem: "Flowers and vaccines need to be stored in conducive temperatures; failure led to significant damage. Management lacked real-time and historical temperature data for cold rooms.",
    solution: "Deployed STM32 temperature sensors in strategic locations reporting to a central gateway. Developed Node.js data processing to display real-time/historical data on dashboards. Integrated door sensors with LoRaWAN sirens to alert if doors were left open too long, and implemented SMS threshold alerts.",
    icon: Thermometer,
    color: "blue"
  },
  {
    title: "School Resource Management",
    problem: "A school needed to monitor 50+ residential water/electricity meters, tank levels, and flow rates without manual readings, which was labor-intensive and inefficient.",
    solution: "Deployed ultrasonic water level sensors, flow and energy meter sensors via LoRaWAN. Processed data with Node.js for management dashboards. This enabled usage-based decision making, identified high-usage residences, and ensured water availability through tank monitoring.",
    icon: Building2,
    color: "indigo"
  },
  {
    title: "Amref WaSH Projects",
    problem: "Amref needed to curb Non-Revenue Water (NRW) in water-scarce regions and provide health/usage data to donors to prove project viability.",
    solution: "Integrated water quality (pH/EC), levels, flow, and RS485-Modbus pump sensors. Developed Node.js processing and integrated Frappe/ERP APIs for reporting. Created a custom wireless floatswitch system for kilometers-long distances, reducing cabling costs while ensuring automatic pump control.",
    icon: Droplets,
    color: "cyan"
  },
  {
    title: "Flower & Fly Farms",
    problem: "Manual monitoring of greenhouse soil (pH, EC), temperature, and humidity was tedious and risked flower damage if conditions fluctuated.",
    solution: "Implemented automated soil quality, temperature and humidity sensors via LoRaWAN. Processed data with Node.js for management dashboards. Added critical SMS alerts for soil/air thresholds, maintaining optimal growing conditions and maximizing farm output.",
    icon: Wind,
    color: "green"
  },
  {
    title: "Water Utility Smart Metering",
    problem: "Manual monthly meter reading for hundreds of homes was inefficient. Replacing old meters with smart meters was prohibitively expensive.",
    solution: "Developed custom sensors to retrofit existing meters, making them 'smart' and capturing data via a central gateway. Processed data using Node.js for billing dashboards and experimented with AI/OCR camera solutions for automated meter reading.",
    icon: Activity,
    color: "teal"
  }
];

const rdWork = [
  {
    title: "NB-IoT sensor deployment for Amref WaSH project",
    problem: "One site required NB-IoT deployment instead of LoRaWAN for testing the viability of NB-IoT for a full site deployment as well as to reduce the high costs of a LoRaWAN deployment.",
    solution: "I was responsible for setting up the sensors and ensuring they were properly configured to use Safaricom NB-IoT network. I developed the Node.js code to process each sensor data. For the wireless floatswitch, I came up with a method to use UDP to communicate between the floatswitch and the RS485-Modbus device that communicates with the pump controller, turning the pump on or off depending on the tank level. The site was a success and Amref paid less for this site compared to LoRaWAN powered sites and still got all the data they needed.",
    icon: Wifi
  },
  {
    title: "LoRaWAN Freight Tracking",
    problem: "Flowers were arriving in Europe damaged. Existing solutions only offered historical data; the farm needed live tracking during the journey.",
    solution: "Created a mobile gateway (Raspberry Pi + LoRaWAN Hat) for trucks. Temperature sensors in containers reported live geo-tagged data all the way from the farm to the airport,logged data and offloaded it upon arrival in Europe. Developed Node.js code to generate a complete farm-to-Europe freight chart. Tested Rockblock Iridium satellite integration for mid-flight telemetry.",
    icon: Truck
  },
  {
    title: "Energy Saving Jiko R&D",
    problem: "Need for metrics like cooking duration and heat efficiency to prove environmental impact to donors.",
    solution: "Designed the custom PCB and wrote firmware for a specialized temperature sensor to monitor heat production efficiency in real-time.",
    icon: Lightbulb
  },
  {
    title: "Vehicle GPRS Tracking",
    problem: "Flower farm needed to monitor vehicle locations and historical trips.",
    solution: "Deployed TK303 GPS/GPRS trackers. Processed UDP data packets via Node.js and synced telemetry with ERP systems for trip management.",
    icon: MapPin
  }
];

export function ExperienceTab() {
  return (
    <div className="space-y-24 pb-20">
      {/* Introduction */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden p-8 rounded-2xl bg-primary/5 border border-primary/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-primary text-primary-foreground">
            <Briefcase className="size-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Upande Limited</h2>
            <p className="text-primary font-medium">IoT / Backend Engineer</p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
          Designed and implemented end-to-end LoRaWAN sensor systems across 20+ sites.
          Managed the complete data pipeline from sensor deployment to real-time user dashboards,
          enabling data-driven decisions for diverse industries.
        </p>
      </motion.section>

      {/* Case Studies */}
      <section>
        <div className="flex items-center gap-3 mb-10">
          <Search className="size-6 text-primary" />
          <h3 className="text-2xl font-bold">Major Deployments & Case Studies</h3>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
            >
              <div className={`p-4 rounded-xl bg-primary/10 h-fit w-fit`}>
                <study.icon className="size-8 text-primary" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{study.title}</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">The Problem</p>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">"{study.problem}"</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">The Solution</p>
                    <p className="text-sm text-foreground/90 leading-relaxed">{study.solution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* R&D Section */}
      <section>
        <div className="flex items-center gap-3 mb-10">
          <Zap className="size-6 text-yellow-500" />
          <h3 className="text-2xl font-bold">Research & Development (R&D)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rdWork.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <item.icon className="size-6 text-primary mb-4" />
              <h4 className="font-bold mb-3">{item.title}</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.problem}</p>
              <p className="text-sm text-foreground/80">{item.solution}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}