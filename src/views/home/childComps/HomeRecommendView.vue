<template>
  <div class="recommends">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
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
.recommends{
    display: flex;
}
recommend-item{
    flex: 1;
}
recommend-item img{
    width: 70px;
    height: auto;
}
</style>