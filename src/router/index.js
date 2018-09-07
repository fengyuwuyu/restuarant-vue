import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Contacts from '@/pages/contacts/Contacts'
import WeekMeal from '@/pages/weekMeal/WeekMeal'
import SaleMeal from '@/pages/saleMeal/SaleMeal'
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
      path: '/saleMeal/:id',
      name: 'SaleMeal',
      component: SaleMeal
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
