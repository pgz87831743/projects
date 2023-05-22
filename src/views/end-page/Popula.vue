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
      <el-col>
        <el-table :data="tableData" border height="600" style="width: 100%"
                  :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                  :cell-style="{textAlign:'center'}">
          <el-table-column width="130" prop="cityId" label="CITY_ID">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"></span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="city" label="CITY"/>
          <el-table-column width="130" prop="cityType" label="CITY_TYPE"/>
          <el-table-column width="130" prop="prType" label="PR_TYPE"/>
          <el-table-column width="130" prop="twoThousand" label="2000年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand1" label="2001年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand1)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand1}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand2" label="2002年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand2)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand2}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand3" label="2003年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand3)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand3}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand4" label="2004年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand4)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand4}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand5" label="2005年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand5)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand5}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand6" label="2006年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand6)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand6}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand7" label="2007年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand7)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand7}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand8" label="2008年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand8)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand8}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand9" label="2009年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand9)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand9}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand10" label="2010年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand10)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand10}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand11" label="2011年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand11)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand11}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand12" label="2012年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand12)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand12}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand13" label="2013年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand13)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand13}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand14" label="2014年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand14)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand14}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand15" label="2015年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand15)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand15}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand16" label="2016年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand16)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand16}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand17" label="2017年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand17)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand17}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand18" label="2018年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand18)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand18}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand19" label="2019年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand19)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand19}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand20" label="2020年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand20)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand20}}</span>
            </template>
          </el-table-column>
          <el-table-column width="130" prop="twoThousand21" label="2021年人口">
            <template #default="scope">
              <span v-if="scope.row.cityId==='-1'"><el-button type="warning"  @click="onHotMap(scope.row.twoThousand21)">生成热力图</el-button></span>
              <span v-else>{{scope.row.twoThousand21}}</span>
            </template>
          </el-table-column>

<!--          <el-table-column width="130" prop="createTime" label="创建时间"/>-->
<!--          <el-table-column width="130" prop="createBy" label="创建人"/>-->

          <el-table-column   fixed="right" label="操作" width="350px">
            <template #default="scope">
              <div v-if="scope.row.cityId!=='-1'">
                <div v-if="authShow(['USER'])">
                  <el-button size="small" type="success" @click="predictionHandle(scope.row)">人口预测</el-button>
                  <el-button size="small" type="success" @click="visualizationHandle(scope.row)">可视化</el-button>
                </div>
                <div v-if="authShow(['ADMIN'])">
                  <el-button size="small" type="success" @click="clickButton('update', scope.row)">修改</el-button>
                  <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">详情</el-button>
                  <el-button
                      size="small"
                      type="danger"
                      @click="clickButton('delete',scope.row)">删除
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column>


        </el-table>
      </el-col>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="CITY_ID">
          <el-input v-model="form.cityId" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="CITY">
          <el-input v-model="form.city" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="CITY_TYPE">
          <el-input v-model="form.cityType" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="PR_TYPE">
          <el-input v-model="form.prType" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2000年人口">
          <el-input v-model="form.twoThousand" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2001年人口">
          <el-input v-model="form.twoThousand1" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2002年人口">
          <el-input v-model="form.twoThousand2" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2003年人口">
          <el-input v-model="form.twoThousand3" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2004年人口">
          <el-input v-model="form.twoThousand4" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2005年人口">
          <el-input v-model="form.twoThousand5" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2006年人口">
          <el-input v-model="form.twoThousand6" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2007年人口">
          <el-input v-model="form.twoThousand7" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2008年人口">
          <el-input v-model="form.twoThousand8" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2009年人口">
          <el-input v-model="form.twoThousand9" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2010年人口">
          <el-input v-model="form.twoThousand10" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2011年人口">
          <el-input v-model="form.twoThousand11" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2012年人口">
          <el-input v-model="form.twoThousand12" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2013年人口">
          <el-input v-model="form.twoThousand13" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2014年人口">
          <el-input v-model="form.twoThousand14" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2015年人口">
          <el-input v-model="form.twoThousand15" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2016年人口">
          <el-input v-model="form.twoThousand16" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2017年人口">
          <el-input v-model="form.twoThousand17" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2018年人口">
          <el-input v-model="form.twoThousand18" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2019年人口">
          <el-input v-model="form.twoThousand19" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2020年人口">
          <el-input v-model="form.twoThousand20" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="2021年人口">
          <el-input v-model="form.twoThousand21" placeholder="请输入"/>
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
            large
            background
            :total="total"
            :page-size="this.page.pageSize"
            @current-change="currentChange"
            layout="total,prev, pager, next, jumper"
        />
      </div>
    </el-affix>
  </div>


</template>


<script>

import {populaApi} from "@/api/api";
import {authShow} from "@/utils/authutil";


export default {
  name: "Popula",
  data() {
    return {
      page: {
        pageSize: 10,
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
      total: 0,
    }
  },

  methods: {
    authShow,

    search() {
      populaApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    onHotMap(year){
      populaApi.hotMap(year)
          .then((resp)=>{
            console.log(resp)
          })
    },


    visualizationHandle(value){
      populaApi.visualization(value)
          .then((resp)=>{
            console.log(resp)
          })
    },

    predictionHandle(value){
      populaApi.prediction(value)
          .then((resp)=>{
            console.log(resp)
          })
    },


    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        populaApi.getById(row.cityId).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        populaApi.getById(row.cityId).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        populaApi.deleteById(row.cityId).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      populaApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        populaApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        populaApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      populaApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

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

