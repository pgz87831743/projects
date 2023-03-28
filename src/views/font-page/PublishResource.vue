<template>
  <div class="div">
    <el-card shadow="hover">
      <template #header>
        <span class="pin-lun">文件发布</span>
      </template>
      <el-row >
        <el-col :span="16">
          <el-descriptions
              class="margin-top"
              :column="1"
              :min-width="120"
              border
          >
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  首页图
                </div>
              </template>
              <el-upload
                  class="avatar-uploader"
                  action="/api/file/upload"
                  :data="{fileTypeEnum:'FILE'}"
                  :show-file-list="false"
                  :on-success="handleCoverSuccess"
                  name="files"
              >
                <img :src="form.cover" width="300"/>
                <el-icon class="avatar-uploader-icon">
                  <Plus/>
                </el-icon>
              </el-upload>

            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  名称
                </div>
              </template>
              <el-input v-model="form.title"></el-input>
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  简介
                </div>
              </template>
              <el-input type="textarea" :autosize="{minRows:10}" v-model="form.description"></el-input>
            </el-descriptions-item>

            <el-descriptions-item >
              <template #label>
                <div class="cell-item">
                  文件
                </div>
              </template>
              <el-upload
                  class="avatar-uploader"
                  action="/api/file/upload"
                  :data="{fileTypeEnum:'FILE'}"
                  :show-file-list="true"
                  :on-success="handleFileSuccess"
                  :limit="1"
                  name="files"
              >
                <el-icon class="avatar-uploader-icon">
                  <Plus/>
                </el-icon>
              </el-upload>

            </el-descriptions-item>


            <el-descriptions-item>
              <el-button type="success" @click="submitHandle">提交</el-button>
            </el-descriptions-item>

          </el-descriptions>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>


import {Plus} from "@element-plus/icons-vue";
import {resourcesAdd} from "@/api/api";
import router from "@/router";
export default {
  name: "PublishResource",
  components: {Plus},

  data() {
    return {
      id: '',
      form: {
        title: '',
        description: '',
        type: '',
        cover: '',
        filePath: '',
        fileName: '',
      }
    }
  },
  methods: {

    handleCoverSuccess(response) {
      this.form.cover = response[0].url
    },
    handleFileSuccess(response) {
      this.form.filePath = response[0].url
      this.form.fileName = response[0].name
    },

    submitHandle() {
      resourcesAdd(this.form)
          .then(() => {
            router.push({path:"/PersonalCenter"})
          });
    }

  },
}
</script>

<style scoped lang="scss">


::v-deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label){
  width: 30px;
  padding: 30px;
}

.reply {
  background: #f9fafb;
}

.comment-div {
  div {
    margin: 10px 0;
  }
}

.el-row-div {
  margin-top: 20px;
}

</style>