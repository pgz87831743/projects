<template>
  <div>
    <el-space style="width: 100%" fill>
      <el-row>
        <el-button type="primary" @click="centerDialogVisible = true">新增</el-button>


        <el-col :span="3" :offset="1">
          <el-input v-model="page.name" placeholder="请输入搜索内容" clearable @clear="searchQuery"/>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" @click="searchQuery">搜索</el-button>
        </el-col>
      </el-row>



      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="xm" label="宠物名称"/>
          <el-table-column prop="zl" label="宠物种类"/>
          <el-table-column prop="sex" label="性别"/>
          <el-table-column prop="sc" label="身长"/>
          <el-table-column prop="gwbs" label="过往病史"/>
          <el-table-column prop="jy" label="绝育情况（是否）"/>
          <el-table-column prop="y" />
          <el-table-column label="年龄">
            <template #default="scope">
              {{scope.row.n}}年{{scope.row.y}}月
            </template>
          </el-table-column>
          <el-table-column prop="tz" label="体重（kg）"/>
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

        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder=" ">
            <el-option label="雄性" value="雄性" />
            <el-option label="雌性" value="雌性" />
          </el-select>
        </el-form-item>


        <el-form-item label="身长">
          <el-input v-model="form.sc"/>
        </el-form-item>
        <el-form-item label="过往病史">
          <el-input v-model="form.gwbs"/>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="年">
              <el-input type="number" v-model="form.n"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月">
              <el-select v-model="form.y" placeholder=" ">
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
                <el-option label="3" value="3" />
                <el-option label="4" value="4" />
                <el-option label="5" value="5" />
                <el-option label="6" value="6" />
                <el-option label="7" value="7" />
                <el-option label="8" value="8" />
                <el-option label="9" value="9" />
                <el-option label="10" value="10" />
                <el-option label="11" value="11" />
                <el-option label="12" value="12" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="体重（kg）">
          <el-input  v-model="form.tz"/>
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
      form: {
        n:0,
        y:0
      },
      labelWidth: 100,
      s:0,
      y:0,
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

    searchQuery() {
      this.$http.post("/petFile/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

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
