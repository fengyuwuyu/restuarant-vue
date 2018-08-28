<template>
  <div class="goods">
  <!-- 左侧menu-wrapper -->
    <div class="menu-wrapper" :ref="menu-wrapper">
    <!--大小写敏感，v-el: api 接口获取dom对象  -->
      <ul>
        <li
          v-for="item in goods"
          class="menu-item"
          :class="{current:currentIndex===$index}"
          v-on:click="selectMenu($index,$event)"
          :key="item.id"
        >
          <!--  better-scrollpc段没阻止默认事件，我们有派发一个；点击一下，出现两个事件，这是我们把事件也传过去，在函数中解决-->
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
     <!-- 右侧foods-wrapper -->
    <div class="foods-wrapper" :ref="foods-wrapper">

      <!-- 外层商品类别遍历goods -->
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook" :key="item.id">
          <h1 class="title">{{item.name}}</h1>

          <!-- 类别里的单个商品遍历item.foods -->
          <ul>
            <li v-on:click="selectFood(food, $event)" v-for="food in item.foods" class="food-item border-1px" :key="food.id">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old"
                                                                v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <!-- cartcontrol组件+-小按钮 -->
                <div class="cart-control-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 底部购物车 -->
    <shop-cart :ref="shop-cart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shop-cart>
    <!--  获取被选择的foots,传导cartconcontrol组件 -->
    <food :food="selectedFood" :ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ShopCart from './components/ShopCart'
import CartControl from './components/CartControl'
import Food from './components/Food'
import axios from 'axios'

export default {
  name: 'Goods',
  components: {
    ShopCart,
    CartControl,
    Food
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
    // 获取滑动到相应区间的索引，去和menu-item遍历是的$index对应，联动
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
    // 获取被选择的foots
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    axios.get('/api/dishes/getWeekMeal').then((res) => {
      if (res.success) {
        let data = res.data
        this.goods = data.dishes
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    // 选中的菜单
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$ref.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    // 选中的food
    selectFood (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
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
      this.meunScroll = new BScroll(this.$els.menuWrapper, {
        click: true// better-scroll取消默认事件，我们这里在派发一个点击事件
      })

      this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
        click: true,
        probeType: 3
      })

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },

    _calculateHeight () {
      let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
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
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
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
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
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
