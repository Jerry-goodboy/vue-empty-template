// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/Error ../core/MultiOriginJSONSupport ../core/promiseUtils ../core/scheduling ../core/accessorSupport/decorators ./Layer ./mixins/PortalLayer".split(" "),function(p,q,f,b,g,h,k,l,d,m,n){return function(e){function a(c){c=e.call(this)||this;c.resourceInfo=null;c.type="unknown";return c}f(a,e);a.prototype.initialize=function(){var c=this;this.addResolvingPromise(k.create(function(a,d){l.schedule(function(){var a=
c.resourceInfo&&(c.resourceInfo.layerType||c.resourceInfo.type),b="Unknown layer type";a&&(b+=" "+a);d(new g("layer:unknown-layer-type",b,{layerType:a}))})}))};a.prototype.read=function(a,b){this.inherited(arguments,[{resourceInfo:a},b]);return this};a.prototype.write=function(a,b){return null};b([d.shared("esri.layers.UnknownLayer")],a.prototype,"declaredClass",void 0);b([d.property({readOnly:!0})],a.prototype,"resourceInfo",void 0);b([d.property({json:{read:!1},readOnly:!0,value:"unknown"})],a.prototype,
"type",void 0);return a=b([d.subclass()],a)}(d.declared(m,h,n))});