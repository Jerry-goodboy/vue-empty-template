// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/extendsHelper ../../../lib/glMatrix ./MomentumController ../../utils/navigationUtils".split(" "),function(b,e,f,c,g,h){Object.defineProperty(e,"__esModule",{value:!0});b=function(b){function d(a,k,d){a=b.call(this,a,1)||this;a.momentum=k;a.zoomCenter=c.vec3d.create();c.vec3d.set(d,a.zoomCenter);a.constraintOptions.interactionDirection=c.vec3d.create();return a}f(d,b);d.prototype.momentumStep=function(a,b){c.vec3d.set(b.eye,this.constraintOptions.interactionDirection);
a=this.momentum.valueDelta(0,a);h.applyZoomToPoint(b,this.zoomCenter,a,this.view.state.constraints.minimumPoiDistance);this.constraintOptions.interactionDirection=c.vec3d.direction(this.constraintOptions.interactionDirection,b.eye)};return d}(g.MomentumController);e.ZoomPlanarMomentumController=b});