<template>
  <div class="p-div">
    <el-row>
      <el-col :span="7">
        <el-radio-group v-model="page.search" @change="search">
          <el-radio label="">ALL</el-radio>
          <el-radio label="UPCOMING">UPCOMING</el-radio>
          <el-radio label="ONGOING">ONGOING</el-radio>
          <el-radio label="OVER">OVER</el-radio>
        </el-radio-group>
      </el-col>

    </el-row>
    <el-row>
      <el-table :data="tableData" border height="600" style="width: 100%"
                :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                :cell-style="{textAlign:'center',padding:'30px'}"
      >
        <el-table-column prop="status" label="Status">
          <template #default="scope">
            <span v-if="scope.row.status==='OVER'" style="color:#f85d5d;">{{ scope.row.status }}</span>
            <span v-if="scope.row.status==='UPCOMING'" style="color:#5df888;">{{ scope.row.status }}</span>
            <span v-if="scope.row.status==='ONGOING'" style="color:#a44eae;">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="activity.name" label="Activity"/>
        <el-table-column prop="createBy" label="Time">
          <template #default="scope">
            {{ scope.row.timetable.rangStart }}-{{ scope.row.timetable.rangEnd }}&nbsp;&nbsp;{{ scope.row.timetable.tableTime }}
          </template>
        </el-table-column>
        <el-table-column label="Option" width="300px">
          <template #default="scope">
            <el-button
                size="small"
                type="danger"
                @click="clickButton('delete',scope.row)">Cancel</el-button>

            <el-button
                size="small"
                type="primary"
                @click="payHandle(scope.row)">Pay</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>


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

import {appointmentApi} from "@/api/api";
import router from "@/router";


export default {
  name: "Appointment",
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
      form: {},
      total: 0,
    }
  },

  methods: {


    payHandle(row){
      router.push({path: '/PayChose',query:{id:row.id}})
    },

    search() {
      appointmentApi.page(this.page)
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
        this.dialog.optionName = 'Add'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        appointmentApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = 'Update'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        appointmentApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = 'Info'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        appointmentApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      appointmentApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        appointmentApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        appointmentApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      appointmentApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

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

