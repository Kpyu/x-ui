const path = require('path');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

function generatorPicker(module) {
  const tester = new RegExp(`^docs/${module}`);
  return function (markdown) {
    const filename = markdown.meta.filename;
    console.log('generatorPicker-------', filename)
    if (tester.test(filename) && !/\/demo$/.test(path.dirname(filename))) {
      return {
        meta: markdown.meta
      }
    }
  }
}

module.exports = {
  port: 8002,
  source: [
    './components',
    './docs',
  ],
  lazyLoad: true,
  pick: {
    components: function (markdownData) {
      const filename = markdownData.meta.filename;
      if (!/^components/.test(filename) ||
        /\/demo$/.test(path.dirname(filename))) {
        return;
      }
      return {
        meta: markdownData.meta,
        description: markdownData.description
      };
    },
    'docs/pattern': generatorPicker('pattern')
  },
  theme: './site/theme',
  htmlTemplate: './site/theme/static/template.html',
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2&keepElem',
    'bisheng-plugin-react?lang=__react',
  ],
  doraConfig: {
    verbose: true
  },
  webpackConfig(config) {
    config.devtool = 'inline-source-map';
    config.plugins.push(new CSSSplitWebpackPlugin({}));
    config.resolve.alias = {
      'fddui/lib': path.join(process.cwd(), 'components'),
      // site: path.join(process.cwd(), 'site'),
      'react-router': 'react-router/umd/ReactRouter'
    };
    config.babel.plugins.push([
      require.resolve('babel-plugin-transform-runtime'), {
        poliyfill: false,
        regenerator: true
      }
    ]);
    config.babel.plugins.push([
      require.resolve('babel-plugin-import'), {
        style: true,
        libraryName: 'FddUI',
        libraryDirectory: 'components'
      }
    ]);
    // config.module.loaders.push({
    //   test: /\.jsx$/,
    //   exclude: /node_modules/,
    //   loader: 'babel'
    // })
    return config;
  }
};