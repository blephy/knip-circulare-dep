const ignores = require('./ignores.cjs');

const tsConfigFilename = './tsconfig.eslint.json';

module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2023: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  ignorePatterns: ignores,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: tsConfigFilename,
    projectFolderIgnoreList: ignores,
  },
};
