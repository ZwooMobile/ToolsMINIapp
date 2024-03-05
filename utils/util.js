const formatTime = timeStamp => {
  const date = new Date(timeStamp * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n 
}

const formatMonth = str => {
  switch(str){
    case 'Jan': return '01';
    case 'Feb': return '02';
    case 'Mar': return '03';
    case 'Apr': return '04';
    case 'May': return '05';
    case 'Jun': return '06';
    case 'Jul': return '07';
    case 'Aug': return '08';
    case 'Sept': return '09';
    case 'Oct': return '10';
    case 'Nov': return '11';
    case 'Dec': return '12';
    default: return '';
  }
}

const findDay = arr => {
  let dateStr = arr[2] + '/' + arr[1] + '/' + arr[0];
  let day = new Date(dateStr).getDay();
  let dayArr = ['日','一','二','三','四','五','六']
  return dayArr[day];
}

const telephoneNumber = [
  {
    title: '常用电话', content: [
      {name: '意外(普通)', number: ['999']}, 
      {name: '火警、救护车', number: ['995']}, 
      {name: '中国大使馆领事保护与应急电话', number: ['92971517']},
      {name: '新电信查号台', number: ['100']},
      {name: '意外(海事)', number: ['6325 2488']}, 
      {name: '机场航班咨询（自动）', number: ['6542 4422']}, 
      {name: '机场航班咨询（人工）', number: ['6541 2302']}, 
      {name: '交通事故报告1', number: ['6547 6242']}, 
      {name: '交通事故报告2', number: ['6547 6243']}, 
      {name: '天气预报', number: ['6542 7788']}, 
      {name: '传染病通报', number: ['6731 9757']}, 
      {name: '圣陶沙旅游咨询', number: ['6736 8672']}
    ]
  },
  {
    title:'医院',content:[
      {name: '中央医院', number: ['6222 3322']},
      {name: '国立大学医院', number: ['6779 5555']},
      {name: '樟宜总医院', number: ['6788 8833']},
      {name: '陈笃生医院', number: ['6252 9919']},
      {name: '邱德拔医院', number: ['6555 8000']},
      {name: '亚历山大医院', number: ['6472 2000']},
      {name: '宏茂桥社区医院', number: ['6453 8033']},
      {name: '伊丽莎白医院', number: ['6737 2666']},
      {name: '新加坡鹰阁医院', number: ['6473 7222']}
    ]
  },
  {
    title: '银行', content: [
      {name: '中国银行（汇款）', number: ['6439 8741']},
      {name: '中国银行（新元存款）', number: ['6439 8721']},
      {name: '中国银行（外币存款）', number: ['6439 8824']},
      {name: '中国工商银行1', number: ['6439 7818']},
      {name: '中国工商银行2', number: ['6439 7808']},
      {name: 'DBS Bank', number: ['1800 111 1111']},
      {name: 'UOB Bank', number: ['1800 222 2121']},
      {name: 'OCBC Bank (Personal Banking)', number: ['1800 363 3333']},
      {name: 'OCBC Bank (Business Banking)', number: ['6538 1111']}
    ]
  },
  {
    title: '部分高校', content: [
      {name: '新加坡国立大学(Kent Ridge Campus)', number: ['6874 1616']},
      {name: '新加坡国立大学(Bukit Timah Campus)', number: ['6516 3636']},
      {name: '南洋理工大学1', number: ['6791 1744']},
      {name: '南洋理工大学2', number: ['6790 5200']},
      {name: '新加坡管理大学', number: ['6828 0343']},
      {name: '科技设计大学', number: ['6303 6600']}
    ]
  },
  {
    title: '移民局签证咨询', content: [
      {name: '专业访问准证1', number: ['6530 1814']},
      {name: '专业访问准证2', number: ['6530 1815']},
      {name: '再入境许可', number: ['6391 6100']},
      {name: '社交访问准证', number: ['6391 6100']},
      {name: '学生准证', number: ['6391 6100']},
      {name: '外交部领事局1', number: ['6379 7719']},
      {name: '外交部领事局2', number: ['6379 7722'] },
      {name: '投资移民', number: ['6438 8369']},
      
    ]
  },
  {
    title: '警署警局电话', content: [
      {name: '中央警署', number: ['1800 224 0000']},
      {name: '金文泰警署', number: ['1800 774 0000']},
      {name: '东陵警署', number: ['1800 391 0000']},
      {name: '宏茂桥警署', number: ['1800 218 0000']},
      {name: '勿洛警署', number: ['1800 244 0000']},
      {name: '裕廊警署', number: ['1800 261 0000']},
      {name: '机场警局', number: ['1800 546 0000']},
      {name: '警察海岸卫队', number: ['1800 440 0000']},
      {name: '警方热线电话', number: ['1800 225 0000']},
      {name: '警察部队总部', number: ['6353 0000']},
      {name: '刑事侦查局', number: ['6435 0000']},
      {name: '交通警察局', number: ['6547 0000']},
      {name: '商业侦查局', number: ['1800 325 0000']},
    ]
  },
  {
    title: '生活服务', content: [
      {name: '旅游咨询', number: ['6681 5679']},
      {name: '法律学会1', number: ['6332 4116']},
      {name: '法律学会2', number: ['6332 4117']},
      {name: '婚姻注册局1', number: ['6338 7808']},
      {name: '婚姻注册局2', number: ['6339 8783']},
      {name: '小家具搬运', number: ['8468 5221']},
      {name: '牙科诊所', number: ['6569 3328']},
      {name: '美容美发', number: ['6735 6468']},
      {name: '婚纱摄影', number: ['9010 9685']},
      {name: '鲜花预定', number: ['9637 0950']},
      {name: '水果花艺', number: ['6555 6390']}
    ]
  },
  {
    title: '德士电召', content: [
      {name: 'Comfort Taxi', number: ['6552 1111']},
      {name: 'CityCab', number: ['6555 1188']},
      {name: 'SMRT Taxis', number: ['65558888']},
      {name: 'Premier Taxis', number: ['63636888']},
      {name: 'Prime Taxi', number: ['67780808']},
      {name: 'Yellow-Top Taxi', number: ['62935545']}
    ]
  }
]

var e = require("Promise"), r = {
  formatNumber: function (e) {
    return (e = e.toString())[1] ? e : "0" + e;
  },
  formatDate: function (e, r) {
    var a = {
      "M+": e.getMonth() + 1,
      "d+": e.getDate(),
      "h+": e.getHours(),
      "m+": e.getMinutes(),
      "s+": e.getSeconds(),
      "q+": Math.floor((e.getMonth() + 3) / 3),
      S: e.getMilliseconds()
    };
    /(y+)/.test(r) && (r = r.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var t in a) new RegExp("(" + t + ")").test(r) && (r = r.replace(RegExp.$1, 1 == RegExp.$1.length ? a[t] : ("00" + a[t]).substr(("" + a[t]).length)));
    return r;
  },
  sleep: function (r) {
    return new e(function (e) {
      return setTimeout(e, r);
    });
  },
  getSlideDirection: function (e, r, a, t, o, n) {
    var c = "";
    n = n || 125;
    var s = a - e, h = t - r;
    return Math.abs(s) >= n && Math.abs(h) <= 125 ? c = s < 0 ? "left" : "right" : Math.abs(h) >= n && Math.abs(s) <= 125 && (c = h < 0 ? "up" : "down"),
      c;
  },
  base64EncodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  base64DecodeChars: new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
  base64encode: function (e) {
    return r.utf16to8(r.base64encodeAction(e));
  },
  base64encodeAction: function (e) {
    var a, t, o, n, c, s;
    for (o = e.length, t = 0, a = ""; t < o;) {
      if (n = 255 & e.charCodeAt(t++), t == o) {
        a += r.base64EncodeChars.charAt(n >> 2), a += r.base64EncodeChars.charAt((3 & n) << 4),
          a += "==";
        break;
      }
      if (c = e.charCodeAt(t++), t == o) {
        a += r.base64EncodeChars.charAt(n >> 2), a += r.base64EncodeChars.charAt((3 & n) << 4 | (240 & c) >> 4),
          a += r.base64EncodeChars.charAt((15 & c) << 2), a += "=";
        break;
      }
      s = e.charCodeAt(t++), a += r.base64EncodeChars.charAt(n >> 2), a += r.base64EncodeChars.charAt((3 & n) << 4 | (240 & c) >> 4),
        a += r.base64EncodeChars.charAt((15 & c) << 2 | (192 & s) >> 6), a += r.base64EncodeChars.charAt(63 & s);
    }
    return a;
  },
  base64decode: function (e) {
    return r.utf8to16(r.base64decodeAction(e));
  },
  base64decodeAction: function (e) {
    var a, t, o, n, c, s, h;
    for (s = e.length, c = 0, h = ""; c < s;) {
      do {
        a = r.base64DecodeChars[255 & e.charCodeAt(c++)];
      } while (c < s && -1 == a);
      if (-1 == a) break;
      do {
        t = r.base64DecodeChars[255 & e.charCodeAt(c++)];
      } while (c < s && -1 == t);
      if (-1 == t) break;
      h += String.fromCharCode(a << 2 | (48 & t) >> 4);
      do {
        if (61 == (o = 255 & e.charCodeAt(c++))) return h;
        o = r.base64DecodeChars[o];
      } while (c < s && -1 == o);
      if (-1 == o) break;
      h += String.fromCharCode((15 & t) << 4 | (60 & o) >> 2);
      do {
        if (61 == (n = 255 & e.charCodeAt(c++))) return h;
        n = r.base64DecodeChars[n];
      } while (c < s && -1 == n);
      if (-1 == n) break;
      h += String.fromCharCode((3 & o) << 6 | n);
    }
    return h;
  },
  utf16to8: function (e) {
    var r, a, t, o;
    for (r = "", t = e.length, a = 0; a < t; a++) (o = e.charCodeAt(a)) >= 1 && o <= 127 ? r += e.charAt(a) : o > 2047 ? (r += String.fromCharCode(224 | o >> 12 & 15),
      r += String.fromCharCode(128 | o >> 6 & 63), r += String.fromCharCode(128 | o >> 0 & 63)) : (r += String.fromCharCode(192 | o >> 6 & 31),
        r += String.fromCharCode(128 | o >> 0 & 63));
    return r;
  },
  utf8to16: function (e) {
    var r, a, t, o, n, c;
    for (r = "", t = e.length, a = 0; a < t;) switch ((o = e.charCodeAt(a++)) >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        r += e.charAt(a - 1);
        break;

      case 12:
      case 13:
        n = e.charCodeAt(a++), r += String.fromCharCode((31 & o) << 6 | 63 & n);
        break;

      case 14:
        n = e.charCodeAt(a++), c = e.charCodeAt(a++), r += String.fromCharCode((15 & o) << 12 | (63 & n) << 6 | (63 & c) << 0);
    }
    // return r;
  }
};


module.exports = {
  formatTime,
  formatMonth,
  telephoneNumber,
  r:r
}
