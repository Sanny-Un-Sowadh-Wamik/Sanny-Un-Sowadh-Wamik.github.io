import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUsers } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const emptyActivity = {
  title: '',
  role: '',
  period: '',
  description: '',
};

export default function ActivitiesManager() {
  const { data, addActivity, updateActivity, deleteActivity } = useData();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(emptyActivity);

  const handleEdit = (activity) => {
    setEditingId(activity.id);
    setFormData({ ...activity });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData(emptyActivity);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyActivity);
  };

  const handleSave = () => {
    if (!formData.title || !formData.role) {
      toast.error('Title and role are required');
      return;
    }

    if (isAdding) {
      addActivity(formData);
      toast.success('Activity added successfully!');
    } else {
      updateActivity(editingId, formData);
      toast.success('Activity updated successfully!');
    }
    handleCancel();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      deleteActivity(id);
      toast.success('Activity deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Activities & Leadership</h1>
          <p className="text-dark-400">Manage your extracurricular activities</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus /> Add Activity
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
              {isAdding ? 'Add Activity' : 'Edit Activity'}
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-dark-300 text-sm mb-2">Organization/Activity *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., RMIT CSIT Society"
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">Role *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., Member, Organizer"
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">Period</label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., August 2024 - Present"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-dark-300 text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Describe your role and contributions"
                />
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

      {/* Activities List */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="admin-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaUsers className="text-xl text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-100">{activity.title}</h3>
                  <span className="inline-block px-2 py-0.5 bg-primary-500/20 text-primary-400 rounded text-xs mt-1">
                    {activity.role}
                  </span>
                  <p className="text-dark-500 text-sm mt-1">{activity.period}</p>
                  <p className="text-dark-400 text-sm mt-2">{activity.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(activity)}
                  className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(activity.id)}
                  className="p-2 text-dark-400 hover:text-red-400 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {data.activities.length === 0 && (
        <div className="text-center py-12 text-dark-500">
          No activities added yet
        </div>
      )}
    </div>
  );
}
