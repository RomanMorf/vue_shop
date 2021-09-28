<template>
  <div class="center">
    <h1>This is an a parsonal cabinet page</h1>
    <h2>Under development</h2>
    <p>{{ INFO.name }}</p>
    <p>{{ INFO.email }}</p>
    <p>{{ INFO.tel }}</p>
    <p>{{ INFO.role }}</p>
    <br>
    <button @click="showInfo">showInfo</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Cabinet',
  data() {
    return {
      userInfo: null,

    }
  },
  methods: {
    showInfo() {
      console.log(this.INFO, 'this.INFO from cabinete');
    },
    fetchProducts() {
      this.$store.dispatch('FETCH_PRODUCTS')
    }
  },
  computed: {
    ...mapGetters([
      'INFO',
      'PRODUCTS'
    ]),
  },
  mounted() {
    this.$store.dispatch('FETCH_INFO')
  },
}
</script>

<style scoped lang='scss'>
</style> 