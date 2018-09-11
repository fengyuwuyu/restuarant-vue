<template>
  <div class="seller">
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="'/seller/' + this.diningroomId + '/goods'">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="'/seller/' + this.diningroomId + '/ratings'">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="'/seller/' + this.diningroomId + '/sellerInfo'">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller" :diningroomId="diningroomId"></router-view>
  </div>
</template>

<script>
import Header from './components/header/Header.vue'
import axios from 'axios'
export default {
  name: 'SellerInfo',
  data () {
    return {
      seller: {},
      diningroomId: null
    }
  },
  components: {
    'v-header': Header
  },
  created () {
    // vue resource
    this.diningroomId = parseInt(this.$route.params.id)
    axios.get('api/diningroom/get/' + this.diningroomId).then((res) => {
      res = res.data
      if (res.success) {
        let data = res.data
        this.seller = data.diningroom
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixin.styl'
  .seller
    .tab
      display: flex
      height: 40px
      width: 100%
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        text-align: center
        flex: 1
        & > a
          display block
          text-decoration none
          color rgb(77,85,93)
          font-size 14px
          &.active
            color rgb(240,20,20)
</style>
