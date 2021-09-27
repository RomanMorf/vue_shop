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
  }

}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
@import '@/assets/scss/colors.scss';
</style>

