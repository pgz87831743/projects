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
        <el-button type="success">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号"/>
        <el-table-column prop="f1" label="部门"/>
        <el-table-column prop="f2" label="培训对象"/>
        <el-table-column prop="f3" label="培训标题"/>
        <el-table-column prop="f4" label="培训类型"/>
        <el-table-column prop="f5" label="培训费用(元)"/>
        <el-table-column prop="f6" label="培训日期"/>
        <el-table-column prop="f7" label="培训课时(h)"/>
        <el-table-column prop="f8" label="培训讲师"/>
        <el-table-column prop="f9" label="培训机构"/>
        <el-table-column prop="f10" label="培训原因"/>
        <el-table-column prop="f11" label="佐证资料"/>
        <el-table-column prop="f12" label="上传附件">
          <template #default="scope">
            <el-link type="primary" target="_blank" v-bind:key="item.id" :href="item.url"
                     v-for="item in scope.row.f12">{{ item.name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="f13" label="其它说明"/>
        <el-table-column fixed="right" label="操作" width="200px">
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
    <el-form :model="form" label-position="right" label-width="100px" :disabled="dialog.formDisabled">
      <el-row>
        <el-col :span="8">
          <el-form-item label="培训对象">
            <el-input v-model="form.f2"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="form.f14"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培训日期">
            <el-input v-model="form.f6"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="培训标题">
            <el-input v-model="form.f3"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="培训类型">
            <el-select
                v-model="form.f4"
                placeholder=" "
            >
              <el-option label="内训" value="内训" />
              <el-option label="外训" value="外训" />
            </el-select>
          </el-form-item>


        </el-col>
        <el-col :span="8">
          <el-form-item label="培训机构">
            <el-input v-model="form.f9"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培训课时(h)">
            <el-input v-model="form.f7"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="培训讲师">
            <el-input v-model="form.f8"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门">
            <el-input v-model="form.f1"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培训费用(元)">
            <el-input v-model="form.f5"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="培训原因">
            <el-input v-model="form.f10"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="佐证资料">
            <el-input v-model="form.f11"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="上传附件">
            <el-upload
                class="upload-demo"
                drag
                v-model:file-list="fileList"
                :action="this.$http.defaults.baseURL+'file/upload'"
                multiple
                :show-file-list="true"
                name="files"
                :on-remove="handleRemove"
                :on-success="fileSuccess"
                :data="{fileTypeEnum:'FILE'}"
            >
              <div class="el-upload__text">
                <em>点击上传附件</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="其它说明">
            <el-input v-model="form.f13"/>
          </el-form-item>
        </el-col>
      </el-row>

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
  name: "ReportForms",
  data() {
    return {
      url: '/yw/report-forms/',
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
      form: {
        f12: []
      },
      total: 0,
      fileList: []
    }
  },
  components: {},
  methods: {

    fileSuccess(response) {
      this.form.f12.push(response[0])
    },
    handleRemove(uploadFile) {
      console.log(uploadFile)
      this.form.f12 = this.form.f12.filter(item => item.id !== uploadFile.id)
      console.log( this.form.f12)
    }
    , clickButton(type, row) {
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
        this.fileList=row.f12
        this.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'detail') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '详情'
        this.dialog.formDisabled = true
        this.fileList=row.f12
        this.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'delete') {
        this.$http.delete(this.url + '/deleteById/' + row.id)
            .then(() => {
              this.initTableData()
            })
      }

    },

    currentChange(number) {
      this.page.pageNum = number
      this.$http.post(this.url + "page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.isAdd) {
        this.$http.post(this.url + 'add', this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (!this.dialog.isAdd) {
        this.$http.post(this.url + 'update', this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },

    dialogClose() {
      this.form = {}
      this.fileList=[]
    },

    initTableData() {
      this.$http.post(this.url + 'page', this.page)
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
