<template>
  <div>
    <Loader class="center" v-if="loading"/>
    
    <div v-else>
      <h1 class="center">{{ product.title }}</h1>
      <div class="product_body">
        <Carusel 
          v-show="product.img" 
          :caruselData="product.img"
          :caruselWidth="450"
          :caruselHeiht="600"
          :isImages="true"
          class="inline"
        />

        <div class="product_description inline">
          <p v-if="product.categoryName"><strong>Категория:</strong> {{ product.categoryName }}</p>
          <p v-if="product.price"><strong>Цена:</strong> {{ product.price }} UAH</p>
          <p v-if="product.description"><strong>Описание:</strong> {{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carusel from '@/components/Carusel/Carusel.vue'

export default {
  data() {
    return {
      id: null,
      product: null,
      categories: null,
      loading: true,
      currentCategory: null,

      selectedCategoryTitle: '',
      selectedCategoryId: '',

      flagEdit: false,
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const product = await this.$store.dispatch('FETCH_PRODUCT_BY_ID', id)
    const categories = await this.$store.dispatch('FETCH_CATEGORIES')
    this.id = id
    this.product = product
    this.categories = categories
    this.loading = false
  },
  watch: {  // следим за обновлениями в данном объекте
    currentCategory(catId) {
      const {title} = this.categories.find(c => c.id === catId)
      this.selectedCategoryTitle = title
      this.selectedCategoryId = catId
    },
  },
  components: {
    Carusel,
  }

}
</script>

<style scoped lang='scss'>
.product {
  &_description {
    margin-left: 20px;
    max-width: 50%;
    display: inline-block;

    & p {
      padding: 10px 0;
    }
  }
}
.inline {
  display: inline-block;
  text-align: top;
  vertical-align: top;
}
</style> 