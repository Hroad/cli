/**
 * vant 按需引入 示例
 * 非全局注册的组件，可自行在具体vue文件中注册
 */
import Vue from 'vue';
import {Button,Icon} from 'vant';
import 'vant/lib/index.css';
let install=(Vue)=>{
   Vue.use(Button).use(Icon);
}
export default {install};