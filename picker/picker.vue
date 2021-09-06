<style scoped>
.picker {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  font-family: PingFang SC, STHeitiSC-Light, Helvetica-Light, arial, sans-serif;
  font-size: 14px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.picker .picker-mask {
  position: absolute;
  z-index: 500;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);
  opacity: 1
}

.picker .picker-panel {
  position: absolute;
  z-index: 600;
  bottom: 0;
  width: 100%;
  height: 243px;
  background: #fff;
}

.picker .picker-panel .picker-choose {
  position: relative;
  height: 40px;
  color: #878787;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
}

.picker .picker-panel .picker-choose .picker-title {
  line-height: 40px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #343434
}

.picker .picker-panel .picker-choose .cancel,
.picker .picker-panel .picker-choose .confirm {
  position: absolute;
  padding: 10px;
  top: 0
}

.picker .picker-panel .picker-choose .confirm {
  right: 0;
  color: #d03629
}

.picker .picker-panel .picker-choose .cancel {
  left: 0
}

.picker .picker-panel .picker-content {
  position: relative;
  min-height:173px;
}

.picker .picker-panel .picker-content .mask-bottom,
.picker .picker-panel .picker-content .mask-top {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 68px;
  pointer-events: none;
  transform: translateZ(0);
  -webkit-transform: translateZ(0)
}

.picker .picker-panel .picker-content .mask-top {
  top: 0;
  background: -webkit-gradient(linear, left bottom, left top, from(hsla(0, 0%, 100%, .4)), to(hsla(0, 0%, 100%, .8)));
  background: -o-linear-gradient(bottom, hsla(0, 0%, 100%, .4), hsla(0, 0%, 100%, .8))
}

.picker .picker-panel .picker-content .mask-top:after,
.picker .picker-panel .picker-content .mask-top:before {
  display: block;
  position: absolute;
  border-top: 1px solid #ccc;
  left: 0;
  width: 100%;
  content: " "
}

.picker .picker-panel .picker-content .mask-top:before {
  display: none;
  top: 0
}

.picker .picker-panel .picker-content .mask-top:after {
  display: block;
  bottom: 0
}

.picker .picker-panel .picker-content .mask-bottom {
  bottom: 0;
  background: -webkit-gradient(linear, left top, left bottom, from(hsla(0, 0%, 100%, .4)), to(hsla(0, 0%, 100%, .8)));
  background: -o-linear-gradient(top, hsla(0, 0%, 100%, .4), hsla(0, 0%, 100%, .8))
}

.picker .picker-panel .picker-content .mask-bottom:after,
.picker .picker-panel .picker-content .mask-bottom:before {
  display: block;
  position: absolute;
  border-top: 1px solid #ccc;
  left: 0;
  width: 100%;
  content: " "
}

.picker .picker-panel .picker-content .mask-bottom:before {
  display: block;
  top: 0
}

.picker .picker-panel .picker-content .mask-bottom:after {
  display: none;
  bottom: 0
}

.picker .picker-panel .wheel-wrapper {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  padding: 0 10px
}

.picker .picker-panel .wheel-wrapper .wheel {
  -ms-flex: 1 1 1e-9px;
  -webkit-box-flex: 1;
  flex: 1;
  flex-basis: 1e-9px;
  width: 1%;
  height: 173px;
  overflow: hidden;
  font-size: 21px
}

.picker .picker-panel .wheel-wrapper .wheel .wheel-scroll {
  margin-top: 68px;
  line-height: 36px
}

.picker .picker-panel .wheel-wrapper .wheel .wheel-scroll .wheel-item {
  height: 36px;
  overflow: hidden;
  white-space: nowrap;
  font-size: 16px;
  color: #333
}

.picker .picker-footer {
  height: 20px
}

.picker-fade-enter,
.picker-fade-leave-active {
  opacity: 0
}

.picker-fade-enter-active,
.picker-fade-leave-active {
  transition: all .3s ease-in-out
}

.picker-move-enter,
.picker-move-leave-active {
  transform: translate3d(0, 273px, 0)
}

.picker-move-enter-active,
.picker-move-leave-active {
  transition: all .3s ease-in-out
}

@media (-webkit-min-device-pixel-ratio:1.5),
(min-device-pixel-ratio:1.5) {
  .border-1px:after,
  .border-1px:before {
    -webkit-transform: scaleY(.7);
    -webkit-transform-origin: 0 0;
    transform: scaleY(.7)
  }
  .border-1px:after {
    -webkit-transform-origin: left bottom
  }
}

