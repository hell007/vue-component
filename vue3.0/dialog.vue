<template>
  <transition name="fade">
    <div class="dialog-mask">
      <div class="dialog-wrapper animated fadeInUp" ref="dialogWrapper">
        <div class="dialog-container">
          <div class="dialog-header">{{title}}</div>
          <div class="dialog-body">
            <slot></slot>
          </div>
          <div class="dialog-footer">
            <div class="left i-block" @click="dialogClose">{{cancel}}</div>
            <div class="right i-block" @click="submit">{{confirm}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import '@/../public/css/animate.min.css';
@Component({
  components: {}
})
export default class extends Vue {
  @Prop()
  private title!: string;
  @Prop()
  private cancel!: string;
  @Prop()
  private confirm!: string;
  private dialogClose() {
    this.$emit("close");
  }
  private submit() {
    this.$emit("submit");
  }
}
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.dialog-mask {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  display: table;
  animation-duration: 0.6s;
  .dialog-wrapper {
    display: table-cell;
    vertical-align: middle;
    animation-duration: 0.3s;
    .dialog-container {
      margin: auto;
      top: 50%;
      background-color: white;
      width: 260px;
      height: 150px;
      border-radius: 12px;
      .dialog-header {
        background-color: #f3fff7;
        color: #42b983;
        height: 32px;
        border-radius: 12px 12px 0 0;
        border-bottom: 1px solid #cccccc;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        color: #38c26b;
      }
      .dialog-body {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        height: 50px;
        font-size: 13px;
      }
      .dialog-footer {
        height: 40px;
        width: 100%;
        background-color: #ffffff;
        border-radius: 0 0 12px 12px;
        display: table;
        .left {
          width: 50%;
          height: 100%;
          vertical-align: middle;
          display: table-cell;
          font-size: 13px;
          color: #38c26b;
        }
        .right {
          width: 50%;
          height: 100%;
          vertical-align: middle;
          display: table-cell;
          font-size: 13px;
          color: #38c26b;
        }
        .left:hover {
          cursor: pointer;
        }
        .right:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
