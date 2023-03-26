<template>
  <div class="div">
    <el-card shadow="hover" >
      <template #header>
        <span class="pin-lun">文件详情</span>
      </template>
      <el-row gutter="10">

      </el-row>
    </el-card>
    <el-card shadow="hover" >
      <template #header>
        <span class="pin-lun">评论</span>
      </template>
      <div>
        <el-row >
          <el-col :span="1">
            <div><el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                :size="45"
            /></div>
          </el-col>
          <el-col :span="23">
            <div class="comment-div">
              <div>模拟哦莫哦 <span style="float: right;margin-right: 30px">2023-12-31 16:54</span></div>
              <div>新人奖励的条件是啥，第一次在掘第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划金发文章还是第一次发布关于人工智能创作者扶持计划 的文章</div>
              <div>
                      <span style="padding: 10px 0;display: inline-block;float: left">
                         <el-icon :size="30"><ChatDotSquare /></el-icon>
                      </span>
                <span style="padding: 13px 5px;display: inline-block;float: left;color: #8a919f">
                         回复
                      </span>
              </div>
              <div style="clear: both"></div>
              <div class="reply">
                <el-row>
                  <el-col :span="1">
                    <div><el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        :size="45"
                    /></div>
                  </el-col>
                  <el-col :span="23">
                    <div class="comment-div">
                      <div>模拟哦莫哦 <span style="font-size: 14px;color:#8a919f ;padding:0 12px">回复</span> 爱就是 <span style="float: right;margin-right: 30px">2023-12-31 16:54</span></div>
                      <div>新人奖励的条件是啥，第一次在掘第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划金发文章还是第一次发布关于人工智能创作者扶持计划 的文章</div>
                    </div>
                    <div>
                      <span style="padding: 10px 0;display: inline-block;float: left">
                         <el-icon :size="30"><ChatDotSquare /></el-icon>
                      </span>
                      <span style="padding: 13px 5px;display: inline-block;float: left;color: #8a919f">
                         回复
                      </span>
                    </div>
                  </el-col>
                </el-row>


              </div>
            </div>
          </el-col>
        </el-row>
        <el-divider />
        <el-row >
          <el-col :span="1">
            <div><el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                :size="45"
            /></div>
          </el-col>
          <el-col :span="23">
            <div class="comment-div">
              <div>模拟哦莫哦 <span style="float: right;margin-right: 30px">2023-12-31 16:54</span></div>
              <div>新人奖励的条件是啥，第一次在掘第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划金发文章还是第一次发布关于人工智能创作者扶持计划 的文章</div>
              <div>
                      <span style="padding: 10px 0;display: inline-block;float: left">
                         <el-icon :size="30"><ChatDotSquare /></el-icon>
                      </span>
                <span style="padding: 13px 5px;display: inline-block;float: left;color: #8a919f">
                         回复
                      </span>
              </div>
              <div style="clear: both"></div>
              <div class="reply">
                <el-row>
                  <el-col :span="1">
                    <div><el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        :size="45"
                    /></div>
                  </el-col>
                  <el-col :span="23">
                    <div class="comment-div">
                      <div>模拟哦莫哦 <span style="font-size: 14px;color:#8a919f ;padding:0 12px">回复</span> 爱就是 <span style="float: right;margin-right: 30px">2023-12-31 16:54</span></div>
                      <div>新人奖励的条件是啥，第一次在掘第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划第一次在掘金发文章还是第一次发布关于人工智能创作者扶持计划金发文章还是第一次发布关于人工智能创作者扶持计划 的文章</div>
                    </div>
                    <div>
                      <span style="padding: 10px 0;display: inline-block;float: left">
                         <el-icon :size="30"><ChatDotSquare /></el-icon>
                      </span>
                      <span style="padding: 13px 5px;display: inline-block;float: left;color: #8a919f">
                         回复
                      </span>
                    </div>
                  </el-col>
                </el-row>


              </div>
            </div>
          </el-col>
        </el-row>
        <el-divider />
      </div>
    </el-card>
  </div>
</template>

<script>




import {ChatDotSquare} from "@element-plus/icons-vue";

export default {
  name: "FileDetail",
  components: {ChatDotSquare},
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