this.createjs = this.createjs || {};
(function() {
	var c = function(b, h, a) {
			this.initialize(b, h, a)
		},
		a = c.prototype;
	a.type = null;
	a.target = null;
	a.currentTarget = null;
	a.eventPhase = 0;
	a.bubbles = !1;
	a.cancelable = !1;
	a.timeStamp = 0;
	a.defaultPrevented = !1;
	a.propagationStopped = !1;
	a.immediatePropagationStopped = !1;
	a.removed = !1;
	a.initialize = function(b, h, a) {
		this.type = b;
		this.bubbles = h;
		this.cancelable = a;
		this.timeStamp = (new Date).getTime()
	};
	a.preventDefault = function() {
		this.defaultPrevented = !0
	};
	a.stopPropagation = function() {
		this.propagationStopped = !0
	};
	a.stopImmediatePropagation =
		function() {
			this.immediatePropagationStopped = this.propagationStopped = !0
		};
	a.remove = function() {
		this.removed = !0
	};
	a.clone = function() {
		return new c(this.type, this.bubbles, this.cancelable)
	};
	a.toString = function() {
		return "[Event (type\x3d" + this.type + ")]"
	};
	createjs.Event = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {},
		a = c.prototype;
	c.initialize = function(b) {
		b.addEventListener = a.addEventListener;
		b.on = a.on;
		b.removeEventListener = b.off = a.removeEventListener;
		b.removeAllEventListeners = a.removeAllEventListeners;
		b.hasEventListener = a.hasEventListener;
		b.dispatchEvent = a.dispatchEvent;
		b._dispatchEvent = a._dispatchEvent
	};
	a._listeners = null;
	a._captureListeners = null;
	a.initialize = function() {};
	a.addEventListener = function(b, h, a) {
		var e;
		e = a ? this._captureListeners = this._captureListeners || {} : this._listeners =
			this._listeners || {};
		var g = e[b];
		return g && this.removeEventListener(b, h, a), g = e[b], g ? g.push(h) : e[b] = [h], h
	};
	a.on = function(b, h, a, e, g, c) {
		return h.handleEvent && (a = a || h, h = h.handleEvent), a = a || this, this.addEventListener(b, function(b) {
			h.call(a, b, g);
			e && b.remove()
		}, c)
	};
	a.removeEventListener = function(b, h, a) {
		if(a = a ? this._captureListeners : this._listeners) {
			var e = a[b];
			if(e)
				for(var g = 0, c = e.length; c > g; g++)
					if(e[g] == h) {
						1 == c ? delete a[b] : e.splice(g, 1);
						break
					}
		}
	};
	a.off = a.removeEventListener;
	a.removeAllEventListeners = function(b) {
		b ?
			(this._listeners && delete this._listeners[b], this._captureListeners && delete this._captureListeners[b]) : this._listeners = this._captureListeners = null
	};
	a.dispatchEvent = function(b, h) {
		if("string" == typeof b) {
			var a = this._listeners;
			if(!a || !a[b]) return !1;
			b = new createjs.Event(b)
		}
		if(b.target = h || this, b.bubbles && this.parent) {
			for(var e = this, a = [e]; e.parent;) a.push(e = e.parent);
			for(var g = a.length, e = g - 1; 0 <= e && !b.propagationStopped; e--) a[e]._dispatchEvent(b, 1 + (0 == e));
			for(e = 1; g > e && !b.propagationStopped; e++) a[e]._dispatchEvent(b,
				3)
		} else this._dispatchEvent(b, 2);
		return b.defaultPrevented
	};
	a.hasEventListener = function(b) {
		var h = this._listeners,
			a = this._captureListeners;
		return !!(h && h[b] || a && a[b])
	};
	a.toString = function() {
		return "[EventDispatcher]"
	};
	a._dispatchEvent = function(b, h) {
		var a, e = 1 == h ? this._captureListeners : this._listeners;
		if(b && e && (e = e[b.type]) && (a = e.length)) {
			b.currentTarget = this;
			b.eventPhase = h;
			b.removed = !1;
			for(var e = e.slice(), g = 0; a > g && !b.immediatePropagationStopped; g++) {
				var c = e[g];
				c.handleEvent ? c.handleEvent(b) : c(b);
				b.removed &&
					(this.off(b.type, c, 1 == h), b.removed = !1)
			}
		}
	};
	createjs.EventDispatcher = c
})();
this.createjs = this.createjs || {};
(function() {
	createjs.indexOf = function(c, a) {
		for(var b = 0, h = c.length; h > b; b++)
			if(a === c[b]) return b;
		return -1
	}
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
		throw "UID cannot be instantiated";
	};
	c._nextID = 0;
	c.get = function() {
		return c._nextID++
	};
	createjs.UID = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
		throw "Ticker cannot be instantiated.";
	};
	c.RAF_SYNCHED = "synched";
	c.RAF = "raf";
	c.TIMEOUT = "timeout";
	c.useRAF = !1;
	c.timingMode = null;
	c.maxDelta = 0;
	c.removeEventListener = null;
	c.removeAllEventListeners = null;
	c.dispatchEvent = null;
	c.hasEventListener = null;
	c._listeners = null;
	createjs.EventDispatcher.initialize(c);
	c._addEventListener = c.addEventListener;
	c.addEventListener = function() {
		!c._inited && c.init();
		c._addEventListener.apply(c, arguments)
	};
	c._paused = !1;
	c._inited = !1;
	c._startTime = 0;
	c._pausedTime =
		0;
	c._ticks = 0;
	c._pausedTicks = 0;
	c._interval = 50;
	c._lastTime = 0;
	c._times = null;
	c._tickTimes = null;
	c._timerId = null;
	c._raf = !0;
	c.init = function() {
		c._inited || (c._inited = !0, c._times = [], c._tickTimes = [], c._startTime = c._getTime(), c._times.push(c._lastTime = 0), c.setInterval(c._interval))
	};
	c.reset = function() {
		if(c._raf) {
			var b = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
			b && b(c._timerId)
		} else clearTimeout(c._timerId);
		c.removeAllEventListeners("tick")
	};
	c.setInterval = function(b) {
		c._interval = b;
		c._inited && c._setupTick()
	};
	c.getInterval = function() {
		return c._interval
	};
	c.setFPS = function(b) {
		c.setInterval(1E3 / b)
	};
	c.getFPS = function() {
		return 1E3 / c._interval
	};
	c.getMeasuredTickTime = function(b) {
		var h = c._tickTimes;
		if(1 > h.length) return -1;
		b = Math.min(h.length, b || 0 | c.getFPS());
		for(var a = 0; b > a; a++);
		return h / b
	};
	c.getMeasuredFPS = function(b) {
		var h = c._times;
		return 2 > h.length ? -1 : (b = Math.min(h.length - 1, b || 0 | c.getFPS()), 1E3 / ((h[0] - h[b]) /
			b))
	};
	c.setPaused = function(b) {
		c._paused = b
	};
	c.getPaused = function() {
		return c._paused
	};
	c.getTime = function(b) {
		return c._getTime() - c._startTime - (b ? c._pausedTime : 0)
	};
	c.getEventTime = function(b) {
		return(c._lastTime || c._startTime) - (b ? c._pausedTime : 0)
	};
	c.getTicks = function(b) {
		return c._ticks - (b ? c._pausedTicks : 0)
	};
	c._handleSynch = function() {
		var b = c._getTime() - c._startTime;
		c._timerId = null;
		c._setupTick();
		b - c._lastTime >= 0.97 * (c._interval - 1) && c._tick()
	};
	c._handleRAF = function() {
		c._timerId = null;
		c._setupTick();
		c._tick()
	};
	c._handleTimeout = function() {
		c._timerId = null;
		c._setupTick();
		c._tick()
	};
	c._setupTick = function() {
		if(null == c._timerId) {
			var b = c.timingMode || c.useRAF && c.RAF_SYNCHED;
			if(b == c.RAF_SYNCHED || b == c.RAF) {
				var h = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
				if(h) return c._timerId = h(b == c.RAF ? c._handleRAF : c._handleSynch), c._raf = !0, void 0
			}
			c._raf = !1;
			c._timerId = setTimeout(c._handleTimeout, c._interval)
		}
	};
	c._tick = function() {
		var b = c._getTime() - c._startTime,
			h = b - c._lastTime,
			a = c._paused;
		if(c._ticks++, a && (c._pausedTicks++, c._pausedTime += h), c._lastTime = b, c.hasEventListener("tick")) {
			var e = new createjs.Event("tick"),
				g = c.maxDelta;
			e.delta = g && h > g ? g : h;
			e.paused = a;
			e.time = b;
			e.runTime = b - c._pausedTime;
			c.dispatchEvent(e)
		}
		for(c._tickTimes.unshift(c._getTime() - b); 100 < c._tickTimes.length;) c._tickTimes.pop();
		for(c._times.unshift(b); 100 < c._times.length;) c._times.pop()
	};
	var a = window.performance && (performance.now || performance.mozNow ||
		performance.msNow || performance.oNow || performance.webkitNow);
	c._getTime = function() {
		return a && a.call(performance) || (new Date).getTime()
	};
	createjs.Ticker = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, h, a, e, c, f, k, m, n, p) {
			this.initialize(b, h, a, e, c, f, k, m, n, p)
		},
		a = c.prototype = new createjs.Event;
	a.stageX = 0;
	a.stageY = 0;
	a.rawX = 0;
	a.rawY = 0;
	a.nativeEvent = null;
	a.pointerID = 0;
	a.primary = !1;
	a.addEventListener = null;
	a.removeEventListener = null;
	a.removeAllEventListeners = null;
	a.dispatchEvent = null;
	a.hasEventListener = null;
	a._listeners = null;
	createjs.EventDispatcher.initialize(a);
	a.Event_initialize = a.initialize;
	a.initialize = function(b, h, a, e, c, f, k, m, n, p) {
		this.Event_initialize(b, h, a);
		this.stageX =
			e;
		this.stageY = c;
		this.nativeEvent = f;
		this.pointerID = k;
		this.primary = m;
		this.rawX = null == n ? e : n;
		this.rawY = null == p ? c : p
	};
	a.clone = function() {
		return new c(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.target, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY)
	};
	a.toString = function() {
		return "[MouseEvent (type\x3d" + this.type + " stageX\x3d" + this.stageX + " stageY\x3d" + this.stageY + ")]"
	};
	createjs.MouseEvent = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, h, a, e, c, f) {
			this.initialize(b, h, a, e, c, f)
		},
		a = c.prototype;
	c.identity = null;
	c.DEG_TO_RAD = Math.PI / 180;
	a.a = 1;
	a.b = 0;
	a.c = 0;
	a.d = 1;
	a.tx = 0;
	a.ty = 0;
	a.alpha = 1;
	a.shadow = null;
	a.compositeOperation = null;
	a.initialize = function(b, h, a, e, c, f) {
		return this.a = null == b ? 1 : b, this.b = h || 0, this.c = a || 0, this.d = null == e ? 1 : e, this.tx = c || 0, this.ty = f || 0, this
	};
	a.prepend = function(b, h, a, e, c, f) {
		var k = this.tx;
		if(1 != b || 0 != h || 0 != a || 1 != e) {
			var m = this.a,
				n = this.c;
			this.a = m * b + this.b * a;
			this.b = m * h + this.b * e;
			this.c = n * b + this.d *
				a;
			this.d = n * h + this.d * e
		}
		return this.tx = k * b + this.ty * a + c, this.ty = k * h + this.ty * e + f, this
	};
	a.append = function(b, h, a, e, c, f) {
		var k = this.a,
			m = this.b,
			n = this.c,
			p = this.d;
		return this.a = b * k + h * n, this.b = b * m + h * p, this.c = a * k + e * n, this.d = a * m + e * p, this.tx = c * k + f * n + this.tx, this.ty = c * m + f * p + this.ty, this
	};
	a.prependMatrix = function(b) {
		return this.prepend(b.a, b.b, b.c, b.d, b.tx, b.ty), this.prependProperties(b.alpha, b.shadow, b.compositeOperation), this
	};
	a.appendMatrix = function(b) {
		return this.append(b.a, b.b, b.c, b.d, b.tx, b.ty), this.appendProperties(b.alpha,
			b.shadow, b.compositeOperation), this
	};
	a.prependTransform = function(b, h, a, e, g, f, k, m, n) {
		if(g % 360) {
			var p = g * c.DEG_TO_RAD;
			g = Math.cos(p);
			p = Math.sin(p)
		} else g = 1, p = 0;
		return(m || n) && (this.tx -= m, this.ty -= n), f || k ? (f *= c.DEG_TO_RAD, k *= c.DEG_TO_RAD, this.prepend(g * a, p * a, -p * e, g * e, 0, 0), this.prepend(Math.cos(k), Math.sin(k), -Math.sin(f), Math.cos(f), b, h)) : this.prepend(g * a, p * a, -p * e, g * e, b, h), this
	};
	a.appendTransform = function(b, h, a, e, g, f, k, m, n) {
		if(g % 360) {
			var p = g * c.DEG_TO_RAD;
			g = Math.cos(p);
			p = Math.sin(p)
		} else g = 1, p = 0;
		return f ||
			k ? (f *= c.DEG_TO_RAD, k *= c.DEG_TO_RAD, this.append(Math.cos(k), Math.sin(k), -Math.sin(f), Math.cos(f), b, h), this.append(g * a, p * a, -p * e, g * e, 0, 0)) : this.append(g * a, p * a, -p * e, g * e, b, h), (m || n) && (this.tx -= m * this.a + n * this.c, this.ty -= m * this.b + n * this.d), this
	};
	a.rotate = function(b) {
		var h = Math.cos(b);
		b = Math.sin(b);
		var a = this.a,
			e = this.c,
			c = this.tx;
		return this.a = a * h - this.b * b, this.b = a * b + this.b * h, this.c = e * h - this.d * b, this.d = e * b + this.d * h, this.tx = c * h - this.ty * b, this.ty = c * b + this.ty * h, this
	};
	a.skew = function(b, h) {
		return b *= c.DEG_TO_RAD,
			h *= c.DEG_TO_RAD, this.append(Math.cos(h), Math.sin(h), -Math.sin(b), Math.cos(b), 0, 0), this
	};
	a.scale = function(b, h) {
		return this.a *= b, this.d *= h, this.c *= b, this.b *= h, this.tx *= b, this.ty *= h, this
	};
	a.translate = function(b, h) {
		return this.tx += b, this.ty += h, this
	};
	a.identity = function() {
		return this.alpha = this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0, this.shadow = this.compositeOperation = null, this
	};
	a.invert = function() {
		var b = this.a,
			h = this.b,
			a = this.c,
			e = this.d,
			c = this.tx,
			f = b * e - h * a;
		return this.a = e / f, this.b = -h / f, this.c = -a /
			f, this.d = b / f, this.tx = (a * this.ty - e * c) / f, this.ty = -(b * this.ty - h * c) / f, this
	};
	a.isIdentity = function() {
		return 0 == this.tx && 0 == this.ty && 1 == this.a && 0 == this.b && 0 == this.c && 1 == this.d
	};
	a.transformPoint = function(b, h, a) {
		return a = a || {}, a.x = b * this.a + h * this.c + this.tx, a.y = b * this.b + h * this.d + this.ty, a
	};
	a.decompose = function(b) {
		null == b && (b = {});
		b.x = this.tx;
		b.y = this.ty;
		b.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
		b.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
		var h = Math.atan2(-this.c, this.d),
			a = Math.atan2(this.b, this.a);
		return h == a ? (b.rotation = a / c.DEG_TO_RAD, 0 > this.a && 0 <= this.d && (b.rotation += 0 >= b.rotation ? 180 : -180), b.skewX = b.skewY = 0) : (b.skewX = h / c.DEG_TO_RAD, b.skewY = a / c.DEG_TO_RAD), b
	};
	a.reinitialize = function(b, h, a, e, c, f, k, m, n) {
		return this.initialize(b, h, a, e, c, f), this.alpha = null == k ? 1 : k, this.shadow = m, this.compositeOperation = n, this
	};
	a.copy = function(b) {
		return this.reinitialize(b.a, b.b, b.c, b.d, b.tx, b.ty, b.alpha, b.shadow, b.compositeOperation)
	};
	a.appendProperties = function(b, h, a) {
		return this.alpha *= b, this.shadow = h || this.shadow,
			this.compositeOperation = a || this.compositeOperation, this
	};
	a.prependProperties = function(b, h, a) {
		return this.alpha *= b, this.shadow = this.shadow || h, this.compositeOperation = this.compositeOperation || a, this
	};
	a.clone = function() {
		return(new c).copy(this)
	};
	a.toString = function() {
		return "[Matrix2D (a\x3d" + this.a + " b\x3d" + this.b + " c\x3d" + this.c + " d\x3d" + this.d + " tx\x3d" + this.tx + " ty\x3d" + this.ty + ")]"
	};
	c.identity = new c;
	createjs.Matrix2D = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, h) {
			this.initialize(b, h)
		},
		a = c.prototype;
	a.x = 0;
	a.y = 0;
	a.initialize = function(b, h) {
		return this.x = null == b ? 0 : b, this.y = null == h ? 0 : h, this
	};
	a.copy = function(b) {
		return this.initialize(b.x, b.y)
	};
	a.clone = function() {
		return new c(this.x, this.y)
	};
	a.toString = function() {
		return "[Point (x\x3d" + this.x + " y\x3d" + this.y + ")]"
	};
	createjs.Point = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, h, a, e) {
			this.initialize(b, h, a, e)
		},
		a = c.prototype;
	a.x = 0;
	a.y = 0;
	a.width = 0;
	a.height = 0;
	a.initialize = function(b, h, a, e) {
		return this.x = b || 0, this.y = h || 0, this.width = a || 0, this.height = e || 0, this
	};
	a.copy = function(b) {
		return this.initialize(b.x, b.y, b.width, b.height)
	};
	a.clone = function() {
		return new c(this.x, this.y, this.width, this.height)
	};
	a.toString = function() {
		return "[Rectangle (x\x3d" + this.x + " y\x3d" + this.y + " width\x3d" + this.width + " height\x3d" + this.height + ")]"
	};
	createjs.Rectangle = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, h, a, e, c, f, k) {
			this.initialize(b, h, a, e, c, f, k)
		},
		a = c.prototype;
	a.target = null;
	a.overLabel = null;
	a.outLabel = null;
	a.downLabel = null;
	a.play = !1;
	a._isPressed = !1;
	a._isOver = !1;
	a.initialize = function(b, h, a, e, c, f, k) {
		b.addEventListener && (this.target = b, b.cursor = "pointer", this.overLabel = null == a ? "over" : a, this.outLabel = null == h ? "out" : h, this.downLabel = null == e ? "down" : e, this.play = c, this.setEnabled(!0), this.handleEvent({}), f && (k && (f.actionsEnabled = !1, f.gotoAndStop && f.gotoAndStop(k)), b.hitArea = f))
	};
	a.setEnabled = function(b) {
		var h = this.target;
		b ? (h.addEventListener("rollover", this), h.addEventListener("rollout", this), h.addEventListener("mousedown", this), h.addEventListener("pressup", this)) : (h.removeEventListener("rollover", this), h.removeEventListener("rollout", this), h.removeEventListener("mousedown", this), h.removeEventListener("pressup", this))
	};
	a.toString = function() {
		return "[ButtonHelper]"
	};
	a.handleEvent = function(b) {
		var h, a = this.target;
		b = b.type;
		"mousedown" == b ? (this._isPressed = !0, h = this.downLabel) :
			"pressup" == b ? (this._isPressed = !1, h = this._isOver ? this.overLabel : this.outLabel) : "rollover" == b ? (this._isOver = !0, h = this._isPressed ? this.downLabel : this.overLabel) : (this._isOver = !1, h = this._isPressed ? this.overLabel : this.outLabel);
		this.play ? a.gotoAndPlay && a.gotoAndPlay(h) : a.gotoAndStop && a.gotoAndStop(h)
	};
	createjs.ButtonHelper = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, h, a, e) {
			this.initialize(b, h, a, e)
		},
		a = c.prototype;
	c.identity = null;
	a.color = null;
	a.offsetX = 0;
	a.offsetY = 0;
	a.blur = 0;
	a.initialize = function(b, h, a, e) {
		this.color = b;
		this.offsetX = h;
		this.offsetY = a;
		this.blur = e
	};
	a.toString = function() {
		return "[Shadow]"
	};
	a.clone = function() {
		return new c(this.color, this.offsetX, this.offsetY, this.blur)
	};
	c.identity = new c("transparent", 0, 0, 0);
	createjs.Shadow = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b) {
			this.initialize(b)
		},
		a = c.prototype = new createjs.EventDispatcher;
	a.complete = !0;
	a.framerate = 0;
	a._animations = null;
	a._frames = null;
	a._images = null;
	a._data = null;
	a._loadCount = 0;
	a._frameHeight = 0;
	a._frameWidth = 0;
	a._numFrames = 0;
	a._regX = 0;
	a._regY = 0;
	a.initialize = function(b) {
		var h, a, e;
		if(null != b) {
			if(this.framerate = b.framerate || 0, b.images && 0 < (a = b.images.length)) {
				e = this._images = [];
				for(h = 0; a > h; h++) {
					var c = b.images[h];
					if("string" == typeof c) {
						var f = c,
							c = new Image;
						c.src = f
					}
					e.push(c);
					c.getContext ||
						c.complete || (this._loadCount++, this.complete = !1, function(b) {
							c.onload = function() {
								b._handleImageLoad()
							}
						}(this))
				}
			}
			if(null != b.frames)
				if(b.frames instanceof Array) {
					this._frames = [];
					e = b.frames;
					h = 0;
					for(a = e.length; a > h; h++) f = e[h], this._frames.push({
						image: this._images[f[4] ? f[4] : 0],
						rect: new createjs.Rectangle(f[0], f[1], f[2], f[3]),
						regX: f[5] || 0,
						regY: f[6] || 0
					})
				} else a = b.frames, this._frameWidth = a.width, this._frameHeight = a.height, this._regX = a.regX || 0, this._regY = a.regY || 0, this._numFrames = a.count, 0 == this._loadCount &&
					this._calculateFrames();
			if(this._animations = [], null != (a = b.animations)) {
				this._data = {};
				for(var k in a) {
					b = {
						name: k
					};
					f = a[k];
					if("number" == typeof f) e = b.frames = [f];
					else if(f instanceof Array)
						if(1 == f.length) b.frames = [f[0]];
						else {
							b.speed = f[3];
							b.next = f[2];
							e = b.frames = [];
							for(h = f[0]; h <= f[1]; h++) e.push(h)
						}
					else b.speed = f.speed, b.next = f.next, h = f.frames, e = b.frames = "number" == typeof h ? [h] : h.slice(0);
					(!0 === b.next || void 0 === b.next) && (b.next = k);
					(!1 === b.next || 2 > e.length && b.next == k) && (b.next = null);
					b.speed || (b.speed = 1);
					this._animations.push(k);
					this._data[k] = b
				}
			}
		}
	};
	a.getNumFrames = function(b) {
		if(null == b) return this._frames ? this._frames.length : this._numFrames;
		b = this._data[b];
		return null == b ? 0 : b.frames.length
	};
	a.getAnimations = function() {
		return this._animations.slice(0)
	};
	a.getAnimation = function(b) {
		return this._data[b]
	};
	a.getFrame = function(b) {
		var h;
		return this._frames && (h = this._frames[b]) ? h : null
	};
	a.getFrameBounds = function(b, h) {
		var a = this.getFrame(b);
		return a ? (h || new createjs.Rectangle).initialize(-a.regX, -a.regY, a.rect.width, a.rect.height) : null
	};
	a.toString = function() {
		return "[SpriteSheet]"
	};
	a.clone = function() {
		var b = new c;
		return b.complete = this.complete, b._animations = this._animations, b._frames = this._frames, b._images = this._images, b._data = this._data, b._frameHeight = this._frameHeight, b._frameWidth = this._frameWidth, b._numFrames = this._numFrames, b._loadCount = this._loadCount, b
	};
	a._handleImageLoad = function() {
		0 == --this._loadCount && (this._calculateFrames(), this.complete = !0, this.dispatchEvent("complete"))
	};
	a._calculateFrames = function() {
		if(!this._frames &&
			0 != this._frameWidth) {
			this._frames = [];
			for(var b = 0, a = this._frameWidth, d = this._frameHeight, e = 0, c = this._images; e < c.length; e++) {
				for(var f = c[e], k = 0 | (f.width + 1) / a, m = 0 | (f.height + 1) / d, m = 0 < this._numFrames ? Math.min(this._numFrames - b, k * m) : k * m, n = 0; m > n; n++) this._frames.push({
					image: f,
					rect: new createjs.Rectangle(n % k * a, (0 | n / k) * d, a, d),
					regX: this._regX,
					regY: this._regY
				});
				b += m
			}
			this._numFrames = b
		}
	};
	createjs.SpriteSheet = c
})();
this.createjs = this.createjs || {};
(function() {
	function c(b, a, h) {
		this.f = b;
		this.params = a;
		this.path = null == h ? !0 : h
	}
	c.prototype.exec = function(b) {
		this.f.apply(b, this.params)
	};
	var a = function() {
			this.initialize()
		},
		b = a.prototype;
	a.getRGB = function(b, a, h, d) {
		return null != b && null == h && (d = a, h = 255 & b, a = 255 & b >> 8, b = 255 & b >> 16), null == d ? "rgb(" + b + "," + a + "," + h + ")" : "rgba(" + b + "," + a + "," + h + "," + d + ")"
	};
	a.getHSL = function(b, a, h, d) {
		return null == d ? "hsl(" + b % 360 + "," + a + "%," + h + "%)" : "hsla(" + b % 360 + "," + a + "%," + h + "%," + d + ")"
	};
	a.Command = c;
	a.BASE_64 = {
		A: 0,
		B: 1,
		C: 2,
		D: 3,
		E: 4,
		F: 5,
		G: 6,
		H: 7,
		I: 8,
		J: 9,
		K: 10,
		L: 11,
		M: 12,
		N: 13,
		O: 14,
		P: 15,
		Q: 16,
		R: 17,
		S: 18,
		T: 19,
		U: 20,
		V: 21,
		W: 22,
		X: 23,
		Y: 24,
		Z: 25,
		a: 26,
		b: 27,
		c: 28,
		d: 29,
		e: 30,
		f: 31,
		g: 32,
		h: 33,
		i: 34,
		j: 35,
		k: 36,
		l: 37,
		m: 38,
		n: 39,
		o: 40,
		p: 41,
		q: 42,
		r: 43,
		s: 44,
		t: 45,
		u: 46,
		v: 47,
		w: 48,
		x: 49,
		y: 50,
		z: 51,
		"0": 52,
		1: 53,
		2: 54,
		3: 55,
		4: 56,
		5: 57,
		6: 58,
		7: 59,
		8: 60,
		9: 61,
		"+": 62,
		"/": 63
	};
	a.STROKE_CAPS_MAP = ["butt", "round", "square"];
	a.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
	var h = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
	if(h.getContext) {
		var d = a._ctx = h.getContext("2d");
		a.beginCmd = new c(d.beginPath, [], !1);
		a.fillCmd = new c(d.fill, [], !1);
		a.strokeCmd = new c(d.stroke, [], !1);
		h.width = h.height = 1
	}
	b._strokeInstructions = null;
	b._strokeStyleInstructions = null;
	b._strokeIgnoreScale = !1;
	b._fillInstructions = null;
	b._fillMatrix = null;
	b._instructions = null;
	b._oldInstructions = null;
	b._activeInstructions = null;
	b._active = !1;
	b._dirty = !1;
	b.initialize = function() {
		this.clear();
		this._ctx = a._ctx
	};
	b.isEmpty = function() {
		return !(this._instructions.length || this._oldInstructions.length || this._activeInstructions.length)
	};
	b.draw = function(b) {
		this._dirty && this._updateInstructions();
		for(var a = this._instructions, h = 0, d = a.length; d > h; h++) a[h].exec(b)
	};
	b.drawAsPath = function(b) {
		this._dirty && this._updateInstructions();
		for(var a, h = this._instructions, d = 0, c = h.length; c > d; d++)((a = h[d]).path || 0 == d) && a.exec(b)
	};
	b.moveTo = function(b, a) {
		return this._activeInstructions.push(new c(this._ctx.moveTo, [b, a])), this
	};
	b.lineTo = function(b, a) {
		return this._dirty = this._active = !0, this._activeInstructions.push(new c(this._ctx.lineTo, [b, a])), this
	};
	b.arcTo =
		function(b, a, h, d, m) {
			return this._dirty = this._active = !0, this._activeInstructions.push(new c(this._ctx.arcTo, [b, a, h, d, m])), this
		};
	b.arc = function(b, a, h, d, m, n) {
		return this._dirty = this._active = !0, null == n && (n = !1), this._activeInstructions.push(new c(this._ctx.arc, [b, a, h, d, m, n])), this
	};
	b.quadraticCurveTo = function(b, a, h, d) {
		return this._dirty = this._active = !0, this._activeInstructions.push(new c(this._ctx.quadraticCurveTo, [b, a, h, d])), this
	};
	b.bezierCurveTo = function(b, a, h, d, m, n) {
		return this._dirty = this._active = !0, this._activeInstructions.push(new c(this._ctx.bezierCurveTo, [b, a, h, d, m, n])), this
	};
	b.rect = function(b, a, h, d) {
		return this._dirty = this._active = !0, this._activeInstructions.push(new c(this._ctx.rect, [b, a, h, d])), this
	};
	b.closePath = function() {
		return this._active && (this._dirty = !0, this._activeInstructions.push(new c(this._ctx.closePath, []))), this
	};
	b.clear = function() {
		return this._instructions = [], this._oldInstructions = [], this._activeInstructions = [], this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions =
			this._fillMatrix = null, this._active = this._dirty = this._strokeIgnoreScale = !1, this
	};
	b.beginFill = function(b) {
		return this._active && this._newPath(), this._fillInstructions = b ? [new c(this._setProp, ["fillStyle", b], !1)] : null, this._fillMatrix = null, this
	};
	b.beginLinearGradientFill = function(b, a, h, d, m, n) {
		this._active && this._newPath();
		h = this._ctx.createLinearGradient(h, d, m, n);
		d = 0;
		for(m = b.length; m > d; d++) h.addColorStop(a[d], b[d]);
		return this._fillInstructions = [new c(this._setProp, ["fillStyle", h], !1)], this._fillMatrix =
			null, this
	};
	b.beginRadialGradientFill = function(b, a, h, d, m, n, p, q) {
		this._active && this._newPath();
		h = this._ctx.createRadialGradient(h, d, m, n, p, q);
		d = 0;
		for(m = b.length; m > d; d++) h.addColorStop(a[d], b[d]);
		return this._fillInstructions = [new c(this._setProp, ["fillStyle", h], !1)], this._fillMatrix = null, this
	};
	b.beginBitmapFill = function(b, a, h) {
		this._active && this._newPath();
		b = this._ctx.createPattern(b, a || "");
		return this._fillInstructions = [new c(this._setProp, ["fillStyle", b], !1)], this._fillMatrix = h ? [h.a, h.b, h.c, h.d, h.tx,
			h.ty
		] : null, this
	};
	b.endFill = function() {
		return this.beginFill()
	};
	b.setStrokeStyle = function(b, h, d, k, m) {
		return this._active && this._newPath(), this._strokeStyleInstructions = [new c(this._setProp, ["lineWidth", null == b ? "1" : b], !1), new c(this._setProp, ["lineCap", null == h ? "butt" : isNaN(h) ? h : a.STROKE_CAPS_MAP[h]], !1), new c(this._setProp, ["lineJoin", null == d ? "miter" : isNaN(d) ? d : a.STROKE_JOINTS_MAP[d]], !1), new c(this._setProp, ["miterLimit", null == k ? "10" : k], !1)], this._strokeIgnoreScale = m, this
	};
	b.beginStroke = function(b) {
		return this._active &&
			this._newPath(), this._strokeInstructions = b ? [new c(this._setProp, ["strokeStyle", b], !1)] : null, this
	};
	b.beginLinearGradientStroke = function(b, h, a, d, m, n) {
		this._active && this._newPath();
		a = this._ctx.createLinearGradient(a, d, m, n);
		d = 0;
		for(m = b.length; m > d; d++) a.addColorStop(h[d], b[d]);
		return this._strokeInstructions = [new c(this._setProp, ["strokeStyle", a], !1)], this
	};
	b.beginRadialGradientStroke = function(b, h, a, d, m, n, p, q) {
		this._active && this._newPath();
		a = this._ctx.createRadialGradient(a, d, m, n, p, q);
		d = 0;
		for(m = b.length; m >
			d; d++) a.addColorStop(h[d], b[d]);
		return this._strokeInstructions = [new c(this._setProp, ["strokeStyle", a], !1)], this
	};
	b.beginBitmapStroke = function(b, a) {
		this._active && this._newPath();
		var h = this._ctx.createPattern(b, a || "");
		return this._strokeInstructions = [new c(this._setProp, ["strokeStyle", h], !1)], this
	};
	b.endStroke = function() {
		return this.beginStroke(), this
	};
	b.curveTo = b.quadraticCurveTo;
	b.drawRect = b.rect;
	b.drawRoundRect = function(b, a, h, d, c) {
		return this.drawRoundRectComplex(b, a, h, d, c, c, c, c), this
	};
	b.drawRoundRectComplex =
		function(b, a, h, d, m, n, p, q) {
			var s = (d > h ? h : d) / 2,
				r = 0,
				t = 0,
				v = 0,
				u = 0;
			0 > m && (m *= r = -1);
			m > s && (m = s);
			0 > n && (n *= t = -1);
			n > s && (n = s);
			0 > p && (p *= v = -1);
			p > s && (p = s);
			0 > q && (q *= u = -1);
			q > s && (q = s);
			this._dirty = this._active = !0;
			var s = this._ctx.arcTo,
				x = this._ctx.lineTo;
			return this._activeInstructions.push(new c(this._ctx.moveTo, [b + h - n, a]), new c(s, [b + h + n * t, a - n * t, b + h, a + n, n]), new c(x, [b + h, a + d - p]), new c(s, [b + h + p * v, a + d + p * v, b + h - p, a + d, p]), new c(x, [b + q, a + d]), new c(s, [b - q * u, a + d + q * u, b, a + d - q, q]), new c(x, [b, a + m]), new c(s, [b - m * r, a - m * r, b + m, a, m]),
				new c(this._ctx.closePath)), this
		};
	b.drawCircle = function(b, a, h) {
		return this.arc(b, a, h, 0, 2 * Math.PI), this
	};
	b.drawEllipse = function(b, a, h, d) {
		this._dirty = this._active = !0;
		var m = 0.5522848 * (h / 2),
			n = 0.5522848 * (d / 2),
			p = b + h,
			q = a + d;
		h = b + h / 2;
		d = a + d / 2;
		return this._activeInstructions.push(new c(this._ctx.moveTo, [b, d]), new c(this._ctx.bezierCurveTo, [b, d - n, h - m, a, h, a]), new c(this._ctx.bezierCurveTo, [h + m, a, p, d - n, p, d]), new c(this._ctx.bezierCurveTo, [p, d + n, h + m, q, h, q]), new c(this._ctx.bezierCurveTo, [h - m, q, b, d + n, b, d])), this
	};
	b.inject = function(b, a) {
		return this._dirty = this._active = !0, this._activeInstructions.push(new c(b, [a])), this
	};
	b.drawPolyStar = function(b, a, h, d, m, n) {
		this._dirty = this._active = !0;
		null == m && (m = 0);
		m = 1 - m;
		null == n ? n = 0 : n /= 180 / Math.PI;
		var p = Math.PI / d;
		this._activeInstructions.push(new c(this._ctx.moveTo, [b + Math.cos(n) * h, a + Math.sin(n) * h]));
		for(var q = 0; d > q; q++) n += p, 1 != m && this._activeInstructions.push(new c(this._ctx.lineTo, [b + Math.cos(n) * h * m, a + Math.sin(n) * h * m])), n += p, this._activeInstructions.push(new c(this._ctx.lineTo, [b + Math.cos(n) * h, a + Math.sin(n) * h]));
		return this
	};
	
	b.decodePath = function(b) {
		
		for(var h = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], d = [2, 2, 4, 6, 0], c = 0, m = b.length, n = [], p = 0, q = 0, s = a.BASE_64; m > c;) {
			var r = b.charAt(c),
				t = s[r],
				v = t >> 3,
				u = h[v];
			if(!u || 3 & t) throw "bad path data (@" + c + "): " + r;
			r = d[v];
			v || (p = q = 0);
			n.length = 0;
			c++;
			t = (1 & t >> 2) + 2;
			for(v = 0; r > v; v++) {
				var x = s[b.charAt(c)],
					A = x >> 5 ? -1 : 1,
					x = (31 & x) << 6 | s[b.charAt(c + 1)];
				3 == t && (x = x << 6 | s[b.charAt(c + 2)]);
				x = A * x / 10;
				v % 2 ? p = x += p : q = x += q;
				n[v] = x;
				c += t
			}
			u.apply(this, n)
		}
		
		return this
	};
	
	b.clone = function() {
		var b = new a;
		return b._instructions = this._instructions.slice(), b._activeInstructions = this._activeInstructions.slice(), b._oldInstructions = this._oldInstructions.slice(), this._fillInstructions && (b._fillInstructions = this._fillInstructions.slice()), this._strokeInstructions && (b._strokeInstructions = this._strokeInstructions.slice()), this._strokeStyleInstructions && (b._strokeStyleInstructions = this._strokeStyleInstructions.slice()), b._active = this._active, b._dirty =
			this._dirty, b._fillMatrix = this._fillMatrix, b._strokeIgnoreScale = this._strokeIgnoreScale, b
	};
	b.toString = function() {
		return "[Graphics]"
	};
	b.mt = b.moveTo;
	b.lt = b.lineTo;
	b.at = b.arcTo;
	b.bt = b.bezierCurveTo;
	b.qt = b.quadraticCurveTo;
	b.a = b.arc;
	b.r = b.rect;
	b.cp = b.closePath;
	b.c = b.clear;
	b.f = b.beginFill;
	b.lf = b.beginLinearGradientFill;
	b.rf = b.beginRadialGradientFill;
	b.bf = b.beginBitmapFill;
	b.ef = b.endFill;
	b.ss = b.setStrokeStyle;
	b.s = b.beginStroke;
	b.ls = b.beginLinearGradientStroke;
	b.rs = b.beginRadialGradientStroke;
	b.bs = b.beginBitmapStroke;
	b.es = b.endStroke;
	b.dr = b.drawRect;
	b.rr = b.drawRoundRect;
	b.rc = b.drawRoundRectComplex;
	b.dc = b.drawCircle;
	b.de = b.drawEllipse;
	b.dp = b.drawPolyStar;
	b.p = b.decodePath;
	b._updateInstructions = function() {
		this._instructions = this._oldInstructions.slice();
		this._instructions.push(a.beginCmd);
		this._appendInstructions(this._fillInstructions);
		this._appendInstructions(this._strokeInstructions);
		this._appendInstructions(this._strokeInstructions && this._strokeStyleInstructions);
		this._appendInstructions(this._activeInstructions);
		this._fillInstructions && this._appendDraw(a.fillCmd, this._fillMatrix);
		this._strokeInstructions && this._appendDraw(a.strokeCmd, this._strokeIgnoreScale && [1, 0, 0, 1, 0, 0])
	};
	b._appendInstructions = function(b) {
		b && this._instructions.push.apply(this._instructions, b)
	};
	b._appendDraw = function(b, h) {
		h ? this._instructions.push(new c(this._ctx.save, [], !1), new c(this._ctx.transform, h, !1), b, new c(this._ctx.restore, [], !1)) : this._instructions.push(b)
	};
	b._newPath = function() {
		this._dirty && this._updateInstructions();
		this._oldInstructions =
			this._instructions;
		this._activeInstructions = [];
		this._active = this._dirty = !1
	};
	b._setProp = function(b, h) {
		this[b] = h
	};
	createjs.Graphics = a
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
			this.initialize()
		},
		a = c.prototype = new createjs.EventDispatcher;
	c.suppressCrossDomainErrors = !1;
	var b = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
	b.getContext && (c._hitTestCanvas = b, c._hitTestContext = b.getContext("2d"), b.width = b.height = 1);
	c._nextCacheID = 1;
	a.alpha = 1;
	a.cacheCanvas = null;
	a.id = -1;
	a.mouseEnabled = !0;
	a.name = null;
	a.parent = null;
	a.regX = 0;
	a.regY = 0;
	a.rotation = 0;
	a.scaleX = 1;
	a.scaleY = 1;
	a.skewX = 0;
	a.skewY = 0;
	a.shadow = null;
	a.visible = !0;
	a.x = 0;
	a.y = 0;
	a.compositeOperation = null;
	a.snapToPixel = !1;
	a.filters = null;
	a.cacheID = 0;
	a.mask = null;
	a.hitArea = null;
	a.cursor = null;
	a._cacheOffsetX = 0;
	a._cacheOffsetY = 0;
	a._cacheScale = 1;
	a._cacheDataURLID = 0;
	a._cacheDataURL = null;
	a._matrix = null;
	a._rectangle = null;
	a._bounds = null;
	a.initialize = function() {
		this.id = createjs.UID.get();
		this._matrix = new createjs.Matrix2D;
		this._rectangle = new createjs.Rectangle
	};
	a.isVisible = function() {
		return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY))
	};
	a.draw = function(b, a) {
		var e =
			this.cacheCanvas;
		if(a || !e) return !1;
		var c, f = this._cacheScale,
			k = this._cacheOffsetX,
			m = this._cacheOffsetY;
		return(c = this._applyFilterBounds(k, m, 0, 0)) && (k = c.x, m = c.y), b.drawImage(e, k, m, e.width / f, e.height / f), !0
	};
	a.updateContext = function(b) {
		var a, e = this.mask;
		e && e.graphics && !e.graphics.isEmpty() && (a = e.getMatrix(e._matrix), b.transform(a.a, a.b, a.c, a.d, a.tx, a.ty), e.graphics.drawAsPath(b), b.clip(), a.invert(), b.transform(a.a, a.b, a.c, a.d, a.tx, a.ty));
		a = this._matrix.identity().appendTransform(this.x, this.y, this.scaleX,
			this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY);
		createjs.Stage._snapToPixelEnabled && this.snapToPixel ? b.transform(a.a, a.b, a.c, a.d, 0 | a.tx + 0.5, 0 | a.ty + 0.5) : b.transform(a.a, a.b, a.c, a.d, a.tx, a.ty);
		b.globalAlpha *= this.alpha;
		this.compositeOperation && (b.globalCompositeOperation = this.compositeOperation);
		this.shadow && this._applyShadow(b, this.shadow)
	};
	a.cache = function(b, a, e, c, f) {
		f = f || 1;
		this.cacheCanvas || (this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
		this._cacheWidth = e;
		this._cacheHeight = c;
		this._cacheOffsetX = b;
		this._cacheOffsetY = a;
		this._cacheScale = f;
		this.updateCache()
	};
	a.updateCache = function(b) {
		var a, e = this.cacheCanvas,
			g = this._cacheScale,
			f = this._cacheOffsetX * g,
			k = this._cacheOffsetY * g,
			m = this._cacheWidth,
			n = this._cacheHeight;
		if(!e) throw "cache() must be called before updateCache()";
		var p = e.getContext("2d");
		(a = this._applyFilterBounds(f, k, m, n)) && (f = a.x, k = a.y, m = a.width, n = a.height);
		m = Math.ceil(m * g);
		n = Math.ceil(n * g);
		m != e.width || n != e.height ? (e.width = m, e.height =
			n) : b || p.clearRect(0, 0, m + 1, n + 1);
		p.save();
		p.globalCompositeOperation = b;
		p.setTransform(g, 0, 0, g, -f, -k);
		this.draw(p, !0);
		this._applyFilters();
		p.restore();
		this.cacheID = c._nextCacheID++
	};
	a.uncache = function() {
		this._cacheDataURL = this.cacheCanvas = null;
		this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0;
		this._cacheScale = 1
	};
	a.getCacheDataURL = function() {
		return this.cacheCanvas ? (this.cacheID != this._cacheDataURLID && (this._cacheDataURL = this.cacheCanvas.toDataURL()), this._cacheDataURL) : null
	};
	a.getStage = function() {
		for(var b =
				this; b.parent;) b = b.parent;
		return b instanceof createjs.Stage ? b : null
	};
	a.localToGlobal = function(b, a) {
		var e = this.getConcatenatedMatrix(this._matrix);
		return null == e ? null : (e.append(1, 0, 0, 1, b, a), new createjs.Point(e.tx, e.ty))
	};
	a.globalToLocal = function(b, a) {
		var e = this.getConcatenatedMatrix(this._matrix);
		return null == e ? null : (e.invert(), e.append(1, 0, 0, 1, b, a), new createjs.Point(e.tx, e.ty))
	};
	a.localToLocal = function(b, a, e) {
		b = this.localToGlobal(b, a);
		return e.globalToLocal(b.x, b.y)
	};
	a.setTransform = function(b, a,
		e, c, f, k, m, n, p) {
		return this.x = b || 0, this.y = a || 0, this.scaleX = null == e ? 1 : e, this.scaleY = null == c ? 1 : c, this.rotation = f || 0, this.skewX = k || 0, this.skewY = m || 0, this.regX = n || 0, this.regY = p || 0, this
	};
	a.getMatrix = function(b) {
		return(b ? b.identity() : new createjs.Matrix2D).appendTransform(this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY).appendProperties(this.alpha, this.shadow, this.compositeOperation)
	};
	a.getConcatenatedMatrix = function(b) {
		b ? b.identity() : b = new createjs.Matrix2D;
		for(var a = this; null != a;) b.prependTransform(a.x, a.y, a.scaleX, a.scaleY, a.rotation, a.skewX, a.skewY, a.regX, a.regY).prependProperties(a.alpha, a.shadow, a.compositeOperation), a = a.parent;
		return b
	};
	a.hitTest = function(b, a) {
		var e = c._hitTestContext;
		e.setTransform(1, 0, 0, 1, -b, -a);
		this.draw(e);
		var g = this._testHit(e);
		return e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, 2, 2), g
	};
	a.set = function(b) {
		for(var a in b) this[a] = b[a];
		return this
	};
	a.getBounds = function() {
		if(this._bounds) return this._rectangle.copy(this._bounds);
		var b = this.cacheCanvas;
		if(b) {
			var a = this._cacheScale;
			return this._rectangle.initialize(this._cacheOffsetX, this._cacheOffsetY, b.width / a, b.height / a)
		}
		return null
	};
	a.getTransformedBounds = function() {
		return this._getBounds()
	};
	a.setBounds = function(b, a, e, c) {
		null == b && (this._bounds = b);
		this._bounds = (this._bounds || new createjs.Rectangle).initialize(b, a, e, c)
	};
	a.clone = function() {
		var b = new c;
		return this.cloneProps(b), b
	};
	a.toString = function() {
		return "[DisplayObject (name\x3d" + this.name + ")]"
	};
	a.cloneProps = function(b) {
		b.alpha =
			this.alpha;
		b.name = this.name;
		b.regX = this.regX;
		b.regY = this.regY;
		b.rotation = this.rotation;
		b.scaleX = this.scaleX;
		b.scaleY = this.scaleY;
		b.shadow = this.shadow;
		b.skewX = this.skewX;
		b.skewY = this.skewY;
		b.visible = this.visible;
		b.x = this.x;
		b.y = this.y;
		b._bounds = this._bounds;
		b.mouseEnabled = this.mouseEnabled;
		b.compositeOperation = this.compositeOperation
	};
	a._applyShadow = function(b, a) {
		a = a || Shadow.identity;
		b.shadowColor = a.color;
		b.shadowOffsetX = a.offsetX;
		b.shadowOffsetY = a.offsetY;
		b.shadowBlur = a.blur
	};
	a._tick = function(b) {
		var a =
			this._listeners;
		a && a.tick && (a = new createjs.Event("tick"), a.params = b, this._dispatchEvent(a, this, 2))
	};
	a._testHit = function(b) {
		try {
			var a = 1 < b.getImageData(0, 0, 1, 1).data[3]
		} catch(e) {
			if(!c.suppressCrossDomainErrors) throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
		}
		return a
	};
	a._applyFilters = function() {
		if(this.filters && 0 != this.filters.length && this.cacheCanvas)
			for(var b = this.filters.length, a = this.cacheCanvas.getContext("2d"),
					e = this.cacheCanvas.width, c = this.cacheCanvas.height, f = 0; b > f; f++) this.filters[f].applyFilter(a, 0, 0, e, c)
	};
	a._applyFilterBounds = function(b, a, e, c) {
		var f, k, m = this.filters;
		if(m && (k = m.length)) {
			for(m = 0; k > m; m++) {
				var n = this.filters[m];
				(n = n.getBounds && n.getBounds()) && (f || (f = this._rectangle.initialize(b, a, e, c)), f.x += n.x, f.y += n.y, f.width += n.width, f.height += n.height)
			}
			return f
		}
	};
	a._getBounds = function(b, a) {
		return this._transformBounds(this.getBounds(), b, a)
	};
	a._transformBounds = function(b, a, e) {
		if(!b) return b;
		var c =
			b.x,
			f = b.y,
			k = b.width,
			m = b.height,
			n = e ? this._matrix.identity() : this.getMatrix(this._matrix);
		(c || f) && n.appendTransform(0, 0, 1, 1, 0, 0, 0, -c, -f);
		a && n.prependMatrix(a);
		a = k * n.a;
		k *= n.b;
		e = m * n.c;
		var m = m * n.d,
			p = n.tx,
			n = n.ty,
			q = p,
			s = p,
			r = n,
			t = n;
		return(c = a + p) < q ? q = c : c > s && (s = c), (c = a + e + p) < q ? q = c : c > s && (s = c), (c = e + p) < q ? q = c : c > s && (s = c), (f = k + n) < r ? r = f : f > t && (t = f), (f = k + m + n) < r ? r = f : f > t && (t = f), (f = m + n) < r ? r = f : f > t && (t = f), b.initialize(q, r, s - q, t - r)
	};
	createjs.DisplayObject = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
			this.initialize()
		},
		a = c.prototype = new createjs.DisplayObject;
	a.children = null;
	a.mouseChildren = !0;
	a.DisplayObject_initialize = a.initialize;
	a.initialize = function() {
		this.DisplayObject_initialize();
		this.children = []
	};
	a.isVisible = function() {
		var b = this.cacheCanvas || this.children.length;
		return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && b))
	};
	a.DisplayObject_draw = a.draw;
	a.draw = function(b, a) {
		if(this.DisplayObject_draw(b, a)) return !0;
		for(var d = this.children.slice(0),
				e = 0, c = d.length; c > e; e++) {
			var f = d[e];
			f.isVisible() && (b.save(), f.updateContext(b), f.draw(b), b.restore())
		}
		return !0
	};
	a.addChild = function(b) {
		if(null == b) return b;
		var a = arguments.length;
		if(1 < a) {
			for(var d = 0; a > d; d++) this.addChild(arguments[d]);
			return arguments[a - 1]
		}
		return b.parent && b.parent.removeChild(b), b.parent = this, this.children.push(b), b
	};
	a.addChildAt = function(b, a) {
		var d = arguments.length,
			e = arguments[d - 1];
		if(0 > e || e > this.children.length) return arguments[d - 2];
		if(2 < d) {
			for(var c = 0; d - 1 > c; c++) this.addChildAt(arguments[c],
				e + c);
			return arguments[d - 2]
		}
		return b.parent && b.parent.removeChild(b), b.parent = this, this.children.splice(a, 0, b), b
	};
	a.removeChild = function(b) {
		var a = arguments.length;
		if(1 < a) {
			for(var d = !0, e = 0; a > e; e++) d = d && this.removeChild(arguments[e]);
			return d
		}
		return this.removeChildAt(createjs.indexOf(this.children, b))
	};
	a.removeChildAt = function(b) {
		var a = arguments.length;
		if(1 < a) {
			for(var d = [], e = 0; a > e; e++) d[e] = arguments[e];
			d.sort(function(b, a) {
				return a - b
			});
			for(var c = !0, e = 0; a > e; e++) c = c && this.removeChildAt(d[e]);
			return c
		}
		if(0 >
			b || b > this.children.length - 1) return !1;
		a = this.children[b];
		return a && (a.parent = null), this.children.splice(b, 1), !0
	};
	a.removeAllChildren = function() {
		for(var b = this.children; b.length;) b.pop().parent = null
	};
	a.getChildAt = function(b) {
		return this.children[b]
	};
	a.getChildByName = function(b) {
		for(var a = this.children, d = 0, e = a.length; e > d; d++)
			if(a[d].name == b) return a[d];
		return null
	};
	a.sortChildren = function(b) {
		this.children.sort(b)
	};
	a.getChildIndex = function(b) {
		return createjs.indexOf(this.children, b)
	};
	a.getNumChildren =
		function() {
			return this.children.length
		};
	a.swapChildrenAt = function(b, a) {
		var d = this.children,
			e = d[b],
			c = d[a];
		e && c && (d[b] = c, d[a] = e)
	};
	a.swapChildren = function(b, a) {
		for(var d, e, c = this.children, f = 0, k = c.length; k > f && (c[f] == b && (d = f), c[f] == a && (e = f), null == d || null == e); f++);
		f != k && (c[d] = a, c[e] = b)
	};
	a.setChildIndex = function(b, a) {
		var d = this.children,
			e = d.length;
		if(!(b.parent != this || 0 > a || a >= e)) {
			for(var c = 0; e > c && d[c] != b; c++);
			c != e && c != a && (d.splice(c, 1), d.splice(a, 0, b))
		}
	};
	a.contains = function(b) {
		for(; b;) {
			if(b == this) return !0;
			b = b.parent
		}
		return !1
	};
	a.hitTest = function(b, a) {
		return null != this.getObjectUnderPoint(b, a)
	};
	a.getObjectsUnderPoint = function(b, a) {
		var d = [],
			e = this.localToGlobal(b, a);
		return this._getObjectsUnderPoint(e.x, e.y, d), d
	};
	a.getObjectUnderPoint = function(b, a) {
		var d = this.localToGlobal(b, a);
		return this._getObjectsUnderPoint(d.x, d.y)
	};
	a.DisplayObject_getBounds = a.getBounds;
	a.getBounds = function() {
		return this._getBounds(null, !0)
	};
	a.getTransformedBounds = function() {
		return this._getBounds()
	};
	a.clone = function(b) {
		var a = new c;
		if(this.cloneProps(a), b)
			for(var d = a.children = [], e = 0, g = this.children.length; g > e; e++) {
				var f = this.children[e].clone(b);
				f.parent = a;
				d.push(f)
			}
		return a
	};
	a.toString = function() {
		return "[Container (name\x3d" + this.name + ")]"
	};
	a.DisplayObject__tick = a._tick;
	a._tick = function(b) {
		for(var a = this.children.length - 1; 0 <= a; a--) {
			var d = this.children[a];
			d._tick && d._tick(b)
		}
		this.DisplayObject__tick(b)
	};
	a._getObjectsUnderPoint = function(b, a, d, e) {
		for(var g = createjs.DisplayObject._hitTestContext, f = this._matrix, k = this.children.length -
				1; 0 <= k; k--) {
			var m = this.children[k],
				n = e && m.hitArea;
			if(m.visible && (n || m.isVisible()) && (!e || m.mouseEnabled))
				if(!n && m instanceof c) {
					if(m = m._getObjectsUnderPoint(b, a, d, e), !d && m) return m
				} else if(!(m.getConcatenatedMatrix(f), n && (f.appendTransform(n.x, n.y, n.scaleX, n.scaleY, n.rotation, n.skewX, n.skewY, n.regX, n.regY), f.alpha = n.alpha), g.globalAlpha = f.alpha, g.setTransform(f.a, f.b, f.c, f.d, f.tx - b, f.ty - a), (n || m).draw(g), !this._testHit(g))) {
				if(g.setTransform(1, 0, 0, 1, 0, 0), g.clearRect(0, 0, 2, 2), !d) return e && !this.mouseChildren ?
					this : m;
				d.push(m)
			}
		}
		return null
	};
	a._getBounds = function(b, a) {
		var d = this.DisplayObject_getBounds();
		if(d) return this._transformBounds(d, b, a);
		var e, c, f, k, m = a ? this._matrix.identity() : this.getMatrix(this._matrix);
		b && m.prependMatrix(b);
		for(var n = this.children.length, p = 0; n > p; p++) {
			var q = this.children[p];
			if(q.visible && (d = q._getBounds(m))) {
				var q = d.x,
					s = d.y,
					r = q + d.width,
					t = s + d.height;
				(e > q || null == e) && (e = q);
				(r > c || null == c) && (c = r);
				(f > s || null == f) && (f = s);
				(t > k || null == k) && (k = t)
			}
		}
		return null == c ? null : this._rectangle.initialize(e,
			f, c - e, k - f)
	};
	createjs.Container = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b) {
			this.initialize(b)
		},
		a = c.prototype = new createjs.Container;
	c._snapToPixelEnabled = !1;
	a.autoClear = !0;
	a.canvas = null;
	a.mouseX = 0;
	a.mouseY = 0;
	a.snapToPixelEnabled = !1;
	a.mouseInBounds = !1;
	a.tickOnUpdate = !0;
	a.mouseMoveOutside = !1;
	a.nextStage = null;
	a._pointerData = null;
	a._pointerCount = 0;
	a._primaryPointerID = null;
	a._mouseOverIntervalID = null;
	a.Container_initialize = a.initialize;
	a.initialize = function(b) {
		this.Container_initialize();
		this.canvas = "string" == typeof b ? document.getElementById(b) :
			b;
		this._pointerData = {};
		this.enableDOMEvents(!0)
	};
	a.update = function() {
		if(this.canvas) {
			this.tickOnUpdate && (this.dispatchEvent("tickstart"), this._tick(arguments.length ? arguments : null), this.dispatchEvent("tickend"));
			this.dispatchEvent("drawstart");
			c._snapToPixelEnabled = this.snapToPixelEnabled;
			this.autoClear && this.clear();
			var b = this.canvas.getContext("2d");
			b.save();
			this.updateContext(b);
			this.draw(b, !1);
			b.restore();
			this.dispatchEvent("drawend")
		}
	};
	a.handleEvent = function(b) {
		"tick" == b.type && this.update(b)
	};
	a.clear = function() {
		if(this.canvas) {
			var b = this.canvas.getContext("2d");
			b.setTransform(1, 0, 0, 1, 0, 0);
			b.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)
		}
	};
	a.toDataURL = function(b, a) {
		a || (a = "image/png");
		var d, e = this.canvas.getContext("2d"),
			c = this.canvas.width,
			f = this.canvas.height;
		if(b) {
			d = e.getImageData(0, 0, c, f);
			var k = e.globalCompositeOperation;
			e.globalCompositeOperation = "destination-over";
			e.fillStyle = b;
			e.fillRect(0, 0, c, f)
		}
		var m = this.canvas.toDataURL(a);
		return b && (e.clearRect(0, 0, c + 1, f + 1), e.putImageData(d,
			0, 0), e.globalCompositeOperation = k), m
	};
	a.enableMouseOver = function(b) {
		if(this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID), this._mouseOverIntervalID = null, 0 == b && this._testMouseOver(!0)), null == b) b = 20;
		else if(0 >= b) return;
		var a = this;
		this._mouseOverIntervalID = setInterval(function() {
			a._testMouseOver()
		}, 1E3 / Math.min(50, b))
	};
	a.enableDOMEvents = function(b) {
		null == b && (b = !0);
		var a, d = this._eventListeners;
		if(!b && d) {
			for(a in d) b = d[a], b.t.removeEventListener(a, b.f, !1);
			this._eventListeners = null
		} else if(b &&
			!d && this.canvas) {
			b = window.addEventListener ? window : document;
			var e = this,
				d = this._eventListeners = {};
			d.mouseup = {
				t: b,
				f: function(b) {
					e._handleMouseUp(b)
				}
			};
			d.mousemove = {
				t: b,
				f: function(b) {
					e._handleMouseMove(b)
				}
			};
			d.dblclick = {
				t: b,
				f: function(b) {
					e._handleDoubleClick(b)
				}
			};
			d.mousedown = {
				t: this.canvas,
				f: function(b) {
					e._handleMouseDown(b)
				}
			};
			for(a in d) b = d[a], b.t.addEventListener(a, b.f, !1)
		}
	};
	a.clone = function() {
		var b = new c(null);
		return this.cloneProps(b), b
	};
	a.toString = function() {
		return "[Stage (name\x3d" + this.name + ")]"
	};
	a._getElementRect = function(b) {
		var a;
		try {
			a = b.getBoundingClientRect()
		} catch(d) {
			a = {
				top: b.offsetTop,
				left: b.offsetLeft,
				width: b.offsetWidth,
				height: b.offsetHeight
			}
		}
		var e = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0),
			c = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0),
			f = window.getComputedStyle ? getComputedStyle(b) : b.currentStyle;
		b = parseInt(f.paddingLeft) + parseInt(f.borderLeftWidth);
		var k = parseInt(f.paddingTop) + parseInt(f.borderTopWidth),
			m = parseInt(f.paddingRight) + parseInt(f.borderRightWidth),
			f = parseInt(f.paddingBottom) + parseInt(f.borderBottomWidth);
		return {
			left: a.left + e + b,
			right: a.right + e - m,
			top: a.top + c + k,
			bottom: a.bottom + c - f
		}
	};
	a._getPointerData = function(b) {
		var a = this._pointerData[b];
		return a || (a = this._pointerData[b] = {
			x: 0,
			y: 0
		}, null == this._primaryPointerID && (this._primaryPointerID = b)), a
	};
	a._handleMouseMove = function(b) {
		b || (b = window.event);
		this._handlePointerMove(-1, b, b.pageX, b.pageY)
	};
	a._handlePointerMove = function(b, a, d, e) {
		if(this.canvas) {
			var c =
				this._getPointerData(b),
				f = c.inBounds;
			if(this._updatePointerPosition(b, a, d, e), f || c.inBounds || this.mouseMoveOutside) - 1 == b && c.inBounds == !f && this._dispatchMouseEvent(this, f ? "mouseleave" : "mouseenter", !1, b, c, a), this._dispatchMouseEvent(this, "stagemousemove", !1, b, c, a), this._dispatchMouseEvent(c.target, "pressmove", !0, b, c, a), (f = c.event) && f.hasEventListener("mousemove") && f.dispatchEvent(new createjs.MouseEvent("mousemove", !1, !1, c.x, c.y, a, b, b == this._primaryPointerID, c.rawX, c.rawY), oTarget), this.nextStage && this.nextStage._handlePointerMove(b,
				a, d, e)
		}
	};
	a._updatePointerPosition = function(b, a, d, c) {
		var g = this._getElementRect(this.canvas);
		d -= g.left;
		c -= g.top;
		var f = this.canvas.width,
			k = this.canvas.height;
		d /= (g.right - g.left) / f;
		c /= (g.bottom - g.top) / k;
		g = this._getPointerData(b);
		(g.inBounds = 0 <= d && 0 <= c && f - 1 >= d && k - 1 >= c) ? (g.x = d, g.y = c) : this.mouseMoveOutside && (g.x = 0 > d ? 0 : d > f - 1 ? f - 1 : d, g.y = 0 > c ? 0 : c > k - 1 ? k - 1 : c);
		g.posEvtObj = a;
		g.rawX = d;
		g.rawY = c;
		b == this._primaryPointerID && (this.mouseX = g.x, this.mouseY = g.y, this.mouseInBounds = g.inBounds)
	};
	a._handleMouseUp = function(b) {
		this._handlePointerUp(-1,
			b, !1)
	};
	a._handlePointerUp = function(b, a, d) {
		var c = this._getPointerData(b);
		this._dispatchMouseEvent(this, "stagemouseup", !1, b, c, a);
		var g = c.target;
		g && (this._getObjectsUnderPoint(c.x, c.y, null, !0) == g && this._dispatchMouseEvent(g, "click", !0, b, c, a), this._dispatchMouseEvent(g, "pressup", !0, b, c, a));
		var f = c.event;
		f && f.hasEventListener("mouseup") && f.dispatchEvent(new createjs.MouseEvent("mouseup", !1, !1, c.x, c.y, a, b, b == this._primaryPointerID, c.rawX, c.rawY), g);
		d ? (b == this._primaryPointerID && (this._primaryPointerID =
			null), delete this._pointerData[b]) : c.event = c.target = null;
		this.nextStage && this.nextStage._handlePointerUp(b, a, d)
	};
	a._handleMouseDown = function(b) {
		this._handlePointerDown(-1, b)
	};
	a._handlePointerDown = function(b, a, d, c) {
		null != c && this._updatePointerPosition(b, a, d, c);
		var g = this._getPointerData(b);
		this._dispatchMouseEvent(this, "stagemousedown", !1, b, g, a);
		g.target = this._getObjectsUnderPoint(g.x, g.y, null, !0);
		this._dispatchMouseEvent(g.target, "mousedown", !0, b, g, a);
		this.nextStage && this.nextStage._handlePointerDown(b,
			a, d, c)
	};
	a._testMouseOver = function(b) {
		if(-1 == this._primaryPointerID && (b || this.mouseX != this._mouseOverX || this.mouseY != this._mouseOverY || !this.mouseInBounds)) {
			var a, d, c, g = this._getPointerData(-1),
				f = g.posEvtObj,
				k = -1;
			c = "";
			(b || this.mouseInBounds && f && f.target == this.canvas) && (a = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, !0), this._mouseOverX = this.mouseX, this._mouseOverY = this.mouseY);
			b = this._mouseOverTarget || [];
			var m = b[b.length - 1],
				n = this._mouseOverTarget = [];
			for(d = a; d;) n.unshift(d), null != d.cursor &&
				(c = d.cursor), d = d.parent;
			this.canvas.style.cursor = c;
			c = 0;
			for(d = n.length; d > c && n[c] == b[c]; c++) k = c;
			m != a && this._dispatchMouseEvent(m, "mouseout", !0, -1, g, f);
			for(c = b.length - 1; c > k; c--) this._dispatchMouseEvent(b[c], "rollout", !1, -1, g, f);
			for(c = n.length - 1; c > k; c--) this._dispatchMouseEvent(n[c], "rollover", !1, -1, g, f);
			m != a && this._dispatchMouseEvent(a, "mouseover", !0, -1, g, f)
		}
	};
	a._handleDoubleClick = function(b) {
		var a = this._getPointerData(-1),
			d = this._getObjectsUnderPoint(a.x, a.y, null, !0);
		this._dispatchMouseEvent(d, "dblclick", !0, -1, a, b);
		this.nextStage && this.nextStage._handleDoubleClick(b)
	};
	a._dispatchMouseEvent = function(b, a, d, c, g, f) {
		if(b && (d || b.hasEventListener(a))) a = new createjs.MouseEvent(a, d, !1, g.x, g.y, f, c, c == this._primaryPointerID, g.rawX, g.rawY), b.dispatchEvent(a)
	};
	createjs.Stage = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b) {
			this.initialize(b)
		},
		a = c.prototype = new createjs.DisplayObject;
	a.image = null;
	a.snapToPixel = !0;
	a.sourceRect = null;
	a.DisplayObject_initialize = a.initialize;
	a.initialize = function(b) {
		this.DisplayObject_initialize();
		"string" == typeof b ? (this.image = new Image, this.image.src = b) : this.image = b
	};
	a.isVisible = function() {
		var b = this.cacheCanvas || this.image && (this.image.complete || this.image.getContext || 2 <= this.image.readyState);
		return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY &&
			b))
	};
	a.DisplayObject_draw = a.draw;
	a.draw = function(b, a) {
		if(this.DisplayObject_draw(b, a)) return !0;
		var d = this.sourceRect;
		return d ? b.drawImage(this.image, d.x, d.y, d.width, d.height, 0, 0, d.width, d.height) : b.drawImage(this.image, 0, 0), !0
	};
	a.DisplayObject_getBounds = a.getBounds;
	a.getBounds = function() {
		var b = this.DisplayObject_getBounds();
		if(b) return b;
		b = this.sourceRect || this.image;
		return this.image && (this.image.complete || this.image.getContext || 2 <= this.image.readyState) ? this._rectangle.initialize(0, 0, b.width, b.height) :
			null
	};
	a.clone = function() {
		var b = new c(this.image);
		return this.sourceRect && (b.sourceRect = this.sourceRect.clone()), this.cloneProps(b), b
	};
	a.toString = function() {
		return "[Bitmap (name\x3d" + this.name + ")]"
	};
	createjs.Bitmap = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, a) {
			this.initialize(b, a)
		},
		a = c.prototype = new createjs.DisplayObject;
	a.currentFrame = 0;
	a.currentAnimation = null;
	a.paused = !0;
	a.spriteSheet = null;
	a.snapToPixel = !0;
	a.offset = 0;
	a.currentAnimationFrame = 0;
	a.framerate = 0;
	a._advanceCount = 0;
	a._animation = null;
	a._currentFrame = null;
	a.DisplayObject_initialize = a.initialize;
	a.initialize = function(b, a) {
		this.DisplayObject_initialize();
		this.spriteSheet = b;
		a && this.gotoAndPlay(a)
	};
	a.isVisible = function() {
		var b = this.cacheCanvas || this.spriteSheet.complete;
		return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && b))
	};
	a.DisplayObject_draw = a.draw;
	a.draw = function(b, a) {
		if(this.DisplayObject_draw(b, a)) return !0;
		this._normalizeFrame();
		var d = this.spriteSheet.getFrame(0 | this._currentFrame);
		if(!d) return !1;
		var c = d.rect;
		return b.drawImage(d.image, c.x, c.y, c.width, c.height, -d.regX, -d.regY, c.width, c.height), !0
	};
	a.play = function() {
		this.paused = !1
	};
	a.stop = function() {
		this.paused = !0
	};
	a.gotoAndPlay = function(b) {
		this.paused = !1;
		this._goto(b)
	};
	a.gotoAndStop = function(b) {
		this.paused = !0;
		this._goto(b)
	};
	a.advance = function(b) {
		var a = this._animation && this._animation.speed || 1,
			d = this.framerate || this.spriteSheet.framerate;
		b = d && null != b ? b / (1E3 / d) : 1;
		this._animation ? this.currentAnimationFrame += b * a : this._currentFrame += b * a;
		this._normalizeFrame()
	};
	a.DisplayObject_getBounds = a.getBounds;
	a.getBounds = function() {
		return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
	};
	a.clone = function() {
		var b = new c(this.spriteSheet);
		return this.cloneProps(b), b
	};
	a.toString =
		function() {
			return "[Sprite (name\x3d" + this.name + ")]"
		};
	a.DisplayObject__tick = a._tick;
	a._tick = function(b) {
		this.paused || this.advance(b && b[0] && b[0].delta);
		this.DisplayObject__tick(b)
	};
	a._normalizeFrame = function() {
		var b, a = this._animation,
			d = this.paused,
			c = this._currentFrame,
			g = this.currentAnimationFrame;
		if(a)
			if(b = a.frames.length, (0 | g) >= b) {
				var f = a.next;
				if(!this._dispatchAnimationEnd(a, c, d, f, b - 1)) {
					if(f) return this._goto(f, g - b);
					this.paused = !0;
					g = this.currentAnimationFrame = a.frames.length - 1;
					this._currentFrame =
						a.frames[g]
				}
			} else this._currentFrame = a.frames[0 | g];
		else if(b = this.spriteSheet.getNumFrames(), c >= b && !this._dispatchAnimationEnd(a, c, d, b - 1) && (this._currentFrame -= b) >= b) return this._normalizeFrame();
		this.currentFrame = 0 | this._currentFrame
	};
	a._dispatchAnimationEnd = function(b, a, d, c, g) {
		var f = b ? b.name : null;
		if(this.hasEventListener("animationend")) {
			var k = new createjs.Event("animationend");
			k.name = f;
			k.next = c;
			this.dispatchEvent(k)
		}
		return !d && this.paused && (this.currentAnimationFrame = g), this.paused != d || this._animation !=
			b || this._currentFrame != a
	};
	a.DisplayObject_cloneProps = a.cloneProps;
	a.cloneProps = function(b) {
		this.DisplayObject_cloneProps(b);
		b.currentFrame = this.currentFrame;
		b._currentFrame = this._currentFrame;
		b.currentAnimation = this.currentAnimation;
		b.paused = this.paused;
		b._animation = this._animation;
		b.currentAnimationFrame = this.currentAnimationFrame;
		b.framerate = this.framerate
	};
	a._goto = function(b, a) {
		if(isNaN(b)) {
			var d = this.spriteSheet.getAnimation(b);
			d && (this.currentAnimationFrame = a || 0, this._animation = d, this.currentAnimation =
				b, this._normalizeFrame())
		} else this.currentAnimationFrame = 0, this.currentAnimation = this._animation = null, this._currentFrame = b, this._normalizeFrame()
	};
	createjs.Sprite = c
})();
this.createjs = this.createjs || {};
(function() {
	if(!createjs.Sprite) throw "BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.";
	(createjs.BitmapAnimation = function(c) {
		console.log("BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.");
		this.initialize(c)
	}).prototype = new createjs.Sprite
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b) {
			this.initialize(b)
		},
		a = c.prototype = new createjs.DisplayObject;
	a.graphics = null;
	a.DisplayObject_initialize = a.initialize;
	a.initialize = function(b) {
		this.DisplayObject_initialize();
		this.graphics = b ? b : new createjs.Graphics
	};
	a.isVisible = function() {
		var b = this.cacheCanvas || this.graphics && !this.graphics.isEmpty();
		return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && b))
	};
	a.DisplayObject_draw = a.draw;
	a.draw = function(b, a) {
		return this.DisplayObject_draw(b, a) ? !0 : (this.graphics.draw(b), !0)
	};
	a.clone = function(b) {
		b = new c(b && this.graphics ? this.graphics.clone() : this.graphics);
		return this.cloneProps(b), b
	};
	a.toString = function() {
		return "[Shape (name\x3d" + this.name + ")]"
	};
	createjs.Shape = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, a, c) {
			this.initialize(b, a, c)
		},
		a = c.prototype = new createjs.DisplayObject,
		b = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
	b.getContext && (c._workingContext = b.getContext("2d"), b.width = b.height = 1);
	c.H_OFFSETS = {
		start: 0,
		left: 0,
		center: -0.5,
		end: -1,
		right: -1
	};
	c.V_OFFSETS = {
		top: 0,
		hanging: -0.01,
		middle: -0.4,
		alphabetic: -0.8,
		ideographic: -0.85,
		bottom: -1
	};
	a.text = "";
	a.font = null;
	a.color = null;
	a.textAlign = "left";
	a.textBaseline = "top";
	a.maxWidth = null;
	a.outline = 0;
	a.lineHeight = 0;
	a.lineWidth = null;
	a.DisplayObject_initialize = a.initialize;
	a.initialize = function(b, a, c) {
		this.DisplayObject_initialize();
		this.text = b;
		this.font = a;
		this.color = c
	};
	a.isVisible = function() {
		var b = this.cacheCanvas || null != this.text && "" !== this.text;
		return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && b))
	};
	a.DisplayObject_draw = a.draw;
	a.draw = function(b, a) {
		if(this.DisplayObject_draw(b, a)) return !0;
		var c = this.color || "#000";
		return this.outline ? (b.strokeStyle = c, b.lineWidth = 1 * this.outline) :
			b.fillStyle = c, this._drawText(this._prepContext(b)), !0
	};
	a.getMeasuredWidth = function() {
		return this._prepContext(c._workingContext).measureText(this.text).width
	};
	a.getMeasuredLineHeight = function() {
		return 1.2 * this._prepContext(c._workingContext).measureText("M").width
	};
	a.getMeasuredHeight = function() {
		return this._drawText(null, {}).height
	};
	a.DisplayObject_getBounds = a.getBounds;
	a.getBounds = function() {
		var b = this.DisplayObject_getBounds();
		if(b) return b;
		if(null == this.text || "" == this.text) return null;
		var b = this._drawText(null, {}),
			a = this.maxWidth && this.maxWidth < b.width ? this.maxWidth : b.width,
			e = a * c.H_OFFSETS[this.textAlign || "left"],
			g = (this.lineHeight || this.getMeasuredLineHeight()) * c.V_OFFSETS[this.textBaseline || "top"];
		return this._rectangle.initialize(e, g, a, b.height)
	};
	a.clone = function() {
		var b = new c(this.text, this.font, this.color);
		return this.cloneProps(b), b
	};
	a.toString = function() {
		return "[Text (text\x3d" + (20 < this.text.length ? this.text.substr(0, 17) + "..." : this.text) + ")]"
	};
	a.DisplayObject_cloneProps = a.cloneProps;
	a.cloneProps =
		function(b) {
			this.DisplayObject_cloneProps(b);
			b.textAlign = this.textAlign;
			b.textBaseline = this.textBaseline;
			b.maxWidth = this.maxWidth;
			b.outline = this.outline;
			b.lineHeight = this.lineHeight;
			b.lineWidth = this.lineWidth
		};
	a._prepContext = function(b) {
		return b.font = this.font, b.textAlign = this.textAlign || "left", b.textBaseline = this.textBaseline || "top", b
	};
	a._drawText = function(b, a) {
		var e = !!b;
		e || (b = this._prepContext(c._workingContext));
		for(var g = this.lineHeight || this.getMeasuredLineHeight(), f = 0, k = 0, m = String(this.text).split(/(?:\r\n|\r|\n)/),
				n = 0, p = m.length; p > n; n++) {
			var q = m[n],
				s = null;
			if(null != this.lineWidth && (s = b.measureText(q).width) > this.lineWidth)
				for(var r = q.split(/(\s)/), q = r[0], s = b.measureText(q).width, t = 1, v = r.length; v > t; t += 2) {
					var u = b.measureText(r[t] + r[t + 1]).width;
					s + u > this.lineWidth ? (e && this._drawTextLine(b, q, k * g), s > f && (f = s), q = r[t + 1], s = b.measureText(q).width, k++) : (q += r[t] + r[t + 1], s += u)
				}
			e && this._drawTextLine(b, q, k * g);
			a && null == s && (s = b.measureText(q).width);
			s > f && (f = s);
			k++
		}
		return a && (a.count = k, a.width = f, a.height = k * g), a
	};
	a._drawTextLine =
		function(b, a, c) {
			this.outline ? b.strokeText(a, 0, c, this.maxWidth || 65535) : b.fillText(a, 0, c, this.maxWidth || 65535)
		};
	createjs.Text = c
})();
this.createjs = this.createjs || {};
(function() {
	function c(b, a) {
		this.initialize(b, a)
	}
	var a = c.prototype = new createjs.DisplayObject;
	a.text = "";
	a.spriteSheet = null;
	a.lineHeight = 0;
	a.letterSpacing = 0;
	a.spaceWidth = 0;
	a.DisplayObject_initialize = a.initialize;
	a.initialize = function(b, a) {
		this.DisplayObject_initialize();
		this.text = b;
		this.spriteSheet = a
	};
	a.DisplayObject_draw = a.draw;
	a.draw = function(b, a) {
		return this.DisplayObject_draw(b, a) ? !0 : (this._drawText(b), void 0)
	};
	a.isVisible = function() {
		var b = this.cacheCanvas || this.spriteSheet && this.spriteSheet.complete &&
			this.text;
		return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && b))
	};
	a.getBounds = function() {
		var b = this._rectangle;
		return this._drawText(null, b), b.width ? b : null
	};
	a._getFrame = function(b, a) {
		var d, c = a.getAnimation(b);
		return c || (b != (d = b.toUpperCase()) || b != (d = b.toLowerCase()) || (d = null), d && (c = a.getAnimation(d))), c && a.getFrame(c.frames[0])
	};
	a._getLineHeight = function(b) {
		return(b = this._getFrame("1", b) || this._getFrame("T", b) || this._getFrame("L", b) || b.getFrame(0)) ? b.rect.height : 1
	};
	a._getSpaceWidth =
		function(b) {
			return(b = this._getFrame("1", b) || this._getFrame("l", b) || this._getFrame("e", b) || this._getFrame("a", b) || b.getFrame(0)) ? b.rect.width : 1
		};
	a._drawText = function(b, a) {
		var d, c, g, f = 0,
			k = 0,
			m = this.spaceWidth,
			n = this.lineHeight,
			p = this.spriteSheet,
			q = !!this._getFrame(" ", p);
		q || 0 != m || (m = this._getSpaceWidth(p));
		0 == n && (n = this._getLineHeight(p));
		for(var s = 0, r = 0, t = this.text.length; t > r; r++)
			if(d = this.text.charAt(r), q || " " != d)
				if("\n" != d && "\r" != d) {
					var v = this._getFrame(d, p);
					if(v) {
						var u = v.rect;
						g = v.regX;
						d = u.width;
						b && b.drawImage(v.image, u.x, u.y, d, c = u.height, f - g, k - v.regY, d, c);
						f += d + this.letterSpacing
					}
				} else "\r" == d && "\n" == this.text.charAt(r + 1) && r++, f - g > s && (s = f - g), f = 0, k += n;
		else f += m;
		f - g > s && (s = f - g);
		a && (a.width = s - this.letterSpacing, a.height = k + n)
	};
	createjs.BitmapText = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
			throw "SpriteSheetUtils cannot be instantiated";
		},
		a = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
	a.getContext && (c._workingCanvas = a, c._workingContext = a.getContext("2d"), a.width = a.height = 1);
	c.addFlippedFrames = function(b, a, d, e) {
		if(a || d || e) {
			var g = 0;
			a && c._flip(b, ++g, !0, !1);
			d && c._flip(b, ++g, !1, !0);
			e && c._flip(b, ++g, !0, !0)
		}
	};
	c.extractFrame = function(b, a) {
		isNaN(a) && (a = b.getAnimation(a).frames[0]);
		var d = b.getFrame(a);
		if(!d) return null;
		var e = d.rect,
			g = c._workingCanvas;
		g.width = e.width;
		g.height = e.height;
		c._workingContext.drawImage(d.image, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height);
		d = new Image;
		return d.src = g.toDataURL("image/png"), d
	};
	c.mergeAlpha = function(b, a, d) {
		d || (d = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
		d.width = Math.max(a.width, b.width);
		d.height = Math.max(a.height, b.height);
		var c = d.getContext("2d");
		return c.save(), c.drawImage(b, 0, 0), c.globalCompositeOperation = "destination-in", c.drawImage(a, 0, 0), c.restore(),
			d
	};
	c._flip = function(b, a, d, e) {
		for(var g = b._images, f = c._workingCanvas, k = c._workingContext, m = g.length / a, n = 0; m > n; n++) {
			var p = g[n];
			p.__tmp = n;
			k.setTransform(1, 0, 0, 1, 0, 0);
			k.clearRect(0, 0, f.width + 1, f.height + 1);
			f.width = p.width;
			f.height = p.height;
			k.setTransform(d ? -1 : 1, 0, 0, e ? -1 : 1, d ? p.width : 0, e ? p.height : 0);
			k.drawImage(p, 0, 0);
			var q = new Image;
			q.src = f.toDataURL("image/png");
			q.width = p.width;
			q.height = p.height;
			g.push(q)
		}
		k = b._frames;
		f = k.length / a;
		for(n = 0; f > n; n++) {
			var p = k[n],
				s = p.rect.clone(),
				q = g[p.image.__tmp + m * a],
				r = {
					image: q,
					rect: s,
					regX: p.regX,
					regY: p.regY
				};
			d && (s.x = q.width - s.x - s.width, r.regX = s.width - p.regX);
			e && (s.y = q.height - s.y - s.height, r.regY = s.height - p.regY);
			k.push(r)
		}
		d = "_" + (d ? "h" : "") + (e ? "v" : "");
		e = b._animations;
		b = b._data;
		g = e.length / a;
		for(n = 0; g > n; n++) {
			k = e[n];
			p = b[k];
			m = {
				name: k + d,
				frequency: p.frequency,
				next: p.next,
				frames: []
			};
			p.next && (m.next += d);
			k = p.frames;
			p = 0;
			for(q = k.length; q > p; p++) m.frames.push(k[p] + f * a);
			b[m.name] = m;
			e.push(m.name)
		}
	};
	createjs.SpriteSheetUtils = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
			this.initialize()
		},
		a = c.prototype = new createjs.EventDispatcher;
	c.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions";
	c.ERR_RUNNING = "a build is already running";
	a.maxWidth = 2048;
	a.maxHeight = 2048;
	a.spriteSheet = null;
	a.scale = 1;
	a.padding = 1;
	a.timeSlice = 0.3;
	a.progress = -1;
	a._frames = null;
	a._animations = null;
	a._data = null;
	a._nextFrameIndex = 0;
	a._index = 0;
	a._timerID = null;
	a._scale = 1;
	a.initialize = function() {
		this._frames = [];
		this._animations = {}
	};
	a.addFrame = function(b, a, d, e,
		g, f) {
		if(this._data) throw c.ERR_RUNNING;
		a = a || b.bounds || b.nominalBounds;
		return !a && b.getBounds && (a = b.getBounds()), a ? (d = d || 1, this._frames.push({
			source: b,
			sourceRect: a,
			scale: d,
			funct: e,
			params: g,
			scope: f,
			index: this._frames.length,
			height: a.height * d
		}) - 1) : null
	};
	a.addAnimation = function(b, a, d, e) {
		if(this._data) throw c.ERR_RUNNING;
		this._animations[b] = {
			frames: a,
			next: d,
			frequency: e
		}
	};
	a.addMovieClip = function(b, a, d) {
		if(this._data) throw c.ERR_RUNNING;
		var e = b.frameBounds,
			g = a || b.bounds || b.nominalBounds;
		if(!g && b.getBounds &&
			(g = b.getBounds()), !g && !e) return null;
		a = this._frames.length;
		for(var f = b.timeline.duration, k = 0; f > k; k++) this.addFrame(b, e && e[k] ? e[k] : g, d, function(b) {
			var a = this.actionsEnabled;
			this.actionsEnabled = !1;
			this.gotoAndStop(b);
			this.actionsEnabled = a
		}, [k], b);
		k = b.timeline._labels;
		b = [];
		for(var m in k) b.push({
			index: k[m],
			label: m
		});
		if(b.length) {
			b.sort(function(b, a) {
				return b.index - a.index
			});
			k = 0;
			for(m = b.length; m > k; k++) {
				d = b[k].label;
				for(var e = a + (k == m - 1 ? f : b[k + 1].index), g = [], n = a + b[k].index; e > n; n++) g.push(n);
				this.addAnimation(d,
					g, !0)
			}
		}
	};
	a.build = function() {
		if(this._data) throw c.ERR_RUNNING;
		for(this._startBuild(); this._drawNext(););
		return this._endBuild(), this.spriteSheet
	};
	a.buildAsync = function(b) {
		if(this._data) throw c.ERR_RUNNING;
		this.timeSlice = b;
		this._startBuild();
		var a = this;
		this._timerID = setTimeout(function() {
			a._run()
		}, 50 - 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)))
	};
	a.stopAsync = function() {
		clearTimeout(this._timerID);
		this._data = null
	};
	a.clone = function() {
		throw "SpriteSheetBuilder cannot be cloned.";
	};
	a.toString = function() {
		return "[SpriteSheetBuilder]"
	};
	a._startBuild = function() {
		var b = this.padding || 0;
		this.progress = 0;
		this.spriteSheet = null;
		this._index = 0;
		this._scale = this.scale;
		var a = [];
		this._data = {
			images: [],
			frames: a,
			animations: this._animations
		};
		var d = this._frames.slice();
		if(d.sort(function(b, a) {
				return b.height <= a.height ? -1 : 1
			}), d[d.length - 1].height + 2 * b > this.maxHeight) throw c.ERR_DIMENSIONS;
		for(var e = 0, g = 0, f = 0; d.length;) {
			var k = this._fillRow(d, e, f, a, b);
			if(k.w > g && (g = k.w), e += k.h, !k.h || !d.length) {
				var m = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
				m.width = this._getSize(g, this.maxWidth);
				m.height = this._getSize(e, this.maxHeight);
				this._data.images[f] = m;
				k.h || (g = e = 0, f++)
			}
		}
	};
	a._getSize = function(b, a) {
		for(var d = 4; Math.pow(2, ++d) < b;);
		return Math.min(a, Math.pow(2, d))
	};
	a._fillRow = function(b, a, d, e, g) {
		var f = this.maxWidth,
			k = this.maxHeight;
		a += g;
		for(var k = k - a, m = g, n = 0, p = b.length - 1; 0 <= p; p--) {
			var q = b[p],
				s = this._scale * q.scale,
				r = q.sourceRect,
				t = q.source,
				v = Math.floor(s * r.x - g),
				u = Math.floor(s * r.y - g),
				x = Math.ceil(s * r.height + 2 * g),
				r = Math.ceil(s * r.width + 2 * g);
			if(r > f) throw c.ERR_DIMENSIONS;
			x > k || m + r > f || (q.img = d, q.rect = new createjs.Rectangle(m, a, r, x), n = n || x, b.splice(p, 1), e[q.index] = [m, a, r, x, d, Math.round(-v + s * t.regX - g), Math.round(-u + s * t.regY - g)], m += r)
		}
		return {
			w: m,
			h: n
		}
	};
	a._endBuild = function() {
		this.spriteSheet = new createjs.SpriteSheet(this._data);
		this._data = null;
		this.progress = 1;
		this.dispatchEvent("complete")
	};
	a._run = function() {
		for(var b = 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)), a = (new Date).getTime() + b, d = !1; a > (new Date).getTime();)
			if(!this._drawNext()) {
				d = !0;
				break
			}
		if(d) this._endBuild();
		else {
			var c = this;
			this._timerID = setTimeout(function() {
				c._run()
			}, 50 - b)
		}
		b = this.progress = this._index / this._frames.length;
		this.hasEventListener("progress") && (a = new createjs.Event("progress"), a.progress = b, this.dispatchEvent(a))
	};
	a._drawNext = function() {
		var b = this._frames[this._index],
			a = b.scale * this._scale,
			d = b.rect,
			c = b.sourceRect,
			g = this._data.images[b.img].getContext("2d");
		return b.funct && b.funct.apply(b.scope, b.params), g.save(), g.beginPath(), g.rect(d.x, d.y, d.width, d.height), g.clip(), g.translate(Math.ceil(d.x -
			c.x * a), Math.ceil(d.y - c.y * a)), g.scale(a, a), b.source.draw(g), g.restore(), ++this._index < this._frames.length
	};
	createjs.SpriteSheetBuilder = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b) {
			this.initialize(b)
		},
		a = c.prototype = new createjs.DisplayObject;
	a.htmlElement = null;
	a._oldMtx = null;
	a._visible = !1;
	a.DisplayObject_initialize = a.initialize;
	a.initialize = function(b) {
		"string" == typeof b && (b = document.getElementById(b));
		this.DisplayObject_initialize();
		this.mouseEnabled = !1;
		this.htmlElement = b;
		b = b.style;
		b.position = "absolute";
		b.transformOrigin = b.WebkitTransformOrigin = b.msTransformOrigin = b.MozTransformOrigin = b.OTransformOrigin = "0% 0%"
	};
	a.isVisible = function() {
		return null !=
			this.htmlElement
	};
	a.draw = function() {
		return this.visible && (this._visible = !0), !0
	};
	a.cache = function() {};
	a.uncache = function() {};
	a.updateCache = function() {};
	a.hitTest = function() {};
	a.localToGlobal = function() {};
	a.globalToLocal = function() {};
	a.localToLocal = function() {};
	a.clone = function() {
		throw "DOMElement cannot be cloned.";
	};
	a.toString = function() {
		return "[DOMElement (name\x3d" + this.name + ")]"
	};
	a.DisplayObject__tick = a._tick;
	a._tick = function(b) {
		var a = this.getStage();
		this._visible = !1;
		a && a.on("drawend", this._handleDrawEnd,
			this, !0);
		this.DisplayObject__tick(b)
	};
	a._handleDrawEnd = function() {
		var b = this.htmlElement;
		if(b) {
			var b = b.style,
				a = this._visible ? "visible" : "hidden";
			if(a != b.visibility && (b.visibility = a), this._visible) {
				var a = this.getConcatenatedMatrix(this._matrix),
					d = this._oldMtx;
				if(d && d.alpha == a.alpha || (b.opacity = "" + (0 | 1E4 * a.alpha) / 1E4, d && (d.alpha = a.alpha)), !d || d.tx != a.tx || d.ty != a.ty || d.a != a.a || d.b != a.b || d.c != a.c || d.d != a.d) {
					var c = "matrix(" + (0 | 1E4 * a.a) / 1E4 + "," + (0 | 1E4 * a.b) / 1E4 + "," + (0 | 1E4 * a.c) / 1E4 + "," + (0 | 1E4 * a.d) / 1E4 + "," +
						(0 | a.tx + 0.5);
					b.transform = b.WebkitTransform = b.OTransform = b.msTransform = c + "," + (0 | a.ty + 0.5) + ")";
					b.MozTransform = c + "px," + (0 | a.ty + 0.5) + "px)";
					this._oldMtx = d ? d.copy(a) : a.clone()
				}
			}
		}
	};
	createjs.DOMElement = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
			this.initialize()
		},
		a = c.prototype;
	a.initialize = function() {};
	a.getBounds = function() {
		return null
	};
	a.applyFilter = function() {};
	a.toString = function() {
		return "[Filter]"
	};
	a.clone = function() {
		return new c
	};
	createjs.Filter = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, a, d) {
			this.initialize(b, a, d)
		},
		a = c.prototype = new createjs.Filter;
	a.initialize = function(b, a, d) {
		(isNaN(b) || 0 > b) && (b = 0);
		this.blurX = 0 | b;
		(isNaN(a) || 0 > a) && (a = 0);
		this.blurY = 0 | a;
		(isNaN(d) || 1 > d) && (d = 1);
		this.quality = 0 | d
	};
	a.blurX = 0;
	a.blurY = 0;
	a.quality = 1;
	a.mul_table = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285,
		281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345,
		343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1
	];
	a.shg_table = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16,
		15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17,
		16, 17, 16, 17, 16, 17, 9
	];
	a.getBounds = function() {
		var b = 0.5 * Math.pow(this.quality, 0.6);
		return new createjs.Rectangle(-this.blurX * b, -this.blurY * b, 2 * this.blurX * b, 2 * this.blurY * b)
	};
	a.applyFilter = function(b, a, d, c, g, f, k, m) {
		f = f || b;
		null == k && (k = a);
		null == m && (m = d);
		try {
			var n = b.getImageData(a, d, c, g)
		} catch(p) {
			return !1
		}
		b = this.blurX / 2;
		if(isNaN(b) || 0 > b) return !1;
		b |= 0;
		var q = this.blurY / 2;
		if(isNaN(q) || 0 > q || (q |= 0, 0 == b && 0 == q)) return !1;
		var s = this.quality;
		(isNaN(s) || 1 > s) && (s = 1);
		s |= 0;
		3 < s && (s = 3);
		1 > s && (s = 1);
		var r, t, v, u, x, A, B, z, C,
			I, J, K, w = n.data,
			G = b + b + 1;
		u = q + q + 1;
		var L = c - 1,
			H = g - 1,
			F = b + 1,
			E = q + 1,
			M = {
				r: 0,
				b: 0,
				g: 0,
				a: 0,
				next: null
			};
		a = M;
		for(r = 1; G > r; r++) a = a.next = {
			r: 0,
			b: 0,
			g: 0,
			a: 0,
			next: null
		};
		a.next = M;
		d = G = {
			r: 0,
			b: 0,
			g: 0,
			a: 0,
			next: null
		};
		for(r = 1; u > r; r++) d = d.next = {
			r: 0,
			b: 0,
			g: 0,
			a: 0,
			next: null
		};
		d.next = G;
		for(r = null; 0 < s--;) {
			x = u = 0;
			var y = this.mul_table[b],
				D = this.shg_table[b];
			for(d = g; - 1 < --d;) {
				A = F * (I = w[u]);
				B = F * (J = w[u + 1]);
				z = F * (K = w[u + 2]);
				C = F * (v = w[u + 3]);
				a = M;
				for(r = F; - 1 < --r;) a.r = I, a.g = J, a.b = K, a.a = v, a = a.next;
				for(r = 1; F > r; r++) t = u + ((r > L ? L : r) << 2), A += a.r = w[t], B += a.g = w[t +
					1], z += a.b = w[t + 2], C += a.a = w[t + 3], a = a.next;
				r = M;
				for(a = 0; c > a; a++) w[u++] = A * y >>> D, w[u++] = B * y >>> D, w[u++] = z * y >>> D, w[u++] = C * y >>> D, t = x + ((t = a + b + 1) < L ? t : L) << 2, A -= r.r - (r.r = w[t]), B -= r.g - (r.g = w[t + 1]), z -= r.b - (r.b = w[t + 2]), C -= r.a - (r.a = w[t + 3]), r = r.next;
				x += c
			}
			y = this.mul_table[q];
			D = this.shg_table[q];
			for(a = 0; c > a; a++) {
				u = a << 2;
				A = E * (I = w[u]);
				B = E * (J = w[u + 1]);
				z = E * (K = w[u + 2]);
				C = E * (v = w[u + 3]);
				d = G;
				for(r = 0; E > r; r++) d.r = I, d.g = J, d.b = K, d.a = v, d = d.next;
				v = c;
				for(r = 1; q >= r; r++) u = v + a << 2, A += d.r = w[u], B += d.g = w[u + 1], z += d.b = w[u + 2], C += d.a = w[u + 3], d = d.next,
					H > r && (v += c);
				if(u = a, r = G, 0 < s)
					for(d = 0; g > d; d++) t = u << 2, w[t + 3] = v = C * y >>> D, 0 < v ? (w[t] = A * y >>> D, w[t + 1] = B * y >>> D, w[t + 2] = z * y >>> D) : w[t] = w[t + 1] = w[t + 2] = 0, t = a + ((t = d + E) < H ? t : H) * c << 2, A -= r.r - (r.r = w[t]), B -= r.g - (r.g = w[t + 1]), z -= r.b - (r.b = w[t + 2]), C -= r.a - (r.a = w[t + 3]), r = r.next, u += c;
				else
					for(d = 0; g > d; d++) t = u << 2, w[t + 3] = v = C * y >>> D, 0 < v ? (v = 255 / v, w[t] = (A * y >>> D) * v, w[t + 1] = (B * y >>> D) * v, w[t + 2] = (z * y >>> D) * v) : w[t] = w[t + 1] = w[t + 2] = 0, t = a + ((t = d + E) < H ? t : H) * c << 2, A -= r.r - (r.r = w[t]), B -= r.g - (r.g = w[t + 1]), z -= r.b - (r.b = w[t + 2]), C -= r.a - (r.a = w[t + 3]), r = r.next,
						u += c
			}
		}
		return f.putImageData(n, k, m), !0
	};
	a.clone = function() {
		return new c(this.blurX, this.blurY, this.quality)
	};
	a.toString = function() {
		return "[BlurFilter]"
	};
	createjs.BlurFilter = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b) {
			this.initialize(b)
		},
		a = c.prototype = new createjs.Filter;
	a.initialize = function(b) {
		this.alphaMap = b
	};
	a.alphaMap = null;
	a._alphaMap = null;
	a._mapData = null;
	a.applyFilter = function(b, a, d, c, g, f, k, m) {
		if(!this.alphaMap) return !0;
		if(!this._prepAlphaMap()) return !1;
		f = f || b;
		null == k && (k = a);
		null == m && (m = d);
		try {
			var n = b.getImageData(a, d, c, g)
		} catch(p) {
			return !1
		}
		b = n.data;
		a = this._mapData;
		d = b.length;
		for(c = 0; d > c; c += 4) b[c + 3] = a[c] || 0;
		return n.data = b, f.putImageData(n, k, m), !0
	};
	a.clone = function() {
		return new c(this.alphaMap)
	};
	a.toString = function() {
		return "[AlphaMapFilter]"
	};
	a._prepAlphaMap = function() {
		if(!this.alphaMap) return !1;
		if(this.alphaMap == this._alphaMap && this._mapData) return !0;
		this._mapData = null;
		var b, a = this._alphaMap = this.alphaMap,
			d = a;
		a instanceof HTMLCanvasElement ? b = d.getContext("2d") : (d = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"), d.width = a.width, d.height = a.height, b = d.getContext("2d"), b.drawImage(a, 0, 0));
		try {
			var c = b.getImageData(0, 0, a.width, a.height)
		} catch(g) {
			return !1
		}
		return this._mapData =
			c.data, !0
	};
	createjs.AlphaMapFilter = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b) {
			this.initialize(b)
		},
		a = c.prototype = new createjs.Filter;
	a.initialize = function(b) {
		this.mask = b
	};
	a.mask = null;
	a.applyFilter = function(b, a, d, c, g, f, k, m) {
		return this.mask ? (f = f || b, null == k && (k = a), null == m && (m = d), f.save(), f.globalCompositeOperation = "destination-in", f.drawImage(this.mask, k, m), f.restore(), !0) : !0
	};
	a.clone = function() {
		return new c(this.mask)
	};
	a.toString = function() {
		return "[AlphaMaskFilter]"
	};
	createjs.AlphaMaskFilter = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, a, d, c, g, f, k, m) {
			this.initialize(b, a, d, c, g, f, k, m)
		},
		a = c.prototype = new createjs.Filter;
	a.redMultiplier = 1;
	a.greenMultiplier = 1;
	a.blueMultiplier = 1;
	a.alphaMultiplier = 1;
	a.redOffset = 0;
	a.greenOffset = 0;
	a.blueOffset = 0;
	a.alphaOffset = 0;
	a.initialize = function(b, a, d, c, g, f, k, m) {
		this.redMultiplier = null != b ? b : 1;
		this.greenMultiplier = null != a ? a : 1;
		this.blueMultiplier = null != d ? d : 1;
		this.alphaMultiplier = null != c ? c : 1;
		this.redOffset = g || 0;
		this.greenOffset = f || 0;
		this.blueOffset = k || 0;
		this.alphaOffset = m ||
			0
	};
	a.applyFilter = function(b, a, d, c, g, f, k, m) {
		f = f || b;
		null == k && (k = a);
		null == m && (m = d);
		try {
			var n = b.getImageData(a, d, c, g)
		} catch(p) {
			return !1
		}
		b = n.data;
		a = b.length;
		for(d = 0; a > d; d += 4) b[d] = b[d] * this.redMultiplier + this.redOffset, b[d + 1] = b[d + 1] * this.greenMultiplier + this.greenOffset, b[d + 2] = b[d + 2] * this.blueMultiplier + this.blueOffset, b[d + 3] = b[d + 3] * this.alphaMultiplier + this.alphaOffset;
		return f.putImageData(n, k, m), !0
	};
	a.toString = function() {
		return "[ColorFilter]"
	};
	a.clone = function() {
		return new c(this.redMultiplier, this.greenMultiplier,
			this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset)
	};
	createjs.ColorFilter = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, a, d, c) {
			this.initialize(b, a, d, c)
		},
		a = c.prototype = [];
	c.DELTA_INDEX = [0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.2, 0.21, 0.22, 0.24, 0.25, 0.27, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.8, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3,
		7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10
	];
	c.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
	c.LENGTH = c.IDENTITY_MATRIX.length;
	a.initialize = function(b, a, d, c) {
		return this.reset(), this.adjustColor(b, a, d, c), this
	};
	a.reset = function() {
		return this.copyMatrix(c.IDENTITY_MATRIX)
	};
	a.adjustColor = function(b, a, d, c) {
		return this.adjustHue(c), this.adjustContrast(a), this.adjustBrightness(b), this.adjustSaturation(d)
	};
	a.adjustBrightness = function(b) {
		return 0 == b || isNaN(b) ? this : (b = this._cleanValue(b, 255),
			this._multiplyMatrix([1, 0, 0, 0, b, 0, 1, 0, 0, b, 0, 0, 1, 0, b, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this)
	};
	a.adjustContrast = function(b) {
		if(0 == b || isNaN(b)) return this;
		b = this._cleanValue(b, 100);
		var a;
		return 0 > b ? a = 127 + 127 * (b / 100) : (a = b % 1, a = 0 == a ? c.DELTA_INDEX[b] : c.DELTA_INDEX[b << 0] * (1 - a) + c.DELTA_INDEX[(b << 0) + 1] * a, a = 127 * a + 127), this._multiplyMatrix([a / 127, 0, 0, 0, 0.5 * (127 - a), 0, a / 127, 0, 0, 0.5 * (127 - a), 0, 0, a / 127, 0, 0.5 * (127 - a), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this
	};
	a.adjustSaturation = function(b) {
		if(0 == b || isNaN(b)) return this;
		b = this._cleanValue(b,
			100);
		b = 1 + (0 < b ? 3 * b / 100 : b / 100);
		return this._multiplyMatrix([0.3086 * (1 - b) + b, 0.6094 * (1 - b), 0.082 * (1 - b), 0, 0, 0.3086 * (1 - b), 0.6094 * (1 - b) + b, 0.082 * (1 - b), 0, 0, 0.3086 * (1 - b), 0.6094 * (1 - b), 0.082 * (1 - b) + b, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this
	};
	a.adjustHue = function(b) {
		if(0 == b || isNaN(b)) return this;
		b = this._cleanValue(b, 180) / 180 * Math.PI;
		var a = Math.cos(b);
		b = Math.sin(b);
		return this._multiplyMatrix([0.213 + 0.787 * a + -0.213 * b, 0.715 + -0.715 * a + -0.715 * b, 0.072 + -0.072 * a + 0.928 * b, 0, 0, 0.213 + -0.213 * a + 0.143 * b, 0.715 + a * (1 - 0.715) + 0.14 * b, 0.072 + -0.072 *
			a + -0.283 * b, 0, 0, 0.213 + -0.213 * a + -0.787 * b, 0.715 + -0.715 * a + 0.715 * b, 0.072 + 0.928 * a + 0.072 * b, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1
		]), this
	};
	a.concat = function(b) {
		return b = this._fixMatrix(b), b.length != c.LENGTH ? this : (this._multiplyMatrix(b), this)
	};
	a.clone = function() {
		return new c(this)
	};
	a.toArray = function() {
		return this.slice(0, c.LENGTH)
	};
	a.copyMatrix = function(b) {
		for(var a = c.LENGTH, d = 0; a > d; d++) this[d] = b[d];
		return this
	};
	a._multiplyMatrix = function(b) {
		for(var a = [], d = 0; 5 > d; d++) {
			for(var c = 0; 5 > c; c++) a[c] = this[c + 5 * d];
			for(c = 0; 5 > c; c++) {
				for(var g =
						0, f = 0; 5 > f; f++) g += b[c + 5 * f] * a[f];
				this[c + 5 * d] = g
			}
		}
	};
	a._cleanValue = function(b, a) {
		return Math.min(a, Math.max(-a, b))
	};
	a._fixMatrix = function(b) {
		return b instanceof c && (b = b.slice(0)), b.length < c.LENGTH ? b = b.slice(0, b.length).concat(c.IDENTITY_MATRIX.slice(b.length, c.LENGTH)) : b.length > c.LENGTH && (b = b.slice(0, c.LENGTH)), b
	};
	createjs.ColorMatrix = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b) {
			this.initialize(b)
		},
		a = c.prototype = new createjs.Filter;
	a.matrix = null;
	a.initialize = function(b) {
		this.matrix = b
	};
	a.applyFilter = function(b, a, d, c, g, f, k, m) {
		f = f || b;
		null == k && (k = a);
		null == m && (m = d);
		try {
			var n = b.getImageData(a, d, c, g)
		} catch(p) {
			return !1
		}
		var q, s, r, t;
		b = n.data;
		a = b.length;
		q = this.matrix;
		d = q[0];
		c = q[1];
		g = q[2];
		for(var v = q[3], u = q[4], x = q[5], A = q[6], B = q[7], z = q[8], C = q[9], I = q[10], J = q[11], K = q[12], w = q[13], G = q[14], L = q[15], H = q[16], F = q[17], E = q[18], M = q[19], y = 0; a > y; y += 4) q = b[y], s = b[y + 1], r =
			b[y + 2], t = b[y + 3], b[y] = q * d + s * c + r * g + t * v + u, b[y + 1] = q * x + s * A + r * B + t * z + C, b[y + 2] = q * I + s * J + r * K + t * w + G, b[y + 3] = q * L + s * H + r * F + t * E + M;
		return f.putImageData(n, k, m), !0
	};
	a.toString = function() {
		return "[ColorMatrixFilter]"
	};
	a.clone = function() {
		return new c(this.matrix)
	};
	createjs.ColorMatrixFilter = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
		throw "Touch cannot be instantiated";
	};
	c.isSupported = function() {
		return "ontouchstart" in window || window.navigator.msPointerEnabled && 0 < window.navigator.msMaxTouchPoints
	};
	c.enable = function(a, b, h) {
		return a && a.canvas && c.isSupported() ? (a.__touch = {
			pointers: {},
			multitouch: !b,
			preventDefault: !h,
			count: 0
		}, "ontouchstart" in window ? c._IOS_enable(a) : window.navigator.msPointerEnabled && c._IE_enable(a), !0) : !1
	};
	c.disable = function(a) {
		a && ("ontouchstart" in window ? c._IOS_disable(a) : window.navigator.msPointerEnabled &&
			c._IE_disable(a))
	};
	c._IOS_enable = function(a) {
		var b = a.canvas,
			h = a.__touch.f = function(b) {
				c._IOS_handleEvent(a, b)
			};
		b.addEventListener("touchstart", h, !1);
		b.addEventListener("touchmove", h, !1);
		b.addEventListener("touchend", h, !1);
		b.addEventListener("touchcancel", h, !1)
	};
	c._IOS_disable = function(a) {
		var b = a.canvas;
		b && (a = a.__touch.f, b.removeEventListener("touchstart", a, !1), b.removeEventListener("touchmove", a, !1), b.removeEventListener("touchend", a, !1), b.removeEventListener("touchcancel", a, !1))
	};
	c._IOS_handleEvent =
		function(a, b) {
			if(a) {
				a.__touch.preventDefault && b.preventDefault && b.preventDefault();
				for(var c = b.changedTouches, d = b.type, e = 0, g = c.length; g > e; e++) {
					var f = c[e],
						k = f.identifier;
					f.target == a.canvas && ("touchstart" == d ? this._handleStart(a, k, b, f.pageX, f.pageY) : "touchmove" == d ? this._handleMove(a, k, b, f.pageX, f.pageY) : ("touchend" == d || "touchcancel" == d) && this._handleEnd(a, k, b))
				}
			}
		};
	c._IE_enable = function(a) {
		var b = a.canvas,
			h = a.__touch.f = function(b) {
				c._IE_handleEvent(a, b)
			};
		b.addEventListener("MSPointerDown", h, !1);
		window.addEventListener("MSPointerMove",
			h, !1);
		window.addEventListener("MSPointerUp", h, !1);
		window.addEventListener("MSPointerCancel", h, !1);
		a.__touch.preventDefault && (b.style.msTouchAction = "none");
		a.__touch.activeIDs = {}
	};
	c._IE_disable = function(a) {
		var b = a.__touch.f;
		window.removeEventListener("MSPointerMove", b, !1);
		window.removeEventListener("MSPointerUp", b, !1);
		window.removeEventListener("MSPointerCancel", b, !1);
		a.canvas && a.canvas.removeEventListener("MSPointerDown", b, !1)
	};
	c._IE_handleEvent = function(a, b) {
		if(a) {
			a.__touch.preventDefault && b.preventDefault &&
				b.preventDefault();
			var c = b.type,
				d = b.pointerId,
				e = a.__touch.activeIDs;
			"MSPointerDown" == c ? b.srcElement == a.canvas && (e[d] = !0, this._handleStart(a, d, b, b.pageX, b.pageY)) : e[d] && ("MSPointerMove" == c ? this._handleMove(a, d, b, b.pageX, b.pageY) : ("MSPointerUp" == c || "MSPointerCancel" == c) && (delete e[d], this._handleEnd(a, d, b)))
		}
	};
	c._handleStart = function(a, b, c, d, e) {
		var g = a.__touch;
		if(g.multitouch || !g.count) {
			var f = g.pointers;
			f[b] || (f[b] = !0, g.count++, a._handlePointerDown(b, c, d, e))
		}
	};
	c._handleMove = function(a, b, c, d, e) {
		a.__touch.pointers[b] &&
			a._handlePointerMove(b, c, d, e)
	};
	c._handleEnd = function(a, b, c) {
		var d = a.__touch,
			e = d.pointers;
		e[b] && (d.count--, a._handlePointerUp(b, c, !0), delete e[b])
	};
	createjs.Touch = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = createjs.EaselJS = createjs.EaselJS || {};
	c.version = "0.7.0";
	c.buildDate = "Tue, 01 Oct 2013 16:02:38 GMT"
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, a, c) {
			this.initialize(b, a, c)
		},
		a = c.prototype;
	a.type = null;
	a.target = null;
	a.currentTarget = null;
	a.eventPhase = 0;
	a.bubbles = !1;
	a.cancelable = !1;
	a.timeStamp = 0;
	a.defaultPrevented = !1;
	a.propagationStopped = !1;
	a.immediatePropagationStopped = !1;
	a.removed = !1;
	a.initialize = function(b, a, c) {
		this.type = b;
		this.bubbles = a;
		this.cancelable = c;
		this.timeStamp = (new Date).getTime()
	};
	a.preventDefault = function() {
		this.defaultPrevented = !0
	};
	a.stopPropagation = function() {
		this.propagationStopped = !0
	};
	a.stopImmediatePropagation =
		function() {
			this.immediatePropagationStopped = this.propagationStopped = !0
		};
	a.remove = function() {
		this.removed = !0
	};
	a.clone = function() {
		return new c(this.type, this.bubbles, this.cancelable)
	};
	a.toString = function() {
		return "[Event (type\x3d" + this.type + ")]"
	};
	createjs.Event = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
			this.initialize()
		},
		a = c.prototype;
	c.initialize = function(b) {
		b.addEventListener = a.addEventListener;
		b.on = a.on;
		b.removeEventListener = b.off = a.removeEventListener;
		b.removeAllEventListeners = a.removeAllEventListeners;
		b.hasEventListener = a.hasEventListener;
		b.dispatchEvent = a.dispatchEvent;
		b._dispatchEvent = a._dispatchEvent
	};
	a._listeners = null;
	a._captureListeners = null;
	a.initialize = function() {};
	a.addEventListener = function(b, a, c) {
		var e;
		e = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
		var g = e[b];
		return g && this.removeEventListener(b, a, c), g = e[b], g ? g.push(a) : e[b] = [a], a
	};
	a.on = function(b, a, c, e, g, f) {
		return a.handleEvent && (c = c || a, a = a.handleEvent), c = c || this, this.addEventListener(b, function(b) {
			a.call(c, b, g);
			e && b.remove()
		}, f)
	};
	a.removeEventListener = function(b, a, c) {
		if(c = c ? this._captureListeners : this._listeners) {
			var e = c[b];
			if(e)
				for(var g = 0, f = e.length; f > g; g++)
					if(e[g] == a) {
						1 == f ? delete c[b] : e.splice(g, 1);
						break
					}
		}
	};
	a.off = a.removeEventListener;
	a.removeAllEventListeners =
		function(b) {
			b ? (this._listeners && delete this._listeners[b], this._captureListeners && delete this._captureListeners[b]) : this._listeners = this._captureListeners = null
		};
	a.dispatchEvent = function(b, a) {
		if("string" == typeof b) {
			var c = this._listeners;
			if(!c || !c[b]) return !1;
			b = new createjs.Event(b)
		}
		if(b.target = a || this, b.bubbles && this.parent) {
			for(var e = this, c = [e]; e.parent;) c.push(e = e.parent);
			for(var g = c.length, e = g - 1; 0 <= e && !b.propagationStopped; e--) c[e]._dispatchEvent(b, 1 + (0 == e));
			for(e = 1; g > e && !b.propagationStopped; e++) c[e]._dispatchEvent(b,
				3)
		} else this._dispatchEvent(b, 2);
		return b.defaultPrevented
	};
	a.hasEventListener = function(b) {
		var a = this._listeners,
			c = this._captureListeners;
		return !!(a && a[b] || c && c[b])
	};
	a.toString = function() {
		return "[EventDispatcher]"
	};
	a._dispatchEvent = function(b, a) {
		var c, e = 1 == a ? this._captureListeners : this._listeners;
		if(b && e && (e = e[b.type]) && (c = e.length)) {
			b.currentTarget = this;
			b.eventPhase = a;
			b.removed = !1;
			for(var e = e.slice(), g = 0; c > g && !b.immediatePropagationStopped; g++) {
				var f = e[g];
				f.handleEvent ? f.handleEvent(b) : f(b);
				b.removed &&
					(this.off(b.type, f, 1 == a), b.removed = !1)
			}
		}
	};
	createjs.EventDispatcher = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, a, c) {
			this.initialize(b, a, c)
		},
		a = c.prototype = new createjs.EventDispatcher;
	c.NONE = 0;
	c.LOOP = 1;
	c.REVERSE = 2;
	c.IGNORE = {};
	c._tweens = [];
	c._plugins = {};
	c.get = function(b, a, d, e) {
		return e && c.removeTweens(b), new c(b, a, d)
	};
	c.tick = function(b, a) {
		for(var d = c._tweens.slice(), e = d.length - 1; 0 <= e; e--) {
			var g = d[e];
			a && !g.ignoreGlobalPause || g._paused || g.tick(g._useTicks ? 1 : b)
		}
	};
	c.handleEvent = function(b) {
		"tick" == b.type && this.tick(b.delta, b.paused)
	};
	c.removeTweens = function(b) {
		if(b.tweenjs_count) {
			for(var a =
					c._tweens, d = a.length - 1; 0 <= d; d--) a[d]._target == b && (a[d]._paused = !0, a.splice(d, 1));
			b.tweenjs_count = 0
		}
	};
	c.removeAllTweens = function() {
		for(var b = c._tweens, a = 0, d = b.length; d > a; a++) {
			var e = b[a];
			e.paused = !0;
			e.target.tweenjs_count = 0
		}
		b.length = 0
	};
	c.hasActiveTweens = function(b) {
		return b ? b.tweenjs_count : c._tweens && !!c._tweens.length
	};
	c.installPlugin = function(b, a) {
		var d = b.priority;
		null == d && (b.priority = d = 0);
		for(var e = 0, g = a.length, f = c._plugins; g > e; e++) {
			var k = a[e];
			if(f[k]) {
				for(var m = f[k], n = 0, p = m.length; p > n && !(d < m[n].priority); n++);
				f[k].splice(n, 0, b)
			} else f[k] = [b]
		}
	};
	c._register = function(b, a) {
		var d = b._target,
			e = c._tweens;
		if(a) d && (d.tweenjs_count = d.tweenjs_count ? d.tweenjs_count + 1 : 1), e.push(b), !c._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", c), c._inited = !0);
		else {
			d && d.tweenjs_count--;
			for(d = e.length; d--;)
				if(e[d] == b) return e.splice(d, 1), void 0
		}
	};
	a.ignoreGlobalPause = !1;
	a.loop = !1;
	a.duration = 0;
	a.pluginData = null;
	a.target = null;
	a.position = null;
	a.passive = !1;
	a._paused = !1;
	a._curQueueProps = null;
	a._initQueueProps = null;
	a._steps =
		null;
	a._actions = null;
	a._prevPosition = 0;
	a._stepPosition = 0;
	a._prevPos = -1;
	a._target = null;
	a._useTicks = !1;
	a._inited = !1;
	a.initialize = function(b, a, d) {
		this.target = this._target = b;
		a && (this._useTicks = a.useTicks, this.ignoreGlobalPause = a.ignoreGlobalPause, this.loop = a.loop, a.onChange && this.addEventListener("change", a.onChange), a.override && c.removeTweens(b));
		this.pluginData = d || {};
		this._curQueueProps = {};
		this._initQueueProps = {};
		this._steps = [];
		this._actions = [];
		a && a.paused ? this._paused = !0 : c._register(this, !0);
		a && null !=
			a.position && this.setPosition(a.position, c.NONE)
	};
	a.wait = function(b, a) {
		if(null == b || 0 >= b) return this;
		var c = this._cloneProps(this._curQueueProps);
		return this._addStep({
			d: b,
			p0: c,
			e: this._linearEase,
			p1: c,
			v: a
		})
	};
	a.to = function(b, a, c) {
		return(isNaN(a) || 0 > a) && (a = 0), this._addStep({
			d: a || 0,
			p0: this._cloneProps(this._curQueueProps),
			e: c,
			p1: this._cloneProps(this._appendQueueProps(b))
		})
	};
	a.call = function(b, a, c) {
		return this._addAction({
			f: b,
			p: a ? a : [this],
			o: c ? c : this._target
		})
	};
	a.set = function(b, a) {
		return this._addAction({
			f: this._set,
			o: this,
			p: [b, a ? a : this._target]
		})
	};
	a.play = function(b) {
		return b || (b = this), this.call(b.setPaused, [!1], b)
	};
	a.pause = function(b) {
		return b || (b = this), this.call(b.setPaused, [!0], b)
	};
	a.setPosition = function(b, a) {
		0 > b && (b = 0);
		null == a && (a = 1);
		var c = b,
			e = !1;
		if(c >= this.duration && (this.loop ? c %= this.duration : (c = this.duration, e = !0)), c == this._prevPos) return e;
		var g = this._prevPos;
		if(this.position = this._prevPos = c, this._prevPosition = b, this._target)
			if(e) this._updateTargetProps(null, 1);
			else if(0 < this._steps.length) {
			for(var f =
					0, k = this._steps.length; k > f && !(this._steps[f].t > c); f++);
			f = this._steps[f - 1];
			this._updateTargetProps(f, (this._stepPosition = c - f.t) / f.d)
		}
		return 0 != a && 0 < this._actions.length && (this._useTicks ? this._runActions(c, c) : 1 == a && g > c ? (g != this.duration && this._runActions(g, this.duration), this._runActions(0, c, !0)) : this._runActions(g, c)), e && this.setPaused(!0), this.dispatchEvent("change"), e
	};
	a.tick = function(b) {
		this._paused || this.setPosition(this._prevPosition + b)
	};
	a.setPaused = function(b) {
		return this._paused = !!b, c._register(this, !b), this
	};
	a.w = a.wait;
	a.t = a.to;
	a.c = a.call;
	a.s = a.set;
	a.toString = function() {
		return "[Tween]"
	};
	a.clone = function() {
		throw "Tween can not be cloned.";
	};
	a._updateTargetProps = function(b, a) {
		var d, e, g, f;
		if(b || 1 != a) {
			if(this.passive = !!b.v, this.passive) return;
			b.e && (a = b.e(a, 0, 1, 1));
			d = b.p0;
			e = b.p1
		} else this.passive = !1, d = e = this._curQueueProps;
		for(var k in this._initQueueProps) {
			null == (g = d[k]) && (d[k] = g = this._initQueueProps[k]);
			null == (f = e[k]) && (e[k] = f = g);
			g = g == f || 0 == a || 1 == a || "number" != typeof g ? 1 == a ? f : g : g + (f - g) * a;
			var m = !1;
			if(f = c._plugins[k])
				for(var n = 0, p = f.length; p > n; n++) {
					var q = f[n].tween(this, k, g, d, e, a, !!b && d == e, !b);
					q == c.IGNORE ? m = !0 : g = q
				}
			m || (this._target[k] = g)
		}
	};
	a._runActions = function(b, a, c) {
		var e = b,
			g = a,
			f = -1,
			k = this._actions.length,
			m = 1;
		for(b > a && (e = a, g = b, f = k, k = m = -1);
			(f += m) != k;) {
			a = this._actions[f];
			var n = a.t;
			(n == g || n > e && g > n || c && n == b) && a.f.apply(a.o, a.p)
		}
	};
	a._appendQueueProps = function(b) {
		var a, d, e, g, f, k;
		for(k in b)
			if(void 0 === this._initQueueProps[k]) {
				if(d = this._target[k], a = c._plugins[k]) {
					e = 0;
					for(g = a.length; g > e; e++) d = a[e].init(this,
						k, d)
				}
				this._initQueueProps[k] = this._curQueueProps[k] = void 0 === d ? null : d
			}
		for(k in b) {
			if(d = this._curQueueProps[k], a = c._plugins[k]) {
				f = f || {};
				e = 0;
				for(g = a.length; g > e; e++) a[e].step && a[e].step(this, k, d, b[k], f)
			}
			this._curQueueProps[k] = b[k]
		}
		return f && this._appendQueueProps(f), this._curQueueProps
	};
	a._cloneProps = function(b) {
		var a = {},
			c;
		for(c in b) a[c] = b[c];
		return a
	};
	a._addStep = function(b) {
		return 0 < b.d && (this._steps.push(b), b.t = this.duration, this.duration += b.d), this
	};
	a._addAction = function(b) {
		return b.t = this.duration,
			this._actions.push(b), this
	};
	a._set = function(b, a) {
		for(var c in b) a[c] = b[c]
	};
	createjs.Tween = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(b, a, c) {
			this.initialize(b, a, c)
		},
		a = c.prototype = new createjs.EventDispatcher;
	a.ignoreGlobalPause = !1;
	a.duration = 0;
	a.loop = !1;
	a.position = null;
	a._paused = !1;
	a._tweens = null;
	a._labels = null;
	a._labelList = null;
	a._prevPosition = 0;
	a._prevPos = -1;
	a._useTicks = !1;
	a.initialize = function(b, a, c) {
		this._tweens = [];
		c && (this._useTicks = c.useTicks, this.loop = c.loop, this.ignoreGlobalPause = c.ignoreGlobalPause, c.onChange && this.addEventListener("change", c.onChange));
		b && this.addTween.apply(this, b);
		this.setLabels(a);
		c && c.paused ? this._paused = !0 : createjs.Tween._register(this, !0);
		c && null != c.position && this.setPosition(c.position, createjs.Tween.NONE)
	};
	a.addTween = function(b) {
		var a = arguments.length;
		if(1 < a) {
			for(var c = 0; a > c; c++) this.addTween(arguments[c]);
			return arguments[0]
		}
		return 0 == a ? null : (this.removeTween(b), this._tweens.push(b), b.setPaused(!0), b._paused = !1, b._useTicks = this._useTicks, b.duration > this.duration && (this.duration = b.duration), 0 <= this._prevPos && b.setPosition(this._prevPos, createjs.Tween.NONE), b)
	};
	a.removeTween =
		function(b) {
			var a = arguments.length;
			if(1 < a) {
				for(var c = !0, e = 0; a > e; e++) c = c && this.removeTween(arguments[e]);
				return c
			}
			if(0 == a) return !1;
			a = this._tweens;
			for(e = a.length; e--;)
				if(a[e] == b) return a.splice(e, 1), b.duration >= this.duration && this.updateDuration(), !0;
			return !1
		};
	a.addLabel = function(b, a) {
		this._labels[b] = a;
		var c = this._labelList;
		if(c) {
			for(var e = 0, g = c.length; g > e && !(a < c[e].position); e++);
			c.splice(e, 0, {
				label: b,
				position: a
			})
		}
	};
	a.setLabels = function(b) {
		this._labels = b ? b : {}
	};
	a.getLabels = function() {
		var b = this._labelList;
		if(!b) {
			var b = this._labelList = [],
				a = this._labels,
				c;
			for(c in a) b.push({
				label: c,
				position: a[c]
			});
			b.sort(function(b, a) {
				return b.position - a.position
			})
		}
		return b
	};
	a.getCurrentLabel = function() {
		var b = this.getLabels(),
			a = this.position,
			c = b.length;
		if(c) {
			for(var e = 0; c > e && !(a < b[e].position); e++);
			return 0 == e ? null : b[e - 1].label
		}
		return null
	};
	a.gotoAndPlay = function(b) {
		this.setPaused(!1);
		this._goto(b)
	};
	a.gotoAndStop = function(b) {
		this.setPaused(!0);
		this._goto(b)
	};
	a.setPosition = function(b, a) {
		0 > b && (b = 0);
		var c = this.loop ? b % this.duration :
			b,
			e = !this.loop && b >= this.duration;
		if(c == this._prevPos) return e;
		this._prevPosition = b;
		this.position = this._prevPos = c;
		for(var g = 0, f = this._tweens.length; f > g; g++)
			if(this._tweens[g].setPosition(c, a), c != this._prevPos) return !1;
		return e && this.setPaused(!0), this.dispatchEvent("change"), e
	};
	a.setPaused = function(b) {
		this._paused = !!b;
		createjs.Tween._register(this, !b)
	};
	a.updateDuration = function() {
		for(var b = this.duration = 0, a = this._tweens.length; a > b; b++) {
			var c = this._tweens[b];
			c.duration > this.duration && (this.duration =
				c.duration)
		}
	};
	a.tick = function(a) {
		this.setPosition(this._prevPosition + a)
	};
	a.resolve = function(a) {
		var c = parseFloat(a);
		return isNaN(c) && (c = this._labels[a]), c
	};
	a.toString = function() {
		return "[Timeline]"
	};
	a.clone = function() {
		throw "Timeline can not be cloned.";
	};
	a._goto = function(a) {
		a = this.resolve(a);
		null != a && this.setPosition(a)
	};
	createjs.Timeline = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
		throw "Ease cannot be instantiated.";
	};
	c.linear = function(a) {
		return a
	};
	c.none = c.linear;
	c.get = function(a) {
		return -1 > a && (a = -1), 1 < a && (a = 1),
			function(b) {
				return 0 == a ? b : 0 > a ? b * (b * -a + 1 + a) : b * ((2 - b) * a + (1 - a))
			}
	};
	c.getPowIn = function(a) {
		return function(b) {
			return Math.pow(b, a)
		}
	};
	c.getPowOut = function(a) {
		return function(b) {
			return 1 - Math.pow(1 - b, a)
		}
	};
	c.getPowInOut = function(a) {
		return function(b) {
			return 1 > (b *= 2) ? 0.5 * Math.pow(b, a) : 1 - 0.5 * Math.abs(Math.pow(2 - b, a))
		}
	};
	c.quadIn = c.getPowIn(2);
	c.quadOut =
		c.getPowOut(2);
	c.quadInOut = c.getPowInOut(2);
	c.cubicIn = c.getPowIn(3);
	c.cubicOut = c.getPowOut(3);
	c.cubicInOut = c.getPowInOut(3);
	c.quartIn = c.getPowIn(4);
	c.quartOut = c.getPowOut(4);
	c.quartInOut = c.getPowInOut(4);
	c.quintIn = c.getPowIn(5);
	c.quintOut = c.getPowOut(5);
	c.quintInOut = c.getPowInOut(5);
	c.sineIn = function(a) {
		return 1 - Math.cos(a * Math.PI / 2)
	};
	c.sineOut = function(a) {
		return Math.sin(a * Math.PI / 2)
	};
	c.sineInOut = function(a) {
		return -0.5 * (Math.cos(Math.PI * a) - 1)
	};
	c.getBackIn = function(a) {
		return function(b) {
			return b *
				b * ((a + 1) * b - a)
		}
	};
	c.backIn = c.getBackIn(1.7);
	c.getBackOut = function(a) {
		return function(b) {
			return --b * b * ((a + 1) * b + a) + 1
		}
	};
	c.backOut = c.getBackOut(1.7);
	c.getBackInOut = function(a) {
		return a *= 1.525,
			function(b) {
				return 1 > (b *= 2) ? 0.5 * b * b * ((a + 1) * b - a) : 0.5 * ((b -= 2) * b * ((a + 1) * b + a) + 2)
			}
	};
	c.backInOut = c.getBackInOut(1.7);
	c.circIn = function(a) {
		return -(Math.sqrt(1 - a * a) - 1)
	};
	c.circOut = function(a) {
		return Math.sqrt(1 - --a * a)
	};
	c.circInOut = function(a) {
		return 1 > (a *= 2) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
	};
	c.bounceIn =
		function(a) {
			return 1 - c.bounceOut(1 - a)
		};
	c.bounceOut = function(a) {
		return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
	};
	c.bounceInOut = function(a) {
		return 0.5 > a ? 0.5 * c.bounceIn(2 * a) : 0.5 * c.bounceOut(2 * a - 1) + 0.5
	};
	c.getElasticIn = function(a, b) {
		var c = 2 * Math.PI;
		return function(d) {
			if(0 == d || 1 == d) return d;
			var e = b / c * Math.asin(1 / a);
			return -(a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * c / b))
		}
	};
	c.elasticIn = c.getElasticIn(1, 0.3);
	c.getElasticOut =
		function(a, b) {
			var c = 2 * Math.PI;
			return function(d) {
				if(0 == d || 1 == d) return d;
				var e = b / c * Math.asin(1 / a);
				return a * Math.pow(2, -10 * d) * Math.sin((d - e) * c / b) + 1
			}
		};
	c.elasticOut = c.getElasticOut(1, 0.3);
	c.getElasticInOut = function(a, b) {
		var c = 2 * Math.PI;
		return function(d) {
			var e = b / c * Math.asin(1 / a);
			return 1 > (d *= 2) ? -0.5 * a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * c / b) : 0.5 * a * Math.pow(2, -10 * (d -= 1)) * Math.sin((d - e) * c / b) + 1
		}
	};
	c.elasticInOut = c.getElasticInOut(1, 0.3 * 1.5);
	createjs.Ease = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
		throw "MotionGuidePlugin cannot be instantiated.";
	};
	c.priority = 0;
	c._rotOffS;
	c._rotOffE;
	c._rotNormS;
	c._rotNormE;
	c.install = function() {
		return createjs.Tween.installPlugin(c, ["guide", "x", "y", "rotation"]), createjs.Tween.IGNORE
	};
	c.init = function(a, b, c) {
		var d = a.target;
		return d.hasOwnProperty("x") || (d.x = 0), d.hasOwnProperty("y") || (d.y = 0), d.hasOwnProperty("rotation") || (d.rotation = 0), "rotation" == b && (a.__needsRot = !0), "guide" == b ? null : c
	};
	c.step = function(a, b, h, d, e) {
		if("rotation" == b && (a.__rotGlobalS =
				h, a.__rotGlobalE = d, c.testRotData(a, e)), "guide" != b) return d;
		var g;
		d.hasOwnProperty("path") || (d.path = []);
		b = d.path;
		if(d.hasOwnProperty("end") || (d.end = 1), d.hasOwnProperty("start") || (d.start = h && h.hasOwnProperty("end") && h.path === b ? h.end : 0), d.hasOwnProperty("_segments") && d._length) return d;
		h = b.length;
		if(!(6 <= h && 0 == (h - 2) % 4)) throw "invalid 'path' data, please see documentation for valid paths";
		d._segments = [];
		d._length = 0;
		for(var f = 2; h > f; f += 4) {
			for(var k, m, n = b[f - 2], p = b[f - 1], q = b[f + 0], s = b[f + 1], r = b[f + 2], t = b[f + 3],
					v = n, u = p, x = 0, A = [], B = 1; 10 >= B; B++) {
				m = B / 10;
				var z = 1 - m;
				k = z * z * n + 2 * z * m * q + m * m * r;
				m = z * z * p + 2 * z * m * s + m * m * t;
				x += A[A.push(Math.sqrt((g = k - v) * g + (g = m - u) * g)) - 1];
				v = k;
				u = m
			}
			d._segments.push(x);
			d._segments.push(A);
			d._length += x
		}
		g = d.orient;
		d.orient = !0;
		b = {};
		return c.calc(d, d.start, b), a.__rotPathS = Number(b.rotation.toFixed(5)), c.calc(d, d.end, b), a.__rotPathE = Number(b.rotation.toFixed(5)), d.orient = !1, c.calc(d, d.end, e), d.orient = g, d.orient ? (a.__guideData = d, c.testRotData(a, e), d) : d
	};
	c.testRotData = function(a, b) {
		if(void 0 === a.__rotGlobalS ||
			void 0 === a.__rotGlobalE) {
			if(a.__needsRot) return;
			a.__rotGlobalS = a.__rotGlobalE = void 0 !== a._curQueueProps.rotation ? a._curQueueProps.rotation : b.rotation = a.target.rotation || 0
		}
		if(void 0 !== a.__guideData) {
			var c = a.__guideData,
				d = a.__rotGlobalE - a.__rotGlobalS,
				e = a.__rotPathE - a.__rotPathS,
				g = d - e;
			if("auto" == c.orient) 180 < g ? g -= 360 : -180 > g && (g += 360);
			else if("cw" == c.orient) {
				for(; 0 > g;) g += 360;
				0 == g && 0 < d && 180 != d && (g += 360)
			} else if("ccw" == c.orient) {
				for(g = d - (180 < e ? 360 - e : e); 0 < g;) g -= 360;
				0 == g && 0 > d && -180 != d && (g -= 360)
			}
			c.rotDelta =
				g;
			c.rotOffS = a.__rotGlobalS - a.__rotPathS;
			a.__rotGlobalS = a.__rotGlobalE = a.__guideData = a.__needsRot = void 0
		}
	};
	c.tween = function(a, b, h, d, e, g, f) {
		e = e.guide;
		if(void 0 == e || e === d.guide) return h;
		if(e.lastRatio != g) {
			switch(c.calc(e, (e.end - e.start) * (f ? e.end : g) + e.start, a.target), e.orient) {
				case "cw":
				case "ccw":
				case "auto":
					a.target.rotation += e.rotOffS + e.rotDelta * g;
					break;
				default:
					a.target.rotation += e.rotOffS
			}
			e.lastRatio = g
		}
		return "rotation" != b || e.orient && "false" != e.orient ? a.target[b] : h
	};
	c.calc = function(a, b, h) {
		void 0 ==
			a._segments && c.validate(a);
		void 0 == h && (h = {
			x: 0,
			y: 0,
			rotation: 0
		});
		var d = a._segments,
			e = a.path,
			g = a._length * b,
			f = d.length - 2;
		for(b = 0; g > d[b] && f > b;) g -= d[b], b += 2;
		for(var d = d[b + 1], k = 0, f = d.length - 1; g > d[k] && f > k;) g -= d[k], k++;
		g = k / ++f + g / (f * d[k]);
		b = 2 * b + 2;
		f = 1 - g;
		return h.x = f * f * e[b - 2] + 2 * f * g * e[b + 0] + g * g * e[b + 2], h.y = f * f * e[b - 1] + 2 * f * g * e[b + 1] + g * g * e[b + 3], a.orient && (h.rotation = 57.2957795 * Math.atan2((e[b + 1] - e[b - 1]) * f + (e[b + 3] - e[b + 1]) * g, (e[b + 0] - e[b - 2]) * f + (e[b + 2] - e[b + 0]) * g)), h
	};
	createjs.MotionGuidePlugin = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = createjs.TweenJS = createjs.TweenJS || {};
	c.version = "0.5.0";
	c.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(a, b, c, g) {
			this.initialize(a, b, c, g)
		},
		a = c.prototype = new createjs.Container;
	c.INDEPENDENT = "independent";
	c.SINGLE_FRAME = "single";
	c.SYNCHED = "synched";
	a.mode;
	a.startPosition = 0;
	a.loop = !0;
	a.currentFrame = 0;
	a.timeline = null;
	a.paused = !1;
	a.actionsEnabled = !0;
	a.autoReset = !0;
	a.frameBounds = null;
	a._synchOffset = 0;
	a._prevPos = -1;
	a._prevPosition = 0;
	a._managed;
	a.Container_initialize = a.initialize;
	a.initialize = function(a, b, e, g) {
		this.mode = a || c.INDEPENDENT;
		this.startPosition = b || 0;
		this.loop = e;
		a = {
			paused: !0,
			position: b,
			useTicks: !0
		};
		this.Container_initialize();
		this.timeline = new createjs.Timeline(null, g, a);
		this._managed = {}
	};
	a.isVisible = function() {
		return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY))
	};
	a.Container_draw = a.draw;
	a.draw = function(a, b) {
		return this.DisplayObject_draw(a, b) ? !0 : (this._updateTimeline(), this.Container_draw(a, b), !0)
	};
	a.play = function() {
		this.paused = !1
	};
	a.stop = function() {
		this.paused = !0
	};
	a.gotoAndPlay = function(a) {
		this.paused = !1;
		this._goto(a)
	};
	a.gotoAndStop = function(a) {
		this.paused = !0;
		this._goto(a)
	};
	a.getLabels = function() {
		return this.timeline.getLabels()
	};
	a.getCurrentLabel = function() {
		return this._updateTimeline(), this.timeline.getCurrentLabel()
	};
	a.clone = function() {
		throw "MovieClip cannot be cloned.";
	};
	a.toString = function() {
		return "[MovieClip (name\x3d" + this.name + ")]"
	};
	a.Container__tick = a._tick;
	a._tick = function(a) {
		this.paused || this.mode != c.INDEPENDENT || (this._prevPosition = 0 > this._prevPos ? 0 : this._prevPosition + 1, this._updateTimeline());
		this.Container__tick(a)
	};
	a._goto = function(a) {
		a =
			this.timeline.resolve(a);
		null != a && (-1 == this._prevPos && (this._prevPos = 0 / 0), this._prevPosition = a, this._updateTimeline())
	};
	a._reset = function() {
		this._prevPos = -1;
		this.currentFrame = 0
	};
	a._updateTimeline = function() {
		var a = this.timeline,
			b = this.mode != c.INDEPENDENT;
		if(a.loop = null == this.loop ? !0 : this.loop, b ? a.setPosition(this.startPosition + (this.mode == c.SINGLE_FRAME ? 0 : this._synchOffset), createjs.Tween.NONE) : a.setPosition(0 > this._prevPos ? 0 : this._prevPosition, this.actionsEnabled ? null : createjs.Tween.NONE), this._prevPosition =
			a._prevPosition, this._prevPos != a._prevPos) {
			this.currentFrame = this._prevPos = a._prevPos;
			for(var e in this._managed) this._managed[e] = 1;
			b = a._tweens;
			a = 0;
			for(e = b.length; e > a; a++) {
				var g = b[a],
					f = g._target;
				f != this && !g.passive && (g = g._stepPosition, f instanceof createjs.DisplayObject ? this._addManagedChild(f, g) : this._setState(f.state, g))
			}
			b = this.children;
			for(a = b.length - 1; 0 <= a; a--) e = b[a].id, 1 == this._managed[e] && (this.removeChildAt(a), delete this._managed[e])
		}
	};
	a._setState = function(a, b) {
		if(a)
			for(var c = a.length - 1; 0 <=
				c; c--) {
				var g = a[c],
					f = g.t,
					g = g.p,
					k;
				for(k in g) f[k] = g[k];
				this._addManagedChild(f, b)
			}
	};
	a._addManagedChild = function(a, b) {
		a._off || (this.addChildAt(a, 0), a instanceof c && (a._synchOffset = b, a.mode == c.INDEPENDENT && a.autoReset && !this._managed[a.id] && a._reset()), this._managed[a.id] = 2)
	};
	a.Container__getBounds = a._getBounds;
	a._getBounds = function(a, b) {
		var c = this.DisplayObject_getBounds();
		return c || (this._updateTimeline(), this.frameBounds && (c = this._rectangle.copy(this.frameBounds[this.currentFrame]))), c ? this._transformBounds(c,
			a, b) : this.Container__getBounds(a, b)
	};
	createjs.MovieClip = c;
	var b = function() {
		throw "MovieClipPlugin cannot be instantiated.";
	};
	b.priority = 100;
	b.install = function() {
		createjs.Tween.installPlugin(b, ["startPosition"])
	};
	b.init = function(a, b, c) {
		return c
	};
	b.step = function() {};
	b.tween = function(a, b, e, g, f, k) {
		return a.target instanceof c ? 1 == k ? f[b] : g[b] : e
	};
	b.install()
})();
this.createjs = this.createjs || {};
(function() {
	var c = createjs.PreloadJS = createjs.PreloadJS || {};
	c.version = "0.4.0";
	c.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(a, c, d) {
			this.initialize(a, c, d)
		},
		a = c.prototype;
	a.type = null;
	a.target = null;
	a.currentTarget = null;
	a.eventPhase = 0;
	a.bubbles = !1;
	a.cancelable = !1;
	a.timeStamp = 0;
	a.defaultPrevented = !1;
	a.propagationStopped = !1;
	a.immediatePropagationStopped = !1;
	a.removed = !1;
	a.initialize = function(a, c, d) {
		this.type = a;
		this.bubbles = c;
		this.cancelable = d;
		this.timeStamp = (new Date).getTime()
	};
	a.preventDefault = function() {
		this.defaultPrevented = !0
	};
	a.stopPropagation = function() {
		this.propagationStopped = !0
	};
	a.stopImmediatePropagation =
		function() {
			this.immediatePropagationStopped = this.propagationStopped = !0
		};
	a.remove = function() {
		this.removed = !0
	};
	a.clone = function() {
		return new c(this.type, this.bubbles, this.cancelable)
	};
	a.toString = function() {
		return "[Event (type\x3d" + this.type + ")]"
	};
	createjs.Event = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {},
		a = c.prototype;
	c.initialize = function(b) {
		b.addEventListener = a.addEventListener;
		b.on = a.on;
		b.removeEventListener = b.off = a.removeEventListener;
		b.removeAllEventListeners = a.removeAllEventListeners;
		b.hasEventListener = a.hasEventListener;
		b.dispatchEvent = a.dispatchEvent;
		b._dispatchEvent = a._dispatchEvent
	};
	a._listeners = null;
	a._captureListeners = null;
	a.initialize = function() {};
	a.addEventListener = function(a, c, d) {
		var e;
		e = d ? this._captureListeners = this._captureListeners || {} : this._listeners =
			this._listeners || {};
		var g = e[a];
		return g && this.removeEventListener(a, c, d), g = e[a], g ? g.push(c) : e[a] = [c], c
	};
	a.on = function(a, c, d, e, g, f) {
		return c.handleEvent && (d = d || c, c = c.handleEvent), d = d || this, this.addEventListener(a, function(a) {
			c.call(d, a, g);
			e && a.remove()
		}, f)
	};
	a.removeEventListener = function(a, c, d) {
		if(d = d ? this._captureListeners : this._listeners) {
			var e = d[a];
			if(e)
				for(var g = 0, f = e.length; f > g; g++)
					if(e[g] == c) {
						1 == f ? delete d[a] : e.splice(g, 1);
						break
					}
		}
	};
	a.off = a.removeEventListener;
	a.removeAllEventListeners = function(a) {
		a ?
			(this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
	};
	a.dispatchEvent = function(a, c) {
		if("string" == typeof a) {
			var d = this._listeners;
			if(!d || !d[a]) return !1;
			a = new createjs.Event(a)
		}
		if(a.target = c || this, a.bubbles && this.parent) {
			for(var e = this, d = [e]; e.parent;) d.push(e = e.parent);
			for(var g = d.length, e = g - 1; 0 <= e && !a.propagationStopped; e--) d[e]._dispatchEvent(a, 1 + (0 == e));
			for(e = 1; g > e && !a.propagationStopped; e++) d[e]._dispatchEvent(a,
				3)
		} else this._dispatchEvent(a, 2);
		return a.defaultPrevented
	};
	a.hasEventListener = function(a) {
		var c = this._listeners,
			d = this._captureListeners;
		return !!(c && c[a] || d && d[a])
	};
	a.toString = function() {
		return "[EventDispatcher]"
	};
	a._dispatchEvent = function(a, c) {
		var d, e = 1 == c ? this._captureListeners : this._listeners;
		if(a && e && (e = e[a.type]) && (d = e.length)) {
			a.currentTarget = this;
			a.eventPhase = c;
			a.removed = !1;
			for(var e = e.slice(), g = 0; d > g && !a.immediatePropagationStopped; g++) {
				var f = e[g];
				f.handleEvent ? f.handleEvent(a) : f(a);
				a.removed &&
					(this.off(a.type, f, 1 == c), a.removed = !1)
			}
		}
	};
	createjs.EventDispatcher = c
})();
this.createjs = this.createjs || {};
(function() {
	createjs.indexOf = function(c, a) {
		for(var b = 0, h = c.length; h > b; b++)
			if(a === c[b]) return b;
		return -1
	}
})();
this.createjs = this.createjs || {};
(function() {
	createjs.proxy = function(c, a) {
		var b = Array.prototype.slice.call(arguments, 2);
		return function() {
			return c.apply(a, Array.prototype.slice.call(arguments, 0).concat(b))
		}
	}
})();
this.createjs = this.createjs || {};
(function() {
	var c = function() {
		this.init()
	};
	c.prototype = {};
	var a = c.prototype;
	c.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;
	a.loaded = !1;
	a.canceled = !1;
	a.progress = 0;
	a._item = null;
	a._basePath = null;
	a.addEventListener = null;
	a.removeEventListener = null;
	a.removeAllEventListeners = null;
	a.dispatchEvent = null;
	a.hasEventListener = null;
	a._listeners = null;
	createjs.EventDispatcher.initialize(a);
	a.getItem = function() {
		return this._item
	};
	a.init = function() {};
	a.load =
		function() {};
	a.close = function() {};
	a._sendLoadStart = function() {
		this._isCanceled() || this.dispatchEvent("loadstart")
	};
	a._sendProgress = function(a) {
		if(!this._isCanceled()) {
			var c = null;
			"number" == typeof a ? (this.progress = a, c = new createjs.Event("progress"), c.loaded = this.progress, c.total = 1) : (c = a, this.progress = a.loaded / a.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0));
			c.progress = this.progress;
			this.hasEventListener("progress") && this.dispatchEvent(c)
		}
	};
	a._sendComplete = function() {
		this._isCanceled() ||
			this.dispatchEvent("complete")
	};
	a._sendError = function(a) {
		!this._isCanceled() && this.hasEventListener("error") && (null == a && (a = new createjs.Event("error")), this.dispatchEvent(a))
	};
	a._isCanceled = function() {
		return null == window.createjs || this.canceled ? !0 : !1
	};
	a._parseURI = function(a) {
		return a ? a.match(c.FILE_PATTERN) : null
	};
	a._formatQueryString = function(a, c) {
		if(null == a) throw Error("You must specify data.");
		var d = [],
			e;
		for(e in a) d.push(e + "\x3d" + escape(a[e]));
		return c && (d = d.concat(c)), d.join("\x26")
	};
	a.buildPath =
		function(a, c, d) {
			if(null != c) {
				var e = this._parseURI(a);
				(null == e || null == e[1] || "" == e[1]) && (a = c + a)
			}
			if(null == d) return a;
			c = [];
			e = a.indexOf("?");
			if(-1 != e) {
				var g = a.slice(e + 1);
				c = c.concat(g.split("\x26"))
			}
			return -1 != e ? a.slice(0, e) + "?" + this._formatQueryString(d, c) : a + "?" + this._formatQueryString(d, c)
		};
	a.toString = function() {
		return "[PreloadJS AbstractLoader]"
	};
	createjs.AbstractLoader = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(a, b) {
			this.init(a, b)
		},
		a = c.prototype = new createjs.AbstractLoader;
	c.LOAD_TIMEOUT = 8E3;
	c.BINARY = "binary";
	c.CSS = "css";
	c.IMAGE = "image";
	c.JAVASCRIPT = "javascript";
	c.JSON = "json";
	c.JSONP = "jsonp";
	c.SOUND = "sound";
	c.SVG = "svg";
	c.TEXT = "text";
	c.XML = "xml";
	c.POST = "POST";
	c.GET = "GET";
	a.useXHR = !0;
	a.stopOnError = !1;
	a.maintainScriptOrder = !0;
	a.next = null;
	a._typeCallbacks = null;
	a._extensionCallbacks = null;
	a._loadStartWasDispatched = !1;
	a._maxConnections = 1;
	a._currentlyLoadingScript = null;
	a._currentLoads =
		null;
	a._loadQueue = null;
	a._loadQueueBackup = null;
	a._loadItemsById = null;
	a._loadItemsBySrc = null;
	a._loadedResults = null;
	a._loadedRawResults = null;
	a._numItems = 0;
	a._numItemsLoaded = 0;
	a._scriptOrder = null;
	a._loadedScripts = null;
	a.init = function(a, b) {
		this._numItems = this._numItemsLoaded = 0;
		this._loadStartWasDispatched = this._paused = !1;
		this._currentLoads = [];
		this._loadQueue = [];
		this._loadQueueBackup = [];
		this._scriptOrder = [];
		this._loadedScripts = [];
		this._loadItemsById = {};
		this._loadItemsBySrc = {};
		this._loadedResults = {};
		this._loadedRawResults = {};
		this._typeCallbacks = {};
		this._extensionCallbacks = {};
		this._basePath = b;
		this.setUseXHR(a)
	};
	a.setUseXHR = function(a) {
		return this.useXHR = 0 != a && null != window.XMLHttpRequest, this.useXHR
	};
	a.removeAll = function() {
		this.remove()
	};
	a.remove = function(a) {
		var b = null;
		if(!a || a instanceof Array)
			if(a) b = a;
			else {
				if(0 < arguments.length) return
			}
		else b = [a];
		var c = !1;
		if(b) {
			for(; b.length;) {
				for(var g = b.pop(), f = this.getResult(g), k = this._loadQueue.length - 1; 0 <= k; k--)
					if(m = this._loadQueue[k].getItem(), m.id == g || m.src == g) {
						this._loadQueue.splice(k,
							1)[0].cancel();
						break
					}
				for(k = this._loadQueueBackup.length - 1; 0 <= k; k--)
					if(m = this._loadQueueBackup[k].getItem(), m.id == g || m.src == g) {
						this._loadQueueBackup.splice(k, 1)[0].cancel();
						break
					}
				if(f) delete this._loadItemsById[f.id], delete this._loadItemsBySrc[f.src], this._disposeItem(f);
				else
					for(var k = this._currentLoads.length - 1; 0 <= k; k--) {
						var m = this._currentLoads[k].getItem();
						if(m.id == g || m.src == g) {
							this._currentLoads.splice(k, 1)[0].cancel();
							c = !0;
							break
						}
					}
			}
			c && this._loadNext()
		} else {
			this.close();
			for(g in this._loadItemsById) this._disposeItem(this._loadItemsById[g]);
			this.init(this.useXHR)
		}
	};
	a.reset = function() {
		this.close();
		for(var a in this._loadItemsById) this._disposeItem(this._loadItemsById[a]);
		a = [];
		i = 0;
		for(l = this._loadQueueBackup.length; l > i; i++) a.push(this._loadQueueBackup[i].getItem());
		this.loadManifest(a, !1)
	};
	c.isBinary = function(a) {
		switch(a) {
			case createjs.LoadQueue.IMAGE:
			case createjs.LoadQueue.BINARY:
				return !0;
			default:
				return !1
		}
	};
	a.installPlugin = function(a) {
		if(null != a && null != a.getPreloadHandlers) {
			a = a.getPreloadHandlers();
			if(null != a.types)
				for(var b = 0, c = a.types.length; c >
					b; b++) this._typeCallbacks[a.types[b]] = a.callback;
			if(null != a.extensions) {
				b = 0;
				for(c = a.extensions.length; c > b; b++) this._extensionCallbacks[a.extensions[b]] = a.callback
			}
		}
	};
	a.setMaxConnections = function(a) {
		this._maxConnections = a;
		!this._paused && 0 < this._loadQueue.length && this._loadNext()
	};
	a.loadFile = function(a, b, c) {
		if(null == a) return a = new createjs.Event("error"), a.text = "PRELOAD_NO_FILE", this._sendError(a), void 0;
		this._addItem(a, c);
		!1 !== b ? this.setPaused(!1) : this.setPaused(!0)
	};
	a.loadManifest = function(a, b, c) {
		var g =
			null;
		if(a instanceof Array) {
			if(0 == a.length) return b = new createjs.Event("error"), b.text = "PRELOAD_MANIFEST_EMPTY", this._sendError(b), void 0;
			g = a
		} else {
			if(null == a) return b = new createjs.Event("error"), b.text = "PRELOAD_MANIFEST_NULL", this._sendError(b), void 0;
			g = [a]
		}
		a = 0;
		for(var f = g.length; f > a; a++) this._addItem(g[a], c);
		!1 !== b ? this.setPaused(!1) : this.setPaused(!0)
	};
	a.load = function() {
		this.setPaused(!1)
	};
	a.getItem = function(a) {
		return this._loadItemsById[a] || this._loadItemsBySrc[a]
	};
	a.getResult = function(a, b) {
		var c =
			this._loadItemsById[a] || this._loadItemsBySrc[a];
		if(null == c) return null;
		c = c.id;
		return b && this._loadedRawResults[c] ? this._loadedRawResults[c] : this._loadedResults[c]
	};
	a.setPaused = function(a) {
		(this._paused = a) || this._loadNext()
	};
	a.close = function() {
		for(; this._currentLoads.length;) this._currentLoads.pop().cancel();
		this._scriptOrder.length = 0;
		this._loadedScripts.length = 0;
		this.loadStartWasDispatched = !1
	};
	a._addItem = function(a, b) {
		var c = this._createLoadItem(a);
		if(null != c) {
			var g = this._createLoader(c, b);
			null != g &&
				(this._loadQueue.push(g), this._loadQueueBackup.push(g), this._numItems++, this._updateProgress(), this.maintainScriptOrder && c.type == createjs.LoadQueue.JAVASCRIPT && g instanceof createjs.XHRLoader && (this._scriptOrder.push(c), this._loadedScripts.push(null)))
		}
	};
	a._createLoadItem = function(a) {
		var b = null;
		switch(typeof a) {
			case "string":
				b = {
					src: a
				};
				break;
			case "object":
				b = window.HTMLAudioElement && a instanceof HTMLAudioElement ? {
					tag: a,
					src: b.tag.src,
					type: createjs.LoadQueue.SOUND
				} : a;
				break;
			default:
				return null
		}
		a = this._parseURI(b.src);
		if(null != a && (b.ext = a[5]), null == b.type && (b.type = this._getTypeByExtension(b.ext)), b.type == createjs.LoadQueue.JSON && null != b.callback && (b.type = createjs.LoadQueue.JSONP), b.type == createjs.LoadQueue.JSONP && null == b.callback) throw Error("callback is required for loading JSONP requests.");
		null == b.tag && (b.tag = this._createTag(b.type));
		(null == b.id || "" == b.id) && (b.id = b.src);
		if(a = this._typeCallbacks[b.type] || this._extensionCallbacks[b.ext]) {
			a = a(b.src, b.type, b.id, b.data);
			if(!1 === a) return null;
			!0 === a || (null != a.src &&
				(b.src = a.src), null != a.id && (b.id = a.id), null != a.tag && a.tag.load instanceof Function && (b.tag = a.tag), null != a.completeHandler && (b.completeHandler = a.completeHandler));
			a.type && (b.type = a.type);
			a = this._parseURI(b.src);
			null != a && null != a[5] && (b.ext = a[5].toLowerCase())
		}
		return this._loadItemsById[b.id] = b, this._loadItemsBySrc[b.src] = b, b
	};
	a._createLoader = function(a, b) {
		var c = this.useXHR;
		switch(a.type) {
			case createjs.LoadQueue.JSON:
			case createjs.LoadQueue.XML:
			case createjs.LoadQueue.TEXT:
				c = !0;
				break;
			case createjs.LoadQueue.SOUND:
			case createjs.LoadQueue.JSONP:
				c = !1;
				break;
			case null:
				return null
		}
		return null == b && (b = this._basePath), c ? new createjs.XHRLoader(a, b) : new createjs.TagLoader(a, b)
	};
	a._loadNext = function() {
		if(!this._paused) {
			this._loadStartWasDispatched || (this._sendLoadStart(), this._loadStartWasDispatched = !0);
			this._numItems == this._numItemsLoaded ? (this.loaded = !0, this._sendComplete(), this.next && this.next.load && this.next.load()) : this.loaded = !1;
			for(var a = 0; a < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); a++) {
				var b = this._loadQueue[a];
				if(this.maintainScriptOrder && b instanceof createjs.TagLoader && b.getItem().type == createjs.LoadQueue.JAVASCRIPT) {
					if(this._currentlyLoadingScript) continue;
					this._currentlyLoadingScript = !0
				}
				this._loadQueue.splice(a, 1);
				a--;
				this._loadItem(b)
			}
		}
	};
	a._loadItem = function(a) {
		a.addEventListener("progress", createjs.proxy(this._handleProgress, this));
		a.addEventListener("complete", createjs.proxy(this._handleFileComplete, this));
		a.addEventListener("error", createjs.proxy(this._handleFileError, this));
		this._currentLoads.push(a);
		this._sendFileStart(a.getItem());
		a.load()
	};
	a._handleFileError = function(a) {
		var b = a.target;
		this._numItemsLoaded++;
		this._updateProgress();
		a = new createjs.Event("error");
		a.text = "FILE_LOAD_ERROR";
		a.item = b.getItem();
		this._sendError(a);
		this.stopOnError || (this._removeLoadItem(b), this._loadNext())
	};
	a._handleFileComplete = function(a) {
		a = a.target;
		var b = a.getItem();
		if(this._loadedResults[b.id] = a.getResult(), a instanceof createjs.XHRLoader && (this._loadedRawResults[b.id] = a.getResult(!0)), this._removeLoadItem(a), this.maintainScriptOrder &&
			b.type == createjs.LoadQueue.JAVASCRIPT) {
			if(!(a instanceof createjs.TagLoader)) return this._loadedScripts[createjs.indexOf(this._scriptOrder, b)] = b, this._checkScriptLoadOrder(a), void 0;
			this._currentlyLoadingScript = !1
		}
		this._processFinishedLoad(b, a)
	};
	a._processFinishedLoad = function(a, b) {
		this._numItemsLoaded++;
		this._updateProgress();
		this._sendFileComplete(a, b);
		this._loadNext()
	};
	a._checkScriptLoadOrder = function() {
		for(var a = this._loadedScripts.length, b = 0; a > b; b++) {
			var c = this._loadedScripts[b];
			if(null === c) break;
			!0 !== c && (this._processFinishedLoad(c), this._loadedScripts[b] = !0, b--, a--)
		}
	};
	a._removeLoadItem = function(a) {
		for(var b = this._currentLoads.length, c = 0; b > c; c++)
			if(this._currentLoads[c] == a) {
				this._currentLoads.splice(c, 1);
				break
			}
	};
	a._handleProgress = function(a) {
		a = a.target;
		this._sendFileProgress(a.getItem(), a.progress);
		this._updateProgress()
	};
	a._updateProgress = function() {
		var a = this._numItemsLoaded / this._numItems,
			b = this._numItems - this._numItemsLoaded;
		if(0 < b) {
			for(var c = 0, g = 0, f = this._currentLoads.length; f > g; g++) c +=
				this._currentLoads[g].progress;
			a += c / b * (b / this._numItems)
		}
		this._sendProgress(a)
	};
	a._disposeItem = function(a) {
		delete this._loadedResults[a.id];
		delete this._loadedRawResults[a.id];
		delete this._loadItemsById[a.id];
		delete this._loadItemsBySrc[a.src]
	};
	a._createTag = function(a) {
		var b = null;
		switch(a) {
			case createjs.LoadQueue.IMAGE:
				return document.createElement("img");
			case createjs.LoadQueue.SOUND:
				return b = document.createElement("audio"), b.autoplay = !1, b;
			case createjs.LoadQueue.JSONP:
			case createjs.LoadQueue.JAVASCRIPT:
				return b =
					document.createElement("script"), b.type = "text/javascript", b;
			case createjs.LoadQueue.CSS:
				return b = this.useXHR ? document.createElement("style") : document.createElement("link"), b.rel = "stylesheet", b.type = "text/css", b;
			case createjs.LoadQueue.SVG:
				return this.useXHR ? b = document.createElement("svg") : (b = document.createElement("object"), b.type = "image/svg+xml"), b
		}
		return null
	};
	a._getTypeByExtension = function(a) {
		if(null == a) return createjs.LoadQueue.TEXT;
		switch(a.toLowerCase()) {
			case "jpeg":
			case "jpg":
			case "gif":
			case "png":
			case "webp":
			case "bmp":
				return createjs.LoadQueue.IMAGE;
			case "ogg":
			case "mp3":
			case "wav":
				return createjs.LoadQueue.SOUND;
			case "json":
				return createjs.LoadQueue.JSON;
			case "xml":
				return createjs.LoadQueue.XML;
			case "css":
				return createjs.LoadQueue.CSS;
			case "js":
				return createjs.LoadQueue.JAVASCRIPT;
			case "svg":
				return createjs.LoadQueue.SVG;
			default:
				return createjs.LoadQueue.TEXT
		}
	};
	a._sendFileProgress = function(a, b) {
		if(this._isCanceled()) return this._cleanUp(), void 0;
		if(this.hasEventListener("fileprogress")) {
			var c = new createjs.Event("fileprogress");
			c.progress = b;
			c.loaded = b;
			c.total = 1;
			c.item = a;
			this.dispatchEvent(c)
		}
	};
	a._sendFileComplete = function(a, b) {
		if(!this._isCanceled()) {
			var c = new createjs.Event("fileload");
			c.loader = b;
			c.item = a;
			c.result = this._loadedResults[a.id];
			c.rawResult = this._loadedRawResults[a.id];
			a.completeHandler && a.completeHandler(c);
			this.hasEventListener("fileload") && this.dispatchEvent(c)
		}
	};
	a._sendFileStart = function(a) {
		var b = new createjs.Event("filestart");
		b.item = a;
		this.hasEventListener("filestart") && this.dispatchEvent(b)
	};
	a.toString = function() {
		return "[PreloadJS LoadQueue]"
	};
	createjs.LoadQueue = c;
	var b = function() {};
	b.init = function() {
		var a = navigator.userAgent;
		b.isFirefox = -1 < a.indexOf("Firefox");
		b.isOpera = null != window.opera;
		b.isChrome = -1 < a.indexOf("Chrome");
		b.isIOS = -1 < a.indexOf("iPod") || -1 < a.indexOf("iPhone") || -1 < a.indexOf("iPad")
	};
	b.init();
	createjs.LoadQueue.BrowserDetect = b
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(a, c) {
			this.init(a, c)
		},
		a = c.prototype = new createjs.AbstractLoader;
	a._loadTimeout = null;
	a._tagCompleteProxy = null;
	a._isAudio = !1;
	a._tag = null;
	a._jsonResult = null;
	a.init = function(a, c) {
		this._item = a;
		this._basePath = c;
		this._tag = a.tag;
		this._isAudio = window.HTMLAudioElement && a.tag instanceof HTMLAudioElement;
		this._tagCompleteProxy = createjs.proxy(this._handleLoad, this)
	};
	a.getResult = function() {
		return this._item.type == createjs.LoadQueue.JSONP ? this._jsonResult : this._tag
	};
	a.cancel = function() {
		this.canceled = !0;
		this._clean();
		this.getItem()
	};
	a.load = function() {
		var a = this._item,
			c = this._tag;
		clearTimeout(this._loadTimeout);
		this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT);
		this._isAudio && (c.src = null, c.preload = "auto");
		c.onerror = createjs.proxy(this._handleError, this);
		this._isAudio ? (c.onstalled = createjs.proxy(this._handleStalled, this), c.addEventListener("canplaythrough", this._tagCompleteProxy, !1)) : (c.onload = createjs.proxy(this._handleLoad, this), c.onreadystatechange =
			createjs.proxy(this._handleReadyStateChange, this));
		var d = this.buildPath(a.src, this._basePath, a.values);
		switch(a.type) {
			case createjs.LoadQueue.CSS:
				c.href = d;
				break;
			case createjs.LoadQueue.SVG:
				c.data = d;
				break;
			default:
				c.src = d
		}
		if(a.type == createjs.LoadQueue.JSONP) {
			if(null == a.callback) throw Error("callback is required for loading JSONP requests.");
			if(null != window[a.callback]) throw Error('JSONP callback "' + a.callback + '" already exists on window. You need to specify a different callback. Or re-name the current one.');
			window[a.callback] = createjs.proxy(this._handleJSONPLoad, this)
		}(a.type == createjs.LoadQueue.SVG || a.type == createjs.LoadQueue.JSONP || a.type == createjs.LoadQueue.JSON || a.type == createjs.LoadQueue.JAVASCRIPT || a.type == createjs.LoadQueue.CSS) && (this._startTagVisibility = c.style.visibility, c.style.visibility = "hidden", (document.body || document.getElementsByTagName("body")[0]).appendChild(c));
		null != c.load && c.load()
	};
	a._handleJSONPLoad = function(a) {
		this._jsonResult = a
	};
	a._handleTimeout = function() {
		this._clean();
		var a =
			new createjs.Event("error");
		a.text = "PRELOAD_TIMEOUT";
		this._sendError(a)
	};
	a._handleStalled = function() {};
	a._handleError = function() {
		this._clean();
		var a = new createjs.Event("error");
		this._sendError(a)
	};
	a._handleReadyStateChange = function() {
		clearTimeout(this._loadTimeout);
		var a = this.getItem().tag;
		("loaded" == a.readyState || "complete" == a.readyState) && this._handleLoad()
	};
	a._handleLoad = function() {
		if(!this._isCanceled()) {
			var a = this.getItem(),
				c = a.tag;
			if(!(this.loaded || this.isAudio && 4 !== c.readyState)) {
				switch(this.loaded = !0, a.type) {
					case createjs.LoadQueue.SVG:
					case createjs.LoadQueue.JSONP:
						c.style.visibility = this._startTagVisibility, (document.body || document.getElementsByTagName("body")[0]).removeChild(c)
				}
				this._clean();
				this._sendComplete()
			}
		}
	};
	a._clean = function() {
		clearTimeout(this._loadTimeout);
		var a = this.getItem().tag;
		a.onload = null;
		a.removeEventListener && a.removeEventListener("canplaythrough", this._tagCompleteProxy, !1);
		a.onstalled = null;
		a.onprogress = null;
		a.onerror = null;
		a.parentNode && a.parentNode.removeChild(a);
		a = this.getItem();
		a.type == createjs.LoadQueue.JSONP && (window[a.callback] = null)
	};
	a.toString = function() {
		return "[PreloadJS TagLoader]"
	};
	createjs.TagLoader = c
})();
this.createjs = this.createjs || {};
(function() {
	var c = function(a, c) {
			this.init(a, c)
		},
		a = c.prototype = new createjs.AbstractLoader;
	a._request = null;
	a._loadTimeout = null;
	a._xhrLevel = 1;
	a._response = null;
	a._rawResponse = null;
	a.init = function(a, c) {
		this._item = a;
		this._basePath = c;
		!this._createXHR(a)
	};
	a.getResult = function(a) {
		return a && this._rawResponse ? this._rawResponse : this._response
	};
	a.cancel = function() {
		this.canceled = !0;
		this._clean();
		this._request.abort()
	};
	a.load = function() {
		if(null == this._request) return this._handleError(), void 0;
		this._request.onloadstart =
			createjs.proxy(this._handleLoadStart, this);
		this._request.onprogress = createjs.proxy(this._handleProgress, this);
		this._request.onabort = createjs.proxy(this._handleAbort, this);
		this._request.onerror = createjs.proxy(this._handleError, this);
		this._request.ontimeout = createjs.proxy(this._handleTimeout, this);
		1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT));
		this._request.onload = createjs.proxy(this._handleLoad, this);
		this._request.onreadystatechange =
			createjs.proxy(this._handleReadyStateChange, this);
		try {
			this._item.values && this._item.method != createjs.LoadQueue.GET ? this._item.method == createjs.LoadQueue.POST && this._request.send(this._formatQueryString(this._item.values)) : this._request.send()
		} catch(a) {
			var c = new createjs.Event("error");
			c.error = a;
			this._sendError(c)
		}
	};
	a.getAllResponseHeaders = function() {
		return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
	};
	a.getResponseHeader = function(a) {
		return this._request.getResponseHeader instanceof
		Function ? this._request.getResponseHeader(a) : null
	};
	a._handleProgress = function(a) {
		if(a && !(0 < a.loaded && 0 == a.total)) {
			var c = new createjs.Event("progress");
			c.loaded = a.loaded;
			c.total = a.total;
			this._sendProgress(c)
		}
	};
	a._handleLoadStart = function() {
		clearTimeout(this._loadTimeout);
		this._sendLoadStart()
	};
	a._handleAbort = function(a) {
		this._clean();
		a = new createjs.Event("error");
		a.text = "XHR_ABORTED";
		this._sendError(a)
	};
	a._handleError = function() {
		this._clean();
		var a = new createjs.Event("error");
		this._sendError(a)
	};
	a._handleReadyStateChange =
		function() {
			4 == this._request.readyState && this._handleLoad()
		};
	a._handleLoad = function() {
		if(!this.loaded) {
			if(this.loaded = !0, !this._checkError()) return this._handleError(), void 0;
			this._response = this._getResponse();
			this._clean();
			this._generateTag() && this._sendComplete()
		}
	};
	a._handleTimeout = function(a) {
		this._clean();
		(new createjs.Event("error")).text = "PRELOAD_TIMEOUT";
		this._sendError(a)
	};
	a._checkError = function() {
		switch(parseInt(this._request.status)) {
			case 404:
			case 0:
				return !1
		}
		return !0
	};
	a._getResponse = function() {
		if(null !=
			this._response) return this._response;
		if(null != this._request.response) return this._request.response;
		try {
			if(null != this._request.responseText) return this._request.responseText
		} catch(a) {}
		try {
			if(null != this._request.responseXML) return this._request.responseXML
		} catch(c) {}
		return null
	};
	a._createXHR = function(a) {
		var c = document.createElement("a");
		c.href = this.buildPath(a.src, this._basePath);
		var d = document.createElement("a");
		d.href = location.href;
		c = "" != c.hostname && (c.port != d.port || c.protocol != d.protocol || c.hostname !=
			d.hostname);
		d = null;
		if(c && window.XDomainRequest) d = new XDomainRequest;
		else if(window.XMLHttpRequest) d = new XMLHttpRequest;
		else try {
			d = new ActiveXObject("Msxml2.XMLHTTP.6.0")
		} catch(e) {
			try {
				d = new ActiveXObject("Msxml2.XMLHTTP.3.0")
			} catch(g) {
				try {
					d = new ActiveXObject("Msxml2.XMLHTTP")
				} catch(f) {
					return !1
				}
			}
		}
		a.type == createjs.LoadQueue.TEXT && d.overrideMimeType && d.overrideMimeType("text/plain; charset\x3dx-user-defined");
		this._xhrLevel = "string" == typeof d.responseType ? 2 : 1;
		var k = null;
		return k = a.method == createjs.LoadQueue.GET ?
			this.buildPath(a.src, this._basePath, a.values) : this.buildPath(a.src, this._basePath), d.open(a.method || createjs.LoadQueue.GET, k, !0), c && d instanceof XMLHttpRequest && 1 == this._xhrLevel && d.setRequestHeader("Origin", location.origin), a.values && a.method == createjs.LoadQueue.POST && d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), createjs.LoadQueue.isBinary(a.type) && (d.responseType = "arraybuffer"), this._request = d, !0
	};
	a._clean = function() {
		clearTimeout(this._loadTimeout);
		var a = this._request;
		a.onloadstart = null;
		a.onprogress = null;
		a.onabort = null;
		a.onerror = null;
		a.onload = null;
		a.ontimeout = null;
		a.onloadend = null;
		a.onreadystatechange = null
	};
	a._generateTag = function() {
		var a = this._item.tag;
		switch(this._item.type) {
			case createjs.LoadQueue.IMAGE:
				return a.onload = createjs.proxy(this._handleTagReady, this), a.src = this.buildPath(this._item.src, this._basePath, this._item.values), this._rawResponse = this._response, this._response = a, !1;
			case createjs.LoadQueue.JAVASCRIPT:
				return a = document.createElement("script"),
					a.text = this._response, this._rawResponse = this._response, this._response = a, !0;
			case createjs.LoadQueue.CSS:
				if(document.getElementsByTagName("head")[0].appendChild(a), a.styleSheet) a.styleSheet.cssText = this._response;
				else {
					var c = document.createTextNode(this._response);
					a.appendChild(c)
				}
				return this._rawResponse = this._response, this._response = a, !0;
			case createjs.LoadQueue.XML:
				return c = this._parseXML(this._response, "text/xml"), this._response = c, !0;
			case createjs.LoadQueue.SVG:
				return c = this._parseXML(this._response,
					"image/svg+xml"), this._rawResponse = this._response, null != c.documentElement ? (a.appendChild(c.documentElement), this._response = a) : this._response = c, !0;
			case createjs.LoadQueue.JSON:
				a = {};
				try {
					a = JSON.parse(this._response)
				} catch(d) {
					a = d
				}
				return this._rawResponse = this._response, this._response = a, !0
		}
		return !0
	};
	a._parseXML = function(a, c) {
		var d = null;
		window.DOMParser ? d = (new DOMParser).parseFromString(a, c) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = !1, d.loadXML(a));
		return d
	};
	a._handleTagReady = function() {
		this._sendComplete()
	};
	a.toString = function() {
		return "[PreloadJS XHRLoader]"
	};
	createjs.XHRLoader = c
})();
"object" != typeof JSON && (JSON = {});
(function() {
	function c(a) {
		return 10 > a ? "0" + a : a
	}

	function a(a) {
		return d.lastIndex = 0, d.test(a) ? '"' + a.replace(d, function(a) {
			var b = f[a];
			return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + a + '"'
	}

	function b(c, d) {
		var f, h, s, r, t, v = e,
			u = d[c];
		switch(u && "object" == typeof u && "function" == typeof u.toJSON && (u = u.toJSON(c)), "function" == typeof k && (u = k.call(d, c, u)), typeof u) {
			case "string":
				return a(u);
			case "number":
				return isFinite(u) ? String(u) : "null";
			case "boolean":
			case "null":
				return String(u);
			case "object":
				if(!u) return "null";
				if(e += g, t = [], "[object Array]" === Object.prototype.toString.apply(u)) {
					r = u.length;
					for(f = 0; r > f; f += 1) t[f] = b(f, u) || "null";
					return s = 0 === t.length ? "[]" : e ? "[\n" + e + t.join(",\n" + e) + "\n" + v + "]" : "[" + t.join(",") + "]", e = v, s
				}
				if(k && "object" == typeof k) {
					r = k.length;
					for(f = 0; r > f; f += 1) "string" == typeof k[f] && (h = k[f], s = b(h, u), s && t.push(a(h) + (e ? ": " : ":") + s))
				} else
					for(h in u) Object.prototype.hasOwnProperty.call(u, h) && (s = b(h, u), s && t.push(a(h) + (e ? ": " : ":") + s));
				return s = 0 === t.length ? "{}" : e ? "{\n" +
					e + t.join(",\n" + e) + "\n" + v + "}" : "{" + t.join(",") + "}", e = v, s
		}
	}
	"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + c(this.getUTCMonth() + 1) + "-" + c(this.getUTCDate()) + "T" + c(this.getUTCHours()) + ":" + c(this.getUTCMinutes()) + ":" + c(this.getUTCSeconds()) + "Z" : null
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
		return this.valueOf()
	});
	var h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		d = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		e, g, f = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		},
		k;
	"function" != typeof JSON.stringify && (JSON.stringify = function(a, c, d) {
		var f;
		if(e = "", g = "", "number" == typeof d)
			for(f = 0; d > f; f += 1) g += " ";
		else "string" == typeof d && (g = d);
		if(k = c, c && "function" != typeof c && ("object" != typeof c || "number" != typeof c.length)) throw Error("JSON.stringify");
		return b("", {
			"": a
		})
	});
	"function" != typeof JSON.parse && (JSON.parse = function(a, b) {
		function c(a, d) {
			var e, f, g = a[d];
			if(g && "object" == typeof g)
				for(e in g) Object.prototype.hasOwnProperty.call(g, e) && (f = c(g, e), void 0 !== f ? g[e] = f : delete g[e]);
			return b.call(a, d, g)
		}
		var d;
		if(a = String(a), h.lastIndex = 0, h.test(a) && (a = a.replace(h, function(a) {
				return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
			})), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				"]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return d = eval("(" + a + ")"), "function" == typeof b ? c({
			"": d
		}, "") : d;
		throw new SyntaxError("JSON.parse");
	})
})(); /*  |xGv00|069d2ef1f31e490902e42c506126193e */