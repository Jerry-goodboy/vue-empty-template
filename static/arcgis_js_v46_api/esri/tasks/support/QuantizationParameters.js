// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/JSONSupport ../../core/kebabDictionary ../../core/lang ../../geometry/Extent".split(" "),function(n,p,g,c,b,h,k,l,m){var f=k({upperLeft:"upper-left",lowerLeft:"lower-left"});return function(d){function a(){var a=null!==d&&d.apply(this,arguments)||this;a.extent=null;a.mode="view";a.originPosition="upper-left";return a}g(a,d);e=a;a.prototype.clone=function(){return new e(l.clone({extent:this.extent,
mode:this.mode,originPosition:this.originPosition,tolerance:this.tolerance}))};c([b.property({type:m,json:{write:!0}})],a.prototype,"extent",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"mode",void 0);c([b.property({type:String,json:{read:f.read,write:f.write}})],a.prototype,"originPosition",void 0);c([b.property({type:Number,json:{write:!0}})],a.prototype,"tolerance",void 0);return a=e=c([b.subclass("esri.tasks.support.QuantizationParameters")],a);var e}(b.declared(h))});