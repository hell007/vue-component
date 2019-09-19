<template>
  <div class="kindeditor">
    <textarea class='textarea' 
      ref="kindeditor" 
      v-model="localValue" 
      name="content">
    </textarea>
  </div>
</template>

<script>
import '../../../node_modules/kindeditor/kindeditor-all.js'
import '../../../node_modules/kindeditor/lang/zh-CN.js'
import '../../../node_modules/kindeditor/themes/default/default.css'

export default {
  name: 'kindeditor',
  props: ['options', 'value'],
  data() {
    return {
      editor: null,
      hasInit: false,
      localValue: ''
    }
  },
  watch: {
    localValue: 'updateValue',
    value: 'setDefault'
  },
  mounted() {
    this.initKindeditor()
  },
  methods: {
    initKindeditor() {
      var self = this
        // 默认参数
      var options = {
          uploadJson: 'upload/image',
          width: '100%',
          height: '200',
          afterCreate() {
            self.hasInit = true
          },
          afterChange() {
            self.hasInit = false
            self.localValue = this.html()
          }
        }
        // 调用外部参数
      if (self.options) {
        for (var i in self.options) {
          options[i] = self.options[i]
        }
      }
      self.editor = window.KindEditor.create(self.$refs.kindeditor, options)
    },
    // 设置初始值
    setDefault() {
      if (this.hasInit) {
        this.editor.html(this.value)
      }
    },
    // 修改父件的值
    updateValue() {
      this.$emit('input', this.localValue)
    }
  }
}
</script>
<style scoped>
.container {
    position: relative
}
.textarea {
    visibility: hidden;
    z-index: -1;
}
</style>
