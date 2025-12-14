import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaUsers, FaBookOpen } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import SectionWrapper from '../components/SectionWrapper';
import CodeBlock, { Comment, Keyword, Variable, Type, String, Number } from '../components/CodeBlock';

export default function Education() {
  const { data } = useData();
  const { education, activities } = data;

  return (
    <div className="min-h-screen">
      {/* Education Section */}
      <SectionWrapper title="Education">
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-3 top-8 w-6 h-6 bg-primary-500 rounded-full
                              border-4 border-dark-900 z-10 hidden md:block" />

              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary-500/20 rounded-xl flex items-center
                                justify-center flex-shrink-0">
                  <FaGraduationCap className="text-3xl text-primary-400" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-dark-100">{edu.degree}</h3>
                    {edu.current && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400
                                       rounded-full text-xs font-medium">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-primary-400 font-medium mb-2">{edu.institution}</p>

                  <div className="flex items-center gap-2 text-dark-400 text-sm mb-4">
                    <FaCalendarAlt />
                    <span>{edu.period}</span>
                  </div>

                  <p className="text-dark-300 mb-4">{edu.description}</p>

                  {/* Coursework */}
                  {edu.coursework && (
                    <div>
                      <div className="flex items-center gap-2 text-dark-200 mb-3">
                        <FaBookOpen className="text-primary-400" />
                        <span className="font-medium">Relevant Coursework</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="skill-badge"
                          >
                            {course}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <CodeBlock filename="education-journey.ts">
            <pre className="text-sm">
              <Comment>My education journey so far!</Comment>
              {'\n\n'}
              <Keyword>const</Keyword> <Variable>journey</Variable> = {'{'}
              {'\n'}  <Variable>started</Variable>: <Number>2024</Number>,
              {'\n'}  <Variable>university</Variable>: <String>RMIT University</String>,
              {'\n'}  <Variable>degree</Variable>: <String>Bachelor of Data Science</String>,
              {'\n'}  <Variable>expected</Variable>: <Number>2027</Number>,
              {'\n'}  <Variable>passion</Variable>: <String>Turning data into insights!</String>
              {'\n'}{'}'};
              {'\n\n'}
              <Comment>Growing every day 📈</Comment>
            </pre>
          </CodeBlock>
        </motion.div>
      </SectionWrapper>

      {/* Activities Section */}
      <SectionWrapper title="Activities & Leadership">
        <div className="grid md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center
                                justify-center flex-shrink-0">
                  <FaUsers className="text-xl text-primary-400" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-dark-100">{activity.title}</h3>
                  <span className="inline-block px-3 py-1 bg-primary-500/10 text-primary-400
                                   rounded-full text-xs font-medium mt-2 mb-3">
                    {activity.role}
                  </span>

                  <div className="flex items-center gap-2 text-dark-500 text-sm mb-3">
                    <FaCalendarAlt />
                    <span>{activity.period}</span>
                  </div>

                  <p className="text-dark-300 text-sm">{activity.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
