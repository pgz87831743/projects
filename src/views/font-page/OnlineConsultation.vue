<template>
  <div class="div">
    <el-row :justify="'center'">
      <el-col :span="12">
        <el-card>
          <el-tabs @tab-change="tableChange">

            <el-tab-pane label="咨询会话">
              <el-collapse  v-if="getUser().role!=='DOCTOR'">
                <el-collapse-item :title="item.toUserInfo.nickname" :name="item.username" v-for="item in onlineInfo"
                                  v-bind:key="item.id">
                  <el-descriptions
                      class="margin-top"
                      title="医生信息"
                      :column="1"
                      border
                  >
                    <template #extra>
                      <el-row :gutter="10">
                        <el-col :span="12">
                          <el-button type="success" @click="onlineTalk(item)">在线问诊</el-button>
                        </el-col>
                        <el-col :span="12">
                          <el-button type="danger" @click="deleteOnlineHandle(item)">结束会话</el-button>
                        </el-col>
                      </el-row>
                    </template>
                    <el-descriptions-item label="医生工号">{{ item.toUserInfo.num }}</el-descriptions-item>
                    <el-descriptions-item label="性别">{{ item.toUserInfo.sex }}</el-descriptions-item>
                    <el-descriptions-item label="科室">{{ item.toUserInfo.dept }}</el-descriptions-item>
                    <el-descriptions-item label="擅长领域">
                      <el-input type="textarea" v-model="item.toUserInfo.description" :autosize="{minRows:5}"
                                disabled></el-input>
                    </el-descriptions-item>

                  </el-descriptions>
                </el-collapse-item>

              </el-collapse>
              <el-collapse  v-if="getUser().role!=='USER'">
                <el-collapse-item :title="item.fromUserInfo.nickname" :name="item.username" v-for="item in onlineInfo"
                                  v-bind:key="item.id">
                  <el-descriptions
                      class="margin-top"
                      title="患者信息"
                      :column="1"
                      border
                  >
                    <template #extra>
                      <el-row :gutter="10">
                        <el-col :span="12">
                          <el-button type="success" @click="onlineTalk(item)">沟通信息</el-button>
                        </el-col>
                        <el-col :span="12">
                          <el-button type="danger" @click="deleteOnlineHandle(item)">结束会话</el-button>
                        </el-col>
                      </el-row>
                    </template>
                    <el-descriptions-item label="患者地址">{{ item.fromUserInfo.address }}</el-descriptions-item>
                    <el-descriptions-item label="患者性别">{{ item.fromUserInfo.sex }}</el-descriptions-item>
                    <el-descriptions-item label="患者电话">{{ item.fromUserInfo.phone }}</el-descriptions-item>
                    <el-descriptions-item label="患者描述">
                      <el-input type="textarea" v-model="item.fromUserInfo.description" :autosize="{minRows:5}"
                                disabled></el-input>
                    </el-descriptions-item>

                  </el-descriptions>
                </el-collapse-item>

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
            console.log(resp)
            console.log(this.from)
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
        this.messageData.push(msg)
      }
      this.scope()
    },

    send() {
      this.ws.send(JSON.stringify(this.form))
    },
    scope() {
      let div = window.document.getElementById("divscope4")
      div.scrollTop = div.scrollHeight;
    }

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
  }
}
</script>

<style scoped lang="scss">

</style>