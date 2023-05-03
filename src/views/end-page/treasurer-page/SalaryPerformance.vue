<template>
  <div class="p-div">
    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="autoPerformance">生成本月工资绩效</el-button>
      </el-col>
            <el-col :span="5" :offset="1">
              <el-input v-model="page.search" placeholder="请输入姓名" clearable @clear="this.initTableData"/>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="success" @click="search">搜索</el-button>
            </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" border height="600" style="width: 100%"
                  :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                  :cell-style="{textAlign:'center',padding:'30px'}">
          <el-table-column prop="monthInfo" label="月份"/>
          <el-table-column prop="nickname" label="姓名"/>
          <el-table-column prop="salary" label="工资"/>
          <el-table-column prop="perform" label="绩效">
            <template #default="scope">
              {{scope.row.perform.toFixed(2)}}
            </template>
          </el-table-column>
          <el-table-column prop="total" label="总计"/>
<!--          <el-table-column label="操作" width="300px">-->
<!--            <template #default="scope">-->
<!--              <el-button size="small" type="success" @click="clickButton('update', scope.row)">修改</el-button>-->
<!--              <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">详情</el-button>-->
<!--              <el-button-->
<!--                  size="small"-->
<!--                  type="danger"-->
<!--                  @click="clickButton('delete',scope.row)">删除-->
<!--              </el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
      </el-col>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="主键">
          <el-input v-model="form.id" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="form.userId" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.nickname" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="工资">
          <el-input v-model="form.salary" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="绩效">
          <el-input v-model="form.perform" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="总计">
          <el-input v-model="form.total" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.createTime" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.createBy" placeholder="请输入"/>
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
            layout="total,prev, pager, next, jumper"
        />
      </div>
    </el-affix>
  </div>


</template>


<script>

import {performanceApi} from "@/api/api";


export default {
  name: "SalaryPerformance",
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
      performanceApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    handleAvatarSuccess(response) {
      this.form.img = response[0].url
    },

    autoPerformance(){
      performanceApi.autoPerformance()
          .then(()=>{
            this.initTableData()
          })
    },

    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        performanceApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        performanceApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        performanceApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      performanceApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        performanceApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        performanceApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      performanceApi.page(this.page)
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

