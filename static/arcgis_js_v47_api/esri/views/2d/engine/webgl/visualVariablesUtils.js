// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/screenUtils ./color ./enums ./Utils ../../../3d/layers/support/FastSymbolUpdates".split(" "),function(v,d,m,r,f,g,t){function p(a){return g.isNumber(a.minDataValue)&&g.isNumber(a.maxDataValue)&&null!=a.minSize&&null!=a.maxSize?f.WGLVVFlag.SIZE_MINMAX_VALUE:(a.expression&&"view.scale"===a.expression||a.valueExpression&&"$view.scale"===a.valueExpression)&&Array.isArray(a.stops)?f.WGLVVFlag.SIZE_SCALE_STOPS:(null!=a.field||a.expression&&"view.scale"!==a.expression||
a.valueExpression&&"$view.scale"!==a.valueExpression)&&Array.isArray(a.stops)?f.WGLVVFlag.SIZE_FIELD_STOPS:(null!=a.field||a.expression&&"view.scale"!==a.expression||a.valueExpression&&"$view.scale"!==a.valueExpression)&&null!=a.valueUnit?f.WGLVVFlag.SIZE_UNIT_VALUE:f.WGLVVFlag.NONE}function k(a){return{value:a.value,size:m.toPt(a.size)}}function l(a){return a.map(function(a){return k(a)})}function n(a){return"string"===typeof a||"number"===typeof a?m.toPt(a):{type:"size",expression:a.expression,
stops:l(a.stops)}}function u(a){var c={values:[0,0,0,0,0,0,0,0],opacities:[0,0,0,0,0,0,0,0]};if(g.isString(a.field))if(a.stops){if(8<a.stops.length)return null;a=a.stops;for(var b=0;8>b;++b){var q=a[Math.min(b,a.length-1)];c.values[b]=q.value;c.opacities[b]=q.opacity}}else if(a.opacityValues){if(!g.isDefined(a.minDataValue)||!g.isDefined(a.maxDataValue)||2!==a.opacityValues.length)return null;c.values[0]=a.minDataValue;c.opacities[0]=a.opacityValues[0];c.values[1]=a.maxDataValue;c.opacities[1]=a.opacityValues[1];
for(b=2;8>b;++b)c.values[b]=a.maxDataValue,c.opacities[b]=a.opacityValues[1]}else return null;else if(a.stops&&0<=a.stops.length||a.opacityValues&&0<=a.opacityValues.length)for(a=a.stops&&0<=a.stops.length?a.stops[0].opacity:a.opacityValues[0],b=0;8>b;b++)c.values[b]=Infinity,c.opacities[b]=a;else return null;return c}Object.defineProperty(d,"__esModule",{value:!0});d.getTypeOfSizeVisualVariable=p;d.getVisualVariableSizeValueRepresentationRatio=function(a,c){if(!a||!c)return a;switch(c){case "radius":case "distance":return 2*
a;case "area":return Math.sqrt(a)}return a};d.stopToSizeStop=k;d.normalizeSizeStops=l;d.normalizeSizeElement=n;d.getVisualVariablesFields=function(a){var c=a&&0<a.length?{}:null;c&&a.forEach(function(a){var b=a.type;a.field&&(c[b]=a.field)});return c};d.convertVisualVariables=function(a){var c=a&&0<a.length?{}:null,b=c?{}:null;c&&a.forEach(function(a){var e=a.type;a.field&&(c[e]=a.field);if("size"===e)switch(b.size||(b.size={}),p(a)){case f.WGLVVFlag.SIZE_MINMAX_VALUE:b.size.minMaxValue={minDataValue:a.minDataValue,
maxDataValue:a.maxDataValue,minSize:n(a.minSize),maxSize:n(a.maxSize)};break;case f.WGLVVFlag.SIZE_SCALE_STOPS:b.size.scaleStops={stops:l(a.stops)};break;case f.WGLVVFlag.SIZE_FIELD_STOPS:var e=[],d=[];a=l(a.stops);for(var g=a.length,h=0;6>h;h++){var k=a[Math.min(h,g-1)];e.push(k.value);d.push(m.pt2px(k.size))}b.size.fieldStops={values:e,sizes:d};break;case f.WGLVVFlag.SIZE_UNIT_VALUE:b.size.unitValue={unit:a.valueUnit,valueRepresentation:a.valueRepresentation}}else if("color"===e)for(e=t.convertVisualVariables([a],
{modelSize:null,symbolSize:null,unitInMeters:1,transformation:null}),b.color=e.color,h=0;32>h;h+=4)r.premultiplyAlpha(b.color.colors,h,!0);else"opacity"===e?b.opacity=u(a):"rotation"===e&&(b.rotation={type:a.rotationType})});return{vvFields:c,vvRanges:b}}});