<template>
  <div class="div">
    <el-row :justify="'center'">
      <el-col :span="16">
        <el-card>
          <el-tabs @tab-change="tableChange">

            <el-tab-pane label="咨询会话">
              <el-collapse>

                <div v-for="item in onlineInfo" v-bind:key="item.id">
                  <el-collapse-item  :title="item.toUserInfo.username===getUser().username?item.fromUserInfo.username:item.toUserInfo.username" :name="item.username">
                    <el-descriptions
                        class="margin-top"
                        title="房源信息"
                        :column="1"
                        border
                    >
                      <template #extra>
                        <el-row :gutter="10">
                          <el-col :span="12">
                            <el-button type="success" @click="onlineTalk(item)">在线咨询</el-button>
                          </el-col>
                          <el-col :span="12">
                            <el-button type="danger" @click="deleteOnlineHandle(item)">结束会话</el-button>
                          </el-col>
                        </el-row>
                      </template>
                      <el-descriptions-item label="标题">{{ item.hoursInfo.title }}</el-descriptions-item>
                      <el-descriptions-item label="价格">{{ item.hoursInfo.price }}元每月</el-descriptions-item>
                      <el-descriptions-item label="面积">{{ item.hoursInfo.area }}</el-descriptions-item>
                      <el-descriptions-item label="房源特色">
                        <el-input type="textarea" v-model="item.hoursInfo.characteristics" :autosize="{minRows:5}"
                                  disabled></el-input>
                      </el-descriptions-item>

                    </el-descriptions>
                  </el-collapse-item>
                </div>



              </el-collapse>


            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName">
      <div style=" overflow:auto;height:480px;" id="divscope4">
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
              <el-col :span="22" v-if="item.createBy!==getItem('TOKEN_INFO_KEY').user.username">
                <div style="background: white">
                  <div style="width: 98%">
                    <div style="float: left">{{ item.createBy }}&nbsp;&nbsp;</div>
                    <div style="float: left">{{ item.createTime }}</div>
                    <div style="clear:both"></div>
                    <span
                        style="min-width: 100px;float: left; background: rgba(238,97,97,0.74);padding: 10px;display:inline-block;border-radius: 10px">{{
                        item.content
                      }}</span>
                  </div>

                </div>
              </el-col>

            </el-row>
          </div>
        </div>

        <div style="height: 60px"></div>
      </div>
      <div>
        <el-row justify="center" :gutter="20">
          <el-col :span="20">
            <el-input v-model="form.content"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="success" @click="send">发送</el-button>
          </el-col>
        </el-row>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import {messageApi, onlineInfoApi} from "@/api/api";
import {getUser} from "@/utils/authutil";
import {getItem} from "@/utils/storage";

export default {
  name: "OnlineConsultation",
  data() {
    return {
      doctorList: [],
      onlineInfo: [],
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
    }
  },

  methods: {
    getUser,
    getItem,
    initDoctorList() {
      // sysUserApi.doctorList()
      //     .then((resp) => {
      //       this.doctorList = resp.data.data
      //     })
    },

    initOnlineInfo() {
      onlineInfoApi.listAll()
          .then((resp) => {
            this.onlineInfo = resp.data.data
          })

    },

    deleteOnlineHandle(item) {
      onlineInfoApi.deleteById(item.id)
          .then(() => {
            this.initDoctorList()
            this.initOnlineInfo()
          })
    },



    tableChange(){
      this.initDoctorList()
      this.initOnlineInfo()
    },

    onlineTalk(item) {
      messageApi.listAll(item.id)
          .then((resp) => {
            this.messageData = resp.data.data
            this.dialog.dialogFormVisible = true
            this.dialog.optionName = '在线咨询'
            this.form.targetId = item.id
            this.form.toUser = item.toUser
            this.scope()
          })
    },
    onmessage(data) {
      let msg = JSON.parse(data.data)
      if (this.form.targetId === msg.targetId) {
        this.scope()
        this.messageData.push(msg)
      }

    },

    send() {
      this.ws.send(JSON.stringify(this.form))
      this.form.content=''
    },
    scope() {
      let div = window.document.getElementById("divscope4")
      if (div!==null){
        div.scrollTop = div.scrollHeight;
      }
    }

  },

  updated() {
    this.scope()
  },

  unmounted() {
    this.ws.close()
  },

  mounted() {
    this.initDoctorList()
    this.initOnlineInfo()
    this.ws = new WebSocket("ws://localhost:9001/websocket/" + getUser().username)
    this.ws.onmessage = this.onmessage
    this.ws.onopen = this.onOpen
    this.scope()
  }
}
</script>

<style scoped lang="scss">

</style>