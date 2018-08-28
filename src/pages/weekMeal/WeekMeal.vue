<template>
  <div>
    <week-meal-header :title="headerTitle" :path="headerPath"></week-meal-header>
    <diningroom-select></diningroom-select>
    <week-select></week-select>
  </div>
</template>

<script>
import WeekMealHeader from '@/pages/common/Header'
import DiningroomSelect from './components/DiningroomSelect'
import WeekSelect from './components/WeekSelect'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'WeekMeal',
  components: {
    WeekMealHeader,
    DiningroomSelect,
    WeekSelect
  },
  data () {
    return {
      headerTitle: '周工作餐',
      headerPath: '/'
    }
  },
  computed: {
    ...mapState(['diningroom', 'diningroomList'])
  },
  methods: {
    changeFunc (idx) {
      console.log(idx)
    },
    getWeekMealData () {
      axios.get('/api/dishes/getWeekMeal').then(this.handleGetWeekMeal)
    },
    handleGetWeekMeal (res) {
      if (res && res.data) {
        let data = res.data.data
        this.changeDiningroomList(data.diningroomList)
        if (!localStorage.diningroom && this.diningroomList) {
          for (let i = 0; i < this.diningroomList.length; i++) {
            let item = this.diningroomList[i]
            if (item.isDefault === 1) {
              this.changeDiningroom(item)
              break
            }
          }
        }
      }
    },
    ...mapMutations(['changeDiningroom', 'changeDiningroomList'])
  },
  mounted () {
    this.getWeekMealData()
  },
  activated () {
  }
}
</script>

<style lang="stylus" scoped>

</style>
