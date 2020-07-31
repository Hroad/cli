/**********************************************************************************
 *  @ first-author: tipe.io
 *  @ customize author:qi.zhao
 *  production environment configuration item  
 *********************************************************************************/
const helpers = require('./helpers');
const buildUtils = require('./build-utils');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const prodEnv=require('../src/entry.config.js').prodEnv;

// format variable definition of the Dev Env
const NEW_PROD_ENV={};
for(let i in prodEnv){
  NEW_PROD_ENV[`process.env.${i}`]=prodEnv[i];
} 
/***
 * @param enableCompress disabling compress could improve the performance,
 * @returns {{ecma: number, warnings: boolean, ie8: boolean, mangle: boolean, compress: {pure_getters: boolean, passes: number}, output: {ascii_only: boolean, comments: boolean}}}
 */
function getUglifyOptions(enableCompress) {
  const isDebug=helpers.hasProcessFlag('debug');
  console.log('isdebug=',isDebug);
  const uglifyCompressOptions = isDebug ? {
    pure_getters: true,
    passes: 2 ,// buildOptimizer  
    warnings: false,// remove warnings  
  } : {
    pure_getters: true,//buildOptimizer 
    passes: 2 ,// buildOptimizer 
    warnings: false,// remove warnings
    drop_console: true,// console
    pure_funcs: ['console.log']// remove console
  };
  return {
    ecma: 5,
    warnings: false, // TODO verbose based on option?
    ie8: false,
    mangle: true,
    compress: enableCompress ? uglifyCompressOptions : false,
    output: {
      ascii_only: true,
      comments: false
    }
  };
}

module.exports = function(env) {
  const ENV = (process.env.NODE_ENV = process.env.ENV = 'production');
  const sourceMapEnabled = process.env.SOURCE_MAP === '1';
  const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
    ENV: ENV,
    HMR: false,
    baseUrl:prodEnv['BASE_URL'] || './'
  });
  // set environment suffix so these environments are loaded.
  METADATA.envFileSuffix = METADATA.E2E ? 'e2e.prod' : 'prod';
  return webpackMerge(commonConfig({ env: ENV, metadata: METADATA }), {
    mode: 'production',
    devtool: 'source-map',
    output: {
      path: helpers.root('dist'),
      // Specifies the name of each output file on disk.
      filename: 'js/[name].bundle.js',
      // The filename of the SourceMaps for the JavaScript files.
      // They are inside the output.path directory. 
      sourceMapFilename: 'js/[file].map',
      chunkFilename: 'js/[name].chunk.js',
      globalObject:'this' 
    },
    module: {},
    plugins: [     
     new HashedModuleIdsPlugin(),
     new DefinePlugin(NEW_PROD_ENV),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: sourceMapEnabled,
          parallel: true,
          cache: helpers.root('webpack-cache/uglify-cache'),
          uglifyOptions: getUglifyOptions(true)
        }),
        new OptimizeCSSAssetsPlugin({})
      ] 
    },
    // Include polyfills or mocks for various node stuff
    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      fs: 'empty'
    }
  });
};
