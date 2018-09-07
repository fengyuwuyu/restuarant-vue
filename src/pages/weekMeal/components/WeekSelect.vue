<template>
  <div>
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">周一</mt-tab-item>
      <mt-tab-item id="2">周二</mt-tab-item>
      <mt-tab-item id="3">周三</mt-tab-item>
      <mt-tab-item id="4">周四</mt-tab-item>
      <mt-tab-item id="5">周五</mt-tab-item>
      <mt-tab-item id="6">周六</mt-tab-item>
      <mt-tab-item id="0">周日</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <goods :saleWeek="1" :weekMeal="1"></goods>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <goods :saleWeek="2" :weekMeal="1"></goods>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <goods :saleWeek="4" :weekMeal="1"></goods>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <goods :saleWeek="8" :weekMeal="1"></goods>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <goods :saleWeek="16" :weekMeal="1"></goods>
      </mt-tab-container-item>
      <mt-tab-container-item id="6">
        <goods :saleWeek="32" :weekMeal="1"></goods>
      </mt-tab-container-item>
      <mt-tab-container-item id="0">
        <goods :saleWeek="64" :weekMeal="1"></goods>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Vue from 'vue'
import Goods from '../../weekGoods/Goods'
import { Tabbar, TabItem, Navbar, Cell, TabContainer, TabContainerItem } from 'mint-ui'

Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Navbar.name, Navbar)
Vue.component(Cell.name, Cell)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)

export default {
  name: 'WeekSelect',
  components: {
    Goods
  },
  props: {
    diningroom: Object
  },
  data () {
    return {
      selected: '2'
    }
  },
  methods: {
    getDishesByDiningroom (week) {
      // if (this.dishes) {
      //   let tmp = []
      //   this.dishes.forEach((item) => {
      //     if ((item.saleWeekDay & week) === week) {
      //       tmp.push(item)
      //     }
      //   })
      //   return tmp
      // }
      return [{}]
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  .mint-navbar .mint-tab-item
    padding .2rem 0 !important
  .week
    width 100%
    font-size .07rem
</style>
