<template>
  <div>
    <NavBar />

    <div class="container">
      <TopBar />

      <router-view/>
    </div>

    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'
import TopBar from '@/components/TopBar/TopBar'

export default {
  name: 'main-layout',
  components: {
    NavBar,
    Footer,
    TopBar
  },
}
</script>

<style scoped lang='scss'>
  
</style> 