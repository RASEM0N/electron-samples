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
        entry: './src/renderer/scripts/index.ts',
        ...config,
    },
    preload: {
        entry: './src/preload/index.js',
        ...config,
    },
    main: {
        entry: './src/main/index.ts',
        ...config,
    },
}
