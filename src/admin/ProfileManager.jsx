import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaUndo } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

export default function ProfileManager() {
  const { data, updateProfile } = useData();
  const [formData, setFormData] = useState({ ...data.profile });
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setHasChanges(true);
  };

  const handleSave = () => {
    updateProfile(formData);
    setHasChanges(false);
    toast.success('Profile updated successfully!');
  };

  const handleReset = () => {
    setFormData({ ...data.profile });
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Profile Settings</h1>
          <p className="text-dark-400">Manage your personal information</p>
        </div>
        {hasChanges && (
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="btn-outline flex items-center gap-2"
            >
              <FaUndo /> Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="btn-primary flex items-center gap-2"
            >
              <FaSave /> Save Changes
            </motion.button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-card space-y-5"
        >
          <h3 className="text-lg font-semibold text-dark-100 border-b border-dark-700 pb-3">
            Basic Information
          </h3>

          <div>
            <label className="block text-dark-300 text-sm mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-dark-300 text-sm mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-dark-300 text-sm mb-2">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-dark-300 text-sm mb-2">Short Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="input-field resize-none"
            />
          </div>

          <div>
            <label className="block text-dark-300 text-sm mb-2">Superpower</label>
            <input
              type="text"
              name="superpower"
              value={formData.superpower}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </motion.div>

        {/* Contact & Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="admin-card space-y-5"
        >
          <h3 className="text-lg font-semibold text-dark-100 border-b border-dark-700 pb-3">
            Contact & Social
          </h3>

          <div>
            <label className="block text-dark-300 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-dark-300 text-sm mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-dark-300 text-sm mb-2">GitHub URL</label>
            <input
              type="url"
              name="social.github"
              value={formData.social?.github || ''}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-dark-300 text-sm mb-2">LinkedIn URL</label>
            <input
              type="url"
              name="social.linkedin"
              value={formData.social?.linkedin || ''}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-dark-300 text-sm mb-2">Resume Link</label>
            <input
              type="text"
              name="resumeLink"
              value={formData.resumeLink}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="admin-card lg:col-span-2"
        >
          <h3 className="text-lg font-semibold text-dark-100 border-b border-dark-700 pb-3 mb-5">
            About Me (Full)
          </h3>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={8}
            className="input-field resize-none"
            placeholder="Write your full about me section..."
          />
          <p className="text-dark-500 text-sm mt-2">
            Tip: Use double line breaks to create paragraphs
          </p>
        </motion.div>
      </div>
    </div>
  );
}
