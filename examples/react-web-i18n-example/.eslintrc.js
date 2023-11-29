/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: ["../../configs/build.eslintrc.json"],
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: "tsconfig.json",
    },
    ignorePatterns: ["dist", "webpack.config.js"],
  };
  