<template>
  <div>
    <el-space style="width: 100%" fill>
      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="username" label="用户名"/>
          <el-table-column prop="password" label="密码"/>
          <el-table-column prop="role" label="角色"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>

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
      <el-form v-model="form" :label-width="labelWidth">
        <el-form-item label="用户名">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"/>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="form.role"/>
        </el-form-item>
      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确认</el-button>
      </span>
      </template>
    </el-dialog>



  </div>




</template>


<script>
export default {
  data() {
    return {
      form: {},
      labelWidth: 100,
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

    initTableData() {
      this.$http.post("/user/getCurrenUser")
          .then(resp => {
            this.tableData = [resp.data.data]
          })
    },
    saveOrUpdate() {
      this.$http.post("/user/updateUser", this.form)
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
