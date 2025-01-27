(function() {
    const l = document.createElement("link").relList;
    if (l && l.supports && l.supports("modulepreload"))
        return;
    for (const c of document.querySelectorAll('link[rel="modulepreload"]'))
        h(c);
    new MutationObserver(c => {
        for (const r of c)
            if (r.type === "childList")
                for (const v of r.addedNodes)
                    v.tagName === "LINK" && v.rel === "modulepreload" && h(v)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function d(c) {
        const r = {};
        return c.integrity && (r.integrity = c.integrity),
        c.referrerPolicy && (r.referrerPolicy = c.referrerPolicy),
        c.crossOrigin === "use-credentials" ? r.credentials = "include" : c.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin",
        r
    }
    function h(c) {
        if (c.ep)
            return;
        c.ep = !0;
        const r = d(c);
        fetch(c.href, r)
    }
}
)();
var E = {
    exports: {}
}, R;
function H() {
    if (R)
        return E.exports;
    R = 1;
    var f = typeof Reflect == "object" ? Reflect : null, l = f && typeof f.apply == "function" ? f.apply : function(e, n, i) {
        return Function.prototype.apply.call(e, n, i)
    }
    , d;
    f && typeof f.ownKeys == "function" ? d = f.ownKeys : Object.getOwnPropertySymbols ? d = function(e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
    }
    : d = function(e) {
        return Object.getOwnPropertyNames(e)
    }
    ;
    function h(t) {
        console && console.warn && console.warn(t)
    }
    var c = Number.isNaN || function(e) {
        return e !== e
    }
    ;
    function r() {
        r.init.call(this)
    }
    E.exports = r,
    E.exports.once = U,
    r.EventEmitter = r,
    r.prototype._events = void 0,
    r.prototype._eventsCount = 0,
    r.prototype._maxListeners = void 0;
    var v = 10;
    function u(t) {
        if (typeof t != "function")
            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t)
    }
    Object.defineProperty(r, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
            return v
        },
        set: function(t) {
            if (typeof t != "number" || t < 0 || c(t))
                throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
            v = t
        }
    }),
    r.init = function() {
        (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null),
        this._eventsCount = 0),
        this._maxListeners = this._maxListeners || void 0
    }
    ,
    r.prototype.setMaxListeners = function(e) {
        if (typeof e != "number" || e < 0 || c(e))
            throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
        return this._maxListeners = e,
        this
    }
    ;
    function p(t) {
        return t._maxListeners === void 0 ? r.defaultMaxListeners : t._maxListeners
    }
    r.prototype.getMaxListeners = function() {
        return p(this)
    }
    ,
    r.prototype.emit = function(e) {
        for (var n = [], i = 1; i < arguments.length; i++)
            n.push(arguments[i]);
        var o = e === "error"
          , a = this._events;
        if (a !== void 0)
            o = o && a.error === void 0;
        else if (!o)
            return !1;
        if (o) {
            var s;
            if (n.length > 0 && (s = n[0]),
            s instanceof Error)
                throw s;
            var m = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
            throw m.context = s,
            m
        }
        var L = a[e];
        if (L === void 0)
            return !1;
        if (typeof L == "function")
            l(L, this, n);
        else
            for (var P = L.length, B = A(L, P), i = 0; i < P; ++i)
                l(B[i], this, n);
        return !0
    }
    ;
    function g(t, e, n, i) {
        var o, a, s;
        if (u(n),
        a = t._events,
        a === void 0 ? (a = t._events = Object.create(null),
        t._eventsCount = 0) : (a.newListener !== void 0 && (t.emit("newListener", e, n.listener ? n.listener : n),
        a = t._events),
        s = a[e]),
        s === void 0)
            s = a[e] = n,
            ++t._eventsCount;
        else if (typeof s == "function" ? s = a[e] = i ? [n, s] : [s, n] : i ? s.unshift(n) : s.push(n),
        o = p(t),
        o > 0 && s.length > o && !s.warned) {
            s.warned = !0;
            var m = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            m.name = "MaxListenersExceededWarning",
            m.emitter = t,
            m.type = e,
            m.count = s.length,
            h(m)
        }
        return t
    }
    r.prototype.addListener = function(e, n) {
        return g(this, e, n, !1)
    }
    ,
    r.prototype.on = r.prototype.addListener,
    r.prototype.prependListener = function(e, n) {
        return g(this, e, n, !0)
    }
    ;
    function $() {
        if (!this.fired)
            return this.target.removeListener(this.type, this.wrapFn),
            this.fired = !0,
            arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    }
    function S(t, e, n) {
        var i = {
            fired: !1,
            wrapFn: void 0,
            target: t,
            type: e,
            listener: n
        }
          , o = $.bind(i);
        return o.listener = n,
        i.wrapFn = o,
        o
    }
    r.prototype.once = function(e, n) {
        return u(n),
        this.on(e, S(this, e, n)),
        this
    }
    ,
    r.prototype.prependOnceListener = function(e, n) {
        return u(n),
        this.prependListener(e, S(this, e, n)),
        this
    }
    ,
    r.prototype.removeListener = function(e, n) {
        var i, o, a, s, m;
        if (u(n),
        o = this._events,
        o === void 0)
            return this;
        if (i = o[e],
        i === void 0)
            return this;
        if (i === n || i.listener === n)
            --this._eventsCount === 0 ? this._events = Object.create(null) : (delete o[e],
            o.removeListener && this.emit("removeListener", e, i.listener || n));
        else if (typeof i != "function") {
            for (a = -1,
            s = i.length - 1; s >= 0; s--)
                if (i[s] === n || i[s].listener === n) {
                    m = i[s].listener,
                    a = s;
                    break
                }
            if (a < 0)
                return this;
            a === 0 ? i.shift() : W(i, a),
            i.length === 1 && (o[e] = i[0]),
            o.removeListener !== void 0 && this.emit("removeListener", e, m || n)
        }
        return this
    }
    ,
    r.prototype.off = r.prototype.removeListener,
    r.prototype.removeAllListeners = function(e) {
        var n, i, o;
        if (i = this._events,
        i === void 0)
            return this;
        if (i.removeListener === void 0)
            return arguments.length === 0 ? (this._events = Object.create(null),
            this._eventsCount = 0) : i[e] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete i[e]),
            this;
        if (arguments.length === 0) {
            var a = Object.keys(i), s;
            for (o = 0; o < a.length; ++o)
                s = a[o],
                s !== "removeListener" && this.removeAllListeners(s);
            return this.removeAllListeners("removeListener"),
            this._events = Object.create(null),
            this._eventsCount = 0,
            this
        }
        if (n = i[e],
        typeof n == "function")
            this.removeListener(e, n);
        else if (n !== void 0)
            for (o = n.length - 1; o >= 0; o--)
                this.removeListener(e, n[o]);
        return this
    }
    ;
    function j(t, e, n) {
        var i = t._events;
        if (i === void 0)
            return [];
        var o = i[e];
        return o === void 0 ? [] : typeof o == "function" ? n ? [o.listener || o] : [o] : n ? V(o) : A(o, o.length)
    }
    r.prototype.listeners = function(e) {
        return j(this, e, !0)
    }
    ,
    r.prototype.rawListeners = function(e) {
        return j(this, e, !1)
    }
    ,
    r.listenerCount = function(t, e) {
        return typeof t.listenerCount == "function" ? t.listenerCount(e) : C.call(t, e)
    }
    ,
    r.prototype.listenerCount = C;
    function C(t) {
        var e = this._events;
        if (e !== void 0) {
            var n = e[t];
            if (typeof n == "function")
                return 1;
            if (n !== void 0)
                return n.length
        }
        return 0
    }
    r.prototype.eventNames = function() {
        return this._eventsCount > 0 ? d(this._events) : []
    }
    ;
    function A(t, e) {
        for (var n = new Array(e), i = 0; i < e; ++i)
            n[i] = t[i];
        return n
    }
    function W(t, e) {
        for (; e + 1 < t.length; e++)
            t[e] = t[e + 1];
        t.pop()
    }
    function V(t) {
        for (var e = new Array(t.length), n = 0; n < e.length; ++n)
            e[n] = t[n].listener || t[n];
        return e
    }
    function U(t, e) {
        return new Promise(function(n, i) {
            function o(s) {
                t.removeListener(e, a),
                i(s)
            }
            function a() {
                typeof t.removeListener == "function" && t.removeListener("error", o),
                n([].slice.call(arguments))
            }
            M(t, e, a, {
                once: !0
            }),
            e !== "error" && z(t, o, {
                once: !0
            })
        }
        )
    }
    function z(t, e, n) {
        typeof t.on == "function" && M(t, "error", e, n)
    }
    function M(t, e, n, i) {
        if (typeof t.on == "function")
            i.once ? t.once(e, n) : t.on(e, n);
        else if (typeof t.addEventListener == "function")
            t.addEventListener(e, function o(a) {
                i.once && t.removeEventListener(e, o),
                n(a)
            });
        else
            throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t)
    }
    return E.exports
}
var G = H();
const T = new G.EventEmitter;
let x = [];
const J = () => {
    const f = [];
    for (let u = 0; u <= 23; u++) {
        const p = `./morphing/1-2/1-2${u.toString().padStart(2, "0")}.jpg`;
        f.push(p)
    }
    const l = [];
    for (let u = 0; u <= 23; u++) {
        const p = `./morphing/2-3/2-3${u.toString().padStart(2, "0")}.jpg`;
        l.push(p)
    }
    const d = [];
    for (let u = 0; u <= 23; u++) {
        const p = `./morphing/3-4/3-4${u.toString().padStart(2, "0")}.jpg`;
        d.push(p)
    }
    const h = [];
    for (let u = 0; u <= 23; u++) {
        const p = `./morphing/4-5/4-5${u.toString().padStart(2, "0")}.jpg`;
        h.push(p)
    }
    const c = [];
    for (let u = 0; u <= 23; u++) {
        const p = `./morphing/5-1/5-1${u.toString().padStart(2, "0")}.jpg`;
        c.push(p)
    }
    const v = [...f, ...l, ...d, ...h, ...c].map(u => new Promise(p => {
        const g = new Image;
        g.src = u,
        g.onload = () => p(g)
    }
    ));
    Promise.all(v).then(u => {
        x = [...u],
        T.emit("sequence-loaded")
    }
    )
}
  , Q = () => {
    document.body.classList.remove("loading")
}
;
let _ = 1;
const X = (f, l, d) => Math.max(0, Math.min(1, (f - l) / (d - l)))
  , y = document.querySelector("canvas");
