import type { Cohort5TrackId, Cohort5Specialization } from '@/config/cohort5';

export type ApplicationType = 'paid' | 'scholarship';
export type ScholarshipStatus = 'none' | 'pending' | 'approved' | 'rejected';

export interface Cohort5ApplicationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  trackId: Cohort5TrackId | '';
  specialization: Cohort5Specialization | '';
  experience: string;
  motivation: string;
  portfolio: string;
  linkedin: string;
  github: string;
  applicationType: ApplicationType;
  scholarshipReason: string;
  financialNeedStatement: string;
  agreeToTerms: boolean;
}

export interface Cohort5ApplicationRecord {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  country: string;
  city: string;
  track_id: Cohort5TrackId;
  specialization?: Cohort5Specialization;
  experience: string;
  motivation: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  application_type: ApplicationType;
  scholarship_status: ScholarshipStatus;
  scholarship_reason?: string;
  financial_need_statement?: string;
  program_fee_usd: number;
  payment_completed: boolean;
  payment_id?: string;
  payment_method?: string;
  payment_date?: string;
  transfer_name?: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}
