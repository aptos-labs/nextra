// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    webextensions: true,
  },
  extends: ['@aptos-labs/fe-eslint-config', 'plugin:react/jsx-runtime'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: ['tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["panda.config.ts", "vite.config.ts"],
};
