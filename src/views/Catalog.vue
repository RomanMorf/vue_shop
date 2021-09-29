<template>
  <div>
    <h1 class="center">This is an catalog page</h1>

    <Loader class="center" v-if="isLoding"></Loader>

    <div v-else class="card-wrapper">
      <Card 
        v-for="product in PRODUCTS" 
        :key="product.id"
        :product="product"
      />
    </div>

  </div>
</template>

<script>
import Card from '@/components/Catalog/Card'
import { mapGetters } from 'vuex'

export default {
  name: 'Catalog',
  data() {
    return {
      products: [],
      isLoding: true
    }
  },
  async mounted() {
    this.$store.dispatch('FETCH_PRODUCTS')
    this.isLoding = false
  },
  components: {
    Card,
  },
  computed: {
    ...mapGetters(['PRODUCTS']),
  },

}
</script>

<style lang="scss">
  .card-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

</style>
