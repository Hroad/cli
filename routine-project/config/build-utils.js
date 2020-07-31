const helpers = require('./helpers');
const APP_COMMON_CONFIG = require('./config.common.json');
const EntryConfigJS = require('../src/entry.config.js');
const DeveloperInfo =EntryConfigJS.DeveloperInfo;

const headerInfo=(()=>{
  let info='';
  let keys=Object.keys(DeveloperInfo);
  if(keys && keys.length>0){
    keys.forEach(key=>{
      info=`${info}${key}:${DeveloperInfo[key]} `;
    });
  }
  return info;
})()

const DEFAULT_METADATA = {
  title: APP_COMMON_CONFIG.title,
  description: APP_COMMON_CONFIG.description,
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer(),
  HMR: helpers.hasProcessFlag('hot'),
  //AOT: process.env.BUILD_AOT || helpers.hasNpmFlag('aot'),
  E2E: !!process.env.BUILD_E2E,
  WATCH: helpers.hasProcessFlag('watch'),
  tsConfigPath: 'tsconfig.webpack.json',
  //ienv:'ienv.js',
  /**
   * This suffix is added to the environment.ts file, if not set the default environment file is loaded (development)
   * To disable environment files set this to null
   */
  envFileSuffix: '',
  headerInfo:headerInfo
};
exports.DEFAULT_METADATA = DEFAULT_METADATA;
