<template>

    <div class="tab-bar-Item" @click="itemclick">
        <div v-if="!isactive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-active-icon"></slot>
        </div>
        <div :style="activetext">
            <slot name="item-text"></slot>
        </div>
    </div>
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
            <div>首页</div> -->

    <!-- <div class="tab-bar-Item">
            <img src="../../assets/img/tabbar/type.svg" alt="">
            <div>分类</div>
        </div>
        <div class="tab-bar-Item">
            <img src="../../assets/img/tabbar/shopcar.svg" alt="">
            <div>购物车</div>
        </div>
        <div class="tab-bar-Item">
            <img src="../../assets/img/tabbar/mine.svg" alt="">
            <div>我的</div>
        </div> -->

</template>

<script>
    export default {
        name: 'TabBarItem',
        props: {
            path: String,//定义传入参数
            textcolor: {
                type: String,
                default:'red'
            }
        },
        data() {
            return {
                // isactive: true
            }
        },
        computed: {
            isactive() {
                return this.$route.path.indexOf(this.path) !== -1
            },
            activetext() {
                return this.isactive ? { color: this.textcolor } : {}
            }
        },
        methods: {
            itemclick() {
                this.$router.push(this.path)
            }
        },
    }
</script>

<style scoped>
    .tab-bar-Item {
        flex: 1;
        text-align: center;
        height: 49px;
    }

    .tab-bar-Item img {
        width: 24px;
        height: 24px;
    }

    /* .active {
        color: #f2003c;
    } */
</style>