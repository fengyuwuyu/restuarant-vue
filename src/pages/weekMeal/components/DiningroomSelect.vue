<template>
  <div>
    <router-link to='/diningroomList'>
      <div class="diningroom">
        <span class="diningroom-name">{{this.diningroom.name}}</span>
        <span class="diningroom-icon iconfont arrow-icon">&#xe613;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DiningroomSelect',
  computed: {
    ...mapState(['diningroom'])
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixins.styl'
  .diningroom
    display flex
    height .5rem
    line-height .5rem
    width 5rem
    text-align center
    font-size .36rem
    border 1px solid $bgColor
    margin .2rem auto
    border-radius .16rem
    .diningroom-name
      flex 1
      display block
      min-width 4rem
      margin-left .6rem
      color $bgColor
      ellipsis()
    .diningroom-icon
      width .6rem

</style>
