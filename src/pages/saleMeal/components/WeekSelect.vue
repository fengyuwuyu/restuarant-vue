<template>
  <div>
    <vue-tabs class="week">
      <v-tab title="周一" class="week-item">
        <goods :dishes="getDishesByDiningroom(1)" :timeIntervalList="timeIntervalList" :dishesCategoryList="dishesCategoryList"></goods>
      </v-tab>
      <v-tab title="周二" class="week-item">
        <goods :dishes="getDishesByDiningroom(2)" :timeIntervalList="timeIntervalList" :dishesCategoryList="dishesCategoryList"></goods>
      </v-tab>
      <v-tab title="周三" class="week-item">
        <goods :dishes="getDishesByDiningroom(4)" :timeIntervalList="timeIntervalList" :dishesCategoryList="dishesCategoryList"></goods>
      </v-tab>
      <v-tab title="周四" class="week-item">
        <goods :dishes="getDishesByDiningroom(8)" :timeIntervalList="timeIntervalList" :dishesCategoryList="dishesCategoryList"></goods>
      </v-tab>
      <v-tab title="周五" class="week-item">
        <goods :dishes="getDishesByDiningroom(16)" :timeIntervalList="timeIntervalList" :dishesCategoryList="dishesCategoryList"></goods>
      </v-tab>
      <v-tab title="周六" class="week-item" v-if="getDishesByDiningroom(32).length > 0">
        <goods :dishes="getDishesByDiningroom(32)" :timeIntervalList="timeIntervalList" :dishesCategoryList="dishesCategoryList"></goods>
      </v-tab>
      <v-tab title="周日" class="week-item" v-if="getDishesByDiningroom(64).length > 0">
        <goods :dishes="getDishesByDiningroom(64)" :timeIntervalList="timeIntervalList" :dishesCategoryList="dishesCategoryList"></goods>
      </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
import Goods from '../../weekGoods/Goods'
export default {
  name: 'WeekSelect',
  components: {
    Goods
  },
  props: {
    dishes: Array,
    timeIntervalList: Array,
    dishesCategoryList: Array,
    diningroom: Object
  },
  methods: {
    getDishesByDiningroom (week) {
      if (this.dishes) {
        let tmp = []
        this.dishes.forEach((item) => {
          if ((item.saleWeekDay & week) === week) {
            tmp.push(item)
          }
        })
        return tmp
      }
      return []
    }
  },
  mounted () {
    console.log(this.dishes)
  }
}
</script>

<style lang="stylus" scoped>

  .nav-tabs-wrapper,.nav-tabs,.tab,.tabs__link,.active_tab,.tab>a
    height .07rem !important
  .week
    width 100%
    font-size .07rem
</style>
