const contextCss=require.context('@style', false, /\.css$/);
console.log('contextCss=',contextCss.keys());
contextCss.keys().forEach(key => {
    contextCss(key);
});
const contextLess=require.context('@style', false, /\.less$/);
console.log('contextLess=',contextLess.keys());
contextLess.keys().forEach(key => {
       contextLess(key);
});
