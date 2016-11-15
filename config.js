{
  'babel': {
    'cacheDirectory': '/var/folders/kp/dmdcnlh153xdpm4st40qh1mh0000gn/T',
    'presets': ['babel-preset-es2015-ie', 'babel-preset-react', 'babel-preset-stage-0'],
      'plugins': [
        'babel-plugin-add-module-exports',
        'babel-plugin-transform-decorators-legacy',
        ['babel-plugin-transform-runtime',
          {
            'polyfill': false
          }
        ],
      ['babel-plugin-import', [{
        'style': true,
        'libraryName': 'antd',
        'libraryDirectory': 'components'
      }]]
    ]
  },
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
  'output': {
    'path': '/Users/kpyu/github/ant-design/dist/',
    'filename': '[name].js',
    'chunkFilename': '[name].js',
    'library': 'antd',
    'libraryTarget': 'umd',
    'sourceMapFilename': '[file].map[query]',
    'hotUpdateChunkFilename': '[id].[hash].hot-update.js',
    'hotUpdateMainFilename': '[hash].hot-update.json',
    'crossOriginLoading': false,
    'hashFunction': 'md5',
    'hashDigest': 'hex',
    'hashDigestLength': 20,
    'sourcePrefix': '\t',
    'devtoolLineToLine': false
  },
  'devtool': '#sourcemap',
  'resolve': {
    'modulesDirectories': ['node_modules', 'atool-build/node_modules'],
    'extensions': ['', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    'alias': {
      'antd': '/Users/kpyu/github/ant-design'
    },
    'fastUnsafe': [],
    'packageAlias': 'browser',
    'packageMains': ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  'resolveLoader': {
    'modulesDirectories': ['node_modules', 'atool-build/node_modules'],
    'fastUnsafe': [],
    'alias': {},
    'packageMains': ['webpackLoader', 'webLoader', 'loader', 'main'],
    'extensions': ['', '.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
    'moduleTemplates': ['*-webpack-loader', '*-web-loader', '*-loader', '*']
  },
  'entry': {
    'antd.min': ['./index']
  },
  'node': {
    'child_process': 'empty',
    'cluster': 'empty',
    'dgram': 'empty',
    'dns': 'empty',
    'fs': 'empty',
    'module': 'empty',
    'net': 'empty',
    'readline': 'empty',
    'repl': 'empty',
    'tls': 'empty',
    'console': false,
    'process': true,
    'global': true,
    'setImmediate': true,
    '__filename': 'mock',
    '__dirname': 'mock'
  },
  'module': {
    'loaders': [{
      'test': {},
      'loader': 'es3ify-loader'
    }, {
      'test': {},
      'loader': 'es3ify-loader'
    }, {
      'test': {},
      'exclude': {},
      'loader': 'babel'
    }, {
      'test': {},
      'loader': 'babel'
    }, {
      'test': {},
      'loaders': ['babel', 'ts']
    }, {
      'loader': 'extract-text-webpack-plugin/loader.js?{\'remove\':true}!css?sourceMap&-restructuring&-autoprefixer!postcss-loader'
    }, {
      'test': {},
      'loader': 'extract-text-webpack-plugin/loader.js?{\'remove\':true}!css?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer!postcss-loader'
    }, {
      'loader': 'extract-text-webpack-plugin/loader.js?{\'remove\':true}!css?sourceMap&-autoprefixer!postcss-loader!less-loader?{\'sourceMap\':true,\'modifyVars\':{}}'
    }, {
      'test': {},
      'loader': 'extract-text-webpack-plugin/loader.js?{\'remove\':true}!css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer!postcss-loader!less-loader?{\'sourceMap\':true,\'modifyVars\':{}}'
    }, {
      'test': {},
      'loader': 'url?limit=10000&minetype=application/font-woff'
    }, {
      'test': {},
      'loader': 'url?limit=10000&minetype=application/font-woff'
    }, {
      'test': {},
      'loader': 'url?limit=10000&minetype=application/octet-stream'
    }, {
      'test': {},
      'loader': 'file'
    }, {
      'test': {},
      'loader': 'url?limit=10000&minetype=image/svg+xml'
    }, {
      'test': {},
      'loader': 'url?limit=10000'
    }, {
      'test': {},
      'loader': 'json'
    }, {
      'test': {},
      'loader': 'file?name=[name].[ext]'
    }],
    'unknownContextRequest': '.',
    'unknownContextRecursive': true,
    'unknownContextRegExp': {},
    'unknownContextCritical': true,
    'exprContextRequest': '.',
    'exprContextRegExp': {},
    'exprContextRecursive': true,
    'exprContextCritical': true,
    'wrappedContextRegExp': {},
    'wrappedContextRecursive': true,
    'wrappedContextCritical': false
  },
  'postcss': [{
    'version': '5.2.0',
    'plugins': [null, null, null, null, null, null, null, null, null, null],
    'postcssPlugin': 'rucksack',
    'postcssVersion': '5.2.0'
  }, null],
  'plugins': [{
    'filename': '[name].css',
    'options': {
      'disable': false,
      'allChunks': true
    },
    'id': 1
  }, {}, {
    'options': {
      'output': {
        'ascii_only': true
      },
      'compress': {
        'warnings': false
      },
      'test': {}
    }
  }, {
    'definitions': {
      'process.env.NODE_ENV': '\'production\''
    }
  }, {}, {}, {
    'options': {},
    'banner': '/*!\n * antd v2.1.0\n * \n * Copyright 2015-present, Alipay, Inc.\n * All rights reserved.\n */'
  }, {
    'resourceRegExp': {},
    'contextRegExp': {}
  }],
  'UglifyJsPluginConfig': {
    'output': {
      'ascii_only': true
    },
    'compress': {
      'warnings': false
    },
    'test': {}
  },
  'externals': {
    'react': {
      'root': 'React',
      'commonjs2': 'react',
      'commonjs': 'react',
      'amd': 'react'
    },
    'react-dom': {
      'root': 'ReactDOM',
      'commonjs2': 'react-dom',
      'commonjs': 'react-dom',
      'amd': 'react-dom'
    }
  },
  'debug': false,
  'cache': true,
  'context': '/Users/kpyu/github/ant-design',
  'target': 'web',
  'optimize': {
    'occurenceOrderPreferEntry': true
  }
}, {
  'babel': {
    'cacheDirectory': '/var/folders/kp/dmdcnlh153xdpm4st40qh1mh0000gn/T',
    'presets': ['babel-preset-es2015-ie', 'babel-preset-react', 'babel-preset-stage-0'],
    'plugins': ['babel-plugin-add-module-exports/lib', 'babel-plugin-transform-decorators-legacy/lib', ['antd-tools/node_modules/babel-plugin-transform-runtime/lib', {
      'polyfill': false
    }],
      ['babel-plugin-import/lib', [{
        'style': true,
        'libraryName': 'antd',
        'libraryDirectory': 'components'
      }]]
    ]
  },
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
  'output': {
    'path': '/Users/kpyu/github/ant-design/dist/',
    'filename': '[name].js',
    'chunkFilename': '[name].js',
    'library': 'antd',
    'libraryTarget': 'umd',
    'sourceMapFilename': '[file].map[query]',
    'hotUpdateChunkFilename': '[id].[hash].hot-update.js',
    'hotUpdateMainFilename': '[hash].hot-update.json',
    'crossOriginLoading': false,
    'hashFunction': 'md5',
    'hashDigest': 'hex',
    'hashDigestLength': 20,
    'sourcePrefix': '\t',
    'devtoolLineToLine': false
  },
  'devtool': '#sourcemap',
  'resolve': {
    'modulesDirectories': ['node_modules', 'atool-build/node_modules'],
    'extensions': ['', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    'alias': {
      'antd': '/Users/kpyu/github/ant-design'
    },
    'fastUnsafe': [],
    'packageAlias': 'browser',
    'packageMains': ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  'resolveLoader': {
    'modulesDirectories': ['node_modules', 'atool-build/node_modules'],
    'fastUnsafe': [],
    'alias': {},
    'packageMains': ['webpackLoader', 'webLoader', 'loader', 'main'],
    'extensions': ['', '.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
    'moduleTemplates': ['*-webpack-loader', '*-web-loader', '*-loader', '*']
  },
  'entry': {
    'antd': ['./index']
  },
  'node': {
    'child_process': 'empty',
    'cluster': 'empty',
    'dgram': 'empty',
    'dns': 'empty',
    'fs': 'empty',
    'module': 'empty',
    'net': 'empty',
    'readline': 'empty',
    'repl': 'empty',
    'tls': 'empty',
    'console': false,
    'process': true,
    'global': true,
    'setImmediate': true,
    '__filename': 'mock',
    '__dirname': 'mock'
  },
  'module': {
    'loaders': [{
      'test': {},
      'loader': 'es3ify-loader'
    }, {
      'test': {},
      'loader': 'es3ify-loader'
    }, {
      'test': {},
      'exclude': {},
      'loader': 'babel'
    }, {
      'test': {},
      'loader': 'babel'
    }, {
      'test': {},
      'loaders': ['babel', 'ts']
    }, {
      'loader': 'extract-text-webpack-plugin/loader.js?{\'remove\':true}!css?sourceMap&-restructuring&-autoprefixer!postcss-loader'
    }, {
      'test': {},
      'loader': 'extract-text-webpack-plugin/loader.js?{\'remove\':true}!css?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer!postcss-loader'
    }, {
      'loader': 'extract-text-webpack-plugin/loader.js?{\'remove\':true}!css?sourceMap&-autoprefixer!postcss-loader!less-loader?{\'sourceMap\':true,\'modifyVars\':{}}'
    }, {
      'test': {},
      'loader': 'extract-text-webpack-plugin/loader.js?{\'remove\':true}!css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer!postcss-loader!less-loader?{\'sourceMap\':true,\'modifyVars\':{}}'
    }, {
      'test': {},
      'loader': 'url?limit=10000&minetype=application/font-woff'
    }, {
      'test': {},
      'loader': 'url?limit=10000&minetype=application/font-woff'
    }, {
      'test': {},
      'loader': 'url?limit=10000&minetype=application/octet-stream'
    }, {
      'test': {},
      'loader': 'file'
    }, {
      'test': {},
      'loader': 'url?limit=10000&minetype=image/svg+xml'
    }, {
      'test': {},
      'loader': 'url?limit=10000'
    }, {
      'test': {},
      'loader': 'json'
    }, {
      'test': {},
      'loader': 'file?name=[name].[ext]'
    }],
    'unknownContextRequest': '.',
    'unknownContextRecursive': true,
    'unknownContextRegExp': {},
    'unknownContextCritical': true,
    'exprContextRequest': '.',
    'exprContextRegExp': {},
    'exprContextRecursive': true,
    'exprContextCritical': true,
    'wrappedContextRegExp': {},
    'wrappedContextRecursive': true,
    'wrappedContextCritical': false
  },
  'postcss': [{
    'version': '5.2.0',
    'plugins': [null, null, null, null, null, null, null, null, null, null],
    'postcssPlugin': 'rucksack',
    'postcssVersion': '5.2.0'
  }, null],
  'plugins': [{
    'filename': '[name].css',
    'options': {
      'disable': false,
      'allChunks': true
    },
    'id': 1
  }, {}, {}, {}, {
    'options': {},
    'banner': '/*!\n * antd v2.1.0\n * \n * Copyright 2015-present, Alipay, Inc.\n * All rights reserved.\n */'
  }, {
    'definitions': {
      'process.env.NODE_ENV': '\'development\''
    }
  }, {
    'resourceRegExp': {},
    'contextRegExp': {}
  }],
  'UglifyJsPluginConfig': {
    'output': {
      'ascii_only': true
    },
    'compress': {
      'warnings': false
    },
    'test': {}
  },
  'externals': {
    'react': {
      'root': 'React',
      'commonjs2': 'react',
      'commonjs': 'react',
      'amd': 'react'
    },
    'react-dom': {
      'root': 'ReactDOM',
      'commonjs2': 'react-dom',
      'commonjs': 'react-dom',
      'amd': 'react-dom'
    }
  },
  'debug': false,
  'cache': true,
  'context': '/Users/kpyu/github/ant-design',
  'target': 'web',
  'optimize': {
    'occurenceOrderPreferEntry': true
  }
};