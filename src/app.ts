#!/usr/bin/env node

import { Command } from 'commander';
import { setupCommands } from './commands';

const program = new Command();
setupCommands(program);

program.showHelpAfterError();
program.showSuggestionAfterError();
program.version('0.1.0', '-v, --version');
program.description('GEAR. CLI tool to generate js wrapper around your program');
program.parse(process.argv);
