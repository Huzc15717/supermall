<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      bs: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.bs) {
        // 1.创建BScroll对象
        this.bs = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad,
        });
      }

      this.bs.on("scroll", (position) => {
        this.$emit("scroll", position);
      });

      this.bs.on("pullingUp", () => {
        this.$emit("pullupload");

        // setTimeout(() => {
        // 下面这两句结束上拉和刷新实际在项目中分不同区域做，结束finishPullUp在调用scroll组件的父组件中使用，刷新在实际加载绑定图片或内容的子组件中使用，感觉是刷新在前再结束
        //   this.bs.finishPullUp();
        //   this.bs.refresh();
        // }, 2000);
      });
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.bs && this.bs.scrollTo(x, y, time); //这个地方是先判断this.bs不为null，然后执行后面的方法
    },
    finishpullup() {
      this.bs && this.bs.finishPullUp();
    },
    Refresh() {
      this.bs && this.bs.refresh();
    },
    getbsY() {
      return this.bs ? this.bs.y : 0;
    },
  },
};
</script>

<style scoped>
</style>
