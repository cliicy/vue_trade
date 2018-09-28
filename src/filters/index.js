import { coinNameMap } from '@/lib/coinMap';
/*
*   日期格式过滤器 2018-06-26T07:26:07.000+0000 转为 xxxx-xx-xx xx:xx:xx
*/
export function time(input) {
  if(!input) {
      return input;
  }
  function toDou(num) {
      return num>9 ? num : `0${num}`;
  }
  var d = new Date(input);
  var times=d.getFullYear() + '-' + toDou(d.getMonth() + 1) + '-' + toDou(d.getDate()) + ' ' + toDou(d.getHours()) + ':' + toDou(d.getMinutes()) + ':' + toDou(d.getSeconds());
  return times;
}

/*
*   日期格式过滤器 2018-06-26 07:26:07 转为 xxxx-xx-xx
*/
export function timeSplit(input) {
if(!input) {
    return input;
}
return input.split(' ')[0]
}

export function aaa(input) {
  return `${input}aaa`
}

/*
*   简写2全称过滤器
*/
export function coinEn2ZH(input) {
  if(!input) {
      return input;
  }
  return coinNameMap[input] ? coinNameMap[input] : input;
}
