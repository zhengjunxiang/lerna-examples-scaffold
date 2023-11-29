/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "./configs/base.eslintrc.json",
    "./configs/warnings.eslintrc.json",
    "./configs/errors.eslintrc.json",
    "./configs/xss.eslintrc.json",
  ],
  ignorePatterns: ["**/{node_modules,lib}", "scripts"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "tsconfig.json",
  },
};
