import * as fs from 'fs/promises';
import * as path from 'path';
import { OutputStyleTemplate } from '../shared/types';
import { CLAUDE_OUTPUT_STYLES_DIR } from '../shared/constants';
import chalk from 'chalk';

export async function installStyle(template: OutputStyleTemplate, projectLevel: boolean = false): Promise<string> {
  try {
    // Determine the target directory
    let targetDir: string;
    
    if (projectLevel) {
      // Install to project level (.claude/output-styles)
      targetDir = path.join(process.cwd(), '.claude', 'output-styles');
    } else {
      // Install to user level (~/.claude/output-styles)
      targetDir = CLAUDE_OUTPUT_STYLES_DIR;
    }

    // Create the directory if it doesn't exist
    await fs.mkdir(targetDir, { recursive: true });

    // Write the template file
    const filePath = path.join(targetDir, template.fileName);
    
    // Check if file already exists
    try {
      await fs.access(filePath);
      const overwrite = await promptOverwrite(template.fileName);
      if (!overwrite) {
        throw new Error('Installation cancelled by user');
      }
    } catch (error) {
      // File doesn't exist, proceed with installation
    }

    await fs.writeFile(filePath, template.content, 'utf-8');
    
    return filePath;
  } catch (error) {
    throw new Error(`Failed to install template: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function promptOverwrite(fileName: string): Promise<boolean> {
  // File exists, will be overwritten
  return true;
}