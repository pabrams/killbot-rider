module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'plugin:import/typescript',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
  },
  'settings': {
    'import/resolver': {
      'node': {
        'paths': ['src'],
        'extensions': ['.ts', '.tsx', '.d.ts'],
      },
    },
  },
};
