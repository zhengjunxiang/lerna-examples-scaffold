import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {babel} from "@rollup/plugin-babel";
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

/**
 * 通过 process.env.BUILD_TYPE 区分构建属于 web 还是 mach-pro
 * mach-pro -> BUILD_TYPE: mach-pro
 * web -> BUILD_TYPE: web
 */
const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.js', '.ts', '.tsx'];
const external = ['axios'];
export default {
  treeshake: {
    moduleSideEffects: false,
  },
  input: './src/index.ts',
  output: [
    {
      dir: './lib/esm',
      format: 'esm',
    },
  ],
  external,
  plugins: [
    nodeResolve({
      extensions,
      preferBuiltins: true,
      mainFields: ['browser']
    }),
    commonjs(),
    typescript({
      compilerOptions: {
        outDir: 'lib/esm',
        declarationDir: 'lib/esm/types',
        declaration: true,
        importHelpers: false,
        module: 'ES2015',
        target: 'es5',
      },
    }),
    babel({
      exclude: "**/node_modules/**",
      babelHelpers: "runtime",
      // skipPreflightCheck: true,
      extensions: ['.js', '.ts'],
    }),
    replace({
      values: {
        'process.env.BUILD_TYPE': JSON.stringify('web'),
      },
      preventAssignment: true,
    }),
    json(),
    isProd && terser({ format: { comments: false } }),
  ],
  onwarn(warning, warn) {
    const skipWarningCode = ['THIS_IS_UNDEFINED'];
    const { code } = warning;
    if (skipWarningCode.includes(code)) return;
    warn(warning);
  },
};
