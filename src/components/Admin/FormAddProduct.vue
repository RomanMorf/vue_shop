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
        <p>Category <input v-model="category" type="text" placeholder="Enter category name dsfasdf"></p>
        <p>Price <input v-model="price" type="number" placeholder="Enter price"></p>
        <br>
        <p>Img URL <input v-model="imgUrl" type="text" placeholder="Enter img URL"></p>
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
      category: 'Test Category',
      price: '100',
      imgUrl: 'https://static-sl.insales.ru/images/products/1/3530/300559818/large_14537885-1-beige.jpeg',
      records: []
    }
  },
  methods: {
    showInfo() {
      // console.log(this.title, this.category, this.price, 'log');
      this.sendData()
    },
    async sendData() {
      const data = {
        title: this.title,
        category: this.category,
        price: this.price,
        imgUrl: this.imgUrl,

      }
      // console.log(data, 'data');
      await this.$store.dispatch('createRecord', data)
    },
    async editData() {
      const data = {
        id: 1632143531004,
        title: this.title,
        category: this.category,
        price: this.price,
        imgUrl: this.imgUrl,
      }
      // console.log(data, 'data');
      await this.$store.dispatch('editRecord', data)
    },
    clearData() {
      this.title = ''
      this.category = ''
      this.price = ''
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