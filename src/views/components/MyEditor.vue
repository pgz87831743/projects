<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        :editor="editor"
    />
    <Editor
        style="height: 500px; overflow-y: hidden;"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="onChange"

    />
  </div>

</template>

<script>
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'


export default {
  name: "MyEditor",
  props:['value'],
  components: {Toolbar, Editor},
  data() {
    return {
      editor: null,
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            server: '/api/file/upload',
            fieldName: 'files',
            meta: {
              fileTypeEnum: 'FILE',
            },
            customInsert(res, insertFn) {
              insertFn(res[0].url, res[0].name, res[0].url)
            },
          },
          uploadVideo: {
            server: '/api/file/upload',
            fieldName: 'files',
            meta: {
              fileTypeEnum: 'FILE',
            },
            customInsert(res, insertFn) {
              insertFn(res[0].url, res[0].name, res[0].url)
            },
          },
        }
      },
      mode: 'default',
    }
  },
  methods: {
    handleCreated(editor) {
      this.editor = Object.seal(editor)
    },

    onChange(editor) {
        this.$emit('onChange',editor.getHtml())
    },
  },

  updated() {
      if (this.value){
        this.editor.setHtml(this.value)
      }

  },



  unmounted() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  }
}
</script>

<style scoped lang="scss">

</style>