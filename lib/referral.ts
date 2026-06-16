import { SupabaseClient } from "@supabase/supabase-js";
import type { ReferralValidationResult } from "@/types/partner";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function normalizeReferralCode(code: string): string {
  return code.trim().toUpperCase();
}

export function generateReferralCode(): string {
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return `DV-${suffix}`;
}

export async function validateReferralCode(
  supabase: SupabaseClient,
  rawCode: string
): Promise<ReferralValidationResult> {
  const code = normalizeReferralCode(rawCode);
  if (!code) {
    return { valid: false, error: "Referral code is required" };
  }

  const { data, error } = await supabase
    .from("referral_codes")
    .select("id, code, active, partner_id, partners!inner(id, organization_name, status)")
    .eq("code", code)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    console.error("Referral validation error:", error);
    return { valid: false, error: "Unable to validate referral code" };
  }

  if (!data) {
    return { valid: false, error: "Invalid referral code" };
  }

  const partnerData = data.partners;
  const partner = Array.isArray(partnerData) ? partnerData[0] : partnerData;
  if (!partner || partner.status !== "approved") {
    return { valid: false, error: "This referral code is not active" };
  }

  return {
    valid: true,
    partnerName: partner.organization_name,
    partnerId: partner.id,
    code: data.code,
  };
}

export async function createUniqueReferralCode(
  supabase: SupabaseClient,
  partnerId: string
): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = generateReferralCode();
    const { data: existing } = await supabase
      .from("referral_codes")
      .select("id")
      .eq("code", code)
      .maybeSingle();

    if (existing) continue;

    const { error } = await supabase.from("referral_codes").insert({
      partner_id: partnerId,
      code,
      active: true,
    });

    if (!error) return code;
    if (error.code !== "23505") throw error;
  }

  throw new Error("Failed to generate a unique referral code");
}
