<template>
  <div>
    <el-space style="width: 100%" fill>
      <el-row>
        <el-button type="primary" @click="centerDialogVisible = true">新增</el-button>
      </el-row>
      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="xm" label="宠物名称"/>
          <el-table-column prop="zl" label="宠物种类"/>
          <el-table-column prop="gwbs" label="过往病史"/>
          <el-table-column prop="jy" label="绝育情况（是否）"/>
          <el-table-column prop="nl" label="年龄"/>
          <el-table-column prop="qz" label="体重（kg）"/>
          <el-table-column prop="ymqk" label="疫苗情况"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >修改
              </el-button
              >
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
    <el-dialog
        v-model="centerDialogVisible"
        @close="dialogClose"
        width="30%"
    >
      <template #header>
        <div class="my-header">
          {{ optionName }}
        </div>
      </template>
      <el-form v-model="form"   label-width="130px">
        <el-form-item label="宠物名称">
          <el-input v-model="form.xm"/>
        </el-form-item>
        <el-form-item label="种类">
          <el-input v-model="form.zl"/>
        </el-form-item>
        <el-form-item label="过往病史">
          <el-input v-model="form.gwbs"/>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input type="number" v-model="form.nl"/>
        </el-form-item>
        <el-form-item label="体重（kg）">
          <el-input type="number" v-model="form.qz"/>
        </el-form-item>
        <el-form-item label="疫苗情况">
          <el-select v-model="form.ymqk" placeholder=" ">
            <el-option label="未免疫" value="未免疫" />
            <el-option label="未完全免疫" value="未完全免疫" />
            <el-option label="已完全免疫" value="已完全免疫" />
          </el-select>
        </el-form-item>
        <el-form-item label="绝育情况">
          <el-select v-model="form.jy" placeholder=" ">
            <el-option label="是" value="是" />
            <el-option label="否" value="否" />
          </el-select>
        </el-form-item>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确认</el-button>
      </span>
      </template>
    </el-dialog>


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
  name: "Cwda",
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

    dialogClose(){
      this.form={}
      this.centerDialogVisible=false
    },

    handleEdit(index,row) {
      this.optionName = '修改'
      this.centerDialogVisible = true
      this.form=JSON.parse(JSON.stringify(row))
    },
    handleDelete(index, row) {
      this.$http.delete("/petFile/delete/" + row.id)
          .then(() => {
            this.initTableData()
          })
    },

    currentChange(number) {
      this.page.pageNum = number
      this.$http.post("/petFile/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    initTableData() {
      this.$http.post("/petFile/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    saveOrUpdate() {
      this.$http.post("/petFile/add", this.form)
          .then(() => {
            this.initTableData()
            this.dialogClose()
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
