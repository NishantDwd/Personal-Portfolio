import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';

const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - About */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{data.personal.name}</h3>
            <p className="text-slate-300 mb-4">
              {data.personal.title} passionate about creating innovative solutions and building scalable applications.
            </p>
            <div className="flex items-center text-slate-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <span>and</span>
              <Code className="w-4 h-4 mx-1 text-blue-500" />
              <span>and</span>
              <Coffee className="w-4 h-4 mx-1 text-yellow-500" />
            </div>
          </div>

          {/* Center Column - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'About', id: 'about' },
                { name: 'Projects', id: 'projects' },
                { name: 'Tech Stack', id: 'tech-stack' },
                { name: 'Education', id: 'education' },
                { name: 'Contact', id: 'contact' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Connect */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${data.contact.email}`}
                className="block text-slate-300 hover:text-white transition-colors duration-200"
              >
                {data.contact.email}
              </a>
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-300 hover:text-white transition-colors duration-200"
              >
                LinkedIn Profile
              </a>
              <a
                href={data.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-300 hover:text-white transition-colors duration-200"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © {currentYear} {data.personal.name}. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Built with React, TailwindCSS, and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;