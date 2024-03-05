var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(n, o) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) && "undefined" != typeof module ? module.exports = o() : "function" == typeof define && define.amd ? define(o) : n.api = o();
}(void 0, function() {
    function e(e, o) {
        if (e) {
            t && console.log("ebus send: ", e);
            for (var r = 0; r < n.length; ++r) {
                var l = n[r];
                l.eventName === e && (l.func(o, l.observer), t && console.log("event: ", e, " get a event_post"));
            }
        } else t && console.error("event name  can't not be null");
    }
    var n = [], o = {}, t = !1;
    return {
        register: function(e, o, r) {
            o && r ? (e || t && console.warn(o, ", no observer can't remove event"), r = r.bind(e), 
            n.push({
                eventName: o,
                func: r,
                observer: e
            }), t && console.log(n.length, " : ", o, " registered\n ", r)) : t && console.error("event name || function can't not be null");
        },
        post: e,
        postSticky: function(n, r) {
            e(n, r), o[n] = r, t && console.log("post a sticky: " + n);
        },
        removeSticky: function(e) {
            o[e] = null, t && console.log("remove a sticky: " + e);
        },
        getSticky: function(e) {
            return o[e];
        },
        unRegister: function(e, o) {
            if (o && e) {
                for (var r = 0; r < n.length; ++r) {
                    var l = n[r];
                    if (l.eventName === o && l.observer === e) return n.splice(r, 1), t && console.log("unRegister event:", o), 
                    1;
                }
                return t && console.log("can't find event:", o), 0;
            }
            if (o && !e) {
                var c = n.map(function(e, n) {
                    return e.eventName === o ? n : -1;
                }).filter(function(e) {
                    return e >= 0;
                }).reverse();
                if (t && console.log(c), c.length > 0) {
                    for (var i = 0; i < c.length; i++) n.splice(c[i], 1), t && console.log("unRegister event by eventName: ", o);
                    return c.length;
                }
                return t && console.log("can't find event: ", o), 0;
            }
            if (!o && e) {
                var s = n.map(function(n, o) {
                    return n.observer === e ? o : -1;
                }).filter(function(e) {
                    return e >= 0;
                }).reverse();
                if (t && console.log(s), s.length > 0) {
                    for (var u = 0; u < s.length; u++) n.splice(s[u], 1), t && console.log("unRegister event by  observer_", u);
                    return s.length;
                }
                return t && console.log("can't find event by observer"), 0;
            }
            return t && console.error("event name || function can't not be null"), 0;
        }
    };
});