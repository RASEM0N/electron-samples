module.exports = {
    env: {
        browser: true,
        amd: true,
        node: true,
    },
    plugins: ['@typescript-eslint', 'prettier'],
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'arrow-body-style': ['error', 'always'],
        'prefer-arrow-callback': 'error',
        'arrow-spacing': 'error',
        'prefer-promise-reject-errors': 'off',
        'no-debugger': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
    },
}
