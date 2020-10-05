const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: {
                    loader: 'url-loader',
                }
            },
            {
                test: /\.html$/,
            }
        ]
    },
    node: {
        fs: "empty"
    },
    externals: [
        {
            xmlttprequest: '{XMLHttpRequest:XMLHttpRequest}'
        }
    ],
    plugins: [
        new HtmlWebpackPlugin({
            title: "Lucky Turntable",
            template: './src/index.html'
        })
    ]
}