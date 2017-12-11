
<template>
<div style='width:280px;'>
    <div style="height:100px"></div>
    <Ztree 
        :list='list' 
        :func='nodeClick' 
        :is-open='true'></Ztree>
</div>
</template>


<script>
import Ztree from '@/components/Ztree'
export default {
    name: 'role',
    components: {
        Ztree
    },
    data() {
        return {
            list: [ 
            {
                id: 2,
                pid: 0,
                name: "视频",
                children: [{
                    id: 3,
                    pid: 2,
                    name: "电影",
                    children: [{
                        id: 4,
                        pid: 3,
                        name: "国产电影"
                    }, {
                        id: 5,
                        pid: 3,
                        name: "好莱坞电影"
                    }, {
                        id: 6,
                        pid: 3,
                        name: "小语种电影"
                    }]
                }, 
                {
                    id: 7,
                    pid: 2,
                    name: "短片",
                    children: [{
                        id: 9,
                        pid: 7,
                        name: "电视剧"
                    }, {
                        id: 10,
                        pid: 7,
                        name: "小视频"
                    }]
                }]
            }]
        }
    },
    methods: {
        nodeClick: function(m) {
            //console.log(JSON.parse(JSON.stringify(m)));
        }
    }
}
</script>

