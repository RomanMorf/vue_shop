<template>
  <div>
    <form class="center"
      @submit.prevent=""
    >
      <div>
        <h3>Form for products add</h3>
      </div>

      <div>
        <p>Title:
          <input v-model="title" type="text" placeholder="Enter product title">
        </p>
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
        <p>Price:
          <input v-model="price" type="number" placeholder="Enter price">
        </p>
        <p>Product info:
          <textarea v-model="description" cols="30" rows="10"></textarea>
        </p>
        <p>URL :
          <input v-model="imgUrl" type="text" placeholder="Enter img URL"  @keyup.enter="addImgUlr">
        </p>
        <button class="btn" @click="addImgUlr">Add url</button>
        <div class="img_preview" v-for="(image, index) in img" :key="index">
          <img class="img" :src="image">
          <span class="cursor" @click="deleteImgUlr(index)">X</span>
        </div>
      </div>
      <p>Colors :
        <select v-model="currentColor">
          <option
            v-for="color in colorNames"
            :key="color.colorHex"
            :value="color.colorHex"
          >
            <span>
              {{ color.colorName }}
            </span>
          </option>
        </select>
        <button class="btn" @click="addColor">Add</button>
      </p>
      <div class="color_preview">
        <div class="color_cube"
          :style="{'background-color': color.colorHex}"
          v-for="(color, index) in colors"
          :key="color.colorName"
          @click="deleteColor(index)">
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
import colorsMixin from '@/mixins/productColor_mixins.js'

export default {
  data() {
    return {
      title: '',
      description: '',
      category: '',
      categoryId: '',
      price: '',
      imgUrl: '',
      colorName: '',
      colorHex: '',
      img: [],
      colors: [],
      categories: [],
      currentCategory: null,
      currentColor: null,
    }
  },
  mixins: [colorsMixin],
  methods: {
    addImgUlr() { // добавление url в список
      if (this.imgUrl.trim()) {
        this.img.push(this.imgUrl)
      }
      this.imgUrl = ''
    },
    addColor() { // добавление цвет в список
      if (this.colors.find(c => c.colorName === this.colorName)) { // проверка на повторение цвета
        return
      } else {
        if (this.colorName.trim()) {
          const colorObj = {
            colorName: this.colorName,
            colorHex: this.colorHex
          }
          this.colors.push(colorObj)
        }
      }
    },
    deleteColor(index) { // удалить цвет из списка
      this.colors.splice(index, 1)
    },
    deleteImgUlr(index) { // удаление url из списка
      this.img.splice(index, 1)
    },
    clearForm() { // очистка формы
      this.title = ''
      this.description = ''
      this.categoryId = ''
      this.price = ''
      this.imgUrl = ''
      this.colorName = ''
      this.colorHex = ''
      this.img = []
      this.colors = []
    },
    async createProduct() { // создание продуктв
      const data = {
        categoryName: this.category,
        categoryId: this.categoryId,
        title: this.title,
        description: this.description,
        price: this.price,
        img: this.img,
        color: this.colors,
      }
      if (this.title.trim() && this.price && this.price > 0 && this.category) {
        await this.$store.dispatch('CREATE_PRODUCT', data)
        this.clearForm()
      }
    },

  },
  computed: {
    styleObject: function() { // вычисляемое свойство - цвет заливки блока
      return { backgroundColor: this.colorHex }
    },
  },
  watch: {
    currentCategory(catId) { // следим за обновлениями - выбранная категория
      const {title} = this.categories.find(c => c.id === catId)
      this.category = title
      this.categoryId = catId
    },
    currentColor(catId) { // следим за обновлениями - выбранный цвет
      const {colorName, colorHex} = this.colorNames.find(c => c.colorHex === catId)
      this.colorName = colorName
      this.colorHex = colorHex
    }
  },

  async mounted() { // действия при загрузке страницы
      this.categories = await this.$store.dispatch('FETCH_CATEGORIES')
  },

}
</script>

<style scoped lang="scss">
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

  .color {
    &_preview {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    &_cube {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 5px;
      margin-right: 15px;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
</style>
