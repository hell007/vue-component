import { isEmpty, deepClone } from '@/dragComponents/utils'

const historyOptions = {
  maxStack: 20 // 最多20步
}

// eslint-disable-next-line no-unused-vars
export default class HistoryRecord {
  constructor() {
    const { maxStack } = historyOptions
    this.actionPoints = [] // 快照数组
    this.step = 0 // 当前位置
    this.maxStack = maxStack // 最大步数
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

  push(data) {
    if (this.step === this.maxStack - 1) {
      this.actionPoints.shift()
    } else {
      this.step++
    }
    this.actionPoints[this.step] = deepClone(data)

    if (this.step < this.actionPoints.length - 1) {
      this.actionPoints = this.actionPoints.slice(0, this.step + 1)
    }
  }

  undo() {
    if (this.step !== 0) this.step--
    return deepClone(this.actionPoints[this.step])
  }

  redo() {
    if (this.step !== this.actionPoints.length - 1) this.step++
    return deepClone(this.actionPoints[this.step])
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
