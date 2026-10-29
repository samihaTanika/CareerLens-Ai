import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

// Public pages
import LandingPage from './pages/LandingPage';
import AnalyzePage from './pages/AnalyzePage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Student pages
import JobSearchPage from './pages/student/JobSearchPage';
import RemoteJobsPage from './pages/student/RemoteJobsPage';
import ScholarshipsPage from './pages/student/ScholarshipsPage';
import ProfilePage from './pages/student/ProfilePage';

// Company pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import PostJobPage from './pages/company/PostJobPage';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-[var(--color-bg-primary)]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Student Routes */}
            <Route path="/jobs" element={<JobSearchPage />} />
            <Route path="/jobs/remote" element={<RemoteJobsPage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Company Routes */}
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/company/jobs/new" element={<PostJobPage />} />

            {/* Catch-all */}
            <Route path="*" element={
              <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">404</div>
                  <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Page Not Found</h1>
                  <p className="text-sm text-[var(--color-text-muted)]">The page you&apos;re looking for doesn&apos;t exist.</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </AuthProvider>
  );
}

export default App;
