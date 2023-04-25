<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="clickButton('add')">新增</el-button>
      </el-col>
            <el-col :span="5" :offset="1">
              <el-input v-model="page.search" placeholder="请输入城市名称" clearable @clear="this.initTableData"/>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="success" @click="search">搜索</el-button>
            </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" border height="450" style="width: 100%">
        <el-table-column prop="id" label="城市ID"/>
        <el-table-column prop="name" label="名称"/>
        <el-table-column prop="timeInfo" label="时间"/>
        <el-table-column prop="avatar" label="图片">
          <template #default="scope">
            <img :src="scope.row.img" width="100">
          </template>
        </el-table-column>
        <el-table-column prop="location" label="位置"/>
        <el-table-column prop="area" label="面积"/>
        <el-table-column label="人口信息">
          <template #default="scope">
            <el-popover  effect="light" trigger="hover" placement="top" width="auto"
                        @show="populationHandle(scope.row.populationId)">
              <template #default>
                <div v-if="this.population">
                  <div>人口数量: {{this.population.total }}</div>
                  <div>人口密度: {{ this.population.density }}</div>
                  <div>年龄分布0-14: {{ this.population.ageGroupOne}}</div>
                  <div>年龄分布15-64: {{ this.population.ageGroupTwo }}</div>
                  <div>年龄分布65以上: {{this.population.ageGroupThree }}</div>
                </div>
                <div v-else>
                  <div>暂未绑定信息</div>
                </div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.name }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column  label="经济信息">
          <template #default="scope">
            <el-popover  effect="light" trigger="hover" placement="top" width="auto"
                         @show="economyHandle(scope.row.economyId)">
              <template #default>
                <div v-if="this.economy">
                  <div>GDP(亿): {{this.economy.total }}</div>
                  <div>GDP增长率: {{this.economy.gdpGrowthRate }}</div>
                  <div>人均GDP: {{this.economy.perCapitaGdp }}</div>
                  <div>人均可支配收入: {{this.economy.disposableIncome }}</div>
                  <div>通货膨胀率: {{this.economy.inflationRate }}</div>
                  <div>失业率: {{this.economy.unemploymentRate }}</div>
                </div>
                <div v-else>
                  <div>暂未绑定信息</div>
                </div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.name }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="地理信息">

          <template #default="scope">
            <el-popover  effect="light" trigger="hover" placement="top" width="auto"
                         @show="geographyHandle(scope.row.geographyId)">
              <template #default>
                <div v-if="this.geography">
                  <div>地形: {{this.geography.terrain }}</div>
                  <div>交通: {{this.geography.transportation }}</div>
                  <div>气候: {{this.geography.climate }}</div>
                  <div>纬度: {{this.geography.latitude }}</div>
                  <div>经度: {{this.geography.longitude }}</div>
                </div>
                <div v-else>
                  <div>暂未绑定信息</div>
                </div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.name }}</el-tag>
              </template>
            </el-popover>
          </template>

        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button size="small" type="success" @click="clickButton('update', scope.row)">修改</el-button>
            <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">详情</el-button>
            <el-button
                size="small"
                type="danger"
                @click="clickButton('delete',scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
              class="avatar-uploader"
              action="/api/file/upload"
              :data="{fileTypeEnum:'FILE'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name="files"
          >
            <img v-if="form.img" :src="form.img" width="100"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker  v-model="form.timeInfo" value-format="YYYY-MM-DD"></el-date-picker>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="form.location" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="面积">
          <el-input type="number" v-model="form.area" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <template #footer>
<span class="dialog-footer" v-if="!dialog.formDisabled">
<el-button @click="dialog.dialogFormVisible = false">取消</el-button>
<el-button type="success" @click="formSubmit">确认</el-button>
</span>
      </template>
    </el-dialog>


    <!-- 分页 -->
    <el-affix position="bottom" :offset="20">
      <div class="paginationClass">
        <el-pagination
            small
            background
            :total="total"
            :page-size="this.page.pageSize"
            @current-change="currentChange"
            layout="prev, pager, next"
        />
      </div>
    </el-affix>
  </div>


</template>


<script>

import {cityApi, economyApi, geographyApi, populationApi} from "@/api/api";
import {Plus} from "@element-plus/icons-vue";


export default {
  name: "City",
  components: {Plus},
  data() {
    return {
      page: {
        pageSize: 5,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      tableData: [],
      dialog: {
        dialogFormVisible: false,
        optionName: '新增',
        formDisabled: true,
        optionValue: null
      },
      form: {},
      population: {},
      economy: {},
      geography: {},
      total: 0,
    }
  },

  methods: {

    search() {
      cityApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    handleAvatarSuccess(response) {
      this.form.img = response[0].url
    },

    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        cityApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        cityApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        cityApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      cityApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        cityApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        cityApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      cityApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    populationHandle(id) {
      populationApi.getById(id)
          .then((resp) => {
            if (resp.data.data==null){
              this.population=null
            }else{
              this.population = resp.data.data
            }
          })
    },
    economyHandle(id) {
      economyApi.getById(id)
          .then((resp) => {
            if (resp.data.data==null){
              this.economy=null
            }else{
              this.economy = resp.data.data
            }
          })
    }  ,
    geographyHandle(id) {
      geographyApi.getById(id)
          .then((resp) => {
            if (resp.data.data==null){
              this.geography=null
            }else{
              this.geography = resp.data.data
            }
          })
    }

  },
  mounted() {
    this.initTableData()
  },

}
</script>


<style lang="scss" scoped>
.el-row:nth-child(1) {
  margin-top: 0;
}

.el-row {
  margin-top: 30px;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.paginationClass {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  text-align: center;
}


.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

</style>

