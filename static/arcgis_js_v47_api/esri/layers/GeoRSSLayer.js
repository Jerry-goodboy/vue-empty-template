// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper dojo/_base/lang ../config ../request ../core/Error ../core/promiseUtils ../core/accessorSupport/decorators ./Layer ./mixins/OperationalLayer ./mixins/PortalLayer ./mixins/RefreshableLayer ./mixins/ScaleRangeLayer ../symbols/PictureMarkerSymbol ../symbols/SimpleFillSymbol ../symbols/SimpleLineSymbol".split(" "),function(g,y,h,d,k,l,m,n,e,c,p,q,r,t,u,v,w,x){return function(f){function b(a,b){a=f.call(this)||
this;a.description=null;a.title=null;a.lineSymbol=null;a.pointSymbol=null;a.polygonSymbol=null;a.outSpatialReference=null;a.url=null;a.type="geo-rss";return a}h(b,f);b.prototype.normalizeCtorArgs=function(a,b){return"string"===typeof a?k.mixin({},{url:a},b):a};b.prototype.readFeatureCollections=function(a,b){return b.featureCollection.layers};b.prototype.load=function(){var a=this;this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service","Feature Service","Feature Collection","Scene Service"]}).always(function(){return a._fetchService()}));
return this.when()};b.prototype.importLayerViewModule=function(a){switch(a.type){case "2d":return e.create(function(a){return g(["../views/2d/layers/GeoRSSLayerView2D"],a)});case "3d":return e.reject(new n("geo-rss-layer:view-not-supported","GeoRSSLayer is only supported in 2D"))}};b.prototype._fetchService=function(){var a=this;return e.resolve().then(function(){return m(l.geoRSSServiceUrl,{callbackParamName:"callback",query:{url:a.url,refresh:a.loaded?!0:void 0,outSR:a.outSpatialReference?JSON.stringify(a.outSpatialReference.toJSON()):
void 0}})}).then(function(b){a.read(b.data,{origin:"service"})})};d([c.property()],b.prototype,"description",void 0);d([c.property()],b.prototype,"title",void 0);d([c.property()],b.prototype,"featureCollections",void 0);d([c.reader("service","featureCollections",["featureCollection.layers"])],b.prototype,"readFeatureCollections",null);d([c.property({type:x})],b.prototype,"lineSymbol",void 0);d([c.property({type:v})],b.prototype,"pointSymbol",void 0);d([c.property({type:w})],b.prototype,"polygonSymbol",
void 0);d([c.property()],b.prototype,"outSpatialReference",void 0);d([c.property()],b.prototype,"url",void 0);d([c.property({readOnly:!0,json:{read:!1},value:"geo-rss"})],b.prototype,"type",void 0);return b=d([c.subclass("esri.layers.GeoRSSLayer")],b)}(c.declared(p,q,r,t,u))});