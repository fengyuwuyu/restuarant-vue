<template>
  <div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page, index) of pages" :key="index">
        <router-link
          tag="div"
          :to="item.href"
          class="icon"
          v-for="item of page"
          :key="item.id"
        >
          <div class='icon-img'>
            <img class='icon-img-content' :src='getResourceUrl(item)' />
          </div>
          <p class="icon-title">{{item.title}}</p>
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeIcons',
  props: {
    list: {
      type: Array,
      default () {
        return [{
          id: 1,
          imgUrl: '/img/canting.png',
          title: '餐厅'
        }, {
          id: 2,
          imgUrl: '/img/caipu.png',
          title: '菜谱'
        }, {
          id: 3,
          imgUrl: '/img/chaxun.png',
          title: '查询'
        }, {
          id: 4,
          imgUrl: '/img/chongzhi.png',
          title: '充值'
        }, {
          id: 5,
          imgUrl: '/img/dingdan.png',
          title: '订单'
        }, {
          id: 6,
          imgUrl: '/img/gongsi.png',
          title: '公司'
        }, {
          id: 7,
          imgUrl: '/img/pingjia.png',
          title: '评价'
        }, {
          id: 8,
          imgUrl: '/img/weixin.png',
          title: '微信'
        }, {
          id: 9,
          imgUrl: '/img/jiaoyi.png',
          title: '交易'
        }, {
          id: 10,
          imgUrl: '/img/caipu.png',
          title: '菜谱'
        }, {
          id: 11,
          imgUrl: '/img/chaxun.png',
          title: '查询'
        }, {
          id: 12,
          imgUrl: '/img/chongzhi.png',
          title: '充值'
        }, {
          id: 13,
          imgUrl: '/img/dingdan.png',
          title: '订单'
        }, {
          id: 14,
          imgUrl: '/img/gongsi.png',
          title: '公司'
        }, {
          id: 15,
          imgUrl: '/img/pingjia.png',
          title: '评价'
        }, {
          id: 16,
          imgUrl: '/img/weixin.png',
          title: '微信'
        }, {
          id: 17,
          imgUrl: '/img/jiaoyi.png',
          title: '交易'
        }]
      }
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: false,
        loop: false
      }
    }
  },
  computed: {
    pages () {
      const pages = []
      this.list.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixins.styl'
  .icons >>> .swiper-container
    height: 0
    padding-bottom: 50%
  .icons
    z-index: 3
    position: fixed
    top: 0
    left: 0
    right: 0
    margin-top: 26.67%
    padding .1rem 0
    background-color #ffffff
    .icon
      position: relative
      overflow: hidden
      float: left
      width: 25%
      height: 0
      padding-bottom: 25%
      .icon-img
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: .44rem
        box-sizing: border-box
        padding: .1rem
        .icon-img-content
          display: block
          margin: 0 auto
          height: 100%
      .icon-title
        position: absolute
        left: 0
        right: 0
        bottom: 0
        height: .44rem
        line-height: .44rem
        text-align: center
        color: $darkTextColor
        ellipsis()
</style>
