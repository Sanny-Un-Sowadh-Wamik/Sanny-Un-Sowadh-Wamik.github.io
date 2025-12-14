import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaGithub } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const gradientOptions = [
  { value: 'from-purple-500 to-pink-500', label: 'Purple to Pink' },
  { value: 'from-blue-500 to-cyan-500', label: 'Blue to Cyan' },
  { value: 'from-green-500 to-emerald-500', label: 'Green to Emerald' },
  { value: 'from-orange-500 to-red-500', label: 'Orange to Red' },
  { value: 'from-violet-500 to-purple-500', label: 'Violet to Purple' },
  { value: 'from-pink-500 to-rose-500', label: 'Pink to Rose' },
];

const emptyProject = {
  title: '',
  description: '',
  role: '',
  technologies: [],
  github: '',
  demo: '',
  gradient: 'from-purple-500 to-pink-500',
  featured: true,
  kaggle: false,
  wide: false,
};

export default function ProjectsManager() {
  const { data, addProject, updateProject, deleteProject } = useData();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(emptyProject);
  const [techInput, setTechInput] = useState('');

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({ ...project });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData(emptyProject);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyProject);
    setTechInput('');
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }

    if (isAdding) {
      addProject(formData);
      toast.success('Project added successfully!');
    } else {
      updateProject(editingId, formData);
      toast.success('Project updated successfully!');
    }
    handleCancel();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      toast.success('Project deleted successfully!');
    }
  };

  const addTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTech = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Projects</h1>
          <p className="text-dark-400">Manage your portfolio projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus /> Add Project
        </motion.button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="admin-card"
          >
            <h3 className="text-lg font-semibold text-dark-100 mb-4">
              {isAdding ? 'Add New Project' : 'Edit Project'}
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-dark-300 text-sm mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="input-field"
                  placeholder="Project title"
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., Team Lead, Solo Project"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-dark-300 text-sm mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Project description"
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                  className="input-field"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">Demo URL</label>
                <input
                  type="url"
                  value={formData.demo}
                  onChange={(e) => setFormData(prev => ({ ...prev, demo: e.target.value }))}
                  className="input-field"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">Technologies</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    className="input-field flex-1"
                    placeholder="Add technology"
                  />
                  <button onClick={addTech} className="btn-outline px-4">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-dark-700 rounded-full text-sm text-dark-300
                                 flex items-center gap-2"
                    >
                      {tech}
                      <button onClick={() => removeTech(tech)} className="text-red-400 hover:text-red-300">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">Gradient</label>
                <select
                  value={formData.gradient}
                  onChange={(e) => setFormData(prev => ({ ...prev, gradient: e.target.value }))}
                  className="input-field"
                >
                  {gradientOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded border-dark-600"
                  />
                  <span className="text-dark-300">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.kaggle}
                    onChange={(e) => setFormData(prev => ({ ...prev, kaggle: e.target.checked }))}
                    className="w-4 h-4 rounded border-dark-600"
                  />
                  <span className="text-dark-300">Kaggle Project</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.wide}
                    onChange={(e) => setFormData(prev => ({ ...prev, wide: e.target.checked }))}
                    className="w-4 h-4 rounded border-dark-600"
                  />
                  <span className="text-dark-300">Wide Card</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-dark-700">
              <button onClick={handleCancel} className="btn-outline flex items-center gap-2">
                <FaTimes /> Cancel
              </button>
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <FaSave /> Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List */}
      <div className="space-y-4">
        {data.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="admin-card flex items-start justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.gradient}`} />
                <h3 className="text-lg font-semibold text-dark-100">{project.title}</h3>
                {project.kaggle && (
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">Kaggle</span>
                )}
              </div>
              <p className="text-dark-400 text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-dark-700/50 rounded text-xs text-dark-400">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
                >
                  <FaGithub />
                </a>
              )}
              <button
                onClick={() => handleEdit(project)}
                className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="p-2 text-dark-400 hover:text-red-400 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
