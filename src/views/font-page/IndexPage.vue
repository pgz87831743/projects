<template>
  <div>
    <div class="div">
      <el-affix class="ef">
        <el-card>
          <el-row :gutter="10" justify="end">
            <el-col :span="15">
              <el-input v-model="search"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="searchHandle">搜索</el-button>
            </el-col>
            <el-col :span="5">
              <el-button type="primary"  @click="logout">退出登录</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-affix>
    </div>
    <div class="div" >
      <el-row :justify="'center'" :gutter="10" class="cr">
        <el-col :span="6" v-for="item in list" v-bind:key="item.id">
          <el-card>
            <div>
              <el-image :src="item.displayIcon" :preview-src-list="[item.displayIcon]"></el-image>
            </div>
            <div v-html="item.displayName">
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>


import {logout, weaponApi} from "@/api/api";
import {removeItem} from "@/utils/storage";
import router from "@/router";

export default {
  name: "IndexPage",

  data() {
    return {
      list: [],
      search: '',
    }
  },
  methods: {

    searchHandle() {
      weaponApi.listAll(this.search)
          .then((resp) => {
            this.list=resp.data.data
          })
    }
    ,
    logout() {
      logout().then(() => {
        removeItem("TOKEN_INFO_KEY")
        router.push({path: '/login'})
      })
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
.el-affix {

}

.ef .el-card {
  background-color: #f1f2f5;;
}

.cr .el-col{
  margin: 10px;
}

</style>