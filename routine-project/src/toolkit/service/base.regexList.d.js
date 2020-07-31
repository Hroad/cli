/**
 * regexListStorer——校验正则
 * validateTypes——自定义校验类型
 */
import validator from 'validator';
/**
 * Verifiable types
 */
const regexListStorer={
    email:[
        {type: 'isFilled', message: '请输入邮箱！'},
        {type: 'isEmail', message: '请输入正确的Email格式！'}
    ],
    account: [
        {type: 'isFilled', message: '请输入账户名！'},
        {type: 'isLength', min: 1, max: 30, message: '请不少于1个字符的账户名！'}
    ],
    uname: [
        {type: 'isFilled', message: '请输入用户名！'},
        {type: 'isLength', min: 1, max: 30, message: '请不少于1个字符！用户名/邮箱/已验证的手机号'}
    ],
    checkTel:[
        {type: 'isFilled', message: '请输入电话号码！'},
        {type: 'isTel',  message: '请输入正确的电话号码格式！'}
    ],
    emailCode:[
        {type: 'isFilled', message: '请输入验证码'},
    ],
    upwd:[
    {type: 'isFilled', message: '请输入密码！'},
    {type: 'isLength', min: 6, max: 20, message: '请输入不少于6位的密码！'}
    ],
    rePwd:[{type: 'isFilled', message: '请输入确认密码！'},{type: 'isLength', min: 6, max: 20, message: '请输入不少于6位的密码！'}],
    phone:[
        {type: 'isFilled', message: '请输入手机号码！'},
        {type: 'isMobilePhone', options: 'zh-CN', message: '请输入正确的手机号格式！'}],
    default:[
        {type: 'isFilled', message: '请输入内容'} 
    ],
}
/**
 * custom rules
 */
const validateTypes={
    'isRequired':{
        type:'isRequired',
        rlt:(value,rule)=>{
           return  !!validator.toString(value);
        }
    },
    'isFilled':{
        type:'isFilled',
        rlt:(value,rule)=>{
            return  !!validator.toString(value).trim();
         }
    },
    'isInt':{
        type:'isInt',
        rlt:(value,rule)=>{
            return validator.isInt(value + '',rule.options);
         }
    },
    'isLength':{
        type:'isLength',
        rlt:(value,rule)=>{
            return validator.isLength(value + '', rule.options || {min: rule.min, max: rule.max});
         }
    },
    'isTel':{
        type:'isTel',
        rlt:(value,rule)=>{
            let tempRlt=value.match('/\d{3}-\d{8}|\d{4}-\d{7}/');
            if(tempRlt==null){
               return false;
            } 
            return true;
         }
    }
};
export {validateTypes as vTypes,regexListStorer as regexList};
 