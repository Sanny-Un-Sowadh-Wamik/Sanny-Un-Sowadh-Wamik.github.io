import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaHome, FaUser, FaProjectDiagram, FaCode, FaGraduationCap, FaEnvelope, FaCog } from 'react-icons/fa';

const commands = [
  { id: 'home', label: 'Go to Home', path: '/', icon: FaHome },
  { id: 'about', label: 'Go to About Me', path: '/about', icon: FaUser },
  { id: 'projects', label: 'Go to Projects', path: '/projects', icon: FaProjectDiagram },
  { id: 'skills', label: 'Go to Skills', path: '/skills', icon: FaCode },
  { id: 'education', label: 'Go to Education', path: '/education', icon: FaGraduationCap },
  { id: 'contact', label: 'Go to Contact', path: '/contact', icon: FaEnvelope },
  { id: 'admin', label: 'Open Admin Dashboard', path: '/admin', icon: FaCog },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        executeCommand(filteredCommands[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  const executeCommand = (command) => {
    navigate(command.path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
          >
            <div className="bg-dark-800 border border-dark-700 rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-700">
                <FaSearch className="text-dark-500" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-dark-100 placeholder-dark-500
                             outline-none text-lg"
                />
                <kbd className="px-2 py-1 bg-dark-700 rounded text-xs text-dark-400">
                  ESC
                </kbd>
              </div>

              {/* Commands List */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((command, index) => {
                    const Icon = command.icon;
                    return (
                      <motion.button
                        key={command.id}
                        onClick={() => executeCommand(command)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left
                                    transition-colors ${
                                      index === selectedIndex
                                        ? 'bg-primary-500/20 text-primary-400'
                                        : 'text-dark-300 hover:bg-dark-700/50'
                                    }`}
                        whileHover={{ x: 5 }}
                      >
                        <Icon className="text-lg" />
                        <span>{command.label}</span>
                        {index === selectedIndex && (
                          <span className="ml-auto text-xs text-dark-500">Enter ↵</span>
                        )}
                      </motion.button>
                    );
                  })
                ) : (
                  <div className="px-4 py-8 text-center text-dark-500">
                    No commands found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
