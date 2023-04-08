<template>
  <div class="div">
    <el-card>
      <div>
        <el-row>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="药品名称"/>
            <el-table-column prop="description" label="需求描述"/>
            <el-table-column prop="img" label="药品图片">
              <template #default="scope">
                <img :src="scope.row.img" width="80"/>
              </template>
            </el-table-column>
            <el-table-column prop="person" label="联系人"/>
            <el-table-column prop="phone" label="联系电话"/>
            <el-table-column prop="status" label="是否解决"/>
            <el-table-column prop="createTime" label="创建时间"/>
            <el-table-column prop="createBy" label="创建人"/>
            <el-table-column label="操作" width="300px">
              <template #default="scope">
                <el-button size="small" type="success" @click="clickButton('gt', scope.row)">沟通</el-button>
                <el-button  v-if="scope.row.createBy===getUser().username&&scope.row.status==='待解决'" type="primary" size="small" @click="clickButton('xx', scope.row)">下线互助</el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-row>


        <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
          <div style=" overflow:auto;height:480px;" id="divscope">
            <div class="lt">
              <div>

                <el-row v-for="item in messageData" v-bind:key="item.id">

                  <el-col :span="22" v-if="item.createBy===getItem('TOKEN_INFO_KEY').user.username">
                    <div style="background: white">
                      <div style="width: 98%">
                        <div style="float: right">{{ item.createTime }}</div>
                        <div style="float: right">{{ item.createBy }}&nbsp;&nbsp;</div>
                        <div style="clear:both"></div>
                        <span
                            style="min-width: 100px;float: right;background: #d5c3c3;padding: 10px;display:inline-block;border-radius: 10px">{{ item.content }}</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <el-avatar :size="50"
                                 src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"></el-avatar>
                    </div>
                  </el-col>
                  <el-col :span="22" v-if="item.createBy!==getItem('TOKEN_INFO_KEY').user.username">
                    <div style="background: white">
                      <div style="width: 98%">
                        <div style="float: left">{{ item.createBy }}&nbsp;&nbsp;</div>
                        <div style="float: left">{{ item.createTime }}</div>
                        <div style="clear:both"></div>
                        <span
                            style="min-width: 100px;float: left; background: #d5c3c3;padding: 10px;display:inline-block;border-radius: 10px">{{ item.content }}</span>
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

import {drugHelpApi, messageApi} from "@/api/api";
import {getItem} from "@/utils/storage";
import {getUser} from "@/utils/authutil";


export default {
  name: "DrugHelpProvideFont",
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
      ws: {},
      form: {},
      total: 0,
    }
  },

  methods: {
    getUser,
    getItem,
    search() {
      drugHelpApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    clickButton(type, row) {
      if (type==='gt'){
        messageApi.listAll(row.id)
            .then((resp) => {
              this.messageData = resp.data.data
              this.dialog.dialogFormVisible = true
              this.dialog.optionName = '在线沟通'
              this.form.toUser = row.createBy
              this.form.targetId = row.id

              this.scope()
            })
      }

      if (type==='xx'){
        row.status='已解决'
        drugHelpApi.updateById(row)
            .then(() => {
              this.initTableData()
            })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      drugHelpApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      drugHelpApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    onmessage(data) {
      let msg = JSON.parse(data.data)
      if (this.form.targetId === msg.targetId) {
        this.messageData.push(msg)
      }
      this.scope()
    },
    onOpen(data) {
      console.log(data.data)
    },
    send() {
      this.ws.send(JSON.stringify(this.form))
    },

    scope(){
      let div= document.getElementById("divscope")
      div.scrollTop = div.scrollHeight;
    }


  },

  unmounted() {
    this.ws.close()
  },

  mounted() {
    this.initTableData()
    this.ws = new WebSocket("ws://localhost:9001/websocket/" + getItem('TOKEN_INFO_KEY').user.username)
    this.ws.onmessage = this.onmessage
    this.ws.onopen = this.onOpen

  },



}
</script>


<style lang="scss" scoped>


.lt {
  width: 100%;
  margin: 0 auto;
}

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

