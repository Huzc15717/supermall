<template>
  <div id="detail">
    <DetailNavBar />
    <Scroll class="bscroll">
      <div class="content">
        <Swiper class="detail-swiper">
          <swiper-item v-for="(topimg, index) in TopImgs" :key="index">
            <img :src="topimg.pic_url" alt="" />
          </swiper-item>
        </Swiper>
      </div>
    </Scroll>
  </div>
</template>
<script>
import DetailNavBar from "@/views/detail/childcomps/DetailNavBar";
import Scroll from "@/components/common/scroll/Scroll";
import { Swiper, SwiperItem } from "@/components/common/swiper";

import { Getotodata } from "@/network/detail";

export default {
  name: "Detail",
  data() {
    return {
      paramquery: {
        cmd: "GetWxaItemDetail",
        token: "S9i8otRgRYynkogGKjznzkSBXOLYqrSciaD3PCPZJQFG8uK4zvRnYg==",
        version: "1",
        pageNo: 0,
        onePageNum: 10,
        Params: {
          branch_jg: "0000",
          item_id: 0,
          openid: "oUfv4wLhBhg2RK4Gi5C7mpjfyM6M",
          vip_id: 63,
        },
      },
      TopImgs: [],
    };
  },
  components: {
    DetailNavBar,
    Scroll,
    Swiper,
    SwiperItem,
  },
  created() {
    console.log(this.$route.params.id);
    this.paramquery.Params.item_id = this.$route.params.id;
    Getotodata("/wxa/GetWxaItemDetail", "POST", this.paramquery).then((res) => {
      // console.log(res);
      this.TopImgs = res.data.piclist;
    });
  },
};
</script>
<style scoped>
#detail {
  height: 100vh;
  position: relative;
}
.bscroll {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>