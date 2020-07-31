import createLogger from './logger';
import storage from '@service/base.storage.s';
import {APP_KEY} from '../base.storeKeys.d';
const storagePlugin=store=>{
    store.subscribe((mutation,state)=>{    
        if(mutation.type.split('/').findIndex(val=>val=='baseAppX')>-1){
            if(typeof localStorage==='object'){
                try{
                    storage.setLocalItem(APP_KEY,JSON.stringify(state.baseAppX));//当前只存储了baseAppX模块下的状态
                }catch(e){
                    console.log('--当前浏览器处于隐私模式--');
                }
            }           
        } 

    })
}
export default process.env.NODE_ENV!=="production"?[createLogger(),storagePlugin]:[storagePlugin];