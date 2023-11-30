import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

/**
 * 通过 process.env.BUILD_TYPE 区分构建属于 web 还是 mach-pro
 * mach-pro -> BUILD_TYPE: mach-pro
 * web -> BUILD_TYPE: web
 */
const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.js', '.ts', '.tsx'];
export default {
  treeshake: {
    moduleSideEffects: false,
  },
  input: './src/index.umd.ts',
  output: [
    {
      file: './lib/umd/i18nWeb.min.js',
      format: 'umd',
      name: 'i18nWeb',
    },
  ],
  plugins: [
    typescript({
      compilerOptions: {
        outDir: 'lib/umd',
        importHelpers: false,
        declaration: false,
        importHelpers: false,
        module: 'es6',
        target: 'es5',
      },
    }),
    commonjs(),
    nodeResolve({
      extensions,
    }),
    replace({
      values: {
        'process.env.BUILD_TYPE': JSON.stringify('web'),
      },
      preventAssignment: true,
    }),
    babel({
      extensions: isProd
        ? ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
        : ['.js', '.jsx', '.es6', '.es', '.mjs'],
      babelHelpers: 'bundled',
    }),
    replace({
      values: {
        'process.env.BUILD_TYPE': JSON.stringify('web'),
      },
      preventAssignment: true,
    }),
    process.env.NODE_ENV === 'production' &&
      terser({ format: { comments: false } }),
  ],
  onwarn(warning, warn) {
    const skipWarningCode = ['THIS_IS_UNDEFINED'];
    const { code } = warning;
    if (skipWarningCode.includes(code)) return;
    warn(warning);
  },
};
