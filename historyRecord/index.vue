<template>
  <div class="demo">
    <div>{{data}}</div>
    <br />
    <div>
      <el-button @click="onEdit">修改</el-button>
      <el-button @click="onEdit2">修改</el-button>
      <el-button @click="onUndo">撤销</el-button>
      <el-button @click="onRedo">重做</el-button>
    </div>
  </div>
</template>

<script>
import HistoryRecord from './historyRecord.js'

export default {
  name: 'demo',
  components: {},
  computed: {},
  watch: {
    data: {
      handler(val) {
        if (val.storage) {
          localStorage.setItem('report', JSON.stringify(val))
        } else {
          localStorage.removeItem('report')
        }
      },
      deep: true
    }
  },
  data() {
    return {
      data: {},
      records: null
    }
  },
  methods: {
    onEdit() {
      let item = {
        id: '0dd2e94bec9a44de9c4a27df63780450',
        name: '子管理员',
        roleCode: '1784089637',
        status: 1,
        position: 0,
        dingTalkRoleId: '1784089637',
        dingTalkCorpId: null,
        appKey: '',
        permissionSubjectId: '646d785cf2764be59ff302f981e9a428',
        parentPermissionSubjectId: null,
        permissionSubjectBelongType: 'PUBLIC',
        creatorId: 'wipadmin',
        createTime: '2021-07-09 00:36:43',
        updatorId: null,
        updateTime: null,
        tenantId: ''
      }
      this.data.list.push(item)
      this.records.push(this.data)
      console.log(55, this.records)
    },
    onEdit2() {
      this.data.list[1].name = '测试'
      this.records.push(this.data)
      console.log(61, this.records)
    },
    onUndo() {
      this.data = this.records.undo()
      console.log(65, this.records)
    },
    onRedo() {
      this.data = this.records.redo()
      console.log(69, this.records)
    }
  },
  created() {
    let data = {
      storage: false,
      list: [
        {
          id: 'd0ea40e13bd3439192a30757a27c5774',
          name: '学工业务校级管理员',
          roleCode: '2164623307',
          status: 1,
          position: 0,
          dingTalkRoleId: '2164623307',
          dingTalkCorpId: null,
          appKey: '',
          permissionSubjectId: '2797218265074527a47aca63775396bd',
          parentPermissionSubjectId: null,
          permissionSubjectBelongType: 'PUBLIC',
          creatorId: 'wipadmin',
          createTime: '2021-08-23 00:43:59',
          updatorId: 'wipadmin',
          updateTime: '2021-08-23 00:44:04',
          tenantId: ''
        }
      ]
    }
    this.records = new HistoryRecord()
    this.data = this.records.init(data)
    console.log('97==', this.records)
  }
}
</script>
<style lang="scss" scoped>
.demo {
  width: 1000px;
  height: 2000px;
  margin: 0 auto;
  border: 2px solid #ddd;
  background: #fff;
}
</style>
