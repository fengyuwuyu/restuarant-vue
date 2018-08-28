<template>
  <div>
    <vue-tabs class="week">
      <v-tab title="周一" class="week-item">
        First tab content
      </v-tab>
      <v-tab title="周二" class="week-item">
        Second tab content
      </v-tab>
      <v-tab title="周三" class="week-item">
        Third tab content
      </v-tab>
      <v-tab title="周四" class="week-item">
        First tab content
      </v-tab>
      <v-tab title="周五" class="week-item">
        Second tab content
      </v-tab>
      <v-tab title="周六" class="week-item">
        Third tab content
      </v-tab>
      <v-tab title="周日" class="week-item">
        Third tab content
      </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
export default {
  name: 'WeekSelect'
}
</script>

<style lang="stylus" scoped>

  .nav-tabs-wrapper,.nav-tabs,.tab,.tabs__link,.active_tab,.tab>a
    height .07rem !important
  .week
    width 100%
    font-size .07rem
</style>
