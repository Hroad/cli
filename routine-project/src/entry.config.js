/**
 * html build configuration
 * if you empty HtmlEntryConfig and trackingHtml at the same time，build error will be throwed
 */
exports.HtmlEntryConfig={
    'commonScript':[],
    'index':['main']
};
/**
 * custom items
 */
exports.CompatibleConfig={
    allowBabel:true,//allow or not bebal 
    allowLess:true,//allow or not less
    cssUnit:'px',//layout of the unit, default:px
    trackingHtml:[],//tracking html files
}
/**
 * define build envionment variables 
 */
exports.devEnv={
    API_HOST: '"http://test.xxx.com:8080"'
}
exports.prodEnv={
    API_HOST: '"http://prod.xxx.com:8080"'
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





