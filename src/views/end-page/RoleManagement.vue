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
        <el-table-column prop="name" label="角色名"/>
        <el-table-column prop="description" label="描述"/>
        <el-table-column label="操作" width="200px">
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
        <el-form-item label="角色名">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"/>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
              :data="authorityDate"
              show-checkbox
              ref="roleTree"
              node-key="id"
              :props="defaultProps"
          />
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
  sysRoleAdd,
  sysRoleDeleteById,
  sysRoleGetById,
  sysRolePage,
  sysRoleUpdateById,
  systemAuthorityTree,
} from "@/api/api";

export default {
  name: "RoleManagement",
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'description',
      },
      page: {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      tableData: [],
      authorityDate: [],
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


    treeData() {
      systemAuthorityTree().then((resp => {
        this.authorityDate = resp.data.data
      }))
    },


    clickButton(type, row) {
      if (type === 'add') {
        this.treeData()
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
        this.dialog.isAdd = true
      } else if (type === 'update') {
        sysRoleGetById(row.id).then((resp => {
          this.dialog.isAdd = false
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
          this.$nextTick(() => {
            this.form.authorities.forEach((row) => {
              this.$refs.roleTree.setChecked(row, true, false)
            })
          })
        }))
      } else if (type === 'detail') {
        sysRoleGetById(row.id).then((resp => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
          this.$nextTick(() => {
            this.form.authorities.forEach((row) => {
              this.$refs.roleTree.setChecked(row, true, false)
            })
          })

        }))

      } else if (type === 'delete') {
        sysRoleDeleteById(row.id).then(() => {
          this.initTableData()
        })
      }

    },

    currentChange(number) {
      this.page.pageNum = number
      sysRolePage(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.form.authorities = this.$refs.roleTree.getCheckedKeys()
      if (this.dialog.isAdd) {
        console.log(this.$refs.roleTree.getCheckedKeys());
        sysRoleAdd(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (!this.dialog.isAdd) {
        sysRoleUpdateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
      this.dialog.dialogFormVisible = false
    },

    dialogClose() {
      this.form = {}
      // this.$refs.roleTree.setCheckedKeys(this.authorityDate.map(k => k.id), false)
      this.$refs.roleTree.setCheckedKeys([], false)
    },

    initTableData() {
      sysRolePage(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    }

  },
  mounted() {
    this.initTableData()
    this.treeData()
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
  height: 100px;
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
