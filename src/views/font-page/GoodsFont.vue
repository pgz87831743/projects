<template>
  <div class="div">
    <el-card :shadow="'hover'">
      <el-descriptions

          title="物资出售"
          :column="1"
          :size="'large'"
          border

      >
        <template #extra>
          <el-button type="success" @click="submitHandle">发布</el-button>
        </template>
        <el-descriptions-item label="物资名称">
          <el-input v-model="form.name"/>
        </el-descriptions-item>
        <el-descriptions-item label="物资价格">
          <el-input type="number"  v-model="form.price"/>
        </el-descriptions-item>
        <el-descriptions-item label="物资类型">
          <el-input v-model="form.type"/>
        </el-descriptions-item>
        <el-descriptions-item label="物资描述">
          <el-input type="textarea" v-model="form.description" :autosize="{minRows:10}"/>
        </el-descriptions-item>
        <el-descriptions-item label="物资图片">
          <el-upload
              class="avatar-uploader"
              action="/api/file/upload"
              :data="{fileTypeEnum:'FILE'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name="files"
          >
            <el-icon :size="80" v-if=" !this.form.img">
              <Upload/>
            </el-icon>
            <el-image :src="form.img"></el-image>
          </el-upload>

        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import {Upload} from "@element-plus/icons-vue";
import {goodsApi} from "@/api/api";

export default {
  name: "GoodsFont",
  components: {Upload},
  data() {
    return {
      form: {},

    }
  },
  methods: {
    handleAvatarSuccess(response) {
      this.form.img = response[0].url
    },

    submitHandle() {
      goodsApi.add(this.form).then(() => {
        this.form = {}
      })
    }
  }
}
</script>

<style scoped lang="scss">

::v-deep(.el-descriptions__body > table > tbody > tr > td:nth-child(odd)) {
  text-align: center;
  width: 200px;
}


</style>