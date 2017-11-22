//Konfiguracja Webpack
module.exports = {
    entry: "./js/entry.jsx",
    output: { filename: "./js/out.js" },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx$/,  exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'stage-2' , 'react'] }
            },
            {   test: /\.css$/,
                loader: "style-loader!css-loader" ,

            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true,
                      optipng: {
                      enabled: false,
                      },
                    },
                  },
                ],
              }
        ]
    }
}
