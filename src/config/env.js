/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let routerMode = '';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
    //  联调地址
    baseUrl = '/apis';
    baseImgPath = '';
} else {
    baseUrl = 'http://10.0.131.79:5000';
    baseImgPath = '';
}

export {
    baseUrl,
    routerMode,
    baseImgPath
}
