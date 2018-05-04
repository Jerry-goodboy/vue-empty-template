// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ./MemoryRequirements ./TileBufferData ./TileDisplayData ./Utils ./WGLDisplayList ./WGLDisplayRecord ./util/Reader ./util/Writer".split(" "),function(A,B,q,r,t,u,v,w,x,y){var z=new u.ValuesGetter,p=new q.default,m=new q.default;return function(){function h(){this.tileBufferData=this.tileDisplayData=null}h.prototype.reshuffle=function(){p.reset();var c=this._collectDisplayRecords(),a;for(a in c)for(var b=c[a],e=0,f=b;e<f.length;e++){var d=f[e];p.needMore(d.geometryType,d.meshData?
d.meshData.vertexCount:d.vertexCount,d.meshData?d.meshData.indexData.length:d.indexCount)}e=c.length;f=new r;for(a=0;a<e;++a){f.geometries[a].indexBuffer=new Uint32Array(Math.round(1.15*p.indicesFor(a)));var d=[],g;for(g in this.tileBufferData.geometries[a].vertexBuffer)d.push(this.tileBufferData.geometries[a].vertexBuffer[g].stride);var d=h._computeVertexAlignment(d),b=Math.round(1.15*p.verticesFor(a)),d=h._align(b,d),k;for(k in this.tileBufferData.geometries[a].vertexBuffer)b=this.tileBufferData.geometries[a].vertexBuffer[k].stride,
f.geometries[a].vertexBuffer[k]={stride:b,data:new Uint32Array(Math.round(d*b/4))}}m.reset();this.tileDisplayData.displayList=new v;for(a=0;a<e;++a){b=c[a];g=0;for(k=b;g<k.length;g++)d=k[g],d.meshData||d.readMeshDataFromBuffers(this.tileBufferData.geometries[a].vertexBuffer,this.tileBufferData.geometries[a].indexBuffer),d.writeMeshDataToBuffers(m.verticesFor(a),f.geometries[a].vertexBuffer,m.indicesFor(a),f.geometries[a].indexBuffer),d.meshData=null,m.needMore(a,d.vertexCount,d.indexCount);this.tileDisplayData.displayList.addToList(b)}this.tileBufferData=
f};h.prototype.getStrides=function(){for(var c=[],a=0;a<this.tileBufferData.geometries.length;++a){var b=this.tileBufferData.geometries[a];c[a]={};for(var e in b.vertexBuffer)c[a][e]=b.vertexBuffer[e].stride}return c};h.prototype._guessSize=function(){for(var c=this.tileDisplayData.displayObjects,a=Math.min(c.length,4),b=0,e=0;e<a;e++)b=Math.max(b,c[e].displayRecords.length);return 2*(12*c.length+c.length*b*40)};h.prototype.serialize=function(){var c=this.tileBufferData.serialize(),a=this.tileBufferData.getBuffers(),
b=this.tileDisplayData.serialize(new y.default(this._guessSize())).buffer();a.push(b);return{result:{displayData:b,bufferData:c},transferList:a}};h.deserialize=function(c){var a=t.deserialize(new x.default(c.displayData));c=r.deserialize(c.bufferData);var b=new h;b.tileDisplayData=a;b.tileBufferData=c;return b};h.bind=function(c,a){var b=new h;b.tileDisplayData=c;b.tileBufferData=a;return b};h.create=function(c,a){var b=new h;b.tileDisplayData=new t;b.tileDisplayData.displayObjects=c;for(var e=[0,
0,0,0],f=[0,0,0,0],d=[[],[],[],[]],g=0;g<c.length;g++)for(var k=0,n=c[g].displayRecords;k<n.length;k++){var l=n[k];d[l.geometryType].push(l);e[l.geometryType]+=l.meshData.vertexCount;f[l.geometryType]+=l.meshData.indexData.length}c=new r;a=[a.fill||{},a.line||{},a.icon||{},a.text||{}];for(g=0;4>g;g++){var k=new Uint32Array(f[g]),n=a[g],l=e[g],p={},m=void 0;for(m in n){var q={data:new Uint32Array(l*n[m]/4),stride:n[m]};p[m]=q}n=p;w.writeAllMeshDataToBuffers(d[g],n,k);c.geometries[g]={indexBuffer:k,
vertexBuffer:n}}b.tileBufferData=c;return b};h._align=function(c,a){var b=c%a;return 0===b?c:c+(a-b)};h._computeVertexAlignment=function(c){for(var a=!1,b=!1,e=0;e<c.length;e++){var f=c[e];2===f%4?a=!0:0!==f%4&&(b=!0)}return b?4:a?2:1};h.prototype._collectDisplayRecords=function(){for(var c=[[],[],[],[]],a=0,b=z.getValues(this.tileDisplayData.displayObjectRegistry);a<b.length;a++)for(var e=0,f=b[a].displayRecords;e<f.length;e++){var d=f[e];c[d.geometryType].push(d)}return c};return h}()});