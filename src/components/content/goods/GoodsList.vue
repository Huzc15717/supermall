<template>
  <div class="goods">
    <div class="goods-item" v-for="(item, index) of goods" :key="index">
      <GoodsListItem :item="item" />
    </div>
    <div v-if="goods.length===0">暂无商品</div>
  </div>
</template>
<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  components: {
    GoodsListItem,
  },
};
</script>
<style scoped>
.goods{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: #eee;
}
.goods-item{
    width: 45%;
    float: left;
    border-radius: 5px;
    background-color: white;
    margin-top: 10px;
}
</style>