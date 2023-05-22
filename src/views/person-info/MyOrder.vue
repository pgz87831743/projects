<template>
  <div class="div">
    <div>
      <el-card shadow="hover" class="box-card">
        <template #header>
          <span class="pin-lun">我的订单</span>
        </template>
        <el-row>
          <el-col>
            <el-row :gutter="12">
              <el-col v-bind:key="item.id" v-for="item in list" :span="6">
                <div class="div">
                  <el-card shadow="hover">
                    <div>
                      <div>
                        <el-image :src="item.goodsOrderDetails[0].goods.cover"
                                  :preview-src-list="item.goodsOrderDetails.map(s=>s.goods.cover)"
                        ></el-image>
                      </div>
                      <div style="font-size: 10px;">
                        <el-form  label-width="80px">
                          <el-form-item label="下单时间:">
                            {{item.createTime}}
                          </el-form-item>
                          <el-form-item label="总价:">
                            {{item.priceNum.toFixed(2)}}元
                          </el-form-item>
                          <el-form-item label="查看详情:">
                            <el-link type="primary" :href="'/OrderDetail?id='+item.id" target="_blank">点击查看</el-link>
                          </el-form-item>

                        </el-form>
                      </div>
                    </div>
                  </el-card>

                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>


import {goodsOrderApi, systemCurrentUser, sysUserApi} from "@/api/api";

export default {
  name: "MyOrder",

  data() {
    return {
      search: "",
      form: {
        name: "",
        sex: "",
        avatar: ""
      },
      disabled: true,
      list: []
    }
  },
  methods: {

    handleAvatarSuccess(response){
      this.form.avatar=response[0].url
    },


    initList() {
      goodsOrderApi.listAll()
          .then((resp) => {
            this.list = resp.data.data
          })
    },

    initUserInfo() {
      systemCurrentUser()
          .then((resp) => {
            this.form = resp.data.data
          })
    },


    saveUserInfoHandle() {
      sysUserApi.updateById(this.form)
          .then(() => {
            window.location.href='/PersonalCenter'
          })
    }
  },
  mounted() {
    this.initList()
    this.initUserInfo()
  }
}
</script>

<style scoped lang="scss">
::v-deep(.box-card .el-card__header) {
  //border: none;
}

.box-card{
  min-height: 600px;
}

::v-deep(.div-form) {

}

.card-div {
  //background: aqua;
  height: 35px;
  margin-top: 10px;

  div {
    display: inline-block;
    float: left;
    height: 100%;
    line-height: 35px;
    margin-left: 5px;
    font-size: 10px;
  }

  div:nth-child(n+2) {
    float: right;
    margin: 0 5px;
  }

}

.upload-demo {
  margin-top: 24px;
  margin-left: 10px;
}
</style>