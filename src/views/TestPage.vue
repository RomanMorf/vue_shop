<template>
  <div>
    <div class="product_container">
      <h2 class="product_title">Товары</h2>
      <button class="product_btn" @click="fetchProducts">Загрузить список товаров</button>
      <div
        class="product_card"
        v-for="(pruduct, index) in PRODUCTS"
        :key="index"
      >
        <p class="product_text">Title: {{ pruduct.title }}</p>
        <p class="product_text">Price: {{ pruduct.price }}</p>
        <p class="product_text">Category: {{ pruduct.categoryName }}</p>
        <img class="product_img" v-if="pruduct.img" :src="pruduct.img[0]">
        <button @click.prevent="productEdit(pruduct.id)">Edit</button>
        <button @click.prevent="productDelete(pruduct.id)">Delete</button>
      </div>
    </div>

    <FormAddProduct></FormAddProduct>

    <FormAddCategory></FormAddCategory>
  </div>
</template>

<script>
import FormAddProduct from '@/components/Admin/FormAddProduct'
import FormAddCategory from '@/components/Admin/FormAddCategory'
import { mapGetters } from 'vuex'

export default {
  components: {
    FormAddProduct,
    FormAddCategory,
  },
  methods: {
    fetchProducts() {
      this.$store.dispatch('FETCH_PRODUCTS')
    },
    productEdit(id) {
      console.log(id, 'id for edit');
    },
    productDelete(id) {
      console.log(id, 'id for delete');
    },
  },
  computed: {
    ...mapGetters(['INFO', 'PRODUCTS']),
  },
  mounted() {
    this.$store.dispatch('FETCH_PRODUCTS')
  },
}
</script>

<style scoped lang="scss">
.product{
  &_container {
    padding: 5px;
    margin: 10px;
  }
  &_card {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid grey;
  border-radius: 5px;
  }
  &_img {
    width: 100px;
  }

}
</style>
