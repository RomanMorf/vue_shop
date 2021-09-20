<template>
  <div>
    <form class="center"
      @submit.prevent="showInfo"
    >
      <div>
        <h3>Form for category add</h3>
      </div>
      <div>
        <p>Title <input v-model="title" type="text" placeholder="Enter category title"></p>
      </div>
      <div>
        <button type="submit">ADD</button>
        <button @click="editData">Edit</button>
      </div>
    </form>
    <div>
      <button @click="updateRecords">updateRecords</button>
    </div>
    <div>
      <ul>
        <li v-for="record in records" :key="record.id">
          {{record}}
        </li>
      </ul>
    </div>
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
      this.sendData()
    },
    async sendData() {
      const data = {
      }
      await this.$store.dispatch('createRecord', data)
    },
    async editData() {
      const data = {
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