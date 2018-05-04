// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper dojo/promise/all ../../../core/Error ../../../core/promiseUtils ../../../core/watchUtils ../../../core/accessorSupport/decorators ../../../layers/graphics/QueryEngine ../../../renderers/support/renderingInfoUtils ./LayerView3D ./graphics/Graphics3DLayerViewCore ./graphics/graphicUtils ./support/LayerViewUpdatingPercentage ./support/projectExtentUtils".split(" "),function(y,z,l,f,m,h,g,n,e,p,
q,r,t,u,v,w){return function(k){function b(a){a=k.call(this)||this;a.supportsHeightUnitConversion=!0;a.controller=null;a.supportsDraping=!0;a._overlayUpdating=null;a._progressMaxNumNodes=0;a._eventHandles=[];a._controllerClientSideFiltering=!1;a._suspendResumeExtent=null;a.fullExtentInViewSpatialReference=null;a._isUpdating=!1;a._controllerCreated=!1;return a}l(b,k);Object.defineProperty(b.prototype,"drawingOrder",{set:function(a){this._layerViewCore.graphicsCore.setDrawingOrder(a);this._set("drawingOrder",
a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"hasDraped",{get:function(){return this._layerViewCore.graphicsCore.hasDraped},enumerable:!0,configurable:!0});b.prototype.initialize=function(){var a=this;this._layerViewCore=new t({owner:this,layer:this.layer,spatialIndexRequired:!0,frustumVisibilityEnabled:!0,scaleVisibilityEnabled:!0,labelingEnabled:this.labelingEnabled,elevationAlignmentEnabled:!0,elevationFeatureExpressionEnabled:!0,verticalScaleEnabled:this.supportsHeightUnitConversion,
highlightsEnabled:!0,updateSuspendResumeExtent:function(){return a.updateSuspendResumeExtent()},updateClippingExtent:function(b){return a.updateClippingExtent(b)}});this.addResolvingPromise(this._layerViewCore.initialize());this.drawingOrder=this.view.getDrawingOrder(this.layer.uid);this.initializeController();this.addResolvingPromise(this.validateGeometryType());var b=w.toView(this).then(function(b){a.fullExtentInViewSpatialReference=b});b&&this.addResolvingPromise(b);this._evaluateUpdatingState()};
b.prototype.destroy=function(){this._eventHandles.forEach(function(a){return a.remove()});this._eventHandles=null;this.controller&&(this.controller.destroy(),this.controller=null);this._layerViewCore&&(this._layerViewCore.destroy(),this._layerViewCore=null);this.loadedGraphics=null};b.prototype.getRenderingInfo=function(a){if((a=q.getRenderingInfo(a,{renderer:this.layer.renderer}))&&a.color){var b=a.color;b[0]/=255;b[1]/=255;b[2]/=255}return a};b.prototype.getGraphicsFromStageObject=function(a,b){var x=
a.getMetadata().graphicId,d=null;this.loadedGraphics&&this.loadedGraphics.some(function(a){return a.uid===x?(d=a,!0):!1});return g.create(function(a,b){null!==d?a(d):b()})};b.prototype.getGraphics3DGraphics=function(){return this._layerViewCore.graphicsCore.getGraphics3DGraphics()};b.prototype.getGraphics3DGraphicsKeys=function(){return this._layerViewCore.graphicsCore.getGraphics3DGraphicsKeys()};b.prototype.getSymbolUpdateType=function(){return this._layerViewCore.graphicsCore.getSymbolUpdateType()};
b.prototype.queryGraphics=function(){return this._queryEngine?this._queryEngine.queryFeatures():this._rejectQuery()};b.prototype.queryFeatures=function(a){return this._queryEngine?this._queryEngine.queryFeatures(a):this._rejectQuery()};b.prototype.queryObjectIds=function(a){return this._queryEngine?this._queryEngine.queryObjectIds(a):this._rejectQuery()};b.prototype.queryFeatureCount=function(a){return this._queryEngine?this._queryEngine.queryFeatureCount(a):this._rejectQuery()};b.prototype.queryExtent=
function(a){return this._queryEngine?this._queryEngine.queryExtent(a):this._rejectQuery()};b.prototype.whenGraphicBounds=function(a,b){return this._layerViewCore.graphicsCore.whenGraphicBounds(a,b)};b.prototype.highlight=function(a,b){return this._layerViewCore.highlight(a,b,this.layer.objectIdField)};b.prototype._rejectQuery=function(){return g.reject(new h("FeatureLayerView3D","Not ready to execute query"))};b.prototype._notifySuspendedChange=function(){this.notifyChange("suspended")};b.prototype._notifyDrapedDataChange=
function(){this.notifyChange("hasDraped");this.emit("draped-data-change")};b.prototype.canResume=function(){return this.inherited(arguments)&&this._layerViewCore&&this._layerViewCore.canResume()};b.prototype._evaluateUpdatingState=function(){if(this._layerViewCore.elevationAlignment){var a;a=0+this._layerViewCore.elevationAlignment.numNodesUpdating();a+=this._layerViewCore.graphicsCore.numNodesUpdating();var b;b=(b=(b=(b=(b=!this._controllerCreated)||this.controller&&this.controller.updating)||this._overlayUpdating)||
this._layerViewCore.graphicsCore.needsIdleUpdate())||!(this.view.basemapTerrain&&this.view.basemapTerrain.ready);var c;c=(c=0<a||b||this._layerViewCore.spatialIndex.isUpdating())||this._layerViewCore.elevationAlignment.isUpdating();this._progressMaxNumNodes=Math.max(a,this._progressMaxNumNodes);0===a&&(this._progressMaxNumNodes=1);this._isUpdating=c;this.notifyChange("updating");this._set("updatingPercentageValue",b?100:100*a/this._progressMaxNumNodes)}else this._isUpdating=!1,this.notifyChange("updating"),
this._set("updatingPercentageValue",100)};b.prototype.isUpdating=function(){return this._isUpdating};b.prototype.initializeController=function(){var a=this,b=null,c=this.createController().then(function(a){b=a}),d=n.whenTrueOnce(this.view,"basemapTerrain.ready");m([this.when(),d]).then(function(){a.controller=b;a._eventHandles.push(a.controller.watch("updating",function(){return a._evaluateUpdatingState()}));a.loadedGraphics=b.graphics;a._queryEngine=new p({features:a.loadedGraphics,objectIdField:a.layer.objectIdField});
a._evaluateUpdatingState()}).always(function(){a._controllerCreated=!0;a._evaluateUpdatingState()});this.addResolvingPromise(c)};b.prototype.updateClippingExtent=function(a){if(this.controller){if(this._controllerClientSideFiltering)return!1;this.controller.extent?(this.controller.extent=null,this._controllerClientSideFiltering=!0):this.controller.extent=a;return!0}return!1};b.prototype.updateSuspendResumeExtent=function(){return this._suspendResumeExtent=u.enlargeExtent(this._layerViewCore.graphicsCore.computedExtent,
this._suspendResumeExtent,1.2)};b.prototype.validateGeometryType=function(){var a=this.layer;switch(a.geometryType){case "multipatch":case "multipoint":return g.reject(new h("featurelayerview3d:unsupported-geometry-type","Unsupported geometry type ${geometryType}",{geometryType:a.geometryType}))}};b.prototype.getStats=function(){var a=this._layerViewCore.graphicsCore.getGraphics3DGraphics(),b="null",c=this._suspendResumeExtent;c&&(b=[c[0],c[1],c[2],c[3]].map(function(a){return a.toPrecision(4)}).join(", "));
var c="null",d=this._layerViewCore.graphicsCore.computedExtent;d&&(c=[d.xmin,d.ymin,d.xmax,d.ymax].map(function(a){return a.toPrecision(4)}).join(", "));return{numCollection:this.loadedGraphics.length,numGraphics:Object.keys(a).length,numElevationUpdating:this._layerViewCore.elevationAlignment.numNodesUpdating(),numSpatialIndexUpdating:this._layerViewCore.spatialIndex.numNodesUpdating(),numGraphicsUpdating:this._layerViewCore.graphicsCore.numNodesUpdating(),visibilityFrustum:this._layerViewCore.frustumVisibility.canResume(),
visibilityScale:this._layerViewCore.scaleVisibility.canResume(),resumeExtent:b,computedExtent:c,updating:this.updating,suspended:this.suspended}};b.maximumFeatureCount=-1;f([e.property()],b.prototype,"drawingOrder",null);f([e.property()],b.prototype,"loadedGraphics",void 0);f([e.property()],b.prototype,"symbolsUpdating",void 0);f([e.property()],b.prototype,"hasDraped",null);f([e.property()],b.prototype,"controller",void 0);return b=f([e.subclass("esri.views.3d.layers.GraphicsLayerView3DBase")],b)}(e.declared(r,
v))});