const path = require('path');

module.exports = (env) => {
    const isDev = !(env && env.production);

    console.log(`Environment: ${isDev ? 'development' : 'production'}`);

    return {
        resolve: {
            extensions: ['.js', '.ts'],
            modules: [
                './src',
                './node_modules'
            ]
        },
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
            libraryTarget: 'umd'
        },
        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    exclude: [
                        'node_modules',
                        '**/*.test.ts'
                    ],
                    use: ['awesome-typescript-loader']
                }
            ]
        },
        target: 'node'
    };
}