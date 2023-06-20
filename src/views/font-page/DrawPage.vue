<template>
  <div class="container">
    <div class="title">盲盒抽奖</div>
    <div class="box">
      <div class="box-item" v-for="item in items" :key="item.id">
        <div class="box-item-image">
          <img :src="item.image" alt="">
        </div>
        <div class="box-item-name">{{ item.name }}</div>
      </div>
    </div>
    <div class="button" @click="draw">抽盲盒</div>
    <div class="result" v-if="showResult">
      <div class="result-title">恭喜你获得了{{result.name}}盲盒</div>
      <div class="result-image">
        <img :src="result.image" alt="">
      </div>
      <div class="result-name">{{ result.git }}</div>
    </div>
  </div>
</template>

<script>


import {recordApi} from "@/api/api";

export default {
  data() {
    return {
      id:'',
      items: [
        {
          id: 1,
          name: 'lou',
          image: 'https://picsum.photos/id/237/200/300',
          git:'七折'
        },
        {
          id: 2,
          name: 'jun',
          image: 'https://picsum.photos/id/238/200/300',
          git:'处理器数量升级'
        },
        {
          id: 3,
          name: '202',
          image: 'https://picsum.photos/id/239/200/300',
          git:'内存升级'
        },
        {
          id: 4,
          name: '057',
          image: 'https://picsum.photos/id/240/200/300',
          git:'免费延长一年时间'
        },
        {
          id: 5,
          name: '065',
          image: 'https://picsum.photos/id/241/200/300',
          git:'送虚拟机一台'
        },
        {
          id: 6,
          name: '105',
          image: 'https://picsum.photos/id/242/200/300',
          git:'谢谢惠顾'
        },
      ],
      showResult: false,
      result: {},
      item:{}
    }
  },
  methods: {
    draw() {
      const index = Math.floor(Math.random() * this.items.length)
      this.result = this.items[index]
      this.showResult = true
      if (this.result.id===1){
        this.item.price=(this.item.price*0.7).toFixed(2)
      }
      if (this.result.id===2){
        this.item.core=this.item.core+2
      }
      if (this.result.id===3){
        this.item.memory=this.item.memory+2
      }
      if (this.result.id===4){
        this.item.times=this.item.times+1
      }
      if (this.result.id===5){
        this.item.num=this.item.num+1
      }

      recordApi.updateById(this.item)

    },
    initRecord(){
      recordApi.getById(this.id)
          .then((resp)=>{
            this.item=resp.data.data
          })
    }
  },
  mounted() {
    this.initRecord()
  },
  created() {
    this.id= this.$route.query.id;
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.title {
  font-size: 36px;
  margin-bottom: 30px;
}

.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.box-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.box-item-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
}

.box-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: #409EFF;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 30px;
}

.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

.result-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.result-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
}

.result-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.result-name {
  font-size: 18px;
}
</style>
