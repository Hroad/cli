/**
 * 全局状态管理
 */
require('babel-polyfill');
import Vue from 'vue';
import Vuex from 'vuex'; 
import baseAppX from './modules/base.app.x';
import storagePlugin from './plugin/storagePlugin';
Vue.use(Vuex);
const debug=process.env.NODE_ENV!=="production";
export default new Vuex.Store({
    modules:{baseAppX},
    strict:debug,
    plugins:storagePlugin     
})
