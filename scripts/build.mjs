import { cpSync, mkdirSync } from 'node:fs';
mkdirSync('dist', { recursive: true });
cpSync('public', 'dist', { recursive: true });
console.log('Static website built in dist/.');
