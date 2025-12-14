import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

export default function CodeBlock({ filename, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="code-block"
    >
      <div className="code-header">
        <FaCode className="text-primary-400" />
        <span>{filename}</span>
      </div>
      <div className="code-content">
        {children}
      </div>
    </motion.div>
  );
}

// Syntax highlighting components
export function Comment({ children }) {
  return <span className="syntax-comment">// {children}</span>;
}

export function Keyword({ children }) {
  return <span className="syntax-keyword">{children}</span>;
}

export function Function({ children }) {
  return <span className="syntax-function">{children}</span>;
}

export function String({ children }) {
  return <span className="syntax-string">"{children}"</span>;
}

export function Variable({ children }) {
  return <span className="syntax-variable">{children}</span>;
}

export function Type({ children }) {
  return <span className="syntax-type">{children}</span>;
}

export function Number({ children }) {
  return <span className="syntax-number">{children}</span>;
}
