<template>
  <section class="container">
    <div id="mapDiv"></div>
  </section>
</template>

<script>

import { loadModules } from 'esri-loader'

export default {
  data () {
    return {
      
    }
  },
  methods: {
    setMap (map) {
      this.$store.commit('map/setMap', map)
    }
  },
  mounted () {
    loadModules([
      'esri/Map',
      'esri/views/SceneView',
      'esri/views/MapView',
      'esri/layers/TileLayer',
      'esri/layers/BaseDynamicLayer',
      'esri/layers/MapImageLayer',
      'esri/core/watchUtils'
    ], {
      // use a specific version instead of latest 4.x
      // url: 'https://js.arcgis.com/4.6/'
      url: '/arcgis_js_v47_api/init.js'
      // url: '/arcgis_js_v47_api/dojo/dojo.js'
    }).then(([EsriMap, SceneView, MapView, TileLayer, BaseDynamicLayer, MapImageLayer, watchUtils]) => {
      // create map with the given options at a DOM node w/ id 'mapNode'
      let map

      let tileLayer = new TileLayer({
        url: "http://10.128.101.221:6080/arcgis/rest/services/JCSJ/DZDT2017/MapServer"
      });

      if (!this.$store.state.map.map) {
        map = new EsriMap({
          layers: [tileLayer]
        })
        this.setMap(map)
      } else {
        map = this.$store.state.map.map
      }

      let mapImageLayer = new MapImageLayer({
        url: "http://192.168.16.49:6080/arcgis/rest/services/TEST/MapServer",
        // url: 'http://10.128.101.221:6080/arcgis/rest/services/ZTSJ/ZTSJ20170915/MapServer',
        sublayers: [
          {
            id: 3,
            visible: true,
            definitionExpression: "(起始点编码='10400201' AND 终止点编码='10400301') OR (起始点编码='90000001' AND 终止点编码='10101303')"
          }
        ]
      });

      map.add(mapImageLayer);
      
      const mapView = new MapView({
        container: 'mapDiv',
        map
      })

      // NOTE: important: now that we're using a promise
      // your callback must NOT return any v4.x classes that resolve to promises
      // this will cause a hole in the space-time continum that will kill us all
      // return view
    })
  },
  beforeDestroy () {
  }
}
</script>

<style scoped>

/*@import url('https://js.arcgis.com/4.6/esri/css/main.css');*/
@import url('/arcgis_js_v47_api/esri/css/main.css');

#mapDiv {
  height: 450px;
  width: 80%;
  margin: 0 auto
}

.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
