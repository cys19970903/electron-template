module.exports = {
  extends: ['bebop','prettier'],
  parserOptions: {
    project: './tsconfig.json',
    extraFileExtensions: ['.json'],
  },
  rules: {
    'global-require': 0,
  },
};