y.width = 720;
y.height = 720;
const q = y.getContext("2d");
T.on("sequence-loaded", () => {
    Q(),
    requestAnimationFrame(K)
}
);
J();
let I = -1;
function K() {
    let f = Math.round(X(_, 1, 6) * (x.length - 1));
    if (f !== I) {
        if (I = f,
        !q || !y)
            return;
        q.drawImage(x[f], 0, 0, y.width, y.height)
    }
    requestAnimationFrame(K)
}
let b = null
  , w = null
  , O = 1
  , N = 1;
const Y = (f, l) => {
    const d = l - f
      , h = l + 5 - f
      , c = l - (f + 5)
      , r = [d, h, c]
      , v = r.map(Math.abs)
      , u = Math.min(...v);
    return r[v.indexOf(u)]
}
  , F = document.querySelector(".switcher-progress")
  , D = f => {
    w || (w = f);
    const l = f - w
      , d = 1e3;
    if (l < d) {
        const h = l / d
          , c = Y(O, N);
        let r = O + c * h;
        r > 5 && (r = r - 5),
        r < 1 && (r = r + 5),
        _ = r,
        b = requestAnimationFrame(D)
    } else
        _ = N,
        b = null,
        w = null;
    F && (F.textContent = _.toFixed(2))
}
  , Z = f => {
    b && cancelAnimationFrame(b),
    w = null,
    O = _,
    N = f,
    b = requestAnimationFrame(D)
}
;
[...document.querySelectorAll(".switcher button")].forEach(f => {
    f.addEventListener("click", l => {
        const d = parseInt(l.currentTarget.getAttribute("data-state"));
        Z(d)
    }
    )
}
);
