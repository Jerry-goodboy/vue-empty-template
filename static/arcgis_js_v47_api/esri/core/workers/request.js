// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports","dojo/_base/lang","../global"],function(n,c,l,m){Object.defineProperty(c,"__esModule",{value:!0});var f;c.execute=function(c,d){void 0===d&&(d={});var a=d.responseType;a?"json"!==a&&"text"!==a&&"blob"!==a&&"array-buffer"!==a&&(a="text"):a="json";return m.invokeStaticMessage("request",{url:c,options:d}).then(function(k){var b=k.data,g,h,e;if(b&&("json"===a||"text"===a||"blob"===a)&&(g=new Blob([b]),"json"===a||"text"===a)&&(f||(f=new FileReaderSync),h=f.readAsText(g),"json"===
a&&(e=JSON.parse(h||null),e.error)))throw l.mixin(Error(),e.error);switch(a){case "json":b=e;break;case "text":b=h;break;case "blob":b=g}return{data:b,requestOptions:d,ssl:k.ssl,url:c}})}});