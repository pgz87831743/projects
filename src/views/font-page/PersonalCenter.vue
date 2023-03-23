<template>
  <div class="div">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-affix :offset="90">
            <el-card shadow="hover" class="box-card">
              <template #header>
                <span class="pin-lun">个人信息</span>
              </template>
              <el-row>
                <el-col >
                  <el-form class="div-form" model="form" >
                    <el-form-item >
                      <el-avatar
                          :src="form.avatar"
                          :size="75"
                      />
                      <el-upload
                          class="upload-demo"
                          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                          multiple
                          :limit="1"
                      >
                        <el-button >更换头像</el-button>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="昵称：">
                      <el-input v-model="form.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <el-radio-group v-model="form.sex">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="简介：">
                      <el-input v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="学校：">
                      <el-input v-model="form.school"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row justify="center">
                <el-col :span="6">
                  <el-button>编辑</el-button>
                </el-col>
                <el-col  :span="6">
                  <el-button>保存</el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-affix>
        </el-col>
        <el-col :span="18">
          <el-card shadow="hover" class="box-card">
            <template #header>
              <span class="pin-lun">我的资源</span>
            </template>
            <el-row>
              <el-col >
                <el-row :gutter="12">
                  <el-col v-bind:key="item.id" v-for="item in list" :span="6">
                    <div class="div">
                      <el-card shadow="hover" @click="fileDetail(item)">
                        <div>
                          <div>
                            <img :src="item.cover" height="300">
                          </div>
                          <div>
                            {{ item.title }}
                          </div>
                          <div class="card-div">
                            <div>
                              {{item.create_time}}
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
                      <el-card shadow="hover" @click="fileDetail(item)">
                        <div>
                          <div>
                            <img :src="item.cover" height="300">
                          </div>
                          <div>
                            {{ item.title }}
                          </div>
                          <div class="card-div">
                            <div>
                              {{item.create_time}}
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
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>


import {Comment, View} from "@element-plus/icons-vue";
import router from "@/router";

export default {
  name: "PersonalCenter",
  components: {Comment, View},
  data(){
    return{
      search:"",
      form:{
        name:"苍井空",
        sex:"男",
        avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      },
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
  },
  methods:{
    fileDetail(item){
      console.log(item)
      let routeData = router.resolve({ path: '/FileDetail', query: { id: item.id } });
      window.open(routeData.href, '_blank');
      // router.push({path:"/FileDetail",query:{id:item.id}})
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep(.box-card .el-card__header){
  //border: none;
}

::v-deep(.div-form){

}

.card-div{
  //background: aqua;
  height: 35px;
  margin-top: 10px;
  div{
    display: inline-block;float: left;
    height: 100%;line-height: 35px;
    margin-left: 5px;
    font-size: 10px;
  }
  div:nth-child(n+2){
    float: right;
    margin: 0 5px;
  }

}

.upload-demo{
  margin-top: 24px;
  margin-left: 10px;
}
</style>