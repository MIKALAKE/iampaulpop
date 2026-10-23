// Builds src/show/assets/Paul_Pop_CV.pdf from Paul_Pop_CV.html with headless Chrome.
// Usage: node cv/build.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const dir = import.meta.dirname;
const output = join(dir, '..', 'src/show/assets/Paul_Pop_CV.pdf');

// Same rule as the site (CAREER_START_DATE): one more year every June 1st since 2022.
const now = new Date();
const years = now.getFullYear() - 2022 - (now < new Date(now.getFullYear(), 5, 1) ? 1 : 0);

const html = readFileSync(join(dir, 'Paul_Pop_CV.html'), 'utf8').replaceAll('{{years}}', years);
const tmp = join(dir, '.cv-build.html');
writeFileSync(tmp, html);

try {
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${output}`,
    `file://${tmp}`,
  ], { stdio: 'ignore' });
  console.log(`Wrote ${output} (${years}+ years)`);
} finally {
  rmSync(tmp, { force: true });
}
