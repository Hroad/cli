/**
 * 项目接口处理服务，使用配置好的axios实例进行请求，
 * 均使用静态方法，返回一个promise
 * 如果接口加多，可以根据业务新怎多个接口处理服务
 */
import baseAxiosS from './base.axios.s';
import api from './base.access.d';
/**
 * merge api classes as a super class
 */
function superMix(...mixins) {
    class Mix {
        constructor() {
            for (let mixin of mixins) {
                Mix.copyProperties(this, new mixin()); // merge instance properties
            }
        }
        static mixinClass(){
            for (let mixin of mixins) {
                Mix.copyProperties(Mix, mixin); // merge static properties
                Mix.copyProperties(Mix.prototype, mixin.prototype); // merge prototype
            }
        }
        static copyProperties(target, source) {
            for (let key of Reflect.ownKeys(source)) {
                if (key !== 'constructor' &&
                    key !== 'prototype' &&
                    key !== 'name'
                ) {
                    let desc = Object.getOwnPropertyDescriptor(source, key);
                    Object.defineProperty(target, key, desc);
                }
            }
        }
    }
   Mix.mixinClass();
   return Mix;
}
/**
 * define a class extends from superMix
 */
class BaseHttpS extends superMix(){
    constructor(){
        super();
    }
}
export default BaseHttpS;