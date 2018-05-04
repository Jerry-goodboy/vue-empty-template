// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ./lib/Camera ./lib/gl-matrix ./lib/ModelContentType ./lib/Selector ./lib/Util ./lighting/Lightsources ./parts/Model ./parts/View".split(" "),function(r,t,w,k,u,n,g,v,p,x){r=k.vec2d;t=k.vec2;var h=k.vec3d;k=function(){function b(a,c,d){this._intersectTolerance=n.DEFAULT_TOLERANCE;this._viewContent=[];this._externalIntersectionHandlers=[];this.container=c;this.viewingMode=a;this.model=new p;this.view=new x(c,this,this.model.getDirtySet(),d);this._validateHUDSelector=new n(this.viewingMode);
this._validateHUDSelector.enableHUDSelection=!1;this.view.setLighting({lights:[new v.MainLight(h.createFrom(.7,.7,.7)),new v.AmbientLight(h.createFrom(.3,.3,.3))],groundLightingFactor:.5,globalFactor:.5})}b.prototype.setNeedsRender=function(){this.view.setNeedsRender()};b.prototype.dispose=function(){this.view.dispose();this.model=this.view=null};b.prototype.frame=function(a,c){void 0===c&&(c=0);var d=Math.max(1E-6,a.getBSRadius());c=Math.max(2,c+2);c*=d;var d=this.getCamera(),b=h.create(d.viewForward);
h.scale(b,-(1.5*c/Math.tan(d.fov)));h.set(a.getCenter(),d.center);h.add(d.center,b,d.eye);d=new w(d.eye,d.center,d.up);this.setCamera(d)};b.prototype.beginMod=function(){b.DebugSettings.fineGrainedContentValidation&&this.model.validateContent()};b.prototype.endMod=function(a){void 0===a&&(a=!1);b.DebugSettings.fineGrainedContentValidation&&!a&&this.model.validateContent()};b.prototype.add=function(a,c){this.model.add(a,c);"function"===typeof c.addParentStage&&c.addParentStage(this)};b.prototype.remove=
function(a,c){a=this.model.remove(a,c);"function"===typeof a.removeParentStage&&a.removeParentStage(this);return a};b.prototype.notifyDirty=function(a,c,d,b){this.model.notifyDirty(a,c,d,b)};b.prototype.processDirty=function(){var a=this.model.getDirtySet(),c=a.getDirtyMaterials();if(a.hasDirtyGeometryRecords()||c){b.DebugSettings.endFrameContentValidation&&this.model.validateContent();b.DebugSettings.logDirtySet&&console.log("Dirty set: "+this.model.getDirtySet().formatDebugInfo(!1));var d=a.getAddRemoveUpdateListFilteredByLayers(this._viewContent,
!0);(0<d[0].length+d[1].length+d[2].length||c)&&this.view.modify(d[0],d[1],d[2],c);b.DebugSettings.logDirtySet&&(console.log("RGs add: "+d[0].map(function(a){return a.uniqueName})),console.log("RGs remove: "+d[1].map(function(a){return a.uniqueName})));a.getAddRemoveUpdateList(!0);a.clearDirtyMaterials();this.view.setNeedsRender()}};b.prototype.processDirtyLayer=function(a){var c=this.model.getDirtySet(),d=c.getDirtyMaterials();a=c.getAddRemoveUpdateListFilteredByLayers([a],!0);(0<a[0].length+a[1].length+
a[2].length||d)&&this.view.modify(a[0],a[1],a[2],d);c.clearDirtyMaterials();this.view.setNeedsRender()};b.prototype.get=function(a,c){return this.model.get(a,c)};b.prototype.getAll=function(a){return this.model.getAll(a)};b.prototype.addTextureListener=function(a){this.view.addTextureListener(a)};b.prototype.removeTextureListener=function(a){this.view.removeTextureListener(a)};b.prototype.getContainer=function(){return this.container};b.prototype.getCamera=function(){return this.view.getCamera()};
b.prototype.setCamera=function(a){this.view.setCamera(a)};b.prototype.getViewParams=function(a){return this.view.getViewParams(a)};b.prototype.setViewParams=function(a){this.view.setViewParams(a)};b.prototype.getLayers=function(){return this.model.getAll(u.LAYER)};b.prototype.setLighting=function(a){this.view.setLighting(a)};b.prototype.getCanvas=function(){return this.view.getCanvas()};b.prototype.setRenderParams=function(a){this.view.setRenderParams(a)};b.prototype.getRenderParams=function(){return this.view.getRenderParams()};
b.prototype.has=function(a){return this.view.has(a)};b.prototype.getViewContent=function(){return this._viewContent.slice(0)};b.prototype.setViewContent=function(a){var c=g.array2object(this._viewContent),d=g.array2object(a),b=g.subtractObjects(d,c),c=g.subtractObjects(c,d);this.processDirty();d=this.model.getDirtySet();b=d.getResidentRenderGeometriesFilteredByLayers(g.object2array(b));c=d.getResidentRenderGeometriesFilteredByLayers(g.object2array(c));this.view.modify(b,c,[]);this._viewContent=a.slice(0)};
b.prototype.addToViewContent=function(a){for(var c=[],d=0;d<a.length;d++)-1===this._viewContent.indexOf(a[d])&&c.push(a[d]);0<a.length&&(this.processDirty(),a=this.model.getDirtySet().getResidentRenderGeometriesFilteredByLayers(c),this.view.modify(a,[],[]),this._viewContent.push.apply(this._viewContent,c))};b.prototype.removeFromViewContent=function(a){this.processDirty();for(var c=this.model.getDirtySet(),d=this._viewContent,b=[],e=0;e<a.length;e++){var h=d.indexOf(a[e]);-1<h&&(d[h]=d[d.length-1],
d.pop(),b.push(a[e]))}a=c.getResidentRenderGeometriesFilteredByLayers(b);this.view.modify([],a,[])};b.prototype.getViewFrustumObjects=function(){return this.view.getFrustumObjects()};b.prototype.getLocalOrigin=function(a,c,d){return this.model.getOrigin(a,c,d)};b.prototype.getFrameTask=function(){return this.view.getFrameTask()};b.prototype.requestScreenCapture=function(a,c){this.view.requestScreenCapture(a,c)};b.prototype.getAllTexturesLoaded=function(){return this.view.getAllTexturesLoaded()};b.prototype.getTextureLoaded=
function(a){return this.view.getTextureLoaded(a)};b.prototype.addExternalRenderer=function(a,c){"function"===typeof c.intersect&&this._externalIntersectionHandlers.push(c);return this.view.addExternalRenderer(a,c)};b.prototype.removeExternalRenderer=function(a){var c=this._externalIntersectionHandlers.indexOf(a);-1<c&&this._externalIntersectionHandlers.splice(c,1);return this.view.removeExternalRenderer(a)};b.prototype.getContentDebugStrings=function(a){return this.model.formatDebugInfo(a)};b.prototype.getRenderStats=
function(){return this.view.getCombinedStats()};b.prototype.getRenderStatString=function(a){var c=this.getRenderStats(),d="";if(a){var d=d+"\x3ctable\x3e",b;for(b in c)d+="\x3ctr\x3e\x3ctd\x3e"+b+'\x3c/td\x3e\x3ctd style\x3d"text-align: right"\x3e'+Math.round(c[b])+"\x3c/td\x3e\x3c/tr\x3e";d+="\x3c/table\x3e"}else for(b in c)d+=b+": "+c[b]+"\n";return d};b.prototype.pick=function(a,b,d,y){var c=h.create(),g=h.create();this.view.getPickRay(a,c,g);return this.pickRay(c,g,a,a,b,d,y)};b.prototype.pickRayWithBeginPoint=
function(a,b,d,h,e){this.view.pickRayWithBeginPoint(a,b,d,h,e)};b.prototype.pickRay=function(a,b,d,g,e,k,l){g=this.view.getCamera();d||(d=z,g.projectPoint(b,d));var c;if(e){c=Array(e.length);for(var f=0;f<c.length;f++)c[f]=this.model.get(p.ContentType.LAYER,e[f])}else{c=[];e=this.getViewContent();for(var m=this.model.getAll(p.ContentType.LAYER),f=0;f<e.length;f++){var q=m[e[f]];q&&q.isPickable&&c.push(q)}}l?l.init(c,a,b,d,g,this._intersectTolerance,k):l=new n(this.viewingMode,c,a,b,d,g,this._intersectTolerance,
k);for(f=0;f<this._externalIntersectionHandlers.length;f++)this._externalIntersectionHandlers[f].intersect(l,a,b,d);if(l.getHudResults().length){f=l.getHudResults();f.sort(function(a,b){return b.dist-a.dist});b=f[f.length-1];e=A;g.projectPoint(b.center,e);e[0]=Math.round(e[0]);e[1]=Math.round(e[1]);m=B;this.view.getPickRay(e,a,m);d=h.dist(b.center,a)/h.dist(a,m)*.99;this._validateHUDSelector.init(c,a,m,e,g,this._intersectTolerance,k);for(f=0;f<this._externalIntersectionHandlers.length;f++)this._externalIntersectionHandlers[f].intersect(this._validateHUDSelector,
a,m,e);a=this._validateHUDSelector.getMinResult();(null==a.dist||d<=a.dist)&&l.getMinResult().copyFrom(b)}return l};b.prototype.getIntersectTolerance=function(){return this._intersectTolerance};b.prototype.setIntersectTolerance=function(a){void 0===a&&(a=1E-5);this._intersectTolerance=a};b.prototype.getTextureGraphicsRenderer=function(){return this.view.getTextureGraphicsRenderer()};b.DebugSettings={fineGrainedContentValidation:!1,endFrameContentValidation:!1,logDirtySet:!1};b.ModelContentType=u;
return b}();var z=r.create(),A=t.create(),B=h.create();return k});