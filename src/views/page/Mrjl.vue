<template>
  <div>
    <el-space style="width: 100%" fill>
      <el-row>
        <el-row>
          <el-button type="primary" @click="centerDialogVisible = true">新增</el-button>
        </el-row>

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
                placeholder=""
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
          <el-table-column prop="wsl" label="喂食量"/>
          <el-table-column prop="ysl" label="饮水量"/>
          <el-table-column prop="sy" label="刷牙"/>
          <el-table-column prop="pb" label="排便"/>
          <el-table-column prop="tz" label="体重"/>
          <el-table-column prop="hdl" label="活动量"/>
          <el-table-column prop="qc" label="驱虫"/>
          <el-table-column prop="dataStr" label="创建时间"/>
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
      <el-form v-model="form" :rules="rules" label-width="130px">
        <el-form-item label="宠物名称">
          <el-select v-model="form.petId" placeholder=" ">
            <el-option v-for="item in allPet" :label="item.xm" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="喂食量">
          <el-input v-model="form.wsl"/>
        </el-form-item>
        <el-form-item label="饮水量">
          <el-input v-model="form.ysl"/>
        </el-form-item>

        <el-form-item label="体重">
          <el-input v-model="form.tz"/>
        </el-form-item>

        <el-form-item label="刷牙">
          <el-select v-model="form.sy" placeholder=" ">
            <el-option label="是" value="是"/>
            <el-option label="否" value="否"/>
          </el-select>
        </el-form-item>

        <el-form-item label="排便">
          <el-select v-model="form.pb" placeholder="是否正常">
            <el-option label="是" value="是"/>
            <el-option label="否" value="否"/>
          </el-select>
        </el-form-item>

        <el-form-item label="活动量">
          <el-select v-model="form.hdl" placeholder=" ">
            <el-option label="大" value="大"/>
            <el-option label="中" value="中"/>
            <el-option label="小" value="小"/>
          </el-select>
        </el-form-item>

        <el-form-item label="驱虫">
          <el-select v-model="form.qc" placeholder=" ">
            <el-option label="是" value="是"/>
            <el-option label="否" value="否"/>
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

import {dateFormat} from "@/utils/DateUtils";


export default {
  data() {
    return {
      allPet: [],
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


    searchQuery() {
      if (this.page.data != null) {
        this.page.dataStr = dateFormat('YYYY-mm-dd', this.page.data)
      }

      this.$http.post("/dailyRecord/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    dialogClose() {
      this.form = {}
      this.centerDialogVisible = false
    },

    handleEdit(index, row) {
      this.optionName = '修改'
      this.centerDialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(index, row) {
      this.$http.delete("/dailyRecord/delete/" + row.id)
          .then(() => {
            this.initTableData()
          })
    },

    currentChange(number) {
      this.page.pageNum = number
      this.$http.post("/dailyRecord/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    initTableData() {
      this.$http.post("/dailyRecord/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    initAllPet() {
      this.$http.get("/dailyRecord/allPet")
          .then(resp => {
            this.allPet = resp.data.data
          })
    },

    saveOrUpdate() {
      this.$http.post("/dailyRecord/add", this.form)
          .then(() => {
            this.initTableData()
            this.dialogClose()
          })
    }
  },
  mounted() {
    this.initTableData()
    this.initAllPet()
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
