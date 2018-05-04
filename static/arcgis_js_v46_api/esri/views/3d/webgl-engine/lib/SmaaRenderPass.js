// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.6/esri/copyright.txt for details.
//>>built
define("require exports ../../../webgl/Program ../../../webgl/VertexArrayObject ../../../webgl/BufferObject ../../../webgl/Texture ../../../webgl/FramebufferObject ../../support/imageUtils ../../../webgl/enums".split(" "),function(k,r,g,l,m,n,h,p,t){var b=null;return function(){function f(e){this.isEnabled=!1;this.vertexAttributeLocations={vPosition:0};this.vertexBufferLayout=[{name:"vPosition",count:2,type:5126,offset:0,stride:8,normalized:!1}];this.rctx=e}f.prototype.ensureEnabled=function(){if(this.isEnabled)return!0;
if(!b)return k(["./SmaaRenderPassData"],function(a){b=a}),!1;var e=this.rctx;this.programEdgeDetect=new g(e,b.edgeDetectShader.vertex,b.edgeDetectShader.fragment,this.vertexAttributeLocations);this.programBlendWeights=new g(e,b.blendWeightShader.vertex,b.blendWeightShader.fragment,this.vertexAttributeLocations);this.programBlur=new g(e,b.blurShader.vertex,b.blurShader.fragment,this.vertexAttributeLocations);var q=new Float32Array([-1,-1,3,-1,-1,3]);this.vao=new l(e,this.vertexAttributeLocations,{geometry:this.vertexBufferLayout},
{geometry:new m(e,34962,35044,q)});this.tmpFramebufferEdges=h.createWithAttachments(this.rctx,{target:3553,pixelFormat:6407,dataType:5121,samplingMode:9729,wrapMode:33071,width:4,height:4},{colorTarget:0,depthStencilTarget:0});this.tmpFramebufferBlend=h.createWithAttachments(this.rctx,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9729,wrapMode:33071,width:4,height:4},{colorTarget:0,depthStencilTarget:0});this.textureArea=this.loadTextureFromBase64(b.areaTexture,9729,6407);this.textureSearch=
this.loadTextureFromBase64(b.searchTexure,9728,6409);return this.isEnabled=!0};f.prototype.disable=function(){this.isEnabled&&(this.programEdgeDetect.dispose(),this.programEdgeDetect=null,this.programBlendWeights.dispose(),this.programBlendWeights=null,this.programBlur.dispose(),this.programBlur=null,this.vao.dispose(),this.vao=null,this.textureArea.dispose(),this.textureArea=null,this.textureSearch.dispose(),this.textureSearch=null,this.tmpFramebufferBlend.dispose(),this.tmpFramebufferBlend=null,
this.tmpFramebufferEdges.dispose(),this.tmpFramebufferEdges=null,this.isEnabled=!1)};f.prototype.render=function(e,b){this.ensureEnabled();var a=this.rctx,c=0,d=0;null!=b?(c=b.descriptor.width,d=b.descriptor.height):(c=a.gl.canvas.width,d=a.gl.canvas.height);a.bindVAO(this.vao);a.setFaceCullingEnabled(!0);a.setCullFace(1029);a.setFrontFace(2305);a.setBlendingEnabled(!1);a.setDepthTestEnabled(!1);a.setViewport(0,0,c,d);this.tmpFramebufferEdges.resize(c,d);a.bindFramebuffer(this.tmpFramebufferEdges);
a.setClearColor(0,0,0,1);a.clear(a.gl.COLOR_BUFFER_BIT);a.bindProgram(this.programEdgeDetect);a.bindTexture(e.colorTexture,0);this.programEdgeDetect.setUniform1i("tColor",0);this.programEdgeDetect.setUniform4f("uResolution",1/c,1/d,c,d);a.drawArrays(4,0,3);this.tmpFramebufferBlend.resize(c,d);a.bindFramebuffer(this.tmpFramebufferBlend);a.setClearColor(0,0,1,1);a.clear(a.gl.COLOR_BUFFER_BIT);a.bindProgram(this.programBlendWeights);this.programBlendWeights.setUniform4f("uResolution",1/c,1/d,c,d);a.bindTexture(this.textureSearch,
1);this.programBlendWeights.setUniform1i("tSearch",1);a.bindTexture(this.textureArea,2);this.programBlendWeights.setUniform1i("tArea",2);a.bindTexture(this.tmpFramebufferEdges.colorTexture,3);this.programBlendWeights.setUniform1i("tEdges",3);a.drawArrays(4,0,3);a.bindFramebuffer(b);a.setClearColor(0,1,0,1);a.clear(a.gl.COLOR_BUFFER_BIT);a.bindProgram(this.programBlur);this.programBlur.setUniform4f("uResolution",1/c,1/d,c,d);a.bindTexture(e.colorTexture,0);this.programBlur.setUniform1i("tColor",0);
a.bindTexture(this.tmpFramebufferBlend.colorTexture,1);this.programBlur.setUniform1i("tBlendWeights",1);a.drawArrays(4,0,3);a.setDepthTestEnabled(!0)};f.prototype.loadTextureFromBase64=function(b,f,a){var c=new n(this.rctx,{pixelFormat:a,dataType:5121,wrapMode:33071,samplingMode:f},null);p.dataUriToImage(b).then(function(a){c.resize(a.width,a.height);c.setData(a)});return c};return f}()});