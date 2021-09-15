<template>
  <div id="app">

    <component :is="layoud"></component>

  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'

export default {
  name: 'App',
  computed: {
    layoud () {
      return (this.$route.meta.layout || 'main') + '-layout'
    },
  },
  components: {
    MainLayout,
  }

}
</script>

<style lang="scss">
@import '@/assets/style.scss';
@import 'https://fonts.googleapis.com/icon?family=Material+Icons'
</style>
