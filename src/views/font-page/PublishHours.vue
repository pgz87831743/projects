<template>
  <div class="div">
    <el-card shadow="hover">
      <template #header>
        <span class="pin-lun">房源详情</span>
      </template>
      <el-descriptions
          class="margin-top"
          :column="2"
          :min-width="120"
          border
      >

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              房源照片
            </div>
          </template>
          <el-upload
              class="avatar-uploader"
              action="/api/file/upload"
              :data="{fileTypeEnum:'FILE'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name="files"
          >
            <img v-if="form.img" :src="form.img"  width="300" />
            <el-icon v-else ><Plus /></el-icon>
          </el-upload>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              标题
            </div>
          </template>
          <el-input v-model="form.title" placeholder="请输入"/>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              价格
            </div>
          </template>
          <el-input v-model="form.price" placeholder="请输入"/>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              户型
            </div>
          </template>
          <el-input v-model="form.unitType" placeholder="请输入"/>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              面积
            </div>
          </template>
          <el-input v-model="form.area" placeholder="请输入"/>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              楼层高度
            </div>
          </template>
          <el-input v-model="form.floorHeight" placeholder="请输入"/>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              朝向
            </div>
          </template>
          <el-input v-model="form.direction" placeholder="请输入"/>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              小区名称
            </div>
          </template>
          <el-input v-model="form.communityName" placeholder="请输入"/>
        </el-descriptions-item>


        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              地址
            </div>
          </template>
          <el-input v-model="form.address" placeholder="请输入"/>
        </el-descriptions-item>


        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              是否有电梯
            </div>
          </template>
          <el-input v-model="form.elevator" placeholder="请输入"/>
        </el-descriptions-item>


        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              房源特色
            </div>
          </template>
          <el-input type="textarea" v-model="form.characteristics" placeholder="请输入"/>
        </el-descriptions-item>


        <el-descriptions-item >
          <template #label>
            <div class="cell-item">
              操作
            </div>
          </template>
          <el-row>
            <el-col :span="6">
              <el-button type="success"  @click="onSubmit">发布房源</el-button>
            </el-col>
          </el-row>
        </el-descriptions-item>

      </el-descriptions>
    </el-card>
  </div>
</template>

<script>




import {Plus} from "@element-plus/icons-vue";
import {hoursApi} from "@/api/api";

export default {
  name: "PublishHours",
  components: {Plus},


  data() {
    return {
      form:{},
      item:{}
    }
  },
  methods: {

    handleAvatarSuccess(response) {
      this.form.img = response[0].url
    },

    onSubmit(){

      hoursApi.add(this.form)
          .then(()=>{
            this.form={}
          })
    }


  },
  mounted() {

  },

}
</script>

<style scoped lang="scss">

.cell-item {
  width: 100px;
}

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