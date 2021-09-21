<template>
  <div>
    <form class="center"
      @submit.prevent="createCategory"
    >
      <div>
        <h3>Form for category add</h3>
      </div>
      <div>
        <p>Category title <input v-model="title" type="text" placeholder="Enter category title"></p>
      </div>
      <div>
        <button type="submit">ADD</button>
        <button @click="editData">Edit</button>
      </div>
    </form>
    <div>
      <button @click="fetchCategories">fetchCategories</button>
    </div>
    <div>
      <p v-for="cat in categories" :key="cat.id">
        Title: <span>{{ cat.title }}</span>
        <br>
        ID: {{ cat.id }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'testTitle',
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
    async editData() {
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
    clearData() {
    },
    async updateRecords() {
      this.records = await this.$store.dispatch('fetchRecord')
    }
  },
  // async mounted() {
  //     this.categories = await this.$categories.dispatch('fetchCategories')
  // },

}
</script>

<style lang="scss">
  form {
    padding: 10px;
    margin: 10px auto;
    max-width: 300px;
    border: 1px solid black
  }
</style>