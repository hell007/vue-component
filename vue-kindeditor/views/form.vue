<template>
<div class="createPost-container">
    <el-form class="form-container" 
        :model="postForm" 
        :rules="formRules"
        ref="postForm">

        <!-- 富文本编辑器使用 -->
        <el-form-item label="图文详情" prop="contents">
            <div class="p-form__rich">
              <Kindeditor
                :options="options.editor"
                v-model="postForm.content"></Kindeditor>
           </div>
        </el-form-item>

        <div class="el-operator">
            <router-link to="/article/list"><el-button>取 消</el-button></router-link>
            <el-button
                @click="submitForm()"
                type="primary" class="ml-10" >提 交</el-button>
        </div>

    </el-form>

</div>
</template>

<script>
import Kindeditor from '@/components/Kindeditor' //富文本编辑器
import { fetchItem, fetchSave } from '@/api'  //api
export default {
    name: 'articleDetail',
    components: {  Kindeditor },
    data() {
        return {
            postForm: {
                id: null,
                content:'',
            },
            options: {
                editor: {}
            },
            fetchSuccess: true,
            loading: false
        }
    },
    //创建
    created() {
        if (this.isEdit) {
            this.fetchData()
        }
    },
    methods: {
        //根据id获取数据
        fetchData() {
            fetchItem('/article/edit/', this.id).then(response => {
                //console.log("fetchItem==",response)
                this.postForm = response.data.args.item
            }).catch(err => {
                this.fetchSuccess = false
                console.log(err)
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-container {
    width:800px;
    min-height: 300px;
}
</style>
