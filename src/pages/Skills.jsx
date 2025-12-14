import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPython, FaGitAlt, FaBrain, FaChartBar, FaShieldAlt, FaCode, FaDatabase, FaBook
} from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import { useData } from '../context/DataContext';
import SectionWrapper from '../components/SectionWrapper';
import CodeBlock, { Comment, Keyword, Variable, Type, String } from '../components/CodeBlock';

const iconMap = {
  FaPython,
  FaGitAlt,
  FaBrain,
  FaChartBar,
  FaShieldAlt,
  FaDatabase,
  FaBook,
  SiR: FaCode,
  SiPandas: FaDatabase,
  SiNumpy: FaChartBar,
  SiPlotly: FaChartBar,
  SiMysql: FaDatabase,
  SiJupyter: FaBook,
  SiRstudio: FaCode,
  SiPycharm: FaCode,
  SiVisualstudiocode: VscCode,
};

const categories = ['All', 'Language', 'Library', 'Tool', 'Domain'];

export default function Skills() {
  const { data } = useData();
  const { skills } = data;
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="min-h-screen">
      <SectionWrapper title="Skills & Technologies">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${activeCategory === category
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-dark-800/50 text-dark-300 border border-dark-700 hover:border-primary-500/50'
                }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const Icon = iconMap[skill.icon] || FaCode;
              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="card text-center py-6 cursor-pointer group"
                >
                  <motion.div
                    animate={{
                      rotate: hoveredSkill === skill.id ? 360 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 mx-auto mb-4 bg-primary-500/10 rounded-xl
                               flex items-center justify-center group-hover:bg-primary-500/20
                               transition-colors"
                  >
                    <Icon className="text-2xl text-primary-400" />
                  </motion.div>
                  <h3 className="text-dark-100 font-medium">{skill.name}</h3>
                  <span className="text-dark-500 text-xs mt-1 block">{skill.category}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Code Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <CodeBlock filename="skills.ts">
            <pre className="text-sm">
              <Comment>Skills I bring to the table</Comment>
              {'\n\n'}
              <Keyword>const</Keyword> <Variable>skills</Variable>: <Type>Skill</Type>[] = [
              {'\n'}  {'{'}
              {'\n'}    <Variable>category</Variable>: <String>Languages</String>,
              {'\n'}    <Variable>items</Variable>: [<String>Python</String>, <String>R</String>, <String>SQL</String>]
              {'\n'}  {'}'},
              {'\n'}  {'{'}
              {'\n'}    <Variable>category</Variable>: <String>ML/Data</String>,
              {'\n'}    <Variable>items</Variable>: [<String>Pandas</String>, <String>NumPy</String>, <String>Scikit-learn</String>]
              {'\n'}  {'}'},
              {'\n'}  {'{'}
              {'\n'}    <Variable>category</Variable>: <String>Visualization</String>,
              {'\n'}    <Variable>items</Variable>: [<String>Matplotlib</String>, <String>ggplot2</String>, <String>Plotly</String>]
              {'\n'}  {'}'}
              {'\n'}];
              {'\n\n'}
              <Comment>Always learning, always growing 🚀</Comment>
            </pre>
          </CodeBlock>
        </motion.div>
      </SectionWrapper>

      {/* Learning Journey */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 pb-20"
      >
        <div className="card bg-gradient-to-r from-primary-500/10 to-purple-500/10 border-primary-500/20">
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-dark-100 mb-3">
              📚 Currently Learning
            </h3>
            <p className="text-dark-400 max-w-lg mx-auto">
              Deep Learning, Neural Networks, and Advanced Statistical Methods
            </p>
            <div className="flex justify-center gap-4 mt-6">
              {['TensorFlow', 'PyTorch', 'Deep Learning'].map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="skill-badge"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
