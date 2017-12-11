<template>
<div class="ztree-container">
	<div class="zTreeDemoBackground left" v-if='dataSource.length>0'>
		<ul class="ztree">
			<ztree-item 
				v-for="(item, index) in dataSource"
				:key="item.id"
				:model.sync="item" 
				:num.sync="index" 
				root='0' 
				:nodes.sync="dataSource.length" 
				:callback="func" 
				:trees.sync="dataSource"></ztree-item>
		</ul>
	</div>
</div>
</template>

<script>
import Vue from 'vue'
export default{
    name: 'Ztree',
	data(){
        return {
            dataSource:[]
        }
	},
	props:{
		// 树数据
        list:{
       	  	type: Array,
       	  	default: []
        },
        // 点击节点回调
		func:{
			type: Function,
			default: null
		},
		// 点击展开回调
		expand:{
            type: Function,
            default: null
		},
		// 是否展开
		isOpen:{
			type: Boolean,
			default: false
		}
	},
	watch:{
        'list': {
            handler:function(){
            	this.initTreeData();
            },
            deep:true
        }
	},
	methods:{
        initTreeData(){
            var tempList = JSON.parse(JSON.stringify(this.list))
            // 递归操作，增加删除一些属性。比如: 展开/收起
            var recurrenceFunc = (data) => {
                data.forEach((m)=>{
                    if(!m.hasOwnProperty("clickNode")){
	                    m.clickNode = m.hasOwnProperty("clickNode") ? m.clickNode : false
	                }
                    if(!m.hasOwnProperty("checkedNode")){
                        m.checkedNode = m.hasOwnProperty("checkedNode") ? m.checkedNode : false
                    }
                    m.children = m.children || []
            
                    if(	!m.hasOwnProperty("isFolder") ) {
	               		m.isFolder =  m.hasOwnProperty("open") ? m.open : this.isOpen
	                }
	                if(	!m.hasOwnProperty("isExpand") ) {
	               		m.isExpand =  m.hasOwnProperty("open") ? m.open : this.isOpen
	               	}
                    if( !m.hasOwnProperty("isFoucus") ) {
                        m.isFoucus =  false
                    }
	               	//m.loadNode = 0
	               	
	               	recurrenceFunc(m.children) 
                })
            };
            recurrenceFunc(tempList)
            this.dataSource = tempList

            console.log('this.dataSource=',this.dataSource)
        }
	},
	components:{
		// 组件
        ztreeItem:{
        	name: 'ztreeItem',
        	props: {
        		model:{
        			type: Object,
        			default: {}
        		},
        		num:{
                    type: Number,
                    default: 0
        		},
        		nodes:{
                    type: Number,
                    default: 0
        		},
        		trees:{
		       	  	type: Array,
		       	  	default: []
		        },
        		root:{
                    type: String,
                    default: ''
        		},
        		callback:{
					type: Function,
					default: null
				},
				expandfunc:{
					type: Function,
					default: null
				},
				cxtmenufunc:{
					type: Function,
					default: null
				}
        	},
        	methods:{
                //设置选中项
                handleChecked(model){
                    

                    let recurFunc = (data,model) => {
                        const item =  model.children || []
                        model.checkedNode = !model.checkedNode                      
                        if(item.length>0){
                            item.forEach((i) => {
                                if(model.checkedNode){
                                    i.checkedNode = true
                                }else{
                                    i.checkedNode = false
                                }
                                if(i.children.length>0){
                                   i.children.forEach((ii) => {
                                        if(model.checkedNode){
                                            ii.checkedNode = true
                                        }else{
                                            ii.checkedNode = false
                                        }
                                    })
                                }
                            })
                        }else{
                            data.forEach((it) => {
                                if(model.pid==it.id){
                                    if(model.checkedNode){
                                        it.checkedNode = true
                                    }else{
                                        it.checkedNode = false
                                    }
                                }
                                if(it.children.length>0){
                                   it.children.forEach((ii) => {
                                        if(model.checkedNode){
                                            ii.checkedNode = true
                                        }else{
                                            ii.checkedNode = false
                                        }
                                    })
                                }
                            })
                        }
                    }

                    recurFunc(this.trees,model)

                    console.log("原始数据==",this.trees)

                    /*const item =  model.children || []
                    model.checkedNode = !model.checkedNode

                    console.log("model.checkedNode==",model.checkedNode)
                    
                    if(item.length>0){
                        item.forEach((i) => {
                            if(model.checkedNode){
                                i.checkedNode = true
                            }else{
                                i.checkedNode = false
                            }
                            if(i.children){
                               recurFunc(i.children,i)
                            }
                        })
                    }else{
                        this.trees.forEach((it) => {
                            if(model.pid==it.id){
                                if(model.checkedNode){
                                    it.checkedNode = true
                                }else{
                                    it.checkedNode = false
                                }
                            }
                        })
                    }*/
                    
                },
                Func(m){
                    // 查找点击的子节点
                    var recurFunc = (data,list) => {
                        data.forEach((i)=>{
                            if(i.id==m.id){
                                i.clickNode = true
                                i.checkedNode = !i.checkedNode 
                                if(typeof this.callback == "function") {
				                    this.callback.call(null,m,list,this.trees)
				                }
                            }else {
                              i.clickNode = false
                            }
                            if(i.children){
                               recurFunc(i.children,i)
                            }
                        })
                    }
                    recurFunc(this.trees,this.trees)
                },
                open(m){
                	//
                	m.isExpand = !m.isExpand
           
                	if(typeof this.expandfunc == "function" && m.isExpand) {
                		if(m.loadNode!=2) {
		                	//
		                    this.expandfunc.call(null,m);
		                }else {
		                	m.isFolder = !m.isFolder;
		                }
	                } else {
                        m.isFolder = !m.isFolder;
	                }
                },
                handleFoucus(m){
                    m.isFoucus = !m.isFoucus
                },
                handleBlur(m){
                    m.isFoucus = !m.isFoucus
                }
        	},
        	computed:{
        		// 给（根 和 子树）赋值不同的样式
                rootClass(){
                	 var strRootClass = '';
                     
                     // 根判断
                	 if(this.root=='0'){
                       strRootClass =  (this.num==0 && this.model.children.length==0) ? "roots_docu" : (this.nodes==1) || (this.num==0 && this.nodes!=this.num+1) ? 
                         "root_" : (this.nodes == this.num+1) ? "bottom_" : "center_";
                     
                     // 子树判断
                	 }else if(this.root=='1') {
                        strRootClass =  this.nodes>1 && this.model.children.length>0 && this.nodes!=this.num+1
                         ? "center_" : 
                            (this.num == 0 && this.nodes>1) || (this.nodes!=this.num+1) ? "center_docu" : 
                                 this.nodes == 1&&this.num!=0 || (this.nodes==this.num+1 && this.model.children.length>0)   ? "bottom_" : "bottom_docu";
                	 }
                	 return  strRootClass
                },
                // 是否有儿子节点
                isChildren(){
                     return this.num+1 != this.nodes;
                },
                // 展开/收起
                prefixClass(){
                	var returnChar = "";
                	if(this.rootClass.indexOf("docu")==-1){
	                	if(this.model.isFolder){
                           returnChar = "open";
	                	}else {
                           returnChar = 'close'
	                	}
	                }
	                if(this.model.children.length==0 && this.rootClass.indexOf("docu")==-1){
                        returnChar = 'docu'
	                }
	               
	                return returnChar;
                },
                liClassVal(){
                	 return "level"+this.num;
                },
                spanClassVal(){
                	 return "button level"+this.num+" switch "+this.rootClass+this.prefixClass;
                },
                spanClassVal2(){ 
                    if(this.model.checkedNode){
                        return this.model.isFoucus ? "button chk button chk checkbox_true_full_focus" : "button chk button chk checkbox_true_full";
                    }else{
                     return this.model.isFoucus ? "button chk button chk checkbox_false_full_focus" : "button chk button chk checkbox_false_full";
                    }
                    
                },
                aClassVal(){
                     return this.model.clickNode ? "level"+this.num+' curSelectedNode':"level"+this.num;
                },
                ulClassVal(){
                	return this.isChildren && this.model.children.length>0 ?"level"+this.num+' line':"level"+this.num;
                }
        	},
            template: 
            `<li :class="liClassVal">
				<span 
                    :class="spanClassVal" 
                    @click='open(model)'></span>
				<a 
                    :class="aClassVal" 
                    @click='handleChecked(model)'>

                    <span 
                        :class="spanClassVal2"
                        @mouseover='handleFoucus(model)'
                        @mouseout='handleBlur(model)' ></span>

					<span class="node_name">
                        {{model.name}}
                    </span>
				</a>
				<ul 
                    :class="ulClassVal" 
                    v-show='model.isFolder'>

					<ztree-item 
                        v-for="(item,i) in model.children" 
                        :key='i' 
                        :model.sync="item" 
                        :num.sync='i' 
                        root='1'
                        :nodes.sync='model.children.length' 
                        :trees.sync='trees'
                        :callback='callback' 
                        :expandfunc='expandfunc' 
                        :cxtmenufunc='cxtmenufunc'></ztree-item>
				</ul>
			</li>`
		}
	},
	update(){
		this.initTreeData();
	},
	mounted(){
		Vue.nextTick(()=>{
			this.initTreeData();
		})
	}
}
</script>

