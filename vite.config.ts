import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
// @ts-expect-error - vite-plugin-eslint is not typed
import viteEslint from 'vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { splashScreen } from 'vite-plugin-splash-screen';

// Add ImportMeta type augmentation for 'url' property

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteEslint(),
    splashScreen({
      logoSrc: fileURLToPath(new URL('src/show/assets/react.svg', import.meta.url)),
      splashBg: 'hsl(220, 20%, 8%)',
      loaderType: 'dots',
      loaderBg: '#ffffff',
      minDurationMs: 500,
    }),
  ],
  server: {
    open: true, // automatically open the app in the browser
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
