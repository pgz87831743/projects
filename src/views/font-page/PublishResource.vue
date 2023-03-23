<template>
  <div class="div">
    <el-card shadow="hover" >
      <template #header>
        <span class="pin-lun">文件详情</span>
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
              首页图
            </div>
          </template>
          <el-upload
            :file-list="fileList"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              list-type="picture-card"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              名称
            </div>
          </template>
          <el-input></el-input>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              简介
            </div>
          </template>
          {{item.description}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              文件
            </div>
          </template>
          <el-upload
             :file-list="fileList"
              class="upload-demo"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              list-type="text"
          >
            <el-button type="success">上传文件</el-button>
          </el-upload>

        </el-descriptions-item>


        <el-descriptions-item>
          <el-button type="success">提交</el-button>
        </el-descriptions-item>

      </el-descriptions>
    </el-card>

  </div>
</template>

<script>






import {Plus} from "@element-plus/icons-vue";

export default {
  name: "PublishResource",
  components: {Plus},

  data(){
    return{
      id:'',
      item:{
        id:"4",
        title:"大多数去职校学电竞的人都怎样了？这个视频给你答案！",
        description:"1、params由于动态路由也是传递params的，所以在 this.$router.push() 方法中path1、params由于动态路由也是传递params的，所以在 this.$router.push() 1、params由于动态路由也是传递params的，所以在 this.$router.push() 1、params由于动态路由也是传递params的，所以在 this.$router.push() 1、params由于动态路由也是传递params的，所以在 this.$router.push() 1、params由于动态路由也是传递params的，所以在 this.$router.push() 1、params由于动态路由也是传递params的，所以在 this.$router.push() 不能和params一起使用，否则params将无效。需要用name来指定页面 作者：",
        cover:"http://p2.music.126.net/wRiwy65LSxv9X43B-zlBMA==/109951163550232716.jpg?param=380y140",
        create_time:"2023-03-15",
        create_by:"小白天",
      },
      fileList:[
        {
          name: 'food.jpeg',
          url: 'http://p2.music.126.net/wRiwy65LSxv9X43B-zlBMA==/109951163550232716.jpg?param=380y140',
        }
      ]
    }
  },
  methods: {

  },
  created() {
    this.id=this.$route.query.id
  }
}
</script>

<style scoped lang="scss">

.reply{
  background: #f9fafb;
}

.comment-div{
  div{
    margin: 10px 0;
  }
}
.el-row-div{
  margin-top: 20px;
}

</style>