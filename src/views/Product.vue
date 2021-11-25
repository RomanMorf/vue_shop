<template>
  <div>
    <Loader class="center" v-if="loading"/>

    <div v-else>
      <h1 class="center">{{ product.title }}</h1>
      <div class="product_body">
        <Carusel
          v-show="product.img"
          :caruselData="product.img"
          :caruselWidth="350"
          :caruselHeiht="500"
          :isImages="true"
          class="inline"
        />

        <div class="product_description inline">
          <p v-if="product.id"><strong>Id:</strong> {{ product.id }}</p>
          <p v-if="product.categoryName"><strong>Категория:</strong> {{ product.categoryName }}</p>
          <p v-if="product.price"><strong>Цена:</strong> {{ product.price }} UAH</p>
          <p v-if="product.description"><strong>Описание:</strong></p>
          <div v-html="product.description"></div>
          <button class="modal_btn mt-20" :class="inBasket" @click="addToBasket">
            Добавить в корзину
            <span class="inBasket" :style="inBasket"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carusel from '@/components/Carusel/Carusel.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      id: null,
      product: null,
      loading: true,
    }
  },

  methods: {
    addToBasket() {
      const productForBasket = {
        ...this.product,
        id: this.id,
      }
      this.$store.dispatch('ADD_TO_BASKET', productForBasket)
    },
  },

  computed: {
    ...mapGetters(['BASKET', 'FAVORITE', 'COMPARE']),
    inBasket() {
      const id = this.id
        const index = this.BASKET.findIndex((el) => el.id === id)
        if (index !== -1) {
          return { display: `block` }
        }
    },
  },

  async mounted() {
    this.id = this.$route.params.id
    this.product = await this.$store.dispatch('FETCH_PRODUCT_BY_ID', this.id)
    this.loading = false
  },

  components: {
    Carusel,
  }

}
</script>

<style scoped lang='scss'>
.product {
  &_body {
    padding: 5px 10px;
  }
  &_description {
    margin-left: 20px;
    max-width: 50%;
    display: inline-block;

    & p {
      padding: 10px 0;
    }
  }
}
.inline {
  display: inline-block;
  text-align: top;
  vertical-align: top;
}
</style>
