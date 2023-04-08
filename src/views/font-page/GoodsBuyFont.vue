<template>

  <div class="div">
    <el-card>
      <div class="p-div">
        <el-row>
          <el-col :span="5">
            <el-input v-model="page.search" placeholder="请输入物质分类" clearable/>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="success" @click="search">搜索</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="物资名称"/>
            <el-table-column prop="description" label="物资描述"/>

            <el-table-column prop="img" label="物资图片">
              <template #default="scope">
                <img :src="scope.row.img" width="80"/>
              </template>
            </el-table-column>

            <el-table-column prop="price" label="物资价格"/>
            <el-table-column prop="type" label="物资类型"/>
            <el-table-column prop="createTime" label="创建时间"/>
            <el-table-column prop="createBy" label="创建人"/>

            <el-table-column label="操作" width="300px">
              <template #default="scope">
                <el-button v-if="scope.row.createBy!==getUser().username" size="small" type="success"
                           @click="clickButton('buy', scope.row)">购买
                </el-button>
                <el-button
                    v-if="scope.row.createBy===getUser().username"
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
            <el-form-item label="主键">
              <el-input v-model="form.id"/>
            </el-form-item>
            <el-form-item label="物资名称">
              <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="物资描述">
              <el-input v-model="form.description"/>
            </el-form-item>
            <el-form-item label="物资图片">
              <el-input v-model="form.img"/>
            </el-form-item>
            <el-form-item label="物资价格">
              <el-input v-model="form.price"/>
            </el-form-item>
            <el-form-item label="物资类型">
              <el-input v-model="form.type"/>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="form.createTime"/>
            </el-form-item>
            <el-form-item label="创建人">
              <el-input v-model="form.createBy"/>
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
        <div class="paginationClass">
          <el-pagination
              small
              background
              :total="total"
              :page-size="5"
              @current-change="currentChange"
              layout="prev, pager, next"
          />
        </div>
      </div>
    </el-card>
  </div>


</template>


<script>

import {goodsApi, ordersApi} from "@/api/api";
import {getUser} from "@/utils/authutil";


export default {
  name: "GoodsBuyFont",
  data() {
    return {
      page: {
        pageSize: 5,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      visible: [],
      tableData: [],
      roleData: [],
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
    getUser,

    search() {
      goodsApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'buy') {

        let from = {
          goods: row
        }
        ordersApi.add(from)

      } else if (type === 'update') {
        goodsApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        goodsApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        goodsApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      goodsApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        goodsApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        goodsApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      goodsApi.page(this.page)
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

