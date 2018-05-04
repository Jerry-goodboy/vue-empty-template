// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ../lib/glMatrix ../../../geometry/support/scaleUtils ../support/mathUtils ../support/earthUtils".split(" "),function(C,r,g,v,n,p){Object.defineProperty(r,"__esModule",{value:!0});r.createNearFarHeuristic=function(c,e,d){return"global"===c?new w:new x(e,d)};var x=function(){function c(e,d){this.elevationProvider=e;this.unitInMeters=v.getMetersPerUnitForSR(d)}c.prototype.compute=function(e,d,a,m,b){b||(b={maxFarNearRatio:0,distance:0,minNearDistance:0});var c=p.earthRadius;b.maxFarNearRatio=
t;b.minNearDistance=u/this.unitInMeters;var f=e[2]*this.unitInMeters,h=f;m=f-m;var q=this.elevationProvider?this.elevationProvider.getElevationBounds():null;q&&(f=0<=m?h-this.unitInMeters*q[0]:this.unitInMeters*q[1]-h);h=Math.max(a.xmax-a.xmin,a.ymax-a.ymin,4*Math.max(a.xmax-a.xmin,a.ymax-a.ymin));g.vec3d.subtract(d,e,k);l[0]=0<k[0]?a.xmax:a.xmin;l[1]=0<k[1]?a.ymax:a.ymin;l[2]=0<k[2]?h/2:-h/2;g.vec3d.subtract(l,e);g.vec3d.normalize(k);e=1.1*g.vec3d.dot(l,k)*this.unitInMeters;d=f+c;c=Math.sqrt(d*d-
c*c);a=Math.max(a.xmax-a.xmin,a.ymax-a.ymin);d=a*y*this.unitInMeters;f=n.clamp((f-d)/(a*z*this.unitInMeters-d),0,1);b.distance=n.lerp(c,e,f*f*f);b.distance*=Math.max(Math.log(Math.abs(m)),1);b.distance=Math.min(b.distance,Math.max(34064E4,h));b.distance/=this.unitInMeters;return b};return c}(),w=function(){function c(){}c.prototype.compute=function(e,d,a,c,b){b||(b={maxFarNearRatio:0,minNearDistance:0,distance:0});d=p.earthRadius;e=g.vec3d.dot(e,e);a=d*d;b.maxFarNearRatio=t;b.minNearDistance=u/1;
this.isNemoMode(e,c)?(c=d+c,b.distance=Math.sqrt(e-c*c)/1):e>a?(b.maxFarNearRatio=n.clamp(2E4-(Math.log(Math.sqrt(e)-d)-7.983)/9.011*19E3,1E3,2E4),b.distance=Math.sqrt(e-a)/1):b.distance=b.maxFarNearRatio*b.minNearDistance;b.distance*=1.2;return b};c.prototype.isNemoMode=function(c,d){var a=p.earthRadius+A;return c<a*a&&d<B};return c}(),t=2E4,u=2,A=2E4,B=-500,z=.001,y=1E-4,l=g.vec3d.create(),k=g.vec3d.create()});