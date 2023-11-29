import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

/**
 * 通过 process.env.BUILD_TYPE 区分构建属于 web 还是 mach-pro
 * mach-pro -> BUILD_TYPE: mach-pro
 * web -> BUILD_TYPE: web
 */
const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.js', '.ts', '.tsx'];
const external = ['i18next', 'i18next-icu', 'react-i18next'];
export default {
  treeshake: {
    moduleSideEffects: false,
  },
  input: './src/index.ts',
  output: [
    {
      dir: './lib',
      format: 'esm',
    },
  ],
  external,
  plugins: [
    typescript(),
    commonjs(),
    nodeResolve({
      extensions,
    }),
    babel({
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts'],
      babelHelpers: 'bundled',
    }),
    replace({
      values: {
        'process.env.BUILD_TYPE': JSON.stringify('web'),
      },
      preventAssignment: true,
    }),
  ],
  onwarn(warning, warn) {
    const skipWarningCode = ['THIS_IS_UNDEFINED'];
    const { code } = warning;
    if (skipWarningCode.includes(code)) return;
    warn(warning);
  },
};
