<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="clickButton('add')">新增</el-button>
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
            <img :src="scope.row.avatar" width="100">
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别"/>
        <el-table-column prop="school" label="学校"/>
        <el-table-column prop="description" label="简介"/>
        <el-table-column prop="role" label="角色"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="createBy" label="创建人"/>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button size="small" @click="clickButton('update', scope.row)">修改</el-button>
            <el-button size="small" @click="clickButton('detail', scope.row)">详情</el-button>
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
          <el-upload
              class="avatar-uploader"
              action="/api/file/upload"
              :data="{fileTypeEnum:'FILE'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name="files"
          >
            <img  :src="form.avatar"  width="100" />
            <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>

        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学校">
          <el-input v-model="form.school"/>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="form.description"/>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role">
            <el-option :label="item" :value="item" v-for="item in roleData"  v-bind:key="item"/>
          </el-select>
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

import {roles, sysUserAdd, sysUserDeleteById, sysUserGetById, sysUserPage, sysUserUpdateById} from "@/api/api";
import {Plus} from "@element-plus/icons-vue";

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
  components: {Plus},
  methods: {

    handleAvatarSuccess(response){
      this.form.avatar=response[0].url
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
              window.location.href='/UserManagement'
            })
      }
    },

    dialogClose() {
      this.form = {}
    },

    initRoleData() {
      roles().then((resp) => {
        this.roleData = resp.data.data
      })
    },

    initTableData() {
      sysUserPage(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

  },
  mounted() {
    this.initTableData()
    this.initRoleData()
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
