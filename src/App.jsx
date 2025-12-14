import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';

// Layout
import { Layout } from './components';

// Pages
import { Home, About, Projects, Skills, Education, Contact } from './pages';

// Admin
import {
  AdminLayout,
  Login,
  Dashboard,
  ProfileManager,
  ProjectsManager,
  SkillsManager,
  EducationManager,
  ActivitiesManager,
  Settings,
} from './admin';

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #334155',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#f8fafc',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#f8fafc',
                },
              },
            }}
          />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="skills" element={<Skills />} />
              <Route path="education" element={<Education />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<ProfileManager />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="skills" element={<SkillsManager />} />
              <Route path="education" element={<EducationManager />} />
              <Route path="activities" element={<ActivitiesManager />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
