import { basename } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

// @ts-ignore
const env = process.env.NODE_ENV;

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: (name, filename) => {
        return `SUI_${basename(filename).replace(/\.module\.scss$/, '')}_${name}`;
      },
    },
  },
  plugins: [solidPlugin()],
  base: env === 'production' ? '/solidjs-sense-ui' : '/',
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
