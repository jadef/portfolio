var $=$.noConflict();$(document).ready(function(){function t(t){$("#scroller #slide img").fadeOut("500"),$("#modal-description").empty().html(a[t][2]),$("#modal-footnote").empty().html(a[t][3]),$("#scroller #slide").addClass("loading").attr("title",a[t][0]).html('<img src="'+a[t][1]+'" alt="'+a[t][0]+'" />'),$("#navigation .current").removeClass("current"),$("#navigation .thumbnail."+t).addClass("current"),$("#scroller #slide img").load(function(){if($(window).width()<1056)c=$("#modal-title").outerHeight()+$("#launch").outerHeight()+$("#navigation").outerHeight()+$("#modal-description").outerHeight()+$("#modal-footnote").outerHeight()+$("#scroller #slide img").outerHeight()+8;else{var t=Math.max($("#modal-description").outerHeight(),$("#navigation").outerHeight());c=$("#modal-title").outerHeight()+t+$("#modal-footnote").outerHeight()+$("#scroller #slide img").outerHeight()+8}$("#scroller #slide").removeClass("loading"),$("#modal-content").animate({height:c},600,function(){$("#scroller #slide img").fadeIn("500")})})}$(function(){$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var t=$(this.hash);if(t=t.length?t:$("[name="+this.hash.slice(1)+"]"),t.length)return $("html,body").stop(!1,!1).animate({scrollTop:t.offset().top-50},1e3),!1}})});var e,n,i,o,a,r,s,l,c,d,u;if(a=new Array,$("#what .thumb").click(function(c){c.preventDefault();var h=$(this).attr("rel");$("#overlay").is(":empty")&&$("#overlay").append('<div id="modal-content"><div id="modal-title"></div><div id="launch"></div><a href="#" class="close"><span>&#xf00d;</span> Close</a><div id="modal-data"><div id="scroller"><div id="navigation"></div><div id="modal-description"></div><div id="modal-footnote"></div><div id="slide"></div></div></div></div>'),$.ajax({type:"GET",url:"/portfolio/"+h+"/control.xml",dataType:"xml",success:function(c){a.length=0,$(c).find("fulltitle").each(function(){e=$(this).text(),$("#modal-title").empty().html(e)}),$(c).find("subtitle").each(function(){n=$(this).text(),""!==n&&$("#modal-title").append("<span>"+n+"</span>")}),$(c).find("link").each(function(){s=$(this).text(),""!==s&&$("#launch").html('<a href="'+s+'" id="site-launch" target="_blank">Launch Site</a>')}),$(c).find("slide").each(function(){d=$(this).attr("id"),r=$(this).find("title").text(),l="/portfolio/"+h+"/images/"+$(this).find("image").text(),u="/portfolio/"+h+"/thumbs/"+$(this).find("image").text(),i=$(this).find("description").text(),o=$(this).find("footnote").text(),a[d]=new Array(r,l,i,o),$("#navigation").append('<a href="'+d+'" class="'+d+' thumbnail"><img src="'+u+'" /></a>')}),d=1,$("#scroller").prepend('<a href="#" class="nav-lft">&#xf104;</a>'),$("#scroller").append('<a href="#" class="nav-rt">&#xf105;</a>'),$("#navigation .thumbnail").click(function(e){e.preventDefault(),d=$(this).attr("href"),t(d)}),$("#scroller .nav-lft").click(function(e){e.preventDefault(),d--,d<1&&(d=a.length-1),t(d)}),$("#scroller .nav-rt").click(function(e){e.preventDefault(),d++,d>a.length-1&&(d=1),t(d)})}}),$("#overlay").fadeIn(500,function(){$("#modal-content").css("top",$(window).scrollTop()+"px").slideDown(500,function(){$("#modal-data").slideDown(500,function(){t(d)})})})}),$(document.body).on("click","#overlay, #overlay .close",function(t){t.preventDefault(),$("#modal-content").slideUp(500,function(){$("#overlay").fadeOut("500").empty()})}),$(document.body).on("click","#overlay > *",function(t){t.stopPropagation()}),$("header nav").length){0===$(window).scrollTop()&&$("nav").css("top","0"),$("nav").css("background-image",'url("images/pointer.png")');var h=$("#what").offset().top,p=$("#where").offset().top,f=$("#how").offset().top,m=0;$(window).scroll(function(){var t=$(this).scrollTop();t<m?$("nav").css("top","0"):$("nav").css("top",""),m=t,$(window).scrollTop()<h-51?$("nav").css("background-position","12.5% bottom"):$(window).scrollTop()<p-51?$("nav").css("background-position","37.5% bottom"):$(window).scrollTop()<f-51?$("nav").css("background-position","62.5% bottom"):$(window).scrollTop()>=f-51&&$("nav").css("background-position","87.5% bottom")})}var g,v,y;g="mailto:",v="jfaist.com",y="jade@",$(".email").attr("href",g+y+v).attr("title","Email Me").html("<span>&#xf0e0;</span> email me")}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){var e,n,i=[],o=t(document),a=navigator.userAgent.toLowerCase(),r=t(window),s=[],l=null,c=/msie/.test(a)&&!/opera/.test(a),d=/opera/.test(a);e=c&&/msie 6./.test(a)&&"object"!=typeof window.XMLHttpRequest,n=c&&/msie 7.0/.test(a),t.modal=function(e,n){return t.modal.impl.init(e,n)},t.modal.close=function(){t.modal.impl.close()},t.modal.focus=function(e){t.modal.impl.focus(e)},t.modal.setContainerDimensions=function(){t.modal.impl.setContainerDimensions()},t.modal.setPosition=function(){t.modal.impl.setPosition()},t.modal.update=function(e,n){t.modal.impl.update(e,n)},t.fn.modal=function(e){return t.modal.impl.init(this,e)},t.modal.defaults={appendTo:"body",focus:!0,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:!1,autoPosition:!0,zIndex:1e3,close:!0,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:"simplemodal-close",escClose:!0,overlayClose:!1,fixed:!0,position:null,persist:!1,modal:!0,onOpen:null,onShow:null,onClose:null},t.modal.impl={d:{},init:function(e,n){if(this.d.data)return!1;if(l=c&&!t.support.boxModel,this.o=t.extend({},t.modal.defaults,n),this.zIndex=this.o.zIndex,this.occb=!1,"object"==typeof e)e=e instanceof t?e:t(e),this.d.placeholder=!1,0<e.parent().parent().size()&&(e.before(t("<span></span>").attr("id","simplemodal-placeholder").css({display:"none"})),this.d.placeholder=!0,this.display=e.css("display"),!this.o.persist)&&(this.d.orig=e.clone(!0));else{if("string"!=typeof e&&"number"!=typeof e)return alert("SimpleModal Error: Unsupported data type: "+typeof e),this;e=t("<div></div>").html(e)}return this.create(e),this.open(),t.isFunction(this.o.onShow)&&this.o.onShow.apply(this,[this.d]),this},create:function(n){this.getDimensions(),this.o.modal&&e&&(this.d.iframe=t('<iframe src="javascript:false;"></iframe>').css(t.extend(this.o.iframeCss,{display:"none",opacity:0,position:"fixed",height:s[0],width:s[1],zIndex:this.o.zIndex,top:0,left:0})).appendTo(this.o.appendTo)),this.d.overlay=t("<div></div>").attr("id",this.o.overlayId).addClass("simplemodal-overlay").css(t.extend(this.o.overlayCss,{display:"none",opacity:this.o.opacity/100,height:this.o.modal?i[0]:0,width:this.o.modal?i[1]:0,position:"fixed",left:0,top:0,zIndex:this.o.zIndex+1})).appendTo(this.o.appendTo),this.d.container=t("<div></div>").attr("id",this.o.containerId).addClass("simplemodal-container").css(t.extend({position:this.o.fixed?"fixed":"absolute"},this.o.containerCss,{display:"none",zIndex:this.o.zIndex+2})).append(this.o.close&&this.o.closeHTML?t(this.o.closeHTML).addClass(this.o.closeClass):"").appendTo(this.o.appendTo),this.d.wrap=t("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(this.d.container),this.d.data=n.attr("id",n.attr("id")||this.o.dataId).addClass("simplemodal-data").css(t.extend(this.o.dataCss,{display:"none"})).appendTo("body"),this.setContainerDimensions(),this.d.data.appendTo(this.d.wrap),(e||l)&&this.fixIE()},bindEvents:function(){var n=this;t("."+n.o.closeClass).bind("click.simplemodal",function(t){t.preventDefault(),n.close()}),n.o.modal&&n.o.close&&n.o.overlayClose&&n.d.overlay.bind("click.simplemodal",function(t){t.preventDefault(),n.close()}),o.bind("keydown.simplemodal",function(t){n.o.modal&&9===t.keyCode?n.watchTab(t):n.o.close&&n.o.escClose&&27===t.keyCode&&(t.preventDefault(),n.close())}),r.bind("resize.simplemodal orientationchange.simplemodal",function(){n.getDimensions(),n.o.autoResize?n.setContainerDimensions():n.o.autoPosition&&n.setPosition(),e||l?n.fixIE():n.o.modal&&(n.d.iframe&&n.d.iframe.css({height:s[0],width:s[1]}),n.d.overlay.css({height:i[0],width:i[1]}))})},unbindEvents:function(){t("."+this.o.closeClass).unbind("click.simplemodal"),o.unbind("keydown.simplemodal"),r.unbind(".simplemodal"),this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var e=this.o.position;t.each([this.d.iframe||null,this.o.modal?this.d.overlay:null,"fixed"===this.d.container.css("position")?this.d.container:null],function(t,n){if(n){var i=n[0].style;if(i.position="absolute",2>t)i.removeExpression("height"),i.removeExpression("width"),i.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'),i.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');else{var o,a;e&&e.constructor===Array?(o=e[0]?"number"==typeof e[0]?e[0].toString():e[0].replace(/px/,""):n.css("top").replace(/px/,""),o=-1===o.indexOf("%")?o+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(o.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',e[1]&&(a="number"==typeof e[1]?e[1].toString():e[1].replace(/px/,""),a=-1===a.indexOf("%")?a+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(a.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')):(o='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',a='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"'),i.removeExpression("top"),i.removeExpression("left"),i.setExpression("top",o),i.setExpression("left",a)}}})},focus:function(e){var n=this,e=e&&-1!==t.inArray(e,["first","last"])?e:"first",i=t(":input:enabled:visible:"+e,n.d.wrap);setTimeout(function(){0<i.length?i.focus():n.d.wrap.focus()},10)},getDimensions:function(){var t="undefined"==typeof window.innerHeight?r.height():window.innerHeight;i=[o.height(),o.width()],s=[t,r.width()]},getVal:function(t,e){return t?"number"==typeof t?t:"auto"===t?0:0<t.indexOf("%")?parseInt(t.replace(/%/,""))/100*("h"===e?s[0]:s[1]):parseInt(t.replace(/px/,"")):null},update:function(t,e){return!!this.d.data&&(this.d.origHeight=this.getVal(t,"h"),this.d.origWidth=this.getVal(e,"w"),this.d.data.hide(),t&&this.d.container.css("height",t),e&&this.d.container.css("width",e),this.setContainerDimensions(),this.d.data.show(),this.o.focus&&this.focus(),this.unbindEvents(),void this.bindEvents())},setContainerDimensions:function(){var t=e||n,i=this.d.origHeight?this.d.origHeight:d?this.d.container.height():this.getVal(t?this.d.container[0].currentStyle.height:this.d.container.css("height"),"h"),t=this.d.origWidth?this.d.origWidth:d?this.d.container.width():this.getVal(t?this.d.container[0].currentStyle.width:this.d.container.css("width"),"w"),o=this.d.data.outerHeight(!0),a=this.d.data.outerWidth(!0);this.d.origHeight=this.d.origHeight||i,this.d.origWidth=this.d.origWidth||t;var r=this.o.maxHeight?this.getVal(this.o.maxHeight,"h"):null,l=this.o.maxWidth?this.getVal(this.o.maxWidth,"w"):null,r=r&&r<s[0]?r:s[0],l=l&&l<s[1]?l:s[1],c=this.o.minHeight?this.getVal(this.o.minHeight,"h"):"auto",i=i?this.o.autoResize&&i>r?r:i<c?c:i:o?o>r?r:this.o.minHeight&&"auto"!==c&&o<c?c:o:c,r=this.o.minWidth?this.getVal(this.o.minWidth,"w"):"auto",t=t?this.o.autoResize&&t>l?l:t<r?r:t:a?a>l?l:this.o.minWidth&&"auto"!==r&&a<r?r:a:r;this.d.container.css({height:i,width:t}),this.d.wrap.css({overflow:o>i||a>t?"auto":"visible"}),this.o.autoPosition&&this.setPosition()},setPosition:function(){var t,e;t=s[0]/2-this.d.container.outerHeight(!0)/2,e=s[1]/2-this.d.container.outerWidth(!0)/2;var n="fixed"!==this.d.container.css("position")?r.scrollTop():0;this.o.position&&"[object Array]"===Object.prototype.toString.call(this.o.position)?(t=n+(this.o.position[0]||t),e=this.o.position[1]||e):t=n+t,this.d.container.css({left:e,top:t})},watchTab:function(e){0<t(e.target).parents(".simplemodal-container").length?(this.inputs=t(":input:enabled:visible:first, :input:enabled:visible:last",this.d.data[0]),(!e.shiftKey&&e.target===this.inputs[this.inputs.length-1]||e.shiftKey&&e.target===this.inputs[0]||0===this.inputs.length)&&(e.preventDefault(),this.focus(e.shiftKey?"last":"first"))):(e.preventDefault(),this.focus())},open:function(){this.d.iframe&&this.d.iframe.show(),t.isFunction(this.o.onOpen)?this.o.onOpen.apply(this,[this.d]):(this.d.overlay.show(),this.d.container.show(),this.d.data.show()),this.o.focus&&this.focus(),this.bindEvents()},close:function(){if(!this.d.data)return!1;if(this.unbindEvents(),t.isFunction(this.o.onClose)&&!this.occb)this.occb=!0,this.o.onClose.apply(this,[this.d]);else{if(this.d.placeholder){var e=t("#simplemodal-placeholder");this.o.persist?e.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",this.display)):(this.d.data.hide().remove(),e.replaceWith(this.d.orig))}else this.d.data.hide().remove();this.d.container.hide().remove(),this.d.overlay.hide(),this.d.iframe&&this.d.iframe.hide().remove(),this.d.overlay.remove(),this.d={}}}}}),window.Modernizr=function(t,e,n){function i(t){b.cssText=t}function o(t,e){return i(E.join(t+";")+(e||""))}function a(t,e){return typeof t===e}function r(t,e){return!!~(""+t).indexOf(e)}function s(t,e){for(var i in t){var o=t[i];if(!r(o,"-")&&b[o]!==n)return"pfx"!=e||o}return!1}function l(t,e,i){for(var o in t){var r=e[t[o]];if(r!==n)return i===!1?t[o]:a(r,"function")?r.bind(i||e):r}return!1}function c(t,e,n){var i=t.charAt(0).toUpperCase()+t.slice(1),o=(t+" "+T.join(i+" ")+i).split(" ");return a(e,"string")||a(e,"undefined")?s(o,e):(o=(t+" "+k.join(i+" ")+i).split(" "),l(o,e,n))}function d(){f.input=function(n){for(var i=0,o=n.length;i<o;i++)j[n[i]]=n[i]in x;return j.list&&(j.list=!!e.createElement("datalist")&&!!t.HTMLDataListElement),j}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),f.inputtypes=function(t){for(var i,o,a,r=0,s=t.length;r<s;r++)x.setAttribute("type",o=t[r]),i="text"!==x.type,i&&(x.value=w,x.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(o)&&x.style.WebkitAppearance!==n?(g.appendChild(x),a=e.defaultView,i=a.getComputedStyle&&"textfield"!==a.getComputedStyle(x,null).WebkitAppearance&&0!==x.offsetHeight,g.removeChild(x)):/^(search|tel)$/.test(o)||(i=/^(url|email)$/.test(o)?x.checkValidity&&x.checkValidity()===!1:x.value!=w)),_[t[r]]=!!i;return _}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var u,h,p="2.6.2",f={},m=!0,g=e.documentElement,v="modernizr",y=e.createElement(v),b=y.style,x=e.createElement("input"),w=":)",$={}.toString,E=" -webkit- -moz- -o- -ms- ".split(" "),C="Webkit Moz O ms",T=C.split(" "),k=C.toLowerCase().split(" "),S={svg:"http://www.w3.org/2000/svg"},H={},_={},j={},I=[],D=I.slice,P=function(t,n,i,o){var a,r,s,l,c=e.createElement("div"),d=e.body,u=d||e.createElement("body");if(parseInt(i,10))for(;i--;)s=e.createElement("div"),s.id=o?o[i]:v+(i+1),c.appendChild(s);return a=["&#173;",'<style id="s',v,'">',t,"</style>"].join(""),c.id=v,(d?c:u).innerHTML+=a,u.appendChild(c),d||(u.style.background="",u.style.overflow="hidden",l=g.style.overflow,g.style.overflow="hidden",g.appendChild(u)),r=n(c,t),d?c.parentNode.removeChild(c):(u.parentNode.removeChild(u),g.style.overflow=l),!!r},W=function(e){var n=t.matchMedia||t.msMatchMedia;if(n)return n(e).matches;var i;return P("@media "+e+" { #"+v+" { position: absolute; } }",function(e){i="absolute"==(t.getComputedStyle?getComputedStyle(e,null):e.currentStyle).position}),i},M=function(){function t(t,o){o=o||e.createElement(i[t]||"div"),t="on"+t;var r=t in o;return r||(o.setAttribute||(o=e.createElement("div")),o.setAttribute&&o.removeAttribute&&(o.setAttribute(t,""),r=a(o[t],"function"),a(o[t],"undefined")||(o[t]=n),o.removeAttribute(t))),o=null,r}var i={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return t}(),L={}.hasOwnProperty;h=a(L,"undefined")||a(L.call,"undefined")?function(t,e){return e in t&&a(t.constructor.prototype[e],"undefined")}:function(t,e){return L.call(t,e)},Function.prototype.bind||(Function.prototype.bind=function(t){var e=this;if("function"!=typeof e)throw new TypeError;var n=D.call(arguments,1),i=function(){if(this instanceof i){var o=function(){};o.prototype=e.prototype;var a=new o,r=e.apply(a,n.concat(D.call(arguments)));return Object(r)===r?r:a}return e.apply(t,n.concat(D.call(arguments)))};return i}),H.flexbox=function(){return c("flexWrap")},H.canvas=function(){var t=e.createElement("canvas");return!!t.getContext&&!!t.getContext("2d")},H.canvastext=function(){return!!f.canvas&&!!a(e.createElement("canvas").getContext("2d").fillText,"function")},H.webgl=function(){return!!t.WebGLRenderingContext},H.touch=function(){var n;return"ontouchstart"in t||t.DocumentTouch&&e instanceof DocumentTouch?n=!0:P(["@media (",E.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(t){n=9===t.offsetTop}),n},H.geolocation=function(){return"geolocation"in navigator},H.postmessage=function(){return!!t.postMessage},H.websqldatabase=function(){return!!t.openDatabase},H.indexedDB=function(){return!!c("indexedDB",t)},H.hashchange=function(){return M("hashchange",t)&&(e.documentMode===n||e.documentMode>7)},H.history=function(){return!!t.history&&!!history.pushState},H.draganddrop=function(){var t=e.createElement("div");return"draggable"in t||"ondragstart"in t&&"ondrop"in t},H.websockets=function(){return"WebSocket"in t||"MozWebSocket"in t},H.rgba=function(){return i("background-color:rgba(150,255,150,.5)"),r(b.backgroundColor,"rgba")},H.hsla=function(){return i("background-color:hsla(120,40%,100%,.5)"),r(b.backgroundColor,"rgba")||r(b.backgroundColor,"hsla")},H.multiplebgs=function(){return i("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(b.background)},H.backgroundsize=function(){return c("backgroundSize")},H.borderimage=function(){return c("borderImage")},H.borderradius=function(){return c("borderRadius")},H.boxshadow=function(){return c("boxShadow")},H.textshadow=function(){return""===e.createElement("div").style.textShadow},H.opacity=function(){return o("opacity:.55"),/^0.55$/.test(b.opacity)},H.cssanimations=function(){return c("animationName")},H.csscolumns=function(){return c("columnCount")},H.cssgradients=function(){var t="background-image:",e="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";return i((t+"-webkit- ".split(" ").join(e+t)+E.join(n+t)).slice(0,-t.length)),r(b.backgroundImage,"gradient")},H.cssreflections=function(){return c("boxReflect")},H.csstransforms=function(){return!!c("transform")},H.csstransforms3d=function(){var t=!!c("perspective");return t&&"webkitPerspective"in g.style&&P("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(e,n){t=9===e.offsetLeft&&3===e.offsetHeight}),t},H.csstransitions=function(){return c("transition")},H.fontface=function(){var t;return P('@font-face {font-family:"font";src:url("https://")}',function(n,i){var o=e.getElementById("smodernizr"),a=o.sheet||o.styleSheet,r=a?a.cssRules&&a.cssRules[0]?a.cssRules[0].cssText:a.cssText||"":"";t=/src/i.test(r)&&0===r.indexOf(i.split(" ")[0])}),t},H.generatedcontent=function(){var t;return P(["#",v,"{font:0/0 a}#",v,':after{content:"',w,'";visibility:hidden;font:3px/1 a}'].join(""),function(e){t=e.offsetHeight>=3}),t},H.video=function(){var t=e.createElement("video"),n=!1;try{(n=!!t.canPlayType)&&(n=new Boolean(n),n.ogg=t.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=t.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=t.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(i){}return n},H.audio=function(){var t=e.createElement("audio"),n=!1;try{(n=!!t.canPlayType)&&(n=new Boolean(n),n.ogg=t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=t.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=t.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(i){}return n},H.localstorage=function(){try{return localStorage.setItem(v,v),localStorage.removeItem(v),!0}catch(t){return!1}},H.sessionstorage=function(){try{return sessionStorage.setItem(v,v),sessionStorage.removeItem(v),!0}catch(t){return!1}},H.webworkers=function(){return!!t.Worker},H.applicationcache=function(){return!!t.applicationCache},H.svg=function(){return!!e.createElementNS&&!!e.createElementNS(S.svg,"svg").createSVGRect},H.inlinesvg=function(){var t=e.createElement("div");return t.innerHTML="<svg/>",(t.firstChild&&t.firstChild.namespaceURI)==S.svg},H.smil=function(){return!!e.createElementNS&&/SVGAnimate/.test($.call(e.createElementNS(S.svg,"animate")))},H.svgclippaths=function(){return!!e.createElementNS&&/SVGClipPath/.test($.call(e.createElementNS(S.svg,"clipPath")))};for(var z in H)h(H,z)&&(u=z.toLowerCase(),f[u]=H[z](),I.push((f[u]?"":"no-")+u));return f.input||d(),f.addTest=function(t,e){if("object"==typeof t)for(var i in t)h(t,i)&&f.addTest(i,t[i]);else{if(t=t.toLowerCase(),f[t]!==n)return f;e="function"==typeof e?e():e,"undefined"!=typeof m&&m&&(g.className+=" "+(e?"":"no-")+t),f[t]=e}return f},i(""),y=x=null,function(t,e){function n(t,e){var n=t.createElement("p"),i=t.getElementsByTagName("head")[0]||t.documentElement;return n.innerHTML="x<style>"+e+"</style>",i.insertBefore(n.lastChild,i.firstChild)}function i(){var t=v.elements;return"string"==typeof t?t.split(" "):t}function o(t){var e=g[t[f]];return e||(e={},m++,t[f]=m,g[m]=e),e}function a(t,n,i){if(n||(n=e),d)return n.createElement(t);i||(i=o(n));var a;return a=i.cache[t]?i.cache[t].cloneNode():p.test(t)?(i.cache[t]=i.createElem(t)).cloneNode():i.createElem(t),a.canHaveChildren&&!h.test(t)?i.frag.appendChild(a):a}function r(t,n){if(t||(t=e),d)return t.createDocumentFragment();n=n||o(t);for(var a=n.frag.cloneNode(),r=0,s=i(),l=s.length;r<l;r++)a.createElement(s[r]);return a}function s(t,e){e.cache||(e.cache={},e.createElem=t.createElement,e.createFrag=t.createDocumentFragment,e.frag=e.createFrag()),t.createElement=function(n){return v.shivMethods?a(n,t,e):e.createElem(n)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/\w+/g,function(t){return e.createElem(t),e.frag.createElement(t),'c("'+t+'")'})+");return n}")(v,e.frag)}function l(t){t||(t=e);var i=o(t);return v.shivCSS&&!c&&!i.hasCSS&&(i.hasCSS=!!n(t,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),d||s(t,i),t}var c,d,u=t.html5||{},h=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f="_html5shiv",m=0,g={};!function(){try{var t=e.createElement("a");t.innerHTML="<xyz></xyz>",c="hidden"in t,d=1==t.childNodes.length||function(){e.createElement("a");var t=e.createDocumentFragment();return"undefined"==typeof t.cloneNode||"undefined"==typeof t.createDocumentFragment||"undefined"==typeof t.createElement}()}catch(n){c=!0,d=!0}}();var v={elements:u.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:u.shivCSS!==!1,supportsUnknownElements:d,shivMethods:u.shivMethods!==!1,type:"default",shivDocument:l,createElement:a,createDocumentFragment:r};t.html5=v,l(e)}(this,e),f._version=p,f._prefixes=E,f._domPrefixes=k,f._cssomPrefixes=T,f.mq=W,f.hasEvent=M,f.testProp=function(t){return s([t])},f.testAllProps=c,f.testStyles=P,f.prefixed=function(t,e,n){return e?c(t,e,n):c(t,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(m?" js "+I.join(" "):""),f}(this,this.document),function(t,e,n){function i(t){return"[object Function]"==g.call(t)}function o(t){return"string"==typeof t}function a(){}function r(t){return!t||"loaded"==t||"complete"==t||"uninitialized"==t}function s(){var t=v.shift();y=1,t?t.t?f(function(){("c"==t.t?h.injectCss:h.injectJs)(t.s,0,t.a,t.x,t.e,1)},0):(t(),s()):y=0}function l(t,n,i,o,a,l,c){function d(e){if(!p&&r(u.readyState)&&(b.r=p=1,!y&&s(),u.onload=u.onreadystatechange=null,e)){"img"!=t&&f(function(){w.removeChild(u)},50);for(var i in k[n])k[n].hasOwnProperty(i)&&k[n][i].onload()}}var c=c||h.errorTimeout,u=e.createElement(t),p=0,g=0,b={t:i,s:n,e:a,a:l,x:c};1===k[n]&&(g=1,k[n]=[]),"object"==t?u.data=n:(u.src=n,u.type=t),u.width=u.height="0",u.onerror=u.onload=u.onreadystatechange=function(){d.call(this,g)},v.splice(o,0,b),"img"!=t&&(g||2===k[n]?(w.insertBefore(u,x?null:m),f(d,c)):k[n].push(u))}function c(t,e,n,i,a){return y=0,e=e||"j",o(t)?l("c"==e?E:$,t,e,this.i++,n,i,a):(v.splice(this.i++,0,t),1==v.length&&s()),this}function d(){var t=h;return t.loader={load:c,i:0},t}var u,h,p=e.documentElement,f=t.setTimeout,m=e.getElementsByTagName("script")[0],g={}.toString,v=[],y=0,b="MozAppearance"in p.style,x=b&&!!e.createRange().compareNode,w=x?p:m.parentNode,p=t.opera&&"[object Opera]"==g.call(t.opera),p=!!e.attachEvent&&!p,$=b?"object":p?"script":"img",E=p?"script":$,C=Array.isArray||function(t){return"[object Array]"==g.call(t)},T=[],k={},S={timeout:function(t,e){return e.length&&(t.timeout=e[0]),t}};h=function(t){function e(t){var e,n,i,t=t.split("!"),o=T.length,a=t.pop(),r=t.length,a={url:a,origUrl:a,prefixes:t};for(n=0;n<r;n++)i=t[n].split("="),(e=S[i.shift()])&&(a=e(a,i));for(n=0;n<o;n++)a=T[n](a);return a}function r(t,o,a,r,s){var l=e(t),c=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(o&&(o=i(o)?o:o[t]||o[r]||o[t.split("/").pop().split("?")[0]]),l.instead?l.instead(t,o,a,r,s):(k[l.url]?l.noexec=!0:k[l.url]=1,a.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(i(o)||i(c))&&a.load(function(){d(),o&&o(l.origUrl,s,r),c&&c(l.origUrl,s,r),k[l.url]=2})))}function s(t,e){function n(t,n){if(t){if(o(t))n||(u=function(){var t=[].slice.call(arguments);h.apply(this,t),p()}),r(t,u,e,0,c);else if(Object(t)===t)for(l in s=function(){var e,n=0;for(e in t)t.hasOwnProperty(e)&&n++;return n}(),t)t.hasOwnProperty(l)&&(!n&&!--s&&(i(u)?u=function(){var t=[].slice.call(arguments);h.apply(this,t),p()}:u[l]=function(t){return function(){var e=[].slice.call(arguments);t&&t.apply(this,e),p()}}(h[l])),r(t[l],u,e,l,c))}else!n&&p()}var s,l,c=!!t.test,d=t.load||t.both,u=t.callback||a,h=u,p=t.complete||a;n(c?t.yep:t.nope,!!d),d&&n(d)}var l,c,u=this.yepnope.loader;if(o(t))r(t,0,u,0);else if(C(t))for(l=0;l<t.length;l++)c=t[l],o(c)?r(c,0,u,0):C(c)?h(c):Object(c)===c&&s(c,u);else Object(t)===t&&s(t,u)},h.addPrefix=function(t,e){S[t]=e},h.addFilter=function(t){T.push(t)},h.errorTimeout=1e4,null==e.readyState&&e.addEventListener&&(e.readyState="loading",e.addEventListener("DOMContentLoaded",u=function(){e.removeEventListener("DOMContentLoaded",u,0),e.readyState="complete"},0)),t.yepnope=d(),t.yepnope.executeStack=s,t.yepnope.injectJs=function(t,n,i,o,l,c){var d,u,p=e.createElement("script"),o=o||h.errorTimeout;p.src=t;for(u in i)p.setAttribute(u,i[u]);n=c?s:n||a,p.onreadystatechange=p.onload=function(){!d&&r(p.readyState)&&(d=1,n(),p.onload=p.onreadystatechange=null)},f(function(){d||(d=1,n(1))},o),l?p.onload():m.parentNode.insertBefore(p,m)},t.yepnope.injectCss=function(t,n,i,o,r,l){var c,o=e.createElement("link"),n=l?s:n||a;o.href=t,o.rel="stylesheet",o.type="text/css";for(c in i)o.setAttribute(c,i[c]);r||(m.parentNode.insertBefore(o,m),f(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},function(){function t(){}function e(t){return a.retinaImageSuffix+t}function n(t,n){if(this.path=t||"","undefined"!=typeof n&&null!==n)this.at_2x_path=n,this.perform_check=!1;else{if(void 0!==document.createElement){var i=document.createElement("a");i.href=this.path,i.pathname=i.pathname.replace(r,e),this.at_2x_path=i.href}else{var o=this.path.split("?");o[0]=o[0].replace(r,e),this.at_2x_path=o.join("?")}this.perform_check=!0}}function i(t){this.el=t,this.path=new n(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));var e=this;this.path.check_2x_variant(function(t){t&&e.swap()})}var o="undefined"==typeof exports?window:exports,a={retinaImageSuffix:"@2x",check_mime_type:!0,force_original_dimensions:!0};o.Retina=t,t.configure=function(t){null===t&&(t={});for(var e in t)t.hasOwnProperty(e)&&(a[e]=t[e])},t.init=function(t){null===t&&(t=o);var e=t.onload||function(){};t.onload=function(){var t,n,o=document.getElementsByTagName("img"),a=[];for(t=0;t<o.length;t+=1)n=o[t],n.getAttributeNode("data-no-retina")||a.push(new i(n));e()}},t.isRetina=function(){var t="(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";return o.devicePixelRatio>1||!(!o.matchMedia||!o.matchMedia(t).matches)};var r=/\.\w+$/;o.RetinaImagePath=n,n.confirmed_paths=[],n.prototype.is_external=function(){return!(!this.path.match(/^https?\:/i)||this.path.match("//"+document.domain))},n.prototype.check_2x_variant=function(t){var e,i=this;return this.is_external()?t(!1):this.perform_check||"undefined"==typeof this.at_2x_path||null===this.at_2x_path?this.at_2x_path in n.confirmed_paths?t(!0):(e=new XMLHttpRequest,e.open("HEAD",this.at_2x_path),e.onreadystatechange=function(){if(4!==e.readyState)return t(!1);if(e.status>=200&&e.status<=399){if(a.check_mime_type){var o=e.getResponseHeader("Content-Type");if(null===o||!o.match(/^image/i))return t(!1)}return n.confirmed_paths.push(i.at_2x_path),t(!0)}return t(!1)},e.send(),void 0):t(!0)},o.RetinaImage=i,i.prototype.swap=function(t){function e(){n.el.complete?(a.force_original_dimensions&&(n.el.setAttribute("width",n.el.offsetWidth),n.el.setAttribute("height",n.el.offsetHeight)),n.el.setAttribute("src",t)):setTimeout(e,5)}"undefined"==typeof t&&(t=this.path.at_2x_path);var n=this;e()},t.isRetina()&&t.init(o)}();