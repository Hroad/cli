import Vue from 'vue';
import Bus from '@func/base.bus.p';
import App from '@views/app.vue';
import router from '@views/router';
import store from '@store';
console.log('process.env.ENV=',process.env.ENV);
console.log('process.env.NODE_ENV=',process.env.NODE_ENV);
console.log('process.env.BASE_URL=',process.env.BASE_URL);
console.log('process.env.API_HOST=',process.env.API_HOST); 
export function main(){    
    console.log('--start index---');
    Vue.config.productionTip=false;//prevent tip 
    Vue.use(Bus);    
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