<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="clickButton('add')">新增</el-button>
      </el-col>
      <!--      <el-col :span="5" :offset="1">-->
      <!--        <el-input v-model="page.search" placeholder="请输入搜索内容" clearable @clear="this.initTableData"/>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1" :offset="1">-->
      <!--        <el-button type="success" @click="search">搜索</el-button>-->
      <!--      </el-col>-->
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" border height="600" style="width: 100%"
                  :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                  :cell-style="{textAlign:'center'}">
          <el-table-column prop="carInfo.name" label="车辆"/>
          <el-table-column prop="score" label="评分"/>
          <el-table-column prop="driverInfo.username" label="司机"/>
          <el-table-column prop="returnCarInfo" label="还车信息"/>
          <el-table-column prop="createTime" label="创建时间"/>
          <el-table-column prop="createBy" label="创建人"/>
          <el-table-column label="操作" width="300px">
            <template #default="scope">
              <el-button v-if="scope.row.returnCarInfo==='使用中'" size="small" type="success" @click="clickButton('update', scope.row)">还车</el-button>
              <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">详情</el-button>
              <el-button
                  size="small"
                  type="danger"
                  @click="clickButton('delete',scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">


        <div v-if="dialog.optionValue==='update'">
          <el-form-item label="车辆">
            <el-select v-model="form.carId" disabled>
              <el-option v-for="item in carList" v-bind:key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="司机">
            <el-select v-model="form.driverId"  disabled>
              <el-option v-for="item in driverList" v-bind:key="item.id" :label="item.username" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="评分">
            <el-input type="number" v-model="form.score" placeholder="请输入" />
          </el-form-item>
        </div>

        <div v-if="dialog.optionValue==='add'">
          <el-form-item label="车辆">
            <el-select v-model="form.carId" >
              <el-option v-for="item in carList" v-bind:key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评分">
            <el-input type="number"  v-model="form.score" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="司机">
            <el-select v-model="form.driverId"  clearable>
              <el-option v-for="item in driverList" v-bind:key="item.id" :label="item.username" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="还车信息">
            <el-input  v-model="form.returnCarInfo" placeholder="请输入"/>
          </el-form-item>
        </div>

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

import {carApi, carRecordApi, sysUserApi} from "@/api/api";


export default {
  name: "CarRecord",
  data() {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      tableData: [],
      carList:[],
      driverList:[],
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
      carRecordApi.page(this.page)
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
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        carRecordApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        carRecordApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        carRecordApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      carRecordApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        carRecordApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        this.form.returnCarInfo='已还'
        carRecordApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      carRecordApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    initCarData() {
      carApi.listAll()
          .then(resp => {
            this.carList = resp.data.data
          })
    },
    initDriverList() {
      sysUserApi.driverList()
          .then(resp => {
            this.driverList = resp.data.data
          })
    },

  },
  mounted() {
    this.initTableData()
    this.initCarData()
    this.initDriverList()
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
