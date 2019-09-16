<template>
  <div class="kindeditor">
    <textarea 
      class="textarea" 
      ref="kindeditor" 
      v-model="localValue" 
      name="content"></textarea>
  </div>
</template>
<script>
import '../../../node_modules/kindeditor/kindeditor-all.js'
import '../../../node_modules/kindeditor/lang/zh-CN.js'
import '../../../node_modules/kindeditor/themes/default/default.css'

export default {
  name: 'kindeditor',
  props: {
    options: {
      type: Object,
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      hasChange: false,
      hasInit: false,
      localValue: ''
    }
  },
  watch: {
    localValue: 'updateValue',
    value: 'setDefault'
  },
  created() {
  },
  mounted() {
    this.initKindeditor()
  },
  methods: {
    initKindeditor() {
      var self = this
      // 默认参数
      var options = {
          uploadJson: 'http://localhost:3000/apis/article/kindeditor?flag=3',
          width: '100%',
          height: '200',
          afterCreate: function() {
            if (self.value) {
              self.localValue = self.value
            }
            self.hasInit = true
          },
          //编辑器内容发生变化后执行的回调函数
          afterChange: function() {
            self.hasChange = true
          }
        }
      // 调用外部参数
      if (self.options) {
        for (var i in self.options) {
          options[i] = self.options[i]
        }
      }

      self.editor = window.KindEditor.create(self.$refs.kindeditor, options);
    },
    // 设置初始值
    setDefault() {
      if (this.hasInit) {
        this.$nextTick(function(){
          this.localValue = this.value
        })
      }
    },
    // 修改父件的值
    updateValue() {
      if (this.hasChange && this.hasInit) {
        this.$nextTick(function(){
          this.editor.html(this.localValue)
          this.$emit('input',this.localValue)
        })
      }
    }
  }
}
</script>
