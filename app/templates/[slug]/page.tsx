import { templates } from '@/app/data/templates';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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
    title: `${template.name} - Claude Code Output Style`,
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {template.name}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {template.description}
        </p>
        
        {/* Hidden template data for CLI extraction */}
        <div
          className="hidden"
          data-template-content={template.content}
          data-template-name={template.name}
          data-template-description={template.description}
        />
        
        {/* Visible template content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <pre className="language-markdown overflow-x-auto">
            <code className="text-sm">{template.content}</code>
          </pre>
        </div>
        
        {/* Installation instructions */}
        <div className="mt-8 p-4 bg-gray-900 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Install this template:</p>
          <code className="text-green-400 font-mono text-sm">
            npx ccoutputstyle --url {typeof window !== 'undefined' ? window.location.href : `https://ccoutputstyles.vercel.app/templates/${slug}`}
          </code>
        </div>
      </div>
    </div>
  );
}