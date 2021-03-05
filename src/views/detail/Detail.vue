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
        <DetailPrc :goodprc="goodsprc" />
      </div>
    </Scroll>
  </div>
</template>
<script>
import DetailNavBar from "@/views/detail/childcomps/DetailNavBar";
import Scroll from "@/components/common/scroll/Scroll";
import { Swiper, SwiperItem } from "@/components/common/swiper";
import DetailPrc from "@/views/detail/childcomps/DetailPrc";

import { Getotodata, GoodsPrc, itemdesc } from "@/network/detail";

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
      goodsprc: {},
      itemdesc: {},
    };
  },
  components: {
    DetailNavBar,
    Scroll,
    Swiper,
    SwiperItem,
    DetailPrc,
  },
  created() {
    this.paramquery.Params.item_id = this.$route.params.id;
    Getotodata("/wxa/GetWxaItemDetail", "POST", this.paramquery).then((res) => {
      this.TopImgs = res.data.piclist;
      this.goodsprc = new GoodsPrc(res.data);
      this.itemdesc = new itemdesc(res.data);
    });
  },
};
</script>
<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.bscroll {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
}
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>