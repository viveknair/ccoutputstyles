'use client';

import { useState } from 'react';
import { templates } from './data/templates';
import TemplateCard from './components/TemplateCard';
import TemplateModal from './components/TemplateModal';
import { OutputStyleTemplate } from '@/src/shared/types';
import { Sparkles, Github, Package } from 'lucide-react';

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<OutputStyleTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTemplateClick = (template: OutputStyleTemplate) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTemplate(null), 200);
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ccoutputstyles.vercel.app';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-blue-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Claude Code Output Styles
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Customize your Claude Code experience with pre-built output styles
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.npmjs.com/package/ccoutputstyles"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Package className="w-5 h-5" />
                <span className="hidden sm:inline">npm</span>
              </a>
              <a
                href="https://github.com/yourusername/ccoutputstyles"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Style
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our collection of output style templates for Claude Code. 
            Each template modifies how Claude responds to your queries, 
            optimizing for different use cases and preferences.
          </p>
          
          {/* Quick Install */}
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 bg-gray-900 dark:bg-black rounded-lg">
            <span className="text-sm text-gray-400">Quick install:</span>
            <code className="text-sm text-green-400 font-mono">
              npx ccoutputstyle --url &lt;template-url&gt;
            </code>
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.fileName}
              template={template}
              onClick={() => handleTemplateClick(template)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Install templates to <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">~/.claude/output-styles/</code> or project level
            </p>
            <p className="mt-2">
              Made for Claude Code users everywhere
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          baseUrl={baseUrl}
        />
      )}
    </div>
  );
}