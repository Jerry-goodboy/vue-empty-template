// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/lang ../../core/accessorSupport/decorators ./PointCloudFilter".split(" "),function(k,l,f,c,g,b,h){return function(e){function a(a){a=e.call(this)||this;a.includedReturns=[];a.type="return";return a}f(a,e);d=a;a.prototype.clone=function(){return new d({field:this.field,includedReturns:g.clone(this.includedReturns)})};c([b.property({type:[String],json:{write:{enabled:!0,isRequired:!0}}})],
a.prototype,"includedReturns",void 0);c([b.property()],a.prototype,"type",void 0);return a=d=c([b.subclass("esri.layers.pointCloudFilters.PointCloudReturnFilter")],a);var d}(b.declared(h))});