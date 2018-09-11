<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in categorys" class="menu-item" @click="selectMenu(index,$event)" :class="{'current':currentIndex === index}" :key="item.id">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in categorys" class="food-list food-list-hook" :key="item.id">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li
              v-for="food in getFoods(item.id)"
              class="food-item border-1px"
              :key="food.id"
            >
              <div class="icon">
                <img width="57" heigh="57" :src="getResourceUrl(food)" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.desc}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.salePrice}}</span>
                  <span class="old" v-show="food.price">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control v-on:add="addCart" v-on:decrease="decreaseCart" :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart v-on:add="addCart" v-on:decrease="decreaseCart" ref="shopcart" :select-foods='selectFoods' :deliveryPrice="seller.deliveryCost" :minPrice="seller.minCost"></shop-cart>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import BScroll from 'better-scroll'
import ShopCart from '../shopcart/ShopCart'
import CartControl from '../cartcontrol/CartControl'
import axios from 'axios'

export default {
  props: {
    seller: {
      type: Object,
      default () {
        return {
          deliveryCost: 4,
          minCost: 20
        }
      }
    },
    diningroomId: Number
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      categorys: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        if (good.count) {
          foods.push(good)
        }
      })
      return foods
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    axios.get('/api/dishes/list/' + this.$route.params.id).then((res) => {
      res = res.data
      if (res.success) {
        let data = res.data
        this.goods = data.dishes
        this.categorys = data.dishesCategoryList
        this.$nextTick(() => {
          this._initScroll()
          this._calulateHeight()
        })
      }
    })
  },
  methods: {
    addCart (id) {
      for (let i = 0; i < this.goods.length; i++) {
        let food = this.goods[i]
        if (food.id === id) {
          if (!food.count) {
            Vue.set(food, 'count', 1)
          } else {
            food.count++
          }
          break
        }
      }
    },
    decreaseCart (id) {
      for (let i = 0; i < this.goods.length; i++) {
        let food = this.goods[i]
        if (food.id === id) {
          food.count--
          break
        }
      }
    },
    getFoods (category) {
      let foods = []
      this.goods.forEach((dish) => {
        if (dish.category === category) {
          foods.push(dish)
        }
      })
      return foods
    },
    getResourceUrl (item) {
      return '/api/resource/download?id=' + item.resourceId + '&hash=' + item.resourceHash
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calulateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    addFood (target) {
      this._drop(target)
    },
    _drop (target) {
      // 体验优化，异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    },
    _followScroll (index) {
      let menuList = this.$refs.menuList
      let el = menuList[index]
      this.meunScroll.scrollToElement(el, 300, 0, -100)
    }
  },
  components: {
    ShopCart,
    CartControl
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixin.styl'

  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          margin-top -1px
          z-index 10
          background #ffffff
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          vertical-align middle
          width  12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7,17,27,0.1))
          font-size 12px
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
          img
            width 57px
            height 57px
        .content
          flex 1
          .name
            margin 2px 0 8px 0px
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240,20,20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
</style>
