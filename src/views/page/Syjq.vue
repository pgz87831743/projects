<template>
  <div>
    <el-space style="width: 100%" fill>
      <el-row>
        <el-col :span="1">
          <el-button type="primary" @click="xz">新增</el-button>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input v-model="page.search" placeholder="请输入搜索内容" clearable @clear="searchQuery"/>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" @click="searchQuery">搜索</el-button>
        </el-col>

        <el-col :span="3" :offset="1">
          <el-form-item label="分类">
            <el-select v-model="page.lx" placeholder=" " clearable="true">
              <el-option label="猫咪饮食" value="猫咪饮食" />
              <el-option label="猫咪行为" value="猫咪行为" />
              <el-option label="猫咪用品" value="猫咪用品" />
              <el-option label="狗狗饮食" value="狗狗饮食" />
              <el-option label="狗狗行为" value="狗狗行为" />
              <el-option label="狗狗用品" value="狗狗用品" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="1">
          <el-button type="primary" @click="searchQuery">搜索</el-button>
        </el-col>
      </el-row>


      <el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="title" label="标题"/>
          <el-table-column prop="lx" label="类型"/>
          <el-table-column prop="times" label="浏览次数"/>
          <el-table-column prop="createTime" label="创建时间"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >详情
              </el-button
              >
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-space>
    <el-dialog
        v-model="centerDialogVisible"
        @close="dialogClose"
        width="30%"
    >
      <template #header>
        <div class="my-header">
          {{ optionName }}
        </div>
      </template>
     <div v-if="upd">
       <el-form v-model="form" :label-width="labelWidth">
         <el-form-item label="标题">
           <el-input v-model="form.title" style="width: 220px"/>
         </el-form-item>
         <el-form-item label="发布类型">
           <el-select v-model="form.lx" placeholder=" ">
             <el-option label="饮食" value="饮食" />
             <el-option label="行为" value="行为" />
             <el-option label="用品" value="用品" />
           </el-select>
         </el-form-item>
         <el-form-item label="适用宠物">
           <el-select v-model="form.sycw" placeholder=" ">
             <el-option label="猫咪" value="猫咪" />
             <el-option label="狗狗" value="狗狗" />
           </el-select>
         </el-form-item>
       </el-form>
       <div style="border: 1px solid #ccc; margin-top: 10px">
         <!-- 工具栏 -->
         <Toolbar
             style="border-bottom: 1px solid #ccc"
             :editor="editor"
             :defaultConfig="toolbarConfig"
         />
         <!-- 编辑器 -->
         <Editor
             style="height: 400px; overflow-y: hidden"
             :defaultConfig="editorConfig"
             v-model="form.content"
             @onChange="onChange"
             @onCreated="onCreated"
         />
       </div>
     </div>

      <div v-if="!upd">
        <h1 style="font-size: 30px">{{form.title}}</h1>
        <p style="margin-top: 20px">发布日期:{{form.createTime}}&nbsp;&nbsp; 查看次数:{{form.times}} &nbsp;&nbsp;类型:{{form.sycw+form.lx}}</p>
        <el-divider />
        <p v-html="form.content"></p>
      </div>

      <template #footer  v-if="upd">
      <span class="dialog-footer">
        <el-button @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确认</el-button>
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

import {Editor, Toolbar} from '@wangeditor/editor-for-vue';
import {nextTick} from 'vue'
export default {

  name: "Syjq",
  data() {
    return {
      upd:false,
      editor: null,
      html: "<p>hello&nbsp;world</p>",
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
        placeholder: "请输入内容...",
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {}
      },
      search: '',
      form: {},
      labelWidth: 100,
      page: {
        search: '',
        lx: '',
        pageNum: 1,
        pageSize: 10,
      },
      total: null,
      centerDialogVisible: false,
      optionName: '新增',
      tableData: []
    }
  },
  components: {Editor, Toolbar},

  onBeforeUnmount() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
  methods: {

    xz(){
      this.centerDialogVisible = true
      this.upd=true
    },

    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      console.log("onChange", editor.getHtml()); // onChange 时获取编辑器最新内容
    },
    getEditorText() {
      const editor = this.editor;
      if (editor == null) return;

      console.log(editor.getText()); // 执行 editor API
    },
    printEditorHtml() {
      const editor = this.editor;
      if (editor == null) return;

      console.log(editor.getHtml()); // 执行 editor API
    },

    searchQuery() {
      this.$http.post("/feedingSkills/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    dialogClose() {
      if (this.upd){
        this.upd=false
      }else{
        this.upd=true
      }
      this.form = {}
      this.centerDialogVisible = false
    },

    handleEdit(index, row) {
      this.upd=false
      this.optionName = ''
      this.centerDialogVisible = true
      row.times=row.times+1
      this.form=row
      nextTick(()=>{
        this.$http.get("/feedingSkills/check/" + row.id)
            .then(() => {
              this.initTableData()
            })
      })

    },
    handleDelete(index, row) {
      this.$http.delete("/feedingSkills/delete/" + row.id)
          .then(() => {
            this.initTableData()
          })
    },

    currentChange(number) {
      this.page.pageNum = number
      this.$http.post("/feedingSkills/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    initTableData() {
      this.$http.post("/feedingSkills/page", this.page)
          .then(resp => {
            this.tableData = resp.data.data.records
            this.total = resp.data.data.total
          })
    },
    saveOrUpdate() {
      this.form.lx=this.form.sycw+this.form.lx
      this.$http.post("/feedingSkills/add", this.form)
          .then(() => {
            this.initTableData()
            this.dialogClose()
          })
    }
  },
  mounted() {
    this.initTableData()
  },

}
</script>


<style lang="scss" scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.paginationClass {
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
  text-align: center;
}

</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
