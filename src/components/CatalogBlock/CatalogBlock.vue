<template>
  <div>
    <div>
      <Loader class="center" v-if="loading" />
      <div v-if="!loading"> 
        <h2 class="center">Каталог</h2>
      </div>
      <div v-if="PRODUCTS.length > 0" class="cards_wrapper">
        <Card :product="PRODUCTS[getRandomNum()]"></Card>
        <Card :product="PRODUCTS[getRandomNum()]"></Card>
        <Card :product="PRODUCTS[getRandomNum()]"></Card>
        <Card :product="PRODUCTS[getRandomNum()]"></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Catalog/Card'
import { mapGetters } from 'vuex'

export default {
  name: 'CatalogBlock',
  data() {
    return {
      loading: true,
    }
  },
  components: {
    Card,
  },
  methods: {
    getRandomNum() {
      const max = this.PRODUCTS.length || 10
      const result = Math.floor(Math.random() * max)
      return result
    },

  },
  async mounted() {
    await this.$store.dispatch('FETCH_PRODUCTS')
    this.loading = false
  },
  computed: {
    ...mapGetters(['PRODUCTS']),
  },

}
</script>

<style scoped lang='scss'>
.cards_wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  max-height: 600px;
  overflow: hidden;
}
</style> 