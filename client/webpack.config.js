module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './client/dist/js/index.js', // Update the path to the entry point in the "dist" directory
      install: './client/dist/js/install.bundle.js', // Update the path to the "install" file in the "dist" directory
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/src/index.html', // Update the path to your HTML template
        filename: 'index.html', // Output HTML filename
        chunks: ['main'], // Entry chunks to include in this HTML file
      }),
      new InjectManifest({
        swSrc: './client/src-sw.js', // Update the path to your service worker source
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        name: 'Your PWA Text Editor',
        short_name: 'Text Editor',
        description: 'A progressive web app for text editing.',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        icons: [
          {
            src: './client/src/images/logo.png', // Update the path to your image
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
