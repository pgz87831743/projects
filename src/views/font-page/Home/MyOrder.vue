<template>
<div>
  <div class="orderdiv">
    <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
        :cell-style="{textAlign:'center',padding:'30px'}"
    >
      <el-table-column prop="time" label="Time" />
      <el-table-column prop="place" label="Place"  />
      <el-table-column prop="activity" label="Activity" />
      <el-table-column prop="price" label="Price" />
      <el-table-column prop="status" label="Status" />
      <el-table-column >
        <template #default="scope">
          <el-button style="background: #ff5f5f;color: #ffffff" @click="cancelHandle(scope)">Cancel</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: "MyOrder",
  data(){
    return{
      tableData:[
        {
          time:"2023-3-16 10:00",
          place:"Swimming pool",
          activity:"General",
          price:"$15",
          status:"Down",
        },
        {
          time:"2023-3-16 17:00",
          place:"Fitness Room",
          activity:"General",
          price:"$35",
          status:"Down",
        }
      ]
    }
  },
  methods:{
    cancelHandle(scope){
      console.log(scope);
    }
  }
}
</script>

<style scoped lang="scss">

.orderdiv{
  margin: 30px 20px;
}

</style>