
import React from 'react';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../constants';
import { Zap, Shield, MousePointer2, FileImage, FileText, Settings, CheckCircle } from 'lucide-react';
import { updateMetaTags } from '../utils/seoHelper';

const Home: React.FC = () => {
  React.useEffect(() => {
    updateMetaTags(
      'FileHelper.xyz - Free Online File Tools | Convert PDF, Images & More',
      'Fast, private, and free online file conversion tools. Convert PDFs, images, compress files, and more - 100% browser-based with no uploads.'
    );
  }, []);
  const imageTools = TOOLS.filter(t => t.category === 'Image');
  const pdfTools = TOOLS.filter(t => t.category === 'PDF');
  const utilityTools = TOOLS.filter(t => t.category === 'Utility');

  return (
    <div className="pb-20">
      {/* Trust & Privacy Banner */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-b border-green-200 dark:border-green-800">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>🔐 TRUST & PRIVACY (IMPORTANT)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700 dark:text-slate-300">✓ Browser-based processing</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700 dark:text-slate-300">✓ No file upload</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700 dark:text-slate-300">✓ No file storage</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700 dark:text-slate-300">✓ Clear privacy notice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-gradient dark:bg-slate-800/50 border-b dark:border-slate-700 py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            Free Online File Tools <br/> 
            <span className="text-blue-600 dark:text-blue-400">Convert & Optimize Files Instantly</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            The easiest way to manage your files. No accounts, no watermarks, no server uploads. 
            Everything happens 100% in your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <span>Fast Conversion</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500 dark:text-green-400" />
              <span>Private & Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <MousePointer2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span>No Login Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 sticky top-16 z-40 hidden md:block">
        <div className="container mx-auto px-4 py-4 flex justify-center space-x-8 text-sm font-bold text-slate-600 dark:text-slate-300">
           <a href="#image-tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">🖼️ Image Tools</a>
           <a href="#pdf-tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">📄 PDF Tools</a>
           <a href="#utility-tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">🔄 File Utilities</a>
        </div>
      </div>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 mt-20">
        {/* IMAGE TOOLS */}
        <div id="image-tools" className="mb-20 scroll-mt-32">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
               <FileImage className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">🖼️ Image Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {imageTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* PDF TOOLS */}
        <div id="pdf-tools" className="mb-20 scroll-mt-32">
          <div className="flex items-center space-x-3 mb-8">
             <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
               <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">📄 PDF Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pdfTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* UTILITY TOOLS */}
        <div id="utility-tools" className="mb-20 scroll-mt-32">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-lg">
               <Settings className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">🔄 File Utilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {utilityTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Features / Privacy Section */}
      <section id="privacy" className="bg-slate-50 mt-32 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Privacy First, Always.</h2>
            <p className="text-slate-600 mb-12">
              Unlike other file converters, FileHelper.xyz doesn't upload your sensitive documents to any server. 
              We use modern web technologies to process your files right in your browser.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
               <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold mb-2 text-slate-800 dark:text-slate-100">100% Private</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Files stay in your browser. No server storage means zero risk of data leaks.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold mb-2 text-slate-800 dark:text-slate-100">Instant Speed</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">No waiting in queues or slow uploads. Local processing is as fast as your CPU.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center mb-4">
                  <MousePointer2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold mb-2 text-slate-800 dark:text-slate-100">No Limitations</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Process as many files as you want without daily limits or subscription nag-screens.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
