<template>
  <div class="bulletin">
    <div class="title">公告栏</div>
    <div class="items">
      <ul>
        <li
    class="item border-bottom"
    v-for="item of list"
    :key="item.id"
    >
    <img class="item-img" :src="getResourceUrl(item)" />
    <div class="item-info">
      <p class="item-title">{{item.title}}</p>
      <p class="item-desc">{{item.desc}}</p>
    </div>
    </li>
    </ul>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBulletinBoard',
  props: {
    list: {
      type: Array,
      default () {
        return [{
          'id': '0001',
          'imgUrl': 'http://img1.qunarzz.com/sight/p0/1409/19/adca619faaab0898245dc4ec482b5722.jpg_140x140_80f63803.jpg',
          'title': '故宫',
          'desc': '东方宫殿建筑代表，世界宫殿建筑典范'
        },
        {
          'id': '0002',
          'imgUrl': 'http://img1.qunarzz.com/sight/p0/1511/d2/d2aec2dfc5aa771290.water.jpg_140x140_abb362a7.jpg',
          'title': '南山滑雪场',
          'desc': '北京专业级滑雪圣地'
        },
        {
          'id': '0003',
          'imgUrl': 'http://img1.qunarzz.com/sight/p0/1501/f4/f467729126949c3a.water.jpg_140x140_ef235b1c.jpg',
          'title': '天安门广场',
          'desc': '我爱北京天安门，天安门上太阳升'
        },
        {
          'id': '0004',
          'imgUrl': 'http://img1.qunarzz.com/sight/p0/1501/40/40b2b6c951b28fdd.water.jpg_140x140_1c863e5c.jpg',
          'title': '水立方',
          'desc': '中国的荣耀，阳光下的晶莹水滴各种亚热带植物掩映其间仿佛置身热带雨林各种亚热带植物掩映置身热带雨林'
        },
        {
          'id': '0005',
          'imgUrl': 'http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg',
          'title': '温都水城养生馆',
          'desc': '各种亚热带植物掩映其间仿佛置身热带雨林'
        },
        {
          'id': '0006',
          'imgUrl': 'http://img1.qunarzz.com/sight/p0/1409/19/adca619faaab0898245dc4ec482b5722.jpg_140x140_80f63803.jpg',
          'title': '故宫',
          'desc': '东方宫殿建筑代表，世界宫殿建筑典范'
        },
        {
          'id': '0007',
          'imgUrl': 'http://img1.qunarzz.com/sight/p0/1511/d2/d2aec2dfc5aa771290.water.jpg_140x140_abb362a7.jpg',
          'title': '南山滑雪场',
          'desc': '北京专业级滑雪圣地'
        },
        {
          'id': '0008',
          'imgUrl': 'http://img1.qunarzz.com/sight/p0/1501/f4/f467729126949c3a.water.jpg_140x140_ef235b1c.jpg',
          'title': '天安门广场',
          'desc': '我爱北京天安门，天安门上太阳升'
        },
        {
          'id': '0009',
          'imgUrl': 'http://img1.qunarzz.com/sight/p0/1501/40/40b2b6c951b28fdd.water.jpg_140x140_1c863e5c.jpg',
          'title': '水立方',
          'desc': '中国的荣耀，阳光下的晶莹水滴各种亚热带植物掩映其间仿佛置身热带雨林各种亚热带植物掩映置身热带雨林'
        },
        {
          'id': '0010',
          'imgUrl': 'http://img1.qunarzz.com/sight/p0/201308/23/b283071686e64dfec8d65eac.jpg_140x140_8c5a7c49.jpg',
          'title': '温都水城养生馆',
          'desc': '各种亚热带植物掩映其间仿佛置身热带雨林'
        }]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title
    z-index: 3
    position: fixed
    top: 0
    left: 0
    right: 0
    margin-top calc(76.67% + .2rem)
    line-height: .8rem
    background: #eee
    text-indent: .2rem
  .items
    overflow hidden
    margin-top  calc(76.67% + 1.2rem)
    margin-bottom .7rem
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
          font-size: .32rem
          ellipsis()
        .item-desc
          flex 1
          color: #aaa
          margin-bottom .06rem
          ellipsisWrap()
</style>
