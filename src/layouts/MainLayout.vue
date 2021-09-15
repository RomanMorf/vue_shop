<template>
  <div>
    <NavBar />

    <div class="container">
      <router-view/>
    </div>

    <Footer />

  </div>
</template>

<script>
import NavBar from '@/components/app/NavBar'
import Footer from '@/components/app/Footer'

export default {
  name: 'main-layout',
  components: {
    NavBar,
    Footer,
  }
}
</script>

<style scoped lang='scss'>
  
</style> 