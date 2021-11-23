<template>
  <div >
    <Loader class="center" v-if="loading"/>
    <h2 v-if="COMPARE.length > 0" class="center">Таблица сравнения товаров</h2>

    <table v-if="COMPARE.length > 0">
      <tbody>
        <tr>
          <td>Товар</td>
          <td v-for="product in COMPARE" :key="product.id">{{ product.title }}</td>
        </tr>
        <tr>
          <td>Фото</td>
        <td v-for="product in COMPARE" :key="product.id" @click="$router.push(`/product/${product.id}`)">
          <img v-if="product.img" :src="product.img[0]" :alt="product.title">
          <img v-else src="https://i.stack.imgur.com/y9DpT.jpg" alt="product image">
        </td>
        </tr>
        <tr>
          <td>Цена</td>
          <td v-for="product in COMPARE" :key="product.id">{{ product.price }} грн.</td>
        </tr>
        <tr>
          <td>Категория</td>
          <td v-for="product in COMPARE" :key="product.id">
            {{ product.categoryName }}
          </td>
        </tr>
        <tr>
          <td></td>
          <td v-for="product in COMPARE" :key="product.id">
            <p class="btn" @click="deleteFromDavorite(product.id)">Удалить</p>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="center" v-else>
      <h3>Товаров для сравнения еще нет</h3>
      <h4>Перейдите в <span class="btn" @click="$router.push('/catalog/')">каталог</span> </h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: true
    }
  },
  methods: {
    deleteFromDavorite(id) {
      console.log(id, 'id')
      this.$store.dispatch('COMPARE_TOGGLE', id)
    }
  },

  async mounted() {
    this.loading = false
  },
  computed: {
    ...mapGetters(['BASKET', 'FAVORITE', 'COMPARE']),
  },

}
</script>

