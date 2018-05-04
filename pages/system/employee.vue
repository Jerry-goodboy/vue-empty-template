<!---
* 益港信息技术研发中心
* 文件描述：
* Created by Witsel on 2018/4/11.
-->
<template>
  <div>
    <div style="margin: 20px 0">
      <el-row >
        <el-col :span="12">
          <el-button v-if="id_employee_add" round size="mini" @click="setDialogFormVisible('add')">添加人员</el-button>
          <el-button v-if="id_employee_edit" round size="mini" @click="setDialogFormVisible('edit')">编辑人员</el-button>
          <el-button v-if="id_employee_delete" round size="mini" @click="deleteEmployee">删除人员</el-button>
        </el-col>
        <el-col :span="12">
          <el-form :inline="true" :model="formInline" class="" size="mini">
            <el-form-item label="姓名">
              <el-input v-model="formInline.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
<!----------------------------------------------------    表格   ------------------------------------>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-table
            ref="employeeTable"
            :data="tableData"
            :height="tableHeight"
            border
            style="width: 100%"
            highlight-current-row
            @row-click="handleCurrentRowClick"
            empty-text="暂无数据">

            <el-table-column
              prop="name"
              label="姓名"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="sex"
              label="性别"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="card"
              label="身份证号"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="telephone"
              label="联系电话"
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
      <!--<el-col :span="10" :offset="1">-->

        <!--<div class="grid-content bg-purple" style="height:400px;    overflow: auto;border:1px solid #ebeef5;">-->

          <!--<el-tree-->
            <!--:data="treeData"-->
            <!--show-checkbox-->
            <!--default-expand-all-->
            <!--node-key="id"-->
            <!--ref="tree"-->
            <!--highlight-current-->
            <!--@check="checkTreeNodes"-->
            <!--:indent="30"-->
            <!--:props="treeDataProps">-->
          <!--</el-tree>-->

        <!--</div>-->

      <!--</el-col>-->
    </el-row>


    <el-dialog
      :visible.sync="dialogFormVisible"
      center>
      <template slot="title">
        <span class="el-dialog__title">{{dialogTitle}}</span>
      </template>
      <el-form :model="formData">
        <el-form-item label="姓名" >
          <el-input v-model="formData.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-input v-model="formData.sex" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" >
          <el-input v-model="formData.card" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" >
          <el-input v-model="formData.telephone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setDialogFormVisible">取 消</el-button>
        <el-button type="primary" @click="updateEmployee">确 定</el-button>
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
      return {
        // 搜索输入框
        formInline: {
          name: ""
        },
        // 表格数据源
        tableData: [],

        // 表格高度
        tableHeight: 400,

        // 分页属性值
        rows:5,
        currentPage:1,
        pageSizes:[5,10,15,20],
        totalRows:0,

        // 表单数据源
        formData: {
          id:"",
          name: '',
          sex: '',
          card: '',
          telephone:''
        },

        // 对话框的标题
        dialogTitle:"",

        // 选中行的数据
        selectTableRow: {},

        // 弹窗是否显示
        dialogFormVisible: false,

      }
    },
    computed: {
      // 控制按钮的显示和隐藏
      ...mapState('toolbar' ,{
          // 箭头函数可使代码更简练
        id_employee_add: state => state.id_employee_add,
        id_employee_edit: state => state.id_employee_edit,
        id_employee_delete: state => state.id_employee_delete,
      })
    },
    created () {
      this.reloadPage()
    },
    methods:{
      // 重置 表单数据源
      resetFormData (data) {
        if (!!data && _.isObject(data)) {
          this.formData = {
            id: data.id || '',
            name: data.name || '',
            sex: data.sex || '',
            card: data.card || '',
            telephone: data.telephone || ''
          }
        }else {
          this.formData = {
            id:'',
            name: '',
            sex: '',
            card: '',
            telephone:''
          }
        }

      },
      // 搜索方法
      onSearch() {
        this.reloadPage()
      },
      // 刷新页面
      reloadPage () {

        Promise.all([this.queryEmployeeList()]).then(() => {
            this.setCurrentRow(this.selectTableRow)
        })

      },

      // 控制弹窗显示与隐藏
      setDialogFormVisible (handle) {
        if (handle == "add") {
          this.dialogTitle = "新建人员"
          this.resetFormData()
        }else if (handle == "edit") {
          if ( _.isEmpty(this.selectTableRow) ) {
            this.$message({
              showClose: true,
              message: '请先点击选择一个人员',
              type: 'error'
            })
            return false
          }
          this.dialogTitle = "编辑人员"
          this.resetFormData(this.selectTableRow)
        }

        this.dialogFormVisible = !this.dialogFormVisible
      },

      // 获取人员列表
      async queryEmployeeList () {

        await axios
        .post(apiPathWin.queryEmployeeList, {
          page:this.currentPage,
          rows:this.rows,
          name:this.formInline.name
        })
        .then((res) => {
          console.log(res);
            var data = res.data;
            if (data.successFlag) {
              this.totalRows = data.result.total
              this.tableData = data.result.rows
              //当编辑后刷新页面时，更新点击行的数值
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


      // 删除人员
      deleteEmployee () {
        if ( _.isEmpty(this.selectTableRow) ) {
          this.$message({
            showClose: true,
            message: '请先点击选择一个人员',
            type: 'error'
          })
          return false
        }else {
          this.$confirm('此操作将删除该人员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios
              .post(apiPathWin.deleteEmployee, {
                id: this.formData.id
              })
              .then((res) => {
                console.log(res);
                  var data = res.data;
                  if (data.successFlag) {
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    //重置选中行数据，并刷新页面
                    this.selectTableRow = {}
                    this.reloadPage()

                  } else {
                    this.$router.push(routerPath.login);
                  }
              })
              .catch((error) => {
                this.$router.push(routerPath.error);
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },

      // 新建或者更新人员
      updateEmployee () {
        axios
          .post(apiPathWin.saveEmployee,this.formData)
          .then((res) => {
            console.log(res);
              var data = res.data;
              if (data.successFlag) {
                this.setDialogFormVisible()
                this.resetFormData()
                this.reloadPage()
              }else {
                this.$router.push(routerPath.login);
              }
          })
          .catch( (error) => {
            this.$router.push(routerPath.error);
          })
      },

      setCurrentRow(row) {
        this.$refs.employeeTable.setCurrentRow(row);
      },

      // 点击 表格 行
      handleCurrentRowClick(row, event, column) {
          //对selectTable 赋值
        this.selectTableRow = row
        //对弹出框表单赋值
        this.formData = {
          id: this.selectTableRow.id || "",
          name: this.selectTableRow.name || "",
          sex: this.selectTableRow.sex || '',
          card: this.selectTableRow.card || '',
          telephone: this.selectTableRow.telephone || ''
        }
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
      }

    }
  }
</script>
