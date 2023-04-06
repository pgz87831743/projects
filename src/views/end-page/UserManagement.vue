<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button  type="primary" @click="clickButton('add')">新增</el-button>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input v-model="page.search" placeholder="请输入搜索内容" clearable/>
      </el-col>
      <el-col :span="1">
        <el-button type="success">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="password" label="密码"/>
        <el-table-column prop="nickname" label="昵称"/>
        <el-table-column prop="avatar" label="头像">
          <template #default="scope">
            <div class="demo-image__preview">
              <el-image
                  :src="scope.row.avatar"
                  fit="cover"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别"/>
        <el-table-column prop="phone" label="手机"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="level" label="会员等级"/>
        <el-table-column prop="age" label="年龄"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="createBy" label="创建人"/>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button  size="small" @click="clickButton('update', scope.row)">修改</el-button>
            <el-button  size="small" @click="clickButton('detail', scope.row)">详情</el-button>
            <el-button
                size="small"
                type="danger"

                @click="clickButton('delete',scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="用户名">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"/>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"/>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.avatar"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>

        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.phone"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"/>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-input v-model="form.level"/>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"/>
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="form.roles">
            <el-checkbox v-bind:key="item.id" v-for="item in this.roleData" :label="item.id" name="type">
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer" v-if="!dialog.formDisabled">
        <el-button @click="dialog.dialogFormVisible = false">取消</el-button>
        <el-button type="primary" v-if="this.isAdd" @click="formSubmit">确认</el-button>
        <el-button type="primary" v-if="!this.isAdd" @click="formSubmit">确认</el-button>
      </span>
      </template>
    </el-dialog>


    <!-- 分页 -->
    <div class="paginationClass">
      <el-pagination
          small
          background
          :total="total"
          @current-change="currentChange"
          layout="prev, pager, next"
      />
    </div>


  </div>


</template>


<script>

import {
  systemAssignRoles,
  systemRoleList,
  sysUserAdd,
  sysUserDeleteById,
  sysUserGetById,
  sysUserPage,
  sysUserUpdateById
} from "@/api/api";

export default {
  name: "UserManagement",
  data() {
    return {
      api: '/sys/sys-user',
      page: {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      visible: [],
      role: {},
      tableData: [],
      roleData: [],
      dialog: {
        dialogFormVisible: false,
        optionName: '新增',
        isAdd: false,
        formDisabled: true
      },
      form: {},
      total: 0,
    }
  },
  components: {},
  methods: {

    submitRole(row) {
      let data = {userId: row.id, roles: row.role}
      console.log(data)
      systemAssignRoles(data)
    },

    clickButton(type, row) {
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
        this.dialog.isAdd = true
      } else if (type === 'update') {
        sysUserGetById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.dialog.isAdd = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        sysUserGetById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        sysUserDeleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      sysUserPage(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.isAdd) {
        sysUserAdd(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (!this.dialog.isAdd) {
        sysUserUpdateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },

    dialogClose() {
      this.form = {}
    },

    initTableData() {
      sysUserPage(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    initRoleDate() {
      systemRoleList('1').then(resp => {
        this.roleData = resp.data.data
      })
    }


  },
  mounted() {
    this.initTableData()
    this.initRoleDate()
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
