<template>
<el-table
    :data="data"
    border
    style="width:100%"
    :row-style="showTr">

    <el-table-column 
        v-for="(column, index) in columns" 
        :width="setWidth(index)"
        :key="column.dataIndex"
        :label="column.text" :type="column.type">
      <template slot-scope="scope">
        <span class="ms-tree-space" 
            v-if="spaceIconShow(index)" 
            v-for="(space, levelIndex) in scope.row._level"></span>
        <b v-if="toggleIconShow(index,scope.row)" 
            @click="toggle(scope.$index)">
            <i v-if="!scope.row._expanded" 
                class="el-icon el-icon-arrow-right" 
                aria-hidden="true"></i>
            <i v-if="scope.row._expanded" 
                class="el-icon el-icon-arrow-right el-table__expand-icon--expanded" 
                aria-hidden="true"></i>
        </b>
        <span v-else-if="index===0" 
            class="ms-tree-space"></span>
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>

    <el-table-column width="160" align="center" label="操作" v-if="treeType === 'normal'" >
        <template slot-scope="scope">
            <router-link 
                :to="{path:requestUrl, query:{id: scope.row.id}}"
                class="mr-10">
                <el-button size="small" type="success" >修改</el-button>
            </router-link>
            <el-button 
                size="small" 
                type="danger" 
                @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script>
import DataTransfer from './dataTransfer.js'
export default {
    name: 'Treetable',
    props: {
        // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
        treeStructure: {
            type: Boolean,
            default: false
        },
        // 相应的字段展示
        columns: {
            type: Array,
            default: []
        },
        // 数据源
        dataSource: {
            type: Array,
            default: []
        },
        // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
        requestUrl: {
            type: String,
            default: ''
        },
        //删除方法通过prop传递
        /*handleDelete: {
            type: Function,
            default: null
        },*/
        // 是否展示操作列
        treeType: {
            type: String,
            default: 'normal'
        },
        // 是否默认展开所有树
        defaultExpandAll: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {}
    },
    computed: {
        // 格式化数据源
        data: function() {
            let self = this 
            if(self.treeStructure) {
                let data = DataTransfer.treeToArray(self.dataSource, null, null, self.defaultExpandAll)
                return data
            }
            return self.dataSource
        }
    },
    methods: {
        // 显示行
        showTr: function(row, index) {
            let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
            row._show = show
            return show ? '' : 'display:none;'
        },
        // 展开下级
        toggle: function(trIndex) {
            let self = this
            let record = self.data[trIndex]
            record._expanded = !record._expanded
        },
        // 显示层级关系的空格和图标
        spaceIconShow(index) {
            let self = this
            if(self.treeStructure && index === 0) {
                return true
            }
            return false
        },
        // 设置列的宽度
        setWidth(index){
            let w
            switch(index){
                case 0:
                    w = 360
                case 1: case 2:
                    w = 220
            }
            return w
        },
        // 点击展开和关闭的时候，图标的切换
        toggleIconShow(index, record) {
            let self = this
            if(self.treeStructure && index === 0 && record.children && record.children.length > 0) {
                return true
            }
            return false
        },
        // $emit触发删除操作
        handleDelete(id) {
            this.$emit('handleDelete',id);
        }
    }
}
</script>

<style scoped>
.ms-tree-space{position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
}
.ms-tree-space::before{
    content: ""
}
.el-table__expand-icon--expanded {
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
}
</style>
