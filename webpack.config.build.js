const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractStyles = new ExtractTextPlugin('app.css');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets: ['env'],
                    }
                }

            },
            {
                test: /\.pcss$/,
                use: extractStyles.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 },
                        },
                        'postcss-loader',
                    ],
                }),
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [
        extractStyles,
    ],
};

module.exports = config;