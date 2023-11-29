import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import * as rollup from 'rollup';
import type { RollupOptions } from 'rollup';
import path from 'path';
import log from '../uitls/log';

const extensions = ['.js', '.ts'];
const getConfig = (dest, name, filename): RollupOptions => {
  const ext = path.extname(filename);
  const isTs = ext === '.ts';
  const config = {
    input: `${dest}/${filename}`,
    output: {
      file: `${dest}/resources.min.js`,
      format: 'umd',
      name,
    },

    plugins: [
      json(),
      commonjs(),
      nodeResolve({
        extensions,
      }),
      babel({
        extensions,
        babelHelpers: 'bundled',
      }),
      terser({ format: { comments: false } }),
    ],
    onwarn(warning, warn) {
      const skipWarningCode = ['THIS_IS_UNDEFINED'];
      const { code } = warning;
      if (skipWarningCode.includes(code)) return;
      warn(warning);
    },
  };
  if (isTs) {
    config.plugins.unshift(
      // @ts-ignore
      typescript({
        tsconfig: false,
        compilerOptions: {
          outDir: dest,
          declaration: false,
          importHelpers: false,
          module: 'ES2015',
          target: 'es5',
          rootDir: dest,
          esModuleInterop: true,
          skipLibCheck: true,
          moduleResolution: 'Node',
          removeComments: true,
          resolveJsonModule: true,
        },
        include: [dest],
      }),
    );
  }
  return config as RollupOptions;
};
async function buildScript({ dest, globalName, filename }) {
  log('🚀  开始生成资源 script 脚本文件\n', 'green');
  const rollupOptions = getConfig(dest, globalName, filename);
  const bundle = await rollup.rollup(rollupOptions);
  await bundle.write(rollupOptions.output as rollup.OutputOptions);
  await bundle.close();
  log(`✅  语言包 script 脚本文件生成成功：${dest}/resources.min.js`, 'green');
}

export default buildScript;
