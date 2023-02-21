<template>
  <div>
    <el-space style="width: 100%" fill>

      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="type" label="监测类型"/>
          <el-table-column prop="recommend" label="参考策略"/>
          <el-table-column prop="createTime" label="创建时间"/>
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
export default {

  data() {
    return {
      form: {},
      labelWidth: 100,
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: null,
      centerDialogVisible: false,
      optionName: '新增',
      tableData: []
    }
  },
  components: {},
  methods: {


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
