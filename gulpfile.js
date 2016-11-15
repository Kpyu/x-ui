var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');
var babel = require('gulp-babel');
var through2 = require('through2');
var eslint = require('eslint');
var webpack = require('webpack');
var merge2 = require('merge2');
var ts = require('gulp-typescript');
var getWebpackConf = require('./webpack.config');
var LessPluginNpmImport = require('less-plugin-npm-import');
var lessPlug = require('less');
var rucksackCss = require('rucksack-css');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var env = process.env.NODE_ENV || 'development';
var chalk = require('chalk');
const transform = require('es3ify').transform;
const execSync = require('child_process').execSync;
var webpackConfig = getWebpackConf(env);
var tsConfig = {
  target: 'es5',
  jsx: 'preserve',
  moduleResolution: 'node',
  declaration: true,
  // typescript: require('typescript')
};
var tsproject = ts.createProject('tsconfig.json');
var siteproject = ts.createProject('tsconfig.json');
var babelConfig = {
  presets: [
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-stage-0')
  ],
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-decorators-legacy'), [require.resolve('babel-plugin-transform-runtime'), {
      polyfill: false
    }]
  ]
};

var paths = {
  eslint: [
    'lib/**/*.js'
  ],
  distDir: './dist/'
};

gulp.task('eslint', function () {
  gulp.src(paths.eslint).
  pipe(eslint()).
  pipe(eslint.format()).
  pipe(eslint.formatEach('compact', process.stderr)).
  pipe(eslint.result(function (result) {
    console.log(`ESLint result: ${result.filePath}`);
    console.log(`# Messages: ${result.messages.length}`);
    console.log(`# Warnings: ${result.warningCount}`);
    console.log(`# Errors: ${result.errorCount}`);
  })).
  pipe(eslint.failAfterError());
});

gulp.task('clean', function () {
  return gulp.src(['dist'], {
    read: true
  }).pipe(clean());
});


gulp.task('dist', ['clean'], function (done) {
  gulp.src([
    './lib/style/index.less'
  ])
    .pipe(less())
    .pipe(gulp.dest('./dist/css'));
  done();
});

function gulpEs3ify() {
  return through2.obj(function processFile(file, encoding, callback) {
    if (!file.isNull()) {
      file.contents = new Buffer(transform(file.contents.toString()));
    }
    this.push(file);
    callback();
  });
}

function babelify(js) {
  return js.pipe(babel(babelConfig))
    .pipe(gulpEs3ify())
    .pipe(through2.obj(function (file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/\/style\/index(\.web)?\.js/)) {
        const content = file.contents.toString(encoding);
        if (file.path.indexOf('.web.js') === -1 &&
          (content.indexOf('.less\'') === -1 || content.indexOf('\'react-native\'') !== -1)) {
          next();
          return;
        }
        file.contents = new Buffer(content
          .replace(/\/style\/?'/g, '/style/css\'')
          .replace(/\.less/g, '.css'));
        file.path = file.path.replace(/index(\.web)?\.js/, 'css$1.js');
        this.push(file);
        next();
      } else {
        next();
      }
    }))
    .pipe(gulp.dest('lib'));
}

function transformLess(lessFile) {
  var cwd = process.cwd();
  console.log(cwd);
  var resolvedLessFile = require.resolve(lessFile);
  var data = fs.readFileSync(resolvedLessFile, 'utf-8');
  data = data.replace(/^\uFEFF/, '');
  return new Promise(function (resolve, reject) {
    var lessOpts = {
      paths: [path.dirname(resolvedLessFile)],
      filename: resolvedLessFile,
      plugins: [new LessPluginNpmImport({
        prefix: '~'
      })]
    };
    lessPlug.render(data, lessOpts).then(function (result) {
      var plugins = [rucksackCss(), autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
      })];
      var source = result.css;
      var postcssOpts = {};
      postcss(plugins).process(source, postcssOpts)
        .then(function (r) {
          console.log(r);
          resolve(r.css);
        })
        .catch(function (err) {
          reject(err);
        });
    }).catch(function (err) {
      reject(err);
    });
  });
}
gulp.task('compile', () => {
  execSync('rm -rf lib');
  const lessTmp = gulp.src(['components/**/*.less'])
    .pipe(through2.obj(function (file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/\/style\/index(\.web)?\.less$/)) {
        console.log(file.path);
        transformLess(file.path).then((css) => {
          file.contents = new Buffer(css);
          file.path = file.path.replace(/\.less$/, '.css');
          this.push(file);
          next();
        }).catch(function (e) {
          console.error(e);
        });
      } else {
        next();
      }
    }))
    .pipe(gulp.dest('lib'));
  const img = gulp.src(['components/**/*.png'])
    .pipe(gulp.dest('lib'));
  // 字体文件
  const font = gulp.src(['components/**/*.eot', 'components/**/*.svg', 'components/**/*.ttf', 'components/**/*.woff'])
    .pipe(gulp.dest('lib'));
  const tsResult = gulp.src([
    '!components/**/demo/*.js',
    'components/**/*.tsx',
    'typings/**/*.d.ts'
  ])
    .pipe(ts(tsproject));

  const tsFiles = babelify(tsResult.js);

  const tsd = tsResult.dts.pipe(gulp.dest('lib'));

  return merge2([lessTmp, tsFiles, tsd, img]);
});

gulp.task('build', function (done) {
  const fileOutpath = 'dist';
  // webpackConfig.forEach(function (config) {
  webpackConfig.plugins.push(new webpack.ProgressPlugin(function (percentage, msg) {
    var stream = process.stderr;
    if (stream.isTTY && percentage < 0.71) {
      stream.cursorTo(0);
      stream.write('📦  ' + chalk.magenta(msg));
      stream.clearLine(1);
    } else if (percentage === 1) {
      console.log(chalk.green('\nwebpack: bundle build is now finished.'));
    }
  }));
  console.log(webpackConfig);
  webpack(webpackConfig).run(function (err, stats) {
    var filename = 'build-bundle.json';
    var jsonPath = path.join(fileOutpath, filename);
    fs.writeFileSync(jsonPath, JSON.stringify(stats.toJson()), 'utf-8');
    console.log('Generate JSON file ' + jsonPath);
    const statJson = stats.toJson();
    const errors = statJson.errors;
    const buildInfo = stats.toString({
      color: true,
      children: true
    });
    console.log(buildInfo);
  });
  // });
  done();
});


gulp.task('publish', function () {
  var componentsPath = path.join(process.cwd(), 'lib');
  var componentsLessContent = '';
  console.log('Building a entry less file to dist/antd.less');
  fs.readdir(componentsPath, function (err, files) {
    files.forEach(function (file) {
      if (fs.existsSync(path.join(componentsPath, file, 'style', 'index.less'))) {
        componentsLessContent += `@import "../${path.join(file, 'style', 'index.less')}";\n`;
      }
    });
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', 'fddUI.less'),
      '@import "../lib/style/index.less";\n@import "../lib/style/components.less";'
    );
  });
});
gulp.task('site', function () {
  execSync('rm -rf _site');
  const tsResult = gulp.src([
    'site/**/*.ts',
    'site/**/*.tsx',
    'typings/**/*.d.ts'
  ])
  .pipe(ts(siteproject))
  .pipe(gulp.dest('_site'));
});
