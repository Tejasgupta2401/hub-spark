import React from 'react';
import { Zap, BarChart3, Code2, Share2 } from 'lucide-react';

export const Navbar = ({ onNavigate, currentPage }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">CodeSnap</h1>
            <p className="text-xs opacity-75">AI-Powered Code Intelligence</p>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <button
            onClick={() => onNavigate('analyzer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              currentPage === 'analyzer'
                ? 'bg-white text-blue-600'
                : 'hover:bg-blue-500'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Analyzer
          </button>

          <button
            onClick={() => onNavigate('snippets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              currentPage === 'snippets'
                ? 'bg-white text-blue-600'
                : 'hover:bg-blue-500'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Library
          </button>

          <button
            onClick={() => onNavigate('collaborate')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              currentPage === 'collaborate'
                ? 'bg-white text-blue-600'
                : 'hover:bg-blue-500'
            }`}
          >
            <Share2 className="w-4 h-4" />
            Collaborate
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
