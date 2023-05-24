<template>
  <div class="div">
    <el-card shadow="hover">
      <template #header>
        <span class="pin-lun">宠物详情</span>
      </template>
      <el-descriptions
          class="margin-top"
          :column="1"
          :min-width="120"
          border
      >

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              照片
            </div>
          </template>
          <img :src="item.img" width="300">
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              名称
            </div>
          </template>
          {{ item.name }}
        </el-descriptions-item>
 <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              种类
            </div>
          </template>
          {{ item.type }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              性别
            </div>
          </template>
          {{ item.sex }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              生日
            </div>
          </template>
          {{ item.birth }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              操作
            </div>
          </template>
          <el-row :gutter="10">
            <el-col :span="10">
             <el-input placeholder="请输入领养理由" type="textarea" v-model="description"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="success" @click="adoptSubmit(item)">申请领养</el-button>
            </el-col>
          </el-row>
        </el-descriptions-item>

      </el-descriptions>
    </el-card>

  </div>
</template>

<script>


import {adoptExamineApi, petApi} from "@/api/api";


export default {
  name: "PetDetail",

  data() {
    return {
      description:'',
      item: {},
    }
  },
  methods: {


    adoptSubmit(item) {
      let data={
        petId:item.id,
        status:'待审核',
        description:'213'
      }
        adoptExamineApi.add(data)
    },





    initData() {
      petApi.getById(this.item.id)
          .then((resp) => {
            this.item = resp.data.data
          })
    }

  },
  mounted() {
    this.initData()
  },
  created() {
    this.item.id = this.$route.query.id
  }
}
</script>

<style scoped lang="scss">

.reply {
  background: #f9fafb;
}

.comment-div {
  div {
    margin: 10px 0;
  }
}

.el-row-div {
  margin-top: 20px;
}

</style>