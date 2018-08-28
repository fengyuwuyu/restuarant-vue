<template>
  <div class="demo">
    <ul>
      <router-link class="demo-item" tag="li" to="/componentDevelop">组件化开发</router-link>
      <router-link class="demo-item" tag="li" to="/componentInteract">父子组件传值</router-link>
    </ul>
    <div class="template">
      <input :id="id" type="text" :disabled="isDisabled" value="test" />
    </div>
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
    background: #ffffff
    .demo-item
      height .6rem
      line-height .6rem
    .template
      margin-top 30px
      input
        border 1px solid #000000
</style>
