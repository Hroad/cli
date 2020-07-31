
/**
 * 禁用了babel，请使用es5进行开发
 */
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
  function main(){    
    console.log('--start index---');
    loaderHandle();
  } 
  function loaderHandle(){
    var loader=document.querySelector('.loader');
    if(loader) loader.style.display='none';    
  }

   