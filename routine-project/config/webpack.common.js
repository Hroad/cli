/**********************************************************************************
 *  @customize author:qi.zhao
 *  common configuration item  
 *********************************************************************************/
const helpers = require('./helpers');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackInlineManifestPlugin = require('webpack-inline-manifest-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const buildUtils = require('./build-utils');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EntryConfigJS = require('../src/entry.config.js');
const entryConfig = EntryConfigJS.HtmlEntryConfig;
const CompatibleConfig = EntryConfigJS.CompatibleConfig;
const trackingHtml = CompatibleConfig.trackingHtml;
const glob = require('glob');
const path = require('path');
//const VueLoaderPlugin = require('vue-loader/lib/plugin');

// Tracking HTML files in the root directory
const htmlTplList=(()=>{
let htmlTplArr = [];
  if (trackingHtml.length > 0) {
    trackingHtml.forEach(dir => {
      let files = glob.sync(dir + '/*.html');
     //htmlTplArr = htmlTplArr.concat(files);
     htmlTplArr=[...htmlTplArr,...files];
    });
    for (let i in htmlTplArr) {
      if (htmlTplArr[i]) {
        htmlTplArr[i] = htmlTplArr[i].replace(/\.\/src\//, '');
        htmlTplArr[i] = htmlTplArr[i].replace(/\//, '$');
        htmlTplArr[i] = htmlTplArr[i].replace(/\.html/, '');
      }
    }
  }
  return htmlTplArr;
})();

// Get entry js files
const entryList=(()=>{
  let jsEntry={};
  for (let file in entryConfig) {
    let tempArr=entryConfig[file]; 
    if(tempArr.length && tempArr.length>0){
      tempArr.forEach(item=>{
        jsEntry=Object.assign(jsEntry,JSON.parse(`{"${item}":"./src/js/${item}.js"}`));
      })
    }
    jsEntry=Object.assign(jsEntry,{'styles':'./src/toolkit/build/styles.js'});
  }
  return jsEntry;
})();

// Configure special plugins
const specialPlugins=(()=>{
  let pluginArr=[];
  if (helpers.hasProcessFlag('analyze')) {
     pluginArr.push(new BundleAnalyzerPlugin());
  }
  return pluginArr;
})();

// Configure html plugins
const htmlPlugins=(MData,isProd)=>{
  let htmlPages,pluginArr=[];
  if(trackingHtml.length > 0) {
    htmlPages = htmlTplList.slice();
  }else{
    htmlPages = Object.keys(entryConfig);
    if (htmlPages[0] == 'headScript') htmlPages.shift();
    if (htmlPages[0] == 'commonScript') htmlPages.shift();
  }
  if (!entryConfig['commonScript']) entryConfig['commonScript'] = [];
  for (let im in htmlPages) {
    if (htmlPages[im]) {
      let jsFiles = ['inline', 'polyfills', 'styles', 'vendor'];
      let nowfile = htmlPages[im];
      let baseDir = '';
      if (nowfile.indexOf('$') > -1) {//just analyze two level directory
        let tarr = nowfile.split('$');
        nowfile = tarr[1];
        baseDir = tarr[0] + '/';
      }
      let jsconfig = entryConfig[htmlPages[im]] ? entryConfig[htmlPages[im]] : [];
      jsFiles = jsFiles.concat(entryConfig['commonScript'], jsconfig);
      if(isProd==true && jsconfig.length==0 && entryConfig['commonScript'].length==0){
        jsFiles=['inline', 'polyfills', 'styles'];
      } 
      pluginArr.push(
        new HtmlWebpackPlugin({
          template: `src/${baseDir}${nowfile}.html`,
          filename: `${baseDir}${nowfile}.html`,
          title: MData.title,
          chunksSortMode: function (a, b) {
            const entryPoints = jsFiles;
            return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
          },
          metadata: MData,
          inject:'body',
          chunks:jsFiles,
          xhtml:true,
          minify:isProd?{caseSensitive: true,collapseWhitespace: true,keepClosingSlash: true} : false
        })
      );
      pluginArr.push(
        new HtmlElementsPlugin({
          headTags: require('./head-config.common')
        })
      );
      pluginArr.push(
        new ScriptExtHtmlWebpackPlugin({
          sync: /inline|polyfills|vendor/,
          defaultAttribute: 'async',
          preload: [/polyfills|vendor|main/],
          prefetch: [/chunk/]
        })
      );
    }
  }
  pluginArr.push(  
    new WebpackInlineManifestPlugin()
  );
  return pluginArr;
}

// Configure js babel-loader
const loadJSConfig=(()=>{
  return CompatibleConfig.allowBabel?['babel-loader']:[];
})();
 
// Configure postcss plugins
const postcssPlugins=(()=>{
  let pluginArr=[require('autoprefixer')()];
  if (CompatibleConfig.cssUnit == 'rem') {
    pluginArr.push(
      require('postcss-pxtorem')({
        rootValue: 100,
        unitPrecision: 3,
        propWhiteList: []
      })
    );
  }
  return pluginArr;
})();

// Configure css-loader
const loadCssConfig=((isProd)=>{
  let loaderArr=[]; 
  if(isProd){
    loaderArr.push(MiniCssExtractPlugin.loader);
  }else{
    loaderArr.push('style-loader');
  } 
  loaderArr=[
    ...loaderArr,
    'css-loader',
    {loader: 'postcss-loader',options: {plugins: postcssPlugins}}
  ]; 
  return loaderArr;
});

// Configure less-loader
const loadLessConfig=((isProd)=>{
  let loaderArr=[];
  if(CompatibleConfig.allowLess==false) return []; 
  if(isProd){
    loaderArr.push(MiniCssExtractPlugin.loader);
  }else{
    loaderArr.push('style-loader');
  } 
  loaderArr=[...loaderArr,
    'css-loader',
    {loader:'postcss-loader',options:{plugins: postcssPlugins}},   
    {loader: 'less-loader'},
  ]; 
  return [{
    test: /\.less$/,
    use:loaderArr,
    include: [helpers.root('src')]
   }];
});

// Webpack configuration
module.exports = function (options) {
  const isProd = options.env === 'production';
  const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, options.metadata || {});
  const lessLoaderArr=loadLessConfig(isProd);
  const htmlFactory=htmlPlugins(METADATA,isProd);
  // build css base env
  const MiniCssExtra = (() => {
    if (!isProd) {
      return new MiniCssExtractPlugin({ filename: 'css/[name].css', chunkFilename: 'css/[name].css' });
    }else{
      return new MiniCssExtractPlugin({ filename: 'css/[name].[hash].css', chunkFilename: 'css/[name].[chunkhash].css' });
    }
  })();

  return {
    // The entry point for the bundle; entry files
    entry: entryList,
    // chunks options
    optimization: {
      splitChunks: {
        maxAsyncRequests: 5,
        cacheGroups: {
          default: false,
          vendors: false,
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            priority: -10,
            reuseExistingChunk: true,
            minChunks: 1,
            minSize: 30000,
            enforce: true
          },
          commons: {
            name: 'inline',
            chunks: 'all',
            priority: 10,
            minChunks: 3,
            maxInitialRequests: 5,
            reuseExistingChunk: true,
            minSize: 2000
          }
        },
      },
      runtimeChunk: {
        "name": "manifest"
      }
    },

    // Options affecting the resolving of modules.
    resolve: {
      extensions: ['.js', '.json', '.styl', '.stylus','.vue','less'],
      modules: [helpers.root('src'), helpers.root('node_modules')],
      alias: Object.assign({}, {
        '@api': helpers.root('src/toolkit/api'),
        '@service': helpers.root('src/toolkit/service'),
        '@store': helpers.root('src/toolkit/store'),
        '@func': helpers.root('src/toolkit/func'),
        '@utils': helpers.root('src/toolkit/utils'),
        '@': helpers.root('src'),
        '@root': helpers.root('./'),
        'images': helpers.root('src/images'),
        '@style': helpers.root('src/style'),
        '@media': helpers.root('src/assets/media'),
        '@font': helpers.root('src/assets/font')
      })
    },

    // Options affecting the normal modules
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude:/(node_modules)/,
          use:loadJSConfig,
          include: [helpers.root('src')]
        },
        {
          test: /\.css$/,
          use:loadCssConfig(isProd),
          include: [helpers.root('src')]
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          //use: 'url-loader?limit=1000&publicPath=../&name=images/[name].[ext]'
          use: {
            loader: 'url-loader',
            options:{
              limit:1000,
              publicPath:'../',
              name: '[path][name].[ext]',
              context: path.resolve(__dirname, '../src/')
            }
          }
        },
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          //use: 'url-loader?name=font/[name].[ext]'
          use: {
            loader: 'url-loader',
            options:{
              limit:1000,
              publicPath:'../',
              name: '[path][name].[ext]',
              context: path.resolve(__dirname, '../src/assets/')
            }
          }
        },
        {
          test: /\.(mp3|ogg|wav|mpeg4)([\?]?.*)$/,
          use: {
            loader: 'url-loader',
            options:{
              limit:1000,
              publicPath:'../',
              name: '[path][name].[ext]',
              context: path.resolve(__dirname, '../src/assets/')
            }
          }
        },
        ...lessLoaderArr,
      ] 
    },

    // Add additional plugins to the compiler.
    plugins: [
 
      // Plugin: DefinePlugin,Description: Define free variables.
      new DefinePlugin({
        ENV: JSON.stringify(METADATA.ENV),
        HMR: METADATA.HMR,
        AOT: METADATA.AOT,
        'process.env.ENV': JSON.stringify(METADATA.ENV),
        'process.env.NODE_ENV': JSON.stringify(METADATA.ENV),
        'process.env.HMR': METADATA.HMR
      }),

      // Plugin: CopyWebpackPlugin, Description: Copy files and directories in webpack.
      new CopyWebpackPlugin(
        [{
          from: 'src/images',
          to: 'images'
        }, {
          from: 'src/assets/vendors',
          to: 'js',
          ignore: [{ glob: '**.css' }]
        }, {
          from: 'src/assets/vendors',
          to: 'css',
          ignore: [{ glob: '**.js' }]
        },{
          from: 'src/assets/font',
          to: 'font'
        },{
          from: 'src/assets/media',
          to: 'media'
        }],
        isProd ? {
          ignore: ['mock-data/**/*']
        } : undefined
      ),

      // declare a vendor to the global env
      new ProvidePlugin({
        // jQuery:'jQuery'
      }),
      MiniCssExtra,
      ...specialPlugins,
      ...htmlFactory
    ],
 
    //Include polyfills or mocks for various node stuff;config for nodejs
    node: {
      global: true,
      crypto: 'empty',
      fs: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
};
