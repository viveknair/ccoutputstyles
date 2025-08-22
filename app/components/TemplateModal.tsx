'use client';

import { useEffect, useRef } from 'react';
import { X, Terminal, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { OutputStyleTemplate } from '@/src/shared/types';
import CopyButton from './CopyButton';

interface TemplateModalProps {
  template: OutputStyleTemplate;
  isOpen: boolean;
  onClose: () => void;
  baseUrl: string;
}

export default function TemplateModal({ template, isOpen, onClose, baseUrl }: TemplateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const npxCommand = `npx ccoutputstyle --url ${baseUrl}/templates/${template.fileName.replace('.md', '')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {template.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            {template.description}
          </p>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* Installation Command */}
          <div className="mb-6 p-4 bg-gray-900 dark:bg-black rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-gray-300">Install with npx</span>
              </div>
              <CopyButton text={npxCommand} />
            </div>
            <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
              <code>{npxCommand}</code>
            </pre>
          </div>

          {/* Template Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Template Content
              </h3>
              <CopyButton text={template.content} />
            </div>
            
            <div
              className="prose prose-gray dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-x-auto"
              data-template-content={template.content}
              data-template-name={template.name}
              data-template-description={template.description}
            >
              <pre className="language-markdown">
                <code>{template.content}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-mono">{template.fileName}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}