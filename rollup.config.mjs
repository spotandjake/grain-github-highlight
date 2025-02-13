import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/content.ts',
  output: {
    file: 'dist/content.js',
    format: 'es',
    inlineDynamicImports: true
  },
  plugins: [typescript(), json(), resolve()]
};