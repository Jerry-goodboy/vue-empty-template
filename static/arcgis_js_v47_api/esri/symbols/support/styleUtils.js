// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../request ../../core/Error ../../core/promiseUtils ../../core/urlUtils ../../portal/Portal ../../portal/PortalQueryParams ../Symbol3D ./jsonUtils ./StyleOrigin ./Thumbnail".split(" "),function(D,c,v,h,m,f,w,x,y,z,p,q){function A(a,b){return r(a).then(function(b){return{data:b.data,baseUrl:f.removeFile(a),styleUrl:a}})}function B(a,b){b=b.portal||w.getDefault();var e,n=b.url+" - "+(b.user&&b.user.username)+" - "+a;k[n]||(k[n]=C(a,b).then(function(a){e=a;return a.fetchData()}).then(function(b){return{data:b,
baseUrl:e.itemUrl,styleName:a}}));return k[n]}function C(a,b){return b.load().then(function(){var e=new x({disableExtraQuery:!0,query:"owner:"+l+" AND type:"+g+' AND typekeywords:"'+a+'"'});return b.queryItems(e)}).then(function(b){b=b.results;var e=null,f=a.toLowerCase();if(b&&Array.isArray(b))for(var c=0;c<b.length;c++){var d=b[c];if(d.typeKeywords.some(function(a){return a.toLowerCase()===f})&&d.type===g&&d.owner===l){e=d;break}}if(e)return e.load();throw new h("symbolstyleutils:style-not-found",
"The style '"+a+"' could not be found",{styleName:a});})}function t(a,b){return a.styleUrl?A(a.styleUrl,b):a.styleName?B(a.styleName,b):m.reject(new h("symbolstyleutils:style-url-and-name-missing","Either styleUrl or styleName is required to resolve a style"))}function u(a,b,e){for(var c=a.data,k={portal:e.portal,url:f.urlToObject(a.baseUrl),origin:"portal-item"},l=function(c){if(c.name!==b)return"continue";var d=f.read(c.webRef,k),g={portal:e.portal,url:f.urlToObject(f.removeFile(d)),origin:"portal-item"};
return{value:r(d).then(function(d){if((d=z.fromJSON(d.data,g))&&d.isInstanceOf(y)){if(c.thumbnail)if(c.thumbnail.href){var h=f.read(c.thumbnail.href,k);d.thumbnail=new q.default({url:h})}else c.thumbnail.imageData&&(d.thumbnail=new q.default({url:"data:image/png;base64,"+c.thumbnail.imageData}));a.styleUrl?d.styleOrigin=new p({portal:e.portal,styleUrl:a.styleUrl,name:b}):a.styleName&&(d.styleOrigin=new p({portal:e.portal,styleName:a.styleName,name:b}))}return d})}},d=0,c=c.items;d<c.length;d++){var g=
l(c[d]);if("object"===typeof g)return g.value}return m.reject(new h("symbolstyleutils:symbol-name-not-found","The symbol name '"+b+"' could not be found",{symbolName:b}))}function r(a){return v(f.normalize(a),{responseType:"json",query:{f:"json"}})}Object.defineProperty(c,"__esModule",{value:!0});var k={};c.fetchStyle=t;c.resolveWebStyleSymbol=function(a,b){return a.name?t(a,b).then(function(c){return u(c,a.name,b)}):m.reject(new h("symbolstyleutils:style-symbol-reference-name-missing","Missing name in style symbol reference"))};
c.fetchSymbolFromStyle=u;c.styleNameFromItem=function(a){var b=0;for(a=a.typeKeywords;b<a.length;b++){var c=a[b];if(/^Esri.*Style$/.test(c)&&"Esri Style"!==c)return c}};var l="esri_en",g="Style"});