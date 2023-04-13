<template>
  <div class="p-div">
    <el-row >
      <el-col>
        <el-form label-position="left" :inline="true">
          <el-form-item label="分类号:" :label-width="80">
            <el-input v-model="page.classificationNumber" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="档号:" :label-width="80">
            <el-input v-model="page.referenceNum" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排架号:" :label-width="80">
            <el-input v-model="page.rackNumber" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="保管期限:" :label-width="80">
            <el-input v-model="page.storagePeriod" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="16">
        <el-form label-position="left" :inline="true">
          <el-form-item label="开工日期:" :label-width="80">
            <el-date-picker
                v-model="page.startDate"
                type="date"
                placeholder="请选择"
                value-format="YYYY-MM-DD"

            />
          </el-form-item>
          <el-form-item label="竣工日期:" :label-width="80">
            <el-date-picker
                v-model="page.completionDate"
                type="date"
                placeholder="请选择"
                value-format="YYYY-MM-DD"

            />
          </el-form-item>
          <el-form-item label="工程名:" :label-width="80">
            <el-input v-model="page.projectName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button>重置</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" border height="480" style="width: 100%">
          <el-table-column prop="totalRegistrationNumber" label="总登记号"/>
          <el-table-column prop="classificationNumber" label="分类号"/>
          <el-table-column prop="referenceNum" label="档号"/>
          <el-table-column prop="rackNumber" label="排架号"/>
          <el-table-column prop="storagePeriod" label="保管期限"/>
          <el-table-column prop="fileTitle" label="案卷题名" width="200"/>
          <el-table-column prop="firstResponsiblePerson" label="第一责任者"/>
          <el-table-column prop="otherResponsiblePersons" label="其他责任者"/>
          <el-table-column prop="projectName" label="工程名称"  width="180"/>
          <el-table-column prop="constructionUnit" label="建设单位"/>
          <el-table-column prop="designUnit" label="设计单位"/>
          <el-table-column prop="processUnit" label="施工单位"/>
          <el-table-column prop="startDate" label="开工日期" width="110"/>
          <el-table-column prop="completionDate" label="竣工日期" width="110"/>
        </el-table>
      </el-col>
    </el-row>


    <!-- 分页 -->
    <el-affix position="bottom" :offset="20">
      <div class="paginationClass">
        <el-pagination
            :page-size="this.page.pageSize"
            :background="true"
            layout="total,prev, pager, next, jumper"
            :total="total"
            @current-change="currentChange"
        />

      </div>
    </el-affix>
  </div>


</template>


<script>

import {excelDataApi} from "@/api/api";


export default {
  name: "ExcelData",
  data() {
    return {
      page: {
        pageSize: 5,
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
      excelDataApi.page(this.page)
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
        excelDataApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        excelDataApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        excelDataApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      excelDataApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        excelDataApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        excelDataApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      excelDataApi.page(this.page)
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

  height: 80px;
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

