<template>
  <div>
    <diningroom-header :title="headerTitle" :path="headerPath"></diningroom-header>
    <div class="curr">
      <div class="title">当前餐厅</div>
      <div class="content">{{this.diningroom.name}}</div>
    </div>
    <ul class="items">
      <li
        class="item"
        v-for="item in diningroomList"
        v-on:click="handleDiningroomClick(item)"
        :key="item.id"
      >
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import DiningroomHeader from '@/pages/common/Header'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'DiningroomList',
  components: {
    DiningroomHeader
  },
  data () {
    return {
      headerTitle: '餐厅列表',
      headerPath: '/weekMeal'
    }
  },
  computed: {
    ...mapState(['diningroom', 'diningroomList'])
  },
  methods: {
    handleDiningroomClick (item) {
      this.changeDiningroom(item)
      this.$router.push('/weekMeal')
    },
    ...mapMutations(['changeDiningroom'])
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>

</style>
