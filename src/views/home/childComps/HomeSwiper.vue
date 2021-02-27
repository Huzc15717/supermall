<template>
  <swiper>
    <swiper-item v-for="(item, id) in bannerImgs" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgload" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    bannerImgs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      imgisload: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imgload() {
      if (!this.imgisload) {
        this.$emit("swiperimgload");
        this.imgisload = true;
      }
    },
  },
};
</script>

<style scoped>
</style>
