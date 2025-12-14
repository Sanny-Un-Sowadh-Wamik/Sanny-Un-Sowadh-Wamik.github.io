import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaCode } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const categories = ['Language', 'Library', 'Tool', 'Domain'];
const iconOptions = [
  'FaPython', 'FaGitAlt', 'FaBrain', 'FaChartBar', 'FaShieldAlt', 'FaCode',
  'SiR', 'SiPandas', 'SiNumpy', 'SiPlotly', 'SiMysql', 'SiJupyter',
  'SiRstudio', 'SiPycharm', 'SiVisualstudiocode'
];

const emptySkill = { name: '', category: 'Language', icon: 'FaCode' };

export default function SkillsManager() {
  const { data, addSkill, updateSkill, deleteSkill } = useData();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(emptySkill);
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredSkills = filterCategory === 'All'
    ? data.skills
    : data.skills.filter(s => s.category === filterCategory);

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setFormData({ ...skill });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData(emptySkill);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptySkill);
  };

  const handleSave = () => {
    if (!formData.name) {
      toast.error('Skill name is required');
      return;
    }

    if (isAdding) {
      addSkill(formData);
      toast.success('Skill added successfully!');
    } else {
      updateSkill(editingId, formData);
      toast.success('Skill updated successfully!');
    }
    handleCancel();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      deleteSkill(id);
      toast.success('Skill deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Skills</h1>
          <p className="text-dark-400">Manage your skills and technologies</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus /> Add Skill
        </motion.button>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filterCategory === cat
                ? 'bg-primary-500 text-white'
                : 'bg-dark-800 text-dark-400 hover:text-dark-200'
            }`}
          >
            {cat}
          </button>
        ))}
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
              {isAdding ? 'Add New Skill' : 'Edit Skill'}
            </h3>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-dark-300 text-sm mb-2">Skill Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., Python"
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="input-field"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="input-field"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
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

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            className="admin-card text-center py-4 group relative"
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-primary-500/20 rounded-xl
                            flex items-center justify-center">
              <FaCode className="text-xl text-primary-400" />
            </div>
            <h4 className="text-dark-100 font-medium text-sm">{skill.name}</h4>
            <span className="text-dark-500 text-xs">{skill.category}</span>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(skill)}
                className="p-1.5 bg-dark-700 rounded text-dark-400 hover:text-primary-400"
              >
                <FaEdit size={12} />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="p-1.5 bg-dark-700 rounded text-dark-400 hover:text-red-400"
              >
                <FaTrash size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 text-dark-500">
          No skills found in this category
        </div>
      )}
    </div>
  );
}
