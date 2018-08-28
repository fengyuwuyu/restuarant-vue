<template>
  <div class="home">
    <home-header></home-header>
    <home-icons></home-icons>
    <home-bulletin-board :list='bulletinBoardList'></home-bulletin-board>
    <home-footer :list='bottomMenuList'></home-footer>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeIcons from './components/Icons'
import HomeBulletinBoard from './components/BulletinBoard'
import HomeFooter from './components/Footer'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeIcons,
    HomeBulletinBoard,
    HomeFooter
  },
  data () {
    return {
      bulletinBoardList: [{
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
      }],
      bottomMenuList: [{
        id: 1,
        name: '首页',
        targetUrl: '/'
      }, {
        id: 2,
        name: '餐厅点评',
        targetUrl: '/diningroomEvaluate'
      }, {
        id: 3,
        name: '通讯录',
        targetUrl: '/contacts'
      }, {
        id: 4,
        name: '我的',
        targetUrl: '/'
      }]
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('').then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      const data = res.data
      if (data) {
        this.bulletinBoardList = data.bulletinBoardList
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
