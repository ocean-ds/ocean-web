import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import sass from 'rollup-plugin-sass';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({
      extract: 'ocean-ui.min.css',
      minimize: true,
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript(),
    sass(),
  ],
};
