<template>
  <div>
    <form class="form center"
      @submit.prevent="createCategory"
    >
      <div>
        <h3>Products categories</h3>
      </div>
      <div>
        <p>Category title <input v-model="selected" type="text" placeholder="Enter category title"></p>
      </div>
      <div>
        <select v-model="selected" class="form-select">
          <option 
            v-for="cat in categories" 
            :key="cat.id" 
            v-bind:value="cat.title"
          >
            {{ cat.title }}
          </option>
        </select>
      </div>
      <div>
        <button @click="createCategory">ADD</button>
        <button @click="editCategory">Edit</button>
        <button @click="deleteCategory">Delete</button>
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
      title: '',
      selected: '',
      categories: []
    }
  },
  methods: {
    async createCategory() {
      const data = {
        title: this.title
      }
      if (this.title.trim()) {
        await this.$store.dispatch('createCategory', data)
      } else {
        return 
      }
    },
    async editCategory() {
      const data = {
        name: this.title
      }
      await this.$store.dispatch('editRecord', data)
    },
    async fetchCategories() {
      console.log('fetchCategories');
      this.categories = await this.$store.dispatch('fetchCategories')
      console.log(this.categories, 'categories');
    },
    deleteCategory() {
    },
    async updateRecords() {
      this.records = await this.$store.dispatch('fetchRecord')
    }
  },
  async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
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