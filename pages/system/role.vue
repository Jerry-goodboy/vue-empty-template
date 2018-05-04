<template>
  <div>
    <div style="margin: 20px 0">
      <el-row >
        <el-col :span="12">
          <el-button v-if="id_role_add" round size="mini" @click="setDialogFormVisible('add')">添加角色</el-button>
          <el-button v-if="id_role_edit" round size="mini" @click="setDialogFormVisible('edit')">编辑角色</el-button>
          <el-button v-if="id_role_delete" round size="mini" @click="deleteRole">删除角色</el-button>
          <el-button v-if="id_role_assign" round size="mini" @click="assignRoleResource">分配角色权限</el-button>

        </el-col>
        <el-col :span="12">
          <el-form :inline="true" :model="formInline" class="" size="mini">
            <el-form-item label="角色名称">
              <el-input v-model="formInline.user" placeholder="角色名称查询"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

    </div>

    <el-row >
      <el-col :span="12">

        <div class="grid-content bg-purple">
          <el-table
            ref="roleTable"
            :data="tableData"
            :height="tableHeight"
            border
            style="width: 100%"
            highlight-current-row
            @row-click="handleCurrentRowClick"
            empty-text="暂无数据">

            <el-table-column
              prop="name"
              label="用户名"
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

        <div class="grid-content bg-purple" style="height:400px;    overflow: auto;border:1px solid #ebeef5;">

          <el-tree
            :data="treeData"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            @check="checkTreeNodes"
            :indent="30"
            :props="treeDataProps">
          </el-tree>

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

        <el-form-item label="角色名" prop="name">
          <el-input v-model="formData.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input v-model="formData.remark" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setDialogFormVisible('close')">取 消</el-button>
        <el-button type="primary" @click="updateRole('formData')">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>

  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  import axios from 'axios'

  export default {

    layout: 'default',
    data() {
      return {
        // 表格数据源
        tableData: [],

        // 表格高度
        tableHeight: 400,

        // 分页属性值
        rows:2,
        currentPage:1,
        pageSizes:[2,4,6,8],
        totalRows:0,

        // 表单数据源
        formData: {
          id:"",
          name: '',
          remark:''
        },

        labelPosition: 'right',

        dialogFormRules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur,change' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur,change' }
          ]
        },

        // 搜索输入框
        formInline: {
          user: ""
        },

        // 对话框的标题
        dialogTitle:"",

        // 选中角色的ID数组
        roleIds: [],

        // 分配给 选中角色 的 权限ID二维数组
        resourceIds: [],

        // 选中行的数据
        selectTableRow: {},

        // 弹窗是否显示
        dialogFormVisible: false,

        // 树状列表数据源
        treeData: [],

        // 树状列表子组件键值别名
        treeDataProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    computed: {
      // 控制按钮的显示和隐藏
      ...mapState('toolbar' ,{
          // 箭头函数可使代码更简练
          id_role_add: state => state.id_role_add,
          id_role_edit: state => state.id_role_edit,
          id_role_delete: state => state.id_role_delete,
          id_role_assign: state => state.id_role_assign
      })
    },
    created () {
      this.reloadPage()
    },
    methods:{
      handleClose(done) {
        this.$confirm('是否确认取消？')
          .then(_ => {
            this.clearValidate('formData')
            this.dialogFormVisible = false
            done();
          })
          .catch(_ => {});
      },
      // 重置 表单数据源
      resetFormData (data) {
        if (!!data && _.isObject(data)) {
          this.formData = {
            id: data.id || '',
            name: data.name || '',
            remark: data.remark || ''
          }
        }else {
          this.formData = {
            id:'',
            name: '',
            remark:''
          }
        }

      },

      clearValidate(formName) {
        this.$refs[formName].clearValidate()
      },

      // 刷新页面
      reloadPage () {

        Promise.all([this.queryRoleList(), this.queryResourceList()]).then(() => {
            this.setCurrentRow(this.selectTableRow)
            this.setCheckedKeys(this.selectTableRow.permissionIds || [])
        })

      },

      // 搜索方法
      onSearch() {
        this.reloadPage()
      },

      // 控制弹窗显示与隐藏
      setDialogFormVisible (handle) {

        if (handle == "close") {
          this.handleClose()
        }else {
          if (handle == "add") {
            this.dialogTitle = "新建角色"
            this.resetFormData()
          }else if (handle == "edit") {
            if ( _.isEmpty(this.selectTableRow) ) {
              this.$message({
                showClose: true,
                message: '请先点击选择一个角色',
                type: 'error'
              })
              return false
            }else {
              this.dialogTitle = "编辑角色"
              this.resetFormData(this.selectTableRow)
            }
          }
          this.dialogFormVisible = true
        }
      },

      // 获取角色列表
      async queryRoleList () {

        await axios
        .post(apiPathWin.queryRoleList, {
          page:this.currentPage,
          rows:this.rows,
          name:this.formInline.user
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
      },

      // 获取权限列表
      async queryResourceList () {
        await axios
        .post(apiPathWin.queryPermissionList,{})
        .then((res) => {

            var data = res.data;

            if (data.successFlag) {
              this.treeData = data.result
            }else {
              this.$router.push(routerPath.login);
            }

        })
      },

      // 点击 表格 行时 设置 树状列表 复选框
      setRoleSelectedPermissionIds (data) {
        let rows = _.find(this.tableData, function(o) { return o.id == data.id; });
        rows.permissionIds = data.permissionIds
      },

      // 设置 权限ID二维数组
      setResourceIds (data) {
        this.resourceIds = []
        this.resourceIds.push(data)
      },

      // 给 角色 分配 权限
      assignRoleResource () {
        if ( _.isEmpty(this.selectTableRow) ) {
          this.$message({
            showClose: true,
            message: '请先点击选择一个角色',
            type: 'error'
          })
          return false
        }else {
          var params = {
            roleIdList: this.roleIds,
            permissionList: this.resourceIds
          };

          this.$confirm('是否将该权限分配给角色?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios
            .post(apiPathWin.distributionPermission,params)
            .then((res) => {

                var data = res.data;

                if (data.successFlag) {
                  this.$message({
                    type: 'success',
                    message: '分配成功!'
                  });

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

      // 删除角色
      deleteRole () {

        if ( _.isEmpty(this.selectTableRow) ) {
          this.$message({
            showClose: true,
            message: '请先点击选择一个角色',
            type: 'error'
          })
          return false
        }else {
          this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios
            .post(apiPathWin.deleteRole,{
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
            })
          })
        }

      },

      // 新建或者更新 角色
      updateRole (formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {

            axios
              .post(apiPathWin.saveRole,this.formData)
              .then((res) => {

                  var data = res.data;

                  if (data.successFlag) {
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

      setCurrentRow(row) {
        this.$refs.roleTable.setCurrentRow(row);
      },

      // 点击 表格 行
      handleCurrentRowClick(row, event, column) {
        this.selectTableRow = row

        this.setRoleSelectedPermissionIds(this.selectTableRow)
        this.setCheckedKeys(this.selectTableRow.permissionIds)

        this.formData = {
          id: this.selectTableRow.id || "",
          name: this.selectTableRow.name || "",
          remark: this.selectTableRow.remark  || ""
        }

        this.roleIds = [this.formData.id]
        this.setResourceIds(this.selectTableRow.permissionIds)

      },

      // 点击翻页按钮
      handleCurrentPageChange(val) {
        this.currentPage = val
        this.reloadPage()
      },

      // 每页显示条数变化
      handleSizeChange(val) {
        this.rows = val
        this.reloadPage()
      },

      // 通过 key 设置 树状列表 复选框
      setCheckedKeys(data) {
        this.$refs.tree.setCheckedKeys(data);
      },

      // 通过 Node 获取
      getCheckedNodes() {
        return this.$refs.tree.getCheckedNodes()
      },

      // 通过 key 获取
      getCheckedKeys() {
        return this.$refs.tree.getCheckedKeys();
      },

      checkTreeNodes() {

        var checkedNodes = this.getCheckedNodes()
        var checkedSonKeys = []

        _.forEach(checkedNodes,function (value,index) {

          if (!!value.children && value.children.length == 0) {
            checkedSonKeys.push(value.id)
          }

        })

        this.setResourceIds(checkedSonKeys)
      },

      resetTreeChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }

    }
  }
</script>
