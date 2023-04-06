<template>
  <div class="div">
    <el-card :shadow="'hover'">
      <el-descriptions

          title="药品求助"
          :column="1"
          :size="'large'"
          border

      >
        <template #extra>
          <el-button type="success" @click="submitHandle">发布</el-button>
        </template>
        <el-descriptions-item label="药品名称">
          <el-input v-model="form.name"/>
        </el-descriptions-item>
        <el-descriptions-item label="联系人">
          <el-input v-model="form.person"/>
        </el-descriptions-item>
        <el-descriptions-item label="联系电话">
          <el-input v-model="form.phone"/>
        </el-descriptions-item>
        <el-descriptions-item label="需求描述">
          <el-input type="textarea" v-model="form.description" :autosize="{minRows:10}"/>
        </el-descriptions-item>
        <el-descriptions-item label="图片">
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
import {drugHelpApi} from "@/api/api";

export default {
  name: "DrugHelpFont",
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
      drugHelpApi.add(this.form).then(() => {
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