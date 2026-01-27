module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
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
};
