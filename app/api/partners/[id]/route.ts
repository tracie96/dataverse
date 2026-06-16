import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/admin-auth";
import { getSupabaseServer } from "@/lib/supabase-server";
import { createUniqueReferralCode } from "@/lib/referral";
import { sendPartnerApprovalEmail } from "@/lib/email";

type RouteContext = { params: { id: string } };

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    if (!verifyAdminToken(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const action = body.action as "approve" | "reject";

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { data: partner, error: fetchError } = await supabase
      .from("partners")
      .select("*")
      .eq("id", params.id)
      .single();

    if (fetchError || !partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    if (action === "reject") {
      const { data, error } = await supabase
        .from("partners")
        .update({ status: "rejected", updated_at: new Date().toISOString() })
        .eq("id", params.id)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: "Failed to reject partner: " + error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data });
    }

    if (partner.status === "approved") {
      const { data: existingCode } = await supabase
        .from("referral_codes")
        .select("code")
        .eq("partner_id", partner.id)
        .eq("active", true)
        .maybeSingle();

      return NextResponse.json({
        success: true,
        message: "Partner already approved",
        data: partner,
        referralCode: existingCode?.code,
      });
    }

    const referralCode = await createUniqueReferralCode(supabase, partner.id);

    const { data, error } = await supabase
      .from("partners")
      .update({ status: "approved", updated_at: new Date().toISOString() })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to approve partner: " + error.message },
        { status: 500 }
      );
    }

    try {
      await sendPartnerApprovalEmail({
        contactName: partner.contact_name,
        email: partner.email,
        organizationName: partner.organization_name,
        referralCode,
      });
    } catch (emailError) {
      console.error("Partner approval email failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Partner approved and referral code generated",
      data,
      referralCode,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error: " + (error as Error).message },
      { status: 500 }
    );
  }
}
