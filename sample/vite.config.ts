import { basename } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import senseCssModule from 'vite-plugin-sense-css-module';

// @ts-ignore
const env = process.env.NODE_ENV;

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: (name, filename) => {
        const res = `SUIS_${basename(filename).replace(/\.module\.scss(.*)$/, '')}_${name}`;
        return res;
      },
    },
  },
  plugins: [senseCssModule({ classAttributeRegex: /(class(Name|List)?|activeClass)/ }), solidPlugin()],
  base: env === 'production' ? '/solidjs-sense-ui' : '/',
  build: {
    target: 'esnext',
  },
});
