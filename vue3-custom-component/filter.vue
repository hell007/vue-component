<template>
  <div>
    <custom-filter
      :columns="state.options.filters"
      :form="state.form"
      :options="state.options"
      @on-search="onSearch"
    >
      <template #slotTime="{ query }">
        <el-date-picker
          v-model="query.datetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD"
        />
      </template>
    </custom-filter>

    <data-table
      ref="customTable"
      :loading="state.loading"
      :options="state.options"
      :data="state.data"
    >
      <template #slotHeader> </template>
      <template #slotDate="{ row }">
        <b v-if="row.date === null && row.monthOrYear === '总计'">{{ row.monthOrYear }}</b>
        <span v-else>
          {{ row.date === null ? row.monthOrYear : row.date }}
        </span>
      </template>
    </data-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { sleep } from '@/utils';

const state = reactive({
  loading: false,
  options: {
    labelWidth: 100,
    emptyBtn: true,
    index: true,
    showAction: true,
    actionList: [
      {
        label: '查看明细',
        type: 'primary',
        icon: 'view'
      }
    ],
    page: false,
    filters: [
      {
        prop: 'datetime',
        label: '起止日期',
        type: 'datetimerange',
        search: true,
        hide: true,
        hideForm: true,
        span_lg: 12,
        slotSearch: 'slotTime'
      },
      {
        prop: 'type',
        label: '统计方式',
        type: 'select',
        search: true,
        hide: true,
        hideForm: true,
        dicData: [
          {
            label: '按天',
            value: 'day'
          },
          {
            label: '按月',
            value: 'month'
          },
          {
            label: '按年',
            value: 'year'
          }
        ],
        formatter: (row) => {
          let value = '';
          switch (row.storeType) {
            case 'day': {
              value = '按天';
              break;
            }
            case 'month': {
              value = '按月';
              break;
            }
            case 'year': {
              value = '按年';
              break;
            }
          }
          return value;
        }
      },
      {
        prop: 'storeId',
        label: '门店',
        type: 'select',
        search: true,
        hide: true,
        hideForm: true,
        dicData: []
      },
      {
        prop: 'storeType',
        label: '门店类型',
        type: 'select',
        search: true,
        hide: true,
        hideForm: true,
        dicData: [
          {
            label: '直营',
            value: 1
          },
          {
            label: '加盟',
            value: 2
          }
        ],
        formatter: (row) => {
          let value = '';
          switch (row.storeType) {
            case 1: {
              value = '直营';
              break;
            }
            case 2: {
              value = '加盟';
              break;
            }
          }
          return value;
        }
      }
    ],
    columns: [
      {
        prop: 'monthOrYear',
        label: '月份或年份',
        type: 'input',
        hide: true
      },
      {
        prop: 'date',
        label: '日期',
        type: 'input',
        width: 180,
        slotName: 'slotDate'
      },
      {
        prop: 'weixinIncomePrice',
        label: '微信收入金额',
        type: 'input',
        width: 180
      },
      {
        prop: 'alipayIncomePrice',
        label: '支付宝收入金额',
        type: 'input',
        width: 180
      },
      {
        prop: 'cashIncomePrice',
        label: '现金收入金额',
        type: 'input',
        width: 180
      },
      {
        prop: 'balanceIncomePrice',
        label: '余额收入金额',
        type: 'input',
        width: 180
      },
      {
        prop: 'marketIncomePrice',
        label: '商场券收入金额',
        type: 'input',
        width: 180
      },
      {
        prop: 'weixinRefundPrice',
        label: '微信退款金额',
        type: 'input',
        width: 180
      },
      {
        prop: 'alipayRefundPrice',
        label: '支付宝退款金额',
        type: 'input',
        width: 180
      },
      {
        prop: 'cashRefundPrice',
        label: '现金退款金额',
        type: 'input',
        width: 180
      },
      {
        prop: 'balanceRefundPrice',
        label: '余额退款金额',
        type: 'input',
        width: 180
      },
      {
        prop: 'totalPrice',
        label: '总收入',
        type: 'input',
        fixed: 'right'
      }
    ]
  },
  data: [],
  form: {
    datetime: ['2024-03-02', '2024-04-02'],
    type: 'day'
  },
  query: {
    entity: {
      startDate: '',
      endDate: '',
      type: '',
      storeId: '',
      storeType: ''
    }
  },
  currentRow: {}
});

const data = [
  {
    monthOrYear: '2024-03',
    date: null,
    weixinIncomePrice: 200,
    alipayIncomePrice: 350.01,
    cashIncomePrice: 130.01,
    balanceIncomePrice: 300.0,
    marketIncomePrice: 100.0,
    weixinRefundPrice: 200,
    alipayRefundPrice: 0,
    cashRefundPrice: 350.0,
    balanceRefundPrice: 0,
    totalPrice: 1910.02
  }
];

// 数据加载
const loadData = async (data, time = 500) => {
  await sleep(time);
  state.data = data;
};
loadData(data);

const onSearch = async () => {
  const data = [
    {
      monthOrYear: '2024-03',
      date: null,
      weixinIncomePrice: 222,
      alipayIncomePrice: 650.01,
      cashIncomePrice: 1300.01,
      balanceIncomePrice: 300.0,
      marketIncomePrice: 10.0,
      weixinRefundPrice: 112,
      alipayRefundPrice: 0,
      cashRefundPrice: 350.0,
      balanceRefundPrice: 0,
      totalPrice: 1910.02
    },
    {
      monthOrYear: '总计',
      date: null,
      weixinIncomePrice: 2,
      alipayIncomePrice: 650.01,
      cashIncomePrice: 1300.01,
      balanceIncomePrice: 300.0,
      marketIncomePrice: 10.0,
      weixinRefundPrice: 2,
      alipayRefundPrice: 0,
      cashRefundPrice: 350.0,
      balanceRefundPrice: 0,
      totalPrice: null
    }
  ];
  loadData(data, 1000);
};
</script>
