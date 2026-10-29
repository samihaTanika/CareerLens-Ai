import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

// Mock user database (simulates MongoDB users)
const MOCK_USERS = {
  'student@test.com': {
    id: 'user-student-001',
    email: 'student@test.com',
    password: 'test123',
    role: 'student',
    profile: {
      full_name: 'Tanvir Hasan',
      headline: 'CSE Student at BUET',
      phone: '+880 1712345678',
      location: 'Dhaka, Bangladesh',
      nationality: 'Bangladeshi',
      linkedin_url: 'https://linkedin.com/in/tanvirhasan',
      education: [
        { degree: 'BSc in CSE', institution: 'BUET', gpa: 3.72, year: 2026 },
      ],
      skills: ['Python', 'React', 'Machine Learning', 'SQL', 'JavaScript', 'Node.js', 'TensorFlow'],
      experience: [
        { title: 'Software Engineering Intern', company: 'Brain Station 23', duration: '6 months' },
      ],
      ielts_score: 7.5,
      gre_score: null,
      preferred_degree: 'Masters',
      preferred_countries: ['USA', 'UK', 'Germany', 'Canada'],
      scholarship_search_enabled: false,
      remote_job_search_enabled: false,
      resume_file_url: null,
      profile_completeness: 75,
    },
  },
  'company@test.com': {
    id: 'user-company-001',
    email: 'company@test.com',
    password: 'test123',
    role: 'company',
    profile: {
      company_name: 'Brain Station 23',
      logo_url: null,
      industry: 'Information Technology',
      company_size: 'enterprise',
      location: 'Dhaka, Bangladesh',
      website: 'https://brainstation-23.com',
      linkedin_page: 'https://linkedin.com/company/brain-station-23',
      description: 'Leading software development company in Bangladesh with 900+ engineers.',
      founded_year: 2006,
      contact_email: 'hr@brainstation-23.com',
      verified: true,
    },
  },
};

const AUTH_STORAGE_KEY = 'careerlens_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading] = useState(false);

  // Persist to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback(async (email, password) => {
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800));

    const mockUser = MOCK_USERS[email];
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userData } = mockUser;
    setUser(userData);
    return userData;
  }, []);

  const register = useCallback(async ({ email, password, role, name, companyName }) => {
    await new Promise((r) => setTimeout(r, 800));

    if (MOCK_USERS[email]) {
      throw new Error('An account with this email already exists');
    }

    const newUser = {
      id: `user-${role}-${Date.now()}`,
      email,
      role,
      profile:
        role === 'student'
          ? {
              full_name: name || 'New Student',
              headline: '',
              phone: '',
              location: 'Dhaka, Bangladesh',
              nationality: 'Bangladeshi',
              linkedin_url: '',
              education: [],
              skills: [],
              experience: [],
              ielts_score: null,
              gre_score: null,
              preferred_degree: 'Masters',
              preferred_countries: [],
              scholarship_search_enabled: false,
              remote_job_search_enabled: false,
              resume_file_url: null,
              profile_completeness: 15,
            }
          : {
              company_name: companyName || 'New Company',
              logo_url: null,
              industry: '',
              company_size: 'startup',
              location: '',
              website: '',
              linkedin_page: '',
              description: '',
              founded_year: new Date().getFullYear(),
              contact_email: email,
              verified: false,
            },
    };

    // Add to "database"
    MOCK_USERS[email] = { ...newUser, password };
    setUser(newUser);
    return newUser;
  }, []);

  const loginWithLinkedIn = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1200));
    // Mock LinkedIn OAuth — returns a student account
    const linkedinUser = {
      id: 'user-linkedin-001',
      email: 'linkedin-user@gmail.com',
      role: 'student',
      linkedin_id: 'li-mock-12345',
      profile: {
        full_name: 'Rafiq Ahmed',
        headline: 'Full Stack Developer | MERN Stack',
        phone: '+880 1812345678',
        location: 'Dhaka, Bangladesh',
        nationality: 'Bangladeshi',
        linkedin_url: 'https://linkedin.com/in/rafiqahmed',
        education: [
          { degree: 'BSc in CSE', institution: 'University of Dhaka', gpa: 3.60, year: 2024 },
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js', 'Python', 'Docker'],
        experience: [
          { title: 'Junior Developer', company: 'TigerIT Bangladesh', duration: '1 year' },
        ],
        ielts_score: 7.0,
        gre_score: null,
        preferred_degree: 'Masters',
        preferred_countries: ['USA', 'Canada', 'Germany'],
        scholarship_search_enabled: false,
        remote_job_search_enabled: false,
        resume_file_url: null,
        profile_completeness: 85,
      },
    };
    setUser(linkedinUser);
    return linkedinUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        profile: { ...prev.profile, ...updates },
      };
    });
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isCompany: user?.role === 'company',
    login,
    register,
    loginWithLinkedIn,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export default AuthContext;
