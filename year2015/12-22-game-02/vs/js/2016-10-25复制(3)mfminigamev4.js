(function(b, d, a) {
	var c;
	b.properties = {
		width: 550,
		height: 400,
		fps: 30,
		color: "#FFFFFF",
		manifest: [{
			src: "images/loading_1.jpg",
			id: "loading_1"
		}]
	};
	(b.loading = function() {
		this.initialize();
		this.instance = new b.loading_2;
		this.instance.setTransform(400, 504, 1, 1, 0, 0, 0, 400, 504);
		this.addChild(this.instance)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(275, 200, 800, 1008);
	(b.loading_1 = function() {
		this.initialize(d.loading_1)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0, 0, 800, 1008);
	(b.loading_2 =
		function() {
			this.initialize();
			this.text = new a.Text("50%", "50px 'Microsoft YaHei'", "#FFFFFF");
			this.text.textAlign = "center";
			this.text.lineHeight = 52;
			this.text.setTransform(396.7, 619);
			this.instance = new b.loading_1;
			this.addChild(this.instance, this.text)
		}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 800, 1008)
})(loadinglib = loadinglib || {}, loadingimages = loadingimages || {}, createjs = createjs || {});
var loadinglib, loadingimages, createjs;

function ShakeCls() {
	this.shakeee = null;
	var b = this;
	this.bool = !1;
	this.hitAndShake = function(b, a, c, g, f) {
		this.bool = !0;
		this.shakeee = b;
		null == this.shakeee.basex && (this.shakeee.basex = this.shakeee.x);
		null == this.shakeee.basey && (this.shakeee.basey = this.shakeee.y);
		this.shakeee.rangeX = null == a ? 20 : a;
		this.shakeee.rangeY = null == c ? 20 : c;
		this.shakeee.x = this.shakeee.basex - this.shakeee.rangeX / 2 + this.shakeee.rangeX * Math.random();
		this.shakeee.y = this.shakeee.basey - this.shakeee.rangeY + 2 * this.shakeee.rangeY * Math.random();
		this.shakeee.flashTime =
			6;
		this.shakeee.funcCall = null == f ? null : f;
		this.shakeee.shakeTimeCount = 0;
		this.shakeee.cframe = 0
	};
	this.update = function() {
		this.bool && (this.shakeee.cframe += 1, 2 > this.shakeee.cframe || (this.shakeee.cframe = 0, 5 == this.shakeee.shakeTimeCount ? b.cancelHitAndShake(this.shakeee) : (this.shakeee.shakeTimeCount++, this.shakeee.x += 1.7 * (this.shakeee.basex - this.shakeee.x), this.shakeee.y += 1.7 * (this.shakeee.basey - this.shakeee.y))))
	};
	this.cancelHitAndShake = function(b) {
		this.bool = !1;
		b || (b = this.shakeee);
		b.x = b.basex;
		b.y = b.basey
	}
}
var shake = new ShakeCls;
(function(b, d, a) {
	var c;
	b.properties = {
		width: 550,
		height: 400,
		fps: 24,
		color: "#FFFFFF",
		manifest: [{
			src: "images/apple_15.png",
			id: "apple_15"
		}, {
			src: "images/apple_16.png",
			id: "apple_16"
		}, {
			src: "images/apple_17.png",
			id: "apple_17"
		}, {
			src: "images/Bitmap1.png",
			id: "Bitmap1"
		}, {
			src: "images/index_20.png",
			id: "index_20"
		}, {
			src: "images/index_21.png",
			id: "index_21"
		}, {
			src: "images/index_22.png",
			id: "index_22"
		}, {
			src: "images/index_23.jpg",
			id: "index_23"
		}, {
			src: "images/index_24.jpg",
			id: "index_24"
		}, {
			src: "images/index_25.png",
			id: "index_25"
		}, {
			src: "images/index_26.jpg",
			id: "index_26"
		}, {
			src: "images/mc_46.png",
			id: "mc_46"
		}]
	};
	(b.index = function() {
		this.initialize()
	}).prototype = c = new a.Container;
	c.nominalBounds = null;
	(b.apple_15 = function() {
		this.initialize(d.apple_15)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0, 0, 93, 89);
	(b.apple_16 = function() {
		this.initialize(d.apple_16)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0, 0, 97, 84);
	(b.apple_17 = function() {
		this.initialize(d.apple_17)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds =
		new a.Rectangle(0, 0, 133, 103);
	(b.Bitmap1 = function() {
		this.initialize(d.Bitmap1)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0, 0, 190, 190);
	(b.index_20 = function() {
		this.initialize(d.index_20)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0, 0, 350, 129);
	(b.index_21 = function() {
		this.initialize(d.index_21)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0, 0, 244, 107);
	(b.index_22 = function() {
		this.initialize(d.index_22)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0,
		0, 93, 89);
	(b.index_23 = function() {
		this.initialize(d.index_23)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0, 0, 800, 1008);
	(b.index_24 = function() {
		this.initialize(d.index_24)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0, 0, 800, 1008);
	(b.index_25 = function() {
		this.initialize(d.index_25)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0, 0, 137, 45);
	(b.index_26 = function() {
		this.initialize(d.index_26)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0, 0, 800, 1008);
	(b.mc_46 = function() {
		this.initialize(d.mc_46)
	}).prototype = c = new a.Bitmap;
	c.nominalBounds = new a.Rectangle(0, 0, 358, 164);
	(b.ss = function() {
		this.initialize();
		this.instance = new b.Bitmap1;
		this.instance.setTransform(-95, -95);
		this.addChild(this.instance)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(-95, -95, 190, 190);
	(b.missmc = function() {
		this.initialize();
		this.instance = new b.index_25;
		this.instance.setTransform(-68.5, -22.5);
		this.addChild(this.instance)
	}).prototype = c = new a.Container;
	c.nominalBounds =
		new a.Rectangle(-68.5, -22.5, 137, 45);
	(b.mc_4 = function() {
		this.initialize();
		this.instance = new b.mc_46;
		this.instance.setTransform(-179, -82);
		this.addChild(this.instance)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(-179, -82, 358, 164);
	(b.index_12 = function(b, c, d) {
		this.initialize(b, c, d, {});
		this.frame_0 = function() {
			this.stop()
		};
		this.timeline.addTween(a.Tween.get(this).call(this.frame_0).wait(1));
		this.txt = new a.Text("100", "bold 60px 'Microsoft YaHei'", "#FFCC00");
		this.txt.name = "txt";
		this.txt.textAlign =
			"center";
		this.txt.lineHeight = 62;
		this.txt.setTransform(58.3, 0.6, 1, 1, 0, 10, 0);
		this.shape = new a.Shape;
		this.shape.graphics.f("#FFFFFF").s().p("ABmBWIAHgpQAUAUAdgBQAQAAAKgFQAJgGABgJQACgHgGgHQgFgHgagMQgpgQAGgjQAFgaAWgPQAXgOAhAAQAcAAARAHIgHAlQgQgMgaAAQgOAAgKAFQgKAFgCAJQgBAIAFAGQAFAGAWAKQAaAMAJALQAIANgEATQgEAbgWANQgWAPgjAAQghAAgTgKgAEKBZQgFgGABgJQACgIAHgGQAIgGAKAAQAKAAAFAGQAGAGgCAIQgBAJgIAGQgHAHgJAAQgMAAgFgHgAgJBcIAZiXIg0AAIAGggICTAAIgGAgIg2AAIgbCXgAiRBcIAFgeIAQAAIAWh7IgQAAIAGgeIBIAAIgFAeIgQAAIgWB7IAQAAIgGAegAjWBcIAOhMIhRAAIgNBMIgoAAIAhi3IAoAAIgOBKIBRAAIANhKIApAAIghC3gAETAjIATh+IApAAIgcB+g");
		this.shape.setTransform(140, 56.8);
		this.timeline.addTween(a.Tween.get({}).to({
			state: [{
				t: this.shape
			}, {
				t: this.txt
			}]
		}).wait(1))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(-11.7, 0.7, 185.3, 81.9);
	(b.index_9 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.f().s("#FFCC00").ss(8, 1, 1).p("AAAhKIAACV");
		this.shape.setTransform(0, 7.5);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(-4, -4, 8, 23);
	(b.index_5 = function(c, d, e) {
		this.initialize(c,
			d, e, {});
		this.instance = new b.index_20;
		this.timeline.addTween(a.Tween.get(this.instance).wait(2).to({
			y: 5
		}, 0).wait(2))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(0, 0, 350, 129);
	(b.index_4 = function() {
		this.initialize();
		this.instance = new b.index_22;
		this.instance.setTransform(-25, -24, 0.7, 0.7);
		this.addChild(this.instance)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(-25, -24, 65.1, 62.3);
	(b.index_18 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.f("#FFFFFF").s().p("AgFCQQgmgRghgfQhEg7AAhNQAAglAVgfQAXgjAngBQAiAAAbAiQAdgiAiAAQAmABAYAjQATAfABAlQAABNhDA7QgWAUgZAPQgMAHgMAGIgHABIgFgBgAhghSQgLAUAAAWQAAA1AtAuQAbAcAjATQAkgSAcgdQAtguAAg1QAAgWgLgUQgNgZgWAAQgRAAgRATIgNATQgEAJgMAAQgKAAgEgJQgFgKgJgJQgQgTgRAAQgWAAgNAZg");
		this.shape.setTransform(14.5, 14.5);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 29, 29);
	(b.index_16 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.f("#FFFFFF").s().p("AhlB1QgqgqAAg8QAAg5AqgrQArgqA6AAIAAAAIAAgfIBLAyIhLAyIAAgfIAAAAQgrAAgfAfQggAfAAAqQAAAsAgAgQAfAfArAAQAsAAAfgfQAggfAAgtQAAgIAFgFQAGgEAIAAQAIAAAFAEQAFAFAAAIQAAA8gqAqQgrAqg7AAQg6AAgrgqg");
		this.shape.setTransform(14.5, 16);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 29, 32);
	(b.补间4 = function() {
		this.initialize();
		this.instance = new b.apple_16;
		this.instance.setTransform(-48.5, -42);
		this.addChild(this.instance)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(-48.5, -42, 97, 84);
	(b.补间3 = function() {
		this.initialize();
		this.instance = new b.apple_16;
		this.instance.setTransform(-48.5, -42);
		this.addChild(this.instance)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(-48.5, -42, 97, 84);
	(b.元件2 =
		function() {
			this.initialize();
			this.instance = new b.index_23;
			this.instance.setTransform(-400, -504);
			this.addChild(this.instance)
		}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(-400, -504, 800, 1008);
	(b.元件1 = function(b, c, d) {
		this.initialize(b, c, d, {});
		this.shape = new a.Shape;
		this.shape.graphics.f().s("#FF9900").ss(2, 1, 1).p("ABZi1QgqgcgviyQgPg4gOhAIgLg1IgYDQQgfDVghAaQgwAohbgaQgcgIgcgNIgXgMIBPBGQBPBLgCAhQgCAghFBnQgjAzgiAtQAJgFAOgIQAcgQAbgKQBVghAkAeQApAiATCVQAKBLACBEQAQhRAahVQAzipAxgVQBMgfBmAqQAyAVAkAbQgugvgqhBQhWiCAOhWQAJg6AuhcIArhSIgVAZQgaAcgZAWQhRBEgrgcg");
		this.shape_1 = new a.Shape;
		this.shape_1.graphics.f("#FFFF00").s().p("AhHGiQgTiVgpgjQgkgdhUAhQgbAKgcAPIgYAOQAigtAjg0QBFhmADghQABgghPhLIhPhGIAXAMQAdANAbAJQBbAZAxgoQAggaAfjVIAYjPIALA1QAOA/APA4QAuCyArAcQArAcBRhEQAZgWAagcIAVgZIgrBSQguBcgJA7QgPBVBXCCQAqBAAuAwQgkgbgygVQhngqhMAfQgwAVgzCpQgaBVgQBQQgBhDgLhLg");
		this.shape_2 = new a.Shape;
		this.shape_2.graphics.f().s("#FF9900").ss(2, 1, 1).p("ABWjiQgHgngEgsIgDgkIg8B6QhCB8gnAIQg6AKhbgpQgcgOgcgQIgXgOIBJBCQBHBHgIAUQgIARhaAtQgtAWgsASQAKgBARgBQAggBAeABQBfAEAhAcQAmAhgFBjQgCAxgJAqQAegtAqgtQBRhbA3ABQBWACBlA2QAyAcAhAbQgpgqgig1QhFhpAegyQATggBAgtIA7gmIgaAJQggALgfAFQhgAVgpgfQgogdgVh8g");
		this.shape_3 = new a.Shape;
		this.shape_3.graphics.f("#FFFF00").s().p("Ah6D+QAFhigmghQghgdhfgEQgeAAggABIgbACQAsgSAtgWQBagtAIgRQAIgUhHhGIhJhDIAXAOQAcAQAcAOQBbAqA6gLQAngHBCh9IA8h6IADAkQAEAsAHAnQAVB8AoAeQApAeBggUQAfgGAggLIAagJIg7AmQhAAtgTAgQgeAyBFBpQAiA1ApAqQghgbgygcQhlg2hWgDQg3AAhRBaQgqAugeAtQAJgqACgyg");
		this.shape_4 = new a.Shape;
		this.shape_4.graphics.f().s("#FF9900").ss(2, 1, 1).p("AErjiQAvgvApgeQg8AhhFAXQiLAvgsgwQgegfgchTIgThNIABAgQAAAngDAjQgMBxgvAlQgtAjiQgMQgtgDgxgIIgogHIBwBlQBxBtgGAtQgIBDhNBaQgYAbgbAbIgXAUIBhg9QBlg6ATAOQATAOARBxQAJA4AFA2QADgMAEgSQAJglAMghQAihoArgcQAxggBqAhQA2AQArAWQgogugjg8QhHh2AVg7QAfheBfhgg");
		this.shape_5 = new a.Shape;
		this.shape_5.graphics.f("#FFFF00").s().p("AhJFKQgRhxgTgOQgTgOhlA6IhhA9IAXgUQAbgbAYgbQBNhaAIhDQAGgthxhtIhwhlIAoAHQAxAIAtADQCQAMAtgjQAvglAMhxQADgjAAgnIgBggIATBNQAcBTAeAfQAsAwCLgvQBFgXA8ghQgpAegvAvQhfBggfBeQgVA7BHB2QAjA8AoAuQgrgWg2gQQhqghgxAgQgrAcgiBoQgMAhgJAlIgHAeQgFg2gJg4g");
		this.timeline.addTween(a.Tween.get({}).to({
			state: [{
				t: this.shape_1
			}, {
				t: this.shape
			}]
		}).to({
			state: [{
				t: this.shape_3
			}, {
				t: this.shape_2
			}]
		}, 1).to({
			state: [{
				t: this.shape_5
			}, {
				t: this.shape_4
			}]
		}, 1).wait(1))
	}).prototype =
		c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(-35.7, -57.1, 71.5, 114.2);
	(b.apple_13 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.bf(d.apple_17, null, new a.Matrix2D(1, 0, 0, 1, -125.2, -68.1)).s().p("AhMCOIADh1IAKhZICMhaIAAE0g");
		this.shape.setTransform(7.8, 15.5);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 15.5, 31);
	(b.apple_12 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.bf(d.apple_17, null, new a.Matrix2D(1,
			0, 0, 1, -107.5, -91.7)).s().p("Ai/BwIAPhcIAthjIAxghIA1AoIDdAxIgFCHg");
		this.shape.setTransform(19.2, 11.3);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 38.4, 22.6);
	(b.apple_11 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.bf(d.apple_17, null, new a.Matrix2D(1, 0, 0, 1, -74.2, -85.3)).s().p("AinCwIALiHIBQiIIAQhGIAEAAIApgIIAAAAIAZgCIBQCMIAZAUIA0APIgaCwg");
		this.shape.setTransform(16.8, 17.7);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 33.6, 35.4);
	(b.apple_10 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.bf(d.apple_17, null, new a.Matrix2D(1, 0, 0, 1, -102.7, -56.8)).s().p("ADwFDIjfgwIgzgoIgxAhIgtBlIAMhUIg1gRIgZgUIhPiMIgbACIgBAAIAKgCQANgQARgbQAhg2AWgzQAWg1AGheIAChTIgPhQIgEgKIBHgXIBdAcIFNAwIAAELIiOBYIgKBaIgDB1ICbANIAABsIhAAIg");
		this.shape.setTransform(30.3, 38.4);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 60.5, 76.9);
	(b.apple_9 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.bf(d.apple_17, null, new a.Matrix2D(1, 0, 0, 1, -16, -12.6)).s().p("AifA0IAAixIB0AAIBrBDIBGB7IAaAfIgcAeg");
		this.shape.setTransform(16, 12.6);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 32.1, 25.3);
	(b.apple_8 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.bf(d.apple_17, null, new a.Matrix2D(1, 0, 0, 1, -25.6, -73.5)).s().p("AhIgHIAZhBIgBgLIAXALIBiAKIgIAXIgCArIg8AtIAFAMIg1AXg");
		this.shape.setTransform(7.4,
			8.4);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 14.8, 16.8);
	(b.apple_7 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.bf(d.apple_17, null, new a.Matrix2D(1, 0, 0, 1, -47, -81.8)).s().p("AhlDTIhsjzIA8guIADgtIAIgWIC8hBIAUAAIAjBBIAjAKIBGAFIgQBGIhQCIIgKCHg");
		this.shape.setTransform(21, 21.2);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 42.1, 42.4);
	(b.apple_6 = function() {
		this.initialize();
		this.shape =
			new a.Shape;
		this.shape.graphics.bf(d.apple_17, null, new a.Matrix2D(1, 0, 0, 1, -27.4, -11.1)).s().p("AAUBQIhEh7IhthDIE7AAIgDCHIheBGIgPAQg");
		this.shape.setTransform(15.9, 11.1);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 31.7, 22.3);
	(b.apple_5 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.bf(d.apple_17, null, new a.Matrix2D(1, 0, 0, 1, -57.1, -34.3)).s().p("AAmFSIgjgKIghhBIgUAAIgehfIiqjfIgKgeIgRgEIAqguIBfhGIADiJIGXAAIggCYIAZBBIAPBQIgCBRQgGBegWA1QgWA1ghA2QgRAbgNAQIgyAKg");
		this.shape.setTransform(27.9, 34.3);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 55.8, 68.7);
	(b.apple_4 = function() {
		this.initialize();
		this.shape = new a.Shape;
		this.shape.graphics.bf(d.apple_17, null, new a.Matrix2D(1, 0, 0, 1, -26, -42.5)).s().p("AgdDsIg3gZIhBhGIhui1IAAjNIE0BOIALAeICpDfIAfBfIi+BBg");
		this.shape.setTransform(26, 24.7);
		this.addChild(this.shape)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 52, 49.3);
	(b.apple_1 = function() {
		this.initialize();
		this.instance = new b.apple_15;
		this.instance.setTransform(-46.5, -44.5);
		this.addChild(this.instance)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(-46.5, -44.5, 93, 89);
	(b.MISS = function(c, d, e) {
		this.initialize(c, d, e, {});
		this.frame_10 = function() {
			this.stop()
		};
		this.timeline.addTween(a.Tween.get(this).wait(10).call(this.frame_10).wait(1));
		this.instance = new b.missmc;
		this.instance.setTransform(68.5, 22.5);
		this.timeline.addTween(a.Tween.get(this.instance).to({
			y: -39.5
		}, 9).wait(1).to({
				y: -66.5,
				alpha: 0
			},
			0).wait(1))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(0, 0, 137, 45);
	(b.SHAREUI = function(c, d, e) {
		this.initialize(c, d, e, {});
		this.frame_12 = function() {
			this.stop()
		};
		this.timeline.addTween(a.Tween.get(this).wait(12).call(this.frame_12).wait(1));
		this.instance = new b.mc_4("synched", 0);
		this.instance.setTransform(-8, -50);
		this.instance.alpha = 0;
		this.timeline.addTween(a.Tween.get(this.instance).to({
			y: 10,
			alpha: 1
		}, 6, a.Ease.get(1)).to({
			y: 0
		}, 6, a.Ease.get(0.5)).wait(1))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(-187, -132, 358, 222.4);
	(b.LIGHTMC = function(c, d, e) {
		this.initialize(c, d, e, {});
		this.frame_10 = function() {
			this.stop()
		};
		this.timeline.addTween(a.Tween.get(this).wait(10).call(this.frame_10).wait(1));
		this.bb = new b.元件1;
		this.bb.setTransform(34.8, 56.1);
		this.timeline.addTween(a.Tween.get(this.bb).to({
			alpha: 0
		}, 9).wait(2))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(-1, -1, 71.5, 114.2);
	(b.index_17 = function(c, d, e) {
		this.initialize(c, d, e, {});
		this.instance = new b.index_18;
		this.instance.setTransform(39.5, 48.5, 1, 1, 0, 0, 0, 14.5, 14.5);
		this.shape = new a.Shape;
		this.shape.graphics.f("#FFFFFF").s().p("AC/CRIAAkdIAWAAIAAA/IANgIQAPAUANAUIgTALQgJgTgNgRIAADXgAKsCQIAAgMIinAAIAAAMIgVAAIAAhGIDQAAIAABGgAIFBzICnAAIAAgYIinAAgAhTCPIAAiWQgWAXgZAXIgOgVQA4guAgg5IhQAAIAAgWIBbAAQAIgSAGgTIAZAFIgNAgICjAAIAAAWIiuAAQgJARgLAQICfAAIAACbQAAAkgkAAIgvAAIgEgYQAbACAQAAQAUAAAAgTIAAgVIiRAAIAABCgAg8A5ICRAAIAAgjIiRAAgAg8ACICRAAIAAghIiRAAgAjuBxQgKgOgIgRQggAYglASQgIgMgHgHQAqgUAigaQgMgngEg1IhMAAIAAAvIA8gLIABAXIg9AMIAABEQAAAiggAAIgogBQgBgNgEgMQAWADARAAQAOAAAAgOIAAg9Ig6AMIgGgaIBAgKIAAgzIg/AAIAAgWIA/AAIAAgsIgyAGQgCgLgFgMQBIgHA0gLIAHAYIgyAIIAAAvIBLAAIgFhWIAZAAIADBWIBrAAIAAAWIhqAAQAEArAIAhQAhgdAXghIAVAOQgeAognAgQAIAVAMANQAPASALAAQAGAAADgKQAEgPAEgjQAMAGALADQgGAhgFASQgHAXgWABQgZgBgWgdgAEfCOQgCgMgDgMQAOACAQAAQARAAAAgTIAAhGIgqAAIAAAIIgWAAIAAhgICZAAIAABgIgVAAIAAgIIguAAIAABKQAAAlgfAAIghAAgAEfAKIBuAAIAAguIhuAAgArnB/QATgZAUgjIAVAMQgWAogRAXgAoBBMIAUgLQAXAkAPAcIgXAMQgOgegVgjgAqPBKIAVgIQANAeAKAgIgXAJQgKgggLgfgApKBIIAWgIQAOAdALAgIgXAJQgIgbgQgjgADkB2QAZgaAagqIATALQgaArgZAcQgIgHgLgHgAF7A+IASgMQAcAkAVAgIgTAOQgYglgYghgAn9A6IAAgMIisAAIAAAMIgYAAIAAhuIBcAAIAAhcIAZAAIAAAkICCAAIAAAVIiCAAIAAAjIBnAAIAABugAqpAZICsAAIAAg4IisAAgAHKA5IAAgSIBaAAIgPgTIARgJQAMANAKAPIA7AAQALgOAJgPIAUALIgPASIBYAAIAAASgAKqATIAAgKIiiAAIAAAKIgVAAIAAg/IDLAAIAAA/gAIIgGICiAAIAAgUIiiAAgACcgGQAFgiACgiIATACQgDApgDAcIgUgDgAHkg8IAAgTIBqAAIAAgSIh9AAIAAgSIB9AAIAAgbIAVAAIAAAbIB+AAIAAASIh+AAIAAASIBqAAIAAATgAjuhzIAPgQQAaAUAbAYIgSASQgYgYgagWgAD2hWIAAgWIBTAAIgOgbIAVgJIASAkIBXAAIAAAWg");
		this.shape.setTransform(141.4, 46.2);
		this.shape_1 = new a.Shape;
		this.shape_1.graphics.f("#FFFFFF").s().p("AC1CKIAAkQIAVAAIAAA+IANgIQAOASAMATIgRALQgKgSgMgQIAADMgAKJCIIAAgKIieAAIAAAKIgUAAIAAhCIDGAAIAABCgAHrBtICeAAIAAgWIieAAgAhPCIIAAiOQgVAWgYAVIgNgVQA2gqAeg3IhNAAIAAgUIBXAAQAIgSAGgSIAXAFQgGAQgGAPICbAAIAAAUIilAAQgJARgLAPICXAAIAACTQAAAighAAIgtABIgFgYQAaACAQABQATAAAAgUIAAgTIiLAAIAAA/gAg6A2ICLAAIAAgiIiLAAgAg6ABICLAAIAAgeIiLAAgAjiBrQgKgMgHgRQgfAXgjAQQgHgLgHgGQAogTAggZQgMglgDgyIhJAAIAAAsIA5gLIABAXIg6AKIAABCQAAAggeAAQgSAAgTgBQgCgNgDgLQAUADAQABQAOAAAAgOIAAg6Ig3ALIgFgYIA8gKIAAgwIg8AAIAAgVIA8AAIAAgpIgwAFQgCgLgEgLQBEgGAygLIAGAWIgwAIIAAAtIBIAAIgEhSIAWAAIADBSIBnAAIAAAVIhlAAQADApAJAfQAegbAXggIATANQgcAmglAeQAIAVALAMQAOARALAAQAFgBACgIQAFgPADghQANAGAJACQgFAggFARQgGAXgVgBQgYABgVgdgAEQCHIgEgXQAOACAPAAQAQAAAAgRIAAhEIgpAAIAAAIIgUAAIAAhbICRAAIAABbIgUAAIAAgIIgsAAIAABHQABAigeABIgPAAIgRAAgAEQAJIBpAAIAAgrIhpAAgArCB5QATgYASgiIAUAMQgVAmgRAVgAnnBIIATgKQAWAhANAcIgVALQgOgdgTghgApuBGIAUgIQAMAdAJAfIgWAIQgJgegKgegAosBFIAUgIQAOAbAKAeIgWAJQgIgZgOghgADZBwQAYgZAXgnIATAKQgYApgYAbIgSgOgAFoA7IARgLQAaAhAVAfIgTANQgWgjgXgfgAnkA3IAAgMIijAAIAAAMIgXAAIAAhoIBYAAIAAhXIAXAAIAAAhIB8AAIAAAUIh8AAIAAAiIBjAAIAABogAqHAYICjAAIAAg1IijAAgAGzA2IAAgRIBWAAIgPgSIAQgJQAMANAJAOIA5AAIATgcIh9AAIAAAJIgUAAIAAg8IDBAAIAAA8IgTAAIAAgJIgdAAIATAKIgQASIBUAAIAAARgAHugGICaAAIAAgTIiaAAgACTgGQAGggABggIASACQgCAngDAbIgUgEgAHMg5IAAgRIBkAAIAAgSIh3AAIAAgRIB3AAIAAgaIAUAAIAAAaIB4AAIAAARIh4AAIAAASIBmAAIAAARgAjihtIAOgPQAZASAaAYIgRARQgXgYgZgUgADphSIAAgUIBQAAIgOgaIAUgIIARAiIBTAAIAAAUg");
		this.shape_1.setTransform(140.3, 46.9);
		this.timeline.addTween(a.Tween.get({}).to({
			state: [{
				t: this.shape
			}, {
				t: this.instance,
				p: {
					scaleX: 1,
					scaleY: 1,
					x: 39.5,
					y: 48.5
				}
			}]
		}).to({
			state: [{
				t: this.shape_1
			}, {
				t: this.instance,
				p: {
					scaleX: 0.95,
					scaleY: 0.95,
					x: 43.6,
					y: 48.8
				}
			}]
		}, 2).wait(2));
		this.instance_1 = new b.index_21;
		this.timeline.addTween(a.Tween.get(this.instance_1).wait(2).to({
			scaleX: 0.95,
			scaleY: 0.95,
			x: 6.1,
			y: 2.7
		}, 0).wait(2))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(0, 0, 244, 107);
	(b.index_15 = function(c,
		d, e) {
		this.initialize(c, d, e, {});
		this.instance = new b.index_16;
		this.instance.setTransform(38.5, 46, 1, 1, 0, 0, 0, 14.5, 16);
		this.shape = new a.Shape;
		this.shape.graphics.f("#FFFFFF").s().p("AjiB8QAtgZANgeQANgYABg9IgiAAIAAgWICyAAIAAAWIg4AAIAABxQAAAOAOAAIAJAAQAOAAACgQIAEgjIAWAJQgCASgDAOQgEAggbAAIgUAAQgggBAAggIAAh0IgqAAQgBBDgPAfQgRAlguAZIgQgUgAFnB8QBagwAOhUQAFgWAAgbIAXAAQAAAPgBAOQAUBiBUAvQgMANgHAJQhJgzgVhMQgTBShWAyQgGgJgLgLgAosCNIAAhSIglAAIAAgUIAlAAIAAhwIBfAAIAAghIh7AAIAAgUIENAAIAAAUIh7AAIAAAhIBfAAIAABwIAnAAIAAAUIgnAAIAAAvQAAAggeAAIgwAAIgFgWQAYABASAAQASABAAgQIAAgrIinAAIAABSgAm2AnIBIAAIAAgmIhIAAgAoVAnIBIAAIAAgmIhIAAgAm2gQIBIAAIAAgmIhIAAgAoVgQIBIAAIAAgmIhIAAgAEtBhQAfgvAfhDQAOAKAJAGQglBAgYAxgAkoBPIAqgMIAAhQIglAAIAAgVIAlAAIAAhBIgmAAIAAgWIBiAAIAAAWIgmAAIAABBIAiAAIAAAVIgiAAIAABKIAngMIABAXIhkAfgAADACIAAgXIEjAAIAAAXgAISgSQANgZALgcIh0AAQgMAdgQAbQgKgIgLgEQAig4AQg8IAYAHQgHAWgJAWICEAAIAAAVQgMAhgOAcQgKgFgNgDgAE3htIARgQQAYAYAeAiIgTASQgdgmgXgWgAivhmIAAgVICVAAIAAAVg");
		this.shape.setTransform(142.9, 45.4);
		this.shape_1 = new a.Shape;
		this.shape_1.graphics.f("#FFFFFF").s().p("AjWB1QAqgXANgdQAMgWAAg7IggAAIAAgUICpAAIAAAUIg0AAIAABsQAAANAMAAIAJAAQAOAAABgPIAEghIAVAIIgEAfQgFAegZAAIgTAAQgeAAAAgeIAAhwIgpAAQAABBgOAdQgQAjgtAYIgOgUgAFVB1QBWgtANhQQAEgUAAgaIAXAAIgCAbQATBdBRAtQgMAMgGAKQhGgygUhHQgSBNhSAwQgGgJgKgLgAoQCGIAAhOIgkAAIAAgTIAkAAIAAhrIBaAAIAAgfIh1AAIAAgTID/AAIAAATIh0AAIAAAfIBaAAIAABrIAlAAIAAATIglAAIAAAsQAAAfgdAAIgtAAIgEgVIAnABQARABAAgPIAAgpIieAAIAABOgAmgAlIBEAAIAAglIhEAAgAn6AlIBEAAIAAglIhEAAgAmggQIBEAAIAAgkIhEAAgAn6gQIBEAAIAAgkIhEAAgAEeBbQAdgrAehBQANAKAJAGQgkA9gWAugAkZBKIAogKIAAhMIgjAAIAAgUIAjAAIAAg/IglAAIAAgUIBeAAIAAAUIgkAAIAAA/IAgAAIAAAUIggAAIAABGIAlgLIABAWIhfAdgAADACIAAgWIEUAAIAAAWgAH3gSQANgXAKgaIhuAAQgMAbgOAaQgKgIgKgEQAgg1APg5IAWAGQgGAWgIAVIB9AAIAAAUQgMAegNAbQgKgEgMgEgAEohoIAQgPQAWAXAdAhIgTAQQgbgjgVgWgAimhgIAAgVICNAAIAAAVg");
		this.shape_1.setTransform(141.9, 45.8);
		this.timeline.addTween(a.Tween.get({}).to({
			state: [{
				t: this.shape
			}, {
				t: this.instance,
				p: {
					scaleX: 1,
					scaleY: 1,
					x: 38.5,
					y: 46
				}
			}]
		}).to({
			state: [{
				t: this.shape_1
			}, {
				t: this.instance,
				p: {
					scaleX: 0.95,
					scaleY: 0.95,
					x: 42.7,
					y: 46.4
				}
			}]
		}, 2).wait(2));
		this.instance_1 = new b.index_21;
		this.timeline.addTween(a.Tween.get(this.instance_1).wait(2).to({
			scaleX: 0.95,
			scaleY: 0.95,
			x: 6.1,
			y: 2.7
		}, 0).wait(2))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(0, 0, 244, 107);
	(b.HIT = function(c, d, e) {
		this.initialize(c,
			d, e, {});
		this.frame_17 = function() {
			this.stop()
		};
		this.timeline.addTween(a.Tween.get(this).wait(17).call(this.frame_17).wait(1));
		this.bb = new b.index_12;
		this.bb.setTransform(95.6, 191.6, 1, 1, 0, 0, 0, 88.3, 41.6);
		this.timeline.addTween(a.Tween.get(this.bb).wait(1).to({
			regX: 80.9,
			x: 88.2,
			y: 186.6
		}, 0).wait(1).to({
			y: 181.6
		}, 0).wait(1).to({
			y: 176.6
		}, 0).wait(1).to({
			y: 171.6
		}, 0).wait(1).to({
			y: 166.6
		}, 0).wait(1).to({
			y: 161.6
		}, 0).wait(1).to({
			y: 156.6
		}, 0).wait(1).to({
			y: 151.6
		}, 0).wait(1).to({
			y: 146.6
		}, 0).wait(1).to({
			regX: 88.3,
			x: 95.6,
			y: 141.6
		}, 0).wait(1).to({
			regX: 80.9,
			x: 88.2,
			y: 133.3,
			alpha: 0.833
		}, 0).wait(1).to({
			y: 124.9,
			alpha: 0.667
		}, 0).wait(1).to({
			y: 116.6,
			alpha: 0.5
		}, 0).wait(1).to({
			y: 108.3,
			alpha: 0.333
		}, 0).wait(1).to({
			y: 99.9,
			alpha: 0.167
		}, 0).wait(1).to({
			regX: 88.3,
			x: 95.6,
			y: 91.6,
			alpha: 0
		}, 0).to({
			_off: !0
		}, 1).wait(1))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(-4.5, 150.7, 185.3, 81.9);
	(b.index_3 = function(c, d, e) {
		this.initialize(c, d, e, {});
		this.instance = new b.index_4;
		this.instance.setTransform(33.4, 32, 1, 1, 0, 0, 0, 33.4, 32);
		this.timeline.addTween(a.Tween.get(this.instance).wait(2).to({
			x: 35.9,
			y: 29.5
		}, 0).wait(2).to({
			y: 34.5
		}, 0).wait(2).to({
			x: 30.9
		}, 0).wait(2).to({
			y: 29.5
		}, 0).wait(2).to({
			x: 35.9,
			y: 32
		}, 0).wait(2).to({
			x: 30.9,
			y: 34.5
		}, 0).wait(2))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(-25, -24, 65.1, 62.3);
	(b.index_8 = function(c, d, e) {
		this.initialize(c, d, e, {});
		this.instance = new b.index_9;
		this.instance.setTransform(30, 30, 1, 1, 0, 0, 0, 0, 15);
		this.timeline.addTween(a.Tween.get(this.instance).to({
			rotation: 360
		}, 59).wait(1));
		this.instance_1 = new b.index_9;
		this.instance_1.setTransform(30,
			30, 1, 1, 0, 0, 0, 0, 15);
		this.timeline.addTween(a.Tween.get(this.instance_1).wait(60));
		this.shape = new a.Shape;
		this.shape.graphics.f("#FFCC00").s().p("AjPDQQhWhXgBh5QABh5BWhWQBWhWB5gBQB5ABBXBWQBXBWAAB5QAAB5hXBXQhXBXh5AAQh5AAhWhXgAibibQhBBAAABbQAABbBBBAQBABBBbAAQBbAABAhBQBBhAAAhbQAAhbhBhAQhAhBhbAAQhbAAhABBg");
		this.shape.setTransform(29.5, 29.5);
		this.timeline.addTween(a.Tween.get(this.shape).wait(60))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(0, 0, 59, 59);
	(b.GAMEUI = function(c, d, e) {
		this.initialize(c,
			d, e, {});
		this.frame_0 = function() {};
		this.timeline.addTween(a.Tween.get(this).call(this.frame_0).wait(1));
		this.cc = new b.ss;
		this.cc.setTransform(429.5, 654.5);
		this.cc.alpha = 0.5;
		this.text = new a.Text("s", "bold 50px 'Microsoft YaHei'", "#FFFFFF");
		this.text.textAlign = "center";
		this.text.lineHeight = 52;
		this.text.setTransform(267.5, 29);
		this.timetxt = new a.Text("0", "bold 50px 'Microsoft YaHei'", "#FFCC00");
		this.timetxt.name = "timetxt";
		this.timetxt.textAlign = "center";
		this.timetxt.lineHeight = 52;
		this.timetxt.lineWidth =
			65;
		this.timetxt.setTransform(216.5, 31);
		this.timemc = new b.index_8;
		this.timemc.setTransform(151.5, 66.5, 1, 1, 0, 0, 0, 29.5, 29.5);
		this.timemc.shadow = new a.Shadow("rgba(0,0,0,1)", 0, 0, 5);
		//游戏进行时显示分
		this.text_1 = new a.Text("分", "30px 'Microsoft YaHei'", "#FFFFFF");
		this.text_1.textAlign = "center";
		this.text_1.lineHeight = 32;
		this.text_1.setTransform(606.6, 45.2);
		this.scoretxt = new a.Text("0", "bold 56px 'Microsoft YaHei'", "#FFCC00");
		this.scoretxt.name = "scoretxt";
		this.scoretxt.textAlign = "center";
		this.scoretxt.lineHeight = 58;
		this.scoretxt.lineWidth =
			212;
		this.scoretxt.setTransform(484.8, 26);
		this.timeline.addTween(a.Tween.get({}).to({
			state: [{
				t: this.scoretxt
			}, {
				t: this.text_1
			}, {
				t: this.timemc
			}, {
				t: this.timetxt
			}, {
				t: this.text
			}, {
				t: this.cc
			}]
		}).wait(1));
		this.bg = new b.元件2;
		this.bg.setTransform(400, 504);
		this.timeline.addTween(a.Tween.get(this.bg).wait(1))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(0, 0, 800, 1008);
	(b.apple_14 = function(c, d, e) {
		this.initialize(c, d, e, {});
		this.frame_24 = function() {
			this.stop()
		};
		this.timeline.addTween(a.Tween.get(this).wait(24).call(this.frame_24).wait(1));
		this.instance = new b.apple_4;
		this.instance.setTransform(31.5, 48.3, 1, 1, 0, 0, 0, 31.5, 30.4);
		this.timeline.addTween(a.Tween.get(this.instance).to({
			rotation: -360,
			x: -307.3,
			y: 191.3
		}, 6).wait(19));
		this.instance_1 = new b.apple_5;
		this.instance_1.setTransform(64.4, 36.8, 1, 1, 0, 0, 0, 35.1, 36.8);
		this.timeline.addTween(a.Tween.get(this.instance_1).to({
			rotation: -360,
			x: -147.5,
			y: 203.8
		}, 6).to({
			regY: 36.9,
			rotation: -435,
			x: -190.4,
			y: 206.9
		}, 4).to({
			rotation: -420,
			x: -180.4,
			y: 213.9
		}, 4).wait(11));
		this.instance_2 = new b.apple_6;
		this.instance_2.setTransform(33.2,
			10.1, 1, 1, 0, 0, 0, 21.6, 10.1);
		this.timeline.addTween(a.Tween.get(this.instance_2).to({
			rotation: -360,
			x: -571.7,
			y: -34.5
		}, 6).wait(19));
		this.instance_3 = new b.apple_8;
		this.instance_3.setTransform(27.1, 71, 1, 1, 0, 0, 0, 8.8, 5.9);
		this.timeline.addTween(a.Tween.get(this.instance_3).to({
			rotation: -360,
			x: -584.5,
			y: 33.8
		}, 6).wait(19));
		this.instance_4 = new b.apple_9;
		this.instance_4.setTransform(21.5, 15.6, 1, 1, 0, 0, 0, 21.5, 15.6);
		this.timeline.addTween(a.Tween.get(this.instance_4).to({
			rotation: -360,
			x: -624.5,
			y: 38.5
		}, 6).wait(19));
		this.instance_5 = new b.apple_10;
		this.instance_5.setTransform(95.5, 56.8, 1, 1, 0, 0, 0, 23, 38.4);
		this.timeline.addTween(a.Tween.get(this.instance_5).to({
			rotation: -360,
			x: -660.3,
			y: 89.7
		}, 7).wait(18));
		this.instance_6 = new b.apple_7;
		this.instance_6.setTransform(48.8, 75.4, 1, 1, 0, 0, 0, 22.8, 14.7);
		this.timeline.addTween(a.Tween.get(this.instance_6).to({
			rotation: -360,
			x: -630.5,
			y: 133.2
		}, 11).wait(14));
		this.instance_7 = new b.apple_11;
		this.instance_7.setTransform(74.2, 81.4, 1, 1, 0, 0, 0, 16.8, 13.7);
		this.timeline.addTween(a.Tween.get(this.instance_7).to({
			rotation: -360,
			x: -101.3,
			y: 223.9
		}, 9).to({
			regY: 13.6,
			rotation: -375,
			x: -103.8,
			y: 223.8
		}, 3).to({
			rotation: -360,
			x: -101.3
		}, 4).wait(9));
		this.instance_8 = new b.apple_12;
		this.instance_8.setTransform(101.1, 91.7, 1, 1, 0, 0, 0, 12.7, 11.3);
		this.timeline.addTween(a.Tween.get(this.instance_8).to({
			rotation: -360,
			x: 65.5,
			y: 239.8
		}, 6).to({
			rotation: -720,
			x: 12.6,
			y: 235.8
		}, 12).to({
			rotation: -705,
			x: 15.6
		}, 6).wait(1));
		this.instance_9 = new b.apple_13;
		this.instance_9.setTransform(124.3, 67.2, 1, 1, 0, 0, 0, 6.8, 14.5);
		this.timeline.addTween(a.Tween.get(this.instance_9).to({
			x: -17.7,
			y: 216.7
		}, 4).to({
			regX: 6.7,
			regY: 14.6,
			rotation: -495,
			x: -95.2
		}, 11).wait(10))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(0, 0, 133, 103);
	(b.apple_3 = function(c, d, e) {
		this.initialize(c, d, e, {});
		this.frame_24 = function() {
			this.stop()
		};
		this.timeline.addTween(a.Tween.get(this).wait(24).call(this.frame_24).wait(1));
		this.instance = new b.apple_4;
		this.instance.setTransform(31.5, 48.3, 1, 1, 0, 0, 0, 31.5, 30.4);
		this.timeline.addTween(a.Tween.get(this.instance).to({
			rotation: -360,
			x: -595.8,
			y: 72.4
		}, 6).wait(19));
		this.instance_1 = new b.apple_5;
		this.instance_1.setTransform(64.4, 36.8, 1, 1, 0, 0, 0, 35.1, 36.8);
		this.timeline.addTween(a.Tween.get(this.instance_1).to({
			rotation: -360,
			x: -490.2,
			y: 254.4
		}, 6).wait(19));
		this.instance_2 = new b.apple_6;
		this.instance_2.setTransform(33.2, 10.1, 1, 1, 0, 0, 0, 21.6, 10.1);
		this.timeline.addTween(a.Tween.get(this.instance_2).to({
			rotation: -360,
			x: -564.9,
			y: -31.2
		}, 6).wait(19));
		this.instance_3 = new b.apple_7;
		this.instance_3.setTransform(48.8, 75.4, 1, 1, 0, 0, 0, 22.8, 14.7);
		this.timeline.addTween(a.Tween.get(this.instance_3).to({
			rotation: -360,
			x: -574,
			y: 182.5
		}, 6).wait(19));
		this.instance_4 = new b.apple_8;
		this.instance_4.setTransform(27.1, 71, 1, 1, 0, 0, 0, 8.8, 5.9);
		this.timeline.addTween(a.Tween.get(this.instance_4).to({
			rotation: -360,
			x: -589.5,
			y: 142.3
		}, 6).wait(19));
		this.instance_5 = new b.apple_9;
		this.instance_5.setTransform(21.5, 15.6, 1, 1, 0, 0, 0, 21.5, 15.6);
		this.timeline.addTween(a.Tween.get(this.instance_5).to({
			rotation: -360,
			x: -611.5,
			y: 4.8
		}, 6).wait(19));
		this.instance_6 = new b.apple_10;
		this.instance_6.setTransform(95.5, 56.8, 1, 1, 0, 0, 0, 23, 38.4);
		this.timeline.addTween(a.Tween.get(this.instance_6).to({
			rotation: -360,
			x: -67.5,
			y: 212.8
		}, 7).to({
			rotation: -810,
			x: -300.5,
			y: 218.8
		}, 17).wait(1));
		this.instance_7 = new b.apple_11;
		this.instance_7.setTransform(74.2, 81.4, 1, 1, 0, 0, 0, 16.8, 13.7);
		this.timeline.addTween(a.Tween.get(this.instance_7).to({
			rotation: -360,
			x: -101.3,
			y: 223.9
		}, 6).to({
			regY: 13.6,
			rotation: -375,
			x: -103.8,
			y: 223.8
		}, 3).to({
			rotation: -360,
			x: -101.3
		}, 4).wait(12));
		this.instance_8 = new b.apple_12;
		this.instance_8.setTransform(101.1, 91.7, 1, 1, 0, 0, 0, 12.7, 11.3);
		this.timeline.addTween(a.Tween.get(this.instance_8).to({
				x: -4.5,
				y: 235.8
			},
			6).to({
			rotation: -360,
			x: -47.4
		}, 12).to({
			rotation: -345,
			x: -44.4
		}, 6).wait(1));
		this.instance_9 = new b.apple_13;
		this.instance_9.setTransform(124.3, 67.2, 1, 1, 0, 0, 0, 6.8, 14.5);
		this.timeline.addTween(a.Tween.get(this.instance_9).to({
			x: 66.3,
			y: 216.7
		}, 4).to({
			regX: 6.7,
			regY: 14.6,
			rotation: -495,
			x: 20.8
		}, 14).wait(7))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(0, 0, 133, 103);
	(b.apple_2 = function(c, f, e) {
		this.initialize(c, f, e, {});
		this.frame_1 = function() {
			this.stop()
		};
		this.timeline.addTween(a.Tween.get(this).wait(1).call(this.frame_1).wait(1));
		this.shape = new a.Shape;
		this.shape.graphics.bf(d.apple_17, null, new a.Matrix2D(1, 0, 0, 1, -93.2, -14.9)).s().p("AA+A+IhbgcIhGAXIgWg3IAQhHIDjAAIAACMg");
		this.shape.setTransform(40.8, -49.8);
		this.timeline.addTween(a.Tween.get(this.shape).to({
			_off: !0
		}, 1).wait(1));
		this.shape_1 = new a.Shape;
		this.shape_1.graphics.bf(d.apple_17, null, new a.Matrix2D(0.707, 0.707, -0.707, 0.707, 42.6, -53.2)).s().p("AhuAFICQiQIBJBEIgFASIgDBeIAMAhIgHAIIhAAdIgQAdg");
		this.shape_1.setTransform(-31.9, -52.8);
		this.timeline.addTween(a.Tween.get(this.shape_1).to({
				_off: !0
			},
			1).wait(1));
		this.instance = new b.补间3("synched", 0);
		this.instance.setTransform(5.5, -4);
		this.instance_1 = new b.补间4("synched", 0);
		this.instance_1.setTransform(-16.5, 6);
		this.timeline.addTween(a.Tween.get({}).to({
			state: [{
				t: this.instance
			}]
		}).to({
			state: [{
				t: this.instance_1
			}]
		}, 1).wait(1));
		this.timeline.addTween(a.Tween.get(this.instance).to({
			_off: !0,
			x: -16.5,
			y: 6
		}, 1).wait(1))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(-43, -66.9, 97, 104.9);
	(b.APPLE = function(c, d, e) {
		this.initialize(c,
			d, e, {});
		this.frame_0 = function() {
			this.stop()
		};
		this.frame_1 = function() {
			this.stop()
		};
		this.frame_2 = function() {
			this.stop()
		};
		this.frame_3 = function() {
			this.stop()
		};
		this.timeline.addTween(a.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1));
		this.bb = new b.apple_1;
		this.bb.setTransform(46.5, 44.5, 1, 1, 0, 0, 0, 46.5, 44.5);
		this.bb_1 = new b.apple_2;
		this.bb_1.setTransform(45, 44.5, 1, 1, 0, 0, 0, 48.5, 42);
		this.bb_2 = new b.apple_3;
		this.bb_2.setTransform(-2.5, -0.5, 1, 1, 0, 0, 0, 66.5, 51.5);
		this.bb_3 = new b.apple_14;
		this.bb_3.setTransform(-1.5, 2.5, 1, 1, 0, 0, 0, 66.5, 51.5);
		this.timeline.addTween(a.Tween.get({}).to({
			state: [{
				t: this.bb
			}]
		}).to({
			state: [{
				t: this.bb_1
			}]
		}, 1).to({
			state: [{
				t: this.bb_2
			}]
		}, 1).to({
			state: [{
				t: this.bb_3
			}]
		}, 1).wait(1))
	}).prototype = c = new a.MovieClip;
	c.nominalBounds = new a.Rectangle(-46.5, -44.5, 93, 89);
	(b.OVERUI = function() {
		this.initialize();
		this.share = new b.index_17;
		this.share.setTransform(534, 764.5, 1, 1, 0, 0, 0, 122, 53.5);
		new a.ButtonHelper(this.share, 0, 1,
			2, !1, new b.index_17, 3);
		this.again = new b.index_15;
		this.again.setTransform(264, 764.5, 1, 1, 0, 0, 0, 122, 53.5);
		new a.ButtonHelper(this.again, 0, 1, 2, !1, new b.index_15, 3);
		this.scoretxt = new a.Text("0分", "bold 68px 'Microsoft YaHei'", "#FFCC3F");
		this.scoretxt.name = "scoretxt";
		this.scoretxt.textAlign = "center";
		this.scoretxt.lineHeight = 68;
		this.scoretxt.lineWidth = 361;
		this.scoretxt.setTransform(394.5, 510);
		this.txt = new a.Text("手残......", "24px 'Microsoft YaHei'", "#FFFFFF");
		this.txt.name = "txt";
		this.txt.textAlign =
			"center";
		this.txt.lineHeight = 24;
		this.txt.lineWidth = 263;
		this.txt.setTransform(396.5, 619.6);
		this.instance = new b.index_26;
		this.addChild(this.instance, this.txt, this.scoretxt, this.again, this.share)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 800, 1008);
	(b.INTROUI = function() {
		this.initialize();
		this.instance = new b.index_3;
		this.instance.setTransform(339.4, 321, 1, 1, 0, 0, 0, 33.4, 32);
		this.shape = new a.Shape;
		this.shape.graphics.f("#FFFFFF").s().p("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");
		this.shape.setTransform(403.6, 868.4);
		this.btn = new b.index_5;
		this.btn.setTransform(398, 777.5, 1, 1, 0, 0, 0, 175, 64.5);
		new a.ButtonHelper(this.btn, 0, 1, 2, !1, new b.index_5, 3);
		this.instance_1 = new b.index_24;
		this.addChild(this.instance_1, this.btn, this.shape, this.instance)
	}).prototype = c = new a.Container;
	c.nominalBounds = new a.Rectangle(0, 0, 800, 1008)
})(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images;

function GameOver(b) {
	alert('游戏结束')
	this.isGame = !1;
	this.scene;
	this.kind = 0;
	this.share;
	this.logo;
	this.share;
	this.bg;
	this.maskmc;
	this.maskmsgmc;
	this.wtxt;
	this.score;
	this.bgs;
	this.init = function(d) {
		var a = this;
		d = "手残...... 还不错，继续努力！ 有潜力，必成大器！ 你一定是传说中的高手！ 职业玩家！膜拜一下！ 完美表现！！".split(" ");
		5E3 <=
			GD.SCORE ? this.kind = 5 : 3E3 <= GD.SCORE ? this.kind = 4 : 1500 <= GD.SCORE ? this.kind = 3 : 800 <= GD.SCORE ? this.kind = 2 : 400 <= GD.SCORE ? this.kind = 1 : 200 > GD.SCORE && (this.kind = 0);
		this.scene = new b.OVERUI;
		this.addChild(this.scene);
		this.openMaskBG();
		this.closeMsk(!0);
		setTimeout(function() {
			a.initEvent()
		}, 1E3);
		//游戏结束后的分
		this.scene.scoretxt.text = GD.SCORE + " 分";
		GD.SHAREWORD += "我打了" + GD.GETNUM + "个，最高连击" + GD.MAXHITUM + ",得了" + GD.SCORE + " 分：" + d[this.kind];
		this.scene.txt.text = GD.COMMENT =
			d[this.kind];
		trace(GD.SHAREWORD)
	};
	this.initEvent = function() {
		var b = this;
		this.scene.again.addEventListener("click", function() {
			b.onAgain()
		});
		this.scene.share.addEventListener("click", function() {
			b.onShare()
		})
	};
	this.openMaskBG = function() {
		this.maskmc = new createjs.Container;
		this.maskmsgmc = new b.SHAREUI;
		this.addChild(this.maskmc);
		this.maskmc.x = 530;
		this.maskmc.y = 96;
		this.maskmc.addChild(this.maskmsgmc);
		this.maskmsgmc.gotoAndPlay(0)
	};
	this.closeMsk = function(b) {
		(this.maskmc.visible = b) && this.maskmsgmc.gotoAndPlay(0)
	};
	this.onShare = function() {
		alert('点我有惊喜')
		trace(GD.SHAREWORD); /*onShowVideo()*/
	};
	this.onAgain = function() {
		alert('再玩一次')
		this.scene.again.removeEventListener("click", function() {
			self.onAgain()
		});
		this.scene.share.removeEventListener("click", function() {
			self.onShare()
		});
		this.scene.removeAllChildren();
		this.removeAllChildren();
		this.dispatchEvent(new createjs.Event("AGAIN"))
	}
}
GameOver.prototype = new createjs.Container;
var Emeny = function(b) {
	this.isGame = !1;
	this.state = 0;
	this.visible = !0;
	this.action;
	this.mc;
	this.ux;
	this.uy = -12;
	this.ox = -10;
	this.oy = 400;
	this.uoy;
	this.hitSpace = 1;
	this.dieSpace = 10;
	this.hideSpace = 1;
	this.waitSpace = 8;
	this.g = 0.2;
	this.bb;
	this.drotation;
	this.init = function() {
		this.mc = new b.APPLE;
		this.toNoActive()
	};
	this.toBeHit = function() {
		this.mc.rotation = 0;
		this.setState(1);
		this.mc.gotoAndStop(1)
	};
	this.toActive = function(b) {
		this.visible = this.active = !0;
		this.setState(0);
		this.mc.gotoAndStop(0);
		this.drotation = Math.floor(10 *
			Math.random()) + 10;
		this.mc.rotation = 0;
		this.isGame = !0;
		this.mc.x = this.ox;
		var a = 0.1 * Math.floor(10 * Math.random());
		2 == b ? (this.ux = 7 + 2 * a, this.g = 0.3, this.uy = this.uoy = -13) : (this.ux = 6 + 3 * a, this.g = 0.2, this.uy = this.uoy = -8);
		this.mc.y = this.oy = 200 * a + 300;
		this.mc.alpha = 1
	};
	this.move = function() {
		this.t += 1;
		this.mc.rotation += this.drotation;
		this.mc.x = this.ux * this.t + this.ox;
		this.uy = this.g * this.t + this.uoy;
		this.mc.y = this.uy * this.t + this.oy;
		800 < this.mc.y && 0 == this.state && (this.toWait(), GD.GAME.LoseOne())
	};
	this.toWait = function() {
		this.setState(4)
	};
	this.setState = function(b) {
		this.t = 0;
		this.state = b
	};
	this.bbFrameEnd = function() {};
	this.toDie = function() {
		var b = Math.floor(2 * Math.random()) + 2;
		this.setState(2);
		this.mc.gotoAndStop(b);
		this.bb = this.mc.getChildAt(0);
		this.bb.gotoAndPlay(0)
	};
	this.toHide = function() {
		this.t = 0;
		this.state = 3
	};
	this.toClose = function() {
		this.toNoActive
	};
	this.toNoActive = function() {
		this.isGame = this.active = this.visible = !1;
		this.setState(5)
	};
	this.update = function(b) {
		this.isGame && (this.t += 1, 0 == this.state ? this.move() : 1 == this.state ? this.t > this.hitSpace &&
			this.toDie() : 2 == this.state ? this.t > this.dieSpace && this.toHide() : 3 == this.state ? this.t > this.hideSpace && this.toNoActive() : 4 == this.state && (this.t > this.waitSpace ? this.toNoActive() : (this.mc.x += 40, this.mc.rotation += 3 * this.drotation)))
	};
	this.init()
};

function GameManager(b) {
	var d = this;
	this.isGame = !1;
	this.scene;
	this.maskmc;
	this.scene;
	this.helo;
	this.timetxt;
	this.timemc;
	this.helo;
	this.butList = [];
	this.hitList = [];
	this.appleList = [];
	this.missList = [];
	this.action;
	this.rolesmc;
	this.HitsNum = this.t = 0;
	this.activAppleSpace = 9;
	this.clickNum = 0;
	this.lockclick = !1;
	GD.GAME = this;
	this.init = function() {
		GD.TIME = 1;
		GD.RETIME = 1;
		this.movetime = this.firsttime = 0;
		this.scene = new b.GAMEUI;
		GD.SCORE = 0;
		this.addChild(this.scene);
		this.rolesmc = new createjs.Container;
		this.scene.addChild(this.rolesmc);
		this.scene.cc.y = 630;
		this.scene.cc.x = 420;
		this.hitshape = new createjs.Container;
		this.hshape = new createjs.Shape;
		this.hshape.graphics.clear();
		this.hshape.graphics.beginFill("#000000").drawRect(0, 0, 800, 1008);
		this.hitshape.x = -82;
		this.hitshape.y = 0;
		this.hitshape.addChild(this.hshape);
		this.timetxt = this.scene.timetxt;
		this.timemc = this.scene.timemc;
		this.scoretxt = this.scene.scoretxt;
		this.createRoles();
		this.setScore(0);
		this.setTime(0);
		this.aimPot = [0, 0];
		this.tipspot = [307, 196];
		this.gdate = new Date;
		this.applespeed = [1, 1];
		this.gameStart();
		this.scene.addChild(this.hitshape);
		this.hitshape.alpha = 0.01
	};
	this.createRoles = function() {
		var a = this;
		this._SpriteSheet = new createjs.SpriteSheet({
			images: ["images/role40.png"],
			frames: [
				[322, 722, 158, 178],
				[322, 722, 158, 178],
				[322, 542, 158, 178],
				[322, 542, 158, 178],
				[162, 722, 158, 178],
				[162, 722, 158, 178],
				[162, 542, 158, 178],
				[162, 542, 158, 178],
				[2, 722, 158, 178],
				[2, 722, 158, 178],
				[2, 542, 158, 178],
				[2, 542, 158, 178],
				[322, 362, 158, 178],
				[322, 362, 158, 178],
				[162, 362, 158, 178],
				[162, 362, 158, 178],
				[2, 362, 158, 178],
				[2,
					362, 158, 178
				],
				[322, 182, 158, 178],
				[322, 182, 158, 178],
				[162, 182, 158, 178],
				[162, 182, 158, 178],
				[162, 182, 158, 178],
				[162, 182, 158, 178],
				[2, 182, 158, 178],
				[2, 182, 158, 178],
				[322, 2, 158, 178],
				[322, 2, 158, 178],
				[2, 182, 158, 178],
				[2, 182, 158, 178],
				[162, 2, 158, 178],
				[162, 2, 158, 178],
				[2, 2, 158, 178],
				[2, 2, 158, 178],
				[162, 2, 158, 178],
				[162, 2, 158, 178]
			],
			animations: {
				stand: [0, 19, "stand", 1],
				fire1: [20, 23, "stand", 1],
				fire2: [24, 29, "stand", 1],
				fire3: [30, 35, "stand", 1]
			}
		});
		this.helo = new createjs.Sprite(this._SpriteSheet);
		this.helo.addEventListener("animationend",
			function(b) {
				a.npcAnimateEnd(b)
			});
		this.rolesmc.addChild(this.helo);
		this.helo.scaleX = this.helo.scaleY = 1.8;
		this.helo.framerate = 30;
		this.helo.x = 380;
		this.helo.y = 450;
		this.setHeloState(0)
	};
	this.npcAnimateEnd = function() {
		this.lockclick = !1
	};
	this.LoseOne = function() {
		GD.LOSTNUM += 1;
		this.HitsNum = 0;
		this.activeMiss()
	};
	this.setScore = function(a) {
		this.scoretxt.text = a + ""
	};
	this.setTime = function(a) {
		GD.RETIME = a;
		GD.TIME = Math.floor(a / 10);
		a = Math.floor(GD.RETIME * (60 / (10 * GD.LIMIT)));
		this.timemc.gotoAndStop(60 < a ? 60 : a);
		this.timetxt.text =
			GD.LIMIT - GD.TIME + "";
		GD.TIME >= GD.LIMIT ? this.lostGame() : this.activAppleSpace = 9 - Math.floor(GD.TIME / 5);
		this.t += 1;
		this.t >= this.activAppleSpace && (this.t = 0, 4 < this.activAppleSpace ? this.activeApple(1) : this.activeApple(2))
	};
	this.toFire = function(a) {
		if (!(10 < this.clickNum)) {
			this.lockclick = !0;
			a = Math.floor(3 * Math.random()) + 1;
			this.setHeloState(a);
			for (var b = a = 0; b < this.appleList.length; b++)
				if (apple = this.appleList[b], 0 == apple.state && (540 < apple.mc.y && 700 > apple.mc.y || 390 < apple.mc.x && 450 > apple.mc.x)) this.activeBut(apple.mc.x,
					apple.mc.y), apple.toBeHit(), a += 1;
			0 < a ? (this.toHitOne(a), createjs.Sound.play("role_a2", {
				volume: 0.7
			})) : createjs.Sound.play("role_a1", {
				volume: 0.7
			})
		}
	};
	this.toHitOne = function(a) {
		this.activeHit(a);
		shake.hitAndShake(this.scene.bg, 6, 6);
		GD.GETNUM += a;
		//分数规则
		GD.SCORE += 10 + 10 * this.HitsNum;
		this.setScore(GD.SCORE);
		//成功打中小苹果
	};
	this.onDClick = function(a) {
		this.clickNum += 1;
		this.toFire(2)
	};
	this.onClick = function(a) {
		this.clickNum += 1;
		this.toFire(1)
	};
	this.setHeloState = function(a) {
		this.helo.gotoAndPlay(["stand", "fire1", "fire2", "fire3"][a])
	};
	this.activeApple = function(a) {
		GD.APPLENUM += 1;
		this.getApple().toActive(a)
	};
	this.getApple = function() {
		if (0 < this.appleList.length)
			for (var a, c = 0; c < this.appleList.length; c++)
				if ((a = this.appleList[c]) && !1 == a.active) return a;
		a = new Emeny(b);
		this.rolesmc.addChild(a.mc);
		this.appleList.push(a);
		return a
	};
	this.activeMiss = function() {
		var a = this.getMiss();
		a.visible = !0;
		a.gotoAndPlay(0)
	};
	this.getMiss = function() {
		var a = this;
		if (0 < this.missList.length)
			for (var c = 0; c < this.missList.length; c++)
				if (this.missList[c] && !this.missList[c].active) return this.missList[c];
		var d = new b.MISS;
		this.rolesmc.addChild(d);
		this.missList.push(d);
		d.x = this.tipspot[0];
		d.y = this.tipspot[1] + 10;
		d.active = !1;
		d.addEventListener("animationend", function(b) {
			a.MissAnimateEnd(d)
		});
		return d
	};
	this.activeHit = function(a) {
		this.HitsNum += a;
		this.HitsNum > GD.MAXHITUM && (GD.MAXHITUM = this.HitsNum);
		a = this.getHit();
		a.visible = !0;
		a.gotoAndPlay(0);
		a.bb.txt.text = this.HitsNum + ""
	};
	this.getHit = function() {
		if (0 < this.hitList.length)
			for (var a = 0; a < this.hitList.length; a++)
				if (this.hitList[a] && !this.hitList[a].active) return this.hitList[a];
		var c = new b.HIT;
		this.rolesmc.addChild(c);
		this.hitList.push(c);
		c.x = this.tipspot[0];
		c.y = this.tipspot[1];
		c.active = !1;
		var d = this;
		c.addEventListener("animationend", function(a) {
			d.hitAnimateEnd(c)
		});
		return c
	};
	this.activeBut = function(a, b) {
		var d = this.getBut();
		d.visible = !0;
		d.x = a - 50;
		d.y = b - 50;
		d.gotoAndPlay(0);
		var f = Math.floor(3 * Math.random());
		d.bb.gotoAndStop(f)
	};
	this.getBut = function() {
		if (0 < this.butList.length)
			for (var a = 0; a < this.butList.length; a++)
				if (this.butList[a] && !this.butList[a].active) return this.butList[a];
		var c = new b.LIGHTMC;
		this.rolesmc.addChild(c);
		this.butList.push(c);
		c.active = !1;
		c.addEventListener("animationend", function(a) {
			d.butAnimateEnd(c)
		});
		return c
	};
	this.MissAnimateEnd = function(a) {
		a.active = !1;
		a.visible = !1
	};
	this.butAnimateEnd = function(a) {
		a.active = !1;
		a.visible = !1
	};
	this.hitAnimateEnd = function(a) {
		a.active = !1;
		a.visible = !1
	};
	this.moveApp = function(a) {
		if (0 < this.appleList.length)
			for (var b, d = 0; d < this.appleList.length; d++) b = this.appleList[d], b.update(a)
	};
	this.gameStart = function() {
		this.getApple();
		this.getApple();
		this.getApple();
		var a = this;
		this.firsttime = new Date;
		this.isGame = !0;
		this.hitshape.addEventListener("click", function() {
			a.onClick()
		}, !1);
		this.activeApple()
	};
	this.lostGame = function() {
		this.closeGame()
	};
	this.closeGame = function() {
		this.isGame = !1;
		this.hitshape.removeEventListener("click", function() {
			d.onClick()
		});
		trace("------" + this.rolesmc.getNumChildren() + ":" + this.appleList.length + ":" + this.hitList.length + ":" + this.butList.length);
		for (var a = 0; a < this.appleList.length; a++) this.appleList[a].toClose(), this.appleList[a] &&
			this.rolesmc.removeChild(this.appleList[a].mc), this.appleList[a].mc = null, this.appleList[a] = null;
		for (a = 0; a < this.missList.length; a++) this.missList[a].removeEventListener("animationend", function(a) {
			d.MissAnimateEnd(mc)
		}), this.missList[a] && this.rolesmc.removeChild(this.missList[a]), this.missList[a] = null;
		for (a = 0; a < this.butList.length; a++) this.butList[a].removeEventListener("animationend", function(a) {
			d.MissAnimateEnd(mc)
		}), this.butList[a] && this.rolesmc.removeChild(this.butList[a]), this.butList[a] = null;
		this.hitList = [];
		for (a = 0; a < this.hitList.length; a++) this.hitList[a].removeEventListener("animationend", function(a) {
			d.MissAnimateEnd(mc)
		}), this.hitList[a] && this.rolesmc.removeChild(this.hitList[a]), this.hitList[a] = null;
		this.hitList = [];
		this.appleList = [];
		this.missList = [];
		this.butList = [];
		this._SpriteSheet.removeAllEventListeners();
		this._SpriteSheet = null;
		this.helo.removeEventListener("animationend", function(a) {
			d.npcAnimateEnd(a)
		});
		this.rolesmc.removeChild(this.helo);
		this.helo = null;
		this.rolesmc.removeAllChildren();
		this.scene.removeAllChildren();
		this.rolesmc.removeAllEventListeners();
		this.scene.removeAllEventListeners();
		this.nextScene()
	};
	this.nextScene = function() {
		this.scene.removeChild(this.helo);
		this.dispatchEvent(new createjs.Event("GAMEEND"))
	};
	this.update = function(a) {
		if (this.isGame) {
			shake && shake.update();
			var b = (new Date).getTime();
			100 < b - this.firsttime && (this.firsttime = b, this.setTime(GD.RETIME + 1));
			(new Date).getTime();
			this.clickNum -= 1;
			0 > this.clickNum && (this.clickNum = 0);
			this.moveApp(a)
		}
	}
}
GameManager.prototype = new createjs.Container;

function GameMain(b) {
	this.stage = null;
	this.menuScene;
	this.gameScene;
	this.loadScene;
	this.overScene;
	this.state;
	this.gameBounds;
	this.asset;
	this.init = function() {
		this.stage = new createjs.Container;
		this.addChild(this.stage);
		this.stage.snapToPixelsEnabled = !0;
		this.toMenuScene()
	};
	this.update = function(b) {
		this.gameScene && this.gameScene.update(b)
	};
	this.toMenuScene = function() {
		trace("toMenuScene");
		this.menuScene = new b.INTROUI;
		this.runScence(this.menuScene);
		var d = this;
		this.menuScene.btn.addEventListener("click", function() {
			audioisOK ?
				d.playbg() : GamePlay = !0;
			d.startGame()
		})
	};
	this.playbg = function() {
		createjs.Sound.play("images/mfbgsound" + atype, {
			loop: -1,
			volume: 0.3
		})
	};
	this.toGameScene = function() {
		var d = this,
			d = this;
		trace("toGameScene" + b);
		this.gameScene = new GameManager(b);
		this.gameScene.addEventListener("GAMEEND", function() {
			d.gameEnd()
		});
		this.runScence(this.gameScene);
		this.gameScene.init()
	};
	this.toGameOverScene = function() {
		var d = this;
		this.overScene = new GameOver(b);
		this.overScene.addEventListener("AGAIN", function() {
			d.againGame()
		});
		this.runScence(this.overScene);
		this.overScene.init()
	};
	this.gameEnd = function() {
		createjs.Sound.stop();
		this.gameScene.removeEventListener("GAMEEND", function() {
			self.gameEnd()
		});
		this.toGameOverScene()
	};
	this.againGame = function() {
		GD.PLAYEDNUM += 1;
		this.overScene.removeEventListener("AGAIN", function() {
			self.againGame()
		});
		this.toMenuScene()
	};
	this.startGame = function() {
		alert('开始游戏')
		this.toGameScene()
	};
	this.runScence = function(b) {
		b && (this.curScene && this.stage.removeChild(this.curScene), this.curScene = b, this.curScene.x = -80, this.curScene.y = -5, this.stage.addChild(b))
	}
}
GameMain.prototype = new createjs.Container;
var GD = {
	SCORE: 0,
	NPCLIVE: 0,
	//游戏时间
	LIMIT: 30,
	TIME: 0,
	RETIME: 0,
	ENDKIND: 0,
	APPLENUM: 0
};
GD.GAME;
GD.GETNUM = 0;
GD.MAXHITUM = 0;
GD.LOSTNUM = 0;
GD.TIMESTRING = "00:00";
GD.PLAYEDNUM = 0;
GD.DESC = "30秒决战小苹果！一大波小苹果来袭，拳力出击！";
GD.TITLE = "暴击0个小苹果！";
GD.COMMENT = "手残......";

function trace(b) {}
var canvas, stage, loaderview, gameView, loader, preload, winSize, mainui, maskshpe;
winSize = {
	width: 640,
	height: 1008
};
var GamePlay = !1,
	audioisOK = !1,
	atype = "",
	atype = isAndroid() ? ".ogg" : ".mp3",
	audio = ["mfbgsound", "role_a1", "role_a2"];


function regsistAudio() {
	for (var b = 0; b < audio.length; b++) createjs.Sound.registerSound("images/" + audio[b] + atype, audio[b]);
	createjs.Sound.addEventListener("fileload", audioloadHandler)
}

for (var gameManifest = [{
		src: "images/index_23.jpg",
		id: "index_23"
	}, {
		src: "images/index_24.jpg",
		id: "index_24"
	}, {
		src: "images/index_26.jpg",
		id: "index_26"
	}, {
		src: "images/games.png",
		id: "game"
	}, {
		src: "images/role40.png",
		id: "roles"
	}], i = 0; i < audio.length; i++) gameManifest.push({
	src: "images/" + audio[i] + atype,
	id: audio[i]
});

function initApp() {
	canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);
	maskshpe = new createjs.Shape;
	maskshpe.graphics.drawRect(-178, -128, 990, 1136);
	maskshpe._off = !0;
	mainui = new createjs.Container;
	stage.addChild(mainui);
	initLoader();
	window.onresize = resizeCanvas;
	resizeCanvas();
	createjs.Touch.enable(stage)
}

function initLoader() {
	createjs.Ticker.setFPS(40);
	createjs.Ticker.addEventListener("tick", update);
	stage.update();
	loader = new createjs.LoadQueue(!1);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener("complete", handleComplete);
	loadLoadUI()
}

function loadLoadUI() {
	loader.loadManifest(loadinglib.properties.manifest)
}

function handleFileLoad(b) {
	"image" == b.item.type && (loadingimages[b.item.id] = b.result)
}

function handleComplete() {
	document.getElementById("loadicon").style.display = "none";
	loaderview = new loadinglib.loading;
	mainui.addChild(loaderview);
	loaderview.x = -80;
	loader.removeEventListener("complete", handleComplete);
	loadGameAssets()
}

function isAndroid() {
	return /Android/i.test(navigator.userAgent)
}

function loadGameAssets() {
	images = images || {};
	preload = new createjs.LoadQueue(!0);
	preload.installPlugin(createjs.Sound);
	preload.on("progress", handleOverallProgress);
	preload.on("fileprogress", handleGameFileProgress);
	preload.on("fileload", handleGameFileLoad);
	preload.on("complete", handleGameComplete);
	preload.on("error", handleFileError);
	preload.setMaxConnections(5);
	preload.loadManifest(gameManifest)
}

function update(b) {
	stage.update(b);
	gameView && gameView.update(b)
}

function handleGameFileLoad(b) {
	"image" == b.item.type && (images[b.item.id] = b.result)
}

function tprogress(b) {
	b = Math.floor(100 * b);
	loaderview.instance.text.text = b + "%"
}

function handleGameFileProgress(b) {}

function handleOverallProgress(b) {
	tprogress(preload.progress)
}

function audioloadHandler(b) {
	trace("audioloadHandler" + b.id);
	"mfbgsound" == b.id && (audioisOK = !0, GamePlay && createjs.Sound.play("images/mfbgsound" + atype, {
		loop: -1,
		volume: 0.3
	}))
}

function initMainView() {
	mainui.removeChild(loaderview);
	for (var b = new createjs.SpriteSheet(gamedata), d = 0; d < lib.properties.manifest.length; d++) {
		var a = lib.properties.manifest[d].id;
		gamedata.animations[a] && (images[a] = new createjs.SpriteSheetUtils.extractFrame(b, a))
	}
	images.index_23 = preload.getResult("index_23");
	images.index_24 = preload.getResult("index_24");
	images.index_26 = preload.getResult("index_26");
	gameView = new GameMain(lib);
	mainui.addChild(gameView);
	mainui.addChild(maskshpe);
	gameView.init();
	gameView.mask =
		maskshpe
}

function handleGameComplete(b) {
	regsistAudio();
	initMainView()
}

function handleFileError(b) {
	trace("handleFileError");
	loadGameAssets()
}
var root = mainui,
	scale;

function resizeCanvas() {
	var b = window.innerWidth,
		d = window.innerHeight;
	scale = 630 / 992 > b / d ? mainui.scaleX = mainui.scaleY = b / 630 : mainui.scaleX = mainui.scaleY = d / 992;
	canvas.width = b;
	canvas.height = d;
	mainui.x = (b - 640 * scale) / 2
}
var gamedata = {
	images: ["images/games.png"],
	frames: [
		[2, 2, 190, 190],
		[906, 2, 93, 89],
		[194, 168, 97, 84],
		[800, 133, 133, 103],
		[554, 2, 350, 129],
		[554, 133, 244, 107],
		[906, 2, 93, 89],
		[2, 194, 137, 45],
		[194, 2, 358, 164]
	],
	animations: {
		Bitmap1: [0],
		apple_15: [1],
		apple_16: [2],
		apple_17: [3],
		index_20: [4],
		index_21: [5],
		index_22: [6],
		index_25: [7],
		mc_46: [8]
	}
}; /*  |xGv00|d28345203d6b8369c3fb78dde46176b0 */