import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import SectionWrapper from '../components/SectionWrapper';
import CodeBlock, { Comment, Keyword, Function, String, Variable, Type } from '../components/CodeBlock';

export default function About() {
  const { data } = useData();
  const { profile } = data;

  const aboutPoints = profile.about.split('\n\n');

  return (
    <div className="min-h-screen">
      <SectionWrapper title="About Me">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {aboutPoints.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-dark-300 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              <div className="card flex items-center gap-3 py-4">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-primary-400" />
                </div>
                <div>
                  <p className="text-dark-400 text-sm">Location</p>
                  <p className="text-dark-100">{profile.location}</p>
                </div>
              </div>

              <div className="card flex items-center gap-3 py-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-blue-400" />
                </div>
                <div>
                  <p className="text-dark-400 text-sm">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-dark-100 hover:text-primary-400 transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Social & Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <FaGithub />
                GitHub
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <FaLinkedin />
                LinkedIn
              </a>
              <a
                href={profile.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <FaDownload />
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <CodeBlock filename="about-me.ts">
              <pre className="text-sm">
                <Comment>My superpower!</Comment>
                {'\n\n'}
                <Keyword>interface</Keyword> <Type>DataScientist</Type> {'{'}
                {'\n'}  <Variable>focus</Variable>: <Type>string</Type>[];
                {'\n'}  <Variable>languages</Variable>: <Type>string</Type>[];
                {'\n'}  <Variable>passion</Variable>: <Type>string</Type>;
                {'\n'}{'}'}
                {'\n\n'}
                <Keyword>const</Keyword> <Variable>aboutMe</Variable>: <Type>DataScientist</Type> = {'{'}
                {'\n'}  <Variable>focus</Variable>: [
                {'\n'}    <String>Machine Learning</String>,
                {'\n'}    <String>Statistical Analysis</String>,
                {'\n'}    <String>Data Visualization</String>
                {'\n'}  ],
                {'\n'}  <Variable>languages</Variable>: [<String>Python</String>, <String>R</String>],
                {'\n'}  <Variable>passion</Variable>: <String>{profile.superpower}</String>
                {'\n'}{'}'};
                {'\n\n'}
                <Keyword>export default</Keyword> <Variable>aboutMe</Variable>;
              </pre>
            </CodeBlock>

            {/* Fun Fact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card mt-6"
            >
              <h3 className="text-lg font-semibold text-primary-400 mb-2">
                🎯 What Drives Me
              </h3>
              <p className="text-dark-300">
                I believe that data has the power to transform decision-making and solve
                complex problems. My goal is to bridge the gap between raw data and
                actionable insights that create real impact.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
