import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.js', '.ts', '.tsx'];
export default {
  input: './src/index.ts',
  output: [
    {
      file: './lib/umd/i18nWebOpenApiBackend.min.js',
      format: 'umd',
      name: 'i18nWebOpenApiBackend',
    },
  ],
  plugins: [
    typescript({
      compilerOptions: {
        outDir: 'lib/umd',
        importHelpers: false,
        declaration: false,
        module: 'es6',
        target: 'es5',
      },
    }),
    commonjs(),
    nodeResolve({
      extensions,
    }),
    babel({
      extensions: isProd
        ? ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
        : ['.js', '.jsx', '.es6', '.es', '.mjs'],
      babelHelpers: 'bundled',
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
