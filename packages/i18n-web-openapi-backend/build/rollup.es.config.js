import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const extensions = ['.js', '.ts', '.tsx'];
const external = ['i18next'];
export default {
  input: './src/index.ts',
  output: {
    dir: './lib/esm',
    format: 'esm',
  },
  external,
  plugins: [
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
    commonjs(),
    nodeResolve({
      extensions,
    }),
    babel({
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts'],
      babelHelpers: 'bundled',
    }),
  ],
  onwarn(warning, warn) {
    const skipWarningCode = ['THIS_IS_UNDEFINED'];
    const { code } = warning;
    if (skipWarningCode.includes(code)) return;
    warn(warning);
  },
};
