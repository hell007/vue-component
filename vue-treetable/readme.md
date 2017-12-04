## vue-treetable

#### 注意点 

1、treetable使用的数据 data-source需要进过getTree(arr)方法装载成树结构数据

2、list数据

>后台返回
list:[
      {
        "id": "1",
        "pid": "0",
        "name": "系统管理"
      },
      {
        "id": "2",
        "pid": "1",
        "name": "菜单栏目"
      },
      {
        "id": "3",
        "pid": "2",
        "name": "菜单列表"
      },
      {
        "id": "4",
        "pid": "2",
        "name": "菜单添加"
      },
      {
        "id": "5",
        "pid": "2",
        "name": "菜单修改"
      },
      {
        "id": "6",
        "pid": "2",
        "name": "菜单保存"
      },
      {
        "id": "7",
        "pid": "2",
        "name": "菜单删除"
      }
    ]
> getTree(list)  自行打印查看

   

##### utils  index.js
  /**
   * 获取树
   * [getTree description]
   * @param  {[type]} nodes [description]
   * @return {[type]}       [description]
   */
  export function getTree(nodes) {
      let map = {},
          node, roots = []
      for (let i = 0; i < nodes.length; i += 1) {
          node = nodes[i];
          node.children = [];
          map[node.id] = i;
          if (node.pid != 0) {
              nodes[map[node.pid]].children.push(node);
          } else {
              roots.push(node);
          }
      }
      return roots;
  }
