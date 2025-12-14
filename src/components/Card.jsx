import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  gradient,
  hoverable = true,
  delay = 0,
  onClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={hoverable ? { y: -5, scale: 1.02 } : {}}
      onClick={onClick}
      className={`card ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {gradient && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 rounded-xl`}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`card-glass p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function StatCard({ icon: Icon, label, value, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className="stat-card"
    >
      <div className={`stat-icon bg-${color}-500/20`}>
        <Icon className={`text-${color}-400`} />
      </div>
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-dark-100"
        >
          {value}
        </motion.p>
        <p className="text-dark-400 text-sm">{label}</p>
      </div>
    </motion.div>
  );
}
