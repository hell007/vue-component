<!--
 * @Description:data-table / custom-filter 结合
 * @Author: zenghua.wang
 * @Date: 2022-12-26 10:22:48
 * @LastEditors: zenghua.wang
 * @LastEditTime: 2024-03-29 07:59:06
-->
<template>
  <data-table
    ref="customTable"
    :loading="state.loading"
    :options="state.options"
    :data="state.data"
    :page-data="state.pageData"
    :show-form="state.showForm"
    :form-options="state.formOptions"
    @reload="loadData"
    @row-click="onRowClick"
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
    @on-view="onView"
    @on-delete="(row: any) => onDelete([row])"
    @on-save="onSave"
  >
    <!-- 搜索条件插槽  -->
    <template #slot1="{ query }">
      <el-input
        v-model="query.testSlot1"
        placeholder="请输入"
        :style="{ width: state.options.searchComponentWidth }"
      />
    </template>
    <template #slotSearch="{ query }">
      <el-input
        v-model="query.testSlot1"
        placeholder="请输入"
        :style="{ width: state.options.searchComponentWidth }"
      />
    </template>

    <!-- 列插槽 -->
    <template #summary="{ row }">
      <!-- <template #summary="{ row, column, index }"> -->
      <!-- <span>{{ row.summary }} {{ column }} {{ index }}</span> -->
      <span v-html="row.summary"></span>
    </template>
  </data-table>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue';
// import vueDataTable from '@/components';
import { isEmpty, sleep, dateFormat } from '@/utils';

const app = getCurrentInstance()?.appContext.config.globalProperties;
/**
 * 代理对象
 */
