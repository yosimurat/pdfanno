"use strict";document.webL10n=function(e,n,t){var r={},o="",i="textContent",u="",a={},f="loading",c=!0;function l(e){var t=n.createEvent("Event");t.initEvent("localized",!0,!1),t.language=e,n.dispatchEvent(t)}function s(e,n,t){n=n||function(e){},t=t||function(){console.warn(e+" not found.")};var r=new XMLHttpRequest;r.open("GET",e,c),r.overrideMimeType&&r.overrideMimeType("text/plain; charset=utf-8"),r.onreadystatechange=function(){4==r.readyState&&(200==r.status||0===r.status?n(r.responseText):t())},r.onerror=t,r.ontimeout=t;try{r.send(null)}catch(e){t()}}function d(e,n,t,u){var a=e.replace(/[^\/]*$/,"")||"./";s(e,function(e){o+=e,function(e,t){var r={},o=/^\s*|\s*$/,i=/^\s*#|^\s*$/,u=/^\s*\[(.*)\]\s*$/,f=/^\s*@import\s+url\((.*)\)\s*$/i,c=/^([^=\s]*)\s*=\s*(.+)$/;function l(e,t,l){var s=e.replace(o,"").split(/[\r\n]+/),h="*",g=n.split("-",1)[0],v=!1,p="";!function e(){for(;;){if(!s.length)return void l();var o=s.shift();if(!i.test(o)){if(t){if(p=u.exec(o)){h=p[1].toLowerCase(),v="*"!==h&&h!==n&&h!==g;continue}if(v)continue;if(p=f.exec(o))return void d(a+p[1],e)}var m=o.match(c);m&&3==m.length&&(r[m[1]]=(w=m[2]).lastIndexOf("\\")<0?w:w.replace(/\\\\/g,"\\").replace(/\\n/g,"\n").replace(/\\r/g,"\r").replace(/\\t/g,"\t").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\{/g,"{").replace(/\\}/g,"}").replace(/\\"/g,'"').replace(/\\'/g,"'"))}}var w}()}function d(e,n){s(e,function(e){l(e,!1,n)},null)}l(e,!0,function(){t(r)})}(e,function(e){for(var n in e){var o,u,a=n.lastIndexOf(".");a>0?(o=n.substring(0,a),u=n.substr(a+1)):(o=n,u=i),r[o]||(r[o]={}),r[o][u]=e[n]}t&&t()})},u)}function h(e,t){e&&(e=e.toLowerCase()),t=t||function(){},r={},o="",u="",u=e;var i,a=n.querySelectorAll('link[type="application/l10n"]'),c=a.length;if(0===c){var s=(i=n.querySelector('script[type="application/l10n"]'))?JSON.parse(i.innerHTML):null;if(s&&s.locales&&s.default_locale){if(console.log("using the embedded JSON directory, early way out"),!(r=s.locales[e])){var h=s.default_locale.toLowerCase();for(var g in s.locales){if((g=g.toLowerCase())===e){r=s.locales[e];break}g===h&&(r=s.locales[h])}}t()}else console.log("no resource to load, early way out");return l(e),void(f="complete")}var v,p=0;function m(e){var n=e.href;this.load=function(e,t){d(n,e,t,function(){console.warn(n+" not found."),console.warn('"'+e+'" resource not found'),u="",t()})}}v=function(){++p>=c&&(t(),l(e),f="complete")};for(var w=0;w<c;w++){new m(a[w]).load(e,v)}}function g(e,n,t){var o=r[e];if(!o){if(console.warn("#"+e+" is undefined."),!t)return null;o=t}var i={};for(var u in o){var a=o[u];a=p(a=v(a,n,e,u),n,e),i[u]=a}return i}function v(e,n,t,o){var i=/\{\[\s*([a-zA-Z]+)\(([a-zA-Z]+)\)\s*\]\}/.exec(e);if(!i||!i.length)return e;var u,f=i[1],c=i[2];(n&&c in n?u=n[c]:c in r&&(u=r[c]),f in a)&&(e=(0,a[f])(e,u,t,o));return e}function p(e,n,t){return e.replace(/\{\{\s*(.+?)\s*\}\}/g,function(e,o){return n&&o in n?n[o]:o in r?r[o]:(console.log("argument {{"+o+"}} for #"+t+" is undefined."),e)})}function m(e){var t=function(e){if(!e)return{};var n=e.getAttribute("data-l10n-id"),t=e.getAttribute("data-l10n-args"),r={};if(t)try{r=JSON.parse(t)}catch(e){console.warn("could not parse arguments for #"+n)}return{id:n,args:r}}(e);if(t.id){var r=g(t.id,t.args);if(r){if(r[i]){if(0===function(e){if(e.children)return e.children.length;if(void 0!==e.childElementCount)return e.childElementCount;for(var n=0,t=0;t<e.childNodes.length;t++)n+=1===e.nodeType?1:0;return n}(e))e[i]=r[i];else{for(var o=e.childNodes,u=!1,a=0,f=o.length;a<f;a++)3===o[a].nodeType&&/\S/.test(o[a].nodeValue)&&(u?o[a].nodeValue="":(o[a].nodeValue=r[i],u=!0));if(!u){var c=n.createTextNode(r[i]);e.insertBefore(c,e.firstChild)}}delete r[i]}for(var l in r)e[l]=r[l]}else console.warn("#"+t.id+" is undefined.")}}function w(e){for(var t=function(e){return e?e.querySelectorAll("*[data-l10n-id]"):[]}(e=e||n.documentElement),r=t.length,o=0;o<r;o++)m(t[o]);m(e)}return a.plural=function(e,n,t,o){var f=parseFloat(n);if(isNaN(f))return e;if(o!=i)return e;a._pluralRules||(a._pluralRules=function(e){function n(e,n){return-1!==n.indexOf(e)}function t(e,n,t){return n<=e&&e<=t}var r={0:function(e){return"other"},1:function(e){return t(e%100,3,10)?"few":0===e?"zero":t(e%100,11,99)?"many":2==e?"two":1==e?"one":"other"},2:function(e){return 0!==e&&e%10==0?"many":2==e?"two":1==e?"one":"other"},3:function(e){return 1==e?"one":"other"},4:function(e){return t(e,0,1)?"one":"other"},5:function(e){return t(e,0,2)&&2!=e?"one":"other"},6:function(e){return 0===e?"zero":e%10==1&&e%100!=11?"one":"other"},7:function(e){return 2==e?"two":1==e?"one":"other"},8:function(e){return t(e,3,6)?"few":t(e,7,10)?"many":2==e?"two":1==e?"one":"other"},9:function(e){return 0===e||1!=e&&t(e%100,1,19)?"few":1==e?"one":"other"},10:function(e){return t(e%10,2,9)&&!t(e%100,11,19)?"few":e%10!=1||t(e%100,11,19)?"other":"one"},11:function(e){return t(e%10,2,4)&&!t(e%100,12,14)?"few":e%10==0||t(e%10,5,9)||t(e%100,11,14)?"many":e%10==1&&e%100!=11?"one":"other"},12:function(e){return t(e,2,4)?"few":1==e?"one":"other"},13:function(e){return t(e%10,2,4)&&!t(e%100,12,14)?"few":1!=e&&t(e%10,0,1)||t(e%10,5,9)||t(e%100,12,14)?"many":1==e?"one":"other"},14:function(e){return t(e%100,3,4)?"few":e%100==2?"two":e%100==1?"one":"other"},15:function(e){return 0===e||t(e%100,2,10)?"few":t(e%100,11,19)?"many":1==e?"one":"other"},16:function(e){return e%10==1&&11!=e?"one":"other"},17:function(e){return 3==e?"few":0===e?"zero":6==e?"many":2==e?"two":1==e?"one":"other"},18:function(e){return 0===e?"zero":t(e,0,2)&&0!==e&&2!=e?"one":"other"},19:function(e){return t(e,2,10)?"few":t(e,0,1)?"one":"other"},20:function(e){return!t(e%10,3,4)&&e%10!=9||t(e%100,10,19)||t(e%100,70,79)||t(e%100,90,99)?e%1e6==0&&0!==e?"many":e%10!=2||n(e%100,[12,72,92])?e%10!=1||n(e%100,[11,71,91])?"other":"one":"two":"few"},21:function(e){return 0===e?"zero":1==e?"one":"other"},22:function(e){return t(e,0,1)||t(e,11,99)?"one":"other"},23:function(e){return t(e%10,1,2)||e%20==0?"one":"other"},24:function(e){return t(e,3,10)||t(e,13,19)?"few":n(e,[2,12])?"two":n(e,[1,11])?"one":"other"}},o={af:3,ak:4,am:4,ar:1,asa:3,az:0,be:11,bem:3,bez:3,bg:3,bh:4,bm:0,bn:3,bo:0,br:20,brx:3,bs:11,ca:3,cgg:3,chr:3,cs:12,cy:17,da:3,de:3,dv:3,dz:0,ee:3,el:3,en:3,eo:3,es:3,et:3,eu:3,fa:0,ff:5,fi:3,fil:4,fo:3,fr:5,fur:3,fy:3,ga:8,gd:24,gl:3,gsw:3,gu:3,guw:4,gv:23,ha:3,haw:3,he:2,hi:4,hr:11,hu:0,id:0,ig:0,ii:0,is:3,it:3,iu:7,ja:0,jmc:3,jv:0,ka:0,kab:5,kaj:3,kcg:3,kde:0,kea:0,kk:3,kl:3,km:0,kn:0,ko:0,ksb:3,ksh:21,ku:3,kw:7,lag:18,lb:3,lg:3,ln:4,lo:0,lt:10,lv:6,mas:3,mg:4,mk:16,ml:3,mn:3,mo:9,mr:3,ms:0,mt:15,my:0,nah:3,naq:7,nb:3,nd:3,ne:3,nl:3,nn:3,no:3,nr:3,nso:4,ny:3,nyn:3,om:3,or:3,pa:3,pap:3,pl:13,ps:3,pt:3,rm:3,ro:9,rof:3,ru:11,rwk:3,sah:0,saq:3,se:7,seh:3,ses:0,sg:0,sh:11,shi:19,sk:12,sl:14,sma:7,smi:7,smj:7,smn:7,sms:7,sn:3,so:3,sq:3,sr:11,ss:3,ssy:3,st:3,sv:3,sw:3,syr:3,ta:3,te:3,teo:3,th:0,ti:4,tig:3,tk:3,tl:4,tn:3,to:0,tr:0,ts:3,tzm:22,uk:11,ur:3,ve:3,vi:0,vun:3,wa:4,wae:3,wo:0,xh:3,xog:3,yo:0,zh:0,zu:3}[e.replace(/-.*$/,"")];return o in r?r[o]:(console.warn("plural form unknown for ["+e+"]"),function(){return"other"})}(u));var c="["+a._pluralRules(f)+"]";return 0===f&&t+"[zero]"in r?e=r[t+"[zero]"][o]:1==f&&t+"[one]"in r?e=r[t+"[one]"][o]:2==f&&t+"[two]"in r?e=r[t+"[two]"][o]:t+c in r?e=r[t+c][o]:t+"[other]"in r&&(e=r[t+"[other]"][o]),e},{get:function(e,n,t){var r,o=e.lastIndexOf("."),u=i;o>0&&(u=e.substr(o+1),e=e.substring(0,o)),t&&((r={})[u]=t);var a=g(e,n,r);return a&&u in a?a[u]:"{{"+e+"}}"},getData:function(){return r},getText:function(){return o},getLanguage:function(){return u},setLanguage:function(e,n){h(e,function(){n&&n(),w()})},getDirection:function(){var e=u.split("-",1)[0];return["ar","he","fa","ps","ur"].indexOf(e)>=0?"rtl":"ltr"},translate:w,getReadyState:function(){return f},ready:function(t){t&&("complete"==f||"interactive"==f?e.setTimeout(function(){t()}):n.addEventListener&&n.addEventListener("localized",function e(){n.removeEventListener("localized",e),t()}))}}}(window,document);
//# sourceMappingURL=l10n.js.map
