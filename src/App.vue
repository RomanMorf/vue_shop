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
  beforeMount() {
    document.querySelector('.preload').style.display = 'none'
  },

  async mounted() {
    await this.$store.dispatch('FETCH_INFO')
    await this.$store.dispatch('FETCH_TEXTS')
    await this.$store.dispatch('BASKET_GET_FROM_LOCAL_STORE')
    await this.$store.dispatch('FAVORITE_GET_FROM_LOCAL_STORE')
    await this.$store.dispatch('COMPARE_GET_FROM_LOCAL_STORE')
    await this.$store.dispatch('SIDE_BAR_GET_FROM_LOCAL_STORE')
  },
}
</script>


