(function(){var h={},mt={},c={id:"c64c3fae8bee0db7167e50b03190f8af",dm:["muyu007.com"],js:"tongji.baidu.com/hm-web/js/",etrk:[],icon:'&#32593;&#31449;&#32479;&#35745;|txt|0|0',ctrk:false,align:-1,nv:-1,vdur:1800000,age:31536000000,rec:0,rp:[],trust:1,vcard:1387671,qiao:1387671,lxb:0,conv:0,med:0,cvcc:{q:/tencent:\/\/|qq\.(com|htm)|kefu|openkf|swt|zoos|53kf|doyoo|looyu|leyu|zixun|chat|talk|openQQ|open_ask|online/i},cvcf:[],apps:''};var q=void 0,r=!0,s=null,w=!1;mt.k={};mt.k.W=/msie (\d+\.\d+)/i.test(navigator.userAgent);mt.k.Ba=/msie (\d+\.\d+)/i.test(navigator.userAgent)?document.documentMode||+RegExp.$1:q;mt.k.cookieEnabled=navigator.cookieEnabled;mt.k.javaEnabled=navigator.javaEnabled();mt.k.language=navigator.language||navigator.browserLanguage||navigator.systemLanguage||navigator.userLanguage||"";mt.k.Ga=(window.screen.width||0)+"x"+(window.screen.height||0);mt.k.colorDepth=window.screen.colorDepth||0;mt.cookie={};
mt.cookie.set=function(a,d,e){var b;e.J&&(b=new Date,b.setTime(b.getTime()+e.J));document.cookie=a+"="+d+(e.domain?"; domain="+e.domain:"")+(e.path?"; path="+e.path:"")+(b?"; expires="+b.toGMTString():"")+(e.$a?"; secure":"")};mt.cookie.get=function(a){return(a=RegExp("(^| )"+a+"=([^;]*)(;|$)").exec(document.cookie))?a[2]:s};mt.r={};mt.r.S=function(a){return document.getElementById(a)};mt.r.Ua=function(a,d){for(d=d.toUpperCase();(a=a.parentNode)&&1==a.nodeType;)if(a.tagName==d)return a;return s};
(mt.r.O=function(){function a(){if(!a.D){a.D=r;for(var d=0,g=b.length;d<g;d++)b[d]()}}function d(){try{document.documentElement.doScroll("left")}catch(b){setTimeout(d,1);return}a()}var e=w,b=[],g;document.addEventListener?g=function(){document.removeEventListener("DOMContentLoaded",g,w);a()}:document.attachEvent&&(g=function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",g),a())});(function(){if(!e)if(e=r,"complete"===document.readyState)a.D=r;else if(document.addEventListener)document.addEventListener("DOMContentLoaded",
g,w),window.addEventListener("load",a,w);else if(document.attachEvent){document.attachEvent("onreadystatechange",g);window.attachEvent("onload",a);var b=w;try{b=window.frameElement==s}catch(n){}document.documentElement.doScroll&&b&&d()}})();return function(d){a.D?d():b.push(d)}}()).D=w;mt.event={};mt.event.c=function(a,d,e){a.attachEvent?a.attachEvent("on"+d,function(b){e.call(a,b)}):a.addEventListener&&a.addEventListener(d,e,w)};
mt.event.preventDefault=function(a){a.preventDefault?a.preventDefault():a.returnValue=w};mt.m={};mt.m.parse=function(){return(new Function('return (" + source + ")'))()};
mt.m.stringify=function(){function a(a){/["\\\x00-\x1f]/.test(a)&&(a=a.replace(/["\\\x00-\x1f]/g,function(a){var b=e[a];if(b)return b;b=a.charCodeAt();return"\\u00"+Math.floor(b/16).toString(16)+(b%16).toString(16)}));return'"'+a+'"'}function d(a){return 10>a?"0"+a:a}var e={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return function(b){switch(typeof b){case "undefined":return"undefined";case "number":return isFinite(b)?String(b):"null";case "string":return a(b);case "boolean":return String(b);
default:if(b===s)return"null";if(b instanceof Array){var g=["["],e=b.length,n,f,k;for(f=0;f<e;f++)switch(k=b[f],typeof k){case "undefined":case "function":case "unknown":break;default:n&&g.push(","),g.push(mt.m.stringify(k)),n=1}g.push("]");return g.join("")}if(b instanceof Date)return'"'+b.getFullYear()+"-"+d(b.getMonth()+1)+"-"+d(b.getDate())+"T"+d(b.getHours())+":"+d(b.getMinutes())+":"+d(b.getSeconds())+'"';n=["{"];f=mt.m.stringify;for(e in b)if(Object.prototype.hasOwnProperty.call(b,e))switch(k=
b[e],typeof k){case "undefined":case "unknown":case "function":break;default:g&&n.push(","),g=1,n.push(f(e)+":"+f(k))}n.push("}");return n.join("")}}}();mt.lang={};mt.lang.d=function(a,d){return"[object "+d+"]"==={}.toString.call(a)};mt.lang.Xa=function(a){return mt.lang.d(a,"Number")&&isFinite(a)};mt.lang.Za=function(a){return mt.lang.d(a,"String")};mt.localStorage={};
mt.localStorage.H=function(){if(!mt.localStorage.g)try{mt.localStorage.g=document.createElement("input"),mt.localStorage.g.type="hidden",mt.localStorage.g.style.display="none",mt.localStorage.g.addBehavior("#default#userData"),document.getElementsByTagName("head")[0].appendChild(mt.localStorage.g)}catch(a){return w}return r};
mt.localStorage.set=function(a,d,e){var b=new Date;b.setTime(b.getTime()+e||31536E6);try{window.localStorage?(d=b.getTime()+"|"+d,window.localStorage.setItem(a,d)):mt.localStorage.H()&&(mt.localStorage.g.expires=b.toUTCString(),mt.localStorage.g.load(document.location.hostname),mt.localStorage.g.setAttribute(a,d),mt.localStorage.g.save(document.location.hostname))}catch(g){}};
mt.localStorage.get=function(a){if(window.localStorage){if(a=window.localStorage.getItem(a)){var d=a.indexOf("|"),e=a.substring(0,d)-0;if(e&&e>(new Date).getTime())return a.substring(d+1)}}else if(mt.localStorage.H())try{return mt.localStorage.g.load(document.location.hostname),mt.localStorage.g.getAttribute(a)}catch(b){}return s};
mt.localStorage.remove=function(a){if(window.localStorage)window.localStorage.removeItem(a);else if(mt.localStorage.H())try{mt.localStorage.g.load(document.location.hostname),mt.localStorage.g.removeAttribute(a),mt.localStorage.g.save(document.location.hostname)}catch(d){}};mt.sessionStorage={};mt.sessionStorage.set=function(a,d){if(window.sessionStorage)try{window.sessionStorage.setItem(a,d)}catch(e){}};
mt.sessionStorage.get=function(a){return window.sessionStorage?window.sessionStorage.getItem(a):s};mt.sessionStorage.remove=function(a){window.sessionStorage&&window.sessionStorage.removeItem(a)};mt.Q={};mt.Q.log=function(a,d){var e=new Image,b="mini_tangram_log_"+Math.floor(2147483648*Math.random()).toString(36);window[b]=e;e.onload=e.onerror=e.onabort=function(){e.onload=e.onerror=e.onabort=s;e=window[b]=s;d&&d(a)};e.src=a};mt.G={};
mt.G.ta=function(){var a="";if(navigator.plugins&&navigator.mimeTypes.length){var d=navigator.plugins["Shockwave Flash"];d&&d.description&&(a=d.description.replace(/^.*\s+(\S+)\s+\S+$/,"$1"))}else if(window.ActiveXObject)try{if(d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))(a=d.GetVariable("$version"))&&(a=a.replace(/^.*\s+(\d+),(\d+).*$/,"$1.$2"))}catch(e){}return a};
mt.G.ga=function(a,d,e,b,g){return'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="'+a+'" width="'+e+'" height="'+b+'"><param name="movie" value="'+d+'" /><param name="flashvars" value="'+(g||"")+'" /><param name="allowscriptaccess" value="always" /><embed type="application/x-shockwave-flash" name="'+a+'" width="'+e+'" height="'+b+'" src="'+d+'" flashvars="'+(g||"")+'" allowscriptaccess="always" /></object>'};mt.url={};
mt.url.l=function(a,d){var e=a.match(RegExp("(^|&|\\?|#)("+d+")=([^&#]*)(&|$|#)",""));return e?e[3]:s};mt.url.Wa=function(a){return(a=a.match(/^(https?:)\/\//))?a[1]:s};mt.url.pa=function(a){return(a=a.match(/^(https?:\/\/)?([^\/\?#]*)/))?a[2].replace(/.*@/,""):s};mt.url.U=function(a){return(a=mt.url.pa(a))?a.replace(/:\d+$/,""):a};mt.url.Va=function(a){return(a=a.match(/^(https?:\/\/)?[^\/]*(.*)/))?a[2].replace(/[\?#].*/,"").replace(/^$/,"/"):s};
h.i={Aa:"http://tongji.baidu.com/hm-web/welcome/ico",$:"hm.baidu.com/hm.gif",da:"baidu.com",xa:"hmmd",ya:"hmpl",wa:"hmkw",ua:"hmci",za:"hmsr",va:"hmcu",w:0,o:Math.round(+new Date/1E3),protocol:"https:"===document.location.protocol?"https:":"http:",Ya:0,Qa:6E5,Ra:10,Sa:1024,Pa:1,A:2147483647,aa:"cc cf ci ck cl cm cp cu cw ds ep et fl ja ln lo lt nv rnd si st su v cv lv api u tt".split(" ")};
(function(){var a={p:{},c:function(a,e){this.p[a]=this.p[a]||[];this.p[a].push(e)},B:function(a,e){this.p[a]=this.p[a]||[];for(var b=this.p[a].length,g=0;g<b;g++)this.p[a][g](e)}};return h.s=a})();
(function(){function a(a,b){var g=document.createElement("script");g.charset="utf-8";d.d(b,"Function")&&(g.readyState?g.onreadystatechange=function(){if("loaded"===g.readyState||"complete"===g.readyState)g.onreadystatechange=s,b()}:g.onload=function(){b()});g.src=a;var l=document.getElementsByTagName("script")[0];l.parentNode.insertBefore(g,l)}var d=mt.lang;return h.load=a})();
(function(){function a(){var a="";h.b.a.nv?(a=encodeURIComponent(document.referrer),window.sessionStorage?e.set("Hm_from_"+c.id,a):d.set("Hm_from_"+c.id,a,864E5)):a=(window.sessionStorage?e.get("Hm_from_"+c.id):d.get("Hm_from_"+c.id))||"";return a}var d=mt.localStorage,e=mt.sessionStorage;return h.R=a})();
(function(){var a=h.i,d=mt.G,e={init:function(){if(""!==c.icon){var b;b=c.icon.split("|");var g=a.Aa+"?s="+c.id,e=("http:"==a.protocol?"http://eiv":"https://bs")+".baidu.com"+b[0]+"."+b[1];switch(b[1]){case "swf":b=d.ga("HolmesIcon"+a.o,e,b[2],b[3],"s="+g);break;case "gif":b='<a href="'+g+'" target="_blank"><img border="0" src="'+e+'" width="'+b[2]+'" height="'+b[3]+'"></a>';break;default:b='<a href="'+g+'" target="_blank">'+b[0]+"</a>"}document.write(b)}}};h.s.c("pv-b",e.init);return e})();
(function(){var a=mt.r,d=h.i,e=h.load,b=h.R;h.s.c("pv-b",function(){c.rec&&a.O(function(){for(var g=0,l=c.rp.length;g<l;g++){var n=c.rp[g][0],f=c.rp[g][1],k=a.S("hm_t_"+n);if(f&&!(2==f&&!k||k&&""!==k.innerHTML))k="",k=Math.round(Math.random()*d.A),k=4==f?"http://crs.baidu.com/hl.js?"+["siteId="+c.id,"planId="+n,"rnd="+k].join("&"):"http://crs.baidu.com/t.js?"+["siteId="+c.id,"planId="+n,"from="+b(),"referer="+encodeURIComponent(document.referrer),"title="+encodeURIComponent(document.title),"rnd="+
k].join("&"),e(k)}})})})();(function(){var a=h.i,d=h.load,e=h.R;h.s.c("pv-b",function(){if(c.trust&&c.vcard){var b=a.protocol+"//trust.baidu.com/vcard/v.js?"+["siteid="+c.vcard,"url="+encodeURIComponent(document.location.href),"source="+e(),"rnd="+Math.round(Math.random()*a.A),"hm=1"].join("&");d(b)}})})();
(function(){function a(){return function(){h.b.a.nv=0;h.b.a.st=4;h.b.a.et=3;h.b.a.ep=h.I.ra()+","+h.I.oa();h.b.j()}}function d(){clearTimeout(B);var a;z&&(a="visible"==document[z]);C&&(a=!document[C]);f="undefined"==typeof a?r:a;if((!n||!k)&&f&&m)u=r,p=+new Date;else if(n&&k&&(!f||!m))u=w,t+=+new Date-p;n=f;k=m;B=setTimeout(d,100)}function e(a){var k=document,p="";if(a in k)p=a;else for(var b=["webkit","ms","moz","o"],d=0;d<b.length;d++){var g=b[d]+a.charAt(0).toUpperCase()+a.slice(1);if(g in k){p=
g;break}}return p}function b(a){if(!("focus"==a.type||"blur"==a.type)||!(a.target&&a.target!=window))m="focus"==a.type||"focusin"==a.type?r:w,d()}var g=mt.event,l=h.s,n=r,f=r,k=r,m=r,v=+new Date,p=v,t=0,u=r,z=e("visibilityState"),C=e("hidden"),B;d();(function(){var a=z.replace(/[vV]isibilityState/,"visibilitychange");g.c(document,a,d);g.c(window,"pageshow",d);g.c(window,"pagehide",d);"object"==typeof document.onfocusin?(g.c(document,"focusin",b),g.c(document,"focusout",b)):(g.c(window,"focus",b),
g.c(window,"blur",b))})();h.I={ra:function(){return+new Date-v},oa:function(){return u?+new Date-p+t:t}};l.c("pv-b",function(){g.c(window,"unload",a())});return h.I})();
(function(){var a=mt.lang,d=h.i,e=h.load,b={Ca:function(b){if((window._dxt===q||a.d(window._dxt,"Array"))&&"undefined"!==typeof h.b){var l=h.b.K();e([d.protocol,"//datax.baidu.com/x.js?si=",c.id,"&dm=",encodeURIComponent(l)].join(""),b)}},Na:function(b){if(a.d(b,"String")||a.d(b,"Number"))window._dxt=window._dxt||[],window._dxt.push(["_setUserId",b])}};return h.ha=b})();
(function(){function a(k){for(var b in k)if({}.hasOwnProperty.call(k,b)){var d=k[b];e.d(d,"Object")||e.d(d,"Array")?a(d):k[b]=String(d)}}function d(a){return a.replace?a.replace(/'/g,"'0").replace(/\*/g,"'1").replace(/!/g,"'2"):a}var e=mt.lang,b=mt.m,g=h.i,l=h.s,n=h.ha,f={z:[],F:0,Y:w,init:function(){f.e=0;l.c("pv-b",function(){f.ia();f.la()});l.c("pv-d",f.ma);l.c("stag-b",function(){h.b.a.api=f.e||f.F?f.e+"_"+f.F:""});l.c("stag-d",function(){h.b.a.api=0;f.e=0;f.F=0})},ia:function(){var a=window._hmt||
[];if(!a||e.d(a,"Array"))window._hmt={id:c.id,cmd:{},push:function(){for(var a=window._hmt,k=0;k<arguments.length;k++){var p=arguments[k];e.d(p,"Array")&&(a.cmd[a.id].push(p),"_setAccount"===p[0]&&(1<p.length&&/^[0-9a-f]{32}$/.test(p[1]))&&(p=p[1],a.id=p,a.cmd[p]=a.cmd[p]||[]))}}},window._hmt.cmd[c.id]=[],window._hmt.push.apply(window._hmt,a)},la:function(){var a=window._hmt;if(a&&a.cmd&&a.cmd[c.id])for(var b=a.cmd[c.id],d=/^_track(Event|MobConv|Order|RTEvent)$/,p=0,g=b.length;p<g;p++){var e=b[p];
d.test(e[0])?f.z.push(e):f.N(e)}a.cmd[c.id]={push:f.N}},ma:function(){if(0<f.z.length)for(var a=0,b=f.z.length;a<b;a++)f.N(f.z[a]);f.z=s},N:function(a){var b=a[0];if(f.hasOwnProperty(b)&&e.d(f[b],"Function"))f[b](a)},_setAccount:function(a){1<a.length&&/^[0-9a-f]{32}$/.test(a[1])&&(f.e|=1)},_setAutoPageview:function(a){if(1<a.length&&(a=a[1],w===a||r===a))f.e|=2,h.b.V=a},_trackPageview:function(a){if(1<a.length&&a[1].charAt&&"/"===a[1].charAt(0)){f.e|=4;h.b.a.et=0;h.b.a.ep="";h.b.L?(h.b.a.nv=0,h.b.a.st=
4):h.b.L=r;var b=h.b.a.u,d=h.b.a.su;h.b.a.u=g.protocol+"//"+document.location.host+a[1];f.Y||(h.b.a.su=document.location.href);h.b.j();h.b.a.u=b;h.b.a.su=d}},_trackEvent:function(a){2<a.length&&(f.e|=8,h.b.a.nv=0,h.b.a.st=4,h.b.a.et=4,h.b.a.ep=d(a[1])+"*"+d(a[2])+(a[3]?"*"+d(a[3]):"")+(a[4]?"*"+d(a[4]):""),h.b.j())},_setCustomVar:function(a){if(!(4>a.length)){var b=a[1],e=a[4]||3;if(0<b&&6>b&&0<e&&4>e){f.F++;for(var p=(h.b.a.cv||"*").split("!"),g=p.length;g<b-1;g++)p.push("*");p[b-1]=e+"*"+d(a[2])+
"*"+d(a[3]);h.b.a.cv=p.join("!");a=h.b.a.cv.replace(/[^1](\*[^!]*){2}/g,"*").replace(/((^|!)\*)+$/g,"");""!==a?h.b.setData("Hm_cv_"+c.id,encodeURIComponent(a),c.age):h.b.Fa("Hm_cv_"+c.id)}}},_setReferrerOverride:function(a){1<a.length&&(h.b.a.su=a[1].charAt&&"/"===a[1].charAt(0)?g.protocol+"//"+window.location.host+a[1]:a[1],f.Y=r)},_trackOrder:function(d){d=d[1];e.d(d,"Object")&&(a(d),f.e|=16,h.b.a.nv=0,h.b.a.st=4,h.b.a.et=94,h.b.a.ep=b.stringify(d),h.b.j())},_trackMobConv:function(a){if(a={webim:1,
tel:2,map:3,sms:4,callback:5,share:6}[a[1]])f.e|=32,h.b.a.et=93,h.b.a.ep=a,h.b.j()},_trackRTPageview:function(d){d=d[1];e.d(d,"Object")&&(a(d),d=b.stringify(d),512>=encodeURIComponent(d).length&&(f.e|=64,h.b.a.rt=d))},_trackRTEvent:function(d){d=d[1];if(e.d(d,"Object")){a(d);d=encodeURIComponent(b.stringify(d));var m=function(a){var b=h.b.a.rt;f.e|=128;h.b.a.et=90;h.b.a.rt=a;h.b.j();h.b.a.rt=b},l=d.length;if(900>=l)m.call(this,d);else for(var l=Math.ceil(l/900),p="block|"+Math.round(Math.random()*
g.A).toString(16)+"|"+l+"|",t=[],u=0;u<l;u++)t.push(u),t.push(d.substring(900*u,900*u+900)),m.call(this,p+t.join("|")),t=[]}},_setUserId:function(a){a=a[1];n.Ca();n.Na(a)}};f.init();h.ea=f;return h.ea})();
(function(){function a(){"undefined"===typeof window["_bdhm_loaded_"+c.id]&&(window["_bdhm_loaded_"+c.id]=r,this.a={},this.V=r,this.L=w,this.init())}var d=mt.url,e=mt.Q,b=mt.G,g=mt.lang,l=mt.cookie,n=mt.k,f=mt.localStorage,k=mt.sessionStorage,m=h.i,v=h.s;a.prototype={M:function(a,b){a="."+a.replace(/:\d+/,"");b="."+b.replace(/:\d+/,"");var d=a.indexOf(b);return-1<d&&d+b.length===a.length},Z:function(a,b){a=a.replace(/^https?:\/\//,"");return 0===a.indexOf(b)},C:function(a){for(var b=0;b<c.dm.length;b++)if(-1<
c.dm[b].indexOf("/")){if(this.Z(a,c.dm[b]))return r}else{var e=d.U(a);if(e&&this.M(e,c.dm[b]))return r}return w},K:function(){for(var a=document.location.hostname,b=0,d=c.dm.length;b<d;b++)if(this.M(a,c.dm[b]))return c.dm[b].replace(/(:\d+)?[\/\?#].*/,"");return a},T:function(){for(var a=0,b=c.dm.length;a<b;a++){var d=c.dm[a];if(-1<d.indexOf("/")&&this.Z(document.location.href,d))return d.replace(/^[^\/]+(\/.*)/,"$1")+"/"}return"/"},sa:function(){if(!document.referrer)return m.o-m.w>c.vdur?1:4;var a=
w;this.C(document.referrer)&&this.C(document.location.href)?a=r:(a=d.U(document.referrer),a=this.M(a||"",document.location.hostname));return a?m.o-m.w>c.vdur?1:4:3},getData:function(a){try{return l.get(a)||k.get(a)||f.get(a)}catch(b){}},setData:function(a,b,d){try{l.set(a,b,{domain:this.K(),path:this.T(),J:d}),d?f.set(a,b,d):k.set(a,b)}catch(e){}},Fa:function(a){try{l.set(a,"",{domain:this.K(),path:this.T(),J:-1}),k.remove(a),f.remove(a)}catch(b){}},La:function(){var a,b,d,e,g;m.w=this.getData("Hm_lpvt_"+
c.id)||0;13===m.w.length&&(m.w=Math.round(m.w/1E3));b=this.sa();a=4!==b?1:0;if(d=this.getData("Hm_lvt_"+c.id)){e=d.split(",");for(g=e.length-1;0<=g;g--)13===e[g].length&&(e[g]=""+Math.round(e[g]/1E3));for(;2592E3<m.o-e[0];)e.shift();g=4>e.length?2:3;for(1===a&&e.push(m.o);4<e.length;)e.shift();d=e.join(",");e=e[e.length-1]}else d=m.o,e="",g=1;this.setData("Hm_lvt_"+c.id,d,c.age);this.setData("Hm_lpvt_"+c.id,m.o);d=m.o===this.getData("Hm_lpvt_"+c.id)?"1":"0";if(0===c.nv&&this.C(document.location.href)&&
(""===document.referrer||this.C(document.referrer)))a=0,b=4;this.a.nv=a;this.a.st=b;this.a.cc=d;this.a.lt=e;this.a.lv=g},Ja:function(){for(var a=[],b=this.a.et,d=0,e=m.aa.length;d<e;d++){var g=m.aa[d],f=this.a[g];"undefined"!==typeof f&&""!==f&&("tt"!==g||"tt"===g&&0===b)&&a.push(g+"="+encodeURIComponent(f))}this.a.rt&&(0===b?a.push("rt="+encodeURIComponent(this.a.rt)):90===b&&a.push("rt="+this.a.rt));return a.join("&")},Ma:function(){this.La();this.a.si=c.id;this.a.su=document.referrer;this.a.ds=
n.Ga;this.a.cl=n.colorDepth+"-bit";this.a.ln=n.language;this.a.ja=n.javaEnabled?1:0;this.a.ck=n.cookieEnabled?1:0;this.a.lo="number"===typeof _bdhm_top?1:0;this.a.fl=b.ta();this.a.v="1.1.26";this.a.cv=decodeURIComponent(this.getData("Hm_cv_"+c.id)||"");this.a.tt=document.title||"";var a=document.location.href;this.a.cm=d.l(a,m.xa)||"";this.a.cp=d.l(a,m.ya)||"";this.a.cw=d.l(a,m.wa)||"";this.a.ci=d.l(a,m.ua)||"";this.a.cf=d.l(a,m.za)||"";this.a.cu=d.l(a,m.va)||""},init:function(){try{this.Ma(),0===
this.a.nv?this.Ia():this.P(".*"),h.b=this,this.fa(),v.B("pv-b"),this.Ha()}catch(a){var b=[];b.push("si="+c.id);b.push("n="+encodeURIComponent(a.name));b.push("m="+encodeURIComponent(a.message));b.push("r="+encodeURIComponent(document.referrer));e.log(m.protocol+"//"+m.$+"?"+b.join("&"))}},Ha:function(){function a(){v.B("pv-d")}this.V?(this.L=r,this.a.et=0,this.a.ep="",this.j(a)):a()},j:function(a){var b=this;b.a.rnd=Math.round(Math.random()*m.A);v.B("stag-b");var d=m.protocol+"//"+m.$+"?"+b.Ja();
v.B("stag-d");b.ca(d);e.log(d,function(d){b.P(d);g.d(a,"Function")&&a.call(b)})},fa:function(){var a=document.location.hash.substring(1),b=RegExp(c.id),e=-1<document.referrer.indexOf(m.da),g=d.l(a,"jn"),f=/^heatlink$|^select$/.test(g);a&&(b.test(a)&&e&&f)&&(this.a.rnd=Math.round(Math.random()*m.A),a=document.createElement("script"),a.setAttribute("type","text/javascript"),a.setAttribute("charset","utf-8"),a.setAttribute("src",m.protocol+"//"+c.js+g+".js?"+this.a.rnd),g=document.getElementsByTagName("script")[0],
g.parentNode.insertBefore(a,g))},ca:function(a){var b=k.get("Hm_unsent_"+c.id)||"",d=this.a.u?"":"&u="+encodeURIComponent(document.location.href),b=encodeURIComponent(a.replace(/^https?:\/\//,"")+d)+(b?","+b:"");k.set("Hm_unsent_"+c.id,b)},P:function(a){var b=k.get("Hm_unsent_"+c.id)||"";b&&(a=encodeURIComponent(a.replace(/^https?:\/\//,"")),a=RegExp(a.replace(/([\*\(\)])/g,"\\$1")+"(%26u%3D[^,]*)?,?","g"),(b=b.replace(a,"").replace(/,$/,""))?k.set("Hm_unsent_"+c.id,b):k.remove("Hm_unsent_"+c.id))},
Ia:function(){var a=this,b=k.get("Hm_unsent_"+c.id);if(b)for(var b=b.split(","),d=function(b){e.log(m.protocol+"//"+decodeURIComponent(b),function(b){a.P(b)})},g=0,f=b.length;g<f;g++)d(b[g])}};return new a})();var x=h.i,y=h.load;if(c.apps){var A=[x.protocol,"//ers.baidu.com/app/s.js?"];A.push(c.apps);y(A.join(""))}var D=h.i,E=h.load;if(c.conv&&"http:"===D.protocol){var F=["http://page.baidu.com/conversion_js.php?sid="];F.push(c.conv);E(F.join(""))}var G=h.i,H=h.load;
c.lxb&&H([G.protocol,"//lxbjs.baidu.com/lxb.js?sid=",c.lxb].join(""));var I=h.load,J=h.i.protocol;if(c.qiao){for(var K=[J+"//goutong.baidu.com/site/"],L=c.id,M=5381,N=L.length,O=0;O<N;O++)M=(33*M+Number(L.charCodeAt(O)))%4294967296;2147483648<M&&(M-=2147483648);K.push(M%1E3+"/");K.push(c.id+"/b.js");K.push("?siteId="+c.qiao);I(K.join(""))}
(function(){var a=mt.r,d=mt.event,e=mt.url,b=mt.m;try{if(window.performance&&performance.timing&&"undefined"!==typeof h.b){var g=+new Date,l=function(a){var b=performance.timing,d=b[a+"Start"]?b[a+"Start"]:0;a=b[a+"End"]?b[a+"End"]:0;return{start:d,end:a,value:0<a-d?a-d:0}},n=s;a.O(function(){n=+new Date});var f=function(){var a,d,f;f=l("navigation");d=l("request");f={netAll:d.start-f.start,netDns:l("domainLookup").value,netTcp:l("connect").value,srv:l("response").start-d.start,dom:performance.timing.domInteractive-
performance.timing.fetchStart,loadEvent:l("loadEvent").end-f.start};a=document.referrer;var k=a.match(/^(http[s]?:\/\/)?([^\/]+)(.*)/)||[],u=s;d=s;if("www.baidu.com"===k[2]||"m.baidu.com"===k[2])u=e.l(a,"qid"),d=e.l(a,"click_t");a=u;f.qid=a!=s?a:"";d!=s?(f.bdDom=n?n-d:0,f.bdRun=g-d,f.bdDef=l("navigation").start-d):(f.bdDom=0,f.bdRun=0,f.bdDef=0);h.b.a.et=87;h.b.a.ep=b.stringify(f);h.b.j()};d.c(window,"load",function(){setTimeout(f,500)})}}catch(k){}})();
(function(){var a=h.i,d={init:function(){try{if("http:"===a.protocol){var b=document.createElement("IFRAME");b.setAttribute("src","http://boscdn.bpc.baidu.com/v1/holmes-moplus/mp-cdn.html");b.style.display="none";b.style.width="1";b.style.height="1";b.Ta="0";document.body.appendChild(b)}}catch(d){}}},e=navigator.userAgent.toLowerCase();-1<e.indexOf("android")&&-1===e.indexOf("micromessenger")&&d.init()})();
(function(){var a=mt.k,d=mt.lang,e=mt.event,b=mt.m;if("undefined"!==typeof h.b&&(c.med||(!a.W||7<a.Ba)&&c.cvcc)){var g,l,n,f,k=function(a){if(a.item){for(var b=a.length,d=Array(b);b--;)d[b]=a[b];return d}return[].slice.call(a)},m=function(a,b){for(var d in a)if(a.hasOwnProperty(d)&&b.call(a,d,a[d])===w)return w},v=function(a,e){var f={};f.n=g;f.t="clk";f.v=a;if(e){var l=e.getAttribute("href"),k=e.getAttribute("onclick")?""+e.getAttribute("onclick"):s,m=e.getAttribute("id")||"";n.test(l)?(f.sn="mediate",
f.snv=l):d.d(k,"String")&&n.test(k)&&(f.sn="wrap",f.snv=k);f.id=m}h.b.a.et=86;h.b.a.ep=b.stringify(f);h.b.j();for(f=+new Date;400>=+new Date-f;);};if(c.med)l="/zoosnet",g="swt",n=/swt|zixun|call|chat|zoos|business|talk|kefu|openkf|online|\/LR\/Chatpre\.aspx/i,f={click:function(){for(var a=[],b=k(document.getElementsByTagName("a")),b=[].concat.apply(b,k(document.getElementsByTagName("area"))),b=[].concat.apply(b,k(document.getElementsByTagName("img"))),d,e,g=0,f=b.length;g<f;g++)d=b[g],e=d.getAttribute("onclick"),
d=d.getAttribute("href"),(n.test(e)||n.test(d))&&a.push(b[g]);return a}};else if(c.cvcc){l="/other-comm";g="other";n=c.cvcc.q||q;var p=c.cvcc.id||q;f={click:function(){for(var a=[],b=k(document.getElementsByTagName("a")),b=[].concat.apply(b,k(document.getElementsByTagName("area"))),b=[].concat.apply(b,k(document.getElementsByTagName("img"))),d,e,g,f=0,l=b.length;f<l;f++)d=b[f],n!==q?(e=d.getAttribute("onclick"),g=d.getAttribute("href"),p?(d=d.getAttribute("id"),(n.test(e)||n.test(g)||p.test(d))&&
a.push(b[f])):(n.test(e)||n.test(g))&&a.push(b[f])):p!==q&&(d=d.getAttribute("id"),p.test(d)&&a.push(b[f]));return a}}}if("undefined"!==typeof f&&"undefined"!==typeof n){var t;l+=/\/$/.test(l)?"":"/";var u=function(a,b){if(t===b)return v(l+a,b),w;if(d.d(b,"Array")||d.d(b,"NodeList"))for(var e=0,g=b.length;e<g;e++)if(t===b[e])return v(l+a+"/"+(e+1),b[e]),w};e.c(document,"mousedown",function(a){a=a||window.event;t=a.target||a.srcElement;var b={};for(m(f,function(a,e){b[a]=d.d(e,"Function")?e():document.getElementById(e)});t&&
t!==document&&m(b,u)!==w;)t=t.parentNode})}}})();(function(){var a=mt.r,d=mt.lang,e=mt.event,b=mt.m;if("undefined"!==typeof h.b&&d.d(c.cvcf,"Array")&&0<c.cvcf.length){var g={ba:function(){for(var b=c.cvcf.length,d,f=0;f<b;f++)(d=a.S(decodeURIComponent(c.cvcf[f])))&&e.c(d,"click",g.ka())},ka:function(){return function(){h.b.a.et=86;var a={n:"form",t:"clk"};a.id=this.id;h.b.a.ep=b.stringify(a);h.b.j()}}};a.O(function(){g.ba()})}})();
(function(){var a=mt.event,d=mt.m;if(c.med&&"undefined"!==typeof h.b){var e=+new Date,b={n:"anti",sb:0,kb:0,clk:0},g=function(){h.b.a.et=86;h.b.a.ep=d.stringify(b);h.b.j()};a.c(document,"click",function(){b.clk++});a.c(document,"keyup",function(){b.kb=1});a.c(window,"scroll",function(){b.sb++});a.c(window,"unload",function(){b.t=+new Date-e;g()});a.c(window,"load",function(){setTimeout(g,5E3)})}})();
(function(){function a(){this.f=s}var d=mt.Q,e=mt.k;a.prototype={Da:function(a){if(this.f)this.h(a,0);else if(this.isSupported()){try{this.f=new ActiveXObject("BDEXIE.BDExExtension.1"),this.X=r}catch(b){this.X=w}this.X?this.h(a,0):this.h(a,-1)}else this.h(a,-1)},Oa:function(){this.f&&delete this.f;this.f=s},Ka:function(a,b,d){if(this.f&&"SetLocalCache"in this.f)try{this.f.SetLocalCache(a,b)===q&&this.h(d,0)}catch(e){this.h(d,-1)}else this.h(d,-1)},qa:function(a,b){if(this.f&&"GetLocalCache"in this.f)try{this.h(b,
this.f.GetLocalCache(a))}catch(d){this.h(b,"")}else this.h(b,"")},na:function(a){if(this.f&&"GetCryptStr"in this.f)try{this.h(a,this.f.GetCryptStr("strEncryptID1"))}catch(b){this.h(a,"")}else this.h(a,"")},h:function(a,b){"function"===typeof a&&a(b,this)},isSupported:function(){if(window.ActiveXObject||"ActiveXObject"in window)try{return!!new ActiveXObject("BDEXIE.BDExExtension.1")}catch(a){}return w},Ea:function(){var a=this;this.na(function(b){b!==q&&""!==b&&(d.log("//datax.baidu.com/x.gif?dm="+
encodeURIComponent("datax.baidu.com/webadapter/guid")+"&ac="+encodeURIComponent(b)+"&v=hm-webadapter-0.0.1&rnd="+Math.round(2147483647*Math.random())),a.Ka("hmKey",+new Date,function(){a.Oa()}))})}};if(e.W&&/^http(s)?:$/.test(document.location.protocol)){var b=new a;b.Da(function(a){0===a&&b.qa("hmKey",function(a){a=+a;(isNaN(a)||6048E5<+new Date-a)&&b.Ea()})})}})();})();
