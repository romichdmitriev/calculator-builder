module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'plugin:storybook/recommended',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    files: ['*.js', '*.jsx'],
    ecmaVersion: 8,
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true,
    },
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-shadow': 'off',
        'react/prop-types': 0,
        'react/require-default-props': 0,
        'import/extensions': 0,
        'import/order': 0,
        'react/function-component-definition': [
          0,
          {
            namedComponents: 'function-declaration',
          },
        ],
      },
    },
  ],
};
