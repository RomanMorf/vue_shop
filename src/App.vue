<template>
  <div id="app">

    <component :is="layoud"></component>

  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'

export default {
  name: 'App',
  computed: {
    layoud () {
      return (this.$route.meta.layout || 'main') + '-layout'
    },
  },
  components: {
    MainLayout,
    AdminLayout
  },
  async mounted() {
    await this.$store.dispatch('BASKET_GET_FROM_LOCAL_STORE')
    await this.$store.dispatch('FAVORITE_GET_FROM_LOCAL_STORE')
  },
}
</script>

<style lang="scss">
// @import '@/assets/scss/style.scss';
// @import '@/assets/scss/colors.scss';
</style>

