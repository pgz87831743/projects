<template>
  <div>
    <el-space style="width: 100%" fill>
      <el-row>
        <el-button type="primary" @click="centerDialogVisible = true">新增</el-button>
      </el-row>
      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="名称"/>
          <el-table-column prop="age" label="年龄"/>
          <el-table-column prop="weight" label="体重"/>
          <el-table-column prop="ws" label="喂食"/>
          <el-table-column prop="pb" label="排便"/>
          <el-table-column prop="sex" label="性别"/>
          <el-table-column prop="jyqk" label="绝育情况"/>
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
  </div>


  <el-dialog
      v-model="centerDialogVisible"
      width="30%"
      @opened="opened"
  >
    <template #header>
      <div class="my-header">
        {{ optionName }}
      </div>
    </template>
    <el-form :model="form">
      <el-form-item label="名称" :label-width="labelWidth">
        <el-input :model="name"/>
      </el-form-item>
      <el-form-item label="年龄" :label-width="labelWidth">
        <el-input :model="form.age"/>
      </el-form-item>
      <el-form-item label="体重" :label-width="labelWidth">
        <el-input :model="form.name"/>
      </el-form-item>
      <el-form-item label="喂食" :label-width="labelWidth">
        <el-input :model="form.ws"/>
      </el-form-item>
      <el-form-item label="排便" :label-width="labelWidth">
        <el-input :model="form.pb"/>
      </el-form-item>
      <el-form-item label="性别" :label-width="labelWidth">
        <el-input :model="form.sex"/>
      </el-form-item>
      <el-form-item label="绝育情况" :label-width="labelWidth">
        <el-input :model="form.jyqk"/>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
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


</template>


<script>
export default {
  name: "Jkjl",
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

    opened() {
      console.log(123123)
      this.$nextTick(()=>{
        this.$http.get("/petFile/getById/" + this.form.id)
            .then(resp => {
              this.form = resp.data
            })
      })
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

    save() {
      this.centerDialogVisible = false
    },
    update() {

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