<style>
.ztree-container{height:380px}
.ztree-container div.left{float:left;width:100%}
div.zTreeDemoBackground{width:100%;height:500px;text-align:left}
ul.ztree{border:1px solid #ddd;background:#fff;width:100%;height:auto;overflow-y:scroll;overflow-x:auto}
.ztree *{padding:0;margin:0;font-size:14px;font-family:Verdana,Arial,Helvetica,AppleGothic,sans-serif}
.ztree{margin:0;padding:5px;color:#333}
.ztree li{position:relative;padding:0;margin:0;list-style:none;text-align:left;white-space:nowrap;outline:0}
.ztree li ul{margin:0;padding:0 0 0 18px}
.ztree li ul.line{background:url(../../assets/images/ztree/line_conn.gif) 0 0 repeat-y}
.ztree li a{padding:1px 3px 0 0;margin:0;cursor:pointer;height:17px;color:#333;background-color:transparent;text-decoration:none;vertical-align:top;display:inline-block}
.ztree li a:hover{text-decoration:underline;color:#00f}
.ztree li a.curSelectedNode{padding-top:0;opacity:.8}
.ztree li a.curSelectedNode_Edit{padding-top:0;background-color:#FFE6B0;color:#000;height:16px;border:1px #FFB951 solid;opacity:.8}
.ztree li a.tmpTargetNode_inner{padding-top:0;background-color:#316AC5;color:#fff;height:16px;border:1px #316AC5 solid;opacity:.8;filter:alpha(opacity=80)}
.ztree li a input.rename{height:14px;width:80px;padding:0;margin:0;font-size:12px;border:1px #7EC4CC solid}
.ztree li span{line-height:16px;margin-right:2px}
.ztree li span.button{line-height:0;margin:0;width:16px;height:16px;display:inline-block;vertical-align:middle;border:0 none;cursor:pointer;outline:0;background-color:transparent;background-repeat:no-repeat;background-attachment:scroll;background-image:url(../../assets/images/ztree/zTreeStandard.png)}
.ztree li span.button.chk{width:13px;height:13px;margin:0 3px 0 0;cursor:auto}
.ztree li span.button.chk.checkbox_false_full{background-position:0 0}
.ztree li span.button.chk.checkbox_false_full_focus{background-position:0 -14px}
.ztree li span.button.chk.checkbox_false_part{background-position:0 -28px}
.ztree li span.button.chk.checkbox_false_part_focus{background-position:0 -42px}
.ztree li span.button.chk.checkbox_false_disable{background-position:0 -56px}
.ztree li span.button.chk.checkbox_true_full{background-position:-14px 0}
.ztree li span.button.chk.checkbox_true_full_focus{background-position:-14px -14px}
.ztree li span.button.chk.checkbox_true_part{background-position:-14px -28px}
.ztree li span.button.chk.checkbox_true_part_focus{background-position:-14px -42px}
.ztree li span.button.chk.checkbox_true_disable{background-position:-14px -56px}
.ztree li span.button.chk.radio_false_full{background-position:-28px 0}
.ztree li span.button.chk.radio_false_full_focus{background-position:-28px -14px}
.ztree li span.button.chk.radio_false_part{background-position:-28px -28px}
.ztree li span.button.chk.radio_false_part_focus{background-position:-28px -42px}
.ztree li span.button.chk.radio_false_disable{background-position:-28px -56px}
.ztree li span.button.chk.radio_true_full{background-position:-42px 0}
.ztree li span.button.chk.radio_true_full_focus{background-position:-42px -14px}
.ztree li span.button.chk.radio_true_part{background-position:-42px -28px}
.ztree li span.button.chk.radio_true_part_focus{background-position:-42px -42px}
.ztree li span.button.chk.radio_true_disable{background-position:-42px -56px}
.ztree li span.button.switch{width:18px;height:18px}
.ztree li span.button.root_open{background-position:-92px -54px}
.ztree li span.button.root_close{background-position:-74px -54px}
.ztree li span.button.roots_open{background-position:-92px 0}
.ztree li span.button.roots_close{background-position:-74px 0}
.ztree li span.button.center_open{background-position:-92px -18px}
.ztree li span.button.center_close{background-position:-74px -18px}
.ztree li span.button.bottom_open{background-position:-92px -36px}
.ztree li span.button.bottom_close{background-position:-74px -36px}
.ztree li span.button.noline_open{background-position:-92px -72px}
.ztree li span.button.noline_close{background-position:-74px -72px}
.ztree li span.button.root_docu{background:0 0}
.ztree li span.button.roots_docu{background-position:-56px 0}
.ztree li span.button.center_docu{background-position:-56px -18px}
.ztree li span.button.bottom_docu{background-position:-56px -36px}
.ztree li span.button.noline_docu{background:0 0}
.ztree li span.button.ico_open{margin-right:2px;background-position:-110px -16px;vertical-align:top}
.ztree li span.button.ico_close{margin-right:2px;background-position:-110px 0;vertical-align:top}
.ztree li span.button.ico_docu{margin-right:2px;background-position:-110px -32px;vertical-align:top}
.ztree li span.button.edit{margin-right:2px;background-position:-110px -48px;vertical-align:top}
.ztree li span.button.remove{margin-right:2px;background-position:-110px -64px;vertical-align:top}
ul.tmpTargetzTree{background-color:#FFE6B0;opacity:.8;filter:alpha(opacity=80)}
span.tmpzTreeMove_arrow{width:16px;height:16px;display:inline-block;padding:0;margin:2px 0 0 1px;border:0 none;position:absolute;background-color:#fff;background-repeat:no-repeat;background-attachment:scroll;background-position:-110px -80px;background-image:url(../../assets/images/ztree/zTreeStandard.png)}
ul.ztree.zTreeDragUL{margin:0;padding:0;position:absolute;width:auto;height:auto;overflow:hidden;background-color:#cfcfcf;border:1px #00B83F dotted;opacity:.8;filter:alpha(opacity=80)}
.zTreeMask{z-index:10000;background-color:#cfcfcf;opacity:0;filter:alpha(opacity=0);position:absolute}
</style>
