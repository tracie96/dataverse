export const COHORT5_META = {
  id: 'cohort5',
  name: 'Cohort 5.0',
  durationWeeks: 12,
  kickoffDate: 'Saturday, 5th September 2026',
  applicationOpen: 'May 22, 2026',
  applicationClose: 'Friday, 28th August, 2026',
  midpointReview: 'August 29, 2026',
  capstoneWeek: 'September 26 – October 4, 2026',
  nairaRate: 1500,
  programFeeUsd: 45,
} as const;

export type Cohort5TrackId =
  | 'data-analytics-intermediate'
  | 'ai-automation-business-analytics'
  | 'data-science-intermediate'
  | 'microsoft-fabric-data-engineering';

export type Cohort5Specialization =
  | 'healthcare-analytics'
  | 'financial-analytics'
  | 'agricultural-analytics';

export interface Cohort5Track {
  id: Cohort5TrackId;
  name: string;
  level: 'intermediate' | 'advanced';
  feeUsd: number;
  description: string;
  skills: string[];
  requiresSpecialization: boolean;
  specializations?: { id: Cohort5Specialization; name: string; description: string }[];
}

export const COHORT5_TRACKS: Record<Cohort5TrackId, Cohort5Track> = {
  'data-analytics-intermediate': {
    id: 'data-analytics-intermediate',
    name: 'Data Analytics Intermediate',
    level: 'intermediate',
    feeUsd: 45,
    description: 'Domain-specialized analytics for learners with prior experience.',
    skills: ['Healthcare Analytics', 'Financial Analytics', 'Agricultural Analytics'],
    requiresSpecialization: true,
    specializations: [
      {
        id: 'healthcare-analytics',
        name: 'Healthcare Analytics',
        description: 'Analyze healthcare data to improve patient outcomes and operational efficiency.',
      },
      {
        id: 'financial-analytics',
        name: 'Financial Analytics',
        description: 'Work with financial data to drive business decisions and risk management.',
      },
      {
        id: 'agricultural-analytics',
        name: 'Agricultural Analytics',
        description: 'Apply analytics to agricultural data for better crop management and yield optimization.',
      },
    ],
  },
  'ai-automation-business-analytics': {
    id: 'ai-automation-business-analytics',
    name: 'AI Automation & Business Analytics',
    level: 'intermediate',
    feeUsd: 45,
    description: 'Build AI-powered workflows and automate business processes with n8n.',
    skills: [
      'Introduction to n8n',
      'AI Workflow with n8n',
      'Project Delivery',
    ],
    requiresSpecialization: false,
  },
  'data-science-intermediate': {
    id: 'data-science-intermediate',
    name: 'Data Science Intermediate',
    level: 'intermediate',
    feeUsd: 45,
    description: 'Advanced ML, deep learning, LLM applications, and cloud deployment.',
    skills: [
      'Applied Machine Learning',
      'Deep Learning',
      'Applications of LLM',
      'FastAPI Implementation',
      'AWS Cloud Deployment (EC2, S3)',
      'Full System Integration Work-through',
    ],
    requiresSpecialization: false,
  },
  'microsoft-fabric-data-engineering': {
    id: 'microsoft-fabric-data-engineering',
    name: 'Microsoft Fabric Data Engineering Associate',
    level: 'advanced',
    feeUsd: 45,
    description: 'Enterprise data engineering on Microsoft Fabric with DP-700 exam preparation.',
    skills: [
      'Foundations of Microsoft Fabric',
      'Data Transformation, Warehousing & Analytics',
      'Advanced Engineering, Governance & DevOps',
      'Hands-on Project Delivery / Capstone',
      'DP-700 Examination Preparation Guidance',
    ],
    requiresSpecialization: false,
  },
};

export const COHORT5_TIMELINE = [
  {
    date: 'May 22 – Friday, 28th August, 2026',
    activity: 'Application Open + Outreach Campaign',
    status: 'active' as const,
  },
  {
    date: 'June 6 – July 4, 2026',
    activity: 'Webinars and Social Media Drills / Ads',
    status: 'upcoming' as const,
  },
  {
    date: 'Saturday, 5th September 2026',
    activity: 'Cohort Kick-off (Orientation)',
    status: 'upcoming' as const,
  },
  {
    date: 'August 29, 2026',
    activity: 'Midpoint Project Review',
    status: 'upcoming' as const,
  },
  {
    date: 'September 26 – October 4, 2026',
    activity: 'Capstone Presentation Week & Graduation',
    status: 'upcoming' as const,
  },
];

export function getTrackFeeUsd(_trackId?: Cohort5TrackId): number {
  return COHORT5_META.programFeeUsd;
}

export function getTrackFeeNgn(_trackId?: Cohort5TrackId): number {
  return COHORT5_META.programFeeUsd * COHORT5_META.nairaRate;
}

export function getTrackById(trackId: string): Cohort5Track | undefined {
  return COHORT5_TRACKS[trackId as Cohort5TrackId];
}

export const COHORT5_TRACK_LIST = Object.values(COHORT5_TRACKS);
