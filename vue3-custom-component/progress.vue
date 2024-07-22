<template>
  <div>
    <el-button type="primary" @click="loadData">刷新</el-button>
    <br />

    <custom-progress :width="200" :height="60" :options="state.lineOpt" :data="state.data" />
    <br />

    <custom-progress :width="200" :height="60" :options="state.lineOpt" :data="state.data1" />

    <br />
    <custom-progress :width="200" :height="200" :options="state.circleOpt" :data="state.data2" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { sleep } from '@/utils';

const state = reactive({
  lineOpt: {
    type: 'line',
    strokeWidth: 12,
    stroke: '#3b9cd9',
    padding: 10,
    margin: 0,
    titleFontSize: 14,
    titleColor: '#333',
    fontSize: 18,
    color: '#3b9cd9'
  },
  circleOpt: {
    type: 'circle',
    strokeWidth: 12,
    stroke: '#3b9cd9',
    strokeBg: '#999',
    padding: 10,
    margin: 0,
    titleFontSize: 14,
    titleColor: '#333',
    fontSize: 24,
    color: '#3b9cd9'
  },
  data: {
    percentage: 35.5
  },
  data1: {
    percentage: 25.8,
    title: '进度条'
  },
  data2: {
    percentage: 45.3,
    title: '进度条'
  }
});

const round = (max = 100, min = 1) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const loadData = async () => {
  await sleep(500);
  state.data = {
    percentage: round()
  };
  state.data1 = {
    percentage: round(),
    title: '刷新进度条'
  };
  state.data2 = {
    percentage: round(),
    title: '刷新进度条'
  };
};
</script>
