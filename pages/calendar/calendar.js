// pages/calendar/calendar.js
var t = require("../../utils/api"), e = require("../../utils/util").r, a = require("../../utils/eventNotify"), i = require("../../utils/calendar"), n = require("../../components/datePicker/datePicker"), s = require("../../utils/YJData"), h = getApp(), festival = require("../../utils/festival.js"), vacation = require("../../utils/vacation.js")

Page({
  title: "",
  dateNow: new Date(),
  viewDate: new Date(),
  prevViewDate: new Date(),
  nextViewDate: new Date(),
  minDate: new Date(1901, 1, 19),
  maxDate: new Date(2099, 11, 31),
  monthViewWidth: 375,
  monthViewHeight: 310,
  monthList: [],
  monthViewTop: 20,
  monthDayList: [],
  prevMonthIndex: 0,
  nextMonthIndex: 2,
  monthDuration: 400,
  monthAnimation: t.createAnimation({
    duration: 400,
    delay: 0
  }),
  isScrolling: !1,
  startTimeStamp: 0,
  startX: 0,
  startY: 0,

  DPR: 2,
  screenWidth: 412,
  currentYjIndex: -1,
  data: {
    // ad: [],
    navbarData: {
      showCapsule: 1,
      title: '新加坡万年历',
    },
    height: h.globalData.height * 2 + 20,
    fontLowClass: "",
    screenHeight: 0,
    todayDisaply: "none",
    screenWidth: 375,
    singleMonthDisplay: "1",
    singleMonthDayObj: {},
    currentDateString: "",
    monthViewTop: 20,
    monthViewWidth: 375,
    monthTransform: -375,
    monthList: [],
    monthViewDisplay: "0",
    monthAnimation: {},
    dayViewData: {},
    astroShow: !1,
    isWeatherShow: !1,
    isWeatherDateShow: !1,
    loadEaseOut: {},
    city_font: "14px",
    city_padding: null,
    weatherData: [],
    isReallyShow: 1,
    alignItemsWeather: "",
    landUrlClick: "",
    yjTxtList: ["嫁娶", "出行", "入宅", "订盟", "理发", "开市", "会亲友", "移徙", "纳采", "解除"],
    yjTxtStatus: ["", "", "", "", "", "", "", "", "", ""],
    yjListWidth: "676px",
    animationClass: "",
    yjBtnTxt: "择吉日"
  },
  onLoad: function () {
    this.dateNow = new Date(), this.viewDate = new Date(), this.prevViewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1),
      this.prevViewDate.setMonth(this.prevViewDate.getMonth() - 1), this.nextViewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1),
      this.nextViewDate.setMonth(this.nextViewDate.getMonth() + 1), this.setMonthItemActive(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.dateNow.getDate()),
      Object.assign(this, n), this.init(), a.register(this, "deviceOk", function () { }),
      console.log(i.solar2lunar(2017, 6, 19));
  },
  onUnload: function () {
    a.unRegister(this, null);
  },
  initPageData: function () {
    this.setData({
      deviceString: "not ok"
    }), h.globalData.model && this.setData({
      deviceString: h.globalData.model
    });
  },
  onReady: function () {
    h.globalData.share = false
    var a = this;

    var i = 10 * (this.data.yjTxtList.length - 1) + 30;
    this.data.yjTxtList.forEach(function (t) {
      i += 16 * t.length + 22;
    });
    var n = h.globalData.windowWidth - h.globalData.windowWidth % 7;
    this.monthItemWidth = Math.floor(n / 7), this.monthList[0] = this.createMonthView(this.prevViewDate.getFullYear(), this.prevViewDate.getMonth(), 0),
      this.monthList[1] = this.createMonthView(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1),
      this.monthList[2] = this.createMonthView(this.nextViewDate.getFullYear(), this.nextViewDate.getMonth(), 2),
      this.monthAnimation.translate3d(-h.globalData.windowWidth, 0, 0).step({
        duration: 0
      }), this.setData({
        yjListWidth: i + "px",
        screenWidth: h.globalData.windowWidth,
        monthAnimation: this.monthAnimation.export(),
        monthViewWidth: n,
        monthList: this.monthList,
        singleMonthDayObj: {
          year: this.monthList[1].year,
          month: this.monthList[1].month,
          monthViewHeight: this.monthList[1].monthViewHeight,
          monthViewTop: this.monthList[1].monthViewTop,
          monthDayList: this.monthList[1].monthDayList
        },
        currentDateString: e.formatDate(this.viewDate, "yyyy年M月")
      }),
      // this.locationGet(),

      t.getSystemInfo().then(function (t) {
        a.DPR = Math.floor(t.pixelRatio), a.screenWidth = t.screenWidth

      })

  },

  loadOut: function () {
    var e = t.createAnimation({
      duration: 150,
      timingFunction: "ease-out"
    });
    e.scale(0).step(), this.setData({
      loadEaseOut: e.export()
    });
  },
  onHide: function () {
    this.dateSelectModuleHideNow();
  },
  onShareAppMessage: function () {
    return {
      title: "新加坡生活必备小程序",
      path: "/pages/index/index"
    };
  },
  dateSelectCallback: function (t, e, a) {
    this.swiperToMonth(t, e, a);
  },
  dateSelectTap: function () {
    this.dateSelectShow(!0, this.viewDate);
  },

  createShowText: function (t) {
    var e = t, a = Math.round((this.screenWidth - 44) / 15);
    e.length >= 3 * a && (e = e.substring(0, 2 * a - 2), this.screenWidth > 400 && (e = e.substring(0, 2 * a - 3)),
      e += " …"), this.setData({
        showAstroText: e
      });
  },

  pickerTap: function () { },

  dayViewTap: function () {
    h.globalData.dayViewTap = !0, t.navigateTo({
      url: "../lunar/lunar"
    });
  },
  prevMonthTap: function () {
    this.moveToPrevMonth();
  },
  nextMonthTap: function () {
    this.moveToNextMonth();
  },
  todayTap: function () {
    this.swiperToMonth(this.dateNow.getFullYear(), this.dateNow.getMonth(), this.dateNow.getDate()),
      this.setData({
        isWeatherDateShow: !1
      });
  },
  yjToggleBtn: function () {
    var t = "" === this.data.animationClass ? "animate-slide-down" : "", e = "择吉日" === this.data.yjBtnTxt ? "收起" : "择吉日";
    if ("择吉日" === e) {
      var a = [];
      this.data.yjTxtStatus.forEach(function (t, e) {
        a.push("");
      }), this.monthList.forEach(function (t) {
        t.monthDayList.forEach(function (t) {
          t.monthClass = t.monthClass.replace(/yi/g, ""), t.monthClass = t.monthClass.trim();
        });
      }), this.currentYjIndex = -1, this.setData({
        yjTxtStatus: a,
        monthList: this.monthList,
        "singleMonthDayObj.monthDayList": this.monthList[1].monthDayList,
        animationClass: t,
        yjBtnTxt: e
      });
    } else this.setData({
      animationClass: t,
      yjBtnTxt: e
    });
  },
  yjSelectTap: function (t) {
    var e = this, a = [], i = t.target.dataset.index;
    this.data.yjTxtStatus.forEach(function (t, n) {
      e.currentYjIndex === i ? a.push("") : n === i ? a.push("active") : a.push("");
    }), this.monthList.forEach(function (t) {
      t.monthDayList.forEach(function (t) {
        if (t.monthClass = t.monthClass.replace(/yi/g, ""), t.monthClass = t.monthClass.trim(),
          e.currentYjIndex !== i) {
          var a = e.getYiStatus(t.year, t.month, t.day, e.data.yjTxtList[i]);
          "" !== a && (t.monthClass += a);
        }
      });
    }), this.currentYjIndex === i ? this.currentYjIndex = -1 : this.currentYjIndex = i,
      this.setData({
        yjTxtStatus: a,
        monthList: this.monthList,
        "singleMonthDayObj.monthDayList": this.monthList[1].monthDayList
      });
  },
  monthTouchStart: function (t) {
    this.startTimeStamp = t.timeStamp;
    var e = t.touches[0];
    this.startX = e.pageX, this.startY = e.pageY;
  },
  monthTouchMove: function () { },
  monthTouchEnd: function (t) {
    var a = t.changedTouches[0], i = a.pageX, n = a.pageY, o = t.timeStamp, s = e.getSlideDirection(this.startX, this.startY, i, n, o - this.startTimeStamp, Math.floor(h.globalData.windowWidth / 5));
    "left" === s ? this.moveToNextMonth() : "right" === s && this.moveToPrevMonth();
  },
  moveToNextMonth: function () {
    var t = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate());
    if (t.setMonth(t.getMonth() + 1), t > this.maxDate) return !1;
    if (this.isScrolling) return !1;
    this.isScrolling = !0, this.prevViewDate.setDate(1), this.viewDate.setDate(1), this.nextViewDate.setDate(1),
      this.prevViewDate.setMonth(this.prevViewDate.getMonth() + 1), this.viewDate.setMonth(this.viewDate.getMonth() + 1),
      this.nextViewDate.setMonth(this.nextViewDate.getMonth() + 1);
    var e = new Date(), a = !0;
    this.viewDate.getMonth() === e.getMonth() && (a = !1), this.setData({
      singleMonthDisplay: "0",
      monthViewDisplay: "1",
      isWeatherDateShow: a
    });
    var i = this.createMonthView(this.nextViewDate.getFullYear(), this.nextViewDate.getMonth(), 1);
    this.betweenMonthChangeAction(i, 1);
  },
  moveToPrevMonth: function () {
    var t = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate());
    if (t.setMonth(t.getMonth() - 1), t < this.minDate) return !1;
    if (this.isScrolling) return !1;
    this.isScrolling = !0, this.prevViewDate.setDate(1), this.viewDate.setDate(1), this.nextViewDate.setDate(1),
      this.prevViewDate.setMonth(this.prevViewDate.getMonth() - 1), this.viewDate.setMonth(this.viewDate.getMonth() - 1),
      this.nextViewDate.setMonth(this.nextViewDate.getMonth() - 1);
    var e = new Date(), a = !0;
    this.viewDate.getMonth() === e.getMonth() && (a = !1), this.setData({
      singleMonthDisplay: "0",
      monthViewDisplay: "1",
      isWeatherDateShow: a
    });
    var i = this.createMonthView(this.prevViewDate.getFullYear(), this.prevViewDate.getMonth(), -1);
    this.betweenMonthChangeAction(i, -1);
  },
  monthItemTap: function (t) {
    for (var e = parseInt(t.currentTarget.dataset.year), a = parseInt(t.currentTarget.dataset.month), i = parseInt(t.currentTarget.dataset.day), n = new Date(e, a, i), o = 0; o < this.monthList[1].monthDayList.length; o++) {
      var s = this.monthList[1].monthDayList[o];
      if (s.year === e && s.month === a && s.day === i) {
        if (s.monthClass.indexOf("active") >= 0) return !1;
        if (s.monthClass.indexOf("last") >= 0) {
          if (n < this.minDate) return !1;
          this.moveToPrevMonth();
        } else if (s.monthClass.indexOf("next") >= 0) {
          if (n > this.maxDate) return !1;
          this.moveToNextMonth();
        }
      }
    }
    var h = this.setMonthItemActive(e, a, i), r = new Date(), l = !0;
    e === r.getFullYear() && a === r.getMonth() && i === r.getDate() && (l = !1), this.setData({
      monthList: this.monthList,
      "singleMonthDayObj.monthDayList": this.monthList[1].monthDayList,
      todayDisaply: h,
      isWeatherDateShow: l
    });
  },
  createMonthView: function (t, e, a) {
    var i = [], n = s = t, o = r = e, s = t, r = e;
    o - 1 < 0 ? (o = 11, n--) : o-- , r + 1 > 11 ? (r = 0, s++) : r++;
    for (var l = new Date(t, e, 1).getDay(), c = new Date(t, e + 1, 0).getDate(), m = Math.ceil((c - (7 - l)) / 7) + 1, d = Math.floor((this.monthViewHeight - this.monthItemWidth * m) / (m - 1)), w = new Date(n, o + 1, 0).getDate(), g = {}, D = w - l + 1; D <= w; D++) g = this.getDayObj(n, o, D, d, "last"),
      i.push(g);
    for (var u = 1; u <= c; u++) g = this.getDayObj(t, e, u, d, "current"), i.push(g);
    for (var y = 1; y <= 7 * m - c - l; y++) g = this.getDayObj(s, r, y, d, "next"),
      i.push(g);
    var p = this.monthViewHeight, v = this.monthViewTop;
    return h.globalData.windowWidth >= 414 && m >= 6 && (p += 5, v -= 5), {
      index: a,
      year: t,
      month: e,
      monthViewHeight: p,
      monthViewTop: v,
      monthDayList: i
    };
  },
  getDayObj: function (t, e, a, n, o) {
    var s = {
      index: a,
      year: t,
      month: e,
      day: a,
      width: this.monthItemWidth,
      height: this.monthItemWidth,
      monthItemMarginBottom: n,
      lunarDay: "",
      monthClass: o,
      vacationClass: "",

    }, r = "", l = i.solar2lunar(t, e, a), c = l.lYear, m = l.lMonth, d = l.lDay, w = [];
    festival && (w = this.getJieri(c, m, d, t, e, a)), w = w.length > 0 && w[0].P >= 5 ? w : [],
      l.isTerm && w.push({
        P: 8,
        L: l.Term,
        sterm: !0
      });
    var g = new Date(t, e, a), D = i.getDogDayInfo(g);
    D.length && D.indexOf("第1天") > -1 > 0 && w.push({
      P: 7,
      L: D.substr(0, 2)
    });
    var u = i.getColdInfo(g);
    if (u.length && u.indexOf("第1天") > -1 > 0 && w.push({
      P: 7,
      L: u.substr(0, 2)
    }), 0 === w.length ? r = "初一" === l.IDayCn ? l.IMonthCn : l.IDayCn : (w.sort(function (t, e) {
      return t = parseInt(t.P, 10), e = parseInt(e.P, 10), t === e ? 0 : t < e ? 1 : -1;
    }), r = w[0].L || w[0].V, w[0].sterm && (s.monthClass += " jieqi")), s.lunarDay = r
    ) {
      var y = t.toString() + (e + 1 < 10 ? "0" + (e + 1) : e + 1) + (a < 10 ? "0" + a : a), p = vacation[y];

      "1" === p ? s.vacationClass = "xiu" : ("2" === p ? (s.vacationClass = "ban") : "3" === p && (s.vacationClass = "xin"));

    }

    t === this.dateNow.getFullYear() && e === this.dateNow.getMonth() && a === this.dateNow.getDate() && (s.monthClass += " today active");
    var v = new Date(t, e, a);
    if (6 !== v.getDay() && 0 !== v.getDay() || (s.monthClass += " weekind"), -1 !== this.currentYjIndex) {
      var f = this.getYiStatus(t, e, a, this.data.yjTxtList[this.currentYjIndex]);
      "" !== f && (s.monthClass += f);
    }
    return s;
  },
  getYiStatus: function (t, e, a, n) {
    var o = new Date(t, e, a), h = i.getYJSqlFields(o), r = "-";
    return s && s[h[1] + "-" + h[0]] && (r = s[h[1] + "-" + h[0]].y), r.indexOf(n) > -1 ? " yi" : "";
  },
  betweenMonthChangeAction: function (t, a) {
    var i = this;
    -1 === a ? (this.monthAnimation.translate3d(0, 0, 0).step(), this.setData({
      monthAnimation: this.monthAnimation.export(),
      currentDateString: e.formatDate(this.viewDate, "yyyy年M月")
    }), e.sleep(this.monthDuration).then(function () {
      i.monthList.pop(), i.prevMonthIndex-- , i.monthList.unshift({
        index: i.prevMonthIndex,
        year: t.year,
        month: t.month,
        monthViewHeight: t.monthViewHeight,
        monthViewTop: t.monthViewTop,
        monthDayList: t.monthDayList
      }), i.swiperEndAction(a);
    })) : 1 === a && (this.monthAnimation.translate3d(-2 * h.globalData.windowWidth, 0, 0).step(),
      this.setData({
        monthAnimation: this.monthAnimation.export(),
        currentDateString: e.formatDate(this.viewDate, "yyyy年M月")
      }), e.sleep(this.monthDuration).then(function () {
        i.monthList.shift(), i.nextMonthIndex++ , i.monthList.push({
          index: i.nextMonthIndex,
          year: t.year,
          month: t.month,
          monthViewHeight: t.monthViewHeight,
          monthViewTop: t.monthViewTop,
          monthDayList: t.monthDayList
        }), i.swiperEndAction(a);
      }));
  },
  swiperEndAction: function (t) {
    var e = this.monthList[1].year, a = this.monthList[1].month, n = 0, o = {};
    e === this.dateNow.getFullYear() && a === this.dateNow.getMonth() ? n = this.dateNow.getDate() : -1 === t ? n = i.solarDays(this.monthList[1].year, this.monthList[1].month) : 1 === t && (n = 1);
    var s = this.setMonthItemActive(e, a, n);
    this.monthAnimation.translate3d(-h.globalData.windowWidth, 0, 0).step({
      duration: 0
    }), Object.assign(o, {
      singleMonthDayObj: {
        year: e,
        month: a,
        monthViewHeight: this.monthList[1].monthViewHeight,
        monthViewTop: this.monthList[1].monthViewTop,
        monthDayList: this.monthList[1].monthDayList
      },
      singleMonthDisplay: "1",
      monthViewDisplay: "0",
      monthList: this.monthList,
      monthAnimation: this.monthAnimation.export(),
      todayDisaply: s
    }), this.setData(o), this.isScrolling = !1;
  },
  setMonthItemActive: function (t, e, a) {
    for (var i = "bolck", n = 0; n < this.monthList.length; n++) for (var o = this.monthList[n].monthDayList, s = 0; s < o.length; s++) {
      var r = o[s];
      r.monthClass = r.monthClass.replace(" active", "").replace(" today", ""), r.monthClass.indexOf("current") >= 0 && r.year === this.dateNow.getFullYear() && r.month === this.dateNow.getMonth() && r.day === this.dateNow.getDate() && (r.monthClass += " today"),
        r.monthClass.indexOf("current") >= 0 && r.year === t && r.month === e && r.day === a && (r.monthClass += " active",
          t === this.dateNow.getFullYear() && e === this.dateNow.getMonth() && a === this.dateNow.getDate() && (r.monthClass.indexOf("today") < 0 && (r.monthClass += " today"),
            i = "none"));
    }
    return this.viewDate.setDate(a), this.getDayViewData(t, e, a), h.globalData.year = t,
      h.globalData.month = e, h.globalData.day = a, i;
  },
  getDayViewData: function (t, a, n) {
    var o = new Date(t, a, n), h = {
      year: t,
      month: a,
      day: n,
      festivalDisplay: !1
    }, r = i.solar2lunar(t, a, n), l = r.IMonthCn + r.IDayCn, c = "第" + i.getYearWeek(t, a, n) + "周", m = r.astro;
    h.lunarDayDetail = "农历" + l + " " + c + " " + m;
    var d = r.Animal, w = i.getLunarHourIndex(this.dateNow.getHours()), g = 0, D = new Date(t, a, n);
    0 === w ? (D.setDate(D.getDate() + 1), g = 0) : g = this.dateNow.getHours();
    var u = i.getStemsBranchHourAsString(D, g), y = r.gzYear + "[" + d + "]年 " + r.gzMonth + "月 " + r.gzDay + "日 " + u + "时";
    h.lunarDate = y;
    var p = this.getDayFestivalData(t, a, n);
    h.jiejiari = p.jiejiari, h.festivalDisplay = p.festivalDisplay;
    var v = i.getYJSqlFields(o), f = "-", x = "-";
    s && s[v[1] + "-" + v[0]] && (f = s[v[1] + "-" + v[0]].y, x = s[v[1] + "-" + v[0]].j),
      h.yi = "" === f ? "-" : f, h.ji = "" === x ? "-" : x, this.setData({
        dayViewObj: h
      }), this.title = e.formatDate(o, "yyyy.M.d") + " 周" + i.nStr1[r.nWeek], this.desc = "农历" + l + "，" + r.gzYear + "[" + d + "]年 " + r.gzMonth + "月 " + r.gzDay + "日";
  },
  getDayFestivalData: function (t, e, a) {
    var n = i.solar2lunar(t, e, a), o = n.isTerm ? n.Term : "", s = n.lYear, r = n.lMonth, l = n.lDay, c = [];
    festival && (c = this.getJieri(s, r, l, t, e, a));
    var m = new Date(t, e, a), d = i.getDogDayInfo(m);
    d.length > 0 && c.push({
      P: 7,
      V: d
    });
    var w = i.getColdInfo(m);
    w.length > 0 && c.push({
      P: 7,
      V: w
    });
    for (var g = "", D = 0; D < c.length; D++) g += (c[D].V || c[D].L) + " ";
    var u = (o + " " + g).trim();
    return {
      jiejiari: u,
      festivalDisplay: u.length > 1
    };
  },
  getJieri: function (t, e, a, n, o, s) {
    o += 1;
    var r = (e < 10 ? "0" + e : e.toString()) + (a < 10 ? "0" + a : a.toString()), l = (o < 10 ? "0" + o : o.toString()) + (s < 10 ? "0" + s : s.toString()), c = [], m = festival.S[l];
    if (m && m.length > 0) for (var d = 0; d < m.length; d++) n >= parseInt(m[d].Y, 10) && c.push(m[d]);
    var w = festival.L[r];
    if (w && w.length > 0) for (var g = 0; g < w.length; g++) t >= parseInt(w[g].Y, 10) && c.push(w[g]);
    var D = this.getWeekIndexString(n, o, s), u = festival.W[D];
    if (u && u.length > 0) for (var y = 0; y < u.length; y++) n >= parseInt(u[y].Y, 10) && c.push(u[y]);
    return i.isEaster(n, o, s) && c.push({
      P: 5,
      V: "复活节"
    }), c.length > 0 ? (c.sort(function (t, e) {
      return t = parseInt(t.P, 10), e = parseInt(e.P, 10), t === e ? 0 : t < e ? 1 : -1;
    }), c) : [];
  },
  getWeekIndexString: function (t, e, a) {
    var i = Math.ceil(a / 7), n = new Date(t, e - 1, a).getDay();
    return (e < 10 ? "0" + e : e.toString()) + i + n;
  },
  swiperToMonth: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.dateNow.getFullYear(), e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.dateNow.getMonth(), a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
    if (this.isScrolling) return !1;
    this.isScrolling = !0;
    var i = new Date(t, e, 1);
    if (t === this.viewDate.getFullYear() && e === this.viewDate.getMonth()) {
      var n = this.setMonthItemActive(t, e, 0 === a ? this.dateNow.getDate() : a);
      this.setData({
        monthList: this.monthList,
        "singleMonthDayObj.monthDayList": this.monthList[1].monthDayList,
        todayDisaply: n
      }), this.isScrolling = !1;
    } else this.viewDate < i ? this.changeMonthAction(t, e, a, 1) : this.viewDate > i && this.changeMonthAction(t, e, a, -1);
  },
  changeMonthAction: function (t, a, n, o) {
    var s = this;
    this.viewDate = new Date(t, a, n), this.prevViewDate = new Date(t, a, 1), this.prevViewDate.setMonth(this.prevViewDate.getMonth() - 1),
      this.nextViewDate = new Date(t, a, 1), this.nextViewDate.setMonth(this.nextViewDate.getMonth() + 1),
      this.setData({
        singleMonthDisplay: "0",
        monthViewDisplay: "1"
      });
    var r = this.createMonthView(t, a, 1), l = {
      index: ++this.nextMonthIndex,
      year: r.year,
      month: r.month,
      monthViewHeight: r.monthViewHeight,
      monthViewTop: r.monthViewTop,
      monthDayList: r.monthDayList
    };
    1 === o ? (this.monthList[2] = l, this.monthAnimation.translate3d(-2 * h.globalData.windowWidth, 0, 0).step()) : (this.monthList[0] = l,
      this.monthAnimation.translate3d(0, 0, 0).step());
    var c = this.setMonthItemActive(t, a, n);
    this.setData({
      monthAnimation: this.monthAnimation.export(),
      singleMonthDayObj: l,
      currentDateString: t + "年" + (a + 1) + "月",
      todayDisaply: c
    }), e.sleep(this.monthDuration).then(function () {
      t === s.dateNow.getFullYear() && a === s.dateNow.getMonth() ? n = s.dateNow.getDate() : 0 === n && -1 === o ? n = 1 : 0 === n && 1 === o && (n = i.solarDays(s.monthList[1].year, s.monthList[1].month)),
        s.monthList = [], s.monthList[0] = s.createMonthView(s.prevViewDate.getFullYear(), s.prevViewDate.getMonth(), 0),
        s.monthList[1] = s.createMonthView(s.viewDate.getFullYear(), s.viewDate.getMonth(), 1),
        s.monthList[2] = s.createMonthView(s.nextViewDate.getFullYear(), s.nextViewDate.getMonth(), 2);
      var e = s.setMonthItemActive(t, a, n);
      s.monthAnimation.translate3d(-h.globalData.windowWidth, 0, 0).step({
        duration: 0
      }), s.setData({
        singleMonthDisplay: "1",
        monthViewDisplay: "0",
        monthList: s.monthList,
        monthAnimation: s.monthAnimation.export(),
        todayDisaply: e
      }), s.isScrolling = !1;
    });
  }

});