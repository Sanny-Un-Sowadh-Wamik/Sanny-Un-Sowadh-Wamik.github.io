import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaFileAlt, FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import CodeBlock, { Comment, Keyword, Function, String, Variable, Type } from '../components/CodeBlock';

export default function Home() {
  const { data } = useData();
  const { profile, stats } = data;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10
                         border border-primary-500/30 rounded-full text-primary-400 text-sm"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              Hi, I'm{' '}
              <span className="text-gradient">{profile.name.split(' ')[0]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-primary-400 font-medium"
            >
              {profile.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-dark-400 text-lg max-w-lg"
            >
              {profile.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/contact" className="btn-primary flex items-center gap-2">
                <FaEnvelope />
                Contact Me
              </Link>
              <a
                href={profile.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <FaFileAlt />
                View Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 pt-4"
            >
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors"
              >
                <FaGithub size={24} />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </motion.div>
          </motion.div>

          {/* Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CodeBlock filename="welcome.ts">
              <pre className="text-sm md:text-base">
                <Comment>Welcome to my portfolio!</Comment>
                {'\n\n'}
                <Keyword>interface</Keyword> <Type>Developer</Type> {'{'}
                {'\n'}  <Variable>name</Variable>: <Type>string</Type>;
                {'\n'}  <Variable>role</Variable>: <Type>string</Type>;
                {'\n'}  <Variable>superpower</Variable>: <Type>string</Type>;
                {'\n'}{'}'}
                {'\n\n'}
                <Keyword>const</Keyword> <Variable>sanny</Variable>: <Type>Developer</Type> = {'{'}
                {'\n'}  <Variable>name</Variable>: <String>{profile.name}</String>,
                {'\n'}  <Variable>role</Variable>: <String>{profile.title}</String>,
                {'\n'}  <Variable>superpower</Variable>: <String>{profile.superpower}</String>
                {'\n'}{'}'};
                {'\n\n'}
                <Function>console</Function>.<Function>log</Function>(<Variable>sanny</Variable>);
              </pre>
            </CodeBlock>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: stats.projectsCompleted, label: 'Projects Completed', color: 'primary' },
            { value: stats.skillsLearned, label: 'Skills Learned', color: 'blue' },
            { value: stats.githubRepos, label: 'GitHub Repos', color: 'green' },
            { value: `${stats.yearsLearning}+`, label: 'Years Learning', color: 'orange' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="card text-center py-8"
            >
              <motion.p
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                className={`text-4xl font-bold text-${stat.color}-400`}
              >
                {stat.value}
              </motion.p>
              <p className="text-dark-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Quick Links Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { path: '/projects', title: 'View Projects', desc: 'Explore my data science and ML projects' },
            { path: '/skills', title: 'My Skills', desc: 'Technologies and tools I work with' },
            { path: '/about', title: 'About Me', desc: 'Learn more about my journey' },
          ].map((item, index) => (
            <Link key={index} to={item.path}>
              <motion.div
                whileHover={{ y: -5 }}
                className="card group"
              >
                <h3 className="text-xl font-semibold text-dark-100 group-hover:text-primary-400
                               transition-colors flex items-center gap-2">
                  {item.title}
                  <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-dark-400 mt-2">{item.desc}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
