import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import SectionWrapper from '../components/SectionWrapper';
import toast from 'react-hot-toast';

export default function Contact() {
  const { data } = useData();
  const { profile } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '72b59222-f7d8-417a-9ffe-4a80f9d71e3d', // Web3Forms access key
          ...formData,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        toast.success('Message sent successfully!');
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: 'primary',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'sanny-un-sowadh-wamik',
      href: profile.social.linkedin,
      color: 'blue',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'Sanny-Un-Sowadh-Wamik',
      href: profile.social.github,
      color: 'gray',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: profile.location,
      href: null,
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen">
      <SectionWrapper title="Get In Touch">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="card">
              <h3 className="text-xl font-bold text-dark-100 mb-2">Send a Message</h3>
              <p className="text-dark-400 mb-6">
                Have a question or want to work together? Drop me a message!
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-dark-300 text-sm mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-dark-300 text-sm mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-dark-300 text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full btn-primary flex items-center justify-center gap-2
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                    ${isSubmitted ? 'bg-green-500 hover:bg-green-500' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <FaCheck />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-xl font-bold text-dark-100 mb-2">Connect With Me</h3>
              <p className="text-dark-400 mb-6">
                Feel free to reach out through any of these platforms!
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const Wrapper = info.href ? 'a' : 'div';
                  const wrapperProps = info.href
                    ? { href: info.href, target: '_blank', rel: 'noopener noreferrer' }
                    : {};

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Wrapper
                        {...wrapperProps}
                        className={`flex items-center gap-4 p-4 rounded-lg border border-dark-700
                                    bg-dark-800/30 ${info.href ? 'hover:border-primary-500/50 cursor-pointer' : ''}
                                    transition-colors group`}
                      >
                        <div className={`w-12 h-12 bg-${info.color}-500/20 rounded-lg
                                         flex items-center justify-center`}>
                          <Icon className={`text-xl text-${info.color}-400`} />
                        </div>
                        <div>
                          <p className="text-dark-500 text-sm">{info.label}</p>
                          <p className={`text-dark-100 ${info.href ? 'group-hover:text-primary-400' : ''}
                                         transition-colors`}>
                            {info.value}
                          </p>
                        </div>
                      </Wrapper>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="card bg-gradient-to-r from-primary-500/10 to-purple-500/10
                         border-primary-500/20"
            >
              <div className="text-center py-4">
                <p className="text-2xl mb-2">⏱️</p>
                <h4 className="text-dark-100 font-semibold mb-1">Quick Response</h4>
                <p className="text-dark-400 text-sm">
                  I typically respond within 24-48 hours
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
