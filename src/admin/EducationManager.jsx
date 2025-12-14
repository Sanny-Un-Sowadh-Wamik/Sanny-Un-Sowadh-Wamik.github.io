import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaGraduationCap } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const emptyEducation = {
  degree: '',
  institution: '',
  period: '',
  description: '',
  coursework: [],
  current: false,
};

export default function EducationManager() {
  const { data, addEducation, updateEducation, deleteEducation } = useData();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(emptyEducation);
  const [courseInput, setCourseInput] = useState('');

  const handleEdit = (edu) => {
    setEditingId(edu.id);
    setFormData({ ...edu });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData(emptyEducation);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyEducation);
    setCourseInput('');
  };

  const handleSave = () => {
    if (!formData.degree || !formData.institution) {
      toast.error('Degree and institution are required');
      return;
    }

    if (isAdding) {
      addEducation(formData);
      toast.success('Education added successfully!');
    } else {
      updateEducation(editingId, formData);
      toast.success('Education updated successfully!');
    }
    handleCancel();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      deleteEducation(id);
      toast.success('Education deleted successfully!');
    }
  };

  const addCourse = () => {
    if (courseInput.trim() && !formData.coursework.includes(courseInput.trim())) {
      setFormData(prev => ({
        ...prev,
        coursework: [...prev.coursework, courseInput.trim()]
      }));
      setCourseInput('');
    }
  };

  const removeCourse = (course) => {
    setFormData(prev => ({
      ...prev,
      coursework: prev.coursework.filter(c => c !== course)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Education</h1>
          <p className="text-dark-400">Manage your education history</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus /> Add Education
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
              {isAdding ? 'Add Education' : 'Edit Education'}
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-dark-300 text-sm mb-2">Degree *</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., Bachelor of Data Science"
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">Institution *</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., RMIT University"
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">Period</label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., Expected June 2027"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.current}
                    onChange={(e) => setFormData(prev => ({ ...prev, current: e.target.checked }))}
                    className="w-4 h-4 rounded border-dark-600"
                  />
                  <span className="text-dark-300">Currently studying</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-dark-300 text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field resize-none"
                  rows={2}
                  placeholder="Brief description"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-dark-300 text-sm mb-2">Coursework</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={courseInput}
                    onChange={(e) => setCourseInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCourse())}
                    className="input-field flex-1"
                    placeholder="Add course"
                  />
                  <button onClick={addCourse} className="btn-outline px-4">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.coursework?.map((course, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-dark-700 rounded-full text-sm text-dark-300
                                 flex items-center gap-2"
                    >
                      {course}
                      <button onClick={() => removeCourse(course)} className="text-red-400 hover:text-red-300">
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}
                </div>
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

      {/* Education List */}
      <div className="space-y-4">
        {data.education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="admin-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaGraduationCap className="text-xl text-primary-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-dark-100">{edu.degree}</h3>
                    {edu.current && (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-primary-400">{edu.institution}</p>
                  <p className="text-dark-500 text-sm">{edu.period}</p>
                  {edu.coursework?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {edu.coursework.map((course, i) => (
                        <span key={i} className="px-2 py-0.5 bg-dark-700/50 rounded text-xs text-dark-400">
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(edu)}
                  className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="p-2 text-dark-400 hover:text-red-400 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
