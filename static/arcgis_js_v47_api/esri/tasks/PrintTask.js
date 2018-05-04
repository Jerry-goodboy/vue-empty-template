// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("../core/kebabDictionary ../core/urlUtils ../core/promiseUtils ../geometry/Polygon ../kernel ../request dojo/_base/lang dojo/dom-construct dojox/gfx/canvas ./Geoprocessor ./support/PrintTemplate ./support/printTaskUtils ./Task".split(" "),function(x,A,E,F,w,G,n,H,B,I,J,v,K){function y(a){return!(!a||!a.path)}var C={Feet:"ft",Kilometers:"km",Meters:"m",Miles:"mi"},D=x({esriFeet:"Feet",esriKilometers:"Kilometers",esriMeters:"Meters",esriMiles:"Miles"}),L=x({MAP_ONLY:"map-only","A3 Landscape":"a3-landscape",
"A3 Portrait":"a3-portrait","A4 Landscape":"a4-landscape","A4 Portrait":"a4-portrait","Letter ANSI A Landscape":"letter-ansi-a-landscape","Letter ANSI A Portrait":"letter-ansi-a-portrait","Tabloid ANSI B Landscape":"tabloid-ansi-b-landscape","Tabloid ANSI B Portrait":"tabloid-ansi-b-portrait"}),M=x({esriExecutionTypeSynchronous:"sync",esriExecutionTypeAsynchronous:"async"});return K.createSubclass({declaredClass:"esri.tasks.PrintTask",constructor:function(){this._handleExecuteResponse=this._handleExecuteResponse.bind(this)},
_vtlExtent:null,_legendLayers:[],_legendLayerNameMap:{},_gpServerUrl:null,_cimVersion:null,_is11xService:!1,_data:null,properties:{mode:{readonly:!0,value:"sync"},_geoprocessor:{dependsOn:["url","updateDelay"],get:function(){return new I(this.url,{updateDelay:this.updateDelay})}},url:{value:null,type:String},updateDelay:{value:1E3,type:Number}},execute:function(a,f){var d=this.url,k=d.lastIndexOf("/GPServer/");0<k&&(d=d.slice(0,k+9));return E.resolve().then(function(){if(this._gpServerUrl===d)return{data:this._data};
this._gpServerUrl=d;return G(d,{query:{f:"json"}})}.bind(this)).then(function(b){this._data=b.data;this._cimVersion=this._data.cimVersion;this._is11xService=!!this._cimVersion;b=this._setPrintParams(a);this._data.executionType&&(this.mode=M.fromJSON(this._data.executionType));return this._geoprocessor["async"===this.mode?"submitJob":"execute"](b,f).then(this._handleExecuteResponse)}.bind(this))},_createOperationalLayers:function(a,f){var d=[],k,b,h,e,q=a.map.allLayers.filter(function(a){return a.parent&&
"group"===a.parent.type&&!a.parent.visible?!1:!0}).items;for(k=0;k<q.length;k++)if(b=q[k],b.loaded&&b.visible)switch(e={id:b.id,title:this._legendLayerNameMap[b.id]||b.title,opacity:b.opacity,minScale:b.minScale||0,maxScale:b.maxScale||0,url:b.url&&A.normalize(b.url),token:b.token},h=b.declaredClass,h){case "esri.layers.ImageryLayer":var c={bandIds:b.bandIds,compressionQuality:b.compressionQuality,format:b.format,interpolation:b.interpolation};b.mosaicRule&&(c.mosaicRule=b.mosaicRule.toJSON());b.renderingRule&&
(c.renderingRule=b.renderingRule.toJSON());d.push(n.mixin(e,c));this._legendLayers&&this._legendLayers.push({id:b.id});break;case "esri.layers.OpenStreetMapLayer":n.mixin(e,{type:"OpenStreetMap"});d.push(e);break;case "esri.layers.GraphicsLayer":n.mixin(e,this._createFeatureCollectionJSON(b));d.push(e);this._legendLayers&&this._legendLayers.push({id:b.id});break;case "esri.layers.VectorTileLayer":delete e.url;if(this._is11xService&&b.serviceUrl&&b.styleUrl){var c=w.id&&w.id.findCredential(b.currentStyleInfo.styleUrl),
l=w.id&&w.id.findCredential(b.currentStyleInfo.serviceUrl);if(!c&&!l){n.mixin(e,{type:"VectorTileLayer",styleUrl:A.normalize(b.styleUrl)});d.push(e);break}}e.type="image";l=f.exportOptions&&f.exportOptions.dpi||96;h=f.exportOptions&&f.exportOptions.width%2===a.width%2;var p=f.exportOptions&&f.exportOptions.height%2===a.height%2,g={format:"png",pixelRatio:l/96,rotation:0},c=this._vtlExtent||a.extent.clone();"MAP_ONLY"!==f.layout||!f.preserveScale||f.outScale&&f.outScale!==a.scale||96!==l||h&&p||(g.area=
{x:0,y:0,width:a.width,height:a.height},h||(g.area.width+=1),p||(g.area.height+=1),this._vtlExtent||(l=a.toMap({x:g.area.width,y:g.area.height}),c.ymin=l.y,c.xmax=l.x,this._vtlExtent=c));e.extent=c.clone()._normalize(!0).toJSON();c=a.whenLayerView(b);c.isResolved()&&c.then(function(b){b=b.takeScreenshot(g,a);b.isResolved()?b.then(function(a){"data:image/png;base64,"===a.dataURL.substr(0,22)&&(e.imageData=a.dataURL.substr(22))}):console.error("PrintTask: VectorTileLayer.takeScreenshot() returned an unresolved Promise");
e.imageData&&d.push(e)});break;case "esri.layers.MapImageLayer":var r={id:b.id,subLayerIds:[]},m=[],u=a.scale,t=function(a){var b=0===u,d=0===a.minScale||u<=a.minScale,c=0===a.maxScale||u>=a.maxScale;a.visible&&(b||d&&c)&&(a.sublayers?a.sublayers.forEach(t):(b=a.toExportImageJSON().drawingInfo,d=a.toJSON(),d.layerDefinition.drawingInfo=b,m.unshift(d),r.subLayerIds.push(a.id)))};b.sublayers&&b.sublayers.forEach(t);m.length&&(n.mixin(e,{layers:m,visibleLayers:r.subLayerIds}),d.push(e),this._legendLayers.push(r));
break;case "esri.layers.KMLLayer":this._is11xService?(e={},b.write(e,{origin:"web-map"}),e.showLabels=f.showLabels,d.push(e)):a.whenLayerView(b).then(function(a){a.allVisibleMapImages.forEach(function(a,c){c={id:b.id+"_image"+c,type:"image",title:b.id,minScale:b.minScale||0,maxScale:b.maxScale||0,opacity:b.opacity,extent:a.extent.toJSON()};"data:image/png;base64,"===a.href.substr(0,22)?c.imageData=a.href.substr(22):c.url=a.href;d.push(c)});a=a.allVisiblePoints.concat(a.allVisiblePolylines).concat(a.allVisiblePolygons);
var c={id:b.id};n.mixin(c,this._createFeatureCollectionJSON(null,a));d.push(c)}.bind(this));break;case "esri.layers.WMSLayer":m=[];t=function(a){a.visible&&(a.sublayers?a.sublayers.forEach(t):a.name&&m.unshift(a.name))};b.sublayers&&b.sublayers.forEach(t);n.mixin(e,{type:"wms",transparentBackground:b.imageTransparency,visibleLayers:m,version:b.version});d.push(e);break;case "esri.layers.WMTSLayer":c=b.activeLayer;n.mixin(e,{type:"wmts",layer:c.id,style:c.styleId,format:c.imageFormat,tileMatrixSet:c.tileMatrixSetId});
d.push(e);break;case "esri.layers.WebTileLayer":c=b.urlTemplate.replace(/\$\{/g,"{");n.mixin(e,{type:"WebTiledLayer",urlTemplate:c,credits:b.copyright});b.subDomains&&0<b.subDomains.length&&(e.subDomains=b.subDomains);d.push(e);break;case "esri.layers.CSVLayer":if(this._is11xService){e={};b.write(e,{origin:"web-map"});d.push(e);break}case "esri.layers.StreamLayer":case "esri.layers.FeatureLayer":l=(c=b.renderer)&&!c.hasVisualVariables()&&!b.featureReduction&&!c.valueExpression&&"esri.layers.CSVLayer"!==
h;h="esri.layers.FeatureLayer"===h&&b.source&&b.source.length||"esri.layers.StreamLayer"===h;(this._is11xService||l)&&!h&&c&&("esri.renderer.SimpleRenderer"===c.declaredClass||null==c.field||"string"===typeof c.field&&b.getField(c.field))?(e={},b.write(e,{origin:"web-map"}),e.layerDefinition&&e.layerDefinition.drawingInfo&&e.layerDefinition.drawingInfo.renderer&&(this._convertSvgRenderer(e.layerDefinition.drawingInfo.renderer),c.visualVariables&&c.visualVariables[0]&&c.visualVariables[0].maxSize&&
"number"!==typeof c.visualVariables[0].maxSize&&c.visualVariables[0].minSize&&"number"!==typeof c.visualVariables[0].minSize&&(c=c.getSizeRangeAtScale(c.visualVariables[0],a.scale),e.layerDefinition.drawingInfo.renderer.visualVariables[0].minSize=c.minSize,e.layerDefinition.drawingInfo.renderer.visualVariables[0].maxSize=c.maxSize))):(c=this._getGraphics(a,b),n.mixin(e,this._createFeatureCollectionJSON(b,c)));d.push(e);this._legendLayers&&this._legendLayers.push({id:b.id});break;case "esri.layers.MapNotesLayer":var z=
[];b.featureCollections.map(function(a){var b=a.source.toArray();a=this._createFeatureCollectionJSON(a,b).featureCollection;z=z.concat(a.layers)}.bind(this));n.mixin(e,{featureCollection:{layers:z}});d.push(e);break;default:d.push(e)}a.graphics&&a.graphics.length&&(e=this._createFeatureCollectionJSON({},a.graphics))&&d.push(e);return d},_createFeatureCollectionJSON:function(a,f){var d=v.createPolygonLayer(),k=v.createPolylineLayer(),b=v.createPointLayer(),h=v.createMultipointLayer(),e=v.createPointLayer();
e.layerDefinition.name="textLayer";delete e.layerDefinition.drawingInfo;a&&("esri.layers.FeatureLayer"===a.declaredClass||"esri.layers.StreamLayer"===a.declaredClass?d.layerDefinition.name=k.layerDefinition.name=b.layerDefinition.name=h.layerDefinition.name=this._legendLayerNameMap[a.id]||a.get("arcgisProps.title")||a.title:"esri.layers.GraphicsLayer"===a.declaredClass&&(f=a.graphics.items));var q=a.renderer&&"esri.renderer.SimpleRenderer"===a.renderer.declaredClass;if(a&&a.renderer&&!n.isFunction(a.get("renderer.field"))){var c=
a.renderer.toJSON();d.layerDefinition.drawingInfo.renderer=c;k.layerDefinition.drawingInfo.renderer=c;b.layerDefinition.drawingInfo.renderer=c;h.layerDefinition.drawingInfo.renderer=c}else delete d.layerDefinition.drawingInfo,delete k.layerDefinition.drawingInfo,delete b.layerDefinition.drawingInfo,delete h.layerDefinition.drawingInfo;var l=a&&a.fields,c=a&&a.renderer,p=[];c&&!n.isFunction(a.get("renderer.field"))&&("class-breaks"===c.type?(l||(l=[{name:c.field,type:"esriFieldTypeDouble"}],c.normalizationField&&
l.push({name:c.normalizationField,type:"esriFieldTypeDouble"})),c.field&&p.push(c.field),c.normalizationField&&p.push(c.normalizationField)):"unique-value"===c.type&&(l||(l=[{name:c.field,type:"esriFieldTypeString"}],c.field2&&l.push({name:c.field2,type:"esriFieldTypeString"}),c.field3&&l.push({name:c.field3,type:"esriFieldTypeString"})),c.field&&p.push(c.field),c.field2&&p.push(c.field2),c.field3&&p.push(c.field3)));l&&(d.layerDefinition.fields=l,k.layerDefinition.fields=l,b.layerDefinition.fields=
l,h.layerDefinition.fields=l);for(var l=f&&f.length,g,r=0;r<l;r++){var m=f[r]||f.getItemAt(r);if(!1!==m.visible&&m.geometry&&(g=m.toJSON(),g.hasOwnProperty("popupTemplate")&&delete g.popupTemplate,g.geometry&&g.geometry.z&&delete g.geometry.z,!g.symbol||!g.symbol.outline||"esriCLS"!==g.symbol.outline.type||this._is11xService)){g.symbol&&g.symbol.outline&&g.symbol.outline.color&&g.symbol.outline.color[3]&&!this._is11xService&&(g.symbol.outline.color[3]=255);if(a&&a.renderer&&!g.symbol&&(n.isFunction(a.renderer.field)||
a.renderer.compiledFunc||a.renderer.hasVisualVariables()||a.renderer)){var c=a.renderer,u=c.getSymbol(m);if(!u)continue;g.symbol=u.toJSON();c.hasVisualVariables()&&v.applyVisualVariables(g.symbol,{renderer:c,graphic:m,symbol:u})}g.symbol&&(g.symbol.angle||delete g.symbol.angle,g.symbol.path?g.symbol=this._convertSvgToPictureMarkerSymbolJson(g.symbol):g.symbol.text&&delete g.attributes);if(a&&a.renderer&&"simple"===a.renderer.type)delete g.attributes;else if(p.length){var t={};p.forEach(function(a){g.attributes&&
g.attributes.hasOwnProperty(a)&&(t[a]=g.attributes[a])});g.attributes=t}"polygon"===m.geometry.type?d.featureSet.features.push(g):"polyline"===m.geometry.type?k.featureSet.features.push(g):"point"===m.geometry.type?g.symbol&&g.symbol.text?e.featureSet.features.push(g):b.featureSet.features.push(g):"multipoint"===m.geometry.type?h.featureSet.features.push(g):"extent"===m.geometry.type&&(g.geometry=F.fromExtent(m.geometry).toJSON(),d.featureSet.features.push(g))}}a=[d,k,h,b,e].filter(function(a){return 0<
a.featureSet.features.length});a.forEach(function(a){var b=a.featureSet.features.every(function(a){return a.symbol});(b||q)&&a.featureSet.features.forEach(function(a){delete a.attributes});b&&delete a.layerDefinition.drawingInfo;a.layerDefinition.drawingInfo&&a.layerDefinition.drawingInfo.renderer&&this._convertSvgRenderer(a.layerDefinition.drawingInfo.renderer)},this);return a.length?{featureCollection:{layers:a}}:null},_convertSvgToPictureMarkerSymbolJson:function(a){this._canvasParent||(this._canvasParent=
H.create("div"),this._canvasSurface=B.createSurface(this._canvasParent,200,200));var f=this._canvasSurface.createObject(B.Path,a.path).setFill(a.color).setStroke(a.outline);"pendingRender"in this._canvasSurface&&this._canvasSurface._render(!0);var d=this._canvasSurface.rawNode.getContext("2d"),f=f.getBoundingBox(),k=Math.ceil(f.width+f.x),b=Math.ceil(f.height+f.y),h=d.getImageData(f.x,f.y,k,b);d.canvas.width=k;d.canvas.height=b;d.putImageData(h,0,0);return{type:"esriPMS",imageData:d.canvas.toDataURL("image/png").substr(22),
angle:-a.angle,contentType:"image/png",height:a.size?a.size:b-f.y,width:a.size?a.size:k-f.x,xoffset:a.xoffset,yoffset:a.yoffset}},_convertSvgRenderer:function(a){var f=a.type;if("simple"===f&&y(a.symbol))a.symbol=this._convertSvgToPictureMarkerSymbolJson(a.symbol);else if("unique-value"===f||"class-breaks"===f)f=a["unique-value"===f?"uniqueValueInfos":"classBreakInfos"],y(a.defaultSymbol)&&(a.defaultSymbol=this._convertSvgToPictureMarkerSymbolJson(a.defaultSymbol)),f&&f.forEach(function(a){y(a)&&
(a.symbol=this._convertSvgToPictureMarkerSymbolJson(a.symbol))},this)},_getGraphics:function(a,f){var d;a.whenLayerView(f).then(function(a){return a.queryGraphics&&a.queryGraphics()||a.featuresView.graphics}).then(function(a){d=a});return d},_getPrintDefinition:function(a,f){var d=a.view,k=d.map,b=d.spatialReference,h={operationalLayers:this._createOperationalLayers(d,f)};a=this._vtlExtent||a.extent||d.extent;b&&b.isWrappable&&(a=a.clone()._normalize(!0),b=a.spatialReference);h.mapOptions={extent:a&&
a.toJSON(),spatialReference:b&&b.toJSON(),showAttribution:f.attributionVisible};this._vtlExtent=null;d.rotation&&(h.mapOptions.rotation=-d.rotation);f.preserveScale&&(h.mapOptions.scale=f.outScale||d.scale);k.timeExtent&&(h.mapOptions.time=[k.timeExtent.startTime.getTime(),k.timeExtent.endTime.getTime()]);return h},_handleExecuteResponse:function(a){return"sync"===this.mode?a.results&&a.results[0]&&a.results[0].value:this._geoprocessor.getResultData(a.jobId,"Output_File").then(function(a){return a.value})},
_setPrintParams:function(a){var f=a.template||new J;null==f.showLabels&&(f.showLabels=!0);var d=f.exportOptions,k;if(d){k={dpi:d.dpi};var b=L.toJSON(f.layout);if("map_only"===b.toLowerCase()||""===b)k.outputSize=[d.width,d.height]}var d=f.layoutOptions,h;if(d){var e,q;if("Miles"===d.scalebarUnit||"Kilometers"===d.scalebarUnit)e="Kilometers",q="Miles";else if("Meters"===d.scalebarUnit||"Feet"===d.scalebarUnit)e="Meters",q="Feet";h={titleText:d.titleText,authorText:d.authorText,copyrightText:d.copyrightText,
customTextElements:d.customTextElements,scaleBarOptions:{metricUnit:D.toJSON(e),metricLabel:C[e],nonMetricUnit:D.toJSON(q),nonMetricLabel:C[q]}}}e=null;d&&d.legendLayers&&(e=d.legendLayers.map(function(a){this._legendLayerNameMap[a.layerId]=a.title;var b={id:a.layerId};a.subLayerIds&&(b.subLayerIds=a.subLayerIds);return b},this));d=this._getPrintDefinition(a,f);if(d.operationalLayers){var c,l=/[\u4E00-\u9FFF\u0E00-\u0E7F\u0900-\u097F\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF]/,p=/[\u0600-\u06FF]/,g=
function(a){var b=a.text,c=(a=a.font)&&a.family&&a.family.toLowerCase();b&&a&&("arial"===c||"arial unicode ms"===c)&&(a.family=l.test(b)?"Arial Unicode MS":"Arial","normal"!==a.style&&p.test(b)&&(a.family="Arial Unicode MS"))};d.operationalLayers.forEach(function(a){a.featureCollection&&a.featureCollection.layers&&a.featureCollection.layers.forEach(function(a){a.layerDefinition&&a.layerDefinition.drawingInfo&&a.layerDefinition.drawingInfo.renderer&&a.layerDefinition.drawingInfo.renderer.symbol&&(c=
a.layerDefinition.drawingInfo.renderer,"esriTS"===c.symbol.type&&g(c.symbol));a.featureSet&&a.featureSet.features&&a.featureSet.features.forEach(function(a){a.symbol&&"esriTS"===a.symbol.type&&g(a.symbol)})})})}a.outSpatialReference&&(d.mapOptions.spatialReference=a.outSpatialReference.toJSON());n.mixin(d,{exportOptions:k,layoutOptions:h});n.mixin(d.layoutOptions,{legendOptions:{operationalLayers:null!=e?e:this._legendLayers}});f={Web_Map_as_JSON:JSON.stringify(d),Format:f.format,Layout_Template:b};
a.extraParameters&&n.mixin(f,a.extraParameters);return f}})});