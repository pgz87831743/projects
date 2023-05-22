<template>
  <div>
    <div class="div">
      <el-carousel :interval="4000" type="card" height="450px">
        <el-carousel-item v-for="item in top" :key="item">
          <img :src="item" width="930">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="div">
      <el-card>
        <template #header>
          <el-row>
            <el-col :span="3">
              <div style="font-size: 20px;font-weight: bold;">健康新闻</div>
            </el-col>
          </el-row>


          <div class="car-div" v-for="item in list" v-bind:key="item.id">
            <el-card>
              <div>
                <img :src="item.img" width="280">
              </div>
              <div>
                <el-form>
                  <el-form-item label="标题">
                    {{item.title}}
                  </el-form-item>
                  <el-form-item label="创建人">
                    {{item.createBy}}
                  </el-form-item>
                  <el-form-item label="创建时间">
                    {{item.createTime}}
                  </el-form-item>
                  <el-form-item label="创建时间">
                      <el-link type="primary" :href="'/NewsInfo?id='+item.id" target="_blank">查看详细</el-link>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </div>


        </template>
        <div>
          <div>

          </div>
        </div>
      </el-card>
    </div>
    <div class="div">
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span class="pin-lun">商品推荐</span>
          </div>
        </template>
        <div class="row-div">
          <el-row :gutter="12" >
            <el-col v-bind:key="item.id" v-for="item in shopList" :span="6">
              <el-card shadow="hover" @click="fileDetail(item)"  style="margin: 10px">
                <div>
                  <div>
                    <img :src="item.cover" height="300">
                  </div>
                  <div>
                    {{ item.title }}
                  </div>
                  <div class="card-div">
                    <div>

                    </div>
                    <div>
                      <el-tag style="color:deepskyblue;">{{ item.foodType }}</el-tag>     <span style="color:salmon;font-size: 20px">￥{{ item.price }}</span>       {{ item.storeName }}
                    </div>
                    <div>
                      <el-icon>
                        <View/>
                      </el-icon>
                      {{item.times}}
                    </div>
                    <div>
                      <el-icon>
                        <Comment/>
                      </el-icon>
                      {{item.commentNum}}
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

        </div>
      </el-card>
    </div>

  </div>
</template>

<script>


import {goodsApi, newsApi} from "@/api/api";
import router from "@/router";
import {Comment, View} from "@element-plus/icons-vue";

export default {
  name: "IndexPage",
  components: {Comment, View},
  data() {
    return {
      list: [],
      shopList: [],
      top: [
        require("@/assets/index1.jpg"),
        require("@/assets/index2.jpg"),
        require("@/assets/index3.jpg"),
        require("@/assets/index4.jpg"),
        require("@/assets/index5.jpg"),
      ]
    }
  },
  methods: {
    initNews() {
      newsApi.listAll()
          .then((resp)=>{
            this.list=resp.data.data
          })
    },

    fileDetail(item) {
      console.log(item)
      let routeData = router.resolve({path: '/ProductDetail', query: {id: item.id}});
      window.open(routeData.href, '_blank');
      // router.push({path:"/FileDetail",query:{id:item.id}})
    },

    inithotGoods() {
      goodsApi.hotGoods()
          .then((resp) => {
            this.shopList = resp.data.data
          })
    }
  },
  mounted() {
    this.initNews()
    this.inithotGoods()
  }
}
</script>

<style scoped lang="scss">
.car-div {
  width: 400px;
  height: 450px;
  margin: 20px 30px;
  display: inline-block;
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