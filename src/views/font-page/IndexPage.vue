<template>
  <div class="div">
    <el-carousel :interval="2000" type="card" height="360px">
      <el-carousel-item v-for="item in banner" :key="item">
        <div>
          <img :src="item" height="480">
        </div>
      </el-carousel-item>
    </el-carousel>


    <el-row justify="space-around">

      <el-col :span="7">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="pin-lun">科普</span>
            </div>
          </template>
          <div class="row-div">
            <el-scrollbar height="800px">
              <el-link :underline="false" v-for="item in scienceList" :key="item.id" class="scrollbar-demo-item">
                <el-text truncated @click="fileDetail(item)">
                  {{ item.title }}&nbsp;&nbsp;{{ item.createTime }}
                </el-text>
              </el-link>
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card class="box-card">
          <template #header>
            <div>
              <el-row>
                <el-col :span="2"><span class="pin-lun">中药知识</span></el-col>

                <el-col :span="22">
                  <el-input
                      v-model="searchValue"
                      size="large"
                      clearable
                      @clear="initMedicineList"
                  >
                    <template #append>
                      <el-button  @click="initMedicineList" :icon="Search"/>
                    </template>
                  </el-input>
                </el-col>
              </el-row>

            </div>
          </template>
          <div>
            <el-scrollbar height="800px">
              <el-row :gutter="10" justify="center">
                <el-col :span="7" v-for="item in medicineList" :key="item.id" style="margin: 10px">
                  <el-card>
                    <div style="overflow: auto;">
                      <img :src="item.img" width="300">
                      <div>名称：{{ item.name }}</div>
                      <div>功效：{{ item.effect }}</div>
                      <div>用法：{{ item.ug }}</div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import router from "@/router";
import {medicineApi, scienceApi} from "@/api/api";
import {Search} from "@element-plus/icons-vue";

export default {
  name: "IndexPage",
  computed: {
    Search() {
      return Search
    }
  },
  data() {
    return {
      img: require("@/assets/a.png"),
      banner: [
        require("@/assets/index1.jpg"),
        require("@/assets/index2.jpg"),
        require("@/assets/index3.jpg"),
        require("@/assets/index4.jpg"),
        require("@/assets/index5.jpg"),
      ],
      list: [],
      medicineList: [],
      scienceList: [],
      searchValue: ''
    }
  },
  methods: {

    fileDetail(item) {
      let routeData = router.resolve({path: '/NewsInfo', query: {id: item.id}});
      window.open(routeData.href, '_blank');
      // router.push({path:"/FileDetail",query:{id:item.id}})
    },


    initMedicineList() {
      medicineApi.listAll(this.searchValue)
          .then((resp) => {
            this.medicineList = resp.data.data
          })
    },


    initScience() {
      scienceApi.listAll()
          .then((resp) => {
            this.scienceList = resp.data.data
          })
    }
  },
  mounted() {
    this.initMedicineList()
    this.initScience()
  }
}
</script>

<style scoped lang="scss">

.scroll-box::-webkit-scrollbar {
  display: none;
}

div.el-col.el-col-3 > span {
  line-height: 45px;
}

.detail {

  display: flex;
  width: 300px;
  height: 400px;
  overflow: scroll;
  background: #247ff2;
  margin: 5px;

}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  //background: var(--el-color-primary-light-9);
  //color: var(--el-color-primary);
}


</style>