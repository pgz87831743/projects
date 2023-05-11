<template>
  <div class="div">
    <el-card shadow="hover">
      <template #header>
        <span class="pin-lun">产品详情</span>
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
          <el-image :preview-teleported="true" :preview-src-list="[item.img]" :src="item.img"></el-image>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              标题
            </div>
          </template>
          {{ item.title }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              价格
            </div>
          </template>
          {{ item.price }}(元每月)
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              户型
            </div>
          </template>
          {{ item.unitType }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              面积
            </div>
          </template>
          {{ item.area }}（平米）
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              楼层高度
            </div>
          </template>
          {{ item.floorHeight }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              楼层高度
            </div>
          </template>
          {{ item.floorHeight }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              朝向
            </div>
          </template>
          {{ item.direction }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              小区名称
            </div>
          </template>
          {{ item.communityName }}
        </el-descriptions-item>


        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              地址
            </div>
          </template>
          {{ item.address }}
        </el-descriptions-item>


        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              浏览次数
            </div>
          </template>
          {{ item.times }}
        </el-descriptions-item>


        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              是否有电梯
            </div>
          </template>
          {{ item.elevator }}
        </el-descriptions-item>


        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              房源特色
            </div>
          </template>
          {{ item.characteristics }}
        </el-descriptions-item>


        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              操作
            </div>
          </template>
          <el-row>
            <el-col :span="6">
              <el-button type="success" @click="onLineCheck(item)">在线咨询</el-button>
            </el-col>
          </el-row>
        </el-descriptions-item>

      </el-descriptions>
    </el-card>
  </div>
</template>

<script>


import {commentAdd, hoursApi, onlineInfoApi} from "@/api/api";
import {getUser} from "@/utils/authutil";


export default {
  name: "HoursDetail",

  data() {
    return {
      comment: {
        goodsId: this.id,
        content: '',
        replyContent: ''
      },
      report: {
        goodsId: '',
        content: ''
      },
      item: {},
    }
  },
  methods: {


    onLineCheck(item) {
      let data = {
        fromUser: getUser().username,
        toUser: item.createBy
      }
      onlineInfoApi
          .add(data)
          .then(()=>{
            alert("123")
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
        goodsId: item.goodsId,
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
      hoursApi.getById(this.item.id)
          .then((resp) => {
            this.item = resp.data.data
            this.comment.goodsId = resp.data.data.id
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

.cell-item {
  width: 150px;
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