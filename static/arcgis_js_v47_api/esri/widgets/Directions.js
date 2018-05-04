// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/tsSupport/assignHelper dojo/i18n!../nls/common dojo/i18n!./Directions/nls/Directions ../moment ../core/Collection ../core/Handles ../core/lang ../core/on ../core/watchUtils ../core/accessorSupport/decorators ./Search ./Widget ./Directions/DirectionsViewModel ./Directions/support/CostSummary ./Directions/support/DatePicker ./Directions/support/directionsUtils ./Directions/support/maneuverUtils ./Directions/support/RouteSections ./Directions/support/TimePicker ./support/widget".split(" "),
function(A,O,B,f,C,t,k,x,D,E,v,n,m,l,F,G,y,H,I,p,J,K,L,c){var M=[{},{}],N=A.toUrl("../themes/base/images/maneuvers/");return function(z){function b(a){a=z.call(this)||this;a._autoStopRemovalDelay=100;a._costSummary=new H;a._departureTime="now";a._datePicker=new I;a._handles=new E;a._newPlaceholderStop=null;a._routeSections=new K;a._stops=new D(M);a._stopsToSearches=new Map;a._timePicker=new L;a.iconClass="esri-icon-directions";a.label=k.widgetLabel;a.maxStops=null;a.routeServiceUrl=null;a.routeSymbol=
null;a.searchProperties=null;a.stopSymbols=null;a.view=null;a.viewModel=new y;return a}B(b,z);b.prototype.postInitialize=function(){var a=this;this.own([m.init(this,"viewModel.lastRoute",function(){a._routeSections.routePath=a.get("viewModel.directionLines");a._activeManeuver=null;a._focusedManeuver=null;a.scheduleRender()}),m.init(this,"viewModel.selectedTravelMode, viewModel.departureTime",function(){1<a.get("viewModel.stops.length")&&a.getDirections()}),m.when(this,"view",function(g,c){c&&(a._viewClickHandle=
null,a._handles.remove(c));g&&(c=a._prepViewClick(),a._handles.add([n.on(g.surface,"mousedown",function(){return a._autoStopRemovalDelay=500}),n.on(g.surface,"mouseup",function(){return a._autoStopRemovalDelay=100}),c],a.view.surface),a._viewClickHandle=c)}),m.whenOnce(this,"routeServiceUrl",function(){return a.viewModel.load()})])};b.prototype.destroy=function(){this._datePicker.destroy();this._timePicker.destroy();this._stopsToSearches.forEach(function(a){return a.destroy()})};b.prototype.getDirections=
function(){return null};b.prototype.zoomToRoute=function(){};b.prototype.render=function(){return c.tsx("div",{class:c.join("esri-directions esri-widget esri-widget--panel","esri-directions__scroller")},this._renderPanelContent())};b.prototype._renderPanelContent=function(){var a=this.viewModel,g=a.state,b=a.loadStatus,a="initializing"===g,b="error"===g&&"failed"===b,g=(d={},d["esri-directions__panel-content--loading"]=a,d["esri-directions__panel-content--error"]=b,d),d=a?"presentation":"group",a=
b?this._renderMessage(k.serviceError):a?this._renderLoader():this._renderReadyContent();return c.tsx("div",{class:"esri-directions__panel-content",classes:g,role:d},a);var d};b.prototype._renderReadyContent=function(){return[this._renderStopsContainer(),this._renderTravelModeOptions(),this._renderDepartureTimeControls(),this._renderSectionSplitter(),this._renderDirectionsContainer(),this._renderDisclaimer()]};b.prototype._renderTravelModeOptions=function(){var a=this.viewModel,g=a.selectedTravelMode,
a=a.travelModes,b=g.name||k.travelMode;return 0<a.length?c.tsx("select",{"aria-label":b,bind:this,class:c.join("esri-directions__travel-modes-select","esri-select"),key:"esri-directions__travel-mode-options",onchange:this._handleTravelModeChange,title:b},a.map(function(a){return c.tsx("option",{key:a,"data-mode":a,selected:a.id===g.id,value:a.id},a.name)})):null};b.prototype._handleTravelModeChange=function(a){a=a.currentTarget;a=a.item(a.selectedIndex);this.viewModel.selectedTravelMode=a["data-mode"]};
b.prototype._renderStopsContainer=function(){return c.tsx("div",{class:"esri-directions__section",key:"esri-directions__stops-container",role:"group"},this._renderStops())};b.prototype._renderDepartureTimeControls=function(){var a="now"===this._departureTime,g=k.departureTime;return c.tsx("div",{class:"esri-directions__departure-time",key:"esri-directions__departure-time-controls",role:"group"},c.tsx("select",{"aria-label":g,bind:this,class:c.join("esri-directions__departure-time-select","esri-select"),
onchange:this._handleDepartureOptionChange,title:g},c.tsx("option",{value:"now",selected:a},k.leaveNow),c.tsx("option",{value:"depart-by",selected:!a},k.departBy)),a?null:this._renderTimeControls())};b.prototype._renderStops=function(){var a=this,g=this._stops,b=g.toArray().map(function(b,e){var d=g.length,h=1<e&&!b.result,w=(f={},f["esri-icon-radio-unchecked"]=0<=e&&e<d-1,f["esri-icon-radio-checked"]=e===d-1,f),f=(l={},l["esri-directions__stop-icon-container--last"]=e===d-1,l),l=(r={},r["esri-directions__stop-row--dragged"]=
a._draggedStopIndex===e,r["esri-directions__stop-row--target"]=a._dropTargetStopIndex===e,r["esri-directions__stop-row--valid"]=!h,r),r=(q={},q["esri-directions__stop-underline--drag-in-process"]=!isNaN(a._draggedStopIndex),q),m=(q=g.getItemAt(d-1))&&q.result,q=(q=g.getItemAt(e+1))&&q.result,p=e===d-1,u=e===d-2,q=2===d&&0===e||2<d&&!p&&!u||2<d&&u&&q||2<d&&p&&!b.result,d=2===d||3===d&&!m||h,h=h?"false":"true",m=a._acquireSearch(b),p=k.removeStop,u=k.reverseStops,n=k.unlocated,n=v.substitute({number:e+
1,label:b.result?b.result.name:n},k.stopLabelTemplate),t=a.id+"__stop--"+e;b=!!m.searchTerm&&!!m.selectedResult&&!!b.result&&m.selectedResult===b.result;return c.tsx("li",{"aria-label":n,afterCreate:a._handleStopFieldCreation,bind:a,class:"esri-directions__stop-row",classes:l,id:t,key:e,"data-stop-index":e,ondragend:a._handleStopFieldDragEnd,ondragover:a._handleStopFieldDragOver,ondragstart:a._handleStopFieldDragStart,ondrop:a._handleStopFieldDrop},c.tsx("div",{class:"esri-directions__stop-handle",
draggable:h},c.tsx("span",{"aria-hidden":"true",class:c.join("esri-directions__stop-icon","esri-icon-handle-vertical","esri-directions__stop-handle-icon","esri-directions__stop-icon--interactive")}),c.tsx("div",{bind:a,"aria-labelledby":t,class:"esri-directions__stop-icon-container",classes:f,"data-stop-index":e,onclick:a._handleStopIconClick,onkeydown:a._handleStopIconClick,role:"button"},c.tsx("span",{class:"esri-directions__stop-icon",classes:w,tabindex:b?"0":null}))),c.tsx("div",{class:"esri-directions__stop-input"},
m.render(),c.tsx("div",{class:"esri-directions__stop-underline",classes:r})),c.tsx("div",{class:"esri-directions__stop-options",role:"group"},c.tsx("div",{"aria-label":p,class:"esri-directions__remove-stop",bind:a,"data-stop-index":e,hidden:d,onkeydown:a._handleRemoveStop,onclick:a._handleRemoveStop,role:"button",tabIndex:0,title:p},c.tsx("span",{"aria-hidden":"true",class:c.join("esri-directions__stop-icon","esri-directions__remove-stop-icon","esri-icon-close","esri-directions__stop-icon--interactive")}),
c.tsx("span",{class:"esri-icon-font-fallback-text"},"removeStopTitle")),c.tsx("div",{"aria-label":u,class:"esri-directions__reverse-stops",bind:a,hidden:q,onkeydown:a._handleReverseStops,onclick:a._handleReverseStops,role:"button",tabIndex:0,title:u},c.tsx("span",{"aria-hidden":"true",class:c.join("esri-directions__stop-icon","esri-icon-up-down-arrows","esri-directions__stop-icon--interactive")}),c.tsx("span",{class:"esri-icon-font-fallback-text"},"removeStopTitle"))));var f,l,r,q}),d=g.every(function(b){var g=
a._stopsToSearches.get(b);return b.result&&g.selectedResult===b.result}),w=this._stops.length>=this.maxStops,h=k.addStop,d=2<=g.length&&d&&!w?c.tsx("div",{"aria-label":h,bind:this,class:"esri-directions__add-stop",key:"esri-directions__add-stop",onfocus:this._handleAddStopFocus,tabIndex:0},c.tsx("span",{"aria-hidden":"true",class:c.join("esri-icon-plus","esri-directions__stop-icon","esri-directions__stop-icon--interactive")}),c.tsx("div",{"aria-hidden":"true",class:"esri-directions__add-stop-text"},
h)):null;return c.tsx("div",null,c.tsx("ol",{class:"esri-directions__stops",role:"group"},b),d)};b.prototype._handleStopIconClick=function(a){(a=this._stops.getItemAt(a.currentTarget["data-stop-index"]))&&a.result&&this._centerAtStop(a)};b.prototype._centerAtStop=function(a){this.viewModel.centerAt(a.result.feature)};b.prototype._handleStopFieldCreation=function(a){var b=this._newPlaceholderStop;b&&(a=this._stops.getItemAt(a["data-stop-index"]),b===a&&this._acquireSearch(a).focus(),this._newPlaceholderStop=
null)};b.prototype._handleStopInputBlur=function(a,b){var c=this;this._handles.remove("awaiting-view-click-stop");this.view.cursor=this._previousCursor;a.selectedResult&&b.result&&a.selectedResult===b.result||("none"!==a.activeMenu||!a.searchTerm||a.selectedResult===b.result&&(a.selectedResult||b.result)?a.searchTerm||(this._viewClickHandle.resume(),clearTimeout(this._autoStopRemovalTimeoutId),this._autoStopRemovalTimeoutId=setTimeout(function(){c.destroyed||(c._pauseViewClickHandles(),"searching"!==
a.state&&(c._removeStop(b),b.result&&(b.result=null,c._processStops()),c.scheduleRender()))},this._autoStopRemovalDelay)):a.search())};b.prototype._handleStopInputFocus=function(a,b){if(!this._handles.has("awaiting-view-click-stop")){var c=this.view,g=this.view.cursor;this._previousCursor=g;this._handles.add(m.init(a,"searchTerm",function(a){c.cursor=0===a.length?"copy":g}),"awaiting-view-click-stop");this._activeStop=b}};b.prototype._prepViewClick=function(){var a=this,b=this.get("viewModel.view"),
c=n.pausable(b,"click",this._handleViewClick.bind(this)),d=n.pausable(b.surface,"click",function(){clearTimeout(a._autoStopRemovalTimeoutId);d.pause()});return{remove:function(){d.remove();c.remove()},pause:function(){d.pause();c.pause()},resume:function(){d.resume();c.resume()}}};b.prototype._handleViewClick=function(a){var b=this,c=this._stopsToSearches.get(this._activeStop);c&&!c.searchTerm&&(c.search(a.mapPoint).then(function(a){a=a.results[0].results[0];var g=b._activeStop;g.result=a;g.result.feature.attributes.Name=
a.name;c.searchTerm=a.name;b._processStops();b.scheduleRender()}),this.scheduleRender());this._pauseViewClickHandles();clearTimeout(this._autoStopRemovalTimeoutId)};b.prototype._pauseViewClickHandles=function(){this._viewClickHandle.pause()};b.prototype._handleAddStopFocus=function(a){this._addNewPlaceholder()};b.prototype._addNewPlaceholder=function(){if(!this._newPlaceholderStop){var a={};this._stops.add(a);this._newPlaceholderStop=a}};b.prototype._handleReverseStops=function(){this._reverseStops()};
b.prototype._reverseStops=function(){this._stops.reverse();this._processStops()};b.prototype._handleRemoveStop=function(a){this._removeStop(this._stops.getItemAt(a.currentTarget["data-stop-index"]));this._processStops()};b.prototype._removeStop=function(a){2>=this._stops.length||(this._disposeSearch(a),this._stops.remove(a))};b.prototype._getStopFieldGhost=function(){var a=this._ghost;a||(a=document.createElement("div"),a.classList.add("esri-directions__stop-row-ghost","esri-offscreen"),this._ghost=
a);return a};b.prototype._handleStopFieldDragStart=function(a){var b=a.dataTransfer;a=a.currentTarget;var c=Number(a["data-stop-index"]);this._draggedStopIndex=c;var d=this._getStopFieldGhost(),c=this._acquireSearch(this._stops.getItemAt(c));d.innerHTML=c.searchTerm||c.activeSource.placeholder;document.body.appendChild(d);c=d.getBoundingClientRect().height;b.effectAllowed="move";b.setDragImage(d,20,c/2);b.setData("text/plain",a["data-stop-index"])};b.prototype._handleStopFieldDragEnd=function(){this._dropTargetStopIndex=
this._draggedStopIndex=null;document.body.removeChild(this._getStopFieldGhost())};b.prototype._handleStopFieldDragOver=function(a){var b=Number(a.currentTarget["data-stop-index"]);a.preventDefault();this._dropTargetStopIndex=this._draggedStopIndex===b?null:b};b.prototype._handleStopFieldDrop=function(a){a.stopPropagation();a.preventDefault();var b=Number(a.currentTarget["data-stop-index"]);a=Number(a.dataTransfer.getData("text/plain"));if(a!==b){var c=this._stops;c.reorder(c.getItemAt(a),b);this._processStops()}};
b.prototype._handleDepartureOptionChange=function(){var a=this,b=event.currentTarget,b=b.item(b.selectedIndex);"now"===b.value?(this._departureTime="now",this.viewModel.departureTime="now",this._handles.remove("departure-time-controls")):"depart-by"===b.value&&(this._departureTime="depart-by",this._handles.add([m.init(this._datePicker,"value",function(){return a._updateDepartureTime()}),m.init(this._timePicker,"value",function(){return a._updateDepartureTime()})],"departure-time-controls"))};b.prototype._updateDepartureTime=
function(){var a=this._datePicker.value,b=this._timePicker.value,a=x({date:a.date(),month:a.month(),year:a.year(),hour:b.hour(),minute:b.minute()});this.viewModel.departureTime=a.toDate()};b.prototype._renderTimeControls=function(){return c.tsx("div",{class:"esri-directions__departure-time-controls",key:"esri-directions__time-controls",role:"group"},this._datePicker.render(),this._timePicker.render())};b.prototype._renderSectionSplitter=function(){return c.tsx("div",{class:"esri-directions__section-splitter"})};
b.prototype._renderDisclaimer=function(){var a=v.substitute({esriTerms:'\x3ca href\x3d"http://www.esri.com/legal/software-license" target\x3d"_blank"\x3e'+k.esriTerms+"\x3c/a\x3e"},k.disclaimer);return c.tsx("div",{class:"esri-directions__disclaimer",innerHTML:a,key:"esri-directions__disclaimer"})};b.prototype._renderDirectionsContainer=function(){return c.tsx("div",{class:c.join("esri-directions__directions-section","esri-directions__section"),key:"esri-directions__container"},this._renderDirectionsContainerContent())};
b.prototype._renderLoader=function(){return c.tsx("div",{class:"esri-directions__loader",key:"loader"})};b.prototype._renderDirectionsContainerContent=function(){var a=this.viewModel,b=a.lastRoute,a=a.state,e="routing"===a;return"error"===a?this._renderMessage(k.serviceError,"esri-directions__message"):e?this._renderLoader():b?c.tsx("div",{class:"esri-directions__summary",key:"esri-directions__summary",role:"group"},this._renderCosts(),this._renderManeuverSections()):c.tsx("div",{key:"esri-directions__placeholder",
class:"esri-widget__content--empty"},c.tsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256"},c.tsx("path",{fill:"currentcolor",d:"M192 36c-15.477 0-24 6.034-24 16.99v45.822l24 24 24-24v-45.82C216 42.033 207.477 36 192 36zm20 61.155l-20 20-20-20V52.99c0-8.62 6.73-12.99 20-12.99s20 4.37 20 12.99zM192 52a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12zm0 20a8 8 0 1 1 8-8 8.008 8.008 0 0 1-8 8zM92 140.99C92 130.035 83.477 124 68 124s-24 6.034-24 16.99v45.822l24 24 24-24zm-4 44.165l-20 20-20-20V140.99c0-8.62 6.73-12.99 20-12.99s20 4.37 20 12.99zM68 140a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12zm0 20a8 8 0 1 1 8-8 8.008 8.008 0 0 1-8 8zm84-44h16v4h-16zm-24 80h4v12h-12v-4h8zm0-28h4v16h-4zm0-52h12v4h-8v8h-4zm0 24h4v16h-4zm-36 64h16v4H92z"})),
c.tsx("h4",{class:"esri-directions__message"},k.directionsPlaceholder))};b.prototype._renderMessage=function(a,b){return c.tsx("h3",{class:"esri-directions__message",key:b},a)};b.prototype._renderManeuverSections=function(){var a=this,b=this._routeSections.sections;return c.tsx("div",{class:"esri-directions__maneuvers",role:"group"},b.map(function(e,d){var g=e.open,h;0<e.maneuvers.length&&g&&(h=c.tsx("ol",{class:"esri-directions__maneuver-list"},e.maneuvers.map(function(b){return a._renderManeuver(b)})));
var k=2<b.length,f=d===b.length-1;d=(l={},l["esri-directions__maneuver-section--collapsible"]=k,l);l=(m={},m["esri-icon-right-triangle-arrow"]=!g,m["esri-icon-down-arrow"]=g,m);k?f?e=c.tsx("header",{class:"esri-directions__maneuver-section-header",key:"esri-directions__maneuver-section-header"},c.tsx("span",{"aria-hidden":"true",class:"esri-icon-radio-checked"}),c.tsx("h2",{class:"esri-directions__maneuver-section-title"},e.name)):(k=g?t.open:t.close,e=c.tsx("header",{class:c.join("esri-directions__maneuver-section-header",
"esri-directions__maneuver-section-toggle"),key:"esri-directions__maneuver-section-header"},c.tsx("div",{"aria-expanded":g,"aria-label":k,bind:a,class:"esri-directions__maneuver-section-header-toggle-button","data-maneuver-section":e,onkeydown:a._handleSectionToggle,onclick:a._handleSectionToggle,role:"button",tabIndex:0,title:k},c.tsx("span",{"aria-hidden":"true",classes:l}),c.tsx("h2",{class:"esri-directions__maneuver-section-title"},e.name)))):e=null;return c.tsx("section",{class:"esri-directions__maneuver-section",
classes:d},e,h);var l,m}))};b.prototype._handleSectionToggle=function(a){a=a.currentTarget["data-maneuver-section"];a.open=!a.open};b.prototype._renderCosts=function(){var a=this.get("viewModel.directionLines"),a=x(a[a.length-1].attributes.arriveTimeUTC),b=a.format("LT"),e=a.format("[GMT]ZZ"),a=this._costSummary.set({directionsViewModel:this.viewModel}),d=k.zoomToRoute,b=v.substitute({time:"\x3cstrong\x3e"+b+"\x3c/strong\x3e",gmt:e},k.etaTemplate),e=k.primaryCosts,f=k.secondaryCosts,h=k.eta;return c.tsx("div",
{"aria-label":d,bind:this,class:"esri-directions__costs",onkeydown:this._handleSummaryInteraction,onclick:this._handleSummaryInteraction,role:"button",tabIndex:0,title:d},c.tsx("div",{class:"esri-directions__costs-details",role:"group"},c.tsx("div",{"aria-label":e,class:"esri-directions__costs-value",title:e},a.primary),c.tsx("div",{class:"esri-directions__vertical-splitter"}),c.tsx("div",{"aria-label":f,class:"esri-directions__other-costs-total",title:f},a.secondary)),c.tsx("div",{"aria-label":h,
innerHTML:b,title:h}))};b.prototype._handleSummaryInteraction=function(){this._focusedManeuver=this._activeManeuver=null;this.viewModel.clearHighlights();this.zoomToRoute()};b.prototype._acquireSearch=function(a){var b=this,c=this.get("viewModel.view"),d=c?k.searchFieldPlaceholder:k.viewlessSearchFieldPlaceholder;if(this._stopsToSearches.has(a)){var f=this._stopsToSearches.get(a);f.view=c;f.defaultSource.placeholder=d;return f}var h=new F(C({view:c,resultGraphicEnabled:!1,popupEnabled:!1},this.searchProperties));
h.defaultSource.placeholder=d;h.defaultSource.autoNavigate=!1;this._handles.add([h.on("select-result",function(){a.result=h.selectedResult;a.result.feature.attributes.Name=h.selectedResult.name;b._processStops();b.scheduleRender()}),h.on("search-focus",function(){return b._handleStopInputFocus(h,a)}),h.on("search-blur",function(){return b._handleStopInputBlur(h,a)})],h);this._stopsToSearches.set(a,h);return h};b.prototype._disposeSearch=function(a){this._stopsToSearches.get(a).destroy();this._stopsToSearches.delete(a)};
b.prototype._processStops=function(){var a=this.viewModel;a.stops.removeAll();a.stops.addMany(this._stops.filter(function(a){return!!a.result}).map(function(a){return a.result.feature}));1<a.stops.length&&a.getDirections()};b.prototype._renderManeuver=function(a){var b,e=a.attributes,d=this.get("viewModel.routeParameters.directionsLengthUnits"),d=p.formatDistance(e.length,{toUnits:d}),f=p.formatTime(e.time),h=p.getAssociatedStop(a);p.useSpatiallyLocalTime(a,this.get("viewModel.routeParameters.startTime"))?
b=p.toSpatiallyLocalTimeString(e.arriveTimeUTC,e.ETA,"now"===this._departureTime):d&&(b=f?d+"\x26nbsp;\x26middot;\x3cwbr\x3e\x26nbsp;"+f:d);d=this._getFormattedManeuverText(a);e=this._getIconPath(e.maneuverType);if(h)return c.tsx("li",{class:"esri-directions__maneuver",key:a},c.tsx("header",null,h.attributes.Name));var h="esri-directions__maneuver-"+a.uid,f="esri-directions__cumulative-costs-"+a.uid,l="esri-directions__intermediate-costs-"+a.uid,m=(n={},n["esri-directions__maneuver--active"]=this._activeManeuver===
a,n);return c.tsx("li",{"aria-labelledby":h+" "+f+" "+l,bind:this,class:"esri-directions__maneuver",classes:m,"data-maneuver":a,key:a,onclick:this._handleManeuverClick,onkeydown:this._handleManeuverClick,onfocus:this._handleManeuverFocus,onmouseover:this._handleManeuverMouseOver,onmouseout:this._handleManeuverMouseOut,onblur:this._handleManeuverBlur,tabIndex:0},c.tsx("img",{alt:"",class:"esri-directions__maneuver-icon",src:e}),c.tsx("div",{class:"esri-directions__maneuver-costs-container"},c.tsx("span",
{id:h,innerHTML:d}),c.tsx("div",{class:"esri-directions__maneuver-costs"},c.tsx("div",{class:"esri-directions__horizontal-splitter"}),c.tsx("div",{id:f,"aria-label":k.cumulativeCosts,class:"esri-directions__cost--cumulative",innerHTML:"",title:k.cumulativeCosts}),c.tsx("div",{id:l,"aria-label":k.intermediateCosts,class:"esri-directions__cost--intermediate",innerHTML:b,title:k.intermediateCosts}))));var n};b.prototype._getIconPath=function(a){a=J.toIconName(a);return""+N+a+(2===window.devicePixelRatio?
"@2x":"")+".png"};b.prototype._handleManeuverClick=function(a){a=a.currentTarget["data-maneuver"];this._activeManeuver===a?(this._activeManeuver=null,this.zoomToRoute()):(this._activeManeuver=a,this.viewModel.centerAt(a),this.viewModel.highlightSegment(a))};b.prototype._handleManeuverMouseOver=function(a){this._activeManeuver||this._focusedManeuver||this.viewModel.highlightSegment(a.currentTarget["data-maneuver"])};b.prototype._handleManeuverMouseOut=function(){this._activeManeuver||this._focusedManeuver||
this.viewModel.clearHighlights()};b.prototype._handleManeuverBlur=function(){this._activeManeuver||(this._focusedManeuver=null,this.viewModel.clearHighlights())};b.prototype._handleManeuverFocus=function(a){this._activeManeuver||(this._focusedManeuver=a=a.currentTarget["data-maneuver"],this.viewModel.highlightSegment(a))};b.prototype._getFormattedManeuverText=function(a){var b=a.attributes.text;a=a.strings;if(!a)return b;var c=b;a.forEach(function(a){c=c.replace(a.string,"\x3cstrong\x3e"+a.string+
"\x3c/strong\x3e")});return c};f([l.property()],b.prototype,"iconClass",void 0);f([l.property()],b.prototype,"label",void 0);f([l.aliasOf("viewModel.maxStops")],b.prototype,"maxStops",void 0);f([l.aliasOf("viewModel.routeServiceUrl")],b.prototype,"routeServiceUrl",void 0);f([l.aliasOf("viewModel.routeSymbol")],b.prototype,"routeSymbol",void 0);f([l.property()],b.prototype,"searchProperties",void 0);f([l.aliasOf("viewModel.stopSymbols")],b.prototype,"stopSymbols",void 0);f([l.aliasOf("viewModel.view")],
b.prototype,"view",void 0);f([c.renderable(["lastRoute","state","travelModes"]),l.property({type:y})],b.prototype,"viewModel",void 0);f([l.aliasOf("viewModel.getDirections")],b.prototype,"getDirections",null);f([l.aliasOf("viewModel.zoomToRoute")],b.prototype,"zoomToRoute",null);f([c.accessibleHandler()],b.prototype,"_handleStopIconClick",null);f([c.accessibleHandler()],b.prototype,"_handleReverseStops",null);f([c.accessibleHandler()],b.prototype,"_handleRemoveStop",null);f([c.accessibleHandler()],
b.prototype,"_handleSectionToggle",null);f([c.accessibleHandler()],b.prototype,"_handleSummaryInteraction",null);f([c.accessibleHandler()],b.prototype,"_handleManeuverClick",null);return b=f([l.subclass("esri.widgets.Directions")],b)}(l.declared(G))});