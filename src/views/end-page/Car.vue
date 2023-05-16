<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button v-if="authShow(['ADMIN'])" type="primary" @click="clickButton('add')">新增</el-button>
      </el-col>
            <el-col :span="5" :offset="1">
              <el-input v-model="page.search" placeholder="请输入车牌号" clearable @clear="this.initTableData"/>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="success" @click="search">搜索</el-button>
            </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" border height="600" style="width: 100%"
                  :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                  :cell-style="{textAlign:'center'}">
          <el-table-column prop="name" label="车辆名称"/>
          <el-table-column prop="plateNumber" label="车牌号"/>
          <el-table-column prop="img" label="车辆图片">
            <template #default="scope">
              <el-image :preview-teleported="true" :preview-src-list="[scope.row.img]" :src="scope.row.img"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="color" label="车辆颜色"/>
          <el-table-column prop="weight" label="重量"/>
          <el-table-column prop="model" label="车型"/>
          <el-table-column prop="insureInfo.name" label="保险公司"/>
          <el-table-column prop="insureTypeInfo.name" label="险种"/>
          <el-table-column prop="status" label="车辆状态"/>
          <el-table-column prop="createTime" label="创建时间"/>
          <el-table-column prop="createBy" label="创建人"/>
          <el-table-column label="操作" width="300px">
            <template #default="scope">
              <el-button v-if="authShow(['ADMIN'])" size="small" type="success" @click="clickButton('update', scope.row)">修改</el-button>
              <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">详情</el-button>
              <el-button
                  v-if="authShow(['ADMIN'])"
                  size="small"
                  type="danger"
                  @click="clickButton('delete',scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="车辆名称">
          <el-input v-model="form.name" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="form.plateNumber" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="车辆图片">
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
        <el-form-item label="车辆颜色">
          <el-input v-model="form.color" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="重量">
          <el-input v-model="form.weight" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="车型">
          <el-input v-model="form.model" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="保险公司">
          <el-select v-model="form.insureId" @change="onInsureChange">
            <el-option v-for="item in insureList" v-bind:key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="险种">
          <el-select v-model="form.insureTypeId" >
            <el-option v-for="item in insureTypeList" v-bind:key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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

import {carApi, insureApi, insureTypeApi} from "@/api/api";
import {Plus} from "@element-plus/icons-vue";
import {authShow} from "@/utils/authutil";


export default {
  name: "Car",
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
      insureList: [],
      insureTypeList: [],
      form: {},
      total: 0,
    }
  },

  methods: {
    authShow,

    search() {
      carApi.page(this.page)
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
        carApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        carApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        carApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      carApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        carApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        carApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      carApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    initInsureListData() {
      insureApi.listAll()
          .then(resp => {
            this.form.insureTypeId=''
            this.insureList = resp.data.data
            this.onInsureChange(this.insureList[0].id)
          })
    },

    onInsureChange(e) {
      insureTypeApi.listAllByInsureId(e)
          .then((resp) => {
            this.insureTypeList = resp.data.data
          })
    }

  },
  mounted() {
    this.initTableData()
    this.initInsureListData()
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
