<template>
  <div class='kindeditor'>
    <textarea 
      class='textarea' 
      ref="kindeditor"
      :id="kindeditorId"></textarea>
  </div>
</template>
<script>
/**
 * kindeditor 富文本编辑器组件
 * http://kindeditor.net/doc.php
 */

import '../../../node_modules/kindeditor/kindeditor-all.js'
import '../../../node_modules/kindeditor/lang/zh-CN.js'
import '../../../node_modules/kindeditor/themes/default/default.css'

export default {
  name: 'kindeditor',
  components: {},
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object
    }
  },
  data() {
    return {
      editor: null,
      hasChange: false,
      hasInit: false,
      kindeditorId: this.id || 'vue-ke-' + +new Date()
    }
  },
  watch: {
    value(val) {
      if (this.hasChange && this.hasInit) {
        console.log('=====',val)
        this.$nextTick(() => this.editor.html(val))
      }
    }
  },
  mounted() {
    const self = this
    // 默认参数
    var options = {
      uploadJson: 'upload/image',
      width: '100%',
      height: '300',
      //设置编辑器创建后执行的回调函数
      afterCreate: function() {
        if (self.value) {
          self.editor.html(self.value)
        }
        self.hasInit = true
      },
      //编辑器内容发生变化后执行的回调函数
      afterChange: function() {
        self.hasChange = true
      },
      //编辑器失去焦点(blur)时执行的回调函数
      afterBlur: function() {
        //将编辑器的内容设置到原来的textarea控件里
        self.value = self.editor.html()
        self.editor.sync()
      }
    }
    // 调用外部参数
    if (self.options) {
        for(var i in self.options){
            options[i] = self.options[i]
        }
    }
    self.editor = window.KindEditor.create(`#${this.kindeditorId}`, options)
  },
  destroyed() {
    window.KindEditor.remove(`#${this.kindeditorId}`)
    this.editor = null
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.kindeditor {
  position: relative;
  margin-bottom: 30px;
}

.textarea {
  visibility: hidden;
  z-index: -1;
}
</style>
