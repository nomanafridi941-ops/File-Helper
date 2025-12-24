
import React from 'react';
import { Link } from 'react-router-dom';
import { ToolMetadata } from '../types';

interface ToolCardProps {
  tool: ToolMetadata;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link 
      to={`/${tool.id}`}
      className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-blue-600 transition-all flex flex-col items-center text-center"
    >
      <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
        {tool.icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{tool.title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {tool.shortDesc}
      </p>
    </Link>
  );
};

export default ToolCard;
