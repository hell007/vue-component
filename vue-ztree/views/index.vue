<template>
    <div id="checkTree">
        <div class="tree-box">
            <div class="zTreeDemoBackground left">
                <ul id="treeDemo" class="ztree"></ul>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery"
import '@/vendor/jquery.ztree.all.min.js'
export default {
    name: 'role',
    components: {},
    data: function() {
        return {
            setting: {
                check: {
                    enable: true,
                    nocheckInherit: false
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                }
            },
            zNodes: [{
                id: 1,
                pid: 0,
                name: "大良造菜单",
                open: true,
                nocheck: false,
                children: [{
                    id: 11,
                    pid: 1,
                    name: "当前项目"
                }, {
                    id: 12,
                    pid: 1,
                    name: "工程管理",
                    open: true,
                    children: [{
                        id: 121,
                        pid: 12,
                        name: "我的工程"
                    }, {
                        id: 122,
                        pid: 12,
                        name: "施工调度"
                    }, {
                        id: 1211,
                        pid: 12,
                        name: "材料竞价"
                    }]
                }]
            }]
        }
    },
    methods: {

    },
    mounted() {
        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
    }
}
</script>

<style>
    @import '../../assets/ztree/ztree.css';
</style>
