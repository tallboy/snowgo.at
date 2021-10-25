module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
  },
  // TODO: This can be cleaned up once the built files
  // aren't included in the repo. See issue #16
  ignorePatterns: [
    'vendor/**',
    '**/*.min.js',
  ],
};
