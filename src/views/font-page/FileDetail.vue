<template>
  <div class="div">
    <el-card shadow="hover">
      <template #header>
        <span class="pin-lun">文件详情</span>
      </template>
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
          <img :src="item.cover" width="300">
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              名称
            </div>
          </template>
          {{ item.title }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              简介
            </div>
          </template>
          {{ item.description }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              文件
            </div>
          </template>
          <el-row>
            <el-col :span="18">
              <el-text size="large" type="success">{{ item.fileName }}</el-text>
            </el-col>
            <el-col :span="6">
              <el-button type="success" @click="previewHandle(item)">预览</el-button>
              <el-button type="success" @click="downLoadHandle(item)">下载</el-button>


              <el-popover
                  :width="450"
                  popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
              >
                <template #reference>
                  <el-button type="success" @click="reportHandle(item)">举报</el-button>
                </template>
                <template #default>
                  <el-row :gutter="20">
                    <el-col :span="20">
                      <el-input placeholder="请输入举报内容" clearable v-model="report.content"></el-input>
                    </el-col>
                  </el-row>
                </template>
              </el-popover>

            </el-col>
          </el-row>


        </el-descriptions-item>

      </el-descriptions>
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <el-row>
          <el-col :span="12">
            <span class="pin-lun">评论</span>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input clearable v-model="comment.content"></el-input>
              </el-col>
              <el-col :span="3">
                <el-button type="success" @click="commentAddHandle">发表评论</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
      <div>

        <el-row v-for="item in item.commentList" v-bind:key="item.id">
          <el-col :span="1">
            <div>

              <el-popover
                  :width="450"
                  popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
              >
                <template #reference>
                  <el-avatar
                      :src="item.avatarFb"
                      :size="45"
                  />
                </template>
                <template #default>
                  <el-row :gutter="20">
                    <el-col :span="20">
                      <el-input placeholder="请输入回复内容" clearable v-model="comment.replyContent"></el-input>
                    </el-col>
                    <el-col :span="2">
                      <el-button type="success" @click="replyHandle(item)">回复</el-button>
                    </el-col>
                  </el-row>
                </template>
              </el-popover>

            </div>
          </el-col>
          <el-col :span="23">
            <div class="comment-div">
              <div>{{ item.createBy }} <span style="float: right;margin-right: 30px">{{ item.createTime }}</span></div>
              <div>
                {{ item.content }}
              </div>
              <div style="clear: both"></div>
              <div class="reply">
                <el-row v-for="replay in item.replayList" v-bind:key="replay.id">
                  <el-col :span="1">
                    <div>
                      <el-avatar
                          :src="replay.avatarPl"
                          :size="45"
                      />
                    </div>
                  </el-col>
                  <el-col :span="23">
                    <div class="comment-div">
                      <div>{{ replay.createBy }} <span style="font-size: 14px;color:#8a919f ;padding:0 12px">回复</span>
                        {{ replay.replyId }}
                        <span style="float: right;margin-right: 30px">{{ replay.createTime }}</span></div>
                      <div>
                        {{ replay.content }}
                      </div>
                    </div>

                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-divider/>

      </div>
    </el-card>
  </div>
</template>

<script>


import {commentAdd, reportApi, resourcesApi} from "@/api/api";


export default {
  name: "FileDetail",

  data() {
    return {
      comment: {
        resourcesId: this.id,
        content: '',
        replyContent: ''
      },
      report: {
        resourcesId: '',
        content: ''
      },
      item: {},
    }
  },
  methods: {


    previewHandle(item) {
      window.open(item.filePath, '_blank');
    },
    downLoadHandle(item) {
      window.open('/api/file/download/' + item.fileId, '_blank');
    },
    reportHandle(item) {
      if (this.report.content.trim().length===0){
        return;
      }
      this.report.resourcesId = item.id
      reportApi.add(this.report)
          .then(() => {
            this.report = {}
          })
    },

    commentAddHandle() {
      if (this.comment.content.trim().length === 0) {
        return;
      }
      commentAdd(this.comment)
          .then(() => {
            this.comment = {}
            this.initData()
          })
    },

    replyHandle(item) {
      if (this.comment.replyContent.trim().length === 0) {
        return;
      }
      let com = {
        resourcesId: item.resourcesId,
        content: this.comment.replyContent,
        replyId: item.createBy,
        replyCommentId: item.id,
      }
      commentAdd(com)
          .then(() => {
            this.comment = {}
            this.initData()
          })
    },

    initData() {
      resourcesApi.getById(this.item.id)
          .then((resp) => {
            this.item = resp.data.data
            this.comment.resourcesId = resp.data.data.id
          })
    }

  },
  mounted() {
    this.initData()
  },
  created() {
    this.item.id = this.$route.query.id
  }
}
</script>

<style scoped lang="scss">

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