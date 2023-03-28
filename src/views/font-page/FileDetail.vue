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
          <img :src="item.cover">
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
              <el-button type="success">预览</el-button>
              <el-button type="success">下载</el-button>
              <el-button type="success">举报</el-button>
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
              <el-avatar
                  :src="item.avatarFb"
                  :size="45"
              />
            </div>
          </el-col>
          <el-col :span="23">
            <div class="comment-div">
              <div>{{ item.createBy }} <span style="float: right;margin-right: 30px">{{ item.createTime }}</span></div>
              <div>
                {{ item.content }}
              </div>
              <div>
                <!--                      <span style="padding: 10px 0;display: inline-block;float: left">-->
                <!--                         <el-icon :size="30"><ChatDotSquare/></el-icon>-->
                <!--                      </span>-->
                <!--                <span style="padding: 13px 5px;display: inline-block;float: left;color: #8a919f">-->
                <!--                         回复-->
                <!--                      </span>-->
                <!--                <el-button text @click="open">回复</el-button>-->
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


import {commentAdd, resourcesGetById} from "@/api/api";


export default {
  name: "FileDetail",

  data() {
    return {
      comment: {
        resourcesId: this.id,
        content: '',
      },
      item: {},
    }
  },
  methods: {

    commentAddHandle() {
      commentAdd(this.comment)
          .then(() => {
            this.comment = {}
            this.initData()
          })
    },

    initData() {
      resourcesGetById(this.item.id)
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