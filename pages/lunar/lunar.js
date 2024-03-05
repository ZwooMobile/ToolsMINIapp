// pages/lunar/lunar.js
var t = require("../../utils/api"), e = require("../../utils/util").r, a = require("../../utils/calendar"), i = require("../../components/datePicker/datePicker"), s = require("../../utils/YJData"), n = require("../../utils/JXData"), h = require("../../utils/fetusData"), r = getApp();

Page({
  dateNow: new Date(),
  viewDate: null,
  isShowing: !1,
  minDate: new Date(1901, 1, 19),
  maxDate: new Date(2099, 11, 31),
  title: "",
  desc: "",
  data: {
    ad: [],
    scrollMinHeight: "auto",
    dayLunarInfo: {},
    contentVisibility: "hidden",
    navbarData: {
      showCapsule: 1,
      title: '新加坡黄历',
    },
    height: r.globalData.height * 2 + 20,
  },
  onLoad: function () {
    Object.assign(this, i), this.init();
  },
  onShow: function () {
    var t = r.globalData.year || this.dateNow.getFullYear(), e = r.globalData.month || this.dateNow.getMonth(), a = r.globalData.day || this.dateNow.getDate();
    r.globalData.dayViewTap ? (r.globalData.dayViewTap = !1, this.viewDate ? !this.viewDate || this.viewDate.getFullYear() === t && this.viewDate.getMonth() === e && this.viewDate.getDate() === a || this.setPageData(t, e, a) : this.setPageData(t, e, a)) : this.viewDate || this.setPageData(this.dateNow.getFullYear(), this.dateNow.getMonth(), this.dateNow.getDate());
  },
  onHide: function () {
    this.dateSelectModuleHideNow();
  },
  setPageData: function (t, e, a) {
    this.viewDate = new Date(t, e, a);
    var i = this.getDayLunarInfo(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate());
    this.setData({
      dayLunarInfo: i,
      contentVisibility: "visible"
    });
  },
  onReady: function () {
    r.globalData.share = false
    this.setData({
      // ad: r.globalData.setAd(1, "hl")
    }), r.globalData.windowWidth > 320 ? this.setData({
      scrollMinHeight: r.globalData.windowHeight + "px"
    }) : this.setData({
      scrollMinHeight: "auto"
    });
  },
  onShareAppMessage: function () {
    return {
      title: "新加坡生活必备小程序",
      path: "/pages/index/index"
    };
  },
  dateSelectCallback: function (t, e, a) {
    this.viewDate = new Date(t, e, a);
    var i = this.getDayLunarInfo(t, e, a);
    this.setData({
      dayLunarInfo: i
    });

  },
  dateSelectTap: function () {
    this.dateSelectShow(!0, this.viewDate);
  },
  todayTap: function () {
    if (this.isShowing) return !1;
    this.isShowing = !0, this.viewDate = new Date(this.dateNow.getFullYear(), this.dateNow.getMonth(), this.dateNow.getDate());
    var t = this.getDayLunarInfo(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate());
    this.setData({
      dayLunarInfo: t
    });
  },
  dayPrevSelect: function () {
    var t = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate());
    if (t.setDate(t.getDate() - 1), t < this.minDate) return !1;
    if (this.isShowing) return !1;
    this.isShowing = !0, this.viewDate.setDate(this.viewDate.getDate() - 1);
    var e = this.getDayLunarInfo(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate());
    this.setData({
      dayLunarInfo: e
    });
  },
  dayNextSelect: function () {
    var t = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate());
    if (t.setDate(t.getDate() + 1), t > this.maxDate) return !1;
    if (this.isShowing) return !1;
    this.isShowing = !0, this.viewDate.setDate(this.viewDate.getDate() + 1);
    var e = this.getDayLunarInfo(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate());
    this.setData({
      dayLunarInfo: e
    });
  },
  getDayLunarInfo: function (t, i, r) {
    var o = {
      todayDisaply: "block"
    };
    t === this.dateNow.getFullYear() && i === this.dateNow.getMonth() && r === this.dateNow.getDate() && (o.todayDisaply = "none");
    var D = new Date(t, i, r);
    o.sDateString = e.formatDate(D, "yyyy年M月d日");
    var g = a.solar2lunar(t, i, r);
    o.iDayCn = g.IMonthCn + g.IDayCn;
    var l = g.Animal, u = a.getYearWeek(t, i, r);
    o.lunarDate = g.gzYear + "年  " + g.gzMonth + "月  " + g.gzDay + "日 【属" + l + "】 周" + a.nStr1[g.nWeek] + "  第" + u + "周";
    var w = a.getYJSqlFields(D), d = "-", v = "-";
    s && s[w[1] + "-" + w[0]] && (d = s[w[1] + "-" + w[0]].y, v = s[w[1] + "-" + w[0]].j),
      d = "" === d ? "-" : d, v = "" === v ? "-" : v, o.yi = this.getYJLineString(d),
      o.ji = this.getYJLineString(v), o.hourJXList = [];
    for (var y = a.getLunarHourIndex(this.dateNow.getHours()), c = new Date(t, i, r), f = new Date(t, i, r), S = 0, p = 0; p < 12; p++) {
      0 === p && 0 === y ? (c.setDate(c.getDate() + 1), S = 0) : S = p;
      var L = {
        index: S,
        jxString: a.getStemsBranchHourAsString(c, 2 * S) + a.jixiongStatusOfDateTime(c, 2 * S),
        jxClass: ""
      };
      (y === S || 0 === y && 0 === S) && f.getFullYear() === this.dateNow.getFullYear() && f.getMonth() === this.dateNow.getMonth() && f.getDate() === this.dateNow.getDate() && (L.jxClass = "now"),
        o.hourJXList.push(L);
    }
    var M = a.querySAByDay(new Date(t, i, r), n, h);
    o.zhishen = M.zhishen, o.cs = M.cs, o.jianchu = M.jianchu, o.stars28 = M.stars28,
      o.pzbj = M.pzbj, o.wx = M.wx, o.jsyq = M.jsyq, o.taishen = [M.taishen.substr(0, 4), M.taishen.substr(4)],
      o.xsyj = this.getLineString(M.xsyj, 2), o.jsyq = this.getLineString(M.jsyq, 2),
      this.isShowing = !1, this.title = e.formatDate(D, "yyyy.M.d") + " 周" + a.nStr1[g.nWeek] + " " + o.lunarDate + " ",
      0 === y ? (c.setDate(c.getDate() + 1), S = 0) : S = this.dateNow.getHours();
    var N = a.getStemsBranchHourAsString(c, S);
    return this.title += N + "时", this.desc = "宜：" + o.yi + " 忌：" + o.ji, o;
  },
  getYJLineString: function (e) {
    for (var a = t.app.globalData.windowWidth - 94, i = e.split(" "), s = "", n = "", h = 0; h < i.length; h++) {
      var r = (n += i[h] + " ").trim().split(" ").length;
      15 * n.trim().length - 7.5 * (r - 1) > a ? (n = i[h] + " ", s = s.trim() + "\n" + n) : s += i[h] + " ";
    }
    return s;
  },
  getLineString: function (t, e) {
    var a = t.split(" "), i = [], s = 0;
    if (1 === a.length) return i.push(a[0]), i;
    for (var n = 0; n <= a.length - 1 && !(s >= e);) a[n].length < 3 && n + 1 < a.length && a[n + 1].length < 3 ? (i.push(a[n] + " " + a[n + 1]),
      s++ , n += 2) : (i.push(a[n]), s++ , n++);
    return i;
  }
});