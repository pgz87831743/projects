<template>
  <div>
    <el-space style="width: 100%" fill>


      <el-row>


        <el-col :span="4" :offset="1">
          <el-form-item label="搜索内容">
            <el-input v-model="page.name" placeholder="请输入搜索内容" clearable @clear="searchQuery"/>
          </el-form-item>

        </el-col>

        <el-col :span="3" :offset="1">
          <el-form-item label="时间">
            <el-date-picker
                v-model="page.data"
                type="data"
                format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="searchQuery">搜索</el-button>
        </el-col>





      </el-row>

      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="petName" label="宠物名称"/>
          <el-table-column prop="recommend" label="参考策略"/>
          <el-table-column prop="dataStr" label="创建时间"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-space>


    <!-- 分页 -->
    <div class="paginationClass">
      <el-pagination
          small
          background
          :total="total"
          @current-change="currentChange"
          layout="prev, pager, next"
      />
    </div>

  </div>


</template>


<script>
import {dateFormat} from "@/utils/DateUtils";

export default {

  data() {
    return {
      form: {},
      labelWidth: 100,
      page: {
        pageNum: 1,
        pageSize: 10
      },
      total: null,
      centerDialogVisible: false,
      optionName: '新增',
      tableData: []
    }
  },
  components: {},
  methods: {

    searchQuery() {

      if (this.page.data!=null){
        this.page.dataStr=dateFormat('YYYY-mm-dd',this.page.data)
      }

      this.$http.post("/healthMonitoring/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    handleDelete(index, row) {
      this.$http.delete("/healthMonitoring/delete/" + row.id)
          .then(() => {
            this.initTableData()
          })
    },

    currentChange(number) {
      this.page.pageNum = number
      this.$http.post("/healthMonitoring/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    initTableData() {
      this.$http.post("/healthMonitoring/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    }
  },
  mounted() {
    this.initTableData()
  },

}
</script>


<style lang="scss" scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.paginationClass {
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
  text-align: center;
}

</style>
