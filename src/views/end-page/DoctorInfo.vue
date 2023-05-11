<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="clickButton('add')">新增</el-button>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input v-model="page.search" placeholder="请输入医生名" clearable @clear="this.initTableData"/>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="success" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" border height="600" style="width: 100%"
                :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                :cell-style="{textAlign:'center'}">
        <el-table-column prop="img" label="照片">
          <template #default="scope">
            <img :src="scope.row.img" width="100">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="jobTwo" label="职位"/>
        <el-table-column prop="phone" label="预约电话"/>
        <el-table-column prop="hospital"  :show-overflow-tooltip="true" label="出诊医院"/>
        <el-table-column prop="times"  :show-overflow-tooltip="true" label="坐诊时间"/>
        <el-table-column prop="unit" label="工作单位"/>
        <el-table-column prop="goodAt" :show-overflow-tooltip="true"  label="擅长"/>
        <el-table-column prop="jobOne" label="医生简介"/>
<!--        <el-table-column prop="expertise" :show-overflow-tooltip="true" label="专业特长"/>-->
<!--        <el-table-column prop="rewards"  :show-overflow-tooltip="true" label="获得奖励"/>-->
<!--        <el-table-column prop="achievements" :show-overflow-tooltip="true" label="学术成就"/>-->
<!--        <el-table-column prop="other" :show-overflow-tooltip="true"  label="其他方面"/>-->
        <el-table-column prop="meanIdOneInfo.text" label="一级菜单"/>
        <el-table-column prop="meanIdTwoInfo.text" label="二级菜单"/>
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
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled" size="large">

        <el-form-item label="照片">
          <el-upload
              class="avatar-uploader"
              action="/api/file/upload"
              :data="{fileTypeEnum:'FILE'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name="files"
          >
            <img v-if="this.form.img" :src="form.img" width="250"/>
            <el-icon v-else style="font-size: 100px">
              <Plus/>
            </el-icon>
          </el-upload>

        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.jobTwo" />
        </el-form-item>
        <el-form-item label="出诊医院">
          <el-input v-model="form.hospital" />
        </el-form-item>

        <el-form-item label="坐诊时间">
          <el-input v-model="form.times" />
        </el-form-item>
        <el-form-item label="工作单位">
          <el-input v-model="form.unit" />
        </el-form-item>

        <el-form-item label="预约电话">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="医生擅长">
          <el-input  type="textarea" v-model="form.goodAt" />
        </el-form-item>
        <el-form-item label="医生简介">
          <el-input type="textarea" v-model="form.jobOne" />
        </el-form-item>
<!--        <el-form-item label="专业特长">-->
<!--          <el-input type="textarea" v-model="form.expertise" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="获得奖励">-->
<!--          <el-input  type="textarea" v-model="form.rewards" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="学术成就">-->
<!--          <el-input  type="textarea" v-model="form.achievements" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="其他方面">-->
<!--          <el-input  type="textarea" v-model="form.other" />-->
<!--        </el-form-item>-->
        <el-form-item label="一级菜单">
          <el-select v-model="form.meanIdOne" @change="meanChangeHandler">
            <el-option v-for="item in meanList" v-bind:key="item.id" :label="item.text" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级菜单">
          <el-select v-model="form.meanIdTwo">
            <el-option v-for="item in meanTwo" v-bind:key="item.id" :label="item.text" :value="item.id"></el-option>
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

import {doctorInfoApi, meansApi} from "@/api/api";
import {Plus} from "@element-plus/icons-vue";


export default {
  name: "DoctorInfo",
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
      meanList: [],
      meanTwo: [],
    }
  },

  methods: {

    meanChangeHandler(e) {
      meansApi.listAllByPid(e)
          .then((resp) => {
            this.meanTwo = resp.data.data
            this.form.meanIdTwo=''
          })
    },

    meanChangeHandlerInfo(e) {
      meansApi.listAllByPid(e)
          .then((resp) => {
            this.meanTwo = resp.data.data
          })
    },


    search() {
      doctorInfoApi.page(this.page)
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
        doctorInfoApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
          this.meanChangeHandlerInfo(this.form.meanIdOne)
        })
      } else if (type === 'detail') {
        doctorInfoApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
          this.meanChangeHandlerInfo(this.form.meanIdOne)
        })
      } else if (type === 'delete') {
        doctorInfoApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      doctorInfoApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        doctorInfoApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        doctorInfoApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      doctorInfoApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    initMeanData() {
      meansApi.listAll()
          .then(resp => {
            this.meanList = resp.data.data
          })
    },


  },
  mounted() {
    this.initTableData()
    this.initMeanData()
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

