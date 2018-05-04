// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports","../../webgl-engine/lib/HighlightSet"],function(k,l,e){var g=function(){return function(a){this.highlightSet=new e;this.ids=new Set;this.options=a}}();return function(){function a(b){this.highlights=[];this.layerView=b}a.prototype.destroy=function(){this.highlights.forEach(function(b){return b.highlightSet.removeAll()});this.highlights=null};a.prototype.acquireSet=function(b){var a=this,c=new g(b);this.highlights.push(c);return{set:c,handle:{remove:function(){return a.releaseSet(c)}}}};
a.prototype.releaseSet=function(b){b.highlightSet.removeAll();b=this.highlights?this.highlights.indexOf(b):-1;-1!==b&&this.highlights.splice(b,1)};a.prototype.setFeatureIds=function(b,a){a.forEach(function(a){return b.ids.add(a)});this.layerView._forAllFeatures(function(a,h,d,f){b.ids.has(a)&&(a=d.engineObject.setComponentHighlight(f,h,b.options),b.highlightSet.addObject(d.engineObject,a))},null,!0)};a.prototype.objectCreated=function(b){var a=this;this.highlights.forEach(function(c){a.layerView._forAllFeaturesOfNode(a.layerView._getMetadata(b),
function(a,d,f,e){c.ids.has(a)&&(a=b.setComponentHighlight(e,d,c.options),c.highlightSet.addObject(b,a))},!0)})};a.prototype.objectDeleted=function(a){this.highlights.forEach(function(b){b.highlightSet.removeObject(a)})};a.prototype.allObjectsDeleted=function(){this.highlights.forEach(function(a){return a.highlightSet.removeAll()})};return a}()});