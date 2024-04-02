<template>
  <div class="echart">
    <div class="echart-title">
      <b style="margin-right: 50px">图表</b>
      <el-button type="primary" @click="onSearch">刷新</el-button>
    </div>
    <div class="echart-demo">
      <custom-echart-bar :height="300" :options="state.barOpt" :data="state.barData" />

      <!-- 数据集 -->
      <custom-echart-bar :height="300" :options="state.barOpt" :data="state.barData1" />

      <!-- 数据集 -->
      <custom-echart-bar :height="300" :options="state.barSet" :data="state.barData2" />

      <custom-echart-line :height="300" :options="state.lineOpt" :data="state.lineData" />

      <custom-echart-pie
        ref="customPie"
        :height="300"
        :options="state.pieOpt"
        :data="state.pieData"
      />

      <custom-echart-funnel :height="300" :options="state.funnelOpt" :data="state.pieData" />

      <custom-echart-radar :height="300" :options="state.radarOpt" :data="state.radarData" />

      <custom-echart-guage :height="300" :options="state.guageOpt" :data="state.guageData" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { isEmpty, sleep } from '@/utils';

const customPie = ref(null);
const state = reactive({
  loading: false,
  barOpt: {
    type: 'bar',
    colors: {
      defaultColor: true,
      loopColor: true,
      color: [],
      isLinear: false,
      colorList: []
    },
    title: {
      show: true,
      left: 'left',
      top: 10,
      text: '柱状图',
      textColor: '#333',
      textFontSize: 12,
      subtext: '',
      subtextColor: '#999',
      subtextFontSize: 10
    },
    grid: {
      top: 80,
      left: 80,
      right: 80,
      bottom: 80,
      containLabel: true
    },
    legend: {
      show: true,
      orient: 'horizontal',
      top: 2,
      left: 'center',
      color: '#333',
      fontSize: 10
    },
    label: {
      unit: '',
      show: true,
      color: '#666',
      fontSize: 10,
      fontWeight: 'normal',
      line: false,
      lineColor: '#666',
      lineFontSize: 10
    },
    tooltip: {
      show: true,
      color: '#666',
      fontSize: 10,
      formatter: ''
    },
    xAxis: {
      name: '',
      nameColor: '#333',
      nameFontSize: 10,
      show: true,
      inverse: false,
      interval: false,
      line: true,
      tickShow: true,
      labelShow: true,
      labelRotate: 0,
      labelFormatter: '{value}',
      splitLineShow: false
    },
    yAxis: {
      name: '',
      nameColor: '#333',
      nameFontSize: 10,
      show: true,
      inverse: false,
      interval: false,
      line: true,
      tickShow: true,
      labelShow: true,
      labelRotate: 0,
      labelFormatter: '{value}',
      splitLineShow: false
    },
    borderRadius: 4,
    barWidth: 16,
    barMinHeight: 0,
    markLine: false,
    showCategory: false
  },
  // 正常、堆叠
  barData: {
    categories: ['微信', '支付宝', '现金', '余额', '商品券'],
    series: [
      {
        name: '收入',
        // stack: 'Ad',
        data: [206, 650, 1300, 300, 20]
      },
      {
        name: '退款',
        // stack: 'Ad',
        data: [20, 30, 350, 60]
      }
    ]
  },
  // 数据集
  barSet: {
    type: 'bar',
    colors: {
      defaultColor: true,
      loopColor: true,
      color: [],
      isLinear: false,
      colorList: []
    },
    title: {
      show: true,
      left: 'left',
      top: 0,
      text: '柱状图-数据集',
      textColor: '#333',
      textFontSize: 12,
      subtext: '',
      subtextColor: '#999',
      subtextFontSize: 10
    },
    grid: {
      top: 50,
      bottom: 55
    },
    legend: {
      show: true,
      orient: 'vertical',
      top: 2,
      left: 'right',
      color: '#333',
      fontSize: 10
    },
    label: {
      unit: '',
      show: true,
      color: '#666',
      fontSize: 10,
      fontWeight: 'normal',
      line: false,
      lineColor: '#666',
      lineFontSize: 10
    },
    tooltip: {
      show: true,
      color: '#666',
      fontSize: 10,
      formatter: ''
    },
    xAxis: {
      name: '',
      nameColor: '#333',
      nameFontSize: 10,
      show: true,
      inverse: false,
      interval: false,
      line: true,
      tickShow: true,
      labelShow: true,
      labelRotate: 0,
      labelFormatter: '{value}',
      splitLineShow: false
    },
    yAxis: {
      name: '',
      nameColor: '#333',
      nameFontSize: 10,
      show: true,
      inverse: false,
      interval: false,
      line: true,
      tickShow: true,
      labelShow: true,
      labelRotate: 0,
      labelFormatter: '{value}',
      splitLineShow: false
    },
    dataset: true,
    borderRadius: 4,
    barWidth: 16,
    barMinHeight: 0,
    markLine: false,
    showCategory: false
  },
  barData1: {
    categories: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],
    series: [
      {
        type: 'bar',
        name: '2015',
        data: [89.3, 92.1, 94.4, 85.4]
      },
      {
        type: 'bar',
        name: '2016',
        data: [95.8, 89.4, 91.2, 76.9]
      },
      {
        type: 'bar',
        data: [97.7, 83.1, 92.5, 78.1]
      }
    ]
  },
  barData2: {
    series: [
      ['product', '2012', '2013', '2014', '2015'],
      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
      ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
      ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
    ]
  },
  //pie
  pieOpt: {
    // color: {
    //   defaultColor: true,
    //   loopColor: true,
    //   color: [],
    //   isLinear: false,
    //   colorList: []
    // },
    title: {
      show: true,
      left: 'left',
      top: 10,
      text: '饼图',
      textColor: '#333',
      textFontSize: 12
      // subtext: '',
      // subtextColor: '#999',
      // subtextFontSize: 10
    },
    center: {
      x: 50,
      y: 55,
      startRadius: 30,
      endRadius: 50
    },
    // legend: {
    //   show: true,
    //   orient: 'horizontal',
    //   top: 2,
    //   left: 'center',
    //   color: '#333',
    //   fontSize: 10
    // },
    label: {
      unit: '元',
      lineColor: '#666',
      lineFontSize: 10,
      show: true,
      color: '#666',
      fontSize: 14,
      fontWeight: 'normal'
    },
    tooltip: {
      show: true,
      color: '#666',
      fontSize: 10,
      formatter: (p) => {
        // console.log(300, p);
        return `<span>${p.seriesName}-${p.name}-${p.value}元</span>`;
      }
    },
    type: 'pie',
    radius: false

    // borderRadius: 10,
    // borderColor: '#fff',
    // borderWidth: 10,

    // roseType: false,
    // sort: false,
    // notCount: false,
    // activeLeft: 50,
    // activeTop: 50,
    // activeTitleFontSize: 12,
    // activeTitleColor: '#666',
    // activeValueFontSize: 16,
    // activeValueColor: '#3B9CD9',
    // animation: false,
    // animationTime: 4000
  },
  pieData: {
    categories: [],
    series: [
      {
        name: '收入',
        data: [
          { value: 200, name: '微信' },
          { value: 650, name: '支付宝' },
          { value: 1300, name: '现金' },
          { value: 300.0, name: '余额' },
          { value: 20, name: '商品券' }
        ]
      }
    ]
  },
  //line
  lineOpt: {
    type: 'line',
    title: {
      show: true,
      left: 'left',
      top: 10,
      text: '折线图',
      textColor: '#333',
      textFontSize: 12
      // subtext: '',
      // subtextColor: '#999',
      // subtextFontSize: 10
    },
    grid: {
      top: 80,
      left: 80,
      right: 80,
      bottom: 80,
      containLabel: true
    },
    legend: {
      // data: ['收入', '退款'],
      show: true,
      orient: 'horizontal',
      top: 2,
      left: 'center',
      color: '#333',
      fontSize: 12
    },
    label: {
      unit: '元',
      lineColor: '#333',
      lineFontSize: 12,
      show: true,
      color: '#666',
      fontSize: 12,
      fontWeight: 'normal'
    },
    tooltip: {
      show: true,
      color: '#666',
      fontSize: 10,
      formatter: ''
    },
    xAxis: {
      type: 'category',
      data: ['微信', '支付宝', '现金', '余额', '商品券'],
      name: '付款方式',
      nameColor: '#333',
      nameFontSize: 14,
      show: true,
      inverse: false,
      interval: false,
      line: true,
      tickShow: true,
      labelShow: true,
      labelRotate: 0,
      labelFormatter: '{value}',
      splitLineShow: false
    },
    yAxis: {
      type: 'value',
      name: '金额',
      nameColor: '#333',
      nameFontSize: 14,
      show: true,
      inverse: false,
      interval: false,
      line: true,
      tickShow: true,
      labelShow: true,
      labelRotate: 0,
      labelFormatter: '{value}',
      splitLineShow: false
    },
    lineWidth: 2,
    symbolSize: 4,
    smooth: true,
    areaStyle: false,
    markLine: false
  },
  lineData: {
    categories: ['微信', '支付宝', '现金', '余额', '商品券'],
    series: [
      {
        name: '收入',
        type: 'line',
        // stack: 'Total',
        data: [206, 650, 1300, 300, 20]
      },
      {
        name: '退款',
        type: 'line',
        // stack: 'Total',
        data: [20, 30, 350, 60]
      }
    ]
  },
  // funnel
  funnelOpt: {
    type: 'funnel',
    colors: {
      defaultColor: true,
      loopColor: true,
      color: [],
      isLinear: false,
      colorList: []
    },
    title: {
      show: true,
      left: 'left',
      top: 10,
      text: '漏斗图',
      textColor: '#333',
      textFontSize: 12,
      subtext: '',
      subtextColor: '#999',
      subtextFontSize: 10
    },
    legend: {
      show: true,
      orient: 'horizontal',
      top: 2,
      left: 'center',
      color: '#333',
      fontSize: 10
    },
    label: {
      unit: '',
      show: true,
      color: '#666',
      fontSize: 10,
      fontWeight: 'normal',
      line: true,
      lineColor: '#666',
      lineFontSize: 10
    },
    tooltip: {
      show: true,
      color: '#666',
      fontSize: 10,
      formatter: ''
    },
    sort: false,
    notCount: false,
    markLine: false
  },
  //radar
  radarOpt: {
    type: 'radar',
    colors: {
      defaultColor: true,
      loopColor: true,
      color: [],
      isLinear: false,
      colorList: []
    },
    title: {
      show: true,
      left: 'left',
      top: 10,
      text: '雷达图',
      textColor: '#333',
      textFontSize: 12,
      subtext: '',
      subtextColor: '#999',
      subtextFontSize: 10
    },
    center: {
      x: 50,
      y: 55,
      r: 70,
      startRadius: 30,
      endRadius: 60
    },
    legend: {
      show: true,
      orient: 'horizontal',
      top: 2,
      left: 'center',
      color: '#333',
      fontSize: 10
    },
    label: {
      unit: '',
      show: true,
      color: '#666',
      fontSize: 10,
      fontWeight: 'normal',
      line: false,
      lineColor: '#666',
      lineFontSize: 10
    },
    tooltip: {
      show: true,
      color: '#666',
      fontSize: 10,
      formatter: ''
    },
    shape: 'polygon',
    nameFontSize: 10,
    nameColor: '#333',
    areaOpacity: 0
  },
  radarData: {
    categories: [],
    series: [
      {
        value: [124, 98, 106, 86, 78, 75],
        name: '期中'
      },
      {
        value: [100, 98, 106, 86, 78, 75],
        name: '期末'
      }
    ],
    indicators: [
      {
        name: '语文',
        max: 150
      },
      {
        name: '数学',
        max: 150
      },
      {
        name: '英语',
        max: 150
      },
      {
        name: '物理',
        max: 100
      },
      {
        name: '化学',
        max: 100
      },
      {
        name: '生物',
        max: 100
      }
    ]
  },
  //guage
  guageOpt: {
    type: 'gauge',
    center: {
      x: 50,
      y: 55,
      r: 70,
      startRadius: 30,
      endRadius: 60
    },
    startAngle: 220,
    endAngle: -40,
    min: 0,
    max: 100,
    unit: '分',
    splitNumber: 10,
    progressShow: true,
    progressColor: '#3b9cd9',
    lineWidth: 10,
    lineColor: '#E6EBF8',
    roundCap: false,
    labelShow: true,
    labelFontSize: 12,
    labelColor: '#666',
    labelDistance: 15,
    labelFormatter: '',
    axisTickShow: false,
    axisTickLength: 8,
    axisTickWidth: 1,
    axisTickColor: '#999',
    splitLineShow: true,
    splitLineLength: 10,
    splitLineWidth: 2,
    splitLineColor: '#999',
    pointerShow: true,
    pointerLength: 40,
    pointerWidth: 6,
    pointerColor: '#3b9cd9',
    anchorShow: false,
    anchorSize: 16,
    anchorColor: '#3b9cd9',
    gaugeTitleShow: true,
    gaugeTitleColor: '#666',
    gaugeTitleFontSize: 12,
    gaugeTitleCenter: 50,
    detailShow: true,
    detailFontSize: 20,
    detailColor: '#333',
    detailCenter: 30,
    detailFormatter: '{value}'
  },
  guageData: {
    series: [
      {
        value: 80,
        name: '成绩等级'
      }
    ]
  }
});

// 数据加载
const loadData = async (data = [], time = 500) => {
  await sleep(time);
  state.data = data;
};
loadData();

const onSearch = async () => {
  customPie?.value && customPie.value.refresh();
  console.log(501, customPie.value);
};
</script>
<style lang="scss" scoped>
.echart {
  &-title {
    margin-bottom: 30px;
  }
  &-demo {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    & > div {
      width: 50%;
    }
  }
}
</style>
