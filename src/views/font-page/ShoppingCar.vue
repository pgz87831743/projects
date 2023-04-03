<template>
  <div class="p-div">
    <div style="margin: 20px 30px ">
      <el-card>
        <el-row>
          <el-col>
            <el-button type="primary" @click="submitBefore">结算</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"/>
              <el-table-column prop="goodsId" label="商品图片">
                <template #default="scope">
                  <el-image
                      style="width: 100px; height: 100px"
                      :src="scope.row.goods.cover"
                      fit="cover"
                      :preview-teleported="true"
                      :preview-src-list="[scope.row.goods.cover]"></el-image>
                </template>
              </el-table-column>
              <el-table-column prop="goods.title" label="商品标题"/>

              <el-table-column prop="createBy" label="购物人"/>
              <el-table-column prop="shopNum" label="件数"/>
              <el-table-column prop="goods.price" label="价格"/>
              <el-table-column label="总价">
                <template #default="scope">
                  {{ (scope.row.goods.price * scope.row.shopNum).toFixed(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间"/>
              >
              <el-table-column label="操作" width="300px">
                <template #default="scope">
                  <el-button size="small" type="success" @click="clickButton('update', scope.row)">修改</el-button>
<!--                  <el-button type="primary" size="small" @click="clickButton('detail', scope.row)">详情</el-button>-->
                  <el-button
                      size="small"
                      type="danger"
                      @click="clickButton('delete',scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </div>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="件数">
          <el-input-number v-model="form.shopNum" :min="1"/>
        </el-form-item>
      </el-form>
      <template #footer>
<span class="dialog-footer" v-if="!dialog.formDisabled">
<el-button @click="dialog.dialogFormVisible = false">取消</el-button>
<el-button type="success" @click="formSubmit">确认</el-button>
</span>
      </template>
    </el-dialog>


    <!--    结算弹窗-->
    <el-dialog v-model="itemDialogFormVisible" :title="'购物车结算'" @closed="dialogClose">
      <el-form :model="submitForm" label-position="right" label-width="150px">
        <el-form-item label="联系电话">
          <el-input v-model="submitForm.phone"/>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="submitForm.address"/>
        </el-form-item>
        <el-form-item label="总金额">
          <el-input v-model="submitForm.priceNum" disabled/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="itemDialogFormVisible = false">取消</el-button>
        <el-button type="success" @click="submitOrderHandle">确认</el-button>
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


</template>


<script>

import {goodsCarApi} from "@/api/api";


export default {
  name: "ShoppingCar",
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
      itemDialogFormVisible: false,
      item: [],
      submitForm: {
        address: '',
        phone: '',
        priceNum: 0
      },
      form: {},
      total: 0,
    }
  },

  methods: {

    search() {
      goodsCarApi.pageUser(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },


    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        goodsCarApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        goodsCarApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        goodsCarApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      goodsCarApi.pageUser(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        goodsCarApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        goodsCarApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
      this.submitForm = {}
    },


    handleSelectionChange(items) {
      this.item = items;
    },


    submitBefore() {
      if (this.item.length === 0) {
        return;
      }
      goodsCarApi.submitBefore(this.item)
          .then((resp) => {
            this.submitForm = resp.data.data
            this.itemDialogFormVisible = true
          })
    },

    submitOrderHandle() {
      goodsCarApi.submitOrder(this.submitForm)
          .then(() => {
            this.itemDialogFormVisible=false
            this.initTableData()
          })
    },


    initTableData() {
      goodsCarApi.pageUser(this.page)
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

