import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { validateReferralCode } from "@/lib/referral";

export async function GET(request: NextRequest) {
  try {
    const code = new URL(request.url).searchParams.get("code");

    if (!code?.trim()) {
      return NextResponse.json(
        { valid: false, error: "Referral code is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();
    const result = await validateReferralCode(supabase, code);

    if (!result.valid) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Referral validate error:", error);
    return NextResponse.json(
      { valid: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
