import { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChartLine, FaUser, FaProjectDiagram, FaCode, FaGraduationCap,
  FaUsers, FaCog, FaSignOutAlt, FaBars, FaTimes, FaHome, FaChartBar
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const sidebarLinks = [
  { path: '/admin', label: 'Dashboard', icon: FaChartBar, exact: true },
  { path: '/admin/profile', label: 'Profile', icon: FaUser },
  { path: '/admin/projects', label: 'Projects', icon: FaProjectDiagram },
  { path: '/admin/skills', label: 'Skills', icon: FaCode },
  { path: '/admin/education', label: 'Education', icon: FaGraduationCap },
  { path: '/admin/activities', label: 'Activities', icon: FaUsers },
  { path: '/admin/settings', label: 'Settings', icon: FaCog },
];

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const isActiveLink = (path, exact) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <motion.aside
          initial={{ x: -256 }}
          animate={{ x: isSidebarOpen ? 0 : -256 }}
          className="admin-sidebar"
        >
          {/* Logo */}
          <div className="p-6 border-b border-dark-700">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-primary-400" />
              </div>
              <div>
                <span className="text-lg font-bold text-gradient">Admin</span>
                <p className="text-dark-500 text-xs">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isActiveLink(link.path, link.exact);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700">
            <Link
              to="/"
              className="admin-sidebar-link mb-2"
            >
              <FaHome />
              <span>View Site</span>
            </Link>
            <button
              onClick={logout}
              className="admin-sidebar-link w-full text-red-400 hover:text-red-300
                         hover:bg-red-500/10"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-dark-900/80 backdrop-blur-lg border-b border-dark-700">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-dark-800 border border-dark-700
                         hover:border-primary-500/50 transition-colors"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className="flex items-center gap-4">
              <span className="text-dark-400 text-sm">Welcome, Admin</span>
              <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center">
                <FaUser className="text-primary-400 text-sm" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
