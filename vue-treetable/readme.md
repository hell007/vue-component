## vue-treetable

#### 注意点 

1、treetable使用的数据 data-source需要进过getTree(arr)方法装载成树结构数据

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
