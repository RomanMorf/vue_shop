<template>
  <div>
    <form class="center"
      @submit.prevent="showInfo"
    >
      <div>
        <h3>Form for products add</h3>
      </div>
      <div>
        <p>Title <input v-model="title" type="text" placeholder="Enter product title"></p>
        <p>Category <input v-model="category" type="text" placeholder="Enter category name"></p>
        <p>Price <input v-model="price" type="number" placeholder="Enter price"></p>
      </div>
      <div>
        <button type="submit">ADD</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'testTitle',
      category: 'Test Category',
      price: '100',
    }
  },
  methods: {
    showInfo() {
      // console.log(this.title, this.category, this.price, 'log');
      this.sendData()
    },
    async sendData() {
      const data = {
        id: Date.now(),
        title: this.title,
        category: this.category,
        price: this.price,
      }
      console.log(data, 'data');
      await this.$store.dispatch('createRecord', data)
    },
    clearData() {
      this.title = ''
      this.category = ''
      this.price = ''
    },
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