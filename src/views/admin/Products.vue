<template>
  <div >
    <Loader class="center" v-if="loading"/>

    <div v-else>
      <h3>Products page</h3>
      <div class="search">
        <div class="form_section">
          <input class="form_input mw-50" type="text" v-model="search" required=""/>
          <label class="form_label">Поиск...</label>
        </div>
        <div class="flex flex-wrap">
          <div class="card" v-for="(product, index) in filteredList" :key="index" @click="$router.push(`/admin/edit/${product.id}`)">
            <p class="text"> {{ product.id }} </p>
            <p> {{ product.title }} </p>
            <img v-if="product.img" class="" :src="product.img[0]" :alt="product.title">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      search: '',
      loading: true,
    }
  },
  computed: {
    ...mapGetters(['PRODUCTS']),
    filteredList() {
      return this.PRODUCTS.filter(product => {
        return product.title.toLowerCase().includes(this.search.toLowerCase()) ||
                product.categoryName.toLowerCase().includes(this.search.toLowerCase()) ||
                product.id.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  async mounted() {
    await this.$store.dispatch('FETCH_PRODUCTS')
    this.loading = false
  },

}
</script>

<style scoped lang='scss'>
.card {
  border: 1px solid black;
  padding: 5px;
  margin: 5px;
  max-width: 200px;
  overflow: hidden;
  transition: all .5s ease;

  & .text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &:hover {
    transition: all .5s ease;
    transform: translateY(-5px);
    box-shadow: 0 10px 10px  rgba(0,0,0,0.12), 5px 10px 10px rgba(0,0,0,0.24);
  }

}

</style>
