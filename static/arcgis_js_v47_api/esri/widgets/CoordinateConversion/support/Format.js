// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Accessor ../../../core/accessorSupport/decorators".split(" "),function(l,m,h,c,k,d){return function(g){function a(){var b=null!==g&&g.apply(this,arguments)||this;b.name=null;b.defaultPattern=null;b.conversionInfo=null;b.coordinateSegments=null;return b}h(a,g);Object.defineProperty(a.prototype,"currentPattern",{get:function(){return this._get("currentPattern")||this._get("defaultPattern")},
set:function(b){this._set("currentPattern",b)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"_additionalCharactersPattern",{get:function(){var b=this.get("coordinateSegments");if(!b)return null;b=b.map(function(b){return b.alias});b=this.currentPattern.replace(new RegExp('["nsew'+b.join()+"]","gi"),"").replace(/\ /g,"");return new RegExp("["+b+"]","g")},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"hasDisplayProperties",{get:function(){return!(!this.defaultPattern||
!this.coordinateSegments)},enumerable:!0,configurable:!0});a.prototype.convert=function(b){var a=this.get("conversionInfo.convert");return a&&a(b)};a.prototype.convertDeferred=function(b){var a=this.get("conversionInfo.convertDeferred");return a&&a(b)};a.prototype.getDisplayCoordinate=function(b){if(!b)return null;if(!this.coordinateSegments||!this.currentPattern)return b;var a=this.currentPattern;b=this._getSegmentMatches(b,!1);for(var e=this.coordinateSegments.length-1;0<=e;e--)a=a.replace(this.coordinateSegments[e].alias,
b[e]);return a};a.prototype.reverseConvert=function(b){var a=this.get("conversionInfo.reverseConvert");return a&&a(b)};a.prototype.parseUserInput=function(b){var a=this.defaultPattern.replace(this._additionalCharactersPattern,"");b=b.replace(this._additionalCharactersPattern,"");b=this._getSegmentMatches(b,!0);for(var e=this.coordinateSegments.length-1;0<=e;e--)a=a.replace(this.coordinateSegments[e].alias,b[e]);return a};a.prototype._getSegmentMatches=function(b,a){for(var e=[],d=0;d<this.coordinateSegments.length;d++){var c=
this.coordinateSegments[d],f=b.match(c.searchPattern);f?(f=f[0],b=b.replace(f,"").trim(),c.substitution&&(c=a?c.substitution.input(f):c.substitution.output(f))&&(f=c),e.push(f)):e.push("")}return e};c([d.property()],a.prototype,"name",void 0);c([d.property()],a.prototype,"currentPattern",null);c([d.property()],a.prototype,"defaultPattern",void 0);c([d.property({readOnly:!0,dependsOn:["currentPattern"]})],a.prototype,"_additionalCharactersPattern",null);c([d.property()],a.prototype,"conversionInfo",
void 0);c([d.property()],a.prototype,"coordinateSegments",void 0);c([d.property({readOnly:!0,dependsOn:["defaultPattern","coordinateSegments"]})],a.prototype,"hasDisplayProperties",null);return a=c([d.subclass("esri.widgets.CoordinateConversion.support.Format")],a)}(d.declared(k))});