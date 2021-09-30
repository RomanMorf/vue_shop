<template>
  <div class="center">
    <Loader class="center" v-if="loading"/>

    <form v-else>
      <p>ID: {{ id }}</p>
      <h1>{{ product.title }}</h1>
      <p>Price: {{ product.price }} UAH</p>
      <p>Category: {{ product.categoryName }} </p>
      <p></p>
      <div class="img_container">
        <div
          class="img_wrapper"
          v-for="(img, index) in product.img" 
          :key="index"
        >
          <img class="img_item" :src="img" :alt="product.title">
        </div>
      </div>
    </form>
  </div>
</template>

<script>

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
  watch: {
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

}
</script>

<style scoped lang='scss'>
  .img_container {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
    
    & .img_item {
      max-width: 300px;
      margin: 5px
    }
    & .img_item:hover {
      width: 300px;
      margin: 5px
    }
  }
  .img_btn {
    width: 40px;
    height: 30px;
    &.delete {
      position: absolute;
      top: 10px;
      right: 20px;
    }
    &.edit {
      position: absolute;
      top: 10px;
      left: 20px;
    }
  }
  .img_wrapper{
    position: relative;
  }
</style> 