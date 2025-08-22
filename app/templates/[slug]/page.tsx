import { templates } from '@/app/data/templates';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, Terminal, Copy } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = templates.find(t => t.fileName.replace('.md', '') === slug);
  
  if (!template) {
    return {
      title: 'Template Not Found',
    };
  }

  return {
    title: `${template.name} - ccoutputstyle`,
    description: template.description,
  };
}

export async function generateStaticParams() {
  return templates.map((template) => ({
    slug: template.fileName.replace('.md', ''),
  }));
}

export default async function TemplatePage({ params }: PageProps) {
  const { slug } = await params;
  const template = templates.find(t => t.fileName.replace('.md', '') === slug);

  if (!template) {
    notFound();
  }

  const installCommand = `npx ccoutputstyle --url https://ccoutputstyles.vercel.app/templates/${slug}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to templates
          </Link>
          <h1 className="text-2xl font-semibold text-foreground mt-4">
            {template.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            {template.description}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Installation Command */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-foreground mb-3">Install this template</h2>
          <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
            <Terminal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <code className="text-sm font-mono text-foreground break-all flex-1">
              {installCommand}
            </code>
          </div>
        </div>

        {/* Template Content */}
        <div>
          <h2 className="text-sm font-medium text-foreground mb-3">Template content</h2>
          
          {/* Hidden template data for CLI extraction */}
          <div
            className="hidden"
            data-template-content={template.content}
            data-template-name={template.name}
            data-template-description={template.description}
          />
          
          {/* Visible template content */}
          <pre className="bg-muted rounded-lg p-6 overflow-x-auto">
            <code className="text-sm font-mono text-foreground whitespace-pre-wrap">
              {template.content}
            </code>
          </pre>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            This template will be installed to <code className="font-mono bg-muted px-2 py-0.5 rounded">~/.claude/output-styles/{template.fileName}</code>
          </p>
        </div>
      </main>
    </div>
  );
}