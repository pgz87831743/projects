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
      <el-table :data="tableData" border height="600" style="width: 100%"
                :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                :cell-style="{textAlign:'center'}">
        <el-table-column prop="title" label="标题"/>
        <el-table-column prop="price" label="价格(元每月)"/>
        <el-table-column prop="unitType" label="户型"/>
        <el-table-column prop="area" label="面积（平米）"/>
        <el-table-column prop="floorHeight" label="楼层高度"/>
        <el-table-column prop="direction" label="朝向"/>
        <el-table-column prop="communityName" label="小区名称"/>
        <el-table-column prop="address" label="地址"/>
        <el-table-column prop="times" label="浏览次数"/>
        <el-table-column prop="elevator" label="是否有电梯"/>
        <el-table-column prop="characteristics" :show-overflow-tooltip="true" label="房源特色"/>
        <el-table-column prop="img" label="房源照片">
          <template #default="scope">
            <el-image :preview-teleported="true" :preview-src-list="[scope.row.img]" :src="scope.row.img"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="发布人"/>
        <el-table-column prop="createTime" label="发布时间"/>
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

        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="价格(元每月)">
          <el-input v-model="form.price" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="户型">
          <el-input v-model="form.unitType" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="面积（平米）">
          <el-input v-model="form.area" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="楼层高度">
          <el-input v-model="form.floorHeight" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="朝向">
          <el-input v-model="form.direction" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="小区名称">
          <el-input v-model="form.communityName" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="是否有电梯">
          <el-input v-model="form.elevator" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="房源特色">
          <el-input v-model="form.characteristics" placeholder="请输入"/>
        </el-form-item>

        <el-form-item label="房源照片">
          <el-upload
              class="avatar-uploader"
              action="/api/file/upload"
              :data="{fileTypeEnum:'FILE'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name="files"
          >
            <img v-if="form.img" :src="form.img"  width="300" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
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

import {hoursApi} from "@/api/api";
import {Plus} from "@element-plus/icons-vue";


export default {
  name: "Hours",
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
      hoursApi.page(this.page)
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
        hoursApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        hoursApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        hoursApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      hoursApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        hoursApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        hoursApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      hoursApi.page(this.page)
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

