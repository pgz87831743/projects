<template>
  <div>
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="clickButton('add')">新增</el-button>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input v-model="page.search" placeholder="请输入搜索内容" clearable/>
      </el-col>
      <el-col :span="1">
        <el-button type="success" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="address" label="打卡地点"/>
        <el-table-column prop="content" label="打卡描述"/>
        <el-table-column prop="createByUser.username" label="打卡人物"/>
        <el-table-column prop="createTime" label="打卡时间"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="clickButton('update', scope.row)">修改</el-button>
            <el-button size="small" @click="clickButton('detail', scope.row)">详情</el-button>
            <el-button
                size="small"
                type="danger"
                @click="clickButton('delete',scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>

  <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
    <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
      <el-form-item label="打卡地点"><el-input v-model="form.address"/></el-form-item>
      <el-form-item label="打卡描述"><el-input v-model="form.content"/></el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer" v-if="!dialog.formDisabled">
        <el-button @click="dialog.dialogFormVisible = false">取消</el-button>
        <el-button type="primary" v-if="this.isAdd" @click="formSubmit">确认</el-button>
        <el-button type="primary" v-if="!this.isAdd" @click="formSubmit">确认</el-button>
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
  name: "SportsClocking",
  data() {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      tableData: [],
      dialog: {
        dialogFormVisible: false,
        optionName: '新增',
        isAdd: false,
        formDisabled: true
      },
      form: {},
      total: 0,
    }
  },
  components: {},
  methods: {
    clickButton(type, row) {
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
        this.dialog.isAdd = true
      } else if (type === 'update') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '修改'
        this.dialog.formDisabled = false
        this.dialog.isAdd = false
        this.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'detail') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '详情'
        this.dialog.formDisabled = true
        this.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'delete') {
        this.$http.delete(`/yw/sports-clocking/deleteById/${row.id}`)
            .then(() => {
              this.initTableData()
            })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      this.$http.post("/yw/sports-clocking/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    search(){
      this.$http.post("/yw/sports-clocking/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.isAdd) {
        console.log(123123)
        this.$http.post('/yw/sports-clocking/add', this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (!this.dialog.isAdd) {
        this.$http.post('/yw/sports-clocking/update', this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },

    dialogClose() {
      this.form = {}
    },

    initTableData() {
      this.$http.post('/yw/sports-clocking/page', this.page)
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
.el-row:nth-child(1) {
  margin-top: 0;
}

.el-row {
  margin-top: 30px;
}


.paginationClass {
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
  text-align: center;
}

</style>
