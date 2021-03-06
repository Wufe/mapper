const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
        entry:{
            mapper: './src/index.ts'
        },
        output: {
            path: path.resolve(__dirname, isDev ? 'build' : 'dist'),
            filename: '[name].js',
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
                    use: ['ts-loader']
                }
            ]
        },
        target: 'web',
        plugins: isDev ?
            [] : [
                new UglifyJSPlugin()
            ]
    };
}