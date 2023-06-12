<template>
  <div>
    <el-card>
      <template #header>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="单位名称">
              <el-input v-model="page.q1" placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-button @click="search" type="primary">查询</el-button>
            <el-button @click="cleanQuery" >清除</el-button>
            <el-button type="primary" @click="clickButton('add')">新增</el-button>
          </el-col>
        </el-row>
      </template>
      <el-table :data="tableData" style="width: 100%"
                :height="670"
                :header-cell-style="{color:'#333333',fontSize:'14px',borderTop:'1px solid #EBEEF0'}"
                :cell-style="{paddingTop:'15px',paddingBottom:'15px'}"
      >
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="password" label="密码"/>
        <el-table-column prop="nickname" label="昵称"/>
        <el-table-column prop="deptInfo.name" label="单位"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-link :type="'primary'" :underline="false" @click="clickButton('detail', scope.row)">查看</el-link>
            <el-link :type="'warning'" :underline="false" @click="clickButton('update', scope.row)">修改</el-link>
            <el-link :type="'danger'" :underline="false" @click="clickButton('delete', scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="affix-container">
        <el-row>
          <el-col :span="5" :offset="17">
            <el-pagination
                small
                background
                layout="total,prev, pager, next"
                :total="total"
                :page-size="this.page.pageSize"
                @current-change="currentChange"
                class="mt-4"
            />
          </el-col>
        </el-row>
      </div>
    </el-card>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="单位">
          <el-select v-model="form.deptId" placeholder="请选择">
             <el-option v-for="item in deptList"  v-bind:key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
<span class="dialog-footer" v-if="!dialog.formDisabled">
<el-button @click="dialog.dialogFormVisible = false">取消</el-button>
<el-button type="success" @click="formSubmit">确认</el-button>
</span>
      </template>
    </el-dialog>


  </div>
</template>

<script>
import {deptApi, sysUserApi} from "@/api/api";
import {ElMessageBox} from "element-plus";


export default {
  name: "DeptManage",
  data() {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
      },
      tableData: [],
      dialog: {
        dialogFormVisible: false,
        optionName: '新增',
        formDisabled: true,
        optionValue: null
      },
      form: {},
      total: 0,
      deptList:[]
    }
  },

  methods: {

    cleanQuery() {
      this.page = {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
      }
      this.search()
    },

    search() {
      sysUserApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    initDeptList(){
      deptApi.listAll()
          .then((resp)=>{
            this.deptList=resp.data.data
          })
    },

    handleAvatarSuccess(response) {
      this.form.img = response[0].url
    },


    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        sysUserApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        sysUserApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        ElMessageBox.confirm(
            '确定删除这条信息？',
            '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }
        ).then(() => {
          sysUserApi.deleteById(row.id).then(() => {
            this.initTableData()
          })
        })

      }
    },

    currentChange(number) {
      this.page.pageNum = number
      sysUserApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        sysUserApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        sysUserApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      sysUserApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

  },
  mounted() {
    this.initTableData()
    this.initDeptList()
  },

}
</script>

<style scoped lang="scss">
::v-deep(.el-card__header) {
  padding-bottom: 10px;
}

.affix-container {
  height: 40px;
  margin-top: 30px;
}

.el-link {
  margin-right: 8px;
}

.el-card {
  height: 90vh;
  overflow: auto;
}

::v-deep(.el-form-item__label) {
  color: #333333;
  font-size: 14px;
}
</style>