/**********************************************************************************
 *  @ first-author: tipe.io
 *  @ customize author:qi.zhao
 *  development environment configuration item  
 *********************************************************************************/
const DefinePlugin = require('webpack/lib/DefinePlugin');
const helpers = require('./helpers');
const buildUtils = require('./build-utils');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const webpack=require('webpack');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const entryConfig=require('../src/entry.config.js').HtmlEntryConfig;
const devEnv=require('../src/entry.config.js').devEnv;

// dev webpack configuration
module.exports = function(options) {
  const ENV = (process.env.ENV = process.env.NODE_ENV = 'development');
  const HOST = process.env.HOST || 'localhost';
  const PORT = process.env.PORT || 3000;
  const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: helpers.hasProcessFlag('hot'),
    PUBLIC: process.env.PUBLIC_DEV || HOST + ':' + PORT,    
    OPENPAGE: process.env.PAGE_DEV || 'index.html',
    baseUrl:devEnv['BASE_URL'] || './'  
  });

  // format variable definition of the Dev Env
  const NEW_DEV_ENV={};
  for(let i in devEnv){
    NEW_DEV_ENV[`process.env.${i}`]=devEnv[i];
  }  

  // Configure the dev plugins
  const devPlugins=[
      new LoaderOptionsPlugin({
        debug: true,
        options: {}
      }),
      new DefinePlugin(NEW_DEV_ENV),
  ]

  //get all pages for the starter of webpack-dev-server 
  const htmlPages=Object.keys(entryConfig);
  if(htmlPages[0]=='headScript') htmlPages.shift();
  if(htmlPages[0]=='commonScript') htmlPages.shift();
  htmlPages.forEach(hp=>{
    let nowfile=hp;
    let baseDir='';
    if(nowfile.indexOf('$')>-1){//just analyze two level directory
      let tarr=nowfile.split('$');
      nowfile=tarr[1];
      baseDir=tarr[0]+'/';
    }
    METADATA.OPENPAGE=helpers.hasProcessFlag(`${baseDir}${nowfile}`)?`${baseDir}${nowfile}.html`:METADATA.OPENPAGE;
  });
  if(METADATA.HMR){
    devPlugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return webpackMerge(commonConfig({ env: ENV, metadata: METADATA }), {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      // The output directory as absolute path (required).
      path: helpers.root('dist'),
      // Specifies the name of each output file on disk.
      filename: 'js/[name].bundle.js',
      // The filename of the SourceMaps for the JavaScript files.
      sourceMapFilename: 'js/[file].map',
      //The filename of non-entry chunks as relative path
      chunkFilename: 'js/[name].chunk.js',
      library: 'ac_[name]',
      libraryTarget: 'var' 
    },
    module:{},
    plugins:devPlugins, 

    // Webpack Development Server configuration
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      hot: METADATA.HMR,
      hotOnly: METADATA.HMR,
      public: METADATA.PUBLIC,
      historyApiFallback:{
        rewrites:[{ from: /^\/$/, to: '/index.html' }] 
      },
      inline:true,
      open:true,
      openPage:METADATA.OPENPAGE,
      index:METADATA.OPENPAGE,
      watchOptions: {
        ignored: /node_modules/
      },
      setup: function(app) {}
    },

    // Include polyfills or mocks for various node stuff; Description: Node configuration
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      fs: 'empty'
    }
  });
};
