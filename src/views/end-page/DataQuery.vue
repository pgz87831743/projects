<template>
  <div>
    <el-card>
      <template #header>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="所属单位">
              <el-input v-model="page.q1" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="被侵害人姓名">
              <el-input v-model="page.q2" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="创建时间">
              <el-date-picker v-model="page.q3" style="width: 100%" type="date" placeholder="请选择"
                              value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form>
              <el-form-item label="身份证号">
                <el-input v-model="page.q4" placeholder="请输入"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button @click="search" type="primary">查询</el-button>
            <el-button @click="cleanQuery">清除</el-button>
          </el-col>
        </el-row>
      </template>
      <el-table :data="tableData" style="width: 100%"
                :height="670"
                :header-cell-style="{color:'#333333',fontSize:'14px',borderTop:'1px solid #EBEEF0'}"
                :cell-style="{paddingTop:'15px',paddingBottom:'15px'}"
      >
        <el-table-column prop="bgr" label="报告人"/>
        <el-table-column prop="bgrTel" label="联系电话"/>
        <el-table-column prop="ssdw" label="所属单位"/>
        <el-table-column prop="ssks" label="所诉科室"/>
        <el-table-column prop="bqhr" label="被侵害人姓名"/>
        <el-table-column prop="sfzh" label="身份证号" width="180"/>
        <el-table-column prop="jtzz" label="家庭住址"/>
        <el-table-column prop="bqhrLxfs" label="联系方式"/>
        <el-table-column prop="fdlr" label="法定代理人"/>
        <el-table-column prop="fdlrLxfs" label="联系方式"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-link  :type="'primary'" :underline="false" @click="clickButton('detail', scope.row)">查看</el-link>
            <el-link  :type="'warning'" :underline="false" @click="clickButton('update', scope.row)">修改</el-link>
            <el-link  :type="'danger'" :underline="false" @click="clickButton('delete', scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="affix-container">
        <el-row>
          <el-col :span="5" :offset="17">
            <el-pagination
                small
                background
                layout="total,prev, pager, next"
                :total="total"
                :page-size="this.page.pageSize"
                @current-change="currentChange"
                class="mt-4"
            />
          </el-col>
        </el-row>
      </div>
    </el-card>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :size="'large'" :disabled="dialog.formDisabled">

        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="报告人">
              <el-input v-model="form.bgr" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系电话">
              <el-input v-model="form.bgrTel" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="所属单位">
              <el-input v-model="form.ssdw" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="所诉科室">
              <el-input v-model="form.ssks" placeholder="请输入"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="疑似未成年被侵害人">
              <el-input v-model="form.bqhr" placeholder="请输入"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="身份证号">
              <el-input v-model="form.sfzh" placeholder="请输入"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="家庭住址">
              <el-input v-model="form.jtzz" placeholder="请输入"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式">
              <el-input v-model="form.bqhrLxfs" placeholder="请输入"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="法定代理人">
              <el-input v-model="form.fdlr" placeholder="请输入"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式">
              <el-input v-model="form.fdlrLxfs" placeholder="请输入"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="创建时间">
              <el-date-picker v-model="form.cjsj" style="width: 100%" type="date" placeholder="请选择"
                              value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="报告情形">
              <el-input type="textarea" v-model="form.bgqx" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="具体情况">
              <el-input type="textarea" v-model="form.jtqk"
                        placeholder="（包括但不限于诊疗过程中的病人自述、因由、医生诊断过程和结果等相关内容）"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="附件" v-if="dialog.formDisabled">
              <el-link :href="'/api/file/download/'+form.file" type="primary"> 下载附件</el-link>
            </el-form-item>

            <el-form-item label="附件" v-if="!dialog.formDisabled">
              <div style="width: 100%;height: 40px;background-color: #fafafa;padding: 15px">
                <el-upload
                    class="avatar-uploader"
                    action="/api/file/upload"
                    :data="{fileTypeEnum:'FILE'}"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    name="files"
                >
                  <el-button v-if="!form.file">点击上传</el-button>
                  <el-tag
                      v-if="form.file"
                      closable
                      @close="this.form.file=undefined"
                  >
                    {{fileInfo.name}}
                  </el-tag>
                </el-upload>


              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.bz" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
<span class="dialog-footer" v-if="!dialog.formDisabled">
<el-button @click="dialog.dialogFormVisible = false">取消</el-button>
<el-button type="success" @click="formSubmit">确认</el-button>
</span>
      </template>


    </el-dialog>


  </div>
</template>

<script>
import {recordApi} from "@/api/api";
import {ElMessageBox} from "element-plus";


export default {
  name: "Record",
  data() {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
      },
      tableData: [],
      dialog: {
        dialogFormVisible: false,
        optionName: '新增',
        formDisabled: true,
        optionValue: null
      },
      form: {},
      fileInfo:{},
      total: 0,
    }
  },

  methods: {

    cleanQuery() {
      this.page = {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
      }
      this.search()
    },

    search() {
      recordApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    handleAvatarSuccess(response) {
      this.form.file = response[0].id
      this.fileInfo = response[0]
    },

    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        recordApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        recordApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        ElMessageBox.confirm(
            '确定删除这条信息？',
            '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }
        ).then(() => {
          recordApi.deleteById(row.id).then(() => {
            this.initTableData()
          })
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      recordApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        recordApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        recordApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      recordApi.page(this.page)
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

<style scoped lang="scss">
::v-deep(.el-card__header) {
  padding-bottom: 10px;
}

.affix-container {
  height: 40px;
  margin-top: 30px;
}

.el-card {
  height: 90vh;
  overflow: auto;
}

.el-link {
  margin-right: 8px;
}


::v-deep(.el-form-item__label) {
  color: #333333;
  font-size: 14px;
}
</style>