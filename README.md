## vue3-custom-component Example Usage

#### 1、data-table

```vue
<template>
  <data-table
    ref="customTable"
    :loading="state.loading"
    :options="state.options"
    :data="state.data"
    :page-data="state.pageData"
    :show-form="state.options.showForm"
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
    <template #slotMysearch="{ query }">
      <el-input
        v-model="query.mysearch"
        placeholder="请输入"
      />
    </template>

    <!-- 列插槽 -->
    <template #summary="{ row }">
      <!-- <template #summary="{ row, column, index }"> -->
      <span v-html="row.summary"></span>
    </template>
  </data-table>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue';
import { isEmpty, sleep } from '@/utils';

const app = getCurrentInstance()?.appContext.config.globalProperties;

const customTable = ref<any>(null);
const state = reactive<any>({
  loading: false,
  options: {
    header: {
      slotHeader: null,
      title: 'table案列'
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
        clickEvent: ({selectionList:any[]}) => {
          onDelete(data.selectionList);
        }
      },
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
            message: '请输入',
            trigger: 'blur'
          }
        ]
      },
      {
        prop: 'age',
        label: '年龄',
        type: 'number',
      },
      {
        prop: 'sex',
        label: '性别',
        type: 'select', 
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
        prop: 'city',
        label: '城市',
        type: 'cascader',
        search: true,
        props: {
          clearable: true
        },
        dicData: [
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
      },
      {
        prop: 'status',
        label: '状态',
        type: 'select',
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
        // 'date',
        // 'datetime',
        // 'datetimerange',
        // 'daterange',
        // 'year',
        // 'month',
        // 'monthrange',
        // 'week'
        search: true,
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
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
        prop: 'mysearch',
        label: '搜索插槽',
        type: 'input',
        hide: true,
        search: true,
        slotSearch: 'slotMysearch'
      }
    ],
  },
  data: [],
  pageData: { currentPage: 1, pageSize: 10, total: 0 },
  formOptions: {
    labelWidth: '130',
    defaultForm: {
      sex: '1',
      status: 'all'
    }
  },
  // 测试数据
  query: {
    pageNumber: 1,
    pageSize: 10
  },
});
// 数据加载
const loadData = async (params = {}) => {
  const queryParams = { ...state.query, ...params };
  state.loading = true;
  await sleep(500);
  state.data = [
    {
      id: 10001,
      name: '张三',
      age: 23,
      sex: '1',
      city: 530120,
      summary: '十三中会议既要',
      status: 'finish',
      datetime: '2023-12-28'
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
  console.log('rowClick=', row);
};
// 查看
const onView = (row: any) => {
  console.log('查看=', row);
};
// 删除
const onDelete = (rows: any[]) => {
  console.log('删除=', rows);
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
```


#### 2、data-form

```vue
<template>
  <data-form
    ref="customForm"
    v-loading="state.loading"
    :visible="state.visible"
    :title="state.title"
    :columns="state.columns"
    :options="state.formOptions"
    :form-props="state.form"
    @on-close="state.visible = false"
    @on-confirm="onSave"
  >
    <template #slotAvatar="{ form }">
        <el-upload
          action="#"
          :http-request="#"
          :show-file-list="true"
          accept="image/*"
        >
          <el-icon >
            <Plus />
          </el-icon>
        </el-upload>
    </template>
  </data-form>
</template>
<script setup>
import { reactive, computed } from 'vue';

const state = reactive({
  loading: false,
  visible: false,
  title: '个人信息',
  columns: [
    {
      prop: 'avatar',
      label: '头像',
      type: 'input',
      slotForm: 'slotAvatar',
    },
    {
      prop: 'name',
      label: '姓名',
      type: 'input',
      span: 24,
    },
  ],
  formOptions: {
    width: '50%',
    labelWidth: 130,
  },
  form: {},
});
// 保存
const onSave = (form) => {
  console.log(form.values)
};
</script>
```



#### 3、更多案列查看demo
