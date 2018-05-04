// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../geometry","../../../geometry/Circle","../../../geometry/geometryEngine"],function(u,l,k,t,r){function q(a,c){a=a.map(function(a){return Array.apply([],a)});a.forEach(function(a,b){a[0][0]===a[a.length-1][0]&&a[0][1]===a[a.length-1][1]||a.push(a[0])});var b=new k.Polygon({rings:a,spatialReference:c.spatialReference});b.rings.forEach(function(a){b.isClockwise(a)||a.reverse()});b.isSelfIntersecting&&(b=r.simplify(b));return b}Object.defineProperty(l,"__esModule",
{value:!0});var b=new k.ScreenPoint,f=new k.ScreenPoint,g=new k.Point,n=new k.Point,p=new k.Point,m=new k.Point;l.createPolygon=q;l.createPolyline=function(a,b){return new k.Polyline({paths:a,spatialReference:b.spatialReference})};l.createMultipoint=function(a,b){return new k.Multipoint({points:a,spatialReference:b.spatialReference})};l.createRectangle=function(a,c,e){c.toScreen(a[0][0],a[0][1],null,b);c.toScreen(a[1][0],a[1][1],null,f);if(e)a=Math.round(f.x-b.x),e=Math.round(f.y-b.y),c.toMap(b.x+
a,b.y+e,g),c.toMap(b.x-a,b.y-e,m);else{a=Math.round(Math.min(f.x,b.x));e=Math.round(Math.min(f.y,b.y));var h=Math.abs(f.x-b.x);c.toMap(a,e+Math.abs(f.y-b.y),g);c.toMap(a+h,e,m)}return q([[[g.x,m.y],[m.x,m.y],[m.x,g.y],[g.x,g.y]]],c)};l.createSquare=function(a,c,e){c.toScreen(a[0][0],a[0][1],null,b);c.toScreen(a[1][0],a[1][1],null,f);a=Math.round(f.x-b.x);var h=Math.round(f.y-b.y),d=Math.max(Math.abs(a),Math.abs(h));e?(c.toMap(b.x+d,b.y+d,g),c.toMap(b.x-d,b.y-d,m)):(c.toMap(b.x,b.y,g),c.toMap(0<a?
b.x+d:b.x-d,0<h?b.y+d:b.y-d,m));return q([[[g.x,m.y],[m.x,m.y],[m.x,g.y],[g.x,g.y]]],c)};l.createEllipse=function(a,c,e){c.toScreen(a[0][0],a[0][1],null,b);c.toScreen(a[1][0],a[1][1],null,f);a=Math.round(f.x-b.x);var h=Math.round(f.y-b.y),d=new k.Point({x:e?b.x:b.x+a/2,y:e?b.y:b.y+h/2});c=k.Polygon.createEllipse({center:d,longAxis:e?a:a/2,shortAxis:e?h:h/2,numberOfPoints:60,view:c});c.isClockwise(c.rings[0])||(c.rings[0].reverse(),c=c.clone());return c};l.createCircle=function(a,c,e){var h=null,d=
null;if(e)h=new k.Point({x:a[0][0],y:a[0][1],spatialReference:c.spatialReference}),d=new k.Point({x:a[1][0],y:a[1][1],spatialReference:c.spatialReference});else{c.toScreen(a[0][0],a[0][1],null,b);c.toScreen(a[1][0],a[1][1],null,f);a=Math.round(f.x-b.x);e=Math.round(f.y-b.y);var d=Math.max(Math.abs(a),Math.abs(e)),g=new k.ScreenPoint({x:0<a?b.x+d/2:b.x-d/2,y:0<e?b.y+d/2:b.y-d/2}),h=c.toMap(g),d=c.toMap(Math.abs(a)>Math.abs(e)?g.x-d/2:g.x,Math.abs(a)>Math.abs(e)?g.y:g.y-d/2)}a=r.distance(h,d,"meters");
return new t({center:h,radius:a,radiusUnit:"meters",spatialReference:c.spatialReference})};l.createTriangle=function(a,c,e,h){c.toScreen(a[0][0],a[0][1],null,b);c.toScreen(a[1][0],a[1][1],null,f);a=Math.round(f.x-b.x);var d=Math.round(f.y-b.y);e&&h?(a=Math.sqrt(a*a+d*d),c.toMap(-.8660254037844386*a+b.x,.5*a+b.y,g),c.toMap(.8660254037844386*a+b.x,.5*a+b.y,n),c.toMap(b.x,b.y-a,p)):e?(c.toMap(0<d?f.x:b.x,b.y+d,g),c.toMap(b.x-a,0<d?f.y:b.y-d,n),c.toMap(0<d?b.x:f.x,b.y-d,p)):h?(e=Math.max(Math.abs(a),
Math.abs(d)),h=e*Math.sqrt(3)/2,c.toMap(b.x,0<d?b.y+e:b.y,g),c.toMap(0<a?b.x+e:b.x-e,0<d?b.y+e:b.y,n),c.toMap(0<a?b.x+e/2:b.x-e/2,0<d?b.y+e-h:b.y-h,p)):(c.toMap(0<d?b.x+a/2:f.x,b.y,g),c.toMap(0<d?b.x:b.x+a/2,f.y,n),c.toMap(0<d?f.x:b.x,0<d?f.y:b.y,p));return q([[[g.x,g.y],[p.x,p.y],[n.x,n.y]]],c)};l.movePolyline=function(a,b,e,f){var c=a.clone();c.paths.forEach(function(a,d){a.forEach(function(a,g){a=b.toScreen(a[0],a[1],null);a=b.toMap(a.x+e,a.y+f);c.setPoint(d,g,a)})});return c};l.movePolygon=function(a,
b,e,f){var c=a.clone();c.rings.forEach(function(a,d){a.forEach(function(a,g){a=b.toScreen(a[0],a[1],null);a=b.toMap(a.x+e,a.y+f);c.setPoint(d,g,a)})});return c};l.getVerticesForPolygon=function(a){a=a.rings.map(function(a){return Array.apply([],a)});a.forEach(function(a){a[0][0]===a[a.length-1][0]&&a[0][1]===a[a.length-1][1]&&a.pop()});return a};l.getVerticesForPolyline=function(a){return a.paths.map(function(a){return Array.apply([],a)})};l.getScaleFactor=function(a,c){a=a.extent;c.toScreen(new k.Point(a.xmin,
a.ymax,c.spatialReference),b);c.toScreen(new k.Point(a.xmax,a.ymin,c.spatialReference),f);return(f.y-b.y)/(f.x-b.x)}});