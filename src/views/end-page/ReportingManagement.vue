<template>
  <div class="p-div">

    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="resourcesId" label="资源ID">
          <template #default="scope">
            <el-link :href="'/FileDetail?id='+scope.row.resourcesId" target="_blank">{{scope.row.resourcesId}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="举报内容" :show-overflow-tooltip='true'/>
        <el-table-column prop="createBy" label="举报人"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button size="small" type="success" @click="deleteResourceHandle(scope.row)">删除文件</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>





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


</template>


<script>

import {  reportApi} from "@/api/api";

export default {
  name: "ReportingManagement",
  data() {
    return {
      page: {
        pageSize: 5,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      tableData: [],
      total: 0,
    }
  },
  methods: {



    deleteResourceHandle(item){
      console.log(item)
      reportApi.deleteResource(item)
          .then(()=>{
            this.initTableData()
          })
    },




    currentChange(number) {
      this.page.pageNum = number
      reportApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },



    initTableData() {
      reportApi.page(this.page)
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
