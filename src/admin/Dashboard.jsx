import { motion } from 'framer-motion';
import { FaProjectDiagram, FaCode, FaGraduationCap, FaUsers, FaEye, FaArrowUp } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useData } from '../context/DataContext';

const visitData = [
  { name: 'Mon', visits: 120 },
  { name: 'Tue', visits: 180 },
  { name: 'Wed', visits: 150 },
  { name: 'Thu', visits: 220 },
  { name: 'Fri', visits: 280 },
  { name: 'Sat', visits: 190 },
  { name: 'Sun', visits: 160 },
];

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

export default function Dashboard() {
  const { data } = useData();
  const { projects, skills, education, activities, stats } = data;

  const statsCards = [
    { label: 'Projects', value: projects.length, icon: FaProjectDiagram, color: 'primary', change: '+2' },
    { label: 'Skills', value: skills.length, icon: FaCode, color: 'blue', change: '+5' },
    { label: 'Education', value: education.length, icon: FaGraduationCap, color: 'green', change: '0' },
    { label: 'Activities', value: activities.length, icon: FaUsers, color: 'orange', change: '+1' },
  ];

  const skillCategories = skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(skillCategories).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100">Dashboard Overview</h1>
          <p className="text-dark-400">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm">Site is live</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="admin-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center`}>
                  <Icon className={`text-xl text-${stat.color}-400`} />
                </div>
                {stat.change !== '0' && (
                  <span className="flex items-center gap-1 text-green-400 text-sm">
                    <FaArrowUp className="text-xs" />
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-dark-100">{stat.value}</p>
              <p className="text-dark-400 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Visitor Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="admin-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-dark-100">Weekly Visitors</h3>
            <div className="flex items-center gap-2 text-dark-400 text-sm">
              <FaEye />
              <span>1,300 total</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skills Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="admin-card"
        >
          <h3 className="text-lg font-semibold text-dark-100 mb-6">Skills by Category</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-dark-400 text-sm">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="admin-card"
      >
        <h3 className="text-lg font-semibold text-dark-100 mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Project', path: '/admin/projects', icon: FaProjectDiagram },
            { label: 'Add Skill', path: '/admin/skills', icon: FaCode },
            { label: 'Edit Profile', path: '/admin/profile', icon: FaUsers },
            { label: 'View Site', path: '/', icon: FaEye },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <a
                key={index}
                href={action.path}
                className="flex items-center gap-3 p-4 bg-dark-700/30 rounded-lg
                           hover:bg-primary-500/10 hover:border-primary-500/30 border
                           border-transparent transition-all group"
              >
                <Icon className="text-dark-400 group-hover:text-primary-400 transition-colors" />
                <span className="text-dark-300 group-hover:text-dark-100 transition-colors">
                  {action.label}
                </span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
