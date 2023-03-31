<template>
  <div class="div">
    <el-carousel :interval="4000" type="card" height="350px">
      <el-carousel-item v-for="item in top" :key="item">
        <img :src="item" width="930" >
      </el-carousel-item>
    </el-carousel>

    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="pin-lun">热门帖</span>
        </div>
      </template>
      <div class="row-div">
        <el-row :gutter="12" >
          <el-col v-bind:key="item.id" v-for="item in list" :span="6">
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
                    <el-avatar
                        :size="35"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                  </div>
                  <div>
                    {{ item.createBy }}·{{ item.createTime }}
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
</template>

<script>
import {Comment, View} from "@element-plus/icons-vue";
import {resourcesApi} from "@/api/api";
import router from "@/router";

export default {
  name: "IndexPage",
  components: {Comment, View},
  data() {
    return {
      img: require("@/assets/a.png"),
      list: [],
      top:[
          require("@/assets/index1.jpg"),
          require("@/assets/index2.jpg"),
          require("@/assets/index3.jpg"),
          require("@/assets/index4.jpg"),
          require("@/assets/index5.jpg"),
      ]
    }
  },
  methods: {

    fileDetail(item) {
      console.log(item)
      let routeData = router.resolve({path: '/FileDetail', query: {id: item.id}});
      window.open(routeData.href, '_blank');
      // router.push({path:"/FileDetail",query:{id:item.id}})
    },

    initHotResource() {
      resourcesApi.hotResource()
          .then((resp) => {
            this.list = resp.data.data
          })
    }
  },
  mounted() {
    this.initHotResource()
  }
}
</script>

<style scoped lang="scss">

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

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

::v-deep(.box-card .el-card__header) {
  //border: none;
}

.row-div > div {
  margin: 30px auto;
}


</style>