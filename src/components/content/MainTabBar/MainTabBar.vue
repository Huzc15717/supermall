<template>
    <tab-bar>
        <tab-bar-item path="/home" textcolor="red">
            <!-- 此处path后面是字符串，如果是变量，就必须使用v-bind绑定path -->
            <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
            <img slot="item-active-icon" src="~assets/img/tabbar/home-active.svg" alt="">
            <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item path="/category">
            <img slot="item-icon" src="~assets/img/tabbar/type.svg" alt="">
            <img slot="item-active-icon" src="~assets/img/tabbar/type-active.svg" alt="">
            <div slot="item-text">分类</div>
        </tab-bar-item>
        <tab-bar-item path="/shopcar">
            <img slot="item-icon" src="~assets/img/tabbar/shopcar.svg" alt="">
            <img slot="item-active-icon" src="~assets/img/tabbar/shopcar-active.svg" alt="">
            <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item path="/mine">
            <img slot="item-icon" src="~assets/img/tabbar/mine.svg" alt="">
            <img slot="item-active-icon" src="~assets/img/tabbar/mine-active.svg" alt="">
            <div slot="item-text">我的</div>
        </tab-bar-item>
    </tab-bar>
</template>

<script>
    import TabBar from '@/components/common/tabbar/TabBar.vue'
    import TabBarItem from '@/components/common/tabbar/TabBarItem.vue'

    export default {
        name: 'MainTabBar',
        components: {
            TabBar,
            TabBarItem
        }
    }
</script>

<style scoped></style>