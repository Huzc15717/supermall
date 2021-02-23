<template>
  <div class="tab-control">
    <div
      v-for="(item, index) of titles"
      :key="index"
      :class="{ active: index === currentIndex }"
      class="tabcontrol-item"
      @click="clickEventHandle(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    clickEventHandle(index) {
      this.currentIndex = index;
    },
  },
};
</script>
<style scoped>
.tab-control {
  display: flex;
  background-color: white;
}
.tabcontrol-item {
  flex: 1;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-high-text);
  padding-bottom: 5px;
}
</style>