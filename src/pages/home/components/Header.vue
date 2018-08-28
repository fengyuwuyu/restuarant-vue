<template>
  <div class="header">
    <img class="header-img" src="http://img1.qunarzz.com/piao/fusion/1806/1c/4847ea66072c7b02.jpg_750x200_c32457fb.jpg"/>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl"
  .header
    z-index: 3
    position: fixed
    top: 0
    left: 0
    right: 0
    height: 0
    padding-bottom 26.67%
    .header-img
      width: 100%
</style>
