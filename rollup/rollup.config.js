import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sass from 'rollup-plugin-sass';

const overrides = {
  compilerOptions: { declaration: true },
  exclude: ['src/**/*.stories.tsx', 'src/**/*.stories.mdx', 'src/**/*.spec.tsx', 'src/setupTests.ts'],
};

const config = {
  input: 'src/index.tsx',
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfigOverride: overrides }),
    sass({ output: 'dist/index.css' }),
  ],
};

export default config;