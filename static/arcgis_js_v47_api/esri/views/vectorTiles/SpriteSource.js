// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/extendsHelper ../../core/tsSupport/decorateHelper dojo/Deferred ../../kernel ../../request ../../core/promiseUtils ../../core/urlUtils".split(" "),function(r,t,u,v,n,k,p,l,q){return function(){function c(b,f){this.baseURL=b;this.devicePixelRatio=f;this._isRetina=!1;this._spritesData={};this.height=this.width=this.image=null;this.loadStatus="not-loaded"}Object.defineProperty(c.prototype,"spriteNames",{get:function(){var b=[],f;for(f in this._spritesData)b.push(f);
b.sort();return b},enumerable:!0,configurable:!0});c.prototype.getSpriteInfo=function(b){return this._spritesData[b]};c.prototype.load=function(){var b=this;this.loadStatus="loading";return this.baseURL?this._loadSprites().then(function(){b.loadStatus="loaded";return b}).catch(function(f){b.loadStatus="failed";return b}):l.resolve(this)};c.prototype._loadSprites=function(){var b=this;this._isRetina=1.15<this.devicePixelRatio?!0:!1;var f=this.baseURL,c=this._isRetina?"@2x":"";return p(f+c+".json",
{callbackParamName:"callback",responseType:"json"}).then(function(h){var g=Object.keys(h.data);if(!g||0===g.length||1===g.length&&"_ssl"===g[0])return l.resolve(null);b._spritesData=h.data;var m=new n,d=new Image;d.crossOrigin="anonymous";d.onload=function(){d.onload=null;b.width=d.width;b.height=d.height;var a=document.createElement("canvas");a.width=d.width;a.height=d.height;a=a.getContext("2d");a.drawImage(d,0,0,d.width,d.height);for(var a=a.getImageData(0,0,d.width,d.height),a=new Uint8Array(a.data),
c,e=0;e<a.length;e+=4)c=a[e+3]/255,a[e]*=c,a[e+1]*=c,a[e+2]*=c;b.image=a;m.resolve()};h=""+f+c+".png";k.id&&(g=k.id.findCredential(h))&&g.token&&(h+="?token\x3d"+g.token);d.src=q.addProxy(h);return m})};return c}()});