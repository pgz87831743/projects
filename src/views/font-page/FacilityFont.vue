<template>
  <div class="div">
  <el-card>
    <el-row>

      <el-col :span="5" :offset="1">
        <el-input v-model="page.search" placeholder="请输入设施名称" clearable @clear="this.initTableData"/>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="success" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" border height="450" style="width: 100%">
        <el-table-column prop="city.name" label="城市"/>
        <el-table-column prop="avatar" label="图片">
          <template #default="scope">
            <img :src="scope.row.img" width="100">
          </template>
        </el-table-column>
        <el-table-column prop="facilityType" label="设施类型，可选值包括医院、学校、公园、购物中心和餐厅"/>
        <el-table-column prop="name" label="设施名称"/>
        <el-table-column prop="address" label="设施地址"/>
        <el-table-column prop="latitude" label="设施所在的纬度，以度为单位"/>
        <el-table-column prop="longitude" label="设施所在的经度，以度为单位"/>
        <el-table-column prop="rating" label="设施评级，范围在0到5之间"/>
      </el-table>
    </el-row>

  </el-card>

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

import {cityApi, facilityApi} from "@/api/api";


export default {
  name: "FacilityFont",
  data() {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      tableData: [],
      cityList:[],
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
      facilityApi.page(this.page)
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
        facilityApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        facilityApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        facilityApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      facilityApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        facilityApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        facilityApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      facilityApi.page(this.page)
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
