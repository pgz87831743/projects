<template>
  <div class="div">
    <el-carousel :interval="4000" type="card" height="350px">
      <el-carousel-item v-for="item in list.slice(0,6)" :key="item">
        <img :src="item.cover" height="350">
      </el-carousel-item>
    </el-carousel>

    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="pin-lun">热门帖</span>
        </div>
      </template>
      <div class="row-div">
        <el-row :gutter="12">
          <el-col v-bind:key="item.id" v-for="item in list.slice(0,4)" :span="6">
            <el-card shadow="hover">
              <div>
               <div>
                 <img :src="item.cover" height="300">
               </div>
                <div>
                  {{ item.title }}
                </div>
                <div class="card-div">
                  <div >
                    <el-avatar
                        :size="35"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                  </div>
                  <div>
                    {{item.create_by}}·{{item.create_time}}
                  </div>
                  <div>
                    <el-icon><View /></el-icon>
                    123
                  </div>
                  <div>
                    <el-icon><Comment /></el-icon>
                    123
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col v-bind:key="item.id" v-for="item in list.slice(4,8)" :span="6">
            <el-card shadow="hover">
              <div>
                <div>
                  <img :src="item.cover" height="300">
                </div>
                <div>
                  {{ item.title }}
                </div>
                <div class="card-div">
                  <div >
                        <el-avatar
                            :size="35"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        />
                  </div>
                  <div>
                     {{item.create_by}}·{{item.create_time}}
                  </div>
                  <div>
                    <el-icon><View /></el-icon>
                    123
                  </div>
                  <div>
                    <el-icon><Comment /></el-icon>
                    123
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>


  </div>
</template>

<script>
import {Comment, View} from "@element-plus/icons-vue";

export default {
  name: "IndexPage",
  components: {Comment, View},
  data(){
    return{
      img:require("@/assets/a.png"),
      list:[
        {
          id:"1",
          title:"从小兰子到兰姐全记录♥你永远可以相信徐江的眼光！",
          cover:"http://p2.music.126.net/k6dwo-n_fnRhCHLXUrxKtw==/109951163626916509.jpg?param=380y140",
          create_time:"2023-03-15",
          create_by:"小白天",
        },
        {
          id:"2",
          title:"前方高能！给我5分钟时间，我能拉开95%计算机学生的差距！这视频能解决你所有",
          cover:"http://p2.music.126.net/vZ5ef3WzRneTTydXSzPauQ==/109951165994871935.jpg?param=380y140",
          create_time:"2023-03-15",
          create_by:"小白天",
        },
        {
          id:"3",
          title:"小手一指，答题开始",
          cover:"http://p2.music.126.net/oeguxQDTd9usCAHSMzs_Uw==/109951162844044021.jpg?param=380y140",
          create_time:"2023-03-15",
          create_by:"小白天",
        },
        {
          id:"4",
          title:"大多数去职校学电竞的人都怎样了？这个视频给你答案！",
          cover:"http://p2.music.126.net/wRiwy65LSxv9X43B-zlBMA==/109951163550232716.jpg?param=380y140",
          create_time:"2023-03-15",
          create_by:"小白天",
        },{
          id:"5",
          title:"【渐构】万字科普GPT4为何会颠覆现有工作流；为何你要关注微软Copilot、文心一",
          cover:"http://p2.music.126.net/3qK7Q-lPqk9GcQVjgLybpg==/109951168451575486.jpg?param=380y140",
          create_time:"2023-03-15",
          create_by:"小白天",
        },{
          id:"6",
          title:"【AI绘画】革命性新插件！让AI帮你重绘成3DCG！完整教程！",
          cover:"http://p2.music.126.net/UYzz1g206izM63q65-bayQ==/109951164805247604.jpg?param=380y140",
          create_time:"2023-03-15",
          create_by:"小白天",
        },{
          id:"7",
          title:"【比刷剧还爽！】太完整了！中国科学院大学和上海交大强联合的（PyTorch+深度学",
          cover:"http://p4.music.126.net/cGTKkFl5qcXIDYPo7PrmDA==/109951168431655039.jpg?param=100y100",
          create_time:"2023-03-15",
          create_by:"小白天",
        },{
          id:"8",
          title:"【程序员老秦】从Java和C++这两个方向的就业情况来聊聊计算机行业的趋势！！！",
          cover:"http://p3.music.126.net/cyfoMG0R-I_zr2vsb-ZMoQ==/109951168311478229.jpg?param=100y100",
          create_time:"2023-03-15",
          create_by:"小白天",
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">

.card-div{
  //background: aqua;
  height: 35px;
  margin-top: 10px;
  div{
    display: inline-block;
    float: left;
  }
  div:nth-child(2){
    height: 100%;
    line-height: 35px;
    margin-left: 5px;
    font-size: 10px;
  }
  div:nth-child(n+3){
    float: right;
    font-size: 10px;
    line-height: 35px;
    margin: 0 5px;

  }
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

::v-deep(.box-card .el-card__header){
  //border: none;
}

.row-div>div{
  margin: 30px auto;
}


</style>