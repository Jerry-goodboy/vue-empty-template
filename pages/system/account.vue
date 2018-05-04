<template>
  <div>
    <div style="margin: 20px 0">
      <el-row >
        <el-col :span="12">
      <el-button v-if="id_account_add" round size="mini" @click="setDialogFormVisible('add')">添加账户</el-button>
      <el-button v-if="id_account_edit" round size="mini" @click="setDialogFormVisible('edit')">编辑账户</el-button>
      <el-button v-if="id_account_delete" round size="mini"  @click="deleteAccount">删除账户</el-button>
      <el-button v-if="id_account_assign" round size="mini" @click="distributionRole">分配账户角色</el-button>
        </el-col>
        <el-col :span="12">
          <el-form :inline="true" :model="formInline" class="" size="mini">
            <el-form-item label="账号">
              <el-input v-model="formInline.username" placeholder="账号查询"></el-input>
            </el-form-item>
            <el-form-item label="人员" >
              <el-select v-model="formInline.employeeId" filterable placeholder="请选择">
                <el-option
                  v-for="item in searchEmployees"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
              <el-button type="info" @click="onClear">清空</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <el-row >
      <el-col :span="12">

        <div class="grid-content bg-purple">
          <el-table
            ref="accountTable"
            :data="tableData"
            :height="tableHeight"
            border
            style="width: 100%"
            highlight-current-row
            @row-click="handleCurrentRowClick"
            empty-text="暂无数据">

            <el-table-column
              prop="username"
              label="账号"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="password"
              label="密码"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="employee.name"
              label="人员"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="employee.telephone"
              label="电话"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="remark"
              label="备注"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>

          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentPageChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="rows"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalRows">
          </el-pagination>
        </div>

      </el-col>
      <el-col :span="10" :offset="1">

        <div class="grid-content bg-purple" style="height:400px;overflow: auto;">

          <el-table
            ref="roleTable"
            :data="tableRoleData"
            :height="tableHeight"
            border
            style="width: 100%"
            highlight-current-row
            @row-click="handleRoleRowClick"
            empty-text="暂无数据">
            <el-table-column
              label=""
              min-width="20">
              <template slot-scope="scope">
                <!-- is-checked -->
                <span :text="scope.row.name"
                      class="cs-role-td-radio el-radio__input "
                      :class="{ 'is-checked':scope.row.id === roleSelectedId }">
                  <span class="el-radio__inner"></span>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="角色名"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="remark"
              label="备注"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>

          </el-table>


        </div>

      </el-col>
    </el-row>


    <el-dialog
      :visible.sync="dialogFormVisible"
      center
      :before-close="handleClose">
      <template slot="title">
        <span class="el-dialog__title">{{dialogTitle}}</span>
      </template>
      <el-form :model="formData" label-width="100px" status-icon :rules="dialogFormRules" ref="formData" :label-position="labelPosition">
        <el-form-item label="账号" prop="username">
          <el-input v-model="formData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="人员" prop="employeeId">
          <el-select v-model="formData.employeeId" filterable placeholder="请选择">
            <el-option
              v-for="item in inputEmployees"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input v-model="formData.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setDialogFormVisible('close')">取 消</el-button>
        <el-button type="primary" @click="updateAccount('formData')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

  import axios from 'axios'
  axios.defaults.withCredentials = true

  export default {
    layout: 'default',
    data() {
      var checkUserName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入账号'));
        }
        else {
          if (value.length < 1 || value.length > 20) {
            callback(new Error('长度在 1 到 20 个字符'));
          } else{
            var reg=/^[A-Za-z0-9]+$/;
            if(!reg.test(value)){
              callback(new Error('请输入英文字符或者数字'));
            }else {
              callback();
            }
          }
        }
      };
      return {
        inputEmployees: [],
        searchEmployees:[],
        // 搜索输入框
        formInline: {
          username: "",
          employeeId:""
        },
        labelPosition: 'right',
        dialogFormRules: {
          username: [
            { required: true,validator: checkUserName, trigger: 'blur,change' }
          ],
         /* username: [
            { required: true, message: '请输入账号', trigger: 'blur,change' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur,change' }
          ],*/
          password: [
            { required: true, message: '请输入密码', trigger: 'blur,change' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur,change' }
          ],
          employeeId: [
            { required: true, message: '请选择人员', trigger: 'blur,change' },
          ]
        },
        // 账号表格数据源
        tableData: [],
        // 角色表格数据源
        tableRoleData: [],
        // 表格高度
        tableHeight: 400,
        // 分页属性值
        rows:2,
        currentPage:1,
        pageSizes:[2,4,6,8],
        totalRows:0,
        // 选中行的数据
        selectTableRow: {},
        // 选中行的数据--角色
        selectRoleTableRow: {},
        // 对话框的标题
        dialogTitle:"",
        // 弹窗是否显示
        dialogFormVisible: false,
        // 表单数据源
        formData: {
          id:"",
          username: '',
          password: '',
          employeeId: '',
          remark:''
        },

        roleRadio:1,
        roleSelectedId: 0
      }
    },
    computed: {
      // 控制按钮的显示和隐藏
      ...mapState('toolbar' ,{
        // 箭头函数可使代码更简练
        id_account_add: state => state.id_account_add,
        id_account_edit: state => state.id_account_edit,
        id_account_delete: state => state.id_account_delete,
        id_account_assign: state => state.id_account_assign
      })
    },
    created () {
      this.reloadPage()
      this.queryInputEmployees()
      this.querySearchEmployees()
    },
    methods:{
      tableRadioChange(value) {
        debugger
        this.roleRadio = value
      },
      handleClose(done) {
        this.$confirm('是否确认取消？')
          .then(_ => {
            this.clearValidate('formData')
            this.dialogFormVisible = false
            done();
          })
          .catch(_ => {});
      },
      clearValidate(formName) {
        this.$refs[formName].clearValidate()
      },
      // 刷新页面
      reloadPage () {
        Promise.all([this.queryAccountList(),this.queryRoleListForAccount()]).then(() => {
          this.setCurrentRow(this.selectTableRow);
          this.setCurrentRoleRow(this.selectRoleTableRow);
        })
      },
      // 搜索方法
      onSearch() {
        this.reloadPage()
      },
      //清空方法
      onClear() {
        this.formInline.username=""
        this.formInline.employeeId=this.searchEmployees[0].value||""
        this.reloadPage()
      },
      setCurrentRow(row) {
        this.$refs.accountTable.setCurrentRow(row);
      },
      setCurrentRoleRow(row) {
        this.$refs.roleTable.setCurrentRow(row);
      },
      // 重置 表单数据源
      resetFormData (data) {
        if (!!data && _.isObject(data)) {
          this.formData = {
            id: data.id || '',
            username: data.username || '',
            password: data.password || '',
            employeeId: data.employee.id || '',
            remark: data.remark || ''
          }
        }else {
          this.formData = {
            id:'',
            username: '',
            password: '',
            employeeId: '',
            remark:''
          }
        }

      },
      // 控制弹窗显示与隐藏
      setDialogFormVisible (handle) {

          if(!handle){
            this.dialogFormVisible = false
          }else {
            if (handle == "close") {
              this.handleClose()
            } else {
              if (handle == "add") {
                this.dialogTitle = "添加账户";
                this.resetFormData();
              } else if (handle == "edit") {
                if (_.isEmpty(this.selectTableRow)) {
                  this.$message({
                    showClose: true,
                    message: '请先点击选择一个账户',
                    type: 'error'
                  })
                  return false
                }
                this.dialogTitle = "编辑账户";
                this.resetFormData(this.selectTableRow)
              }

              this.dialogFormVisible = true
            }
          }
      },
      //点击账号表格行
      handleCurrentRowClick(row, event, column) {
        this.selectTableRow = row;
        this.setAccountSelectedForRole(this.selectTableRow);
        //this.setCheckedKeys(this.selectTableRow.permissionIds)
        this.formData = {
          id: this.selectTableRow.id || "",
          username: this.selectTableRow.username || "",
          password: this.selectTableRow.password || "",
          employeeId: this.selectTableRow.employee.id || "",
          remark: this.selectTableRow.remark  || ""
        };
        console.log(this.formData);
        //this.setResourceIds(this.selectTableRow.permissionIds)
      },
      // 点击翻页按钮
      handleCurrentPageChange(val) {
        this.currentPage = val
        this.selectTableRow= {}
        this.selectRoleTableRow= {}
        this.reloadPage();
      },

      // 每页显示条数变化
      handleSizeChange(val) {
        this.rows = val
        this.selectTableRow= {}
        this.selectRoleTableRow= {}
        this.reloadPage()
      },
      //点击角色表格行
      handleRoleRowClick(row, event, column) {
        this.selectRoleTableRow = row;
        this.roleSelectedId = row.id
      },
      //获取账号列表
      async queryAccountList () {
        await axios
          .post(apiPathWin.queryAccountList, {
            page:this.currentPage,
            rows:this.rows,
            username:this.formInline.username,
            employeeId:this.formInline.employeeId
          })
          .then((res) => {
              var data = res.data;
              if (data.successFlag) {
                this.totalRows = data.result.total
                this.tableData = data.result.rows
                let row = _.find(this.tableData, (o) => { return o.id == this.selectTableRow.id; })
                this.selectTableRow = row || {}
              }else {
                this.$router.push(routerPath.login);
              }

          })
          .catch( (error) => {
            this.$router.push(routerPath.error);
          })
      },

      //获取角色列表
      async queryRoleListForAccount () {
        await axios
          .post(apiPathWin.queryRoleListForAccount, {})
          .then((res) => {
              var data = res.data;
              if (data.successFlag) {
                this.tableRoleData = data.result.rows;
                let row = _.find(this.tableRoleData, (o) => { return o.id == this.selectRoleTableRow.id; })
                this.selectRoleTableRow = row || {}
              }else {
                this.$router.push(routerPath.login);
              }
          })
          .catch( (error) => {
            this.$router.push(routerPath.error);
          })
      },
      //获取人员下拉框--弹框
      async queryInputEmployees () {
        await axios
          .get(apiPathWin.selectEmployees+"?isSearch=false")
          .then((res) => {
              var data = res.data;
              if (data.successFlag) {
                this.inputEmployees = data.result
              }else {
                this.$router.push(routerPath.login);
              }
          })
          .catch( (error) => {
            this.$router.push(routerPath.error);
          })
      },
      //获取人员下拉框--搜索
      async querySearchEmployees () {
        await axios
          .get(apiPathWin.selectEmployees+"?isSearch=true")
          .then((res) => {
            var data = res.data;
            if (data.successFlag) {
              this.searchEmployees = data.result
              if(data.result[0]&&data.result[0].value){
                this.formInline.employeeId=data.result[0].value
              }
            }else {
              this.$router.push(routerPath.login);
            }
          })
          .catch( (error) => {
            this.$router.push(routerPath.error);
          })
      },
      //点击账号表格行时选中角色表格行
      setAccountSelectedForRole (data) {
        this.$refs.roleTable.setCurrentRow();//取消选中行
          if(data&&data.roles&&data.roles[0]) {
              var roleId=data.roles[0].id;
              let row = _.find(this.tableRoleData, function (o) {
                return o.id == roleId;
              });

              this.selectRoleTableRow = row
              this.roleSelectedId = row.id
              this.$refs.roleTable.setCurrentRow(row);
          }
      },
      // 新建或者更新账号
      updateAccount (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

        axios
          .post(apiPathWin.saveAccount,this.formData)
          .then((res) => {
            var data = res.data;
            if (data.successFlag) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.setDialogFormVisible()
              this.resetFormData()
              this.reloadPage()
            }else {
              this.$router.push(routerPath.login);
            }

          })
          } else {
            return false
          }
        })
      },
      //删除账号
      deleteAccount () {
        if ( _.isEmpty(this.selectTableRow) ) {
          this.$message({
            showClose: true,
            message: '请先点击选择一个账号',
            type: 'error'
          })
          return false
        }else {
          this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios
              .post(apiPathWin.deleteAccount,{
                id: this.formData.id
              })
              .then((res) => {

                var data = res.data;

                if (data.successFlag) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });

                  this.selectTableRow = {}
                  this.reloadPage()

                }else {
                  this.$router.push(routerPath.login);
                }

              })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      // 给账号分配角色
      distributionRole () {
        if (_.isEmpty(this.selectTableRow)) {
          this.$message({
            showClose: true,
            message: '请先点击选择一个账号',
            type: 'error'
          })
          return false
        }else if(_.isEmpty(this.selectRoleTableRow)){
          this.$message({
            showClose: true,
            message: '请先点击选择一个角色',
            type: 'error'
          })
          return false
        } else {
          var params = {
            accountId: this.selectTableRow.id,
            roleId: this.selectRoleTableRow.id,
          };

          this.$confirm('是否给该账号分配角色?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios
              .post(apiPathWin.distributionRole, params)
              .then((res) => {

                var data = res.data;

                if (data.successFlag) {
                  this.$message({
                    type: 'success',
                    message: '分配成功!'
                  });

                  this.reloadPage()

                } else {
                  this.$router.push(routerPath.login);
                }

              })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消分配'
            });
          });
        }
      },
    }
  }

</script>
