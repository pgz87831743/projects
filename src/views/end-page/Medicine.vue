<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="clickButton('add')">新增</el-button>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input v-model="page.search" placeholder="请输入中药名称" clearable @clear="initTableData"/>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="success" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" border height="600" style="width: 100%"
                :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                :cell-style="{textAlign:'center'}">
        <el-table-column prop="name" label="中药名称"/>
        <el-table-column prop="effect" :show-overflow-tooltip="true" label="中药功效"/>
        <el-table-column prop="ug" :show-overflow-tooltip="true" label="中药用法"/>
        <el-table-column prop="img" label="中药图片">
          <template #default="scope">
            <el-image
                style="width: 100px"
                :src="scope.row.img"
                :zoom-rate="1.2"
                :preview-src-list="[scope.row.img]"
                :initial-index="4"
                :preview-teleported="true"
                fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="createBy" label="创建人"/>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button size="small" type="success" @click="clickButton('update', scope.row)">修改</el-button>
            <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">详情</el-button>
            <el-button
                size="small"
                type="danger"
                @click="clickButton('delete',scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="中药名称">
          <el-input v-model="form.name" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="中药功效">
          <el-input  type="textarea"  v-model="form.effect" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="中药用法">
          <el-input  type="textarea"  v-model="form.ug" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="中药图片">
          <el-upload
              class="avatar-uploader"
              action="/api/file/upload"
              :data="{fileTypeEnum:'FILE'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name="files"
          >
            <img  v-if="form.img" :src="form.img"  width="200" />
            <el-icon v-else style="font-size: 100px"><Plus /></el-icon>
          </el-upload>

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

import {medicineApi} from "@/api/api";
import {Plus} from "@element-plus/icons-vue";


export default {
  name: "Medicine",
  components: {Plus},
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
      medicineApi.page(this.page)
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
        medicineApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        medicineApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        medicineApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      medicineApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        medicineApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        medicineApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      medicineApi.page(this.page)
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

