<template>
<div class="app-container calendar-list-container">

    <!-- table数据区-->
    <Treetable 
        v-loading="listLoading" 
        :tree-structure="true" 
        :data-source="list" 
        :columns="columns"
        requestUrl="/permission/form"
        @handleDelete="handleDelete"></Treetable>

</div>
</template>

<script>
/**
 * 知识点
 1.Treetable  一次查询的数据需要 getTree(arr)进行装载

 2.父组件与子组件通讯的两种方法
(1)通过prop传递 val  function 
 父组件:  :handleDelete="handleDelete"
        props{
            handleDelete: {
                type: Function,
                default: null
            }
        }
 子组件：@click="handleDelete(scope.row.id)"

(2)通过 $emit触发
 父组件:  @handleDelete="handleDelete"
 子组件：@click="handleDelete(scope.row.id)"
        handleDelete(id) {
            this.$emit('handleDelete',id);
        }
 */

import Treetable from '@/components/Treetable' 
import { fetchList, fetchDelete, fetchBatchDelete } from '@/api'
import { getTree } from '@/utils'

export default {
    name: 'permission',
    components: { Treetable },
    data() {
        return {
            //相关代码
            columns: [{
                text: '菜单',
                dataIndex: 'name'
            },
            {
                text: '地址',
                dataIndex: 'url'
            },
            {
                text: '代码',
                dataIndex: 'code'
            },
            {
                text: '状态',
                dataIndex: 'status'
            },
            {
                text: '级别',
                dataIndex: 'level'
            },
            {
                text: '常用',
                dataIndex: 'iscommon'
            }],
            list: [], 
            //相关代码 end
            listLoading: true,
            tableKey: 0
        }
    },
    //创建
    created() {
        this.getList()
    },
    methods: {
        //获取list数据，传入筛选对象
        getList() {
            this.listLoading = true
            fetchList('/permission/list', this.listQuery).then(response => {
                this.list = getTree(response.data.args.list)
                this.listLoading = false
            })
        },
        //删除操作
        handleDelete(id) {
            fetchDelete('/permission/delete/', {id:id}).then(response => {  
                if(response.data.status){
                    this.$notify({
                        title: '成功',
                        message: response.data.msg,
                        type: 'success',
                        duration: 2000
                    })
                    this.$router.go(0)
                }else{
                    this.$notify({
                        title: '失败',
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
