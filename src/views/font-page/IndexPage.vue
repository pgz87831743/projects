<template>
  <div class="div">
    <el-row>
      <el-col>
        <el-table :data="tableData"  height="600" style="width: 100%"
                  :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                  :cell-style="{textAlign:'center',padding:'30px'}">
          <el-table-column prop="id" label="序号"/>
          <el-table-column prop="name" label="名称"/>
          <el-table-column prop="cpu" label="cpu"/>
          <el-table-column prop="memory" label="内存">
            <template #default="scope">
              {{scope.row.memory}}GB
            </template>
          </el-table-column>
          <el-table-column prop="core" label="核数">
            <template #default="scope">
              {{scope.row.core}}核
            </template>
          </el-table-column>
          <el-table-column prop="bandwidth" label="带宽"/>
          <el-table-column prop="times" label="时长">
            <template #default="scope">
              {{scope.row.times}}年
            </template>
          </el-table-column>

          <el-table-column prop="price" label="价格">
            <template #default="scope">
              {{scope.row.price}}元
            </template>
          </el-table-column>

          <el-table-column prop="num" label="数量">
            <template #default="scope">
              {{scope.row.num}}台
            </template>
          </el-table-column>

          <el-table-column label="操作" width="300px">
            <template #default="scope">
              <el-button size="small" type="success" @click="choujiang(scope.row.id)">盲盒抽奖
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>





import {recordApi} from "@/api/api";
import router from "@/router";

export default {
  name: "IndexPage",

  data() {
    return {
      list: [],
      search:'',
      tableData:[]

    }
  },
  methods: {
    initTableData() {
      recordApi.listAll()
          .then(resp => {
            this.tableData = resp.data.data
          })
    },

    choujiang(id){
      router.push({path: '/DrawPage',query:{id:id}})
    }

  },
  mounted() {
    this.initTableData()
  },
}
</script>

<style scoped lang="scss">
.car-div {
  width: 400px;
  height: 450px;
  margin: 20px 30px;
  display: inline-block;
}

</style>