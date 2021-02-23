<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <Swiper :bannerImgs="bannerImgs" />
    <HomeRecommendView :recommends="recommends" />
    <FeatureView />
    <TabControl :titles="['流行', '新款', '精选']" class="home-control" />
    <GoodsList :goods="goods" />
    <div class="clear"></div>
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import Swiper from "@/components/common/swiper/Swiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/components/content/TabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import { getHomeMultidata, GetHomeGoodsListdata } from "@/network/home";

export default {
  name: "Home",
  data() {
    return {
      bannerImgs: [],
      recommends: [],
      querygoodsparam: {
        cmd: "GetWxaWebClsItemList",
        token: "S9i8otRgRYynkogGKjznzkSBXOLYqrSciaD3PCPZJQFG8uK4zvRnYg==",
        version: "1",
        pageNo: 0,
        onePageNum: 10,
        Params: {
          branch_jg: "0000",
          vip_id: -1,
        },
      },
      goods: [],
    };
  },
  components: {
    NavBar,
    Swiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.GetHomeGoodsListdata(this.querygoodsparam);
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;
        this.bannerImgs = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    GetHomeGoodsListdata(querygoodsparam) {
      GetHomeGoodsListdata(querygoodsparam).then((res) => {
        this.goods = res.data;
      });
    },
  },
};
</script>

<style>
#home {
  padding-top: 44px;
}
.home-nav {
  background: var(--color-tint);
  text-align: center;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
}
.home-control {
  position: sticky;
  top: 44px;
}
.clear{
  clear: left;
}
</style>