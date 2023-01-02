import { defineConfig } from 'vite';
import path, { basename } from 'path';
import dts from 'vite-plugin-dts';
import solidPlugin from 'vite-plugin-solid';
import cssInline from 'vite-plugin-solidjs-sense-css-inline';
import senseCssModule from 'vite-plugin-sense-css-module';

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: (name, filename) => {
        const res = `SUI_${basename(filename).replace(/\.module\.scss(.*)$/, '')}_${name}`;
        return res;
      },
    },
  },
  plugins: [
    cssInline(),
    senseCssModule({
      classAttributeRegex: /class(Name|List)?|activeClass/,
    }),
    solidPlugin(),
    dts({
      tsConfigFilePath: 'tsconfig.build.json',
      insertTypesEntry: true,
      noEmitOnError: true,
      skipDiagnostics: false,
      logDiagnostics: true,
    }),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['solid-js', 'solid-js/web', 'solid-js/store'],
    },
  },
});
