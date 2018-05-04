<template>

  <div>

    <el-tag type="success" style="font-size: 18px;">系统名称</el-tag>

    <el-container>

      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="width: 100%">

        <el-submenu v-if="system" index="/system">
          <template slot="title">系统管理</template>
          <el-menu-item v-if="system_employee" index="/system/employee">人员管理</el-menu-item>
          <el-menu-item v-if="system_account" index="/system/account">账号管理</el-menu-item>
          <el-menu-item v-if="system_role" index="/system/role">角色权限管理</el-menu-item>
        </el-submenu>

        <el-menu-item v-if="mapMenu" index="/map/map">地图</el-menu-item>

      </el-menu>

    </el-container>

    <nuxt/>

  </div>
</template>

<script>

  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    data() {
      return {
      };
    },
    computed: {
      // 控制按钮的显示和隐藏
      ...mapState('toolbar' ,{
          // 箭头函数可使代码更简练
          system: state => state.system,
          system_employee: state => state.system_employee,
          system_account: state => state.system_account,
          system_role: state => state.system_role,
          mapMenu: state => state.mapMenu
      })
    },
    methods: {
      handleSelect(key, keyPath) {
      }
    }
  }
</script>

<style>
</style>
