<template>
  <div class="div">
    <el-card shadow="hover">
      <template #header>
        <span class="pin-lun">订单详情</span>
      </template>
      <el-descriptions
          class="margin-top"
          :column="2"
          :min-width="120"
          border
      >
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              下单时间
            </div>
          </template>
          {{item.createTime}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              总价
            </div>
          </template>
          {{ item.priceNum }}元
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              联系电话
            </div>
          </template>
          {{ item.phone }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              收货地址
            </div>
          </template>
          {{ item.address }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              联系人
            </div>
          </template>
          {{ item.contacts }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              操作
            </div>
          </template>
          <el-row>
            <el-col :span="6">
              <el-button type="success" @click="deleteOrderHandle(item.id)">删除订单</el-button>
            </el-col>
          </el-row>
        </el-descriptions-item>

      </el-descriptions>
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <el-row>
          <el-col :span="12">
            <span class="pin-lun">订单明细</span>
          </el-col>
        </el-row>
      </template>
      <div>
        <div class="row-div">
          <el-row :gutter="12" >
            <el-col v-bind:key="item.id" v-for="item in item.goodsOrderDetails" :span="6">
              <el-card shadow="hover" style="margin: 10px">
                <div>
                  <div>
                    <img :src="item.goods.cover" height="300">
                  </div>
                  <div>
                    {{ item.goods.title }}
                  </div>
                  <div class="card-div">
                    <div>

                    </div>
                    <div>
                      {{ item.goods.storeName }}
                    </div>
                    <div>
                      <el-icon>
                        <View/>
                      </el-icon>
                      {{item.shopNum}}件
                    </div>
                    <div>
                      <el-icon>
                        <Comment/>
                      </el-icon>
                      {{(item.shopNum*item.goods.price).toFixed(2)}}元
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

        </div>
      </div>
    </el-card>
  </div>
</template>

<script>


import {goodsOrderApi} from "@/api/api";
import router from "@/router";


export default {
  name: "OrderDetail",

  data() {
    return {
      item: {},
    }
  },
  methods: {

    initData() {
      goodsOrderApi.getById(this.item.id)
          .then((resp) => {
            this.item = resp.data.data
            this.comment.goodsId = resp.data.data.id
          })
    },

    deleteOrderHandle(id){
      goodsOrderApi.deleteById(id)
          .then(()=>{
            router.push({path:"/PersonalCenter"})
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


.card-div {
  //background: aqua;
  height: 35px;
  margin-top: 10px;

  div {
    display: inline-block;
    float: left;
  }

  div:nth-child(2) {
    height: 100%;
    line-height: 35px;
    margin-left: 5px;
    font-size: 10px;
  }

  div:nth-child(n+3) {
    float: right;
    font-size: 10px;
    line-height: 35px;
    margin: 0 5px;

  }
}

</style>