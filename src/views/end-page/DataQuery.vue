<template>
  <div>
    <el-card>
      <template #header>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="报告人">
              <el-input v-model="page.q1" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="所诉科室">
              <el-input v-model="page.q2" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="年龄">
                <el-row :justify="'space-around'">
                  <el-col :span="11"><el-input v-model="page.q3s" placeholder="最小年龄"></el-input></el-col>
                  <el-col :span="2"><div style="text-align: center;width: 100%">-</div></el-col>
                  <el-col :span="11"><el-input v-model="page.q3e" placeholder="最大年龄"></el-input></el-col>
                </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form>
              <el-form-item label="诊断">
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
     <el-row>
       <el-col :span="20">
         <el-table :data="tableData" style="width: 100%"
                   :height="670"
                   border
                   :header-cell-style="{color:'#333333',fontSize:'14px',borderTop:'1px solid #EBEEF0'}"
                   :cell-style="{paddingTop:'15px',paddingBottom:'15px'}"
         >
           <el-table-column v-if="show[0].show" prop="bgr" label="报告人"/>
           <el-table-column v-if="show[1].show" prop="bgrTel" label="联系电话" width="120"/>
           <el-table-column v-if="show[2].show" prop="ssdw" label="所属单位" width="120"/>
           <el-table-column v-if="show[3].show" prop="ssks" label="所诉科室"  width="120"/>
           <el-table-column v-if="show[4].show" prop="bqhr" label="被侵害人姓名" width="120"/>
           <el-table-column v-if="show[5].show" prop="age" label="年龄" width="120"/>
           <el-table-column v-if="show[6].show" prop="sex" label="性别" width="120"/>
           <el-table-column v-if="show[7].show" prop="zd" label="诊断" width="120"/>
           <el-table-column v-if="show[8].show" prop="jzsj" label="就诊时间" width="180"/>
           <el-table-column v-if="show[9].show" prop="sfzh" label="身份证号" width="180"/>
           <el-table-column v-if="show[10].show" prop="jtzz" label="家庭住址" width="120"/>
           <el-table-column v-if="show[11].show" prop="bqhrLxfs" label="联系方式" width="120"/>
           <el-table-column v-if="show[12].show" prop="fdlr" label="法定代理人" width="120"/>
           <el-table-column v-if="show[13].show" prop="fdlrLxfs" label="联系方式" width="120"/>
           <el-table-column  label="操作" width="150" fixed="right">
             <template #default="scope">
               <el-link  :type="'primary'" :underline="false" @click="clickButton('detail', scope.row)">查看</el-link>
               <el-link  :type="'warning'" :underline="false" @click="clickButton('update', scope.row)">修改</el-link>
               <el-link  :type="'danger'" :underline="false" @click="clickButton('delete', scope.row)">删除</el-link>
             </template>
           </el-table-column>
         </el-table>
       </el-col>
       <el-col :span="4">
         <el-tree :data="show" show-checkbox
                  node-key="id"
                  :default-checked-keys="[1,2,3,4,5,6,7,8,9,10,11,12,13,14]"
                  @check-change="saveColumn"/>
       </el-col>
     </el-row>
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


    <el-dialog width="60%"  id="dv"  v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :size="'large'" :disabled="dialog.formDisabled">

        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="报告人">
              <el-input v-model="form.bgr" :placeholder="form.bgr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系电话">
              <el-input  v-model="form.bgrTel" :placeholder="form.bgrTel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="所属单位">
              <el-input v-model="form.ssdw" :placeholder="form.ssdw"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="所诉科室">
              <el-input v-model="form.ssks"  :placeholder="form.ssks" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="疑似未成年被侵害人">
              <el-input v-model="form.bqhr"  :placeholder="form.bqhr" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="身份证号">
              <el-input v-model="form.sfzh"   :placeholder="form.sfzh"  />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="家庭住址">
              <el-input v-model="form.jtzz"  :placeholder="form.jtzz"  />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式">
              <el-input v-model="form.bqhrLxfs"  :placeholder="form.bqhrLxfs"   />
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="20" id="dyys1">
          <el-col :span="11">
            <el-form-item label="年龄">
              <el-input type="number" v-model="form.age" :placeholder="form.age"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="性别">
              <el-input v-model="form.sex"   :placeholder="form.sex" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" id="dyys2">
          <el-col :span="11">
            <el-form-item label="就诊时间">
              <el-date-picker
                  v-model="form.jzsj"
                  :placeholder="form.jzsj"
                  type="datetime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="诊断">
              <el-input v-model="form.zd" :placeholder="form.zd"/>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="法定代理人">
              <el-input v-model="form.fdlr" :placeholder="form.fdlr"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式">
              <el-input v-model="form.fdlrLxfs" :placeholder="form.fdlrLxfs"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="创建时间">
              <el-date-picker v-model="form.cjsj" style="width: 100%" type="date" :placeholder="form.cjsj"
                              value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="报告情形">
              <el-input type="textarea" :autosize="{minRows:5}" v-model="form.bgqx" :placeholder="form.bgqx"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="具体情况">
              <el-input type="textarea" v-model="form.jtqk"
                        :autosize="{minRows:5}"
                        :placeholder="form.jtqk"></el-input>
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
              <el-input type="textarea" v-model="form.bz"  :autosize="{minRows:5}"   :placeholder="form.bz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>



        <span class="dialog-footer" v-if="dialog.formDisabled">
    <el-button @click="printlnDiv" id="dyys3">打印</el-button>
</span>


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
      pt:true,
      show: [
        {
          id: 1,
          label: '报告人',
          show:true
        },
        {
          id: 2,
          label: '联系电话',
          show:true
        },
        {
          id: 3,
          label: '所属单位',
          show:true
        },
        {
          id: 4,
          label: '所诉科室',
          show:true
        },
        {
          id: 5,
          label: '被侵害人姓名',
          show:true
        },
        {
          id: 6,
          label: '年龄',
          show:true
        },
        {
          id: 7,
          label: '性别',
          show:true
        },
        {
          id: 8,
          label: '诊断',
          show:true
        },
        {
          id: 9,
          label: '就诊时间',
          show:true
        },
        {
          id: 10,
          label: '身份证号',
          show:true
        },
        {
          id: 11,
          label: '家庭住址',
          show:true
        },
        {
          id: 12,
          label: '联系方式',
          show:true
        },
        {
          id: 13,
          label: '法定代理人',
          show:true
        },
        {
          id: 14,
          label: '联系方式',
          show:true
        }
      ],
      visible:true,
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


    saveColumn(a,b,c){{
      console.log(a)
      console.log(b)
      console.log(c)
      a.show=!a.show
    }},

    printlnDiv(){

      // console.log()


      document.getElementById("dyys1").remove();
      document.getElementById("dyys2").remove();
      document.getElementById("dyys3").remove();
      document.getElementsByClassName("el-dialog__headerbtn")[0].remove();



      var head_str = "<html><head><title></title></head><body>"; //先生成头部
      var foot_str = "</body></html>"; //生成尾部
      // var new_str =  this.$refs.printDiv.innerHTML; //获取指定打印区域
      var new_str =  document.getElementById("dv").innerHTML; //获取指定打印区域
      console.log(new_str)
      // var new_str = document.getElementById('dv')[0].innerHTML; //获取指定打印区域
      // var old_str = document.body.innerHTML; //获得原本页面的代码
      document.body.innerHTML = head_str + new_str + foot_str; //构建新网页
      window.print(); //打印刚才新建的网页
       window.location.href='/DataQuery'
    },

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
          this.fileInfo=resp.data.data.sysFile
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
        this.form.sysFile=null
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