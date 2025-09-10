"use client";

import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Cohort3Application {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  country: string;
  city: string;
  track: string;
  experience: string;
  motivation: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  payment_completed: boolean;
  payment_id?: string;
  payment_method?: string;
  payment_date?: string;
  created_at: string;
  updated_at: string;
}

interface ApplicationsResponse {
  data: Cohort3Application[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  paymentStats: {
    paid: number;
    pending: number;
  };
}

const Cohort3EntriesPage = () => {
  const [applications, setApplications] = useState<Cohort3Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPaidCount, setTotalPaidCount] = useState(0);
  const [totalPendingCount, setTotalPendingCount] = useState(0);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Selected application for modal
  const [selectedApplication, setSelectedApplication] = useState<Cohort3Application | null>(null);
  const [showModal, setShowModal] = useState(false);

  const tracks = [
    'Data Analytics',
    'Data Science'
  ];

  // Calculate payment statistics from current page (for display purposes)
  const currentPagePaidCount = applications.filter(app => app.payment_completed).length;
  const currentPagePendingCount = applications.filter(app => !app.payment_completed).length;

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (selectedTrack) params.append('track', selectedTrack);
      if (paymentStatus) params.append('payment_status', paymentStatus);
      
      const response = await fetch(`/api/cohort3-application/all?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      
      const result: ApplicationsResponse = await response.json();
      setApplications(result.data);
      setTotalPages(result.totalPages);
      setTotalCount(result.count);
      setTotalPaidCount(result.paymentStats.paid);
      setTotalPendingCount(result.paymentStats.pending);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [currentPage, searchTerm, selectedTrack, paymentStatus]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchApplications();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTrack('');
    setPaymentStatus('');
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentStatusBadge = (paymentCompleted: boolean) => {
    if (paymentCompleted) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3" />
          Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle className="h-3 w-3" />
        Pending
      </span>
    );
  };

  const getTrackBadge = (track: string) => {
    const colors = {
      'Data Analytics': 'bg-blue-100 text-blue-800',
      'Data Science': 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[track as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {track}
      </span>
    );
  };

  const exportToCSV = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Country', 'City', 'Track', 
      'Payment Status', 'Payment Date', 'Application Date'
    ];
    
    const csvData = applications.map(app => [
      `${app.first_name} ${app.last_name}`,
      app.email,
      app.phone || '',
      app.country,
      app.city,
      app.track,
      app.payment_completed ? 'Paid' : 'Pending',
      app.payment_date ? formatDate(app.payment_date) : '',
      formatDate(app.created_at)
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cohort3-applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading && applications.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-titlebg mx-auto mb-4"></div>
          <p className="text-waterloo dark:text-manatee">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white mt-[8rem] dark:bg-blacksection border-b border-stroke dark:border-strokedark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
                <Users className="h-6 w-6 text-titlebg" />
                Cohort 3 Applications
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <p className="text-waterloo dark:text-manatee">
                  {totalCount} total applications
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">{totalPaidCount} paid</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-orange-600 font-medium">{totalPendingCount} pending</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-4 py-2 bg-titlebg text-white rounded-lg hover:bg-titlebgdark transition-colors"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-alabaster dark:bg-blacksection border-b border-stroke dark:border-strokedark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-waterloo dark:text-manatee hover:text-black dark:hover:text-white transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
            {(searchTerm || selectedTrack || paymentStatus) && (
              <button
                onClick={clearFilters}
                className="text-sm text-titlebg hover:text-titlebgdark transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <form onSubmit={handleSearch} className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-waterloo dark:text-manatee" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-strokedark rounded-lg bg-white dark:bg-blacksection text-black dark:text-white placeholder-waterloo dark:placeholder-manatee focus:ring-2 focus:ring-titlebg focus:border-transparent"
                  />
                </div>
              </form>
              
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="px-3 py-2 border border-stroke dark:border-strokedark rounded-lg bg-white dark:bg-blacksection text-black dark:text-white focus:ring-2 focus:ring-titlebg focus:border-transparent"
              >
                <option value="">All Tracks</option>
                {tracks.map(track => (
                  <option key={track} value={track}>{track}</option>
                ))}
              </select>
              
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="px-3 py-2 border border-stroke dark:border-strokedark rounded-lg bg-white dark:bg-blacksection text-black dark:text-white focus:ring-2 focus:ring-titlebg focus:border-transparent"
              >
                <option value="">All Payment Status</option>
                <option value="true">Paid</option>
                <option value="false">Pending</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-waterloo dark:text-manatee">Total Applications</p>
                <p className="text-2xl font-bold text-black dark:text-white">{totalCount}</p>
                <p className="text-xs text-waterloo dark:text-manatee">
                  {applications.length} on current page
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-waterloo dark:text-manatee">Paid Applications</p>
                <p className="text-2xl font-bold text-green-600">{totalPaidCount}</p>
                <p className="text-xs text-waterloo dark:text-manatee">
                  {totalCount > 0 ? Math.round((totalPaidCount / totalCount) * 100) : 0}% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-waterloo dark:text-manatee">Pending Payments</p>
                <p className="text-2xl font-bold text-orange-600">{totalPendingCount}</p>
                <p className="text-xs text-waterloo dark:text-manatee">
                  {totalCount > 0 ? Math.round((totalPendingCount / totalCount) * 100) : 0}% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      )}

      {/* Applications Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-blacksection rounded-lg border border-stroke dark:border-strokedark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stroke dark:divide-strokedark">
              <thead className="bg-alabaster dark:bg-black">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-waterloo dark:text-manatee uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-waterloo dark:text-manatee uppercase tracking-wider">
                    Track
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-waterloo dark:text-manatee uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-waterloo dark:text-manatee uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-waterloo dark:text-manatee uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-waterloo dark:text-manatee uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-blacksection divide-y divide-stroke dark:divide-strokedark">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-alabaster dark:hover:bg-black transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-black dark:text-white">
                          {application.first_name} {application.last_name}
                        </div>
                        <div className="text-sm text-waterloo dark:text-manatee">
                          {application.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTrackBadge(application.track)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-black dark:text-white">
                        {application.city}, {application.country}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPaymentStatusBadge(application.payment_completed)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-waterloo dark:text-manatee">
                      {formatDate(application.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowModal(true);
                        }}
                        className="text-titlebg hover:text-titlebgdark transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-alabaster dark:bg-black px-4 py-3 flex items-center justify-between border-t border-stroke dark:border-strokedark">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-stroke dark:border-strokedark text-sm font-medium rounded-md text-waterloo dark:text-manatee bg-white dark:bg-blacksection hover:bg-alabaster dark:hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-stroke dark:border-strokedark text-sm font-medium rounded-md text-waterloo dark:text-manatee bg-white dark:bg-blacksection hover:bg-alabaster dark:hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-waterloo dark:text-manatee">
                    Showing page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span> ({totalCount} total applications)
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-stroke dark:border-strokedark bg-white dark:bg-blacksection text-sm font-medium text-waterloo dark:text-manatee hover:bg-alabaster dark:hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-stroke dark:border-strokedark bg-white dark:bg-blacksection text-sm font-medium text-waterloo dark:text-manatee hover:bg-alabaster dark:hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Application Detail Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-blacksection rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-black dark:text-white">
                  Application Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-waterloo dark:text-manatee hover:text-black dark:hover:text-white transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-waterloo dark:text-manatee mb-1">
                        Full Name
                      </label>
                      <p className="text-black dark:text-white">
                        {selectedApplication.first_name} {selectedApplication.last_name}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-waterloo dark:text-manatee mb-1">
                        Email
                      </label>
                      <p className="text-black dark:text-white flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {selectedApplication.email}
                      </p>
                    </div>
                    {selectedApplication.phone && (
                      <div>
                        <label className="block text-sm font-medium text-waterloo dark:text-manatee mb-1">
                          Phone
                        </label>
                        <p className="text-black dark:text-white flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {selectedApplication.phone}
                        </p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-waterloo dark:text-manatee mb-1">
                        Location
                      </label>
                      <p className="text-black dark:text-white flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {selectedApplication.city}, {selectedApplication.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                    Application Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-waterloo dark:text-manatee mb-1">
                        Track
                      </label>
                      {getTrackBadge(selectedApplication.track)}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-waterloo dark:text-manatee mb-1">
                        Experience
                      </label>
                      <p className="text-black dark:text-white bg-alabaster dark:bg-black p-3 rounded-lg">
                        {selectedApplication.experience}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-waterloo dark:text-manatee mb-1">
                        Motivation
                      </label>
                      <p className="text-black dark:text-white bg-alabaster dark:bg-black p-3 rounded-lg">
                        {selectedApplication.motivation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Links */}
                {(selectedApplication.portfolio_url || selectedApplication.linkedin_url || selectedApplication.github_url) && (
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                      Links
                    </h3>
                    <div className="space-y-2">
                      {selectedApplication.portfolio_url && (
                        <a
                          href={selectedApplication.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-titlebg hover:text-titlebgdark transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Portfolio
                        </a>
                      )}
                      {selectedApplication.linkedin_url && (
                        <a
                          href={selectedApplication.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-titlebg hover:text-titlebgdark transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          LinkedIn
                        </a>
                      )}
                      {selectedApplication.github_url && (
                        <a
                          href={selectedApplication.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-titlebg hover:text-titlebgdark transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Payment Information */}
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                    Payment Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-waterloo dark:text-manatee">Status:</span>
                      {getPaymentStatusBadge(selectedApplication.payment_completed)}
                    </div>
                    {selectedApplication.payment_date && (
                      <div className="flex items-center justify-between">
                        <span className="text-waterloo dark:text-manatee">Payment Date:</span>
                        <span className="text-black dark:text-white flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(selectedApplication.payment_date)}
                        </span>
                      </div>
                    )}
                    {selectedApplication.payment_method && (
                      <div className="flex items-center justify-between">
                        <span className="text-waterloo dark:text-manatee">Payment Method:</span>
                        <span className="text-black dark:text-white capitalize">
                          {selectedApplication.payment_method}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Application Date */}
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                    Application Timeline
                  </h3>
                  <div className="flex items-center gap-2 text-waterloo dark:text-manatee">
                    <Clock className="h-4 w-4" />
                    Applied on {formatDate(selectedApplication.created_at)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cohort3EntriesPage;
