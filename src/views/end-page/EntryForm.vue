<template>
  <div class="p-div">
    <el-row >
      <el-form label-position="left" :inline="true">
        <el-form-item label="分类号:" :label-width="80">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="档号:" :label-width="80">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="排架号:" :label-width="80">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="保管期限:" :label-width="80">
          <el-date-picker
              v-model="value1"
              type="date"
              placeholder="请选择"
          />
        </el-form-item>
      </el-form>
    </el-row>
    <el-row >
      <el-form label-position="left" :inline="true">
        <el-form-item label="开工日期:" :label-width="80">
          <el-date-picker
              v-model="value1"
              type="date"
              placeholder="请选择"

          />
        </el-form-item>
        <el-form-item label="竣工日期:" :label-width="80">
          <el-date-picker
              v-model="value1"
              type="date"
              placeholder="请选择"

          />
        </el-form-item>
      </el-form>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="用户名"/>
        <el-table-column prop="password" label="密码"/>
        <el-table-column prop="nickname" label="昵称"/>
        <el-table-column prop="avatar" label="头像">
          <template #default="scope">
            <img :src="scope.row.avatar" width="100">
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别"/>
        <el-table-column prop="phone" label="联系电话"/>
        <el-table-column prop="address" label="联系地址"/>
        <el-table-column prop="role" label="角色"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="createBy" label="创建人"/>
      </el-table>
    </el-row>


    <el-affix position="bottom" :offset="20">
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
    </el-affix>

    <!-- 分页 -->



  </div>


</template>


<script>

import { sysUserApi} from "@/api/api";


export default {
  name: "EntryForm.vue",
  data() {
    return {
      page: {
        pageSize: 5,
        pageNum: 1,
        tootle: 100,
        search: '',
      },
      tableData: [
          // {'id':'1','name':1},
          // {'id':'2','name':1},
          // {'id':'3','name':1},
          // {'id':'4','name':1},
          // {'id':'5','name':1},
          // {'id':'6','name':1},
          // {'id':'7','name':1},
          // {'id':'8','name':1},
          // {'id':'9','name':1},
          // {'id':'0','name':1},
          // {'id':'11','name':1},
          // {'id':'12','name':1},
          // {'id':'13','name':1},
          // {'id':'14','name':1},
          // {'id':'15','name':1},
          // {'id':'16','name':1},
      ],
      total: 0,
    }
  },
  methods: {

    search() {
      sysUserApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },



    currentChange(number) {
      this.page.pageNum = number
      sysUserApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    initTableData() {
      sysUserApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

  },
  // mounted() {
  //   this.initTableData()
  // },

}
</script>


<style lang="scss" scoped>



.el-row {
  margin-top: 30px;
}



.paginationClass {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  text-align: center;
}



::v-deep(.el-date-editor){
  width: 192px !important;
}

</style>
