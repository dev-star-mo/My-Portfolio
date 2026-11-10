export type DomainCategory = 'iot' | 'backend' | 'analytics';

export type ProjectStatus = 'completed' | 'sample-case-study' | 'in-progress' | 'concept';

export interface ExternalLinks {
  liveDemo?: string;
  github?: string;
  caseStudyDoc?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitleBadge: string; // e.g., "Hackathon Winner", "Commercial Deployment Highlight", "SAMPLE BI CASE STUDY (DEMONSTRATION)"
  primaryCategory: DomainCategory;
  secondaryDomains?: DomainCategory[];
  status: ProjectStatus;
  contextProblem: string;
  roleContribution: string;
  solutionArchitecture: string;
  architectureFlow?: string[]; // e.g., ["ESP32 Mic + TinyML", "LoRaWAN Gateway", "Node-RED / FastAPI", "PostgreSQL", "React Ranger Dashboard"]
  techStack: string[];
  outcomeEvidence: string;
  progressNote?: string; // Used for in-progress / concept items
  links?: ExternalLinks;
  relatedExperienceId?: string;
}

export interface DeploymentCaseStudy {
  id: string;
  title: string;
  domainTags: string[];
  problem: string;
  roleAndContribution: string;
  solution: string;
  outcomeSummary: string;
  iconName: 'Thermometer' | 'Building2' | 'Droplets' | 'Wind' | 'Activity';
}

export interface RdProjectItem {
  id: string;
  title: string;
  problem: string;
  solution: string;
  techHighlights: string[];
  iconName: 'Wifi' | 'Truck' | 'Lightbulb' | 'MapPin';
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  deployments: DeploymentCaseStudy[];
  rdProjects: RdProjectItem[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  category: DomainCategory;
  description?: string;
  // Do not populate date or credentialUrl unless explicitly supplied by owner
  date?: string;
  credentialUrl?: string;
}

export interface ArchitectureNode {
  id: string;
  stepNumber: string;
  title: string;
  shortLabel: string;
  category: DomainCategory;
  purpose: string;
  protocolsAndTech: string[];
  dataIn: string;
  dataOut: string;
  failureAndReliabilityNotes: string;
}

export interface TelemetryChannel {
  id: string;
  label: string;
  protocol: string;
  unit: string;
  currentValue: number;
  normalRange: string;
  history: { time: string; value: number }[];
}

export interface AnomalyDataPoint {
  timestamp: string;
  flowRateLpm: number;
  expectedBaselineLpm: number;
  isAnomaly?: boolean;
  annotation?: string;
}

export type SectionId =
  | 'home'
  | 'projects'
  | 'architecture'
  | 'experience'
  | 'certifications'
  | 'about'
  | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface ContactMethod {
  id: 'email' | 'phone' | 'location';
  label: string;
  value: string;
  href?: string;
}

export interface SocialLink {
  id: 'github' | 'linkedin';
  label: string;
  handle: string;
  href: string;
}

export interface CapabilityPillar {
  id: DomainCategory;
  title: string;
  summary: string;
  skills: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
}

export interface Profile {
  name: string;
  roles: string[];
  coreMessage: string;
  shortBio: string;
  /** Distinct from hero copy — used only in AboutSection. */
  aboutNarrative: string[];
  location: string;
  yearsExperience: string;
  contact: ContactMethod[];
  socials: SocialLink[];
  education: EducationEntry;
  capabilities: CapabilityPillar[];
  // Only rendered when defined, so no dead CV link ships before a PDF exists.
  cvUrl?: string;
}
