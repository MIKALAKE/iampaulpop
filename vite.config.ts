import path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { defineConfig, type Plugin, type ResolvedConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
// @ts-expect-error - vite-plugin-eslint is not typed
import viteEslint from 'vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

import { renderSeo } from './seo.config';

/**
 * Renders the static SEO block into index.html, then emits a second entry point
 * at /en/index.html carrying the English tags. Social crawlers don't run JS, so
 * each language needs its own URL with its own <head> — Helmet can't reach them.
 */
const seo = (): Plugin => {
  let config: ResolvedConfig;

  return {
    name: 'seo-i18n',

    configResolved(resolved) {
      config = resolved;
    },

    // Injects the Romanian block — in dev and in the built index.html alike.
    transformIndexHtml: html => html.replace('<!--seo-->', renderSeo('ro')),

    async closeBundle() {
      if (config.command !== 'build') return;

      const outDir = path.resolve(config.root, config.build.outDir);
      const romanian = await readFile(path.join(outDir, 'index.html'), 'utf-8');

      const english = romanian
        .replace(renderSeo('ro'), renderSeo('en'))
        .replace('<html lang="ro">', '<html lang="en">');

      if (english === romanian) {
        throw new Error('seo-i18n: could not swap the Romanian SEO block for the English one');
      }

      await mkdir(path.join(outDir, 'en'), { recursive: true });
      await writeFile(path.join(outDir, 'en', 'index.html'), english);
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteEslint(), seo()],
  server: {
    open: true, // automatically open the app in the browser
    port: 5176,
  },
  resolve: {
    alias: [
      // SHADCNUI
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },

      // In-house aliases
      {
        find: 'Root',
        replacement: fileURLToPath(new URL('.', import.meta.url)),
      },
      {
        find: 'Root/package.json',
        replacement: fileURLToPath(new URL('./package.json', import.meta.url)),
      },

      // Process aliases
      {
        find: 'Api',
        replacement: fileURLToPath(new URL('./src/process/api', import.meta.url)),
      },
      {
        find: 'Constants',
        replacement: fileURLToPath(new URL('./src/process/constants', import.meta.url)),
      },
      {
        find: 'Helpers',
        replacement: fileURLToPath(new URL('./src/process/helpers', import.meta.url)),
      },
      {
        find: 'Hooks',
        replacement: fileURLToPath(new URL('./src/process/hooks', import.meta.url)),
      },
      {
        find: 'Locales',
        replacement: fileURLToPath(new URL('./src/process/locales', import.meta.url)),
      },
      {
        find: 'Reducers',
        replacement: fileURLToPath(new URL('./src/process/reducers', import.meta.url)),
      },
      {
        find: 'Redux',
        replacement: fileURLToPath(new URL('./src/process/redux', import.meta.url)),
      },
      {
        find: 'Repositories',
        replacement: fileURLToPath(new URL('./src/process/repositories', import.meta.url)),
      },
      {
        find: 'Routes',
        replacement: fileURLToPath(new URL('./src/process/routes', import.meta.url)),
      },
      {
        find: 'Sagas',
        replacement: fileURLToPath(new URL('./src/process/sagas', import.meta.url)),
      },
      {
        find: 'Selectors',
        replacement: fileURLToPath(new URL('./src/process/selectors', import.meta.url)),
      },
      {
        find: 'Services',
        replacement: fileURLToPath(new URL('./src/process/services', import.meta.url)),
      },

      // Show aliases
      {
        find: 'Application',
        replacement: fileURLToPath(new URL('./src/show/application', import.meta.url)),
      },
      {
        find: 'Assets',
        replacement: fileURLToPath(new URL('./src/show/assets', import.meta.url)),
      },
      {
        find: 'Components',
        replacement: fileURLToPath(new URL('./src/show/components', import.meta.url)),
      },
      {
        find: 'Navigator',
        replacement: fileURLToPath(new URL('./src/show/navigator', import.meta.url)),
      },
      {
        find: 'Pages',
        replacement: fileURLToPath(new URL('./src/show/pages', import.meta.url)),
      },
      {
        find: 'Providers',
        replacement: fileURLToPath(new URL('./src/show/providers', import.meta.url)),
      },
    ],
  },
});
