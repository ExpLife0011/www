var BDBridgeConfig=(function(){var self;var arrPQiao=["http:\/\/p.qiao.baidu.com\/","http:\/\/p0.qiao.baidu.com\/","http:\/\/p1.qiao.baidu.com\/","http:\/\/p2.qiao.baidu.com\/","http:\/\/p3.qiao.baidu.com\/","http:\/\/p4.qiao.baidu.com\/","http:\/\/p5.qiao.baidu.com\/","http:\/\/p6.qiao.baidu.com\/","http:\/\/p7.qiao.baidu.com\/","http:\/\/p8.qiao.baidu.com\/","http:\/\/p9.qiao.baidu.com\/"];var randomUrl=function(array){var tag=Math.floor(Math.random()*array.length);return array[tag];};var shuffle=function(){var tag=Math.floor(Math.random()*arrPQiao.length);var url=arrPQiao[tag];if(arrPQiao.length>1){arrPQiao.splice(tag,1);}
return url;}
var CONFIG={BD_BRIDGE_OPEN:1,BD_BRIDGE_ROOT:randomUrl(["http:\/\/qiao.baidu.com\/v3\/"]),BD_BRIDGE_RCV_ROOT:shuffle(),BD_BRIDGE_IM_ROOT:shuffle(),VERSION:"3.0.0"};if(BDBridgeConfig&&BDBridgeConfig.VERSION>=CONFIG.VERSION){return BDBridgeConfig;}
if(CONFIG.BD_BRIDGE_OPEN==1){var script=document.createElement("script");script.type="text/javascript";script.charset="UTF-8";script.src=CONFIG.BD_BRIDGE_ROOT+"asset/front/bsl.js?t="+(+new Date());document.getElementsByTagName("head")[0].appendChild(script);}
var timeStart=new Date().getTime();return self={TIME_START:timeStart,VERSION:CONFIG.VERSION,OPEN:CONFIG.BD_BRIDGE_OPEN,ROOT:CONFIG.BD_BRIDGE_ROOT,RCV_ROOT:CONFIG.BD_BRIDGE_RCV_ROOT,IM_ROOT:CONFIG.BD_BRIDGE_IM_ROOT,BD_BRIDGE_DATA:{mainid:"120346393",SITE_ID:"c64c3fae8bee0db7167e50b03190f8af",siteid:"1387671",ucid:"3818987",userName:'木鱼网络mywl'},OPEN_MODULES:"00000",JS_LOADER_URL:CONFIG.BD_BRIDGE_ROOT+'asset/front/entry/',CSS_DEFAULT_URL:'http://s.qiao.baidu.com/asset/front/css/default/',CSS_LOADER_URL:"http://s.qiao.baidu.com/style/393/120346393/",BD_BRIDGE_SPECIAL:[],BD_BRIDGE_STYLE_ITEM:[{pageid:"0",styleid:"1"-0,BD_BRIDGE_GROUP:['0'-0],BD_BRIDGE_ICON:{iconlevel:"1"-0,icontype:"0"-0,iconposition:{postype:"1"-0,position:"3"-0},iconskin:{useOfflineimg:"0"-0},iconmode:"0"-0},BD_BRIDGE_INVITE:{text:"<p style=\"font-size:12px;font-family:宋体;font-color:#000000;\">欢迎您，有什么可以帮助您的么？<\/p>",type:'0',way:("0"*Math.pow(2,0))+("1"*Math.pow(2,1)),page:'0'-0,interval:'30'-0,disap:'3'-0,time:'10'-0},BD_BRIDGE_WEBIM:{webimtype:'0'-0,webimchat:{showtype:'2'-0,name:''},webimposition:'2'-0,webimlitebgcolor:'#d5d5d5'},BD_BRIDGE_MESS:{messItem:{messItemName:'2'-0,messItemPhone:'2'-0,messItemAddress:'2'-0,messItemEmail:'2'-0,messItemText:'1'-0,language:'0'-0},messType:{disableMess:'1'-0},messShow:{messFloatType:'0'-0},extraMessItems:[]}}]}})();