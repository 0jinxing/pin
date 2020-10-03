import * as path from 'path';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const plugins = [
  resolve({ browser: true }),
  typescript(),
  commonjs(),
  postcss({ extract: true, minimize: true }),
  terser()
];

const packages = ['snapshot', 'record', 'replay'];

const config = packages.reduce((config, pkg) => {
  return [
    ...config,
    {
      input: path.resolve(`packages/${pkg}/index.ts`),
      plugins,
      output: [
        {
          name: pkg,
          file: path.resolve(`packages/${pkg}/dist/index.cjs.js`),
          format: 'cjs',
          sourcemap: true
        },
        {
          name: pkg,
          file: path.resolve(`packages/${pkg}/dist/index.esm.js`),
          format: 'esm',
          sourcemap: true
        },
        {
          name: pkg,
          file: path.resolve(`packages/${pkg}/dist/index.iife.js`),
          format: 'iife',
          sourcemap: true
        }
      ]
    }
  ];
}, []);

export default config;
