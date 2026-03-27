import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');
const noJekyllPath = join(distDir, '.nojekyll');

if (!existsSync(distDir)) {
  throw new Error('The dist directory does not exist. Run the web export before preparing GitHub Pages output.');
}

if (!existsSync(indexPath)) {
  throw new Error('The exported web app is missing dist/index.html.');
}

copyFileSync(indexPath, notFoundPath);
writeFileSync(noJekyllPath, '');
