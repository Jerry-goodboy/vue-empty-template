// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports dojo/promise/all dojo/has ../../../webgl/Texture ./Rect ./RectangleBinPack".split(" "),function(F,G,C,u,D,E,B){var r;u("stable-symbol-rendering")&&(r=new Set);return function(){function g(c,b,a){this.height=this.width=0;this._dirties=[];this._glyphData=[];this._currentPage=0;this._glyphIndex={};this._textures=[];this._rangePromises=new Map;(0>=c||0>=b)&&console.error("Glyph mosaic width and height must be greater than zero!");this.width=c;this.height=b;this._glyphSource=a;
this._binPack=new B(c-4,b-4);this._glyphData.push(new Uint8Array(c*b));this._dirties.push(!0);this._textures.push(void 0)}g.prototype.getGlyphItems=function(c,b){var a=this,z=[],m=this._glyphSource,g=new Set;c=1/256;for(var n=0;n<b.length;n++)g.add(Math.floor(b[n]*c));var A=[];g.forEach(function(b){if(256>=b){var d="Arial Regular"+b;a._rangePromises.has(d)?A.push(a._rangePromises.get(d)):(b=m.getRange("Arial Regular",b).always(function(){a._rangePromises["delete"](d)}),a._rangePromises.set(d,b),A.push(b))}});
return C(A).then(function(c){c=a._glyphIndex["Arial Regular"];c||(c={},a._glyphIndex["Arial Regular"]=c);var d;if(u("stable-symbol-rendering")){r.clear();for(var f=0;f<b.length;f++)d=b[f],r.add(d);var v=[];g.forEach(function(a){v.push(a)});v.sort();d=[];for(f=0;f<v.length;f++)for(var w=v[f],e=0;256>e;++e)d.push(256*w+e)}else d=b;f=0;for(w=d;f<w.length;f++)if(d=w[f],e=c[d]){if(!u("stable-symbol-rendering")||r.has(d))z[d]={rect:e.rect,metrics:e.metrics,page:e.page}}else{var k=m.getGlyph("Arial Regular",
d);if(k&&k.metrics){var e=k.metrics,h=void 0;if(0===e.width)h=new E(0,0,0,0);else{var p=e.width+6,t=e.height+6,q=p%4?4-p%4:4,l=t%4?4-t%4:4;1===q&&(q=5);1===l&&(l=5);h=a._binPack.allocate(p+q,t+l);h.isEmpty&&(a._dirties[a._currentPage]||(a._glyphData[a._currentPage]=null),a._currentPage=a._glyphData.length,a._glyphData.push(new Uint8Array(a.width*a.height)),a._dirties.push(!0),a._textures.push(void 0),a._binPack=new B(a.width-4,a.height-4),h=a._binPack.allocate(p+q,t+l));var q=a._glyphData[a._currentPage],
k=k.bitmap,n=l=void 0;if(k)for(var x=0;x<t;x++)for(var l=p*x,n=a.width*(h.y+x+1)+h.x,y=0;y<p;y++)q[n+y+1]=k[l+y]}c[d]={rect:h,metrics:e,tileIDs:null,page:a._currentPage};if(!u("stable-symbol-rendering")||r.has(d))z[d]={rect:h,metrics:e,page:a._currentPage};a._dirties[a._currentPage]=!0}}return z})};g.prototype.bind=function(c,b,a,g){this._textures[a]||(this._textures[a]=new D(c,{pixelFormat:6406,dataType:5121,width:this.width,height:this.height},new Uint8Array(this.width*this.height)));var m=this._textures[a];
m.setSamplingMode(b);this._dirties[a]&&m.setData(this._glyphData[a]);c.bindTexture(m,g);this._dirties[a]=!1};g.prototype.dispose=function(){this._binPack=null;for(var c=0,b=this._textures;c<b.length;c++){var a=b[c];a&&a.dispose()}this._textures.length=0};return g}()});