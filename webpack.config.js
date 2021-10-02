/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require('copy-webpack-plugin')
const IS_DEV = process.env.NODE_ENV === 'development'

const rules = [
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },
]

const config = {
    devtool: IS_DEV ? 'eval-source-map' : 'source-map',
    module: {
        rules,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}

module.exports = {
    renderer: {
        entry: './src/renderer/index.ts',
        ...config,
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'src/renderer/assets', to: 'assets' },
                    { from: 'src/renderer/windows', to: 'windows' },
                ],
            }),
        ],
    },
    preload: {
        entry: './src/preload/index.js',
        ...config,
    },
    main: {
        entry: './src/main/index.ts',
        ...config,
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'src/resources', to: '../resources' },
                    // ...
                ],
            }),
        ],
    },
}
