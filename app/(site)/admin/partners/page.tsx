"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  Copy,
  Lock,
  LogOut,
  Users,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import type { PartnerRecord } from "@/types/partner";

const PartnerAdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [partners, setPartners] = useState<PartnerRecord[]>([]);
  const [referralStats, setReferralStats] = useState<Record<string, number>>({});
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_auth_token");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      fetchPartners(token);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();
      if (res.ok && result.token) {
        setAuthToken(result.token);
        setIsAuthenticated(true);
        localStorage.setItem("admin_auth_token", result.token);
        fetchPartners(result.token);
      } else {
        setLoginError(result.error || "Invalid credentials");
      }
    } catch {
      setLoginError("Failed to authenticate");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    localStorage.removeItem("admin_auth_token");
    setPartners([]);
  };

  const fetchPartners = async (token?: string, status?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (status) params.append("status", status);

      const res = await fetch(`/api/partners/all?${params}`, {
        headers: { Authorization: `Bearer ${token || authToken}` },
      });

      if (!res.ok) {
        if (res.status === 401) handleLogout();
        throw new Error("Failed to fetch");
      }

      const result = await res.json();
      setPartners(result.data || []);
      setReferralStats(result.referralStats || {});
      setCounts(result.counts || { pending: 0, approved: 0, rejected: 0 });
    } catch {
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (partnerId: string, action: "approve" | "reject") => {
    setActionLoading(partnerId);
    try {
      const res = await fetch(`/api/partners/${partnerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ action }),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Action failed");

      if (action === "approve" && result.referralCode) {
        toast.success(`Approved! Code: ${result.referralCode}`);
      } else if (action === "reject") {
        toast.success("Partner rejected");
      } else {
        toast.success("Partner updated");
      }

      fetchPartners(authToken || undefined, statusFilter || undefined);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Referral code copied");
  };

  const copyReferralLink = (code: string) => {
    const url = `${window.location.origin}/internship-cohort5/apply?ref=${code}`;
    navigator.clipboard.writeText(url);
    toast.success("Referral link copied");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[8rem] px-4">
        <div className="max-w-md w-full p-8 border rounded-lg">
          <Lock className="h-12 w-12 text-titlebg mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-6">Partners Admin</h2>
          {loginError && <p className="text-red-600 text-sm mb-4">{loginError}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
              required
            />
            <button type="submit" className="w-full bg-titlebg text-white py-2 rounded-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-[8rem] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Partner Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Approve partners and manage referral codes</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/cohort5-applications"
              className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cohort 5 Applications
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 border rounded-lg">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Pending", value: counts.pending, icon: Clock, color: "text-yellow-600" },
            { label: "Approved", value: counts.approved, icon: CheckCircle, color: "text-green-600" },
            { label: "Rejected", value: counts.rejected, icon: XCircle, color: "text-red-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <s.icon className={`h-6 w-6 ${s.color} mb-2`} />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border mb-6 flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg dark:bg-gray-700"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={() => fetchPartners(authToken || undefined, statusFilter || undefined)}
            className="px-4 py-2 bg-titlebg text-white rounded-lg"
          >
            Apply Filter
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Organization</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Referral Code</th>
                  <th className="px-4 py-3 text-left">Referrals</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => {
                  const code = partner.referral_codes?.[0]?.code;
                  const referralCount = referralStats[partner.id] || 0;
                  return (
                    <tr
                      key={partner.id}
                      className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-4 py-3 font-medium">{partner.organization_name}</td>
                      <td className="px-4 py-3">{partner.contact_name}</td>
                      <td className="px-4 py-3">{partner.email}</td>
                      <td className="px-4 py-3 capitalize">{partner.organization_type}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs capitalize ${
                            partner.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : partner.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {partner.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {code ? (
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {code}
                            </code>
                            <button
                              onClick={() => copyCode(code)}
                              className="text-titlebg hover:underline"
                              title="Copy code"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => copyReferralLink(code)}
                              className="text-xs text-titlebg hover:underline"
                            >
                              Link
                            </button>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {referralCount}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {partner.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAction(partner.id, "approve")}
                              disabled={actionLoading === partner.id}
                              className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAction(partner.id, "reject")}
                              disabled={actionLoading === partner.id}
                              className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerAdminPage;
