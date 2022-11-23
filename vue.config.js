module.exports = {
  outputDir: '../dist',
  assetsDir: './static',
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Admin',
    },
    salon: {
      entry: 'src/client.js',
      template: 'public/client.html',
      title: 'Salon',
    },
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
    } else {
      // mutate for development...
      config.devtool = 'source-map';
    }
  },
  chainWebpack: config => {
    config.output.filename('static/[name]_bundle.js');
    config.optimization.splitChunks(false);
    config.resolve.alias.set('__STATIC__', 'static');
  },
  css: {
    extract: {
      filename: 'static/[name]_bundle.css',
      chunkFilename: 'static/[name]_bundle.css',
    },
  },
};
