import Vue from 'vue'
import Router from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const Home = () => import('@/views/home/Home.vue')
const Category = () => import('@/views/category/Category.vue')
const ShopCar = () => import('@/views/shopcar/Car.vue')
const Mine = () => import('@/views/mine/Mine.vue')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/shopcar',
      component: ShopCar
    },
    {
      path: '/mine',
      component: Mine
    }
  ],
  mode:'history'
})
