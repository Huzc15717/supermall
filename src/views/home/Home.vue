<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <TabControl
      :titles="['流行', '新款', '精选']"
      class="home-control"
      @tabclick="tabclick"
      ref="tabcontrol1"
      v-show="isfixedtabcontrol"
    />
    <Scroll
      class="wrapper"
      ref="wrapper"
      :probeType="3"
      @scroll="wrapperscroll"
      :pullUpLoad="true"
      @pullupload="pullupload"
    >
      <div class="content">
        <Swiper :bannerImgs="bannerImgs" @swiperimgload="swiperimgload" />
        <HomeRecommendView :recommends="recommends" />
        <FeatureView />
        <TabControl
          :titles="['流行', '新款', '精选']"
          class="home-control"
          @tabclick="tabclick"
          ref="tabcontrol2"
        />
        <GoodsList :goods="goods" />
      </div>
    </Scroll>

    <BackTop @click.native="backtop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import NavBar from "@/components/common/navbar/NavBar.vue";
import Swiper from "@/components/common/swiper/Swiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/components/content/TabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import { getHomeMultidata, GetHomeGoodsListdata } from "@/network/home";
import { debounce } from "@/common/utils";

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
        pageNo: 1,
        onePageNum: 20,
        Params: {
          branch_jg: "0000",
          vip_id: -1,
        },
      },
      wrapper: {},
      goods: [],
      currentType: 0,
      isShowBackTop: false,
      tabcontrolOffSetTop: 0,
      isfixedtabcontrol: false,
    };
  },
  components: {
    Scroll,
    NavBar,
    Swiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
  },
  created() {
    this.getHomeMultidata();
    // 2.请求商品数据
    this.GetHomeGoodsListdata(this.querygoodsparam, this.currentType);
  },
  methods: {
    //#region 网络请求相关的方法
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
      GetHomeGoodsListdata(querygoodsparam).then((res) => {
        this.goods.push(...res.data);
        if (res.data.length === 0) {
          this.wrapper.Refresh();
        }
      });
    },
    //#endregion
    //#region 事件监听相关的方法
    tabclick(index) {
      this.goods = [];
      this.currentType = index;
      this.GetHomeGoodsListdata(this.querygoodsparam, this.currentType);
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    backtop() {
      this.$refs.wrapper.scrollTo(0, 0, 500);
    },
    wrapperscroll(position) {
      this.isShowBackTop = -position.y > 1000;
      this.isfixedtabcontrol = -position.y > this.tabcontrolOffSetTop;
    },
    pullupload() {
      this.querygoodsparam.pageNo += 1;
      this.GetHomeGoodsListdata(this.querygoodsparam, this.currentType);
      // 这个地方触发下拉加载更多后，在网络请求绑定值的地方结束？感觉严谨的是在刷新后结束，刷新的位置暂未可知，不确定是否在子组件mounted中，先看视频中是如果绑定的
    },
    swiperimgload() {
      this.tabcontrolOffSetTop = this.$refs.tabcontrol2.$el.offsetTop;
    },
    //#endregion
  },
  mounted() {
    this.wrapper = this.$refs.wrapper;
    const refresh = debounce(this.wrapper.Refresh, 500);
    const finishPullUp = debounce(this.wrapper.finishpullup, 500);
    this.$bus.$on("imgloadrefresh", () => {
      refresh();
      // this.wrapper.Refresh();
      finishPullUp();
    });
  },
};
</script>

<style>
#home {
  height: 100vh;
  position: relative;
}
.wrapper {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.home-nav {
  background: var(--color-tint);
  text-align: center;
  color: #fff;

  /* 下面的注释掉是因为这个是之前原生浏览器滚动的定位，改成better-scroll后不需要了 */
  /* position: fixed;
  top: 0;
  left: 0;
  z-index: 9; */
  width: 100%;
}
.home-control {
  position: relative;
  z-index: 9;
}
</style>