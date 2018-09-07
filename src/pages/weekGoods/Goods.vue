<template>
  <div class="goods" ref="goods">
  <!-- 左侧menu-wrapper -->
    <div class="menu-wrapper" ref="menu-wrapper">
    <!--大小写敏感，v-el: api 接口获取dom对象  -->
      <ul>
        <li
          v-for="(item, index) in getTimeIntervalList"
          class="menu-item"
          :class="{current:currentIndex===index}"
          v-on:click="selectMenu(index,item)"
          :key="item.id"
        >
          <!--  better-scrollpc段没阻止默认事件，我们有派发一个；点击一下，出现两个事件，这是我们把事件也传过去，在函数中解决-->
          <span class="text border-1px">
            <span class="icon guarantee"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
     <!-- 右侧foods-wrapper -->
    <div class="foods-wrapper" ref="foods-wrapper">
      <span ref="top"></span>
      <!-- 外层商品类别遍历goods -->
      <ul class="food-items">
        <li v-for="item in getDishesCategoryList" class="food-list food-list-hook" :key="item.id">
          <h1 class="title">{{item.name}}</h1>

          <!-- 类别里的单个商品遍历item.foods -->
          <ul>
            <li v-on:click="selectFood(food, $event)" v-for="food in selectFoodsByCategory(item.id)" class="food-item border-1px" :key="food.id">
              <div class="icon">
                <img width="57" height="57" :src="getResourceUrl(food)">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.remark}}</p>
                <div class="extra">
                  <span class="count">月售{{1}}份</span><span>好评率{{100}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.salePrice || food.price}}</span>
                  <span class="old" v-show="food.salePrice">￥{{food.price}}</span>
                </div>
                <!-- cartcontrol组件+-小按钮 -->
                <div class="cart-control-wrapper">
                  <cart-control v-if="weekMeal != 1" :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 底部购物车 -->
    <shop-cart v-if="weekMeal != 1" ref="shop-cart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shop-cart>
    <!--  获取被选择的foots,传导cartconcontrol组件 -->
    <food v-if="weekMeal != 1" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ShopCart from './components/ShopCart'
import CartControl from './components/CartControl'
import Food from './components/Food'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Goods',
  components: {
    ShopCart,
    CartControl,
    Food
  },
  props: {
    seller: {
      type: Object,
      default () {
        return {
          deliveryPrice: 4,
          minPrice: 2
        }
      }
    },
    weekMeal: {
      type: Number,
      default () {
        return 0
      }
    },
    diningroomId: Number,
    saleWeek: Number
  },
  data () {
    return {
      goods: [],
      // foods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
      currentIndex: 0,
      dishes: [],
      timeIntervalList: Array,
      dishesCategoryList: Array,
      showedDishes: {}
    }
  },
  computed: {
    // 获取滑动到相应区间的索引，去和menu-item遍历是的$index对应，联动
    // currentIndex () {
    //   for (let i = 0; i < this.listHeight.length; i++) {
    //     let height1 = this.listHeight[i]
    //     let height2 = this.listHeight[i + 1]
    //     if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
    //       return i
    //     }
    //   }
    //   return 0
    // },
    // 获取被选择的foots
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count && food.count > 0) {
            foods.push(food)
          }
        })
      })
      return foods
    },
    getDishesCategoryList () {
      return this.dishesCategoryList || []
    },
    getTimeIntervalList () {
      return this.timeIntervalList || []
    },
    ...mapState(['diningroom'])
  },
  methods: {
    getBasicData () {
      axios.get('/api/dishes/getDishesByDiningroomIdAndSaleWeek?diningroomId=' + this.diningroom.id + '&saleWeek=' + this.saleWeek).then(this.handleBasicData)
    },
    handleBasicData (res) {
      res = res.data
      if (res.success) {
        let data = res.data
        this.timeIntervalList = data.timeIntervalList
        this.dishesCategoryList = data.dishesCategoryList
        this.dishes = data.dishes
        this.selectMenu(0, this.timeIntervalList[0])
      }
    },
    selectFoodsByCategory (category) {
      let foods = []
      this.goods.forEach((good) => {
        if (good.category === category) {
          foods.push(good)
        }
      })
      return foods
    },
    getResourceUrl (item) {
      return '/api/resource/download?id=' + item.resourceId + '&hash=' + item.resourceHash
    },
    // 选中的菜单
    selectMenu (index, timeInterval) {
      this.currentIndex = index
      let tempDishes = []
      // let categoryDishesList = []
      let timeIntervalId = timeInterval.id
      this.dishes.forEach((item) => {
        if ((item.timeIntervalType & timeIntervalId) === timeIntervalId) {
          tempDishes.push(item)
        }
      })
      this.goods = tempDishes
      this.foodsScroll.scrollToElement(this.$refs.top[0])
    },
    // 选中的food
    selectFood (food, event) {
      this.selectedFood = food
      // this.$refs.food.show()
    },
    // 下落方法，给shopcart组件定义_drop方法
    _drop (target) {
      // 体验优化,异步执行下落动画
      let me = this
      this.$nextTick(() => {
        // 获取到点击的dom元素
        me.$refs['shop-cart'].drop(target)
      })
    },

    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true// better-scroll取消默认事件，我们这里在派发一个点击事件
      })

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },

    _calculateHeight () {
      let foodList = this.$refs['foodsWrapper'].getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  mounted () {
    this.getBasicData()
    this.foodsScroll = new BScroll(this.$refs['foods-wrapper'])
  },
  events: {
    // 一个接受事件方法，由父组件接受到cartconcontrol传过来的事件；
    // 拿到这个事件，调用子组件的一个方法shopcart.vue的方法,进行处理动作
    'cart.add' (target) {
      this._drop(target)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixin.styl"
  .goods
    width: 100%
    margin-top .08rem
    .menu-wrapper
      width: 1.6rem
      background: #f3f5f7
      .menu-item
        display: table
        height: .8rem
        width: 1.12rem
        padding: 0 .24rem
        line-height: .28rem
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('../../assets/img/goods/decrease_3')
          &.discount
            bg-image('../../assets/img/goods/discount_3')
          &.guarantee
            bg-image('../../assets/img/goods/guarantee_3')
          &.invoice
            bg-image('../../assets/img/goods/invoice_3')
          &.special
            bg-image('../../assets/img/goods/special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      position: fixed
      z-index: 99
      top: 1.58rem
      left: 1.6rem
      right: 0
      bottom 0
      overflow auto
      /*flex: 1*/
      .food-items
        margin-bottom .1rem
        .title
          padding-left: .28rem
          height: .52rem
          line-height: .52rem
          border-left: .04rem solid #d9dde1
          font-size: .24rem
          color: rgb(147, 153, 159)
          background: #f3f5f7
        .food-item
          display: flex
          margin: .36rem
          padding-bottom: .36rem
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 1.14rem
            margin-right: .2rem
          .content
            flex: 1
            .name
              margin: .04rem 0 .16rem 0
              height: .28rem
              line-height: .28rem
              font-size: .28rem
              color: rgb(7, 17, 27)
            .desc, .extra
              line-height: .2rem
              font-size: .2rem
              color: rgb(147, 153, 159)
            .desc
              line-height: .24rem
              margin-bottom: .16rem
            .extra
              .count
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
            .cart-control-wrapper
              position: absolute
              right: 0
              bottom: 12px
</style>
