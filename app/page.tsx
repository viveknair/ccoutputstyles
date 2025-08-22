'use client';

import { useState } from 'react';
import { templates } from './data/templates';
import TemplateCard from './components/TemplateCard';
import TemplateModal from './components/TemplateModal';
import { OutputStyleTemplate } from '@/src/shared/types';
import { Sparkles, Github, Package, Terminal } from 'lucide-react';

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent" />
                ccoutputstyle
              </h1>
              <p className="text-muted-foreground mt-2">
                Customize Claude Code with pre-built output style templates
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://www.npmjs.com/package/ccoutputstyles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="npm package"
              >
                <Package className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/viveknair/ccoutputstyles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub repository"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Install Bar */}
      <div className="border-b bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-muted-foreground" />
            <code className="text-sm font-mono text-muted-foreground">
              npx ccoutputstyle --url &lt;template-url&gt;
            </code>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <TemplateCard
              key={template.fileName}
              template={template}
              onClick={() => handleTemplateClick(template)}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-lg font-semibold mb-4">Installation</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-2">Quick install (no installation required):</p>
              <pre className="bg-muted rounded-md p-3">
                <code className="text-sm">npx ccoutputstyle --url https://ccoutputstyles.vercel.app/templates/critical-code-reviewer</code>
              </pre>
            </div>
            
            <div>
              <p className="font-medium text-foreground mb-2">Global installation:</p>
              <pre className="bg-muted rounded-md p-3">
                <code className="text-sm">npm install -g ccoutputstyles</code>
              </pre>
            </div>

            <div>
              <p className="font-medium text-foreground mb-2">Templates are installed to:</p>
              <div className="flex gap-4">
                <code className="text-sm bg-muted px-2 py-1 rounded">~/.claude/output-styles/</code>
                <span className="text-sm">or</span>
                <code className="text-sm bg-muted px-2 py-1 rounded">./.claude/output-styles/</code>
              </div>
            </div>
          </div>
        </div>
      </main>

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