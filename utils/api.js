function e() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "GET";
    return function(o) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return n.request({
            url: o,
            data: t,
            method: e,
            header: {
                "Content-Type": "application/json"
            }
        });
    };
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = require("Promise"), n = module.exports = {};

n.default = n, n.debug = !0, Object.defineProperty(n, "app", {
    get: function() {
        return getApp();
    }
});

var r = {
    stopRecord: !0,
    pauseVoice: !0,
    stopVoice: !0,
    pauseBackgroundAudio: !0,
    stopBackgroundAudio: !0,
    createAudioContext: !0,
    createVideoContext: !0,
    showNavigationBarLoading: !0,
    hideNavigationBarLoading: !0,
    createAnimation: !0,
    createContext: !0,
    drawCanvas: !0,
    canvasToTempFilePath: !0,
    hideKeyboard: !0,
    stopPullDownRefresh: !0
};

Object.keys(wx).forEach(function(e) {
    r[e] || "on" === e.substr(0, 2) || /\w+Sync$/.test(e) ? n[e] = function() {
        if (n.debug) {
            var t = wx[e].apply(wx, arguments);
            return t || "" === t || (t = {}), t && "object" === (void 0 === t ? "undefined" : o(t)) && (t.then = function() {
                console.warn("wx." + e + " is not a async function, you should not use Promise");
            }), t;
        }
        return wx[e].apply(wx, arguments);
    } : n[e] = function(o) {
        return o = o || {}, new t(function(t, n) {
            o.success = t, o.fail = function(e) {
                n(e && e.errMsg ? new Error(e.errMsg) : e);
            }, wx[e](o);
        });
    };
}), n.GET = e("GET"), n.POST = e("POST"), n.PUT = e("PUT"), n.DELETE = e("DELETE");