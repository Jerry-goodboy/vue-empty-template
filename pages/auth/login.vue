<template>
  <div style="height: 100%!important;">

    <el-container style="height: 100%!important;">
      <el-main style="height: 100%!important;">
        <el-row type="flex" class="row-bg" justify="center" align="middle" style="height: 100%!important;margin-bottom:50px;" >
          <el-col>
            <h1 style="font-size:20px;text-align:center;">系统名称</h1>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center" align="middle" style="height: 100%!important;" >
          <el-col :span="6" style="height: 100%!important;">
            <el-form ref="form" :model="form" label-width="80px" >
          
              <el-form-item label="账号">
                <el-input v-model="form.username"></el-input>
              </el-form-item>

              <el-form-item label="密码">
                <el-input v-model="form.password" @keyup.enter.native="onSubmit"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
              </el-form-item>
            </el-form>

          </el-col>
        </el-row>
      </el-main>
    </el-container>

            

  </div>
</template>

<style>
  html,body {
    height: 100%!important;
  }
</style>

<script>
  
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  import axios from 'axios'

  export default {
    layout: 'blank',
    data() {
      return {
        form: {
          username: '',
          password: '',
          keep: false
        }
      }
    },
    methods:{
      ...mapActions('toolbar' ,[
        "btnShow"
      ]),
      async onSubmit() {
        
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        await this.login().then((res) => {
            var data = res.data

            if (data.successFlag) {

              this.getPermissionListByAuth().then((res) => {
                
                  var data = res.data

                  if (data.successFlag) {
                    this.setMenuBtnVisible(data.result)
                    // this.$router.go(-1)
                    loading.close();
                    this.$router.push(routerPath.home)
                  }else {
                    this.msgAlert(data.msg)
                  }


              })
              
            }else {
              this.msgAlert(data.msg)
            }
        })

      },

      msgAlert(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
          duration: 5000,
          center: true
        });
      },

      async login () {
          
        return await axios.post(apiPathWin.login, {
          username:this.form.username
          ,password:this.form.password
        },{
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [function (data) {
            return qsWin.stringify(data);
          }],
        })

      },

      async getPermissionListByAuth () {

        return await axios.get(apiPathWin.getPermissionListByAuth)

      },

      setMenuBtnVisible (data) {

        _.forEach(data, (item, key) => {

          if (!!item.code){
            this.btnShow({
              commit: item.code,
              flag: true
            })
          }

          if (!!item.child && item.child.length != 0) {
            this.setMenuBtnVisible (item.child)
          }

        });

      }

    }
  }
</script>
