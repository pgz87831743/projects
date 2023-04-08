<template>

  <div class="div">
    <div class="p-div">
      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="主键"/>
          <el-table-column prop="person" label="检测人"/>
          <el-table-column prop="result" label="检测结果"/>
          <el-table-column prop="dept" label="检测机构"/>
          <el-table-column prop="createBy" label="创建人"/>
          <el-table-column prop="createTime" label="检测时间"/>
        </el-table>
      </el-row>


      <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
        <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
          <el-form-item label="检测人">
            <el-input v-model="form.person"/>
          </el-form-item>
          <el-form-item label="检测结果">
            <el-input v-model="form.result"/>
          </el-form-item>
          <el-form-item label="检测机构">
            <el-input v-model="form.dept"/>
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
  </div>




</template>


<script>

import {nucleicAcidApi} from "@/api/api";

export default {
  name: "NucleicAcid",
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
      nucleicAcidApi.page(this.page)
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
        nucleicAcidApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        nucleicAcidApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        nucleicAcidApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      nucleicAcidApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        nucleicAcidApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        nucleicAcidApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      nucleicAcidApi.page(this.page)
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

