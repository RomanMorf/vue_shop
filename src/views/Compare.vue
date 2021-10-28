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

<style scoped lang='scss'>
.btn {
  cursor: pointer;
}
table {
  margin: 0 auto;
  overflow-x: auto;
  white-space: nowrap;
}
tr {
  margin-bottom: 10px;
  white-space: break-spaces;
  td {
    padding: 10px;
    margin-right: 50px;
  }
  td:first-child {
    padding-right: 80px;
    font-weight: 700;
  }
}
tr {
  position: relative;
  background-color: rgba(194, 193, 193, 0.1);
  transition: all ease .5s
}
tr:nth-child(odd) {
  background-color: rgba(194, 193, 193, 0.25);
  transition: all ease .5s
}
tr:hover,
tr:nth-child(odd):hover {
  background-color: rgba(194, 193, 193, 0.55);
  transition: all ease .5s
}
img {
  max-width: 150px;
}

@media screen and (max-width: 900px){
  img {
    max-width: 100px;
  }
  tr {
    td:first-child {
      padding-right: 10px;
    }
  }
}

@media (max-width: 580px){
  tr {
    font-size: 12px;

    td {
      padding: 5px;
      font-size: 10px;
    }
    td:first-child {
      padding-right: 5px;
      font-weight: 700;
    }

  }
  img {
    max-width: 50px;
  }

}


</style>
