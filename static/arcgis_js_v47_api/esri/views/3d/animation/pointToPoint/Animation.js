// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ./Camera ../../lib/glMatrix ../../webgl-engine/lib/Camera ../../../animation/pointToPoint/Animation".split(" "),function(e,k,r,l,m,n,p){Object.defineProperty(k,"__esModule",{value:!0});var f=m.vec3d,q=f.create();e=function(){function d(a){this.currentTime=0;this.animation=new p.Animation(function(){return new l.default(a)});this._current=new l.default(a)}Object.defineProperty(d.prototype,"finished",{get:function(){return this.currentTime>=
this.animation.time},enumerable:!0,configurable:!0});Object.defineProperty(d.prototype,"time",{get:function(){return this.animation.time},enumerable:!0,configurable:!0});d.prototype.update=function(a,c,d){var g=this.animation.definition.source,e=this.animation.definition.target,b=f.subtract(c.center,a.center,q),h=f.length(b);1E-5<=h?(b[0]/=h,b[1]/=h,b[2]/=h):(b[0]=0,b[1]=1,b[0]=0);f.set(b,g.lookAtDirection);f.set(b,e.lookAtDirection);g.copyFromRenderCamera(a);e.copyFromRenderCamera(c);this._current.copyFrom(g);
this.animation.update(g,e,d);this.currentTime=0;a.almostEquals(c,5E-4,!0)&&(this.currentTime=this.animation.time)};d.prototype.cameraAt=function(a,c){a=this.animation.cameraAt(a,this._current);c||(c=new n);a.copyToRenderCamera(c);return c};d.prototype.step=function(a,c){this.finished||(this.currentTime+=a,this.currentTime>=this.time&&(this.currentTime=this.time));return this.cameraAt(this.currentTime/this.time,c)};return d}();k.Animation=e;k.default=e});