@media (-webkit-min-device-pixel-ratio:2),
(min-device-pixel-ratio:2) {
  .border-1px:after,
  .border-1px:before {
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5)
  }
}
</style>
<template>
  <transition name="picker-fade">
    <div class="picker" v-show="state===1" @touchmove.prevent @click="cancel">
      <div class="picker-mask" v-show="state===1"></div>
      <transition name="picker-move">
        <div class="picker-panel" v-show="state===1" @click.stop>
          <div class="picker-choose">
            <span class="cancel" @click="cancel">{{cancelTxt}}</span>
            <span class="confirm" @click="confirm">{{confirmTxt}}</span>
            <h1 class="picker-title">{{title}}</h1>
          </div>
          <div class="picker-content">
            <div class="mask-top border-1px"></div>
            <div class="mask-bottom border-1px"></div>
            <div class="wheel-wrapper" ref="wheelWrapper">
              <div class="wheel" v-for="data in pickerData">
                <ul class="wheel-scroll">
                  <li v-for="item in data" :data-item="JSON.stringify(item)" class="wheel-item">{{item.text}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll';


const STATE_HIDE = 0
const STATE_SHOW = 1

const COMPONENT_NAME = 'picker'
const EVENT_SELECT = 'select'
const EVENT_CANCEL = 'cancel'
const EVENT_SHOW = 'show'
const EVENT_CHANGE = 'change'

export default {
  name: COMPONENT_NAME,
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
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data: function() {
    return {
      state: STATE_HIDE,
      pickerData: this.data.slice(),
      pickerSelectedIndex: this.selectedIndex,
      pickerSelectedVal: [],
      pickerSelectedText: [],
      pickerSelectedItem: []
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      if (!this.pickerSelectedIndex.length) {
        this.pickerSelectedIndex = [];
        this.pickerData.forEach((item, index) => {
          this.pickerSelectedIndex[index] = 0
        })
      }
    })
  },
  methods: {
    show: function() {
      if (this.state === STATE_SHOW) {
        return;
      }

      this.state = STATE_SHOW;

      if (!this.wheels) {
        this.$nextTick(() => {
          this.wheels = [];
          let wheelWrapper = this.$refs.wheelWrapper;
          this.pickerData.forEach((item, index) => {
            this._createWheel(wheelWrapper, index)
          })
        })
      } else {
        this.pickerData.forEach((item, index) => {
          this.wheels[index].enable()
          this.wheels[index].wheelTo(this.pickerSelectedIndex[index])
        })
      }
      this.$emit(EVENT_SHOW)
    },
    hide: function() {
      this.state = STATE_HIDE;

      this.pickerData.forEach((item, index) => {
        this.wheels[index].disable()
      })
    },
    cancel: function() {
      this.hide()
      this.$emit(EVENT_CANCEL)
    },
    confirm: function() {
      if (!this._canConfirm()) {
        return
      }
      this.hide()
      let changed = false
      this.pickerData.forEach((item, index) => {
        let _index = this.wheels[index].getSelectedIndex()
        this.pickerSelectedIndex[index] = _index //选择下标
        this.pickerSelectedText[index] = this.pickerData[index][_index] ? this.pickerData[index][_index].text : '' //选中text
        this.pickerSelectedVal[index] = this.pickerData[index][_index] ? this.pickerData[index][_index].value : '' //选中vlue
        this.pickerSelectedItem[index] = this.pickerData[index][_index] ? this.pickerData[index][_index] : null //选中完整对象

      })

      this.$emit(EVENT_SELECT, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText, this.pickerSelectedItem)

    },
    _createWheel: function(wheelWrapper, i) {
      if (!this.wheels[i]) {

        this.wheels[i] = new BScroll(wheelWrapper.children[i], {
          wheel: {
            selectedIndex: this.pickerSelectedIndex[i]
          },
          probeType: 3
        })

        //滑动结束派发一个event_change  
        this.wheels[i].on('scrollEnd', () => {
          this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex())
        })
      } else {
        this.wheels[i].refresh()
      }

      return this.wheels[i]
    },
    refresh() {
      setTimeout(() => {
        this.wheels.forEach((wheel, index) => {
          wheel.refresh()
        })
      }, 200)
    },
    scrollTo(index, dist) {
      const wheel = this.wheels[index]
      this.pickerSelectedIndex[index] = dist
      wheel.wheelTo(dist)
    },
    _canConfirm() {
      return this.wheels.every((wheel) => {
        return !wheel.isInTransition
      })
    },
    setSelectedIndex(index) {
      this.pickerSelectedIndex = index
    },
    setData(data) {
      this.pickerData = data.slice()
    }
  },
  watch: {
    data: function(newData) {
      this.setData(newData)
    }
  }
}
</script>
