<template>
  <div>
    <h1 class="center">This is an catalog page</h1>

    <button @click="showProducts">showProducts</button>

    <div class="card-wrapper">
      <Card 
        v-for="product in products" 
        :key="product.id"
        :product="product"
      >
      </Card>
    
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
      cards: [
        {id: '123', title: 'name 1', price: '100'},
        {id: '124', title: 'name 2', price: '100'},
        {id: '125', title: 'name 125', price: '158', colors: [
          {colorName: 'red', colorHesh: '#e3e3e3'}, 
          {colorName: 'black', colorHesh: '#e4e4e4'}
          ]},
        {id: '126', title: 'name 4', price: '160'},
        {id: '127', title: 'name 5', price: '100'},
        {id: '128', title: 'name 6', price: '101'},
        {id: '129', title: 'name 7', price: '170'},
        {id: '110', title: 'name 8', price: '178'},
        {id: '111', title: 'name 9', price: '100'},
      ]
    }
  },
  methods: {
    showProducts() {
      console.log(this.products);
    }
  },
  async mounted() {
    this.products = await this.$store.dispatch('FETCH_PRODUCTS')
  },
  components: {
    Card,
  }
}
</script>

<style lang="scss">
  .card-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .cardss {
    width: 150px;
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
