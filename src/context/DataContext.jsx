import { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const DataContext = createContext();

const STORAGE_KEY = 'portfolio_data';

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialData;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Profile operations
  const updateProfile = (updates) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates }
    }));
  };

  // Skills operations
  const addSkill = (skill) => {
    const newSkill = { ...skill, id: Date.now() };
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id, updates) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const deleteSkill = (id) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Projects operations
  const addProject = (project) => {
    const newProject = { ...project, id: Date.now() };
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id, updates) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const deleteProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Education operations
  const addEducation = (education) => {
    const newEducation = { ...education, id: Date.now() };
    setData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id, updates) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, ...updates } : e)
    }));
  };

  const deleteEducation = (id) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  // Activities operations
  const addActivity = (activity) => {
    const newActivity = { ...activity, id: Date.now() };
    setData(prev => ({
      ...prev,
      activities: [...prev.activities, newActivity]
    }));
  };

  const updateActivity = (id, updates) => {
    setData(prev => ({
      ...prev,
      activities: prev.activities.map(a => a.id === id ? { ...a, ...updates } : a)
    }));
  };

  const deleteActivity = (id) => {
    setData(prev => ({
      ...prev,
      activities: prev.activities.filter(a => a.id !== id)
    }));
  };

  // Stats operations
  const updateStats = (updates) => {
    setData(prev => ({
      ...prev,
      stats: { ...prev.stats, ...updates }
    }));
  };

  // Reset to initial data
  const resetData = () => {
    setData(initialData);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Export data
  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio_data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import data
  const importData = (jsonData) => {
    try {
      const parsed = JSON.parse(jsonData);
      setData(parsed);
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    data,
    isDarkMode,
    toggleTheme,
    updateProfile,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addEducation,
    updateEducation,
    deleteEducation,
    addActivity,
    updateActivity,
    deleteActivity,
    updateStats,
    resetData,
    exportData,
    importData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default DataContext;
