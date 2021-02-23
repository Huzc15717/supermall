<template>
  <div
    class="banner"
    @touchstart="touchstartHandler"
    @touchmove="touchmoveHandler"
    @touchend="touchendHandeler"
  >
    <!-- <slot name="imgs"></slot>
    <slot name="points"></slot> -->
    <ul>
      <li v-for="(item, id) in bannerImgs" :key="id">
        <a :href="item.link"><img :src="item.image" alt="" /></a>
      </li>
    </ul>
    <ol>
      <li v-for="(item, index) in bannerImgs.length" :key="index"></li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Swiper",
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
      left: 0,
      center: 0,
      right: 1,
      slideCount: 0,
      startX: 0,
      startTime: null,
      timer: null,
      bannerLis: [],
      pointLis: [],
      screenWidth: 0,
      imgSrc: "~@/assets/img/swiper/",
    };
  },
  mounted() {
    setTimeout(() => {//这个地方延时加载是为了保证v-for里面的数据生成了dom元素，正常项目中肯定不能这么做
      let banner = document.querySelector(".banner");
      let bannerUl = banner.querySelector("ul");
      this.bannerLis = bannerUl.querySelectorAll("li");

      let points = banner.querySelector("ol");
      this.pointLis = points.querySelectorAll("li");

      this.screenWidth = document.documentElement.offsetWidth;

      //console.log("mounted " + this.bannerLis.length); //第一次加载是0
      banner.style.height = this.bannerLis[0].offsetHeight + "px";

      this.left = this.bannerLis.length - 1;
      this.center = 0;
      this.right = 1;

      this.timer = null;

      this.startX = 0;
      this.startTime = null;
      //banner.addEventListener("touchstart", touchstartHandler); // 滑动开始绑定的函数 touchstartHandler
      //banner.addEventListener("touchmove", touchmoveHandler); // 持续滑动绑定的函数 touchmoveHandler
      //banner.addEventListener("touchend", touchendHandeler); // 滑动结束绑定的函数 touchendHandeler

      // 归位（多次使用，封装成函数）
      this.setTransform();

      // 调用定时器
      this.timer = setInterval(this.showNext, 2000);

      this.pointLis[0].classList.add("active");
    }, 1000);
  },
  methods: {
    touchstartHandler(e) {
      clearInterval(this.timer);
      this.startTime = Date.now();
      this.startX = e.changedTouches[0].clientX;
    },
    touchmoveHandler(e) {
      let dx = e.changedTouches[0].clientX - this.startX;
      this.setTransition(0, 0, 0);
      this.setTransform(dx);
    },
    touchendHandeler(e) {
      // 在手指松开的时候，要判断当前是否滑动成功
      let dx = e.changedTouches[0].clientX - this.startX;
      // 获取时间差
      let dTime = Date.now() - this.startTime;
      // 滑动成功的依据是滑动的距离（绝对值）超过屏幕的三分之一 或者滑动的时间小于300毫秒同时滑动的距离大于30
      if (
        Math.abs(dx) > this.screenWidth / 3 ||
        (dTime < 300 && Math.abs(dx) > 30)
      ) {
        // 滑动成功了
        // 判断用户是往哪个方向滑
        if (dx > 0) {
          // 往右滑 看到上一张
          this.showPrev();
        } else {
          // 往左滑 看到下一张
          this.showNext();
        }
      } else {
        // 添加上过渡
        this.setTransition(1, 1, 1);
        // 滑动失败了
        this.setTransform();
      }

      // 重新启动定时器
      clearInterval(this.timer);
      // 调用定时器
      this.timer = setInterval(this.showNext, 2000);
    },
    setPoint() {
      for (let i = 0; i < this.pointLis.length; i++) {
        this.pointLis[i].classList.remove("active");
      }
      this.pointLis[this.center].classList.add("active");
    },
    setTransform(dx) {
      dx = dx || 0;
      this.bannerLis[this.left].style.transform =
        "translateX(" + (-this.screenWidth + dx) + "px)";
      this.bannerLis[this.center].style.transform = "translateX(" + dx + "px)";
      this.bannerLis[this.right].style.transform =
        "translateX(" + (this.screenWidth + dx) + "px)";
    },
    setTransition(a, b, c) {
      if (a) {
        this.bannerLis[this.left].style.transition = "transform 1s";
      } else {
        this.bannerLis[this.left].style.transition = "none";
      }
      if (b) {
        this.bannerLis[this.center].style.transition = "transform 1s";
      } else {
        this.bannerLis[this.center].style.transition = "none";
      }
      if (c) {
        this.bannerLis[this.right].style.transition = "transform 1s";
      } else {
        this.bannerLis[this.right].style.transition = "none";
      }
    },
    showPrev() {
      this.right = this.center;
      this.center = this.left;
      this.left--;
      if (this.left < 0) {
        this.left = this.bannerLis.length - 1;
      }

      //添加过渡（多次使用，封装成函数）
      this.setTransition(0, 1, 1);
      // 归位
      this.setTransform();

      this.setPoint();
    },
    showNext() {
      // 轮转下标
      this.left = this.center;
      this.center = this.right;
      this.right++;
      //　极值判断
      if (this.right > this.bannerLis.length - 1) {
        this.right = 0;
      }
      //添加过渡（多次使用，封装成函数）
      this.setTransition(1, 1, 0);
      // 归位
      this.setTransform();

      this.setPoint();
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

img {
  display: block;
  width: 100%;
  height: auto;
}

li {
  list-style-type: none;
}

.banner {
  overflow: hidden;
  position: relative;
}

.banner ul li {
  position: absolute;
  transform: translateX(300%);
}

.banner ol {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  bottom: 10px;
}

.banner ol li {
  width: 5px;
  height: 5px;
  border: 1px solid white;
  border-radius: 50%;
  margin: 0px 2px;
}

.banner ol li.active {
  background-color: white;
}
</style>