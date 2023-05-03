<template>
  <div class="p-div">
    <el-row>
            <el-col :span="5" :offset="1">
              <el-input v-model="page.search" placeholder="请输入姓名" clearable @clear="this.initTableData"/>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="success" @click="search">搜索</el-button>
            </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="success" @click="exportExcel('PersonnelList')">导出</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" border height="600" style="width: 100%"
                  :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                  :cell-style="{textAlign:'center',padding:'10px'}">
          <el-table-column prop="username" label="用户名"/>
          <el-table-column prop="password" label="密码" />
          <el-table-column prop="nickname" label="姓名" />

          <el-table-column prop="idCard" label="身份证" width="200"/>
          <el-table-column prop="phone" label="联系方式" width="150"/>
          <el-table-column prop="sex" label="性别"/>
          <el-table-column prop="role" label="角色" >
            <template #default="scope">
              <span v-if="scope.row.role==='ADMIN'">管理员</span>
              <span v-if="scope.row.role==='SALESMAN'">业务员</span>
              <span v-if="scope.row.role==='TREASURER'">财务员</span>
              <span v-if="scope.row.role==='ADMINISTRATIVE'">行政员</span>
            </template>
          </el-table-column>
          <el-table-column prop="dept" label="机构"  width="180">
            <template #default="scope">
              {{scope.row.deptInfo.name}}
            </template>
          </el-table-column>
          <el-table-column prop="seniority" label="工龄" />
          <el-table-column prop="startTime" label="入职时间"/>
          <el-table-column prop="endTime" label="离职时间"/>
          <el-table-column prop="status" label="状态"/>
          <el-table-column label="操作" width="300px">
            <template #default="scope">
              <el-button size="small" type="success" @click="clickButton('update', scope.row)">修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.nickname" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="身份证" >
          <el-input v-model="form.idCard" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio name="sex" label="男"></el-radio>
            <el-radio name="sex" label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker value-format="YYYY-MM-DD" v-model="form.startTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="离职时间">
          <el-date-picker value-format="YYYY-MM-DD" v-model="form.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="入职状态">
          <el-radio-group v-model="form.status">
            <el-radio name="sex" label="在职"></el-radio>
            <el-radio name="sex" label="离职"></el-radio>
          </el-radio-group>
        </el-form-item>
<!--        <el-form-item label="角色">-->
<!--          <el-input v-model="form.role" placeholder="请输入"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="机构">-->
<!--          <el-input v-model="form.dept" placeholder="请输入"/>-->
<!--        </el-form-item>-->
      </el-form>
      <template #footer>
<span class="dialog-footer" v-if="!dialog.formDisabled">
<el-button @click="dialog.dialogFormVisible = false">取消</el-button>
<el-button type="success" @click="formSubmit">确认</el-button>
</span>
      </template>
    </el-dialog>


    <!-- 分页 -->
    <el-affix position="bottom" :offset="20">
      <div class="paginationClass">
        <el-pagination
            small
            background
            :total="total"
            :page-size="this.page.pageSize"
            @current-change="currentChange"
            layout="total,prev, pager, next, jumper"
        />
      </div>
    </el-affix>
  </div>


</template>


<script>

import {sysUserApi} from "@/api/api";
import {getUser} from "@/utils/authutil";


export default {
  name: "OnboardingReview",
  data() {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
        search: ''
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
    }
  },

  methods: {

    search() {
      sysUserApi.administrativePage(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    exportExcel(type) {
      window.location.href='/api/sys/sysUser/exportInfo?type='+type+"&userId="+getUser().id
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
        sysUserApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      sysUserApi.administrativePage(this.page).then(resp => {
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
        sysUserApi.administrativeUpdateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      sysUserApi.administrativePage(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

  },
  mounted() {
    this.initTableData()
  },

}
</script>


<style lang="scss" scoped>
.el-row:nth-child(1) {
  margin-top: 0;
}

.el-row {
  margin-top: 30px;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.paginationClass {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  text-align: center;
}


.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

</style>

