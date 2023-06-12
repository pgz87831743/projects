<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span style="color: #111A32;font-size: 16px;font-weight: bold">侵害未成年人案件强制报告备案表</span>
        </div>
      </template>
      <el-form label-width="140px" label-position="right" :size="'large'">
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="报告人">
              <el-input v-model="form.bgr" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系电话">
              <el-input v-model="form.bgrTel" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="所属单位">
              <el-input v-model="form.ssdw" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="所诉科室">
              <el-input v-model="form.ssks" placeholder="请输入"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="疑似未成年被侵害人">
              <el-input v-model="form.bqhr" placeholder="请输入"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号">
              <el-input v-model="form.sfzh" placeholder="请输入"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="家庭住址">
              <el-input v-model="form.jtzz" placeholder="请输入"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系方式">
              <el-input v-model="form.bqhrLxfs" placeholder="请输入"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="10">
            <el-form-item label="法定代理人">
              <el-input v-model="form.fdlr" placeholder="请输入"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系方式">
              <el-input v-model="form.fdlrLxfs" placeholder="请输入"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="20">
            <el-form-item label="创建时间">
              <el-date-picker v-model="form.cjsj" style="width: 100%" type="date" placeholder="请选择"
                              value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="20">
            <el-form-item label="报告情形">
              <el-input type="textarea" v-model="form.bgqx" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="20">
            <el-form-item label="具体情况">
              <el-input type="textarea" v-model="form.jtqk"
                        placeholder="（包括但不限于诊疗过程中的病人自述、因由、医生诊断过程和结果等相关内容）"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="20">
            <el-form-item label="上传附件">
              <div style="width: 100%;height: 40px;background-color: #fafafa;padding: 15px">
                <el-upload
                    class="avatar-uploader"
                    action="/api/file/upload"
                    :data="{fileTypeEnum:'FILE'}"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    name="files"
                >
                  <el-button v-if="!form.file">点击上传</el-button>
                  <el-tag
                      v-if="form.file"
                      closable
                      @close="this.form.file=undefined"
                  >
                    {{fileInfo.name}}
                  </el-tag>
                </el-upload>


              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="20">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.bz" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30" :justify="'start'">
          <el-col :span="2" :offset="2">
            <el-button type="primary" @click="submitRecord">提交</el-button>
          </el-col>
          <el-col :span="2">
            <el-button>取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {recordApi} from "@/api/api";

export default {
  name: "IndexPage",
  data() {
    return {
      form: {},
      fileInfo:{}
    }
  },
  methods: {

    handleAvatarSuccess(response) {
      this.form.file = response[0].id
      this.fileInfo = response[0]
    },


    submitRecord() {
      recordApi.add(this.form)
          .then(() => {
            this.form = {}
          })
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
.el-card {
  height: 90vh;
  overflow: auto;
}
</style>