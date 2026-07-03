import type { Cohort5Specialization, Cohort5TrackId } from './cohort5';

/** Systeme.io tag IDs for Cohort 5 program newsletters (from your Systeme.io account). */
export const SYSTEME_PROGRAM_TAGS = {
  'data-science-intermediate': 2057858,
  'ai-automation-business-analytics': 2057856,
  'microsoft-fabric-data-engineering': 2057849,
  'healthcare-analytics': 2057850,
  'financial-analytics': 2057852,
  'agricultural-analytics': 2057855,
} as const;

/** General newsletter / webinar list tag in Systeme.io. */
export const SYSTEME_GENERAL_NEWSLETTER_TAG_ID = 2039214;

export function getSystemeTagIdForApplication(
  trackId: Cohort5TrackId,
  specialization?: Cohort5Specialization | null
): number {
  if (trackId === 'data-analytics-intermediate' && specialization) {
    return SYSTEME_PROGRAM_TAGS[specialization];
  }

  const tagId = SYSTEME_PROGRAM_TAGS[trackId as keyof typeof SYSTEME_PROGRAM_TAGS];
  if (!tagId) {
    throw new Error(`No Systeme.io tag configured for track: ${trackId}`);
  }

  return tagId;
}
