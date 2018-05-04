// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports","./Texture","./Util","../../../webgl/Texture"],function(t,d,w,p,x){function u(){var a=document.createElement("canvas");a.width=512;a.height=512;return a}function y(a){return"rgb("+a.slice(0,3).map(function(a){return Math.floor(255*a)}).toString()+")"}function z(a){return"rgba("+a.slice(0,3).map(function(a){return Math.floor(255*a)}).toString()+","+a[3]+")"}t=function(){function a(a,c,b,f){void 0===f&&(f=!0);this._idHint=b;this._text=a;this._textLines=a.split(/\r?\n/);this._params=
c;this._haloSize=Math.round(this._params.halo.size);this._fillStyle=z(this._params.color);this._haloStyle=y(this._params.halo.color);this._textWidth=this._computeTextWidth();this._lineHeight=this._computeLineHeight();this._textHeight=this._computeTextHeight();this._scaleFactor=f?Math.min(1,Math.min(2048/this._textWidth,2048/this._textHeight)):1;this._renderedWidth=Math.round(this._textWidth*this._scaleFactor);this._renderedHeight=Math.round(this._textHeight*this._scaleFactor);f&&p.assert(2048>=this._renderedWidth&&
2048>=this._renderedHeight);this._width=p.nextHighestPowerOfTwo(this._renderedWidth);this._height=p.nextHighestPowerOfTwo(this._renderedHeight)}Object.defineProperty(a.prototype,"id",{get:function(){null==this._id&&(this._id=w.idGen.gen(this._idHint));return this._id},enumerable:!0,configurable:!0});a.prototype.getParams=function(){return this._params};a.prototype.getText=function(){return this._text};a.prototype.deferredLoading=function(){return!1};a.prototype.getWidth=function(){return this._width};
a.prototype.getHeight=function(){return this._height};a.prototype.getTextWidth=function(){return this._textWidth};a.prototype.getTextHeight=function(){return this._textHeight};a.prototype.getRenderedWidth=function(){return this._renderedWidth};a.prototype.getRenderedHeight=function(){return this._renderedHeight};a.prototype.initializeThroughRender=function(a,c){var b=this._getTextCanvas();b.width=this._width;b.height=this._height;var e=b.getContext("2d");e.save();c.samplingMode=9987;c.wrapMode=33071;
c.flipped=!0;c.preMultiplyAlpha=!0;c.hasMipmap=!0;this.renderText(this._renderedWidth,this._renderedHeight,e,0,this._height-this._renderedHeight);a=new x(a,c,b);e.restore();return a};a.prototype.getTexcoordScale=function(){return[this._renderedWidth/this._width,this._renderedHeight/this._height]};a.prototype.setUnloadFunc=function(a){this._unloadFunc=a};a.prototype.unload=function(){this._unloadFunc&&(this._unloadFunc(this._id),this._unloadFunc=null)};a.prototype.renderText=function(a,c,b,f,k){void 0===
f&&(f=0);void 0===k&&(k=0);c=this._lineHeight*this._scaleFactor;var g=this._haloSize,e=b.textAlign;a=("center"===e?.5*a:"right"===e?a:0)+g;b.save();var h=3>g;if(0<g){var e=g,l=this._getHaloCanvas();l.width=Math.max(512,this._renderedWidth);l.height=Math.max(512,this._renderedHeight);var m=l.getContext("2d");m.clearRect(0,0,l.width,l.height);this._setFontProperties(m,this._params.size*this._scaleFactor);m.fillStyle=this._haloStyle;m.strokeStyle=this._haloStyle;m.lineJoin=h?"miter":"round";if(h)for(var n=
0,d=this._textLines;n<d.length;n++){for(var h=d[n],r=0,q=v;r<q.length;r++){var p=q[r];m.fillText(h,a+g*p[0],g+g*p[1])}e+=c}else for(n=0,d=this._textLines;n<d.length;n++){h=d[n];r=2*g;for(q=0;5>q;q++)m.lineWidth=(.6+.1*q)*r,m.strokeText(h,a,e);e+=c}b.globalAlpha=this._params.halo.color[3];b.drawImage(l,f,k);l.width=512;l.height=512;b.globalAlpha=1}this._setFontProperties(b,this._params.size*this._scaleFactor);e=k+g;k=0;for(g=this._textLines;k<g.length;k++)h=g[k],b.globalCompositeOperation="destination-out",
b.fillStyle="rgb(0, 0, 0)",b.fillText(h,f+a,e),b.globalCompositeOperation="source-over",b.fillStyle=this._fillStyle,b.fillText(h,f+a,e),e+=c;b.restore()};a.preferredAtlasSize=function(){return 512};a.prototype._getTextCanvas=function(){null==a._textCanvas2D&&(a._textCanvas2D=u());return a._textCanvas2D};a.prototype._getHaloCanvas=function(){null==a._haloCanvas2D&&(a._haloCanvas2D=u());return a._haloCanvas2D};a.prototype._setFontProperties=function(a,c){var b=this._params.font;a.font=b.style+" "+b.weight+
" "+c+"px "+b.family;a.textAlign="left";a.textBaseline="top"};a.prototype._computeTextWidth=function(){var a=this._getTextCanvas().getContext("2d");this._setFontProperties(a,this._params.size);for(var c=0,b=0,f=this._textLines;b<f.length;b++){var d=a.measureText(f[b]).width;d>c&&(c=d)}b=this._params.font;if("italic"===b.style||"oblique"===b.style||"string"===typeof b.weight&&("bold"===b.weight||"bolder"===b.weight)||"number"===typeof b.weight&&600<b.weight)c+=.3*a.measureText("A").width;c+=2*this._haloSize;
return c=Math.round(c)};a.prototype._computeLineHeight=function(){return Math.floor(1.275*this._params.size+2*this._haloSize)};a.prototype._computeTextHeight=function(){return this._computeLineHeight()*this._textLines.length};return a}();var v=[];for(d=0;360>d;d+=22.5)v.push([Math.cos(Math.PI*d/180),Math.sin(Math.PI*d/180)]);return t});