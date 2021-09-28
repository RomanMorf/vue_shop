<template>
  <div>
    <NavBar />

    <div class="container">
      <router-view/>
    </div>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'

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