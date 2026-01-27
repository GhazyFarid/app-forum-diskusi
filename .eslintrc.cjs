module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },

  extends: ['airbnb', 'airbnb/hooks', 'plugin:storybook/recommended'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-console': 'warn',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'no-alert': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },

  overrides: [
    {
      files: ['cypress/**/*.js', 'cypress/**/*.jsx', '**/*.cy.js', '**/*.cy.jsx'],
      env: {
        'cypress/globals': true,
        browser: true,
      },
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },

    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
        node: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-unused-expressions': 'off',
      },
    },

    {
      files: ['src/stories/**/*.{js,jsx,ts,tsx}'],
      rules: {
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/no-unescaped-entities': 'off',
      },
    },
  ],
};
