// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define(["./common"],function(h){var d={create:function(){var a=new h.ARRAY_TYPE(3);a[0]=0;a[1]=0;a[2]=0;return a},clone:function(a){var b=new h.ARRAY_TYPE(3);b[0]=a[0];b[1]=a[1];b[2]=a[2];return b},fromValues:function(a,b,c){var e=new h.ARRAY_TYPE(3);e[0]=a;e[1]=b;e[2]=c;return e},copy:function(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];return a},set:function(a,b,c,e){a[0]=b;a[1]=c;a[2]=e;return a},add:function(a,b,c){a[0]=b[0]+c[0];a[1]=b[1]+c[1];a[2]=b[2]+c[2];return a},subtract:function(a,b,c){a[0]=b[0]-
c[0];a[1]=b[1]-c[1];a[2]=b[2]-c[2];return a}};d.sub=d.subtract;d.multiply=function(a,b,c){a[0]=b[0]*c[0];a[1]=b[1]*c[1];a[2]=b[2]*c[2];return a};d.mul=d.multiply;d.divide=function(a,b,c){a[0]=b[0]/c[0];a[1]=b[1]/c[1];a[2]=b[2]/c[2];return a};d.div=d.divide;d.ceil=function(a,b){a[0]=Math.ceil(b[0]);a[1]=Math.ceil(b[1]);a[2]=Math.ceil(b[2]);return a};d.floor=function(a,b){a[0]=Math.floor(b[0]);a[1]=Math.floor(b[1]);a[2]=Math.floor(b[2]);return a};d.min=function(a,b,c){a[0]=Math.min(b[0],c[0]);a[1]=
Math.min(b[1],c[1]);a[2]=Math.min(b[2],c[2]);return a};d.max=function(a,b,c){a[0]=Math.max(b[0],c[0]);a[1]=Math.max(b[1],c[1]);a[2]=Math.max(b[2],c[2]);return a};d.round=function(a,b){a[0]=Math.round(b[0]);a[1]=Math.round(b[1]);a[2]=Math.round(b[2]);return a};d.scale=function(a,b,c){a[0]=b[0]*c;a[1]=b[1]*c;a[2]=b[2]*c;return a};d.scaleAndAdd=function(a,b,c,e){a[0]=b[0]+c[0]*e;a[1]=b[1]+c[1]*e;a[2]=b[2]+c[2]*e;return a};d.distance=function(a,b){var c=b[0]-a[0],e=b[1]-a[1];a=b[2]-a[2];return Math.sqrt(c*
c+e*e+a*a)};d.dist=d.distance;d.squaredDistance=function(a,b){var c=b[0]-a[0],e=b[1]-a[1];a=b[2]-a[2];return c*c+e*e+a*a};d.sqrDist=d.squaredDistance;d.length=function(a){var b=a[0],c=a[1];a=a[2];return Math.sqrt(b*b+c*c+a*a)};d.len=d.length;d.squaredLength=function(a){var b=a[0],c=a[1];a=a[2];return b*b+c*c+a*a};d.sqrLen=d.squaredLength;d.negate=function(a,b){a[0]=-b[0];a[1]=-b[1];a[2]=-b[2];return a};d.inverse=function(a,b){a[0]=1/b[0];a[1]=1/b[1];a[2]=1/b[2];return a};d.normalize=function(a,b){var c=
b[0],e=b[1],g=b[2],c=c*c+e*e+g*g;0<c&&(c=1/Math.sqrt(c),a[0]=b[0]*c,a[1]=b[1]*c,a[2]=b[2]*c);return a};d.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]};d.cross=function(a,b,c){var e=b[0],g=b[1];b=b[2];var f=c[0],d=c[1];c=c[2];a[0]=g*c-b*d;a[1]=b*f-e*c;a[2]=e*d-g*f;return a};d.lerp=function(a,b,c,e){var g=b[0],f=b[1];b=b[2];a[0]=g+e*(c[0]-g);a[1]=f+e*(c[1]-f);a[2]=b+e*(c[2]-b);return a};d.hermite=function(a,b,c,e,g,f){var d=f*f,k=d*(2*f-3)+1,m=d*(f-2)+f,l=d*(f-1);f=d*(3-2*f);a[0]=b[0]*k+c[0]*
m+e[0]*l+g[0]*f;a[1]=b[1]*k+c[1]*m+e[1]*l+g[1]*f;a[2]=b[2]*k+c[2]*m+e[2]*l+g[2]*f;return a};d.bezier=function(a,b,c,e,g,f){var d=1-f,k=d*d,m=f*f,l=k*d,k=3*f*k,d=3*m*d;f*=m;a[0]=b[0]*l+c[0]*k+e[0]*d+g[0]*f;a[1]=b[1]*l+c[1]*k+e[1]*d+g[1]*f;a[2]=b[2]*l+c[2]*k+e[2]*d+g[2]*f;return a};d.random=function(a,b){b=b||1;var c=2*h.RANDOM()*Math.PI,e=2*h.RANDOM()-1,d=Math.sqrt(1-e*e)*b;a[0]=Math.cos(c)*d;a[1]=Math.sin(c)*d;a[2]=e*b;return a};d.transformMat4=function(a,b,c){var e=b[0],d=b[1];b=b[2];var f=c[3]*
e+c[7]*d+c[11]*b+c[15],f=f||1;a[0]=(c[0]*e+c[4]*d+c[8]*b+c[12])/f;a[1]=(c[1]*e+c[5]*d+c[9]*b+c[13])/f;a[2]=(c[2]*e+c[6]*d+c[10]*b+c[14])/f;return a};d.transformMat3=function(a,b,c){var e=b[0],d=b[1];b=b[2];a[0]=e*c[0]+d*c[3]+b*c[6];a[1]=e*c[1]+d*c[4]+b*c[7];a[2]=e*c[2]+d*c[5]+b*c[8];return a};d.transformQuat=function(a,b,c){var e=b[0],d=b[1],f=b[2];b=c[0];var h=c[1],k=c[2];c=c[3];var m=c*e+h*f-k*d,l=c*d+k*e-b*f,n=c*f+b*d-h*e,e=-b*e-h*d-k*f;a[0]=m*c+e*-b+l*-k-n*-h;a[1]=l*c+e*-h+n*-b-m*-k;a[2]=n*c+
e*-k+m*-h-l*-b;return a};d.rotateX=function(a,b,c,d){var e=[],f=[];e[0]=b[0]-c[0];e[1]=b[1]-c[1];e[2]=b[2]-c[2];f[0]=e[0];f[1]=e[1]*Math.cos(d)-e[2]*Math.sin(d);f[2]=e[1]*Math.sin(d)+e[2]*Math.cos(d);a[0]=f[0]+c[0];a[1]=f[1]+c[1];a[2]=f[2]+c[2];return a};d.rotateY=function(a,b,c,d){var e=[],f=[];e[0]=b[0]-c[0];e[1]=b[1]-c[1];e[2]=b[2]-c[2];f[0]=e[2]*Math.sin(d)+e[0]*Math.cos(d);f[1]=e[1];f[2]=e[2]*Math.cos(d)-e[0]*Math.sin(d);a[0]=f[0]+c[0];a[1]=f[1]+c[1];a[2]=f[2]+c[2];return a};d.rotateZ=function(a,
b,c,d){var e=[],f=[];e[0]=b[0]-c[0];e[1]=b[1]-c[1];e[2]=b[2]-c[2];f[0]=e[0]*Math.cos(d)-e[1]*Math.sin(d);f[1]=e[0]*Math.sin(d)+e[1]*Math.cos(d);f[2]=e[2];a[0]=f[0]+c[0];a[1]=f[1]+c[1];a[2]=f[2]+c[2];return a};d.forEach=function(){var a=d.create();return function(b,c,d,g,f,h){c||(c=3);d||(d=0);for(g=g?Math.min(g*c+d,b.length):b.length;d<g;d+=c)a[0]=b[d],a[1]=b[d+1],a[2]=b[d+2],f(a,a,h),b[d]=a[0],b[d+1]=a[1],b[d+2]=a[2];return b}}();d.angle=function(a,b){a=d.fromValues(a[0],a[1],a[2]);b=d.fromValues(b[0],
b[1],b[2]);d.normalize(a,a);d.normalize(b,b);b=d.dot(a,b);return 1<b?0:Math.acos(b)};d.str=function(a){return"vec3("+a[0]+", "+a[1]+", "+a[2]+")"};d.exactEquals=function(a,b){return a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]};d.equals=function(a,b){var c=a[0],d=a[1];a=a[2];var g=b[0],f=b[1];b=b[2];return Math.abs(c-g)<=h.EPSILON*Math.max(1,Math.abs(c),Math.abs(g))&&Math.abs(d-f)<=h.EPSILON*Math.max(1,Math.abs(d),Math.abs(f))&&Math.abs(a-b)<=h.EPSILON*Math.max(1,Math.abs(a),Math.abs(b))};return d});