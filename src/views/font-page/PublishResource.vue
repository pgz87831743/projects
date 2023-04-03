<template>
  <div class="div">
    <el-card shadow="hover">
      <template #header>
        <span class="pin-lun">文件发布</span>
      </template>
      <el-row>
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


            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  文件类型
                </div>
              </template>
              <el-select v-model="form.type">
                <el-option label="图片" value="PIC">图片</el-option>
                <el-option label="文档" value="DOC">文档</el-option>
                <el-option label="音频" value="AUDIO">音频</el-option>
                <el-option label="视频" value="VIDEO">视频</el-option>
                <el-option label="压缩包" value="ZIP">压缩包</el-option>
              </el-select>
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  文件
                </div>
              </template>
              <el-upload
                  class="avatar-uploader"
                  :show-file-list="true"
                  :file-list="fileList"
                  :http-request="uploadFiles"
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
import {goodsApi, systemUploadSecurity} from "@/api/api";
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
        type: 'PIC',
        cover: '',
        filePath: '',
        fileName: '',
      },
      fileList: [],
    }
  },
  methods: {

    handleCoverSuccess(response) {
      this.form.cover = response[0].url
    },


    uploadFiles(data) {
      let dto={
        base:'',
        fileTypeEnum:this.form.type,
        fileName:data.file.name
      }
      this.getBase64(data.file).then(resBase64 => {
        dto.base= resBase64.split(',')[1]
        systemUploadSecurity(dto).then((response)=>{
          this.form.filePath = response.data[0].url
          this.form.fileName = response.data[0].name
          this.form.fileId = response.data[0].id
          this.fileList = [response.data[0]]
        })
      })
    },


    //文件转base64
    getBase64(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let fileResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          fileResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(fileResult);
        };
      });
    },

    submitHandle() {
      goodsApi.add(this.form)
          .then(() => {
            router.push({path: "/PersonalCenter"})
          });
    },
  }
}
</script>

<style scoped lang="scss">


::v-deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label) {
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