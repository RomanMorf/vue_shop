<template>
  <div>
    <NavBar />
    <FormAdd/>

    <div class="container">
      <router-view/>
    </div>

    <Footer />

  </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'
import FormAdd from '@/components/Admin/FormAdd'

export default {
  name: 'main-layout',
  components: {
    NavBar,
    Footer,
    FormAdd,
  }
}
</script>

<style scoped lang='scss'>
  
</style> 