module.exports = {
    root: true,
    extends: ['@react-native-community'],
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint', 'import'],
    ignorePatterns: ['*/jest/setup.js', '/coverage/'],
    rules: {
        'no-param-reassign': 'error',
        'react/jsx-curly-brace-presence': [
            'error',
            { props: 'never', children: 'never' },
        ],
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    ['parent', 'sibling'],
                    'index',
                    'object',
                    'type',
                ],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'builtin',
                        position: 'before',
                    },
                    {
                        pattern: 'react-native',
                        group: 'builtin',
                        position: 'before',
                    },
                    {
                        pattern: './styles',
                        group: 'index',
                        position: 'after',
                    },
                    {
                        pattern: '**/assets',
                        group: 'sibling',
                        position: 'after',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react', 'react-native', 'styles'],
            },
        ],
    },
};
