<template>
  <div>
    <NavBar />

    <div class="container">
      <TopBar />
      <div class="view_wrapper">
        <transition name="translate2" mode="out-in">
          <router-view />
        </transition>
      </div>
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
.view_wrapper {
  min-height: 50vh;
  padding-top: 10px;
}
</style>
