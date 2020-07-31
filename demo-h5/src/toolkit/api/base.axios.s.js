/**
 * axios配置封装，export一个实例对象
 * 为了不污染vue的全局，并没有将axios加入到vue的prototype，而是使用对象导入的形式进行局部调用。
 * 已经具备基础配置，大部分情况该文件不需要修改
 */
import axios from 'axios';
import qs from 'qs';
import {baseURL,RES_OK_CODE} from '@api/base.constant.d';
import Storage from '@service/base.storage.s';

/**
 *  extra params append to request
 */
const extraApiParams={
	token:Storage.getLocalItem('token')
}
/**
 * basic configuration
 */
axios.defaults.baseURL=baseURL;
axios.defaults.headers={
    'Accept':'application/json',
    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
}
/**
 * custom error handling
 */
const handleError=(code,res,url)=>{
    switch(code){//custom
        default:
        return Promise.reject(res);
    }
}
/**
 * add extra params to request
 */
axios.interceptors.request.use(config=>{
    let isFormData=config.data.constructor === FormData;
    let _data=qs.parse(config.data);
    if(config && !isFormData){
        Object.assign(_data,extraApiParams);
        config.data=qs.stringify(_data);
    }
    return config;
},err=>{
    return Promise.reject(err);
}); 

/**
 * get accurate data from response
 */
axios.interceptors.response.use(response=>{
    const {url}=response.config;
    const {data}=response;
    const {code,info}=data;
    if(code==RES_OK_CODE){
        return data;
    }else{
        return handleError(code,info,url);
    }
},err=>{
    return Promise.reject(err);
});
/**
 * axios custom-made
 */
class BaseAxiosS{
    //base
    static http(config){
        return new Promise(async (resolve,reject)=>{
            try{
                let result=await axios(config);
                resolve(result);
            }catch(e){
                reject(e);
            }
        })
    }
    //get-data
    static getData(url,params){
        return BaseAxiosS.http({
            method:'get',
            url,
            params
        });
    }
    //post-data
    static postData(url,params){
        //pure post
        const data= params.constructor === FormData?params : qs.stringify(params);
        return BaseAxiosS.http({
            method:'post',
            url,
            data
        });
    }
    //put-data
    static putData(url,params){
        return BaseAxiosS.http({
            method:'put',
            url,
            data:params
        });
    }
    //del-data
    static delData(url,params){
        return BaseAxiosS.http({
            method:'delete',
            url,
            data:params
        });
    }

}
export default BaseAxiosS;