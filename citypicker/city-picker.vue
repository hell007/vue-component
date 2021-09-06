<template>
  <picker 
    ref="picker" 
    :title="title"
    :data="citys"
    :selected-index="selectedIndex" 
    :cancelTxt="cancelTxt" 
    :confirmTxt="confirmTxt"
    @select="handleSelect" 
    @change="handleChange"> 
  </picker>
</template>

<script>
import BScroll from 'better-scroll';
import Picker from '../picker/index'
const COMPONENT_NAME = 'city-picker'
export default {
  name: COMPONENT_NAME,
  components: {
    Picker
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
        return [[], [], []]
      }
    }
  },
  computed: {
    citys() {
      this.data = this.data.length > 0 ? this.data : [[], [], []]
      
      //省份固定
      const provinceList = this.data[0]
      //城市切换,返回新的数组
      let cityList = this.data[1].filter((item) => {
        return item.pid === provinceList[this.tempIndex[0]].value
      })
      //区县切换，返回新的数组
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
  methods: {
    show: function() {
      this.$refs.picker.show()
    },
    handleSelect: function() {
      this.$emit('select', ...arguments)
    },
    handleChange: function(i, newIndex) {
      console.log('====', i, newIndex)
      if (newIndex !== this.tempIndex[i]) {
        for (let j = 2; j > i; j--) {
          this.tempIndex.splice(j, 1, 0)
          this.$refs.picker.scrollTo(j, 0)
        }
        this.tempIndex.splice(i, 1, newIndex)
      }
    }
  },
  created() {
  }
}
</script>
