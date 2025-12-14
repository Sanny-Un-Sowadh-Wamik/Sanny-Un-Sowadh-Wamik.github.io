import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaUpload, FaTrash, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Settings() {
  const { data, updateStats, resetData, exportData, importData } = useData();
  const { logout } = useAuth();
  const [stats, setStats] = useState({ ...data.stats });
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRef = useRef(null);

  const handleStatsChange = (key, value) => {
    setStats(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
    setHasChanges(true);
  };

  const handleSaveStats = () => {
    updateStats(stats);
    setHasChanges(false);
    toast.success('Stats updated successfully!');
  };

  const handleExport = () => {
    exportData();
    toast.success('Data exported successfully!');
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = importData(event.target?.result);
      if (result) {
        toast.success('Data imported successfully!');
        setStats({ ...data.stats });
      } else {
        toast.error('Failed to import data. Invalid format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset ALL data? This cannot be undone!')) {
      if (window.confirm('This will delete all your projects, skills, and other content. Are you absolutely sure?')) {
        resetData();
        setStats({ ...data.stats });
        toast.success('All data has been reset to defaults.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-100">Settings</h1>
        <p className="text-dark-400">Manage your portfolio settings and data</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-card"
        >
          <h3 className="text-lg font-semibold text-dark-100 border-b border-dark-700 pb-3 mb-5">
            Homepage Stats
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-dark-300 text-sm mb-2">Projects Completed</label>
              <input
                type="number"
                value={stats.projectsCompleted}
                onChange={(e) => handleStatsChange('projectsCompleted', e.target.value)}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="block text-dark-300 text-sm mb-2">Skills Learned</label>
              <input
                type="number"
                value={stats.skillsLearned}
                onChange={(e) => handleStatsChange('skillsLearned', e.target.value)}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="block text-dark-300 text-sm mb-2">GitHub Repos</label>
              <input
                type="number"
                value={stats.githubRepos}
                onChange={(e) => handleStatsChange('githubRepos', e.target.value)}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="block text-dark-300 text-sm mb-2">Years Learning</label>
              <input
                type="number"
                value={stats.yearsLearning}
                onChange={(e) => handleStatsChange('yearsLearning', e.target.value)}
                className="input-field"
                min="0"
              />
            </div>
          </div>

          {hasChanges && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveStats}
              className="btn-primary flex items-center gap-2 mt-4"
            >
              <FaCheck /> Save Changes
            </motion.button>
          )}
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="admin-card"
        >
          <h3 className="text-lg font-semibold text-dark-100 border-b border-dark-700 pb-3 mb-5">
            Data Management
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-dark-400 text-sm mb-3">
                Export your portfolio data as a JSON file for backup or migration.
              </p>
              <button
                onClick={handleExport}
                className="btn-outline flex items-center gap-2"
              >
                <FaDownload /> Export Data
              </button>
            </div>

            <div>
              <p className="text-dark-400 text-sm mb-3">
                Import portfolio data from a previously exported JSON file.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-outline flex items-center gap-2"
              >
                <FaUpload /> Import Data
              </button>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="admin-card border-red-500/30 lg:col-span-2"
        >
          <div className="flex items-center gap-2 text-red-400 border-b border-dark-700 pb-3 mb-5">
            <FaExclamationTriangle />
            <h3 className="text-lg font-semibold">Danger Zone</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-dark-100 font-medium mb-2">Reset All Data</h4>
              <p className="text-dark-400 text-sm mb-3">
                This will reset all your portfolio data to the default values. This action cannot be undone.
              </p>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg
                           text-red-400 hover:bg-red-500/20 transition-colors
                           flex items-center gap-2"
              >
                <FaTrash /> Reset All Data
              </button>
            </div>

            <div>
              <h4 className="text-dark-100 font-medium mb-2">Logout</h4>
              <p className="text-dark-400 text-sm mb-3">
                Sign out of the admin dashboard. You'll need to log in again to make changes.
              </p>
              <button
                onClick={logout}
                className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg
                           text-dark-300 hover:text-dark-100 transition-colors
                           flex items-center gap-2"
              >
                Logout
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-primary-500/10 border border-primary-500/30 rounded-lg"
      >
        <p className="text-primary-300 text-sm">
          <strong>Note:</strong> All data is stored in your browser's local storage.
          Changes are saved automatically and persist across sessions.
          Export your data regularly for backup.
        </p>
      </motion.div>
    </div>
  );
}
