<template>
  <div style="height: 100%!important;">

  </div>
</template>

<style>
  html,body {
    height: 100%!important;
  }
</style>

<script>

  import axios from 'axios'

  export default {
    layout: 'blank',
    data() {
      return {
      }
    },
    mounted () {
      this.logout().then(function () {
        this.$store.commit('changeLogin',false)
      })
    },
    methods:{
      async logout () {
        await axios.post(apiPathWin.logout, {})
      }
    }
  }
</script>
