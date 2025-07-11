export interface ChallengeSubmission {
  id?: string;
  registration_id?: string;
  
  // Personal Details
  full_name: string;
  email: string;
  phone_number: string;
  country_of_residence: string;
  
  // Social Media Verification
  social_media_verified: boolean;
  
  // Project Details
  tools_used: string[];
  other_tools?: string;
  classification_model_built: boolean;
  models_used?: string;
  performance_metrics: string[];
  other_metrics?: string;
  
  // Insights & Strategy
  seller_behavior_insight: string;
  suspended_sellers_rationale: string;
  delivery_hypothesis_result?: 'true' | 'false' | 'not_tested';
  
  // File Upload
  submission_file_url: string;
  
  created_at?: string;
  updated_at?: string;
}

export const AVAILABLE_TOOLS = [
  'Python (Jupyter Notebooks)',
  'Excel',
  'Power BI',
  'Streamlit',
  'Tableau'
] as const;

export const PERFORMANCE_METRICS = [
  'Accuracy',
  'Precision',
  'Recall',
  'F1 Score',
  'AUC-ROC'
] as const;

export const DELIVERY_HYPOTHESIS_RESULTS = {
  TRUE: 'true',
  FALSE: 'false',
  NOT_TESTED: 'not_tested'
} as const; 