<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="clickButton('add')">新增车位</el-button>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input v-model="page.search" placeholder="请输入车位编号" clearable @clear="this.initTableData"/>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input v-model="page.type" placeholder="请输入车位类型" clearable @clear="this.initTableData"/>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="success" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" border height="600" style="width: 100%"
                  :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                  :cell-style="{textAlign:'center',padding:'30px'}">
          <el-table-column prop="id" label="主键"/>
          <el-table-column prop="cno" label="车位编号"/>
          <el-table-column prop="img" label="车位照片">
            <template #default="scope">
              <el-image :preview-teleported="true" :preview-src-list="[scope.row.img]" :src="scope.row.img"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="车位类型"/>
          <el-table-column prop="stats" label="车位状态"/>
          <el-table-column prop="hireTime" label="出租时间"/>
          <el-table-column prop="duration" label="出租时长"/>
          <el-table-column prop="createTime" label="创建时间"/>
          <el-table-column label="操作" width="330px">
            <template #default="scope">
              <el-button size="small" type="success" @click="clickButton('update', scope.row)">修改车位</el-button>
              <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">详情</el-button>
              <el-button
                  size="small"
                  type="danger"
                  @click="clickButton('delete',scope.row)">删除车位
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="车位编号">
          <el-input v-model="form.cno" placeholder="请输入"/>
        </el-form-item>

        <el-form-item label="车位照片">
          <el-upload
              class="avatar-uploader"
              action="/api/file/upload"
              :data="{fileTypeEnum:'FILE'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name="files"
          >
            <img v-if="form.img" :src="form.img" width="300"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="车位类型">
          <el-input v-model="form.type" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="车位状态">
          <el-input v-model="form.stats" placeholder="请输入"/>
        </el-form-item>

        <el-form-item label="出租时间">
          <el-date-picker
              v-model="form.hireTime"
              type="datetime"
              placeholder="请选择"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="出租时长">
          <el-input v-model="form.duration" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.createTime" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <template #footer>
<span class="dialog-footer" v-if="!dialog.formDisabled">
<el-button @click="dialog.dialogFormVisible = false">取消</el-button>
<el-button type="success" @click="formSubmit">确认</el-button>
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

import {parkingPlaceApi} from "@/api/api";
import {Plus} from "@element-plus/icons-vue";


export default {
  name: "ParkingPlace",
  components: {Plus},
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
        formDisabled: true,
        optionValue: null
      },
      form: {},
      total: 0,
    }
  },

  methods: {

    search() {
      parkingPlaceApi.page(this.page)
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
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        parkingPlaceApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        parkingPlaceApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        parkingPlaceApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      parkingPlaceApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        parkingPlaceApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        parkingPlaceApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      parkingPlaceApi.page(this.page)
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

