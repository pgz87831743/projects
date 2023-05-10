<template>
  <div>


    <div class="div">
      <el-card>
        <el-form>
          <el-form-item label="舌头照片">
            <el-upload
                class="avatar-uploader"
                action="/api/file/upload"
                :data="{fileTypeEnum:'FILE'}"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                name="files"
            >
              <img  v-if="url" :src="url"  width="500" />
              <el-icon v-else style="font-size: 100px"><Plus /></el-icon>
            </el-upload>

          </el-form-item>

        <el-button type="primary" @click="onDiagnosis">提交诊断</el-button>
        </el-form>
      </el-card>
    </div>

    <div class="div">
      <el-descriptions
          title="诊断结果"
          :column="2"
          border
      >
        <el-descriptions-item label="状态">{{item.status }}</el-descriptions-item>
        <el-descriptions-item label="消息">{{item.msg }}</el-descriptions-item>
        <el-descriptions-item label="配对率">{{item.matchRatio }}</el-descriptions-item>
        <el-descriptions-item label="描述">{{item.describe }}</el-descriptions-item>
        <el-descriptions-item label="建议">{{item.recommend }}</el-descriptions-item>
      </el-descriptions>
    </div>

  </div>
</template>

<script>
import {Plus} from "@element-plus/icons-vue";
import {recordApi} from "@/api/api";


export default {
  name: "TongueDiagnosis",
  components: {Plus},
  data() {
    return {
      url:'',
      item:{}
    }
  },
  methods: {
    handleAvatarSuccess(response) {
      this.url = response[0].url
    },

    onDiagnosis(){
      recordApi.onDiagnosis(this.url)
          .then((resp)=>{
            this.item=resp.data.data
          })
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">

</style>