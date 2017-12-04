<template>
<div class='container editor-container'>
    <textarea class='textarea' :id="kindeditorId"></textarea>
</div>
</template>

<script>
/**
 * kindeditor 富文本编辑器组件
 * http://kindeditor.net/doc.php
 */
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
        width: {
            type: Number,
            required: false,
            default: 800
        },
        height: {
            type: Number,
            required: false,
            default: 360
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
                //console.log('=====',val)
                this.$nextTick(() => this.editor.html(val))
            }
        }
    },
    mounted() {
        const _this = this
        _this.editor = window.KindEditor.create(`#${this.kindeditorId}`, {
            width: this.width,
            height: this.height,
            autoHeightMode: true,
            uploadJson: 'http://localhost:3000/apis/article/kindeditor?flag=3',
            //设置编辑器创建后执行的回调函数
            afterCreate: function(){
                if(_this.value){
                    _this.editor.html(_this.value)
                }
                _this.hasInit = true
            },
            //编辑器内容发生变化后执行的回调函数
            afterChange: function(){
                _this.hasChange = true
            },
            //编辑器失去焦点(blur)时执行的回调函数
            afterBlur: function () {
                //将编辑器的内容设置到原来的textarea控件里
                _this.editor.sync()
            }
        })  
    },
    methods: {
        
    },
    destroyed() {
        window.KindEditor.remove(`#${this.kindeditorId}`)
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
