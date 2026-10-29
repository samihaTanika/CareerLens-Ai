import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { getAnalysisHistory, getAnalysisById } from '../services/analysisService';
import { formatDate, getScoreColor } from '../utils/helpers';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewLoading, setViewLoading] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchHistory() {
      try {
        const data = await getAnalysisHistory();
        if (!cancelled) setHistory(data);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchHistory();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleView = async (id) => {
    setViewLoading(id);
    try {
      const analysis = await getAnalysisById(id);
      if (analysis) {
        navigate('/dashboard', { state: { analysis } });
      }
    } catch (err) {
      console.error('Failed to load analysis:', err);
    } finally {
      setViewLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-[var(--color-bg-primary)]">
        <div className="page-container">
          <LoadingSpinner message="Loading analysis history..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[var(--color-bg-primary)]">
      <div className="page-container max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              CV Analysis History
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {history.length} {history.length === 1 ? 'record' : 'records'} analyzed for the Bangladesh job market
            </p>
          </div>
          <Button variant="primary" size="sm" to="/analyze" id="history-new-analysis">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Upload New CV
          </Button>
        </div>

        {history.length === 0 ? (
          <EmptyState
            title="No Analyses Yet"
            description="You haven't analyzed any CVs yet. Upload a CV to discover your top 5 matching careers in Bangladesh."
            actionLabel="Upload CV"
            actionTo="/analyze"
          />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block animate-fade-in-up">
              <Card className="overflow-hidden !p-0 border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse" id="history-table">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80">
                      <th className="text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">Date</th>
                      <th className="text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">Candidate / File</th>
                      <th className="text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">Top Matched BD Category</th>
                      <th className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">CV Score</th>
                      <th className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">Top Match</th>
                      <th className="text-right text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {history.map((record) => (
                      <tr
                        key={record.id}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                          {formatDate(record.date)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900">
                                {record.candidateName || 'Candidate'}
                              </div>
                              <div className="text-xs text-slate-500 truncate max-w-[200px]">
                                {record.resumeName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-slate-900">
                            {record.topCategory}
                          </span>
                          <span className="block text-xs text-emerald-700 font-semibold mt-0.5">
                            Rank #1 in Bangladesh
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`text-sm ${getScoreColor(record.overallScore || 80)}`}>
                            {record.overallScore || 80}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`text-sm ${getScoreColor(record.topMatchScore || 85)}`}>
                            {record.topMatchScore || 85}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleView(record.id)}
                            disabled={viewLoading === record.id}
                          >
                            {viewLoading === record.id ? 'Loading...' : 'View Details →'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3.5 animate-fade-in-up">
              {history.map((record) => (
                <Card key={record.id} className="p-5 border border-slate-200 bg-white shadow-xs">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="text-base font-bold text-slate-900">
                        {record.candidateName}
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">
                        {record.resumeName}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {formatDate(record.date)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 my-3 text-xs">
                    <span className="text-slate-500 font-medium">Top Match: </span>
                    <span className="font-bold text-slate-900">{record.topCategory}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                    <div className="font-medium text-slate-600">
                      Score: <span className="font-bold text-indigo-700">{record.overallScore}</span> • Match: <span className="font-bold text-emerald-700">{record.topMatchScore}%</span>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleView(record.id)}
                      disabled={viewLoading === record.id}
                    >
                      View →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
