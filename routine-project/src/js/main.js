console.log('process.env.ENV=',process.env.ENV);
console.log('process.env.NODE_ENV=',process.env.NODE_ENV);
console.log('process.env.API_HOST=',process.env.API_HOST); 
function main(){    
    console.log('--start index---');
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