<template>
  <div>
    <van-nav-bar title="登录" class="p-van-nav-bar"/>
    <van-form @submit="onsubmit">
      <van-field v-model="user.username" name="username" placeholder="用户名" left-icon="manager"></van-field>
      <van-field v-model="user.password" type="password" name="password" placeholder="密码" left-icon="lock"></van-field>
      <div>
        <van-button block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>


<script>

import {login} from "@/api/user";
import {useStore} from 'vuex'
import router from "@/router";

export default {
  name: "LoginPage",

  setup() {
    return {
      store: useStore()
    }
  },

  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {},
  methods: {
    onsubmit() {
      login(this.user).then((resp => {
        if (resp.data.code === 200) {
          this.store.commit('setUser', resp.data.data)
          router.push({path:'/UserPage'})
        }
      }))
    },
  },
  mounted() {
  },

}
</script>


<style lang="scss" scoped>

</style>
