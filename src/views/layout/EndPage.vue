<template>
  <div>
123123
  </div>
</template>


<script>

import {logout, sysUserApi} from "@/api/api";
import {getItem, removeItem} from "@/utils/storage";
import router from "@/router";

export default {
  name: "EndPage",
  data() {
    return {
      user: {}
    }
  },
  components: {},
  methods: {
    userQuery() {
      sysUserApi.getById(getItem("TOKEN_INFO_KEY").user.id)
          .then((resp) => {
            this.user = resp.data.data
          })
    },


  },
  mounted() {
    this.userQuery()
  },

}
</script>


<style lang="scss" scoped>
.el-menu {
  height: 100vh;
  border-right: 1px lavender solid;
}


</style>
