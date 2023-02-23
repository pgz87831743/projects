<template>
  <div>

    <el-row>
      <el-col :span="20">
        <el-form-item label="消息窗口">
          <el-input type="textarea"
                    :autosize="{ minRows: 20, maxRows: 30 }"
                    v-model="msg"

          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="发送窗口">
          <el-input type="textarea"
                    :autosize="{ minRows: 10, maxRows: 10 }"
                    v-model="myMsg"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-button @click="sendMsg">发送消息</el-button>
      </el-col>
    </el-row>
  </div>
</template>


<script>

import websocketFeature from "@/utils/websocket.js";
import {userOption} from "@/store/storage";

export default {
  name: "liaotTian",
  data() {
    return {
      msg: '',
      myMsg: '',
      myWebsocketKey: ''
    }
  },
  components: {},
  methods: {
    sendMsg() {
      websocketFeature.get(this.myWebsocketKey).send(this.myMsg)
      this.myMsg=''
    },
    websocketMessageHandler(e) {
      console.log(e.data);
      this.msg += JSON.parse(e.data).msg + "\n"
    }
  },
  mounted() {
    this.myWebsocketKey = websocketFeature.create(
        "ws://localhost:9001/api/pushMessage/" + userOption().getUser().data.username,
        this.websocketMessageHandler.bind(this)
    );

  }
}
</script>


<style lang="scss" scoped>

</style>
