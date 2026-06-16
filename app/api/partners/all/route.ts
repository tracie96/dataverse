import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/admin-auth";
import { getSupabaseServer } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  try {
    if (!verifyAdminToken(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseServer();
    const status = new URL(request.url).searchParams.get("status");

    let query = supabase
      .from("partners")
      .select("*, referral_codes(id, code, active, created_at)")
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch partners: " + error.message },
        { status: 500 }
      );
    }

    const partners = (data || []).map((partner) => {
      const codes = partner.referral_codes || [];
      return { ...partner, referral_codes: codes };
    });

    const partnerIds = (data || []).map((p) => p.id);
    let referralStats: Record<string, number> = {};

    if (partnerIds.length > 0) {
      const { data: applications } = await supabase
        .from("cohort5_applications")
        .select("partner_id")
        .in("partner_id", partnerIds);

      referralStats = (applications || []).reduce<Record<string, number>>((acc, app) => {
        if (app.partner_id) {
          acc[app.partner_id] = (acc[app.partner_id] || 0) + 1;
        }
        return acc;
      }, {});
    }

    return NextResponse.json({
      data: partners,
      referralStats,
      counts: {
        pending: partners.filter((p) => p.status === "pending").length,
        approved: partners.filter((p) => p.status === "approved").length,
        rejected: partners.filter((p) => p.status === "rejected").length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error: " + (error as Error).message },
      { status: 500 }
    );
  }
}
