// pages/festival/festival.js

function t(t, a, e) {
  return a in t ? Object.defineProperty(t, a, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[a] = e, t;
}

var a = require("../../utils/api"), e = require("../../utils/calendar"), i = require("../../utils/util").r, x = require("../../utils/localData"), n = getApp(), festivalData=require("../../utils/festival");

Page({
  title: "",
  desc: "",
  nowDate: new Date(),
  isDown: !1,
  data: {
    // 组件所需的参数
    navbarData: {
      showCapsule: 1,
      title: '新加坡节假日',
    },
    height: n.globalData.height * 2 + 20,
    localData: {
      activeClass: "active",
      height: 0,
      time: 300,
      city_font: "14px",
      city_padding: null,
      list: [],
    },
    // address:{
    //   city:"杭州市",
    //   district:"滨江区"
    // },
    jiejiariData: {
      activeClass: "",
      height: 0,
      time: 300,
      list: []
    },
    termData: {
      activeClass: "",
      height: 0,
      time: 300,
      list: []
    },
    hotData: {
      activeClass: "",
      height: 0,
      time: 300,
      list: []
    }
  },
  onLoad: function () {
    this.initPageData();

  },
  onReady: function () {
    n.globalData.share = false
  },
  onShow() {


  },
  onUnload: function () {
    n.globalData.share = false
  },
  onShareAppMessage: function () {
    return {
      title: "新加坡生活必备小程序",
      path: "/pages/index/index"
    };
  },
  removeHou: function (t) {
    for (var a = 0; a < t.length; a++) t[a].days.indexOf("今天") > -1 || t[a].days.indexOf("明天") > -1 || t[a].days.indexOf("后天") > -1 || (t[a].days += "后");
    return t;
  },
  initPageData: function () {
    // if (n.globalData.festivalData && !this.isDown) { 
    var t = this.getTermList(), a = [], e = [], p = [], xxx = {};
    var that = this;
    this.isDown = !0;
    var i = new Date(this.nowDate.getFullYear(), this.nowDate.getMonth(), this.nowDate.getDate()), r = 0, s = this.getJieri(i), q = this.getLocalList(i);

    for (a = a.concat(s.vacationList), p = p.concat(q.localList), e = e.concat(s.hotList); r < 365;) i.setDate(i.getDate() + 1),
      s = this.getJieri(i), q = this.getLocalList(i), a = a.concat(s.vacationList), e = e.concat(s.hotList), p = p.concat(q.localList), r++;
    this.removeHou(e), this.removeHou(a), this.setData({
      "localData.time": 40 * p.length,
      "localData.height": 67 * p.length,
      "localData.list": p,
      "jiejiariData.time": 40 * a.length,
      // "jiejiariData.height": 67 * a.length,
      "jiejiariData.list": a,
      "termData.time": 20 * t.length,
      "termData.list": t,
      "hotData.time": 10 * e.length,
      "hotData.list": e
    }),


      console.log("t:" + t[0].days)
      // console.log("x:" + x[0].days)
      , a[0].num <= e[0].num ? this.title = a[0].days + "后是" + a[0].name : this.title = e[0].days + "后是" + e[0].name;
    // }   

  },
  getTermList: function () {
    for (var t = [], a = {}, n = e.dayOfYear(this.nowDate), r = this.nowDate.getFullYear(), s = -1, l = 0, o = void 0, h = "", g = 0; g < 24; g++) if (n > e.getOffsetByTerm(r, g - 1) + 1 && n <= e.getOffsetByTerm(r, g) + 1) {
      s = g;
      break;
    }
    -1 === s && (r++ , s = 0);
    for (var D = 0; D <= 24; D++) {
      var d = s + D;
      d < 24 ? (l = e.getOffsetByTerm(r, d), o = e.getDateObjByOffset(r, l), h = r === this.nowDate.getFullYear() ? i.formatDate(o, "MM月dd日") : i.formatDate(o, "yyyy年MM月dd日")) : (d -= 24,
        l = e.getOffsetByTerm(r + 1, d), o = e.getDateObjByOffset(r + 1, l), h = r + 1 === this.nowDate.getFullYear() ? i.formatDate(o, "MM月dd日") : i.formatDate(o, "yyyy年MM月dd日"));
      var u = this.getDaysInterval(o);
      a = {
        P: 8,
        name: e.solarTerm[d],
        date: h,
        days: u.intervalDay
      }, t.push(a);
    }
    return t = this.removeHou(t);
  },

  getLocalList: function (t) {
    var a = t.getFullYear(), r = t.getMonth(), s = t.getDate(), l = e.solar2lunar(a, r, s), o = l.lYear, h = l.lMonth, g = l.lDay;
    r += 1;

    var D = (h < 10 ? "0" + h : h.toString()) + (g < 10 ? "0" + g : g.toString()), d = (r < 10 ? "0" + r : r.toString()) + (s < 10 ? "0" + s : s.toString()), u = [], v = [], f = this.getDaysInterval(t), m = a === this.nowDate.getFullYear() ? i.formatDate(t, "MM月dd日") : i.formatDate(t, "yyyy年MM月dd日"), y = x.S[d], c = {};
    if (y && y.length > 0) for (var w = 0; w < y.length; w++) a >= parseInt(y[w].Y, 10) && ((c = {
      P: 33,
      name: y[w].V,
      date: m,
      days: f.intervalDay,
      num: f.intervalTime
    }), u.push(c));

    var p = x.L[D];
    if (p && p.length > 0) for (var T = 0; T < p.length; T++) o >= parseInt(p[T].Y, 10) && ((c = {
      P: 33,
      name: p[T].V,
      date: m,
      days: f.intervalDay,
      num: f.intervalTime
    }), u.push(c));
    var M = this.getWeekIndexString(a, r, s), P = x.W[M];
    if (P && P.length > 0) for (var b = 0; b < P.length; b++) (c = {
      P: 33,
      name: P[b].V,
      date: m,
      days: f.intervalDay,
      num: f.intervalTime
    }), u.push(c);

    return {
      localList: u,
    };
  },

  getJieri: function (t) {
    var a = t.getFullYear(), r = t.getMonth(), s = t.getDate(), l = e.solar2lunar(a, r, s), o = l.lYear, h = l.lMonth, g = l.lDay;
    r += 1;
    var D = (h < 10 ? "0" + h : h.toString()) + (g < 10 ? "0" + g : g.toString()), d = (r < 10 ? "0" + r : r.toString()) + (s < 10 ? "0" + s : s.toString()), u = [], v = [], f = this.getDaysInterval(t), m = a === this.nowDate.getFullYear() ? i.formatDate(t, "MM月dd日") : i.formatDate(t, "yyyy年MM月dd日"), y = festivalData.S[d], c = {};
    if (y && y.length > 0) for (var w = 0; w < y.length; w++) a >= parseInt(y[w].Y, 10) && ((c = {
      P: parseInt(y[w].P, 10),
      name: y[w].V,
      date: m,
      days: f.intervalDay,
      num: f.intervalTime
    }).P >= 10 ? u.push(c) : v.push(c));
    var p = festivalData.L[D];
    if (p && p.length > 0) for (var T = 0; T < p.length; T++) o >= parseInt(p[T].Y, 10) && ((c = {
      P: parseInt(p[T].P, 10),
      name: p[T].V,
      date: m,
      days: f.intervalDay,
      num: f.intervalTime
    }).P >= 10 ? u.push(c) : v.push(c));
    var M = this.getWeekIndexString(a, r, s), P = festivalData.W[M];
    if (P && P.length > 0) for (var b = 0; b < P.length; b++) (c = {
      P: parseInt(P[b].P, 10),
      name: P[b].V,
      date: m,
      days: f.intervalDay,
      num: f.intervalTime
    }).P >= 10 ? u.push(c) : v.push(c);
    return l.isTerm && "清明" === l.Term && u.push({
      P: 8,
      name: l.Term,
      date: m,
      days: f.intervalDay,
      num: f.intervalTime
    }), {
        vacationList: u,
        hotList: v
      };
  },
  getWeekIndexString: function (t, a, e) {
    var i = Math.ceil(e / 7), n = new Date(t, a - 1, e).getDay();
    return (a < 10 ? "0" + a : a.toString()) + i + n;
  },
  getDaysInterval: function (t) {
    var a = "", e = Math.ceil((t.getTime() - this.nowDate.getTime()) / 864e5);
    return a = 0 === e ? "今天" : 1 === e ? "明天" : e + "天", {
      intervalDay: a,
      intervalTime: e
    };
  },
  citySelectTap: function () {
    wx.navigateTo({
      url: '/libs/citySelector/switchcity/switchcity',
    });
  },



  sectionTitleTap: function (a) {
    var e, i = a.currentTarget.dataset.tag, r = "" === this.data[i].activeClass ? "active" : "", s = "" === this.data[i].activeClass ? 67 * this.data[i].list.length : 0;
    n.globalData.windowWidth <= 320 && "hotData" === i ? s > 0 && (s += 124) : n.globalData.windowWidth <= 360 && "hotData" === i ? s > 0 && (s += 54) : n.globalData.windowWidth <= 375 && "hotData" === i && (s += 17),
      console.log(s);
    var l = i + ".activeClass", o = i + ".height";
    this.setData((e = {}, t(e, l, r), t(e, o, s), e));
  }
});