<template>

  <div class="div">
      <div class="div">
        <el-row>
          <el-col>
            <el-table :data="tableData" border height="450" style="width: 100%">
              <el-table-column prop="id" label="ID"/>
              <el-table-column prop="pet.name" label="宠物名称"/>
              <el-table-column prop="pet.img" label="宠物照片" width="500">
                <template #default="scope">
                  <img :src="scope.row.pet.img" height="300"/>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="领养时间"/>
              <el-table-column prop="createBy" label="领养人"/>
            </el-table>
          </el-col>
        </el-row>
      </div>
  </div>

</template>


<script>

import {adoptApi} from "@/api/api";


export default {
  name: "MyAdeptList",
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
    initTableData() {
      adoptApi.listAll()
          .then(resp => {
            this.tableData = resp.data.data
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

