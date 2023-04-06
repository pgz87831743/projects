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
      <el-table row-key="id" :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="权限名"/>
        <el-table-column prop="description" label="描述"/>
        <el-table-column prop="type" label="权限类型 mean button"/>
        <el-table-column label="操作" width="280px">
          <template #default="scope">
            <el-button size="small" @click="clickButton('update', scope.row)">修改</el-button>
            <el-button size="small" @click="clickButton('addChild', scope.row)">新增</el-button>
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
        <el-form-item label="权限名"><el-input v-model="form.name"/></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description"/></el-form-item>
        <el-form-item label="权限类型">
          <el-radio-group v-model="form.type" >
            <el-radio label="mean" size="large">菜单</el-radio>
            <el-radio label="button" size="large">按钮</el-radio>
          </el-radio-group>
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




  </div>



</template>


<script>

import {sysAuthorityAdd, sysAuthorityDeleteById,  sysAuthorityUpdateById,systemAuthorityTree} from "@/api/api";

export default {
  name: "AuthorityManagement.vue",
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
        isAdd: false,
        formDisabled: true
      },
      form: {},
      total: 0,
    }
  },
  components: {},
  methods: {
    clickButton(type, row) {
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
        this.dialog.isAdd = true
      } if (type === 'addChild') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
        this.dialog.isAdd = true
        this.form.pid = JSON.parse(JSON.stringify(row)).id
      } else if (type === 'update') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '修改'
        this.dialog.formDisabled = false
        this.dialog.isAdd = false
        this.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'detail') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '详情'
        this.dialog.formDisabled = true
        this.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'delete') {
        sysAuthorityDeleteById(row.id).then(() => {
          this.initTableData()
        })
      }

    },



    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.isAdd) {
        sysAuthorityAdd(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (!this.dialog.isAdd) {
        sysAuthorityUpdateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },

    dialogClose() {
      this.form = {}
    },

    initTableData() {
      systemAuthorityTree()
          .then(resp => {
            this.tableData = resp.data.data
            this.total = resp.data.data.total
          })
    }

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
