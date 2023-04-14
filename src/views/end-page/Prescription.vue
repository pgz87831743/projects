<template>
  <div class="p-div">
    <el-row>
      <el-table :data="tableData" border height="450" style="width: 100%">
        <el-table-column prop="doctorIdUser.nickname" label="医生"/>
        <el-table-column prop="medicalIdMedical.name" label="医疗机构"/>
        <el-table-column prop="officesIdOffices.name" label="科室"/>
        <el-table-column prop="time" label="就诊时间"/>
        <el-table-column prop="result" label="检查结果"/>
        <el-table-column prop="preInfo" label="处方信息"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="createBy" label="创建人"/>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button size="small" type="success" @click="clickButton('update', scope.row)">修改</el-button>
            <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">详情</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="处方信息">
          <el-input  type="textarea" :autosize="{minRows:10}" v-model="form.preInfo" placeholder="请输入"/>
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
    <el-affix position="bottom" :offset="20">
      <div class="paginationClass">
        <el-pagination
            small
            background
            :total="total"
            :page-size="this.page.pageSize"
            @current-change="currentChange"
            layout="prev, pager, next"
        />
      </div>
    </el-affix>
  </div>


</template>


<script>

import {medicalApi, sysUserApi, visitApi} from "@/api/api";


export default {
  name: "Prescription",
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
      doctorList:[],
      medicalList: [],
      officesList: [],
    }
  },

  methods: {

    search() {
      visitApi.page(this.page)
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
        visitApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        visitApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        visitApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      visitApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        visitApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        visitApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      visitApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    initDoctorList() {
      sysUserApi.allUserByType('DOCTOR')
          .then(resp => {
            this.doctorList = resp.data.data
          })
    },

    initMedicalList() {
      medicalApi.listAll()
          .then(resp => {
            this.medicalList = resp.data.data
          })
    },

    change(id) {
      medicalApi.getById(id)
          .then((resp) => {
            this.form.officesId=null
            this.officesList = resp.data.data.officesList
          })
    }


  },
  mounted() {
    this.initTableData()
    this.initMedicalList()
    this.initDoctorList()
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

