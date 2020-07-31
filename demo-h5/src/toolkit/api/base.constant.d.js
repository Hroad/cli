/**
 * 常量数据存储-和状态管理有区别
 * 常量数据只提供一个静态参照数据
 */

export const RES_OK_CODE='000000';//res-code
export const TOKEN = 'mobile_token';
export const isprod = process.env.NODE_ENV == 'production';
export const rootURL = isprod ? '//hub.51ideal.com' : '//hub.51ideal.com';
export const baseURL = rootURL+'/index.php';//api接口地址

/**
 * 登录-密码加密
 * base64
 */
export const base64EncodeChars ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
export const base64DecodeChars  =new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);