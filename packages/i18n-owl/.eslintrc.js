/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: ["../../configs/build.eslintrc.json"],
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: "tsconfig.json",
    },
    ignorePatterns: ["types", "index.js"],
  };
  