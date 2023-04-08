<template>
  <div class="div">
    <el-card>
      <div class="p-div">
        <el-row>
          <el-col :span="1">
            <el-button type="primary" @click="clickButton('add')">新增</el-button>
          </el-col>
          <!--      <el-col :span="5" :offset="1">-->
          <!--        <el-input v-model="page.search" placeholder="请输入搜索内容" clearable/>-->
          <!--      </el-col>-->
          <!--      <el-col :span="1" :offset="1">-->
          <!--        <el-button type="success" @click="search">搜索</el-button>-->
          <!--      </el-col>-->
        </el-row>
        <el-row>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="temperature" label="体温"/>
            <el-table-column prop="symptom" label="症状"/>
            <el-table-column prop="drugSituation" label="用药情况"/>
            <el-table-column prop="level" label="患病的程度"/>
            <el-table-column prop="createTime" label="创建时间"/>
            <el-table-column prop="createBy" label="创建人"/>

            <el-table-column label="操作" width="300px">
              <template #default="scope">
                <el-button size="small" type="success" @click="clickButton('jl', scope.row)">交流</el-button>
                <el-button
                    v-if="scope.row.createBy===getUser().username"
                    size="small"
                    type="danger"
                    @click="clickButton('delete',scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>


        <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">

          <div v-if="this.dialog.optionValue==='jl'">
            <div style=" overflow:auto;height:480px;" id="divscope3">
              <div class="lt">
                <div>

                  <el-row v-for="item in messageData" v-bind:key="item.id">

                    <el-col :span="22" v-if="item.createBy===getUser().username">
                      <div style="background: white">
                        <div style="width: 98%">
                          <div style="float: right">{{ item.createTime }}</div>
                          <div style="float: right">{{ item.createBy }}&nbsp;&nbsp;</div>
                          <div style="clear:both"></div>
                          <span
                              style="min-width: 100px;float: right;background: #d5c3c3;padding: 10px;display:inline-block;border-radius: 10px">{{
                              item.content
                            }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div>
                        <el-avatar :size="50"
                                   src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"></el-avatar>
                      </div>
                    </el-col>
                    <el-col :span="22" v-if="item.createBy!==getUser().username">
                      <div style="background: white">
                        <div style="width: 98%">
                          <div style="float: left">{{ item.createBy }}&nbsp;&nbsp;</div>
                          <div style="float: left">{{ item.createTime }}</div>
                          <div style="clear:both"></div>
                          <span
                              style="min-width: 100px;float: left; background: #d5c3c3;padding: 10px;display:inline-block;border-radius: 10px">{{
                              item.content
                            }}</span>
                        </div>

                      </div>
                    </el-col>

                  </el-row>
                </div>
              </div>
            </div>
            <dov>
              <el-row justify="center" :gutter="20">
                <el-col :span="20">
                  <el-input v-model="form.content"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button type="success" @click="send">发送</el-button>
                </el-col>
              </el-row>
            </dov>
          </div>


          <div v-if="this.dialog.optionValue==='add'">
            <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
              <el-form-item label="体温">
                <el-input v-model="form.temperature"/>
              </el-form-item>
              <el-form-item label="症状">
                <el-input v-model="form.symptom"/>
              </el-form-item>
              <el-form-item label="用药情况">
                <el-input v-model="form.drugSituation"/>
              </el-form-item>
              <el-form-item label="患病的程度">
                <el-input v-model="form.level"/>
              </el-form-item>
            </el-form>
          </div>
          <template #footer v-if="this.dialog.optionValue==='add'">
      <span class="dialog-footer" v-if="!dialog.formDisabled">
      <el-button @click="dialog.dialogFormVisible = false">取消</el-button>
      <el-button type="success" @click="formSubmit">确认</el-button>
      </span>
          </template>
        </el-dialog>


        <!-- 分页 -->
        <div class="paginationClass">
          <el-pagination
              small
              background
              :total="total"
              :page-size="5"
              @current-change="currentChange"
              layout="prev, pager, next"
          />
        </div>
      </div>
    </el-card>
  </div>


</template>


<script>

import {exchangeApi, messageApi} from "@/api/api";
import {getUser} from "@/utils/authutil";


export default {
  name: "Exchange",
  data() {
    return {
      page: {
        pageSize: 5,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      visible: [],
      tableData: [],
      messageData: [],
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
    getUser,

    search() {
      exchangeApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    clickButton(type, row) {
      this.dialog.optionValue = type

      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
      }


      if (type === 'jl') {
        messageApi.listAll(row.id)
            .then((resp) => {
              this.messageData = resp.data.data
              this.dialog.dialogFormVisible = true
              this.dialog.optionName = row.symptom
              this.form.toUser = row.createBy
              this.form.targetId = row.id
              this.scope()
            })
      }
      if (type === 'delete') {
        exchangeApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      exchangeApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        exchangeApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        exchangeApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      exchangeApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    onmessage(data) {
      let msg = JSON.parse(data.data)
      if (this.form.targetId === msg.targetId) {
        this.messageData.push(msg)
        this.scope()
      }


    },
    send() {
      this.ws.send(JSON.stringify(this.form))
    },


    scope() {
      document.getElementById("divscope3").scrollTop = document.getElementById("divscope3").scrollHeight
    }


  },
  mounted() {
    this.initTableData()
    this.ws = new WebSocket("ws://localhost:9001/websocket/" + getUser().username)
    this.ws.onmessage = this.onmessage
    this.ws.onopen = this.onOpen
  },
  unmounted() {
    this.ws.close()
  }


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
