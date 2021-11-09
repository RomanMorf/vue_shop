<template>
  <div>
    <!-- <form class="form center">
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
        <button type="reset">Reset form</button>
      </div>
    </form> -->
    <form class="form">
      <div class="form_section flex">
        <div class="form_cell"> <!-- Category name -->
          <input id='name' class="form_input" v-model.trim="$v.selectedTitle.$model" type="text" required="">
          <label for='name' class="form_label">Название товара</label>
          <small
            class="form_helper invalid"
            v-if="$v.selectedTitle.$dirty && !$v.selectedTitle.required"
          >Введите Название товара
          </small>
        </div>
        <div class="form_cell"> <!-- Category select -->
          <select id="form_category" class="form_select" v-model="currentCategory" required="">
            <option class="form_option"
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.title }}
            </option>
          </select>
          <label for='form_category' class="form_label">Выберите категорию товара</label>
          <small
            class="form_helper invalid"
            v-if="$v.selectedTitle.$dirty && !$v.selectedTitle.required"
          >Выберите категорию
          </small>
        </div>
      </div>
      <div class="form_section flex">
        <button class="modal_btn admin_bg" @click.prevent="createCategory">ADD</button>
        <button class="modal_btn admin_bg" @click.prevent="editCategory">Edit</button>
        <button class="modal_btn admin_bg" @click.prevent="deleteCategory">Delete</button>
        <button class="modal_btn admin_bg" type="reset">Reset form</button>
      </div>

    </form>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      selectedTitle: '',
      selectedId: '',
      categories: [],
      currentCategory: null,
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
    currentCategory(catId) {
      const {title} = this.categories.find(c => c.id === catId)
      this.selectedTitle = title
      this.selectedId = catId
    }
  },

  validations: {
    selectedTitle: {required}
  },

  async mounted() { // запрашиваем категории при загрузке страницы
      this.categories = await this.$store.dispatch('FETCH_CATEGORIES')
  },

}
</script>

<style scoped lang="scss">
</style>
