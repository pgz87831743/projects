<template>
  <div>
    <van-nav-bar title="登录" class="p-van-nav-bar"/>
    <van-form>
      <van-field name="username" placeholder="用户名" ></van-field>
      <van-field name="password" placeholder="密码"></van-field>
      <div>
        <van-button block   type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>


<script>

export default {
  name: "LoginPage",
  data() {
    return {}
  },
  components: {},
  methods: {},
  mounted() {
  },

}
</script>


<style lang="scss" scoped>

</style>
