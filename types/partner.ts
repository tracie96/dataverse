export type PartnerStatus = "pending" | "approved" | "rejected";

export type OrganizationType =
  | "university"
  | "company"
  | "ngo"
  | "community"
  | "individual"
  | "other";

export interface PartnerRegistrationForm {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  organizationType: OrganizationType;
  message: string;
}

export interface PartnerRecord {
  id: string;
  organization_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  organization_type: OrganizationType;
  message?: string;
  status: PartnerStatus;
  created_at: string;
  updated_at: string;
  referral_codes?: ReferralCodeRecord[];
}

export interface ReferralCodeRecord {
  id: string;
  partner_id: string;
  code: string;
  active: boolean;
  created_at: string;
}

export interface ReferralValidationResult {
  valid: boolean;
  partnerName?: string;
  partnerId?: string;
  code?: string;
  error?: string;
}
