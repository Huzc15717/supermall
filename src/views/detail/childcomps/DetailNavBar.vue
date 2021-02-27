<template>
  <div id="detailnavbar">
    <NavBar>
      <div slot="left" class="back" @click="back">
        <img src="@/assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="detailnav">
        <div
          class="detailnav-item"
          v-for="(type, index) of title"
          :key="index"
          @click="detailitemclick(index)"
          :class="{ active: index === currentIndex }"
        >
          {{ type }}
        </div>
      </div>
    </NavBar>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      title: ["商品", "评论", "详情", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    back() {
      this.$router.back();
    },
    detailitemclick(index) {
      this.currentIndex = index;
    },
  },
};
</script>
<style scoped>
.detailnav {
  display: flex;
  justify-content: space-around;
}
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
}
.active {
  color: var(--color-tint);
}
</style>