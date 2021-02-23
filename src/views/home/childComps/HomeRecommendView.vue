<template>
  <div class="recommends">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.recommends {
  width: 100%;
  display: flex;
  border-bottom: 8px solid #eee;
  /* padding-left: 5%; */
  justify-content: space-around;
}
.recommend-item {
  width: 24%;
  padding: 10px 0;
  /* margin-right: 5%; */
  
  text-align: center;
  font-size: 14px;
}
.recommend-item img {
  width: 100%;
  height: auto;
}
</style>