'use client';

import { OutputStyleTemplate } from '@/src/shared/types';
import { FileText, ExternalLink } from 'lucide-react';

interface TemplateCardProps {
  template: OutputStyleTemplate;
  onClick: () => void;
}

export default function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer hover:border-blue-400 dark:hover:border-blue-500"
    >
      <div className="flex items-start justify-between mb-3">
        <FileText className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {template.name}
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {template.description}
      </p>
      
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <code className="text-xs text-gray-500 dark:text-gray-400 font-mono">
          {template.fileName}
        </code>
      </div>
    </div>
  );
}