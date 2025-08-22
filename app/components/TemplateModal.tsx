'use client';

import { useEffect, useRef } from 'react';
import { X, Terminal, Copy, Check } from 'lucide-react';
import { OutputStyleTemplate } from '@/src/shared/types';
import { useState } from 'react';

interface TemplateModalProps {
  template: OutputStyleTemplate;
  isOpen: boolean;
  onClose: () => void;
  baseUrl: string;
}

export default function TemplateModal({ template, isOpen, onClose, baseUrl }: TemplateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copiedContent, setCopiedContent] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

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

  const npxCommand = `npx ccoutputstyles --url ${baseUrl}/templates/${template.fileName.replace('.md', '')}`;

  const handleCopyContent = async () => {
    await navigator.clipboard.writeText(template.content);
    setCopiedContent(true);
    setTimeout(() => setCopiedContent(false), 2000);
  };

  const handleCopyCommand = async () => {
    await navigator.clipboard.writeText(npxCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[85vh] bg-background rounded-lg shadow-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {template.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {template.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Installation Command */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Install Command</label>
              <button
                onClick={handleCopyCommand}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-colors hover:bg-muted"
              >
                {copiedCommand ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-muted rounded-md p-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <code className="text-sm font-mono text-foreground break-all">
                {npxCommand}
              </code>
            </div>
          </div>

          {/* Template Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Template Content</label>
              <button
                onClick={handleCopyContent}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-colors hover:bg-muted"
              >
                {copiedContent ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            
            {/* Hidden data for CLI extraction */}
            <div
              className="hidden"
              data-template-content={template.content}
              data-template-name={template.name}
              data-template-description={template.description}
            />
            
            {/* Visible template content */}
            <pre className="bg-muted rounded-md p-4 overflow-x-auto">
              <code className="text-sm font-mono text-foreground whitespace-pre-wrap">
                {template.content}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}