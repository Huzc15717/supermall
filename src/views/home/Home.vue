<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <Swiper :bannerImgs="bannerImgs" />
    <HomeRecommendView :recommends="recommends" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import Swiper from "@/components/common/swiper/Swiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";

import { getHomeMultidata } from "@/network/home";

export default {
  name: "Home",
  data() {
    return {
      bannerImgs: [],
      recommends: [],
    };
  },
  components: {
    NavBar,
    Swiper,
    HomeRecommendView,
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;
        this.bannerImgs = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
  },
};
</script>

<style>
.home-nav {
  background: var(--color-tint);
  text-align: center;
  color: #fff;
}
</style>