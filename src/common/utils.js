//防抖函数的封装
//防抖函数debounce/节流函数throttle
//1.防抖函数: 监听某一事件，若有执行则延时操作，debounce('将要执行的函数'，延时执行的时间){}
export function debounce(func,delay){
  let timer = null
  //...args:可以传入多个参数
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply()
    },delay)
  }
}

//对从后台请求的时间戳进行一定程度的格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

//实现对传进来的时间进行处理，使输出的时间都为两位数字输出
function padLeftZero (str) {
  //substr(length)替换的长度
  return ('00' + str).substr(str.length);
};


