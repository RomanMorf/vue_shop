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
    clearData() {
    },
    async updateRecords() {
      this.records = await this.$store.dispatch('fetchRecord')
    }
  },
  async mounted() {
      this.records = await this.$store.dispatch('fetchRecord')
  },

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