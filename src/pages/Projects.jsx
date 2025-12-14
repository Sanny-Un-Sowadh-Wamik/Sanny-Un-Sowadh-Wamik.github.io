import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaKaggle, FaTrophy } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import SectionWrapper from '../components/SectionWrapper';

export default function Projects() {
  const { data } = useData();
  const { projects } = data;

  return (
    <div className="min-h-screen">
      <SectionWrapper title="Featured Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`card overflow-hidden ${project.wide ? 'md:col-span-2' : ''}`}
            >
              {/* Gradient Header */}
              <div
                className={`-mx-6 -mt-6 mb-6 p-6 bg-gradient-to-r ${project.gradient}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <span className="inline-flex items-center gap-2 mt-2 px-3 py-1
                                     bg-white/20 rounded-full text-sm text-white/90">
                      {project.kaggle && <FaKaggle />}
                      {project.role}
                    </span>
                  </div>
                  {project.kaggle && (
                    <div className="flex items-center gap-1 text-white/80">
                      <FaTrophy />
                      <span className="text-sm">Kaggle</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <p className="text-dark-300 mb-4">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-dark-700/50 rounded-full text-xs
                               text-dark-300 border border-dark-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.github && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-dark-400 hover:text-primary-400
                               transition-colors"
                  >
                    <FaGithub />
                    <span>View Code</span>
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-dark-400 hover:text-primary-400
                               transition-colors"
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 py-16"
      >
        <div className="card text-center py-12">
          <h3 className="text-2xl font-bold text-dark-100 mb-4">
            Want to see more?
          </h3>
          <p className="text-dark-400 mb-6 max-w-lg mx-auto">
            Check out my GitHub profile for more projects, experiments, and open-source contributions.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/Sanny-Un-Sowadh-Wamik"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FaGithub />
            Visit GitHub Profile
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
