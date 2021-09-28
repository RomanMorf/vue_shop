<template>
  <div class="center">
    <Loader class="center" v-if="loading"/>

    <form v-else>
      <p>ID: {{ id }}</p>
      <p>Title: {{ product.title }}</p>
      <p>Price: {{ product.price }} UAH</p>
      <p>Category: <span>{{selectedCategoryTitle}}</span></p>
      <p>Categories: 
        <select v-model="currentCategory">
          <option 
            v-for="cat in categories" 
            :key="cat.id" 
            :value="cat.id"
          >
            {{ cat.title }}
          </option>
        </select>
      </p>
      <p></p>
      <div class="img_container">
        <div
          class="img_wrapper"
          v-for="(img, index) in product.img" 
          :key="index"
        >
          <img class="img_item" :src="img" :alt="product.title">
          <button class="img_btn delete">
            <span class="material-icons">delete</span>
          </button>
          <button class="img_btn edit">
            <span class="material-icons">edit</span>
          </button>
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
  async mounted() {
    const id = this.$route.params.id
    const product = await this.$store.dispatch('FETCH_PRODUCT_BY_ID', id)
    const categories = await this.$store.dispatch('FETCH_CATEGORIES')
    this.id = id
    this.product = product
    this.categories = categories
    this.loading = false
    console.log(product, 'product');
    console.log(categories, 'categories');
  },
  watch: {  // следим за обновлениями в данном объекте
    currentCategory(catId) {
      const {title} = this.categories.find(c => c.id === catId)
      this.selectedCategoryTitle = title
      this.selectedCategoryId = catId
    }
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