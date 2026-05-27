"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Lock,
  LogOut,
  Award,
} from "lucide-react";
import { COHORT5_TRACKS } from "@/config/cohort5";
import type { Cohort5ApplicationRecord } from "@/types/cohort5";

const Cohort5AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [applications, setApplications] = useState<Cohort5ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [stats, setStats] = useState({
    paid: 0,
    pending: 0,
    scholarshipPending: 0,
    scholarshipApproved: 0,
  });
  const [selectedApp, setSelectedApp] = useState<Cohort5ApplicationRecord | null>(null);
  const [updatingScholarship, setUpdatingScholarship] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_auth_token");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      fetchApplications(token);
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
        fetchApplications(result.token);
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
    setApplications([]);
  };

  const fetchApplications = async (token?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: "200" });
      if (searchTerm) params.append("search", searchTerm);
      if (selectedTrack) params.append("track_id", selectedTrack);
      if (paymentStatus) params.append("payment_status", paymentStatus);
      if (applicationType) params.append("application_type", applicationType);

      const res = await fetch(`/api/cohort5-application/all?${params}`, {
        headers: { Authorization: `Bearer ${token || authToken}` },
      });
      if (!res.ok) {
        if (res.status === 401) handleLogout();
        throw new Error("Failed to fetch");
      }
      const result = await res.json();
      setApplications(result.data || []);
      setStats({
        paid: result.paymentStats?.paid ?? 0,
        pending: result.paymentStats?.pending ?? 0,
        scholarshipPending: result.scholarshipStats?.pending ?? 0,
        scholarshipApproved: result.scholarshipStats?.approved ?? 0,
      });
    } catch {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleScholarshipAction = async (applicationId: string, status: "approved" | "rejected") => {
    setUpdatingScholarship(true);
    try {
      const res = await fetch("/api/cohort5-application/scholarship", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ applicationId, status }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to update scholarship");
        return;
      }
      fetchApplications();
      setSelectedApp(null);
    } finally {
      setUpdatingScholarship(false);
    }
  };

  const exportCSV = () => {
    const headers = [
      "Name", "Email", "Track", "Specialization", "Type", "Scholarship Status",
      "Fee USD", "Payment", "Method", "Date",
    ];
    const rows = applications.map((a) => [
      `${a.first_name} ${a.last_name}`,
      a.email,
      COHORT5_TRACKS[a.track_id]?.name || a.track_id,
      a.specialization || "",
      a.application_type,
      a.scholarship_status,
      a.program_fee_usd,
      a.payment_completed ? "Paid" : "Pending",
      a.payment_method || "",
      a.created_at,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((f) => `"${String(f).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cohort5-applications-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[8rem] px-4">
        <div className="max-w-md w-full p-8 border rounded-lg">
          <Lock className="h-12 w-12 text-titlebg mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-6">Cohort 5 Admin</h2>
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cohort 5.0 Applications</h1>
            <p className="text-gray-600 dark:text-gray-400">{applications.length} applications loaded</p>
          </div>
          <div className="flex gap-3">
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg">
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 border rounded-lg">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Paid", value: stats.paid, icon: CheckCircle, color: "text-green-600" },
            { label: "Payment Pending", value: stats.pending, icon: Clock, color: "text-yellow-600" },
            { label: "Scholarship Pending", value: stats.scholarshipPending, icon: Award, color: "text-blue-600" },
            { label: "Scholarship Approved", value: stats.scholarshipApproved, icon: Users, color: "text-purple-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <s.icon className={`h-6 w-6 ${s.color} mb-2`} />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border mb-6 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700"
            />
          </div>
          <select value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-gray-700">
            <option value="">All Tracks</option>
            {Object.values(COHORT5_TRACKS).map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <select value={applicationType} onChange={(e) => setApplicationType(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-gray-700">
            <option value="">All Types</option>
            <option value="paid">Paid</option>
            <option value="scholarship">Scholarship</option>
          </select>
          <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-gray-700">
            <option value="">All Payment</option>
            <option value="true">Paid</option>
            <option value="false">Pending</option>
          </select>
          <button onClick={() => fetchApplications()} className="px-4 py-2 bg-titlebg text-white rounded-lg">
            Apply Filters
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Track</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Fee</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3">{app.first_name} {app.last_name}</td>
                    <td className="px-4 py-3">{app.email}</td>
                    <td className="px-4 py-3">{COHORT5_TRACKS[app.track_id]?.name || app.track_id}</td>
                    <td className="px-4 py-3 capitalize">{app.application_type}</td>
                    <td className="px-4 py-3">${app.program_fee_usd}</td>
                    <td className="px-4 py-3">
                      {app.application_type === "scholarship" ? (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          app.scholarship_status === "approved" ? "bg-green-100 text-green-800" :
                          app.scholarship_status === "rejected" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {app.scholarship_status}
                        </span>
                      ) : app.payment_completed ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Paid</span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelectedApp(app)} className="text-titlebg hover:underline text-xs">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedApp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h3 className="text-xl font-bold mb-4">
                {selectedApp.first_name} {selectedApp.last_name}
              </h3>
              <div className="space-y-3 text-sm mb-6">
                <p><strong>Email:</strong> {selectedApp.email}</p>
                <p><strong>Track:</strong> {COHORT5_TRACKS[selectedApp.track_id]?.name}</p>
                {selectedApp.specialization && <p><strong>Specialization:</strong> {selectedApp.specialization}</p>}
                <p><strong>Experience:</strong> {selectedApp.experience}</p>
                <p><strong>Motivation:</strong> {selectedApp.motivation}</p>
                {selectedApp.application_type === "scholarship" && (
                  <>
                    <p><strong>Scholarship Reason:</strong> {selectedApp.scholarship_reason}</p>
                    <p><strong>Financial Need:</strong> {selectedApp.financial_need_statement}</p>
                  </>
                )}
              </div>
              {selectedApp.application_type === "scholarship" && selectedApp.scholarship_status === "pending" && (
                <div className="flex gap-3 mb-4">
                  <button
                    disabled={updatingScholarship}
                    onClick={() => handleScholarshipAction(selectedApp.id, "approved")}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg"
                  >
                    <CheckCircle className="h-4 w-4" /> Approve Scholarship
                  </button>
                  <button
                    disabled={updatingScholarship}
                    onClick={() => handleScholarshipAction(selectedApp.id, "rejected")}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg"
                  >
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </div>
              )}
              <button onClick={() => setSelectedApp(null)} className="w-full py-2 border rounded-lg">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cohort5AdminPage;
