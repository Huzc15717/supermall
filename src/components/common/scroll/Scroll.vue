<template>
  <div class="wrapper" ref="wrapper1">
      <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      bs: null,
    };
  },
  mounted() {
    // 1.创建BScroll对象
    this.bs = new BScroll(this.$refs.wrapper1, {
      click: true,
    });
  },
};
</script>

<style scoped>
</style>
