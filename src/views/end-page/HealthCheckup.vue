<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="clickButton('add')">新增</el-button>
      </el-col>
      <!--      <el-col :span="5" :offset="1">-->
      <!--        <el-input v-model="page.search" placeholder="请输入搜索内容" clearable/>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1" :offset="1">-->
      <!--        <el-button type="success" @click="search">搜索</el-button>-->
      <!--      </el-col>-->
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="checkTim" label="体检时间" width="170"/>
        <el-table-column prop="sysUser.nickname" label="体检教师" width="100"/>
        <el-table-column prop="szy" label="舒张压"/>
        <el-table-column prop="ssy" label="收缩压"/>
        <el-table-column prop="tzzs" label="体重指数"  width="100"/>
        <el-table-column prop="ytb" label="腰臀比"/>
        <el-table-column prop="niaosuan" label="尿素"/>
        <el-table-column prop="niaosu" label="尿酸"/>
        <el-table-column prop="jigan" label="肌酐"/>
        <el-table-column prop="gysz" label="甘油三酯"  width="100"/>
        <el-table-column prop="dkc" label="胆固醇"/>
        <el-table-column prop="gdkc" label="高密度脂蛋白胆固醇"  width="155"/>
        <el-table-column prop="ddkc" label="低密度脂蛋白胆固醇"  width="155"/>
        <el-table-column prop="ptt" label="葡萄糖"/>
        <el-table-column prop="tys" label="同型半胱氨酸"  width="110"/>
        <el-table-column prop="wlbdb" label="微量白蛋白"  width="110"/>
        <el-table-column prop="njk" label="微量白蛋白/尿肌酐"  width="150"/>
        <el-table-column prop="createTime" label="创建时间" width="170"/>
        <el-table-column prop="createBy" label="创建人"/>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button size="small" type="success" @click="clickButton('update', scope.row)">修改</el-button>
            <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">详情</el-button>
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
        <el-form-item label="体检时间">
          <el-date-picker
              v-model="form.checkTim"
              type="date"
              placeholder="请选择"
              value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="体检教师">
          <el-select v-model="form.checkUserId">
            <el-option v-for="item in teacherList" v-bind:key="item.id" :label="item.username" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="舒张压">
          <el-input v-model="form.szy" />
        </el-form-item>
        <el-form-item label="收缩压">
          <el-input v-model="form.ssy" />
        </el-form-item>
        <el-form-item label="体重指数">
          <el-input v-model="form.tzzs" />
        </el-form-item>
        <el-form-item label="腰臀比">
          <el-input v-model="form.ytb" />
        </el-form-item>
        <el-form-item label="尿素">
          <el-input v-model="form.niaosuan" />
        </el-form-item>
        <el-form-item label="尿酸">
          <el-input v-model="form.niaosu" />
        </el-form-item>
        <el-form-item label="肌酐">
          <el-input v-model="form.jigan" />
        </el-form-item>
        <el-form-item label="甘油三酯">
          <el-input v-model="form.gysz" />
        </el-form-item>
        <el-form-item label="胆固醇">
          <el-input v-model="form.dkc" />
        </el-form-item>
        <el-form-item label="高密度脂蛋白胆固醇" >
          <el-input v-model="form.gdkc" />
        </el-form-item>
        <el-form-item label="低密度脂蛋白胆固醇">
          <el-input v-model="form.ddkc" />
        </el-form-item>
        <el-form-item label="葡萄糖">
          <el-input v-model="form.ptt" />
        </el-form-item>
        <el-form-item label="同型半胱氨酸">
          <el-input v-model="form.tys" />
        </el-form-item>
        <el-form-item label="微量白蛋白">
          <el-input v-model="form.wlbdb" />
        </el-form-item>
        <el-form-item label="微量白蛋白/尿肌酐">
          <el-input v-model="form.njk" />
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
            :page-size="page.pageSize"
            @current-change="currentChange"
            layout="prev, pager, next"
        />
      </div>
    </el-affix>
  </div>


</template>


<script>

import {healthCheckupApi, sysUserApi} from "@/api/api";


export default {
  name: "HealthCheckup",
  data() {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      teacherList: [],
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
      healthCheckupApi.page(this.page)
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
        healthCheckupApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        healthCheckupApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        healthCheckupApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      healthCheckupApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        healthCheckupApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        healthCheckupApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTeacherList(){
      sysUserApi.allUserByType('TEACHER')
          .then((resp)=>{
            this.teacherList=resp.data.data
          })
    },

    initTableData() {
      healthCheckupApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

  },
  mounted() {
    this.initTableData()
    this.initTeacherList()
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

