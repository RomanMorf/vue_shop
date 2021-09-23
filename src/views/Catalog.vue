<template>
  <div>
    <h1 class="center">This is an catalog page</h1>

    <Loader class="center" v-if="isLoding"></Loader>

    <div v-else class="card-wrapper">
      <Card 
        v-for="product in products" 
        :key="product.id"
        :product="product"
      />
    </div>

  </div>
</template>

<script>
import Card from '@/components/Catalog/Card'

export default {
  name: 'Catalog',
  data() {
    return {
      products: [],
      isLoding: true
    }
  },
  async mounted() {
    this.products = await this.$store.dispatch('FETCH_PRODUCTS')
    this.isLoding = false
  },
  components: {
    Card,
  }
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
