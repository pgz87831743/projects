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
              <div style="font-size: 20px;font-weight: bold;">药品求助</div>
            </el-col>
          </el-row>


          <div class="car-div" v-for="item in list" v-bind:key="item.id">
            <el-card>
              <div>
                <img :src="item.img" width="280">
              </div>
              <div>
                <el-form>
                  <el-form-item label="药品名称">
                    {{item.name}}
                  </el-form-item>
                  <el-form-item label="需求描述">
                    {{item.description}}
                  </el-form-item>
                  <el-form-item label="创建时间">
                    {{item.createTime}}
                  </el-form-item>
                  <el-form-item label="联系人">
                    {{item.person}}
                  </el-form-item>
                  <el-form-item label="联系电话">
                    {{item.phone}}
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

  </div>
</template>

<script>


import {drugHelpApi} from "@/api/api";

export default {
  name: "IndexPage",
  data() {
    return {
      list: [],
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
    initDrugHelp() {
      drugHelpApi.listAll()
          .then((resp) => {
            this.list = resp.data.data
          })
    }
  },
  mounted() {
    this.initDrugHelp()
  }
}
</script>

<style scoped lang="scss">
.car-div {
  width: 400px;
  height: 450px;
  background: #c7e0c7;
  margin: 20px 30px;
  display: inline-block;
}

</style>