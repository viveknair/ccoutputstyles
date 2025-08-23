import axios from 'axios';
import * as cheerio from 'cheerio';

export interface TemplateInfo {
  name: string;
  description: string;
  url: string;
  fileName: string;
}

export async function fetchTemplatesList(): Promise<TemplateInfo[]> {
  try {
    // Fetch the main page
    const response = await axios.get('https://ccoutputstyles.vercel.app');
    const html = response.data;
    
    // Parse HTML
    const $ = cheerio.load(html);
    
    // Look for Next.js data script which contains the templates
    const scriptTag = $('#__NEXT_DATA__').html();
    
    if (scriptTag) {
      try {
        const jsonData = JSON.parse(scriptTag);
        const pageProps = jsonData?.props?.pageProps;
        
        // Try to find templates in the page props
        if (pageProps?.__templates) {
          return pageProps.__templates.map((t: any) => ({
            name: t.name,
            description: t.description,
            fileName: t.fileName,
            url: `https://ccoutputstyles.vercel.app/templates/${t.fileName.replace('.md', '')}`
          }));
        }
      } catch (e) {
        // If parsing fails, fall back to scraping
      }
    }
    
    // Fallback: scrape template cards from the HTML
    const templates: TemplateInfo[] = [];
    
    // Look for template cards (based on the structure we saw)
    $('div[class*="border"][class*="rounded"]').each((index, element) => {
      const $el = $(element);
      
      // Try to find template name (usually in h3 or similar)
      const name = $el.find('h3, h2, [class*="font-semibold"]').first().text().trim();
      
      // Try to find description (usually in p tag)
      const description = $el.find('p[class*="text-muted"], p[class*="text-gray"]').first().text().trim();
      
      if (name && name !== '') {
        // Generate filename from name
        const fileName = name.toLowerCase().replace(/\s+/g, '-') + '.md';
        
        templates.push({
          name,
          description: description || 'No description available',
          fileName,
          url: `https://ccoutputstyles.vercel.app/templates/${fileName.replace('.md', '')}`
        });
      }
    });
    
    // If scraping didn't work, return hardcoded list as fallback
    if (templates.length === 0) {
      return [
        {
          name: 'Critical Code Reviewer',
          description: 'Uncompromising technical reviewer focused on correctness, maintainability, and engineering truth over comfort',
          fileName: 'critical-code-reviewer.md',
          url: 'https://ccoutputstyles.vercel.app/templates/critical-code-reviewer'
        },
        {
          name: 'Concise Engineer',
          description: 'Direct and efficient communicator who provides minimal but complete responses',
          fileName: 'concise-engineer.md',
          url: 'https://ccoutputstyles.vercel.app/templates/concise-engineer'
        },
        {
          name: 'Documentation Writer',
          description: 'Comprehensive documentation specialist who creates clear, thorough, and well-structured documentation',
          fileName: 'documentation-writer.md',
          url: 'https://ccoutputstyles.vercel.app/templates/documentation-writer'
        },
        {
          name: 'Test-Driven Developer',
          description: 'TDD advocate who writes tests first and ensures comprehensive test coverage',
          fileName: 'test-driven-developer.md',
          url: 'https://ccoutputstyles.vercel.app/templates/test-driven-developer'
        }
      ];
    }
    
    return templates;
  } catch (error) {
    // Return a hardcoded list as fallback
    return [
      {
        name: 'Critical Code Reviewer',
        description: 'Uncompromising technical reviewer focused on correctness, maintainability, and engineering truth over comfort',
        fileName: 'critical-code-reviewer.md',
        url: 'https://ccoutputstyles.vercel.app/templates/critical-code-reviewer'
      },
      {
        name: 'Friendly Tutor',
        description: 'Patient and encouraging teacher who explains concepts clearly and celebrates learning progress',
        fileName: 'friendly-tutor.md',
        url: 'https://ccoutputstyles.vercel.app/templates/friendly-tutor'
      },
      {
        name: 'Concise Engineer',
        description: 'Direct and efficient communicator who provides minimal but complete responses',
        fileName: 'concise-engineer.md',
        url: 'https://ccoutputstyles.vercel.app/templates/concise-engineer'
      },
      {
        name: 'Documentation Writer',
        description: 'Comprehensive documentation specialist who creates clear, thorough, and well-structured documentation',
        fileName: 'documentation-writer.md',
        url: 'https://ccoutputstyles.vercel.app/templates/documentation-writer'
      },
      {
        name: 'Test-Driven Developer',
        description: 'TDD advocate who writes tests first and ensures comprehensive test coverage',
        fileName: 'test-driven-developer.md',
        url: 'https://ccoutputstyles.vercel.app/templates/test-driven-developer'
      }
    ];
  }
}