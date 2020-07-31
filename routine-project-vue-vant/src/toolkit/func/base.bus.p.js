/**
 * 总线控制插件
 * 用于跨组件的消息传递
 * 用法：this.bus.$emit('事件'，data);this.bus.$on('事件',handle)；
 * 使用时，务必在beforeDestroy时调用this.bus.$off('事件'，handle);
 */
import Vue from 'vue';
let install=function(Vue){
    Vue.prototype.bus=new Vue();
}
export default {install};