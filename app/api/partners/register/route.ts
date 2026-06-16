import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { sendPartnerRegistrationAdminEmail } from "@/lib/email";
import type { OrganizationType } from "@/types/partner";

const ORGANIZATION_TYPES: OrganizationType[] = [
  "university",
  "company",
  "ngo",
  "community",
  "individual",
  "other",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      organizationName,
      contactName,
      email,
      phone,
      organizationType,
      message,
    } = body;

    if (!organizationName?.trim() || !contactName?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Organization name, contact name, and email are required" },
        { status: 400 }
      );
    }

    const type: OrganizationType = ORGANIZATION_TYPES.includes(organizationType)
      ? organizationType
      : "other";

    const supabase = getSupabaseServer();
    const normalizedEmail = email.trim().toLowerCase();

    const { data: existing } = await supabase
      .from("partners")
      .select("id, status")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      if (existing.status === "approved") {
        return NextResponse.json(
          { error: "A partner account with this email already exists" },
          { status: 409 }
        );
      }
      if (existing.status === "pending") {
        return NextResponse.json(
          { error: "Your application is already pending review" },
          { status: 409 }
        );
      }
    }

    const { data, error } = await supabase
      .from("partners")
      .insert({
        organization_name: organizationName.trim(),
        contact_name: contactName.trim(),
        email: normalizedEmail,
        phone: phone?.trim() || null,
        organization_type: type,
        message: message?.trim() || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Partner registration error:", error);
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A partner account with this email already exists" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Failed to submit partner application: " + error.message },
        { status: 500 }
      );
    }

    try {
      await sendPartnerRegistrationAdminEmail({
        organizationName: data.organization_name,
        contactName: data.contact_name,
        email: data.email,
        organizationType: data.organization_type,
      });
    } catch (emailError) {
      console.error("Partner admin notification email failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      message:
        "Partner application submitted successfully. You will receive your referral code once approved.",
      data: { id: data.id, status: data.status },
    });
  } catch (error) {
    console.error("Partner registration server error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error as Error).message },
      { status: 500 }
    );
  }
}
