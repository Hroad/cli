/**
 * html build configuration
 * if you empty HtmlEntryConfig and trackingHtml at the same time，build error will be throwed
 */
exports.HtmlEntryConfig={
    'commonScript':[],
    'index':['main'],
    'about':[]
};
/**
 * custom items
 */
exports.CompatibleConfig={
    allowBabel:true,//allow or not bebal 
    allowLess:true,//allow or not less
    cssUnit:'px',//layout of the unit, default:px
    trackingHtml:[],//tracking html files
    baseVUE:true,//allow or not vue
}
/**
 * define build envionment variables 
 */
exports.devEnv={
    BASE_URL:'"./"',
    API_HOST: '"http://test.xx.com:8080"'
}
exports.prodEnv={
    BASE_URL:'"./"',
    API_HOST: '"http://prod.xx.com:8080"'
}
/**
 * developer info
 */
exports.DeveloperInfo={
    Designer:"【unknown】",
    Developer:"【zhaoqi】",
    PM:"【unknown】",
    Code:"【IdealFET1/2019/meten-h5-09】",
    Date:"2019-07-24"
}


