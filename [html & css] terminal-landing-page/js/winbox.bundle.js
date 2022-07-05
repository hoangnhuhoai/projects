/**
 * WinBox.js v0.1.92 (Bundle)
 * Copyright 2021 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/winbox
 */
(function(){'use strict';var e,h=document.createElement("style");h.innerHTML="@keyframes fade-in{0%{opacity:0}to{opacity:.85}}.winbox.modal:after,.winbox.modal:before{content:''}.winbox{position:fixed;left:0;top:0;background:#0050ff;box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22);transition:width .3s,height .3s,transform .3s;transition-timing-function:cubic-bezier(.3,1,.3,1);will-change:transform,width,height;contain:layout size;text-align:left;touch-action:none}.max,.no-shadow{box-shadow:none}.wb-header,.winbox iframe{position:absolute;width:100%}.wb-header{left:0;top:0;height:35px;color:#fff;overflow:hidden}.wb-body,.wb-n,.wb-s{position:absolute;left:0}.wb-n,.wb-s{height:10px}.wb-body{right:0;top:35px;bottom:0;overflow:auto;-webkit-overflow-scrolling:touch;overflow-scrolling:touch;will-change:contents;background:#fff;margin-top:0!important;contain:strict}.wb-title{font-family:Arial,sans-serif;font-size:14px;padding-left:10px;cursor:move;line-height:35px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wb-n{top:-5px;right:0;cursor:n-resize}.wb-e{position:absolute;top:0;right:-5px;bottom:0;width:10px;cursor:w-resize}.wb-s,.wb-se,.wb-sw{bottom:-5px}.wb-s{right:0;cursor:n-resize}.wb-w,.winbox.modal:before{position:absolute;top:0;bottom:0}.wb-w{left:-5px;width:10px;cursor:w-resize}.wb-ne,.wb-nw,.wb-sw{width:15px;height:15px;position:absolute}.wb-nw{top:-5px;left:-5px;cursor:nw-resize}.wb-ne,.wb-sw{cursor:ne-resize}.wb-ne{top:-5px;right:-5px}.wb-sw{left:-5px}.wb-se{position:absolute;right:-5px;width:15px;height:15px;cursor:nw-resize}.wb-icon{float:right;height:35px;max-width:100%;text-align:center}.wb-icon *{display:inline-block;width:30px;height:100%;background-position:center;background-repeat:no-repeat;cursor:pointer;max-width:100%}.no-close .wb-close,.no-full .wb-full,.no-header .wb-header,.no-max .wb-max,.no-min .wb-min,.no-resize .wb-body~div,.winbox.min .wb-body>*,.winbox.min .wb-full,.winbox.min .wb-min,.winbox.modal .wb-full,.winbox.modal .wb-max,.winbox.modal .wb-min{display:none}.winbox.max .wb-title,.winbox.min .wb-title{cursor:default}.wb-min{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAyIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNOCAwaDdhMSAxIDAgMCAxIDAgMkgxYTEgMSAwIDAgMSAwLTJoN3oiLz48L3N2Zz4=);background-size:14px auto;background-position:center bottom 11px}.wb-max{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHZpZXdCb3g9IjAgMCA5NiA5NiI+PHBhdGggZD0iTTIwIDcxLjMxMUMxNS4zNCA2OS42NyAxMiA2NS4yMyAxMiA2MFYyMGMwLTYuNjMgNS4zNy0xMiAxMi0xMmg0MGM1LjIzIDAgOS42NyAzLjM0IDExLjMxMSA4SDI0Yy0yLjIxIDAtNCAxLjc5LTQgNHY1MS4zMTF6Ii8+PHBhdGggZD0iTTkyIDc2VjM2YzAtNi42My01LjM3LTEyLTEyLTEySDQwYy02LjYzIDAtMTIgNS4zNy0xMiAxMnY0MGMwIDYuNjMgNS4zNyAxMiAxMiAxMmg0MGM2LjYzIDAgMTItNS4zNyAxMi0xMnptLTUyIDRjLTIuMjEgMC00LTEuNzktNC00VjM2YzAtMi4yMSAxLjc5LTQgNC00aDQwYzIuMjEgMCA0IDEuNzkgNCA0djQwYzAgMi4yMS0xLjc5IDQtNCA0SDQweiIvPjwvc3ZnPg==);background-size:17px auto}.wb-close{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xIC0xIDE4IDE4Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMS42MTMuMjEuMDk0LjA4M0w4IDYuNTg1IDE0LjI5My4yOTNsLjA5NC0uMDgzYTEgMSAwIDAgMSAxLjQwMyAxLjQwM2wtLjA4My4wOTRMOS40MTUgOGw2LjI5MiA2LjI5M2ExIDEgMCAwIDEtMS4zMiAxLjQ5N2wtLjA5NC0uMDgzTDggOS40MTVsLTYuMjkzIDYuMjkyLS4wOTQuMDgzQTEgMSAwIDAgMSAuMjEgMTQuMzg3bC4wODMtLjA5NEw2LjU4NSA4IC4yOTMgMS43MDdBMSAxIDAgMCAxIDEuNjEzLjIxeiIvPjwvc3ZnPg==);background-size:15px auto}.wb-full{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjIuNSIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNOCAzSDVhMiAyIDAgMCAwLTIgMnYzbTE4IDBWNWEyIDIgMCAwIDAtMi0yaC0zbTAgMThoM2EyIDIgMCAwIDAgMi0ydi0zTTMgMTZ2M2EyIDIgMCAwIDAgMiAyaDMiLz48L3N2Zz4=);background-size:16px auto}.winbox.drag iframe,.winbox.max .wb-body~div,.winbox.min .wb-body~div,.winbox.modal .wb-body~div,.winbox.modal .wb-title{pointer-events:none}.max .wb-body{margin:0!important}.winbox iframe{height:100%;border:0}.no-animation,.winbox.drag{transition:none}.winbox.modal:before{left:0;right:0;background:inherit;border-radius:inherit}.winbox.modal:after{position:absolute;top:-100vh;left:-100vw;right:-100vw;bottom:-100vh;background:#0d1117;animation:fade-in .2s ease-out forwards;z-index:-1}.no-header .wb-body{top:0}.no-move:not(.min) .wb-title{pointer-events:none}";
var l=document.getElementsByTagName("head")[0];l.firstChild?l.insertBefore(h,l.firstChild):l.appendChild(h);var q=document.createElement("div");q.innerHTML="<div class=wb-header><div class=wb-icon><span class=wb-min></span><span class=wb-max></span><span class=wb-full></span><span class=wb-close></span></div><div class=wb-title> </div></div><div class=wb-body></div><div class=wb-n></div><div class=wb-s></div><div class=wb-w></div><div class=wb-e></div><div class=wb-nw></div><div class=wb-ne></div><div class=wb-se></div><div class=wb-sw></div>";function r(a,b,c,g){a.addEventListener(b,c,g||!1===g?g:!0)}function t(a){a.stopPropagation();a.cancelable&&a.preventDefault()}function w(a,b,c){c=""+c;a["_s_"+b]!==c&&(a.style.setProperty(b,c),a["_s_"+b]=c)};var x=document.documentElement,A=[],B=0,C=0,D,G,H,K,L,N,O;
function Q(a,b){if(!(this instanceof Q))return new Q(a);D||R();this.g=q.cloneNode(!0);this.body=this.g.getElementsByClassName("wb-body")[0];var c,g;if(a){if(b){var f=a;a=b}if("string"===typeof a)f=a;else{if(g=a.modal)var u=c="center";var y=a.id;var I=a.root;f=f||a.title;var E=a.mount;var d=a.html;var z=a.url;var k=a.width;var m=a.height;u=a.x||u;c=a.y||c;var F=a.max;var n=a.top;var p=a.left;var v=a.bottom;var J=a.right;D=a.index||D;var X=a.onclose;var Y=a.onfocus;var Z=a.onblur;var aa=a.onmove;var ba=
a.onresize;b=a.background;var P=a.border;var M=a["class"];b&&this.setBackground(b);P&&w(this.body,"margin",P+(isNaN(P)?"":"px"))}}this.setTitle(f||"");a=N;f=O;n=n?S(n,f):0;v=v?S(v,f):0;p=p?S(p,a):0;J=J?S(J,a):0;a-=p+J;f-=n+v;k=k?S(k,a):a/2|0;m=m?S(m,f):f/2|0;u=u?S(u,a,k):p;c=c?S(c,f,m):n;D=D||10;this.g.id=this.id=y||"winbox-"+ ++B;this.g.className="winbox"+(M?" "+("string"===typeof M?M:M.join(" ")):"")+(g?" modal":"");this.x=u;this.y=c;this.width=k;this.height=m;this.top=n;this.right=J;this.bottom=
v;this.left=p;this.max=this.min=!1;this.j=X;this.l=Y;this.i=Z;this.o=aa;this.m=ba;F?this.maximize():this.move().resize();this.focus();E?this.mount(E):d?this.body.innerHTML=d:z&&this.setUrl(z);ca(this);(I||document.body).appendChild(this.g)}Q["new"]=function(a){return new Q(a)};function S(a,b,c){"string"===typeof a&&("center"===a?a=(b-c)/2|0:"right"===a||"bottom"===a?a=b-c:(c=parseFloat(a),a="%"===(""+c!==a&&a.substring((""+c).length))?b/100*c|0:c));return a}
function R(){var a=document.body;a[K="requestFullscreen"]||a[K="msRequestFullscreen"]||a[K="webkitRequestFullscreen"]||a[K="mozRequestFullscreen"]||(K="");L=K&&K.replace("request","exit").replace("mozRequest","mozCancel").replace("Request","Exit");r(window,"resize",function(){N=x.clientWidth;O=x.clientHeight;T()});N=x.clientWidth;O=x.clientHeight}
function ca(a){U(a,"title");U(a,"n");U(a,"s");U(a,"w");U(a,"e");U(a,"nw");U(a,"ne");U(a,"se");U(a,"sw");r(a.g.getElementsByClassName("wb-min")[0],"click",function(b){t(b);a.minimize()});r(a.g.getElementsByClassName("wb-max")[0],"click",function(b){t(b);a.focus().maximize()});K?r(a.g.getElementsByClassName("wb-full")[0],"click",function(b){t(b);a.focus().fullscreen()}):a.addClass("no-full");r(a.g.getElementsByClassName("wb-close")[0],"click",function(b){t(b);a.close()||(a=null)});r(a.g,"click",function(){a.focus()},
!1)}function V(a){A.splice(A.indexOf(a),1);T();a.removeClass("min");a.min=!1;a.g.title=""}function T(){for(var a=A.length,b=0,c,g;b<a;b++)c=A[b],g=Math.min((N-2*c.left)/a,250),c.resize(g+1|0,35,!0).move(c.left+b*g|0,O-c.bottom-35,!0)}
function U(a,b){function c(d){t(d);if(a.min)a.minimize();else{if("title"===b){var z=Date.now(),k=z-C;C=z;if(250>k){a.maximize();return}}a.max||(a.addClass("drag"),(y=d.touches)&&(y=y[0])?(d=y,r(window,"touchmove",g),r(window,"touchend",f)):(r(window,"mousemove",g),r(window,"mouseup",f)),I=d.pageX,E=d.pageY,a.focus())}}function g(d){t(d);y&&(d=d.touches[0]);var z=d.pageX;d=d.pageY;var k=z-I,m=d-E,F;if("title"===b){a.x+=k;a.y+=m;var n=F=1}else{if("e"===b||"se"===b||"ne"===b){a.width+=k;var p=1}else if("w"===
b||"sw"===b||"nw"===b)a.x+=k,a.width-=k,n=p=1;if("s"===b||"se"===b||"sw"===b){a.height+=m;var v=1}else if("n"===b||"ne"===b||"nw"===b)a.y+=m,a.height-=m,F=v=1}if(p||v)p&&(a.width=Math.max(Math.min(a.width,N-a.x-a.right),150)),v&&(a.height=Math.max(Math.min(a.height,O-a.y-a.bottom),35)),a.resize();if(n||F)n&&(a.x=Math.max(Math.min(a.x,N-a.width-a.right),a.left)),F&&(a.y=Math.max(Math.min(a.y,O-a.height-a.bottom),a.top)),a.move();I=z;E=d}function f(d){t(d);a.removeClass("drag");y?(window.removeEventListener("touchmove",
g,!0),window.removeEventListener("touchend",f,!0)):(window.removeEventListener("mousemove",g,!0),window.removeEventListener("mouseup",f,!0))}var u=a.g.getElementsByClassName("wb-"+b)[0],y,I,E;r(u,"mousedown",c);r(u,"touchstart",c,{passive:!1})}e=Q.prototype;e.mount=function(a){this.unmount();a.h||(a.h=a.parentNode);this.body.textContent="";this.body.appendChild(a);return this};e.unmount=function(a){var b=this.body.firstChild;if(b){var c=a||b.h;c&&c.appendChild(b);b.h=a}return this};
e.setTitle=function(a){a=this.title=a;this.g.getElementsByClassName("wb-title")[0].firstChild.nodeValue=a;return this};e.setBackground=function(a){w(this.g,"background",a);return this};e.setUrl=function(a){this.body.innerHTML='<iframe src="'+a+'"></iframe>';return this};e.focus=function(){H!==this&&(w(this.g,"z-index",D++),this.addClass("focus"),H&&(H.removeClass("focus"),H.i&&H.i()),H=this,this.l&&this.l());return this};e.hide=function(){return this.addClass("hide")};e.show=function(){return this.removeClass("hide")};
e.minimize=function(a){G&&W();!a&&this.min?(V(this),this.resize().move().focus()):!1===a||this.min||(A.push(this),T(),this.g.title=this.title,this.addClass("min"),this.min=!0);this.max&&(this.removeClass("max"),this.max=!1);return this};e.maximize=function(a){if("undefined"===typeof a||a!==this.max)this.min&&V(this),(this.max=!this.max)?this.addClass("max").resize(N-this.left-this.right,O-this.top-this.bottom,!0).move(this.left,this.top,!0):this.resize().move().removeClass("max");return this};
e.fullscreen=function(a){if("undefined"===typeof a||a!==G)this.min&&(this.resize().move(),V(this)),G&&W()||(this.body[K](),G=!0);return this};function W(){G=!1;if(document.fullscreen||document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement)return document[L](),!0}e.close=function(a){if(this.j&&this.j(a))return!0;this.min&&V(this);this.unmount();this.g.parentNode.removeChild(this.g);H===this&&(H=null)};
e.move=function(a,b,c){a||0===a?c||(this.x=a?a=S(a,N-this.left-this.right,this.width):0,this.y=b?b=S(b,O-this.top-this.bottom,this.height):0):(a=this.x,b=this.y);w(this.g,"transform","translate("+a+"px,"+b+"px)");this.o&&this.o(a,b);return this};e.resize=function(a,b,c){a||0===a?c||(this.width=a?a=S(a,N-this.left-this.right):0,this.height=b?b=S(b,O-this.top-this.bottom):0):(a=this.width,b=this.height);w(this.g,"width",a+"px");w(this.g,"height",b+"px");this.m&&this.m(a,b);return this};
e.addClass=function(a){this.g.classList.add(a);return this};e.removeClass=function(a){this.g.classList.remove(a);return this};e.use=function(a){a(this);return this};window.WinBox=Q;}).call(this);