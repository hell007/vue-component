<template>
  <vue-picker 
    ref="picker" 
    :title="title"
    :selected-index="selectedIndex" 
    :data="linkageData"
    :cancelTxt="cancelTxt" 
    :confirmTxt="confirmTxt"
    @select="handleSelect" 
    @change="handleChange"> 
  </vue-picker>
  <!-- :data="linkageData"  -->
</template>

<script>
import BScroll from 'better-scroll';
import vuePicker from '../picker/index'
import {
  province,
  city,
  area
} from './city-data.js'

const COMPONENT_NAME = 'city-picker'
export default {
  name: COMPONENT_NAME,
  components: {
    vuePicker
  },
  props: {
    title: {
      type: String,
      default: '请选择'
    },
    cancelTxt: {
      type: String,
      default: '取消'
    },
    confirmTxt: {
      type: String,
      default: '确认'
    },
    selectedIndex: {
      type: Array,
      default () {
        return [0, 0, 0]
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    linkageData: function() {
      this.data = this.data.length > 0 ? this.data : [province, city, area]
      const provinceList = this.data[0]
      const cityList = this.data[1].filter((item) => {
        return item.pid === provinceList[this.tempIndex[0]].value
      })
      let areaList = [];
      if (cityList.length > 0) {
        areaList = this.data[2].filter((item) => {
          return item.pid === cityList[this.tempIndex[1]].value
        })
      }

      return [provinceList, cityList, areaList]
    }
  },
  data: function() {
    return {
      tempIndex: this.selectedIndex.slice()
    }
  },
  watch: {
    linkageData: function() {
      this.$refs.picker.refresh()
    }
  },
  methods: {
    show: function() {
      this.$refs.picker.show()
    },
    handleSelect: function() {
      this.$emit('select', ...arguments)
    },
    handleChange: function(i, newIndex) {
      if (newIndex !== this.tempIndex[i]) {
        for (let j = 2; j > i; j--) {
          this.tempIndex.splice(j, 1, 0)
          this.$refs.picker.scrollTo(j, 0)
        }
        this.tempIndex.splice(i, 1, newIndex)
      }
    }
  },
  created(){
    //console.log("====", this.data)
  }
}
</script>
