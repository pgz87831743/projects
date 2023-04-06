<template>
  <div class="div">
    <el-card>
      <div>
        <el-row>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="药品名称"/>
            <el-table-column prop="description" label="需求描述"/>
            <el-table-column prop="img" label="药品图片">
              <template #default="scope">
                <el-image :src="scope.row.img"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="是否解决"/>
            <el-table-column prop="createTime" label="创建时间"/>
            <el-table-column prop="createBy" label="创建人"/>
            >
            <el-table-column label="操作" width="300px">
              <template #default="scope">
                <el-button size="small" type="success" @click="clickButton('update', scope.row)">沟通</el-button>
                <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">捐赠</el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-row>


        <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
          <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
            <el-form-item label="主键">
              <el-input v-model="form.id"/>
            </el-form-item>
            <el-form-item label="药品名称">
              <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="需求描述">
              <el-input v-model="form.description"/>
            </el-form-item>
            <el-form-item label="药品图片">
              <el-input v-model="form.img"/>
            </el-form-item>
            <el-form-item label="是否解决">
              <el-input v-model="form.status"/>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="form.createTime"/>
            </el-form-item>
            <el-form-item label="创建人">
              <el-input v-model="form.createBy"/>
            </el-form-item>
          </el-form>
          <template #footer>
<span class="dialog-footer" v-if="!dialog.formDisabled">
<el-button @click="dialog.dialogFormVisible = false">取消</el-button>
<el-button type="success" @click="formSubmit">确认</el-button>
</span>
          </template>
        </el-dialog>


        <!-- 分页 -->
        <div class="paginationClass">
          <el-pagination
              small
              background
              :total="total"
              :page-size="5"
              @current-change="currentChange"
              layout="prev, pager, next"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>


<script>

import {drugHelpApi} from "@/api/api";


export default {
  name: "DrugHelpProvideFont",
  data() {
    return {
      page: {
        pageSize: 5,
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
        formDisabled: true,
        optionValue: null
      },
      form: {},
      total: 0,
    }
  },

  methods: {

    search() {
      drugHelpApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        drugHelpApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        drugHelpApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        drugHelpApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      drugHelpApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        drugHelpApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        drugHelpApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      drugHelpApi.page(this.page)
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

