<template>
  <div class="cart-control">
    <simple-fade>
      <div class="cart-decrease" v-show="food.count>0" v-on:click.stop.prevent="decreaseCart"></div>
    </simple-fade>
      <!-- 一个层平移一个层滚动， -->
      <span class="iconfont inner">&#xe633;</span>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add iconfont" v-on:click.stop.prevent="addCart">&#xe632;</div>
  </div>
</template>

<script>
import Vue from 'vue'
import SimpleFade from '@/pages/common/animation/fade/SimpleFade'
export default {
  name: 'CartControl',
  components: {
    SimpleFade
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    // 增加按钮数量
    addCart (event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // 派发一个事件
      // // 当添加一个商品时，派发一个事件，把这个event.target dom对象，作为cart.add事件参数传入，然后在goods组件写一个方法
      this.$dispatch('cart.add', event.target)
    },
    // 减少按钮数量
    decreaseCart (event) {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cart-control
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: .03rem
      transition: all 0.4s linear

      &.move-transition
        opacity: 1
        transform: translate3d(0, 0, 0)
        .inner
          display: inline-block
          line-height: .48rem
          font-size: .48rem !important
          color: rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-enter, &.move-leave
        opacity: 0
        transform: translate3d(.48rem, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: .24rem
      padding-top: .03rem
      line-height: .48rem
      text-align: center
      font-size: .2rem
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: .03rem
      line-height: .48rem
      font-size: .48rem
      color: rgb(0, 160, 220)
</style>
