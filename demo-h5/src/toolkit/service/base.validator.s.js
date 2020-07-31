/**
 * 表单验证服务，
 * 可以通过bvs获取一个验证实例
 * 单值校验，请使用bvs.formValidate(formdata);
 * 双值对比：bvs.formEqValidate(multidata);
 * 该校验方法均返回一个结果，包括布尔值和最新的一条反馈message
 */
import {vTypes,regexList} from './base.regexList.d';
import validator from 'validator';
class BVS{
    constructor(){
        this.instance=null;
    }
    static getInstance(){
        if(!this.instance){
            this.instance=new BVS();
        }
        return this.instance;
    }
     /**
     * 单规则验证
     * @param rules ——验证规则数组 
     * [{type: 'isFilled', message: '请输入用户名！'},{type: 'isLength', min: 1, max: 30, message: '请不少于1个字符！用户名/邮箱/已验证的手机号'}]
     * @param value ——表单输入值
     */
	validateResult(rules,value){
		const result= {
            success: true,
            message: ''
        };
        for(let key in rules){
        	let rule=rules[key];
        	rule.success = true;     
            if(validateRules[rule.type]){
                rule.success=vTypes[rule.type].rlt(value,rule);
            }else{
                rule.success = validator[rule.type](value + '', rule.options);
            } 
            rule.callback && rule.callback(value, rule);
            if(!rule.success && result.success) {
                result.success = false;
                result.firstRule = rule;
                result.message = rule.message;
            }           
        }
          return result;
    }
     /**
     * 对外方法
     * @param formdata——校验配置对象
     * formdata:{value:any,rlist:string,rules:Array}
     * 如果配置rlist，则优先在regexListStorer中查找校验规则
     * 也可以直接配置rules：[{type:'类型'，messsage:'提示文本'}]
     */
	formValidate(formdata){
		const conclusion= {
            results: [],
            success: true,
            message:""
        };
        for(const key in formdata){
            let val=formdata[key].value;
            let rules;
            if(formdata[key].rlist){
                rules=regexList[formdata[key].rlist] || regexList.default;
            }else{
                rules=formdata[key].rules || regexList.default;
            }        	
        	let result=this.validateResult(rules,val);
        	conclusion.results.push(result);
                if(!result.success) {
                    conclusion.success = false;
                    conclusion.message = conclusion.message || result.message;
                }
        }       
       return conclusion;
    }
    /**
     * 多值对比
     * @param multidata 
     * {value:any,reValue:any,checktype:string}
     */
    formEqValidate(multidata){
        const conclusion= {
            results: [],
            success: true,
            message:""
        };
        for(const key in multidata){
            if(multidata[key].value !=  multidata[key].reValue){
                conclusion.success = false;
                conclusion.message = `两次输入的${multidata[key].checktype}不一致`;
            }
        }       
        return conclusion;
    }
}
let bvs=BVS.getInstance();

export default bvs;