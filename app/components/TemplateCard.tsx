'use client';

import { OutputStyleTemplate } from '@/src/shared/types';
import { FileText } from 'lucide-react';

interface TemplateCardProps {
  template: OutputStyleTemplate;
  onClick: () => void;
}

export default function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-background border rounded-lg p-5 hover:border-accent/50 transition-all hover:shadow-sm"
    >
      <div className="flex items-start gap-3">
        <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
            {template.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {template.description}
          </p>
          <code className="text-xs text-muted-foreground font-mono mt-3 block">
            {template.fileName}
          </code>
        </div>
      </div>
    </button>
  );
}