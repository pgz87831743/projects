<template>
  <div class="p-div">
    <el-row>
      <el-col :span="1">
        <el-button type="primary" @click="clickButton('add')">新增</el-button>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input v-model="page.search" placeholder="请输入搜索内容" clearable/>
      </el-col>
      <el-col :span="1">
        <el-button type="success" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%;" :header-cell-style="{textAlign:'center'}"
                :cell-style="{textAlign:'center'}">
        <el-table-column prop="sysUser.nickname" label="用户"/>
        <el-table-column prop="cardNo" label="卡号"/>
        <el-table-column prop="amount" label="贷款金额"/>
        <el-table-column prop="amountPaid" label="已还金额"/>
        <el-table-column prop="interest" label="利息"/>
        <el-table-column label="剩余待还">
          <template #default="scope">
            {{ (scope.row.interest + scope.row.amount - scope.row.amountPaid).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="repaymentDate" label="还款日期"/>
        <el-table-column prop="createTime" label="创建时间" width="180px"/>
        <el-table-column prop="xdSh" label="信审人员">
          <template #default="scope">
            <el-tag v-if="scope.row.xdSh===null" type="info">审核中</el-tag>
            <el-tag v-if="scope.row.xdSh==='1'" type="success">通过</el-tag>
            <el-tag v-if="scope.row.xdSh==='0'" type="danger">驳回</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="cwSh" label="财务人员">
          <template #default="scope">
            <el-tag v-if="scope.row.cwSh===null" type="info">审核中</el-tag>
            <el-tag v-if="scope.row.cwSh==='1'" type="success">已放款</el-tag>
            <el-tag v-if="scope.row.cwSh==='0'" type="danger">驳回</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="postpone" label="是否逾期">
          <template #default="scope">
            <el-tag v-if="scope.row.postpone===null" type="info">暂无</el-tag>
            <el-tag v-if="scope.row.postpone==='1'" type="success">逾期</el-tag>
            <el-tag v-if="scope.row.postpone==='0'" type="danger">暂未逾期</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="还款状态">
          <template #default="scope">
            <el-tag v-if="scope.row.hkZt===null" type="info">暂无</el-tag>
            <el-tag v-if="scope.row.hkZt==='0'" type="success">已还清</el-tag>
            <el-tag v-if="scope.row.hkZt==='1'">借款中</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button v-if="scope.row.cwSh==='1' && scope.row.hkZt==='1'" size="small" type="primary" @click="clickButton('update', scope.row)">还款</el-button>
            <el-button size="small" type="success" @click="clickButton('detail', scope.row)">详情</el-button>
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
      <el-form :model="form" label-position="right" label-width="180px" :disabled="dialog.type==='detail'">

        <div v-if="this.dialog.type==='update'">
          <el-form-item label="还款金额">
            <el-input v-model="form.ret"/>
          </el-form-item>
          <el-form-item label="剩余待还"><span>{{ (form.interest + form.amount - form.amountPaid).toFixed(2) }}</span>
          </el-form-item>
        </div>

        <div v-if="this.dialog.type==='detail'">
          <el-form-item label="卡号">
            <el-input v-model="form.cardNo"/>
          </el-form-item>
          <el-form-item label="贷款金额">
            <el-input v-model="form.amount" @change="calculateInterest"/>
          </el-form-item>
          <el-form-item label="还款日期">
            <el-date-picker
                v-model="form.repaymentDate"
                type="date"
                value-format="YYYY-MM-DD"
                @change="calculateInterest"
                placeholder="请选择还款日期"
            />
          </el-form-item>
          <el-form-item label="利息"><span style="color: red">{{ form.interest }}</span></el-form-item>
          <el-form-item label="已还金额">
            <el-input v-model="form.amountPaid"/>
          </el-form-item>
          <el-form-item label="信审人员">
            <el-radio-group v-model="form.xdSh">
              <el-radio label="1">通过</el-radio>
              <el-radio label="0">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="财务人员">
            <el-radio-group v-model="form.cwSh">
              <el-radio label="1">已放款</el-radio>
              <el-radio label="0">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否逾期">
            <el-radio-group v-model="form.postpone">
              <el-radio label="1">已逾期</el-radio>
              <el-radio label="0">暂未逾期</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div v-if="this.dialog.type==='add'">
          <el-form-item label="卡号">
            <el-input v-model="form.cardNo"/>
          </el-form-item>
          <el-form-item label="贷款金额">
            <el-input v-model="form.amount" @change="calculateInterest"/>
          </el-form-item>
          <el-form-item label="还款日期">
            <el-date-picker
                v-model="form.repaymentDate"
                type="date"
                value-format="YYYY-MM-DD"
                @change="calculateInterest"
                placeholder="请选择还款日期"
            />
          </el-form-item>
          <el-form-item label="利息"><span style="color: red">{{ form.interest }}</span></el-form-item>
        </div>

      </el-form>
      <template #footer>
      <span class="dialog-footer" v-if="!dialog.formDisabled">
        <el-button @click="dialog.dialogFormVisible = false">取消</el-button>
        <el-button type="primary" v-if="this.isAdd" @click="formSubmit">确认</el-button>
        <el-button type="primary" v-if="!this.isAdd" @click="formSubmit">确认</el-button>
      </span>
      </template>
    </el-dialog>


    <!-- 分页 -->
    <div class="paginationClass">
      <el-pagination
          small
          background
          :total="total"
          @current-change="currentChange"
          layout="prev, pager, next"
      />
    </div>


  </div>


</template>


<script>

import {
  loanApplyForLoan,
  loanCalculateInterest,
  loanDeleteById,
  loanGetById,
  loanPage,
  loanRepayment,
  systemAssignRoles
} from "@/api/user";
import {ElMessageBox} from "element-plus";

export default {
  name: "DaiKuanShenQin",
  data() {
    return {
      api: '/sys/sys-user',
      page: {
        pageSize: 10,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      visible: [],
      role: {},
      tableData: [],
      roleData: [],
      dialog: {
        dialogFormVisible: false,
        optionName: '新增',
        type: null,
        formDisabled: true
      },
      form: {},
      total: 0,
    }
  },
  components: {},
  methods: {

    submitRole(row) {
      let data = {userId: row.id, roles: row.role}
      console.log(data)
      systemAssignRoles(data)
    },

    calculateInterest() {
      loanCalculateInterest(this.form)
          .then((resp) => {
            this.form.interest = resp.data.data
          })
    },


    search() {
      loanPage(this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },

    clickButton(type, row) {
      if (type === 'add') {
        this.dialog.dialogFormVisible = true
        this.dialog.optionName = '新增'
        this.dialog.formDisabled = false
        this.dialog.type = 'add'
      } else if (type === 'update') {
        loanGetById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '修改'
          this.dialog.formDisabled = false
          this.dialog.type = 'update'
          this.form = resp.data.data
        })
      } else if (type === 'detail') {
        loanGetById(row.id).then((resp) => {
          this.dialog.dialogFormVisible = true
          this.dialog.optionName = '详情'
          this.dialog.formDisabled = true
          this.dialog.type = 'detail'
          this.form = resp.data.data
        })
      } else if (type === 'delete') {

        ElMessageBox.confirm('删除该条贷款信息', '删除', {
          confirmButtonText: '确认删除',
        }).then(() => {
          loanDeleteById(row.id).then(() => {
            this.initTableData()
          })
        })
      }
    },

    currentChange(number) {
      this.page.pageNum = number
      loanPage(this.page).then(resp => {
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
      })
    },

    formSubmit() {
      this.dialog.dialogFormVisible = false
      if (this.dialog.type === 'add') {
        loanApplyForLoan(this.form)
            .then(() => {
              this.initTableData();
            })
      } else if (this.dialog.type === 'update') {
        loanRepayment(this.form)
            .then(() => {
              this.initTableData();
            })
      }
    },

    dialogClose() {
      this.form = {}
    },

    initTableData() {
      loanPage(this.page)
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
