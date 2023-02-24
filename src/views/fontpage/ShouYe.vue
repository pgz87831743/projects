<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-tabs
            v-model="activity"
            type="card"
            class="demo-tabs"
            @tab-change="tabChange"
        >
          <el-tab-pane label="校园新闻" name="1">
            <el-row>
              <el-col>
                <div>
                  <h1 style="text-align: left">校园新闻</h1>
                  <el-row justify="center" v-for="item in newTableData" v-bind:key="item.id">
                    <el-col>
                      <el-card class="box-card" :style="{background:'#77C1A2'}">
                        <el-row>
                          <el-col :span="21">
                            <ul>
                              <li>发布人：{{ item.createByUser.username }}</li>
                              <li>标题：{{ item.title }}</li>
                              <li>浏览量：{{ item.times }}</li>
                            </ul>
                          </el-col>
                          <el-col :span="2">
                            <el-button type="info" v-bind:key="item.id" @click="newClick(item)">查看详细</el-button>
                          </el-col>
                          <el-col :span="1">
                            <el-button type="info" v-bind:key="item.id" @click="note(item)">留言</el-button>
                          </el-col>
                        </el-row>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="相约运动" name="2">
            <el-row>
              <el-col>
                <h1 style="text-align: left">相约运动</h1>
                <div>
                  <el-row justify="center" v-for="item in concomitantMotionData" v-bind:key="item.id">
                    <el-col>
                      <el-card class="box-card" :style="{background:'#77C1A2'}">
                        <el-row>
                          <el-col :span="21">
                            <ul>
                              <li>发起人：{{ item.createByUser.username }}</li>
                              <li>相约时间：{{ item.concomitantTime }}</li>
                              <li>相约地点：{{ item.address }}</li>
                              <li>报名人员：{{ item.concomitantPerson }}</li>
                            </ul>
                          </el-col>
                          <el-col :span="3">
                            <el-button type="info" v-bind:key="item.id" @click="enroll(item)">报名</el-button>
                          </el-col>
                        </el-row>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="运动打卡" name="3">
            <el-row>
              <el-col>
                <h1 style="text-align: left">运动打卡</h1>
                <div>
                  <el-row justify="center" v-for="item in sportsClockingData" v-bind:key="item.id">
                    <el-col>
                      <el-card class="box-card" :style="{background:'#77C1A2'}">
                        <ul>
                          <li>打卡人：{{ item.createByUser.username }}</li>
                          <li>打卡时间：{{ item.createTime }}</li>
                          <li>打卡内容：{{ item.content }}</li>
                        </ul>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>

        </el-tabs>


      </el-main>
      <el-aside width="20%">
        <el-row>
          <el-col><h1>留言</h1></el-col>
        </el-row>
        <el-row justify="center" v-for="item in tableData" v-bind:key="item.id">
          <el-col :span="22">
            <el-card class="box-card" :style="{background:'#77C1A2'}">
              <ul>
                <li>留言人：{{ item.createByFromUser.username }}</li>
                <li>留言时间：{{ item.createTime }}</li>
                <li>留内容：{{ item.content }}</li>
              </ul>
            </el-card>
          </el-col>
        </el-row>

        <!-- 分页 -->
        <div class="paginationClass">
          <el-pagination
              small
              background
              :total="total"
              :page-size="page.pageSize"
              @current-change="currentChange"
              layout="prev, pager, next"
          />
        </div>
      </el-aside>
    </el-container>
  </div>


  <el-dialog v-model="dialog.dialogFormVisible" :title="dialog.optionName" @closed="dialogClose">
    <el-form :model="form" label-position="right" label-width="150px">
      <el-form-item label="留言内容">
        <el-input v-model="form.content" type="textarea"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer" v-if="!dialog.formDisabled">
        <el-button @click="dialog.dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="formSubmit">确认</el-button>

      </span>
    </template>
  </el-dialog>


</template>


<script>
import router from "@/router";
import {userOption} from "@/store/storage";

export default {
  name: "ShouYe",
  data() {
    return {
      page: {
        pageSize: 7,
        pageNum: 1,
        tootle: 100,
        search: ''
      },
      form: {},
      tableData: [],
      newTableData: [],
      concomitantMotionData: [],
      sportsClockingData: [],
      total: 0,
      activity: '1',
      dialog: {
        dialogFormVisible: false,
      },
    }
  },
  components: {},
  methods: {


    currentChange(number) {
      this.page.pageNum = number
      this.$http.post("/yw/message-management/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    initTableData() {
      this.$http.post('/yw/message-management/page', this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    initNewTableData() {
      this.$http.get('/yw/news-management/list')
          .then(resp => {
            this.newTableData = resp.data.data
          })
    },
    initConcomitantMotionData() {
      this.$http.get('/yw/concomitant-motion/list')
          .then(resp => {
            this.concomitantMotionData = resp.data.data
          })
    },
    initSportsClockingData() {
      this.$http.get('/yw/sports-clocking/list')
          .then(resp => {
            this.sportsClockingData = resp.data.data
          })
    },
    tabChange() {
      console.log(this.activity)
      if (this.activity === '1') {
        this.initNewTableData()
      }

      if (this.activity === '2') {
        this.initConcomitantMotionData()
      }

      if (this.activity === '3') {
        this.initSportsClockingData()
      }
    },
    newClick(item) {
      router.push({path: '/NewsInfo', query: {item: JSON.stringify(item)}})
      this.$http.get('/yw/news-management/queryById/'+item.id)
    },
    note(item) {
      this.dialog.dialogFormVisible = true
      this.form.createByTo = item.createBy
      this.form.createByFrom = userOption().getUser().data.id
    },

    enroll(item) {
      this.$http.get("/yw/concomitant-motion/enroll/"+item.id)
    },
    dialogClose() {
      this.form = {}
    },

    formSubmit() {
      this.$http.post('/yw/message-management/add', this.form)
          .then(() => {
            this.tabChange()
            this.initTableData()
            this.dialog.dialogFormVisible = false
          })
    },
  },
  mounted() {
    this.initTableData()
    this.initNewTableData()
    this.initConcomitantMotionData()
    this.initSportsClockingData()
  },

}
</script>


<style lang="scss" scoped>
.el-main {
  .el-row {
    margin-top: 10px;
    text-align: left;
  }
}

.el-aside {
  height: 100vh;
  //background: #4a8aff;
  .el-row {
    margin-top: 10px;
    text-align: left;
  }
}

.paginationClass {
  position: fixed;
  bottom: 0;
  height: 30px;
  width: 100%;
  text-align: center;
}
</style>
