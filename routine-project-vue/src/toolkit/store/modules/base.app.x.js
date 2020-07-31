/**
 * app基本状态管理模块
 */ 
import storage from '@service/base.storage.s';
import {APP_KEY} from '../base.storeKeys.d';

const state={
    token:JSON.stringify(storage.getLocalItem(APP_KEY)?storage.getLocalItem(APP_KEY)['token']:'')   
 }
const getters={
  
}
const actions={
   
}
const mutations={
   
}
export default {
    //namespaced:true,
    state,
    getters,
    actions,
    mutations 
}