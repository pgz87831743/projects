<template>
  <div>

  </div>
</template>


<script>

import {logout, sysUserGetById} from "@/api/api";
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
      sysUserGetById(getItem("TOKEN_INFO_KEY").user.id)
          .then((resp) => {
            this.user = resp.data.data
          })
    },

    logout() {
      logout().then(() => {
        removeItem("TOKEN_INFO_KEY")
        router.push({path: '/login'})
      })
    }
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
