<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="clickButton('add')">新增</el-button>
      </el-col>
      <!--      <el-col :span="5" :offset="1">-->
      <!--        <el-input v-model="page.search" placeholder="请输入搜索内容" clearable @clear="initTableData" />-->
      <!--      </el-col>-->
      <!--      <el-col :span="1" :offset="1">-->
      <!--        <el-button type="success" @click="search">搜索</el-button>-->
      <!--      </el-col>-->
    </el-row>
    <el-row>
      <el-table :data="tableData" border height="600" style="width: 100%">
        <el-table-column prop="stadium.name" label="stadiumName"/>
        <el-table-column prop="activity.name" label="ActivityName"/>
        <el-table-column prop="status" label="status"/>
        <el-table-column prop="rangStart" label="rangStart"/>
        <el-table-column prop="rangEnd" label="rangEnd"/>
        <el-table-column label="Option" width="300px">
          <template #default="scope">
            <el-button size="small" type="success" @click="clickButton('update', scope.row)">Update</el-button>
            <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">Info</el-button>
            <el-button
                size="small"
                type="danger"
                @click="clickButton('delete',scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="stadiumName">
          <el-select v-model="form.stadiumId" @change="change">
            <el-option v-for="item in stadiumList" v-bind:key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="activityName">
          <el-select v-model="form.activityId">
            <el-option v-for="item in activityList" v-bind:key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="status">
          <el-radio-group v-model="form.status">
            <el-radio label="available"></el-radio>
            <el-radio label="unavailable"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="tableTime">
          <el-date-picker  v-model="form.tableTime" :value-format="'YYYY-MM-DD'"></el-date-picker>
        </el-form-item>
        <el-form-item label="rangStart">
          <el-time-picker
              v-model="form.rangStart"
              :value-format="'HH:mm'"
          />
        </el-form-item>

        <el-form-item label="rangEnd">
          <el-time-picker
              v-model="form.rangEnd"
              :value-format="'HH:mm'"
          />
        </el-form-item>

      </el-form>
      <template #footer>
<span class="dialog-footer" v-if="!dialog.formDisabled">
<el-button @click="dialog.dialogFormVisible = false">Cancel</el-button>
<el-button type="success" @click="formSubmit">Ok</el-button>
</span>
      </template>
    </el-dialog>


    <!-- 分页 -->
    <el-affix position="bottom" :offset="20">
      <div class="paginationClass">
        <el-pagination
            small
            background
            :total="total"
            :page-size="this.page.pageSize"
            @current-change="currentChange"
            layout="total,prev, pager, next, jumper"
        />
      </div>
    </el-affix>
  </div>


</template>


<script>


import {stadiumApi, timetableApi} from "@/api/api";


export default {
  name: "Timetable",
  data() {
    return {
      page: {
        pageSize: 5,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      tableData: [],
      dialog: {
        dialogFormVisible: false,
        optionName: 'Add',
        formDisabled: true,
        optionValue: null
      },
      stadiumList: [],
      activityList: [],
      form: {
        status: "available"
      },
      total: 0,
    }
  },

  methods: {

    search() {
      timetableApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    handleAvatarSuccess(response) {
      this.form.img = response[0].url
    },


    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = type
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        timetableApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = type
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        timetableApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = type
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        timetableApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      timetableApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {


        timetableApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        timetableApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
      this.form = {
        status: "available"
      }
    },

    initTableData() {
      timetableApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    initStadiumList() {
      stadiumApi.listAll()
          .then((resp) => {
            this.stadiumList = resp.data.data
          })
    },

    change(id) {
      stadiumApi.getById(id)
          .then((resp) => {
            this.activityList = resp.data.data.activityList
            this.form.activityId = null
          })
    }

  },
  mounted() {
    this.initTableData()
    this.initStadiumList()
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


