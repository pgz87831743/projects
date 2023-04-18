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
      <el-table :data="tableData" border height="450" style="width: 100%">
        <el-table-column prop="id" label="ID"/>
        <el-table-column prop="city.name" label="城市"/>
        <el-table-column prop="gdp" label="GDP(亿)"/>
        <el-table-column prop="gdpGrowthRate" label="该城市的GDP增长率，以百分比表示"/>
        <el-table-column prop="perCapitaGdp" label="该城市的人均GDP，以元为单位"/>
        <el-table-column prop="disposableIncome" label="该城市的人均可支配收入，以元为单位"/>
        <el-table-column prop="inflationRate" label="该城市的通货膨胀率，以百分比表示"/>
        <el-table-column prop="unemploymentRate" label="该城市的失业率，以百分比表示"/>
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
        <el-form-item label="城市">
          <el-select v-model="form.cityId" placeholder="请选择" :disabled="dialog.optionValue!=='add'">
            <el-option :label="item.name" v-for="item in cityList" v-bind:key="item.id" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="GDP(亿)">
          <el-input type="number" v-model="form.gdp" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="GDP增长率">
          <el-input  type="number" v-model="form.gdpGrowthRate" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="人均GDP">
          <el-input type="number" v-model="form.perCapitaGdp" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="人均可支配收入">
          <el-input type="number" v-model="form.disposableIncome" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="通货膨胀率">
          <el-input type="number" v-model="form.inflationRate" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="失业率">
          <el-input  type="number" v-model="form.unemploymentRate" placeholder="请输入"/>
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

import {cityApi, economyApi} from "@/api/api";



export default {
  name: "Economy",
  data() {
    return {
      page: {
        pageSize: 5,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      tableData: [],
      cityList: [],
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
      economyApi.page(this.page)
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
        economyApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        economyApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        economyApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      economyApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        economyApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        economyApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      economyApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    initCityList() {
      cityApi.listAll()
          .then(resp => {
            this.cityList = resp.data.data
          })
    },

  },
  mounted() {
    this.initTableData()
    this.initCityList()
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

