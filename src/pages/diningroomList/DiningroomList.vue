<template>
  <div>
    <diningroom-header :title="headerTitle" :path="headerPath"></diningroom-header>
    <ul class="items">
      <router-link
        tag="li"
        :to="getDiningroomPath(item.id)"
        class="item"
        v-for="item in diningroomList"
        :key="item.id"
      >
        <img class="item-img" :src="getResourceUrl(item)" />
        <div class="item-info">
          <p class="item-title">{{item.name}}</p>
          <p class="item-detail">
            <span class="item-detail-star"><span class="iconfont">&#xe938;</span>4.7</span>
            <span class="item-detail-sale">月售1212</span></p>
          <p class="item-deliver">
            <span>起送¥{{item.minCost}}</span>
            <span>配送¥{{item.deliveryCost}}</span>
          </p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import DiningroomHeader from '@/pages/common/Header'
import axios from 'axios'
export default {
  name: 'DiningroomList',
  components: {
    DiningroomHeader
  },
  data () {
    return {
      headerTitle: '餐厅列表',
      headerPath: '/weekMeal',
      diningroomList: []
    }
  },
  methods: {
    handleGetDiningroomList (res) {
      res = res.data
      if (res.success) {
        let data = res.data
        this.diningroomList = data.diningroomList
      }
    },
    getResourceUrl (item) {
      return '/api/resource/download?id=' + item.resourceId + '&hash=' + item.resourceHash
    },
    getDiningroomPath (diningroomId) {
      console.log(this.$route.params.id)
      if (this.$route.params.id && this.$route.params.id === '2') {
        return '/saleMeal/' + diningroomId
      }
      return '/weekMeal/' + diningroomId
    }
  },
  mounted () {
    axios.get('/api/diningroom/list').then(this.handleGetDiningroomList)
  }
}
</script>

<style lang="stylus" scoped>
  .items
    overflow hidden
    .item
      overflow: hidden
      display: flex
      height: 1.9rem
      .item-img
        width: 1.7rem
        height: 1.7rem
        padding: .1rem
      .item-info
        display flex
        flex-direction column
        flex: 1
        padding: .1rem
        min-width: 0
        .item-title
          line-height: .54rem
          font-size: .30rem
          font-weight: normal
          font-stretch: normal
          letter-spacing: 1px
          color: #000000
          ellipsis()
        .item-detail, .item-deliver
          height .6rem
          line-height .6rem
          font-size .2rem
          font-weight: normal
          font-stretch: normal
          letter-spacing: 1px
          color: #545454
          ellipsisWrap()
          .item-detail-star
            color #fe6000
          .item-detail-sale
            font-family: MicrosoftYaHei
</style>
