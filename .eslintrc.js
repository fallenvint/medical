module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
        '**/*.js?(x)',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/no-unresolved': 'error',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'js/bootstrap.*', 'css/*'],
  plugins: ['import'],
};
