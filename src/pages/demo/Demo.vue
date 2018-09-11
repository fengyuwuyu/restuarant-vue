<template>
  <div class="demo">
    <router-link class="item" to="/view1">组件化开发</router-link>
    <router-link class="item" to="/view2">父子组件传值</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      id: 'test',
      isDisabled: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl"
  .demo
    display flex
    height .8rem
    .item
      flex 1
      height .8rem
      line-height .8rem
</style>
