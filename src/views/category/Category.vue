<template>
  <div id="Category">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <Swiper :bannerImgs="bannerImgs" />
        <HomeRecommendView :recommends="recommends" />
        <FeatureView />
        <TabControl
          :titles="['流行', '新款', '精选']"
          class="home-control"
          @tabclick="tabclick"
        />
        <GoodsList :goods="goods" />
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);

import NavBar from "@/components/common/navbar/NavBar.vue";
import Swiper from "@/components/common/swiper/Swiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/components/content/TabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";

import { getHomeMultidata, GetHomeGoodsListdata } from "@/network/home";

export default {
  name: "Category",
  data() {
    return {
      scroll: null,
      bannerImgs: [],
      recommends: [],
      querygoodsparam: {
        cmd: "GetWxaWebClsItemList",
        token: "S9i8otRgRYynkogGKjznzkSBXOLYqrSciaD3PCPZJQFG8uK4zvRnYg==",
        version: "1",
        pageNo: 0,
        onePageNum: 20,
        Params: {
          branch_jg: "0000",
          vip_id: -1,
        },
      },
      goods: [],
      currentType: 0,
    };
  },
  components: {
    NavBar,
    Swiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.GetHomeGoodsListdata(this.querygoodsparam, this.currentType);
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;
        this.bannerImgs = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    GetHomeGoodsListdata(querygoodsparam, index) {
      switch (index) {
        case 0:
          querygoodsparam.Params.pricesort = null;
          querygoodsparam.Params.webcls_id = null;
          break;
        case 1:
          querygoodsparam.Params.pricesort = 2;
          querygoodsparam.Params.webcls_id = null;
          break;
        case 2:
          querygoodsparam.Params.pricesort = null;
          querygoodsparam.Params.webcls_id = 2;
          break;
        default:
          break;
      }
      console.log(JSON.stringify(querygoodsparam));
      GetHomeGoodsListdata(querygoodsparam).then((res) => {
        this.goods = res.data;
      });
    },
    tabclick(index) {
      this.currentType = index;
      this.GetHomeGoodsListdata(this.querygoodsparam, this.currentType);
    },
  },
  mounted() {
    this.$nextTick(() => {
        console.log(document.querySelector(".content").clientHeight);
    //   这个地方会在已进入界面的时候就要下拉加载更多是因为上面的高度是345，这个不对吧
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        pullUpLoad: true,
      });
      this.scroll.on("pullingUp", () => {
        console.log("上啦加载更多");

        setTimeout(() => {
          this.scroll.finishPullUp();
          this.scroll.refresh();
        }, 2000);
      });
      // this.scroll=new BScroll(document.querySelector('.wrapper'),{

      // })
    });
  },
};
</script>

<style scoped>
#Category {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
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
.wrapper {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>