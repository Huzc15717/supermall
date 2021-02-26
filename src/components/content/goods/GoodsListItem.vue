<template>
  <div class="goodsitem" @click="itemclick">
    <img :src="item.pic_url" alt="" @load="imgload" />
    <div class="item-desc">
      <p>{{ item.item_name }}</p>
      <span class="item-prc">￥{{ item.disp_prc }}</span>
      <a href=""><span class="item-like">看相似</span></a>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    //计算属性不能传值，但可以使用闭包的方式传值
    //此处不使用计算属性时因为计算属性截取字符串长度问题，因为一个字母和汉字长度都是1，但是界面上显示的长度就不一样了，所以改成从html和css上实现文字缩放
    itemnamecut() {
      return function (itemname) {
        return itemname.length <= 15
          ? itemname
          : itemname.substring(0, 15) + "...";
      };
    },
  },
  methods: {
    imgload() {
      this.$bus.$emit("imgloadrefresh");
    },
    itemclick() {
      this.$router.push("/detail/" + this.item.item_id);
    },
  },
};
</script>
<style scoped>
.goodsitem {
  width: 100%;
  height: 220px;
}
.goodsitem img {
  width: 100%;
  height: 170px;
  display: block;
}
.item-desc {
  padding: 5px;
  width: 100%;
}
.item-prc {
  color: var(--color-high-text);
  font-size: 16px;
  font-weight: bold;
}
.item-desc p {
  font-size: 12px;
  color: black;
  width: 100%;
  height: 20px;
  line-height: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-like {
  width: 35%;
  height: 20px;
  background-color: #eee;
  float: right;
  color: grey;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>