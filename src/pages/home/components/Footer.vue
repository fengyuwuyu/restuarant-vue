<template>
  <div class="footer">
    <router-link :to="item.targetUrl" tag="div" class="footer-item" v-for="item of list" :key="item.id">{{item.name}}</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeFooter',
  props: {
    list: Array
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl"
  .footer
    position fixed
    width 100%
    height 0
    padding-bottom .7rem
    line-height .7rem
    left 0
    z-index 105
    bottom 0
    display flex
    background #ffffff
    .footer-item
      flex 1
      height 100%
      text-align center
</style>
