<template>
  <div>
    <form class="center"
      @submit.prevent=""
    >
      <div>
        <h3>Form for products add</h3>
      </div>

      <div>
        <p>Title: <input v-model="title" type="text" placeholder="Enter product title"></p>

        <div>Category
          <select v-model="currentCategory">
            <option 
              v-for="cat in categories" 
              :key="cat.id" 
              :value="cat.id"
            >
              {{ cat.title }}
            </option>
          </select>
          <p>Category name: {{ category }}</p>
        </div>

        <p>Price: <input v-model="price" type="number" placeholder="Enter price"></p> 

        <p>URL : <input v-model="imgUrl" type="text" placeholder="Enter img URL"  @keyup.enter="addImgUlr"></p>
        <button class="btn" @click="addImgUlr">Add url</button>

        <div class="img_preview" v-for="(image, index) in img" :key="index">
          <img class="img" :src="image">
          <span class="cursor" @click="deleteImgUlr(index)">X</span>
        </div>
      </div>

      <div>
        <button class="btn" @click="createProduct">Create</button>
        <button class="btn" type="reset">Reset form</button>
      </div>
      
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      category: '',
      categoryId: '',
      price: '',
      imgUrl: '',
      img: [],
      categories: [],
      currentCategory: null,
    }
  },
  methods: {
    addImgUlr() { // добавление url в список
      if (this.imgUrl.trim()) {
        this.img.push(this.imgUrl)
      }
      this.imgUrl = ''
    },
    deleteImgUlr(index) { // удаление url из списка
      this.img.splice(index, 1)
    },
    clearForm() { // очистка формы
      this.title = ''
      this.category = ''
      this.categoryId = ''
      this.price = ''
      this.imgUrl = ''
      this.img = []
      this.categories = []
      this.currentCategory = null
    },
    async createProduct() { // создание продуктв
      const data = {
        categoryName: this.category,
        categoryId: this.categoryId,
        title: this.title,
        price: this.price,
        img: this.img,
      }
      if (this.title.trim() && this.price && this.price > 0 && this.category) {
        await this.$store.dispatch('CREATE_PRODUCT', data)
        this.clearForm()
      }
    },
  },
  watch: {  // следим за обновлениями в данном объекте
    currentCategory(catId) {
      const {title} = this.categories.find(c => c.id === catId)
      this.category = title
      this.categoryId = catId
    }
  },

  async mounted() {
      this.categories = await this.$store.dispatch('FETCH_CATEGORIES')
  },

}
</script>

<style lang="scss">
  p {
    padding: 0;
    margin: 5px;
  }
  form {
    padding: 10px;
    margin: 10px auto;
    max-width: 300px;
    border: 1px solid black;
    border-radius: 2px;
    background: linear-gradient(#84848a, #d6d6d6, #5f5068);
    
    &:hover {
      box-shadow: 0 0 2px 3px rgba(194, 194, 194, 0.425);
      transition: all .1s ease-in-out;
    }
    
  }
  button {
    margin: 5px;
  }
  .cursor {
    cursor: pointer;
  }
  .img {
    max-width: 60px;
    max-height: 60px;
    border: 1px solid black;
    margin-bottom: 2px;
  }
  .img_preview {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .btn {
    background: linear-gradient(71deg, #b28bb9 29%, #a3b5b8);

    &:hover {
      box-shadow: 0 0 2px 3px rgba(247, 217, 119, 0.425);
      background-color: rgb(248, 250, 221);
      transition: all .1s ease-in-out;
      background: linear-gradient(71deg, #67768f 29%, #a3b5b8);
    }
  }
</style>