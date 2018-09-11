import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Contacts from '@/pages/contacts/Contacts'
import WeekMeal from '@/pages/weekMeal/WeekMeal'
import Seller from '@/pages/seller/Seller'
// import Seller from '@/pages/seller/Seller'
import Goods from '@/pages/seller/components/goods/Goods'
import Ratings from '@/pages/seller/components/ratings/Ratings'
import SellerInfo from '@/pages/seller/components/seller/SellerInfo'
import DiningroomEvaluate from '@/pages/diningroomEvaluate/DiningroomEvaluate'
import DiningroomList from '@/pages/diningroomList/DiningroomList'
import Demo from '@/pages/demo/Demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/demo',
      name: 'Demo',
      component: Demo
    }, {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts
    }, {
      path: '/weekMeal/:id',
      name: 'WeekMeal',
      component: WeekMeal
    }, {
      path: '/seller/:id',
      name: 'Seller',
      component: Seller,
      children: [
        {
          path: 'goods',
          component: Goods
        },
        {
          path: 'ratings',
          component: Ratings
        },
        {
          path: 'sellerInfo',
          component: SellerInfo
        }
      ]
    }, {
      path: '/diningroomEvaluate',
      name: 'DiningroomEvaluate',
      component: DiningroomEvaluate
    }, {
      path: '/diningroomList/:id',
      name: 'DiningroomList',
      component: DiningroomList
    }
  ]
})