const customTable = ref<any>(null);
const state = reactive<any>({
  loading: false,
  options: {
    header: {
      slotHeader: null,
      title: 'data-table案列'
    },
    showForm: true,
    labelWidth: 100,
    addBtn: true,
    delBtn: true,
    viewBtn: true,
    editBtn: true,
    columnBtn: true,
    refreshBtn: true,
    searchShowBtn: true,
    searchComponentWidth: '100%',
    menuLeft: [
      {
        label: '删除',
        type: 'danger',
        plain: false,
        circle: false,
        icon: 'Delete',
        clickEvent: (data: any) => {
          data.query = {};
          console.log('data-table的state=', data);
          onDelete(data.selectionList);
        }
      },
      {
        label: '导入',
        type: 'success',
        plain: false,
        circle: false,
        icon: 'Upload',
        clickEvent: (data: any) => {
          console.log('导入', data);
        }
      },
      {
        label: '导出',
        type: 'success',
        plain: false,
        circle: false,
        icon: 'Download',
        clickEvent: (data: any) => {
          console.log('导出', data);
        }
      }
    ],
    menuRight: [],
    selection: true,
    index: true,
    showAction: true,
    actionWidth: 300,
    actionList: [
      {
        label: '下载',
        type: 'success',
        plain: false,
        circle: false,
        icon: 'Download',
        clickEvent: (data: any, row: any, index: number) => {
          console.log('下载', data, row, index);
        }
      }
    ],
    page: true,
    columns: [
      {
        prop: 'name',
        label: '姓名',
        type: 'input',
        search: true,
        hide: false,
        slotSearch: null,
        slotForm: null,
        width: 120,
        minWidth: 120,
        span: 12,
        required: true,
        rules: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ]
      },
      {
        prop: 'age',
        label: '年龄',
        type: 'number',
        hide: false
      },
      {
        prop: 'sex',
        label: '性别',
        type: 'radio', // 'select', 'radio', 'checkbox', 'switch'
        hide: false,
        search: true,
        dicData: [
          {
            label: '男',
            value: '1'
          },
          {
            label: '女',
            value: '2'
          }
        ],
        formatter: (row: any) => {
          let value = '';
          switch (row.sex) {
            case '1': {
              value = '男';
              break;
            }
            case '2': {
              value = '女';
              break;
            }
            default: {
              value = '保密';
              break;
            }
          }
          return value;
        }
      },
      {
        prop: 'like',
        label: '喜好',
        type: 'checkbox',
        hide: false,
        multiple: true,
        search: true,
        dicData: [
          {
            label: '体育',
            value: '1'
          },
          {
            label: '运动',
            value: '2'
          }
        ]
      },
      {
        prop: 'city',
        label: '城市',
        type: 'cascader',
        hide: false,
        search: true,
        props: {
          clearable: true
          // value: 'id',
          // label: 'name',
          // children: 'children',
          // multiple: true,
          // checkStrictly: true,
          // expandTrigger: 'hover'
        },
        dicData: [
          {
            label: '云南',
            value: 530120,
            children: [
              {
                label: '昆明',
                value: 530121
              },
              {
                label: '曲靖',
                value: 530122
              }
            ]
          },
          {
            label: '北京',
            value: 100000,
            children: [
              {
                label: '朝阳区',
                value: 100001
              }
            ]
          }
        ]
        // formatter: (row, column) => {}
      },
      {
        prop: 'phone',
        label: '手机号码',
        type: 'input',
        span: 12,
        required: true,
        rules: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          }
        ]
      },
      {
        prop: 'status',
        label: '状态',
        type: 'select',
        hide: false,
        search: true,
        dicData: [
          {
            label: '全部',
            value: 'all'
          },
          {
            label: '已完成',
            value: 'finish'
          },
          {
            label: '处理中',
            value: 'processing'
          }
        ],
        formatter: (row: any) => {
          let value = '';
          switch (row.status) {
            case 'finish': {
              value = '已完成';
              break;
            }
            case 'processing': {
              value = '处理中';
              break;
            }
            default: {
              value = '全部';
              break;
            }
          }
          return value;
        },
        isTag: true,
        tagFormatter: (value: string, row: any) => {
          console.log(row);
          let tag = {};
          switch (value) {
            case 'finish': {
              tag = { data: '已完成', type: 'success' };
              break;
            }
            case 'processing': {
              tag = { data: '处理中', type: 'danger' };
              break;
            }
            default: {
              tag = { data: '全部', type: 'info' };
              break;
            }
          }
          return tag;
        }
      },
      {
        prop: 'datetime',
        label: '日期',
        type: 'daterange',
        hide: false,
        // 'date',
        // 'datetime',
        // 'datetimerange',
        // 'daterange',
        // 'year',
        // 'month',
        // 'monthrange',
        // 'week'
        search: true,
        // format: 'YYYY/MM/DD',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        formatter: (row: any, column: any) => {
          console.log(column);
          return dateFormat(row.datetime);
        },
        sortable: true
      },
      {
        prop: 'summary',
        label: '概述',
        type: 'textarea',
        hide: false,
        span: 24,
        slotName: 'summary'
      },
      {
        prop: 'slot1',
        label: '搜索插槽',
        type: 'input',
        hide: true,
        search: true,
        slotSearch: 'slot1',
        slotForm: null
      }
      // {
      //   prop: 'slot2',
      //   label: '表单插槽',
      //   type: 'input',
      //   hide: true,
      //   search: false,
      //   slotSearch: null,
      //   slotForm: 'slot2'
      // },
      // {
      //   prop: 'slot3',
      //   label: '插槽',
      //   type: 'input',
      //   hide: true,
      //   search: true,
      //   slotSearch: 'slotSearch',
      //   slotForm: 'slotForm'
      // }
    ],
    slotSearch: null,
    reloadConditions: {
      testSearch: '',
      testcascader: []
    }
  },
  data: [],
  pageData: { currentPage: 1, pageSize: 10, total: 0 },
  formOptions: {
    formSlot: 'myFormSlot'
  },
  // 测试数据
  query: {
    pageNumber: 1,
    pageSize: 10
  },
  form: {},
  cascader: [],
  cascaderData: [
    {
      name: '云南',
      code: 530120,
      children: [
        {
          name: '昆明',
          code: 530121
        },
        {
          name: '曲靖',
          code: 530122
        }
      ]
    }
  ]
});
// 数据加载
const loadData = async (params = {}) => {
  const queryParams = { ...state.query, ...params };
  console.log('loadData=', queryParams);
  state.loading = true;
  await sleep(500);
  state.data = [
    {
      id: 10001,
      name: '张三',
      age: 23,
      sex: '1',
      city: 530120,
      like: '运动',
      phone: '13688888888',
      summary: '十三中会议既要<br>主席做指示',
      status: 'finish',
      datetime: '2023-12-28'
    },
    {
      id: 10002,
      name: '李四',
      age: 18,
      sex: '2',
      city: 530121,
      like: '体育',
      phone: '13688888888',
      summary: '十八中会议既要<br>主席做指示',
      status: 'processing',
      datetime: '2024-01-28'
    }
  ];
  state.pageData = {
    currentPage: queryParams.pageNumber || 1,
    pageSize: queryParams.pageSize || 10,
    total: 100
  };
  state.loading = false;
};
// 页码切换
const onCurrentChange = (current: number) => {
  state.pageData.currentPage = current;
  const { currentPage, pageSize } = state.pageData;
  loadData({ pageNumber: currentPage, pageSize });
};
// 条数切换
const onSizeChange = (size: number) => {
  state.pageData.pageSize = size;
  loadData({ pageSize: size });
};
// 拆分为 查看、编辑、删除以及actionList
const onRowClick = (row: any) => {
  console.log(385, row);
};
// 查看
const onView = (row: any) => {
  console.log('路由跳转=', row);
};
// 删除
const onDelete = (rows: any[]) => {
  if (isEmpty(rows)) return;
  console.log('删除=', rows);
  const self = app;
  app
    ?.$confirm('您确定要删除该数据?', '确定删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .then(() => {
      const params = { ids: rows };
      self?.$http
        .delete('/admin/sysmenu/delete', { params })
        .then((res: any) => {
          if (res.code === 200) {
            loadData();
            self.$message.success('删除成功！');
          }
        })
        .catch((err: any) => {
          self.$message.error(err.message);
        });
    });
};
// 弹窗关闭，表单关闭
const onClose = () => {
  customTable.value?.close();
  customTable.value?.hideLoading();
};
// 提交
const onSave = async (form: any) => {
  customTable.value.showLoading();
  console.log('表单信息=', form.success, form.values);
  await sleep(500);
  onClose();
};
</script>
