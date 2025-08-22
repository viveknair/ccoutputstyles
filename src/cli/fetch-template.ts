import axios from 'axios';
import * as cheerio from 'cheerio';
import matter from 'gray-matter';
import { OutputStyleTemplate } from '../shared/types';

export async function fetchTemplate(url: string): Promise<OutputStyleTemplate> {
  try {
    // Fetch the HTML content
    const response = await axios.get(url);
    const html = response.data;

    // Parse HTML with cheerio
    const $ = cheerio.load(html);

    // Look for template content in a data attribute or specific element
    let templateContent = '';
    let templateName = '';
    let templateDescription = '';

    // Try to find template in data attribute first
    const templateElement = $('[data-template-content]');
    if (templateElement.length > 0) {
      templateContent = templateElement.attr('data-template-content') || '';
      templateName = templateElement.attr('data-template-name') || '';
      templateDescription = templateElement.attr('data-template-description') || '';
    }

    // If not found in data attributes, try to find in script tag
    if (!templateContent) {
      const scriptTag = $('script#template-data');
      if (scriptTag.length > 0) {
        try {
          const data = JSON.parse(scriptTag.html() || '{}');
          templateContent = data.content || '';
          templateName = data.name || '';
          templateDescription = data.description || '';
        } catch (e) {
          // JSON parse failed
        }
      }
    }

    // If still not found, try to extract from markdown code block
    if (!templateContent) {
      const codeBlock = $('pre code.language-markdown, pre code.language-md');
      if (codeBlock.length > 0) {
        templateContent = codeBlock.text();
      }
    }

    if (!templateContent) {
      throw new Error('Could not find template content in the provided URL');
    }

    // Parse the template content to extract metadata
    const parsed = matter(templateContent);
    
    // Use extracted metadata or fallback to parsed front matter
    const name = templateName || parsed.data.name || 'untitled';
    const description = templateDescription || parsed.data.description || 'No description provided';
    
    // Generate filename from name
    const fileName = name.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    return {
      name,
      description,
      content: templateContent,
      fileName: `${fileName}.md`
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Template not found at the provided URL');
      }
      throw new Error(`Failed to fetch template: ${error.message}`);
    }
    throw error;
  }
}