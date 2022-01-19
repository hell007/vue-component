import { isEmpty, deepClone, isEqual } from '@/dragComponents/utils'

const historyOptions = {
  key: 'history-records',
  maxStack: 20, // 最多20步
  autoUpdate: false, // 自动更新
  delay: 10000 // 10s
}

function diff(value, other) {
  return isEqual(value, other)
}

// eslint-disable-next-line no-unused-vars
export default class HistoryRecord {
  constructor(options) {
    const { maxStack, autoUpdate, delay, key } = Object.assign(
      historyOptions,
      options
    )
    this.actionPoints = [] // 快照数组
    this.step = 0 // 当前位置
    this.maxStack = maxStack // 最大步数
    this.delay = delay
    this.autoUpdate = autoUpdate
    this.updateTime = 0 // 上次的操作时间
    this.key = key
  }

  init(data) {
    // this.bindEvent()

    if (data?.storage) {
      const records = JSON.parse(localStorage.getItem(data?.id))
      if (!isEmpty(records)) {
        this.actionPoints[this.step] = records
        return deepClone(records)
      }
    }

    this.actionPoints[this.step] = data
    return deepClone(data)
  }

  push(data, type='add') {
    const curTime = Date.now()
    if (type === 'update') {
      const equal = diff(data, this.actionPoints[this.step])
      if (equal) return
      if (this.autoUpdate) {
        if (curTime - this.updateTime < this.delay) {
          this.update(data)
          return
        }
      } else {
        this.update(data)
        return
      }
    }

    if (this.step === this.maxStack - 1) {
      this.actionPoints.shift()
    } else {
      this.step++
    }
    this.actionPoints[this.step] = deepClone(data)

    if (this.step < this.actionPoints.length - 1) {
      this.actionPoints = this.actionPoints.slice(0, this.step + 1)
    }
    this.reset()
  }

  undo() {
    if (this.step !== 0) this.step--
    this.reset()
    return deepClone(this.actionPoints[this.step])
  }

  redo() {
    if (this.step !== this.actionPoints.length - 1) this.step++
    this.reset()
    return deepClone(this.actionPoints[this.step])
  }
  
  update(data) {
    if (this.step === this.maxStack - 1) {
      this.actionPoints.shift()
    } else {
      this.step++
    }
    this.actionPoints[this.step] = deepClone(data)
    this.reset()
  }

  reset() {
    this.updateTime = Date.now()
  }

  // bindEvent() {
  //   document.addEventListener("keydown", (e) => {
  //     if ((e.metaKey || e.ctrlKey) && e.keyCode === 90) {
  //       this.undo()
  //     }
  //     if ((e.metaKey || e.ctrlKey) && e.keyCode === 89) {
  //       this.redo()
  //     }
  //   })
  // }
}

// let data = {}
// let hr = new HistoryRecord()
// hr.init(data)
// hr.push(data)
