<template>
  <div>
    <week-meal-header :title="headerTitle"></week-meal-header>
    <!--<diningroom-select></diningroom-select>-->
    <week-select></week-select>
  </div>
</template>

<script>
import WeekMealHeader from '@/pages/common/Header'
import DiningroomSelect from './components/DiningroomSelect'
import WeekSelect from './components/WeekSelect'
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  name: 'WeekMeal',
  components: {
    WeekMealHeader,
    DiningroomSelect,
    WeekSelect
  },
  data () {
    return {
      headerTitle: '周工作餐'
    }
  },
  methods: {
    changeFunc (idx) {
    },
    getWeekMealData () {
      console.log(this.$route.params.id)
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
  mounted () {
    this.getWeekMealData()
  }
}
</script>

<style lang="stylus" scoped>

</style>
