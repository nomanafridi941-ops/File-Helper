
import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 dark:text-slate-500 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">filehelper.xyz</h3>
            <p className="text-sm leading-relaxed">
              Your go-to destination for fast, free, and secure online file conversions. 
              We process everything in your browser to ensure your data never leaves your machine.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">PDF Tools</h4>
            <ul className="space-y-2 text-sm">
              {TOOLS.filter(t => t.category === 'PDF').slice(0, 6).map(tool => (
                <li key={tool.id}>
                  <Link to={`/${tool.id}`} className="hover:text-white transition-colors text-xs">{tool.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Image Tools</h4>
            <ul className="space-y-2 text-sm">
              {TOOLS.filter(t => t.category === 'Image').slice(0, 6).map(tool => (
                <li key={tool.id}>
                  <Link to={`/${tool.id}`} className="hover:text-white transition-colors text-xs">{tool.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">Utilities</h4>
            <ul className="space-y-2 text-sm">
              {TOOLS.filter(t => t.category === 'Utility').map(tool => (
                <li key={tool.id}>
                  <Link to={`/${tool.id}`} className="hover:text-white transition-colors text-xs">{tool.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors text-xs">Home</Link></li>
              <li><a href="#" className="hover:text-white transition-colors text-xs">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-xs">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          <p>© {new Date().getFullYear()} FileHelper.xyz. All rights reserved. Made with ❤️ for privacy.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
