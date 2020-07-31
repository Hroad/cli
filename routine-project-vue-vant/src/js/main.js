if (!global._babelPolyfill){ 
    require('babel-polyfill');
  }
import Vue from 'vue';
import Bus from '@func/base.bus.p';
import App from '@views/app.vue';
import router from '@views/router';
import store from '@store';
import UI from '@func/base.vant.p';
 
export function main(){    
    console.log('--start index---');
    Vue.config.productionTip=false;//prevent tip 
    Vue.use(Bus); 
    Vue.use(UI);
    new Vue({
        el:'#app',  
        store,
        router,     
        render:h=>h(App)       
    });  
   
} 
switch (document.readyState) {
    case 'loading':
      document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
      break;
    case 'interactive':
    case 'complete':
    default:
      main();
  }  
  function _domReadyHandler() {
    document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
    main();
  }