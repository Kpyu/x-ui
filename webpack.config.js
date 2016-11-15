const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageName = require(path.join(process.cwd(), 'package.json')).name;
const assetsPath = path.join(__dirname, 'dist');
const publicPathConfig = {
  production: '',
  beta: '',
  testing: '',
  default: ''
};

function makeConfig(env) {
  var config = {};
  var envStr = env || 'development';
  var publicPath = publicPathConfig[envStr] || publicPathConfig.default;
  const entry = ['./index.js'];
  config = {
    context: __dirname,
    entry: {
      [`${packageName}.min`]: entry
    },
    output: {
      publicPath: publicPath,
      path: assetsPath,
      filename: '[name].js',
      chunkFilename: '[name].js',
      library: packageName,
      libraryTarget: 'umd'
    },
    resolve: {
      alias: {
        [packageName]: process.cwd(),
        antd: path.join(__dirname, 'node_modules', 'antd')
      },
      extensions: ['', '.js', '.jsx', 'tsx']
    },
    module: {
      noParse: [],
      loaders: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          compact: false,
          presets: ['stage-0', 'es2015']
        }
      }, {
        test: /\.tsx?$/,
        loaders: ['babel', 'ts']
      },
      //  {
      //   test: /\.(tsx|jsx?)$/,
      //   loader: 'es3ify-loader'
      // },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss')
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!less')
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      }, {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=10000&name=[path][name].[hash].[ext]'
      }, {
        test: /\.(jpg|jpeg|gif|png)$/i,
        loader: 'file-loader?limit=10000'
      }]
    },
    postcss: [autoprefixer({
      browsers: ['last 2 versions']
    })],
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },
    // babel: {
    //   plugins: [
    //     require.resolve('babel-plugin-import'), [{
    //       style: true,
    //       libraryName: packageName,
    //       libraryDirectory: 'components'
    //     }, {
    //       style: 'css',
    //       libraryName: 'fddui'
    //     }]
    //   ]
    // },
    'ts': {
      'transpileOnly': true,
      'compilerOptions': {
        'target': 'es6',
        'jsx': 'preserve',
        'moduleResolution': 'node',
        'declaration': false,
        'sourceMap': true
      }
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'components'
          // minChunks: 2
      }),
      new ExtractTextPlugin('name.css', {
        allchunks: true
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new webpack.NoErrorsPlugin(),
      new webpack.ContextReplacementPlugin(/.*$/, /a^/)
    ]
  };
  return config;
}
module.exports = makeConfig;
