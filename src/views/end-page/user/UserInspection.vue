<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="clickButton('add')">新增</el-button>
      </el-col>
            <el-col :span="5" :offset="1">
              <el-input v-model="page.search" placeholder="请输入检查项" clearable @clear="this.initTableData"/>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="success" @click="search">搜索</el-button>
            </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" border height="600" style="width: 100%"
                  :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                  :cell-style="{textAlign:'center',padding:'15px'}">
          <el-table-column prop="name" label="检查项目名称"/>
          <el-table-column prop="description" label="检查项目描述"/>
          <el-table-column label="操作" width="300px">
            <template #default="scope">
              <el-button size="small" type="success" @click="clickButton('reservation', scope.row)">预约</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" >
        <el-form-item label="检查项目名称"  >
          <el-input v-model="form.name" placeholder="请输入" :disabled="dialog.formDisabled"/>
        </el-form-item>
        <el-form-item label="检查项目描述" >
          <el-input v-model="form.description" placeholder="请输入" :disabled="dialog.formDisabled"/>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
              v-model="form.dateTime"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="请选择"
          />
        </el-form-item>

      </el-form>
      <template #footer>
<span class="dialog-footer" ><el-button type="success" @click="formSubmit">确认预约</el-button>
<el-button @click="dialog.dialogFormVisible = false">取消</el-button>

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

import {inspectionApi, reservationApi} from "@/api/api";


export default {
  name: "Inspection",
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
      inspectionApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    handleAvatarSuccess(response) {
      this.form.img = response[0].url
    },


    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'reservation') {
        inspectionApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '预约'
          this.dialog.formDisabled = true
          this.form = resp.data.data
          this.form.inspectionId=row.id
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      inspectionApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },
    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'reservation') {
        reservationApi.reservation(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },

    dialogClose() {
      this.form = {}
    },

    initTableData() {
      inspectionApi.page(this.page)
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
