import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaHeart, FaChartLine } from 'react-icons/fa';
import { useData } from '../context/DataContext';

export default function Footer() {
  const { data } = useData();
  const { profile } = data;
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaEnvelope, href: `mailto:${profile.email}`, label: 'Email' },
    { icon: FaGithub, href: profile.social.github, label: 'GitHub' },
    { icon: FaLinkedin, href: profile.social.linkedin, label: 'LinkedIn' },
  ];

  const footerLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="relative mt-20 border-t border-dark-700/50 bg-dark-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-primary-400 text-xl" />
              </div>
              <span className="text-xl font-bold text-gradient">sanny.dev</span>
            </Link>
            <p className="text-dark-400 text-sm max-w-xs">
              {profile.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-dark-200 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-dark-200 font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-dark-800 border border-dark-700 rounded-lg
                               flex items-center justify-center text-dark-400
                               hover:text-primary-400 hover:border-primary-500/50
                               transition-colors"
                    aria-label={social.label}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
            <p className="mt-4 text-dark-400 text-sm">
              {profile.location}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-dark-700/50 flex flex-col md:flex-row
                        justify-between items-center gap-4">
          <p className="text-dark-500 text-sm">
            © 2023 - {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="text-dark-500 text-sm flex items-center gap-1">
            Made with <FaHeart className="text-red-500 mx-1" /> by {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
