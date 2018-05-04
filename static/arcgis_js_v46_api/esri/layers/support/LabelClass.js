// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("../../core/date ../../core/JSONSupport ../../core/lang ../../core/kebabDictionary dojo/_base/lang dojo/number ./types ../../support/arcadeUtils ../../symbols/support/jsonUtils ../../symbols/support/typeUtils".split(" "),function(n,w,p,x,g,y,z,k,l,q){function r(a){a=(a=k.createSyntaxTree(a))&&a.body&&a.body[0]&&a.body[0].body&&a.body[0].body.body;if(!a||1!==a.length)return null;a="ExpressionStatement"===a[0].type&&a[0].expression;if(!a||"MemberExpression"!==a.type)return null;var b=a.object;
if(!b||"Identifier"!==b.type||"$feature"!==b.name)return null;a=a.property;if(!a)return null;switch(a.type){case "Literal":return a.value;case "Identifier":return a.name}return null}function m(a){return a?"service"===a.origin?!1:!a.layer||!z.isOfType(a.layer,"map-image"):!0}var A=/__begin__/ig,B=/__end__/ig,t=/^__begin__/i,u=/__end__$/i,v=x({esriServerPointLabelPlacementAboveCenter:"above-center",esriServerPointLabelPlacementAboveLeft:"above-left",esriServerPointLabelPlacementAboveRight:"above-right",
esriServerPointLabelPlacementBelowCenter:"below-center",esriServerPointLabelPlacementBelowLeft:"below-left",esriServerPointLabelPlacementBelowRight:"below-right",esriServerPointLabelPlacementCenterCenter:"center-center",esriServerPointLabelPlacementCenterLeft:"center-left",esriServerPointLabelPlacementCenterRight:"center-right",esriServerLinePlacementAboveAfter:"above-after",esriServerLinePlacementAboveAlong:"above-along",esriServerLinePlacementAboveBefore:"above-before",esriServerLinePlacementAboveStart:"above-start",
esriServerLinePlacementAboveEnd:"above-end",esriServerLinePlacementBelowAfter:"below-after",esriServerLinePlacementBelowAlong:"below-along",esriServerLinePlacementBelowBefore:"below-before",esriServerLinePlacementBelowStart:"below-start",esriServerLinePlacementBelowEnd:"below-end",esriServerLinePlacementCenterAfter:"center-after",esriServerLinePlacementCenterAlong:"center-along",esriServerLinePlacementCenterBefore:"center-before",esriServerLinePlacementCenterStart:"center-start",esriServerLinePlacementCenterEnd:"center-end",
esriServerPolygonPlacementAlwaysHorizontal:"always-horizontal"}),h=w.createSubclass({declaredClass:"esri.layers.support.LabelClass",properties:{name:{type:String,value:null,json:{write:!0}},labelExpression:{type:String,value:null,json:{read:function(a,b,d,c){b=b.labelExpressionInfo;if(!b||!b.value&&!b.expression)return a},write:{allowNull:!0,writer:function(a,b,d,c){this.labelExpressionInfo&&m(c)&&(null!=this.labelExpressionInfo.value?a=this._templateStringToSql(this.labelExpressionInfo.value):null!=
this.labelExpressionInfo.expression&&(c=r(this.labelExpressionInfo.expression))&&(a="["+c+"]"));null!=a&&(b[d]=a)}}}},labelExpressionInfo:{value:null,json:{read:function(a,b,d,c){a&&a.value&&(a=g.mixin(g.clone(a),{expression:this._convertTemplatedStringToArcade(a.value)}),delete a.value);return a},write:{target:{"labelExpressionInfo.expression":{type:String}},overridePolicy:function(a,b,d){return m(d)?{allowNull:!0}:{enabled:!1}},writer:function(a,b,d,c){if(null==a&&null!=this.labelExpression&&m(c))a=
{expression:this.getLabelExpressionArcade()};else if(a)a=p.fixJson(g.clone(a));else return;null!=a.value&&(a.expression=this._convertTemplatedStringToArcade(a.value));a.expression&&(delete a.value,b[d]=a)}}}},labelPlacement:{type:String,value:null,json:{read:function(a,b){return v.fromJSON(a)},write:function(a,b){if(a=v.toJSON(a))b.labelPlacement=a}}},maxScale:{type:Number,value:0,json:{write:function(a,b){if(a||this.minScale)b.maxScale=a}}},minScale:{type:Number,value:0,json:{write:function(a,b){if(a||
this.maxScale)b.minScale=a}}},requiredFields:{readOnly:!0,dependsOn:["labelExpression","labelExpressionInfo","where"],get:function(){var a=Object.create(null);this._collectRequiredFields(a);return Object.keys(a)}},symbol:{value:null,types:q.types,json:{origins:{"web-scene":{read:l.read,write:{target:{symbol:{types:q.types3D}},writer:l.writeTarget}}},read:l.read,write:l.writeTarget}},useCodedValues:{type:Boolean,value:null,json:{write:!0}},where:{type:String,value:null,json:{write:!0}}},getLabelExpression:function(){var a=
{expression:"",type:"none"};this.labelExpressionInfo?this.labelExpressionInfo.value?(a.expression=this.labelExpressionInfo.value,a.type="conventional"):this.labelExpressionInfo.expression&&(a.expression=this.labelExpressionInfo.expression,a.type="arcade"):null!=this.labelExpression&&(a.expression=this._sqlToTemplateString(this.labelExpression),a.type="conventional");return a},getLabelExpressionArcade:function(){var a=this.getLabelExpression();if(!a)return null;switch(a.type){case "conventional":return this._convertTemplatedStringToArcade(a.expression);
case "arcade":return a.expression}return null},getOptions:function(){var a={},b=this.labelExpressionInfo;if(b){var d=b.expression;d&&!b.value&&(a.hasArcadeExpression=!0,a.compiledArcadeFunc=k.createFunction(d))}return a},getLabelExpressionSingleField:function(){var a=this.getLabelExpression();if(!a)return null;switch(a.type){case "conventional":return(a=a.expression.match(C))&&a[1].trim()||null;case "arcade":return r(a.expression)}return null},clone:function(){return new h({labelExpression:this.labelExpression,
labelExpressionInfo:g.clone(this.labelExpressionInfo),labelPlacement:this.labelPlacement,maxScale:this.maxScale,minScale:this.minScale,name:this.name,symbol:this.symbol.clone(),where:this.where,useCodedValues:this.useCodedValues})},_collectRequiredFields:function(a){this._collectLabelExpressionRequiredFields(this.getLabelExpression(),a);this._collectWhereRequiredFields(this.where,a)},_sqlToTemplateString:function(a){return a.replace(/\[/g,"{").replace(/\]/g,"}")},_templateStringToSql:function(a){return a.replace(/\{/g,
"[").replace(/\}/g,"]")},_collectWhereRequiredFields:function(a,b){null!=a&&(a=a.split(" "),3===a.length&&(b[a[0]]=!0),7===a.length&&(b[a[0]]=!0,b[a[4]]=!0))},_collectLabelExpressionRequiredFields:function(a,b){"arcade"===a.type?k.extractFieldNames(a.expression).forEach(function(a){b[a]=!0}):(a=a.expression.match(/{[^}]*}/g))&&a.forEach(function(a){b[a.slice(1,-1)]=!0})},_convertTemplatedStringToArcade:function(a){a?(a=g.replace(a,function(a,d){return'__begin__$feature["'+d+'"]__end__'}),a=t.test(a)?
a.replace(t,""):'"'+a,a=u.test(a)?a.replace(u,""):a+'"',a=a.replace(A,'" + ').replace(B,' + "')):a='""';return a}});h.evaluateWhere=function(a,b){var d=function(a,b,c){switch(b){case "\x3d":return a==c?!0:!1;case "\x3c\x3e":return a!=c?!0:!1;case "\x3e":return a>c?!0:!1;case "\x3e\x3d":return a>=c?!0:!1;case "\x3c":return a<c?!0:!1;case "\x3c\x3d":return a<=c?!0:!1}return!1};try{if(null==a)return!0;var c=a.split(" ");if(3===c.length)return d(b[c[0]],c[1],c[2]);if(7===c.length){var f=d(b[c[0]],c[1],
c[2]),g=c[3],e=d(b[c[4]],c[5],c[6]);switch(g){case "AND":return f&&e;case "OR":return f||e}}return!1}catch(D){console.log("Error.: can't parse \x3d "+a)}};h.buildLabelText=function(a,b,d,c){var f="";if(c&&c.hasArcadeExpression)c.compiledArcadeFunc&&(a=k.createExecContext(b),a=k.executeFunction(c.compiledArcadeFunc,a),null!=a&&(f=a.toString()));else var g=b&&b.attributes||{},f=a.replace(/{[^}]*}/g,function(a){return h.formatField(a.slice(1,-1),a,g,d,c)});return f};h.formatField=function(a,b,d,c,f){var h=
a.toLowerCase();for(a=0;a<c.length;a++)if(c[a].name.toLowerCase()===h){b=d[c[a].name];var e=c[a].domain;if(e&&g.isObject(e)){if("codedValue"==e.type)for(d=0;d<e.codedValues.length;d++)e.codedValues[d].code==b&&(b=e.codedValues[d].name);else"range"==e.type&&e.minValue<=b&&b<=e.maxValue&&(b=e.name);break}e=c[a].type;"date"==e?(e=n.fromJSON(f&&f.dateFormat||"shortDate"),(e="DateFormat"+n.getFormat(e))&&(b=p.substitute({myKey:b},"{myKey:"+e+"}"))):("integer"==e||"small-integer"==e||"long"==e||"double"==
e)&&f&&f.numberFormat&&f.numberFormat.digitSeparator&&f.numberFormat.places&&(b=y.format(b,{places:f.numberFormat.places}))}return null==b?"":b};var C=/^\s*\{([^}]+)\}\s*$/i;return h});