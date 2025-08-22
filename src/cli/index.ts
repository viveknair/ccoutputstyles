#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { fetchTemplate } from './fetch-template';
import { installStyle } from './install-style';

const program = new Command();

program
  .name('ccoutputstyle')
  .description('Install Claude Code output style templates from URLs')
  .version('1.0.0');

program
  .command('install')
  .description('Install an output style template from a URL')
  .option('-u, --url <url>', 'URL of the template to install')
  .option('-n, --name <name>', 'Custom name for the template')
  .option('-p, --project', 'Install to project level (.claude/output-styles) instead of user level')
  .action(async (options) => {
    try {
      if (!options.url) {
        console.error(chalk.red('Error: --url option is required'));
        process.exit(1);
      }

      console.log(chalk.cyan('Fetching template from:'), options.url);
      const template = await fetchTemplate(options.url);
      
      if (options.name) {
        template.fileName = options.name;
      }

      console.log(chalk.cyan('Installing template:'), template.name);
      const installedPath = await installStyle(template, options.project);
      
      console.log(chalk.green('✅ Template installed successfully!'));
      console.log(chalk.gray('Location:'), installedPath);
    } catch (error) {
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  });

// Default action when just using npx ccoutputstyle --url <url>
program
  .option('-u, --url <url>', 'URL of the template to install')
  .option('-n, --name <name>', 'Custom name for the template')
  .option('-p, --project', 'Install to project level instead of user level')
  .action(async (options) => {
    if (options.url) {
      try {
        console.log(chalk.cyan('Fetching template from:'), options.url);
        const template = await fetchTemplate(options.url);
        
        if (options.name) {
          template.fileName = options.name;
        }

        console.log(chalk.cyan('Installing template:'), template.name);
        const installedPath = await installStyle(template, options.project);
        
        console.log(chalk.green('✅ Template installed successfully!'));
        console.log(chalk.gray('Location:'), installedPath);
      } catch (error) {
        console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
      }
    } else {
      program.help();
    }
  });

program.parse(process.argv);