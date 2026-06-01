import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'next-env.d.ts',
      'next.config.js',
      'eslint.config.mjs',
      'postcss.config.js',
    ],
  },

  {
    files: [
      '*.config.{js,mjs,cjs,ts,mts,cts}',
      '*.config.*',
      'vite.config.*',
      'vitest.config.*',
      'eslint.config.*',
      'next.config.*',
      'postcss.config.*',
    ],
    extends: [tseslint.configs.disableTypeChecked],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      prettier: prettierPlugin,
      '@next/next': nextPlugin,
      'jsx-a11y': jsxA11y,
    },

    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },

    rules: {
      // Next.js Core Web Vitals
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // React
      ...reactPlugin.configs.recommended.rules,

      // React Hooks
      ...reactHooksPlugin.configs.recommended.rules,

      '@typescript-eslint/array-type': ['error', { default: 'generic' }],

      '@typescript-eslint/consistent-indexed-object-style': [
        'error',
        'index-signature',
      ],

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],

      'jsx-a11y/control-has-associated-label': 'error',

      'jsx-a11y/label-has-for': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],

      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',

      'import/no-absolute-path': 'off',
      'import/prefer-default-export': 'off',

      'comma-dangle': ['error', 'only-multiline'],
      'object-curly-newline': ['error', { consistent: true }],

      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

      'react/jsx-props-no-spreading': 'off',

      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],

      'no-param-reassign': [
        'error',
        {
          props: false,
        },
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/require-default-props': 'off',

      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-var-requires': 'off',

      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      quotes: ['error', 'single'],
      'max-len': ['off', { ignoreUrls: true }],
      'arrow-parens': ['error', 'always'],

      'prettier/prettier': 'error',
    },
  },

  prettierConfig
);
