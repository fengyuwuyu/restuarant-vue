<template>
  <div class="header" v-on:click="back">
    {{title}}
      <div class="iconfont header-back">&#xe604;</div>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  props: {
    title: String
  },
  methods: {
    back () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .header
    position: relative
    overflow: hidden
    height: $headerHeight
    line-height: $headerHeight
    text-align: center
    color: #fff
    background: $bgColor
    font-size: .32rem
    .header-back
      position: absolute
      top: 0
      left: 0
      width: .64rem
      text-align: center
      font-size: .4rem
      color: #fff
</style>
