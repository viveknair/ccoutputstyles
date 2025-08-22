#!/usr/bin/env node

import { Command } from 'commander';
import * as p from '@clack/prompts';
import chalk from 'chalk';
import { fetchTemplate } from './fetch-template';
import { installStyle } from './install-style';

const program = new Command();

async function installTemplate(url: string, options: any) {
  p.intro(chalk.cyan('🎨 Claude Code Output Style Installer'));

  const s = p.spinner();
  
  try {
    // Fetch template
    s.start('Fetching template from URL');
    const template = await fetchTemplate(url);
    s.stop(`Found template: ${chalk.bold(template.name)}`);

    // Show template info
    p.note(template.description, 'Template Description');

    // Ask for confirmation
    const shouldInstall = await p.confirm({
      message: 'Would you like to install this template?',
      initialValue: true,
    });

    if (!shouldInstall || p.isCancel(shouldInstall)) {
      p.cancel('Installation cancelled');
      process.exit(0);
    }

    // Ask for installation location if not specified
    let installLocation = options.project;
    if (!options.project && !options.global) {
      const location = await p.select({
        message: 'Where would you like to install this template?',
        options: [
          {
            value: 'global',
            label: 'Global (~/.claude/output-styles)',
            hint: 'Available for all projects',
          },
          {
            value: 'project',
            label: 'Project (./.claude/output-styles)',
            hint: 'Only for current project',
          },
        ],
        initialValue: 'global',
      });

      if (p.isCancel(location)) {
        p.cancel('Installation cancelled');
        process.exit(0);
      }

      installLocation = location === 'project';
    }

    // Custom name
    let finalName = template.fileName;
    if (!options.name) {
      const wantCustomName = await p.confirm({
        message: 'Would you like to use a custom name for this template?',
        initialValue: false,
      });

      if (wantCustomName && !p.isCancel(wantCustomName)) {
        const customName = await p.text({
          message: 'Enter custom name (without .md extension):',
          placeholder: template.fileName.replace('.md', ''),
          validate: (value) => {
            if (!value) return 'Name is required';
            if (!/^[a-z0-9-]+$/i.test(value)) return 'Name must contain only letters, numbers, and hyphens';
            return;
          },
        });

        if (!p.isCancel(customName)) {
          finalName = `${customName}.md`;
          template.fileName = finalName;
        }
      }
    } else {
      template.fileName = options.name.endsWith('.md') ? options.name : `${options.name}.md`;
    }

    // Install
    s.start('Installing template');
    const installedPath = await installStyle(template, installLocation);
    s.stop('Template installed successfully!');

    p.outro(
      chalk.green('✅ Installation complete!\n') +
      chalk.gray(`Location: ${installedPath}\n`) +
      chalk.gray(`Template: ${template.name}`)
    );

  } catch (error) {
    s.stop('Installation failed');
    p.outro(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
    process.exit(1);
  }
}

program
  .name('ccoutputstyles')
  .description('Install Claude Code output style templates from URLs')
  .version('1.0.0');

program
  .command('install')
  .description('Install an output style template from a URL')
  .option('-u, --url <url>', 'URL of the template to install')
  .option('-n, --name <name>', 'Custom name for the template')
  .option('-p, --project', 'Install to project level (.claude/output-styles)')
  .option('-g, --global', 'Install to global level (~/.claude/output-styles)')
  .action(async (options) => {
    if (!options.url) {
      p.intro(chalk.cyan('🎨 Claude Code Output Style Installer'));
      
      const url = await p.text({
        message: 'Enter the template URL:',
        placeholder: 'https://ccoutputstyles.vercel.app/templates/critical-code-reviewer',
        validate: (value) => {
          if (!value) return 'URL is required';
          try {
            new URL(value);
            return;
          } catch {
            return 'Please enter a valid URL';
          }
        },
      });

      if (p.isCancel(url)) {
        p.cancel('Installation cancelled');
        process.exit(0);
      }

      await installTemplate(url as string, options);
    } else {
      await installTemplate(options.url, options);
    }
  });

// Default action when just using npx ccoutputstyle --url <url>
program
  .option('-u, --url <url>', 'URL of the template to install')
  .option('-n, --name <name>', 'Custom name for the template')
  .option('-p, --project', 'Install to project level')
  .option('-g, --global', 'Install to global level')
  .action(async (options) => {
    if (options.url) {
      await installTemplate(options.url, options);
    } else {
      // Interactive mode
      p.intro(chalk.cyan('🎨 Claude Code Output Style Installer'));
      
      const url = await p.text({
        message: 'Enter the template URL:',
        placeholder: 'https://ccoutputstyles.vercel.app/templates/critical-code-reviewer',
        validate: (value) => {
          if (!value) return 'URL is required';
          try {
            new URL(value);
            return;
          } catch {
            return 'Please enter a valid URL';
          }
        },
      });

      if (p.isCancel(url)) {
        p.cancel('Installation cancelled');
        process.exit(0);
      }

      await installTemplate(url as string, options);
    }
  });

program.parse(process.argv);