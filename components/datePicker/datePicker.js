var t = require("../../utils/api"), e = require("../../utils/util").r, a = require("../../utils/calendar"), d = {
    dateNow: new Date(),
    pickerDate: new Date(),
    minDate: new Date(1901, 1, 19),
    maxDate: new Date(2099, 11, 31),
    minLDate: [ 1901, 0, 1 ],
    maxLDate: [ 2099, 11, 20 ],
    dateSelectProps: {
        height: 238,
        itemHeight: 34,
        indicatorTop: 68,
        indicatorHeight: 34,
        animation: t.createAnimation({
            duration: 0,
            delay: 0
        }),
        dataState1: {
            groupIndex: 1,
            defaultIndex: -1,
            defaultList: [],
            selected: 0
        },
        dataState2: {
            groupIndex: 1,
            defaultIndex: -1,
            defaultList: [],
            selected: 0
        },
        dataState3: {
            groupIndex: 1,
            defaultIndex: -1,
            defaultList: [],
            selected: 0
        },
        data: {
            maskZindex: -1,
            maskOpacity: 0,
            modalZindex: -1,
            modalOpacity: 0,
            lunarClass: "",
            pickerDataList1: [],
            pickerDataList2: [],
            pickerDataList3: [],
            datePickerViewValue: [ 0, 0, 0 ]
        }
    },
    isSolar: !0,
    init: function() {
        this.setData(this.data), this.initSolarDateSelect(), this.setData({
            datePickerViewValue: [ this.dateSelectProps.dataState1.defaultIndex, this.dateSelectProps.dataState2.defaultIndex, this.dateSelectProps.dataState3.defaultIndex ]
        });
    },
    dateSelectShow: function(t, e) {
        if (void 0 != t && null != t && (this.isSolar = t, this.setData({
            lunarClass: this.isSolar ? "" : "active"
        })), e && (this.pickerDate = new Date(e.getFullYear(), e.getMonth(), e.getDate())), 
        this.isSolar) {
            var a = [ this.pickerDate.getFullYear() - this.minDate.getFullYear(), this.pickerDate.getMonth(), this.pickerDate.getDate() - 1 ], d = this.getGroupIndex(a), s = -1;
            1 === d ? (s = this.dateSelectProps.dataState1.defaultIndex, this.dateSelectProps.dataState2.defaultIndex = a[1], 
            this.dateSelectProps.dataState3.defaultIndex = a[2]) : 2 === d ? (s = this.dateSelectProps.dataState2.defaultIndex, 
            this.dateSelectProps.dataState3.defaultIndex = a[2]) : 3 === d && (s = this.dateSelectProps.dataState3.defaultIndex), 
            this.onChange && this.onChange(null, a[d - 1], d, s);
        } else this.initLunarDateSelect(e.getFullYear(), e.getMonth(), e.getDate()), this.setData({
            datePickerViewValue: [ this.dateSelectProps.dataState1.defaultIndex, this.dateSelectProps.dataState2.defaultIndex, this.dateSelectProps.dataState3.defaultIndex ]
        });
        this.dateSelectModuleShow();
    },
    datePickerChange: function(t) {
        var e = this.getGroupIndex(t.detail.value), a = 0;
        1 === e ? a = this.dateSelectProps.dataState1.defaultIndex : 2 === e ? a = this.dateSelectProps.dataState2.defaultIndex : 3 === e && (a = this.dateSelectProps.dataState3.defaultIndex), 
        this.onChange && this.onChange(null, t.detail.value[e - 1], e, a);
    },
    getGroupIndex: function(t) {
        var e = -1;
        return this.dateSelectProps.dataState1.defaultIndex !== t[0] ? e = 1 : this.dateSelectProps.dataState2.defaultIndex !== t[1] ? e = 2 : this.dateSelectProps.dataState3.defaultIndex !== t[2] && (e = 3), 
        e;
    },
    onChange: function(t, e, a, d) {
        if (a < 1) return !1;
        1 === a && e < this.dateSelectProps.dataState1.defaultList.length ? (this.dateSelectProps.dataState1.defaultIndex = e, 
        0 === this.dateSelectProps.dataState1.defaultIndex && (this.dateSelectProps.dataState2.defaultIndex < this.minDate.getMonth() && (this.dateSelectProps.dataState2.defaultIndex = this.minDate.getMonth()), 
        this.dateSelectProps.dataState3.defaultIndex < this.minDate.getDate() && (this.dateSelectProps.dataState3.defaultIndex = this.minDate.getDate() - 1)), 
        this.getDateSelectMonthInfo(d), this.getDateSelectDayInfo()) : 2 === a && e < this.dateSelectProps.dataState2.defaultList.length ? (this.dateSelectProps.dataState2.defaultIndex = e, 
        this.isSolar ? 0 === this.dateSelectProps.dataState1.defaultIndex && e < this.minDate.getMonth() && (this.dateSelectProps.dataState2.defaultIndex = this.minDate.getMonth()) : this.dateSelectProps.dataState1.defaultIndex === this.maxLDate[0] - this.minLDate[0] && e > this.maxLDate[1] && (this.dateSelectProps.dataState2.defaultIndex = this.maxLDate[1]), 
        this.getDateSelectDayInfo()) : 3 === a && e < this.dateSelectProps.dataState3.defaultList.length && (this.dateSelectProps.dataState3.defaultIndex = e, 
        this.isSolar ? 0 === this.dateSelectProps.dataState1.defaultIndex && this.dateSelectProps.dataState2.defaultIndex === this.minDate.getMonth() && e < this.minDate.getDate() && (this.dateSelectProps.dataState3.defaultIndex = this.minDate.getDate() - 1) : this.dateSelectProps.dataState1.defaultIndex === this.maxLDate[0] - this.minLDate[0] && this.dateSelectProps.dataState2.defaultIndex === this.maxLDate[1] && e + 1 > this.maxLDate[2] && (this.dateSelectProps.dataState3.defaultIndex = this.maxLDate[2] - 1)), 
        this.setData({
            datePickerViewValue: [ this.dateSelectProps.dataState1.defaultIndex, this.dateSelectProps.dataState2.defaultIndex, this.dateSelectProps.dataState3.defaultIndex ]
        });
    },
    dateLunarTap: function() {
        if (this.isSolar) {
            var t = this.dateSelectProps.dataState1.defaultIndex + this.minDate.getFullYear(), e = this.dateSelectProps.dataState2.defaultIndex, d = this.dateSelectProps.dataState3.defaultIndex + 1;
            this.initLunarDateSelect(t, e, d), this.setData({
                datePickerViewValue: [ this.dateSelectProps.dataState1.defaultIndex, this.dateSelectProps.dataState2.defaultIndex, this.dateSelectProps.dataState3.defaultIndex ]
            }), this.isSolar = !1, this.setData({
                lunarClass: "active"
            });
        } else {
            var s = this.dateSelectProps.dataState1.defaultIndex + this.minLDate[0], i = this.dateSelectProps.dataState2.defaultIndex, l = this.dateSelectProps.dataState3.defaultIndex + 1, n = void 0;
            a.leapMonth(s) > 0 ? i < a.leapMonth(s) ? (i++, n = a.lunar2solar(s, i, l)) : n = i === a.leapMonth(s) ? a.lunar2solar(s, i, l, !0) : a.lunar2solar(s, i, l) : (i++, 
            n = a.lunar2solar(s, i, l)), n.cMonth - 1 < 0 ? this.initSolarDateSelect(n.cYear - 1, 11, n.cDay) : this.initSolarDateSelect(n.cYear, n.cMonth - 1, n.cDay), 
            this.isSolar = !0, this.setData({
                datePickerViewValue: [ this.dateSelectProps.dataState1.defaultIndex, this.dateSelectProps.dataState2.defaultIndex, this.dateSelectProps.dataState3.defaultIndex ]
            }), this.setData({
                lunarClass: ""
            });
        }
    },
    initSolarDateSelect: function(t, e, d) {
        t = t || this.pickerDate.getFullYear(), e = e || 0 === e ? e : this.pickerDate.getMonth(), 
        d = d || this.pickerDate.getDate();
        for (var s = [], i = 0, l = this.minDate.getFullYear(); l <= this.maxDate.getFullYear(); l++) t === l && (i = l - this.minDate.getFullYear()), 
        s.push(l + "年");
        t < this.minDate.getFullYear() && (i = 0), t > this.maxDate.getFullYear() && (i = this.maxDate.getFullYear() - this.minDate.getFullYear());
        for (var n = [], h = 0, o = 0; o <= 11; o++) {
            e === o && (h = o);
            var r = o + 1 + "月";
            n.push(r);
        }
        for (var S = a.solarDays(t, e), u = [], c = 0, p = new Date(t, e, 1), D = 1; D <= S; D++) d === D && (c = D - 1), 
        p.setDate(D), t === this.dateNow.getFullYear() && e === this.dateNow.getMonth() && D === this.dateNow.getDate() ? u.push("今天") : u.push(D + "日周" + a.nStr1[p.getDay()]);
        d > S && (c = S - 1), this.dateSelectProps.dataState1.defaultList = s, this.dateSelectProps.dataState2.defaultList = n, 
        this.dateSelectProps.dataState3.defaultList = u, this.dateSelectProps.dataState1.defaultIndex = i, 
        this.dateSelectProps.dataState2.defaultIndex = h, this.dateSelectProps.dataState3.defaultIndex = c, 
        this.setData({
            pickerDataList1: s,
            pickerDataList2: n,
            pickerDataList3: u
        });
    },
    initLunarDateSelect: function(t, e, d) {
        for (var s = a.solar2lunar(t, e, d), i = [], l = 0, n = this.minLDate[0]; n <= this.maxLDate[0]; n++) s.lYear === n && (l = n - this.minLDate[0]), 
        i.push(n + "年");
        var h = a.leapMonth(s.lYear), o = [], r = 0, S = 11;
        h > 0 && S++;
        for (var u = 0; u <= S; u++) s.lMonth - 1 === u && (r = u, h > 0 && s.lMonth > h && r++), 
        h > 0 ? u < h ? o.push(a.toChinaMonth(u + 1)) : u === h ? o.push("闰" + a.toChinaMonth(h)) : o.push(a.toChinaMonth(u)) : o.push(a.toChinaMonth(u + 1));
        s.isLeap && (r = h);
        for (var c = h === s.lMonth ? a.leapDays(s.lYear) : a.monthDays(s.lYear, s.lMonth), p = [], D = 0, f = {}, x = 1; x <= c; x++) s.lDay === x && (D = x - 1), 
        (f = a.lunar2solar(s.lYear, s.lMonth, x, s.isLeap)).cYear === this.dateNow.getFullYear() && f.cMonth - 1 === this.dateNow.getMonth() && f.cDay === this.dateNow.getDate() ? p.push("今天") : p.push(a.toChinaDay(x) + "周" + a.nStr1[f.nWeek]);
        this.dateSelectProps.dataState1.defaultList = i, this.dateSelectProps.dataState2.defaultList = o, 
        this.dateSelectProps.dataState3.defaultList = p, this.dateSelectProps.dataState1.defaultIndex = l, 
        this.dateSelectProps.dataState2.defaultIndex = r, this.dateSelectProps.dataState3.defaultIndex = D, 
        this.setData({
            pickerDataList1: i,
            pickerDataList2: o,
            pickerDataList3: p
        });
    },
    getDateSelectMonthInfo: function(t) {
        var e = [], d = 0, s = this.pickerDate.getFullYear(), i = this.pickerDate.getMonth();
        if (this.isSolar) {
            i = this.dateSelectProps.dataState2.defaultIndex;
            for (var l = 0; l <= 11; l++) {
                i === l && (d = l);
                var n = l + 1 + "月";
                e.push(n);
            }
        } else {
            s = this.dateSelectProps.dataState1.defaultIndex + this.minLDate[0], i = this.dateSelectProps.dataState2.defaultIndex;
            var h = a.leapMonth(s), o = 11;
            h > 0 && o++;
            for (var r = 0; r <= o; r++) {
                if (i === r) if (d = r, h > 0) i >= h && d++; else {
                    var S = t ? a.leapMonth(t + +this.minLDate[0]) : 0;
                    S > 0 && i >= S && d--;
                }
                h > 0 ? r < h ? e.push(a.toChinaMonth(r + 1)) : r === h ? e.push("闰" + a.toChinaMonth(h)) : e.push(a.toChinaMonth(r)) : e.push(a.toChinaMonth(r + 1));
            }
        }
        this.dateSelectProps.dataState2.defaultList = e, this.setData({
            pickerDataList2: e
        }), this.dateSelectProps.dataState2.defaultIndex = d;
    },
    getDateSelectDayInfo: function() {
        var t = [], e = 0;
        if (this.isSolar) {
            for (var d = this.dateSelectProps.dataState1.defaultIndex + this.minDate.getFullYear(), s = this.dateSelectProps.dataState2.defaultIndex, i = this.dateSelectProps.dataState3.defaultIndex + 1, l = a.solarDays(d, s), n = new Date(d, s, 1), h = 1; h <= l; h++) i === h && (e = h - 1), 
            n.setDate(h), d === this.dateNow.getFullYear() && s === this.dateNow.getMonth() && h === this.dateNow.getDate() ? t.push("今天") : t.push(h + "日周" + a.nStr1[n.getDay()]);
            i > l && (e = l - 1);
        } else {
            var o = !1, r = this.dateSelectProps.dataState1.defaultIndex + this.minLDate[0], S = this.dateSelectProps.dataState2.defaultIndex, u = this.dateSelectProps.dataState3.defaultIndex + 1;
            a.leapMonth(r) > 0 ? S < a.leapMonth(r) ? S++ : S === a.leapMonth(r) && (o = !0) : S++;
            for (var c = o ? a.leapDays(r) : a.monthDays(r, S), p = {}, D = 1; D <= c; D++) u === D && (e = D - 1), 
            (p = a.lunar2solar(r, S, D, o)).cYear === this.dateNow.getFullYear() && p.cMonth - 1 === this.dateNow.getMonth() && p.cDay === this.dateNow.getDate() ? t.push("今天") : t.push(a.toChinaDay(D) + "周" + a.nStr1[p.nWeek]);
        }
        this.dateSelectProps.dataState3.defaultList = t, this.setData({
            pickerDataList3: t
        }), this.dateSelectProps.dataState3.defaultIndex = e;
    },
    maskTap: function() {
        this.dateSelectModuleHide();
    },
    dateSelectCancelTap: function() {
        this.dateSelectModuleHide();
    },
    dateSelectConfirmTap: function() {
        var t = this, e = this.pickerDate.getFullYear(), d = this.pickerDate.getMonth(), s = this.pickerDate.getDate();
        if (this.isSolar) e = this.dateSelectProps.dataState1.defaultIndex + this.minDate.getFullYear(), 
        d = this.dateSelectProps.dataState2.defaultIndex, s = this.dateSelectProps.dataState3.defaultIndex + 1; else {
            e = this.dateSelectProps.dataState1.defaultIndex + this.minLDate[0], d = this.dateSelectProps.dataState2.defaultIndex, 
            s = this.dateSelectProps.dataState3.defaultIndex + 1;
            var i = void 0;
            a.leapMonth(e) > 0 ? d < a.leapMonth(e) ? (d++, i = a.lunar2solar(e, d, s)) : i = d === a.leapMonth(e) ? a.lunar2solar(e, d, s, !0) : a.lunar2solar(e, d, s) : (d++, 
            i = a.lunar2solar(e, d, s)), i.cnth - 1 < 0 ? (e = i.cYear - 1, d = 11, s = i.cDay) : (e = i.cYear, 
            d = i.cMonth - 1, s = i.cDay), setTimeout(function() {
                t.isSolar = !0, t.setData({
                    lunarClass: ""
                }), t.initSolarDateSelect(e, d, s), t.setData({
                    datePickerViewValue: [ t.dateSelectProps.dataState1.defaultIndex, t.dateSelectProps.dataState2.defaultIndex, t.dateSelectProps.dataState3.defaultIndex ]
                });
            }, 0);
        }
        this.pickerDate = new Date(e, d, s), this.dateSelectModuleHide(), this.dateSelectCallback(e, d, s);
    },
    dateSelectModuleShow: function() {
        this.setData({
            maskZindex: 999,
            maskOpacity: 1,
            modalZindex: 1e3,
            modalOpacity: 1
        });
    },
    dateSelectModuleHide: function() {
        var t = this;
        this.setData({
            maskOpacity: 0,
            modalOpacity: 0
        }), e.sleep(400).then(function() {
            t.setData({
                maskZindex: -1,
                modalZindex: -1
            });
        }), this.isSolar || setTimeout(function() {
            t.isSolar = !0, t.setData({
                lunarClass: ""
            }), t.initSolarDateSelect(), t.setData({
                datePickerViewValue: [ t.dateSelectProps.dataState1.defaultIndex, t.dateSelectProps.dataState2.defaultIndex, t.dateSelectProps.dataState3.defaultIndex ]
            });
        }, 0);
    },
    dateSelectModuleHideNow: function() {
        var t = this;
        this.setData({
            maskOpacity: 0,
            modalOpacity: 0,
            maskZindex: -1,
            modalZindex: -1
        }), this.isSolar || setTimeout(function() {
            t.isSolar = !0, t.setData({
                lunarClass: ""
            }), t.initSolarDateSelect(), t.setData({
                datePickerViewValue: [ t.dateSelectProps.dataState1.defaultIndex, t.dateSelectProps.dataState2.defaultIndex, t.dateSelectProps.dataState3.defaultIndex ]
            });
        }, 0);
    },
    catchMaskTouchMove: function() {}
};

module.exports = d;