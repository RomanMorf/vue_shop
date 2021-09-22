<template>
  <div>
    <form class="form center">
      <div>
        <h3>Products categories</h3>
      </div>
      <div>
        <p>Category title <input v-model="selectedTitle" type="text" placeholder="Enter category title"></p>
      </div>
      <div>
        <select v-model="current" class="form-select">
          <option 
            v-for="cat in categories" 
            :key="cat.id" 
            :value="cat.id"
          >
            {{ cat.title }}
          </option>
        </select>
      </div>
      <div>
        <button @click.prevent="createCategory">ADD</button>
        <button @click.prevent="editCategory">Edit</button>
        <button @click.prevent="deleteCategory">Delete</button>
      </div>
    </form>
    <div>
      <button @click="fetchCategories">fetchCategories</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      selectedTitle: '',
      selectedId: '',
      categories: [],
      current: null,
    }
  },
  methods: {
    async createCategory() { // вызываем создание категории
      const data = {
        title: this.selectedTitle
      }
      if (this.selectedTitle.trim()) {
        await this.$store.dispatch('CREATE_CATEGORY', data)
        await this.fetchCategories()
      } else {
        return 
      }
    },
    async editCategory() { // вызываем редактирование категории
      const editedCategory = {
        title: this.selectedTitle,
        id: this.selectedId
      }
      await this.$store.dispatch('EDIT_CATEGORY', editedCategory)
      await this.fetchCategories()
    },
    async fetchCategories() { // запрашиваем категории
      this.categories = await this.$store.dispatch('FETCH_CATEGORIES')
    },
    async deleteCategory() { // запрашиваем удаление категории
      const categoryForDelete = {
        id: this.selectedId,
      }
      await this.$store.dispatch('DELETE_CATEGORY', categoryForDelete)
      await this.fetchCategories()

    },
  },
  watch: {  // следим за обновлениями в данном объекте
    current(catId) {
      const {title} = this.categories.find(c => c.id === catId)
      this.selectedTitle = title
      this.selectedId = catId
    }
  },
  async mounted() { // запрашиваем категории при загрузке страницы
      this.categories = await this.$store.dispatch('FETCH_CATEGORIES')
  },

}
</script>

<style scoped lang="scss">
  .form {
    padding: 10px;
    margin: 10px auto;
    max-width: 300px;
    border: 1px solid black;

    & div {
    margin-bottom: 10px;
    }

    &-select {
      width: 50%;
    }
  }
</style>