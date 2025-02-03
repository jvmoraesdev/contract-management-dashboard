import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import pluginNext from '@next/eslint-plugin-next';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
    plugins: {
      '@next/next': pluginNext
    },
    rules: {
      ...pluginNext.configs.recommended.rules
    }
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier,
  {
    settings: { react: { version: 'detect' } }
  }
];
