<template>
  <div class="p-div">
    <el-row>
      <el-col :span="7">
        <el-radio-group v-model="page.search" @change="search">
          <el-radio label="">ALL</el-radio>
          <el-radio label="table_time">By TIME</el-radio>
          <el-radio label="price">By PRICE</el-radio>
        </el-radio-group>
      </el-col>


    </el-row>
    <el-row>
      <el-table :data="tableData" border height="600" style="width: 100%"
                :header-cell-style="{textAlign:'center',fontWeight:'bold'}"
                :cell-style="{textAlign:'center',padding:'30px'}"
      >
        <el-table-column prop="name" label="Name"/>
        <el-table-column prop="price" label="Price"/>
        <el-table-column label="Time">
          <template #default="scope">
            {{ scope.row.rangStart }}-{{ scope.row.rangEnd }}&nbsp;{{ scope.row.tableTime }}
          </template>
        </el-table-column>
        <el-table-column prop="qr" label="QR" width="300">
          <template #default="scope">
            <img :src="scope.row.qr" width="180">
          </template>
        </el-table-column>
        <el-table-column label="Option" width="300px">
          <template #default="scope">
            <el-button v-if="scope.row.confirm==='yes'" color="#55c9b8" size="small" type="success"
                       @click="sendEmail(scope.row.id)"><span
                style="color: white">Send Email</span></el-button>
            <el-button v-if="scope.row.confirm==='no'&&authShow(['EMPLOYEE'])" color="#E04141FF" size="small" type="success"
                       @click="confirmHandle(scope.row.id)"><span
                style="color: white">Confirm</span></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>


    <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
      <el-form :model="form" label-position="right" label-width="150px" :disabled="dialog.formDisabled">
        <el-form-item label="主键">
          <el-input v-model="form.id" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="form.name" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="订单价格">
          <el-input v-model="form.price" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="订单时间">
          <el-input v-model="form.orderTime" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.createTime" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.createBy" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <template #footer>
<span class="dialog-footer" v-if="!dialog.formDisabled">
<el-button @click="dialog.dialogFormVisible = false">Cancel</el-button>
<el-button type="success" @click="formSubmit">Ok</el-button>
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
            layout="total,prev, pager, next, jumper"
        />
      </div>
    </el-affix>
  </div>


</template>


<script>

import {orderApi} from "@/api/api";
import {authShow} from "@/utils/authutil";


export default {
  name: "Order",
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
        optionName: 'Add',
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
      orderApi.page(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    confirmHandle(id) {
      orderApi.confirmOrder(id)
          .then(() => {
            this.initTableData()
          })
    },


    handleAvatarSuccess(response) {
      this.form.img = response[0].url
    },
    sendEmail(id) {
      orderApi.sendPdfToEmail(id)
    },

    clickButton(type, row) {
      this.dialog.optionValue = type
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = 'Add'
        this.dialog.formDisabled = false
      } else if (type === 'update') {
        orderApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = 'Update'
          this.dialog.formDisabled = false
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        orderApi.getById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = 'Info'
          this.dialog.formDisabled = true
          this.form = resp.data.data
        })
      } else if (type === 'delete') {
        orderApi.deleteById(row.id).then(() => {
          this.initTableData()
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      orderApi.page(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.optionValue === 'add') {
        orderApi.add(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.optionValue === 'update') {
        orderApi.updateById(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },


    dialogClose() {
      this.form = {}
    },

    initTableData() {
      orderApi.page(this.page)
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

