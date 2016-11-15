import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
function getConfig(configFile) {
  const defaultConfig = {
    source: '',
    output: '',
    htmlTemplate: path.join(__dirname, '../template.html'),
    entry: '',
    port: 8000,
    root: '/',
    webpackConfig(config) {
      return config;
    }
  }
  
  const cutomerConfig = fs.existsSync(configFile) ? require(configFile) : {};
  const config = Object.assign({}, defaultConfig, cutomerConfig);
  return config;
}



