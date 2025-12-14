import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function SectionWrapper({
  title,
  children,
  className = '',
  id,
  showTitle = true
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className={`py-20 ${className}`}
    >
      <div className="container mx-auto px-6">
        {showTitle && title && (
          <motion.h2 variants={itemVariants} className="section-title">
            {title}
          </motion.h2>
        )}
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}

export { containerVariants, itemVariants };
