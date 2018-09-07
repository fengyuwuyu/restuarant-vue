<template>
  <div>
    <week-meal-header :title="headerTitle" :path="headerPath"></week-meal-header>
    <goods :saleWeek="getWeekDay()" :weekMeal="1"></goods>
  </div>
</template>

<script>
import WeekMealHeader from '@/pages/common/Header'
import Goods from '../saleGoods/Goods'
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  name: 'WeekMeal',
  components: {
    WeekMealHeader,
    Goods
  },
  data () {
    return {
      headerTitle: '在线订餐',
      headerPath: '/',
      dishes: null,
      timeIntervalList: null,
      dishesCategoryList: null
    }
  },
  methods: {
    changeFunc (idx) {
      console.log(idx)
    },
    getWeekMealData () {
      axios.get('/api/dishes/getDishesByDiningroomId?diningroomId=' + this.$route.params.id).then(this.handleGetWeekMeal)
    },
    handleGetWeekMeal (res) {
      res = res.data
      if (res.success && res.data) {
        let data = res.data
        this.changeDiningroom(data.diningroom)
      }
    },
    ...mapMutations(['changeDiningroom'])
  },
  created () {
    this.getWeekMealData()
  },
  mounted () {
  },
  activated () {
  }
}
</script>

<style lang="stylus" scoped>

</style>
