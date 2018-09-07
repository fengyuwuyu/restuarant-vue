<template>
  <div class="home">
    <home-header :list="navList"></home-header>
    <home-icons :list="menuList"></home-icons>
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
      bulletinBoardList: [],
      navList: [],
      menuList: [],
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
      axios.get('/api/resource/mainPage').then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.success) {
        let data = res.data
        this.navList = data.navList
        this.bulletinBoardList = data.noticeList
        this.menuList = data.menuList
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style lang='stylus' scoped>
</style>
