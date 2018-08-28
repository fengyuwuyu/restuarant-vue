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
    <img class="item-img" :src="item.imgUrl" />
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
    list: Array
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
