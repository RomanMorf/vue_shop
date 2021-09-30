<template>
  <div class="bar">
    <div class="bar_logo">
      LOGO
    </div>

    <div class="bar_categories">
      CATEGORIES
    </div>

    <div class="bar_buttons">
      <div class="bar_btn">
        <span class="material-icons-outlined md-40 btn">compare_arrows</span>
        <span class="bar_btn_number">0</span>
      </div>
      <div class="bar_btn" @click="showModalFavorite = !showModalFavorite">
        <span class="material-icons md-40 btn">favorite_border</span>
        <span class="bar_btn_number">{{ FAVORITE.length }}</span>
      </div>
      <div class="bar_btn" @click="showModal = !showModal">
        <span class="material-icons-outlined md-40 btn">shopping_bag</span>
        <span class="bar_btn_number">{{ BASKET.length }}</span>
      </div>
    </div>

    <Modal v-show="showModal" @close="closeModal">
      <template v-slot:header>
        <h3>Список товаров в корзине</h3>
      </template>

      <template  v-slot:content>
        <div class="content" v-for="product in BASKET" :key="product.id">
          <img v-if="product.img" :src="product.img[0]" alt="product.title" @click="goToProduct(product.id)">
          <div>
            <p>{{ product.title }} кол-во {{ product.count }}</p>
          </div>
          <button @click="deleteProductFromBasket(product.id)">
            <span class="material-icons-outlined md-40">delete</span>
          </button>
        </div>
        <div v-if="BASKET.length === 0">
          <p>Корзина пока пуста</p>
        </div>
      </template>
      
      <template v-if="BASKET.length > 0" v-slot:footer>
        <button>Продолжить покупки</button>
        <button>Оформить заказ</button>
        <button>Очистить корзину</button>
      </template>

    </Modal>

    <Modal v-show="showModalFavorite" @close="closeModalFavorite">
      <template v-slot:header>
        <h3>Список избранных товаров</h3>
      </template>

      <template  v-slot:content>
        <div class="content" v-for="product in FAVORITE" :key="product.id">
          <img v-if="product.img" :src="product.img[0]" alt="product.title" @click="goToProduct(product.id)">
          <div>
            <p>{{ product.title }}</p>
          </div>
          <button @click="deleteProductFromFavorite(product.id)">
            <span class="material-icons-outlined md-40">delete</span>
          </button>

        </div>

        <div v-if="FAVORITE.length === 0">
          <p>Списоку пуст</p>
        </div>
      </template>
    
    </Modal>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showModal: false,
      showModalFavorite: false,
    }
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
    closeModalFavorite() {
      this.showModalFavorite = false
    },
    deleteProductFromBasket(id) {
      this.$store.dispatch('DELETE_FROM_BASKET', id)
    },
    deleteProductFromFavorite(id) {
      this.$store.dispatch('FAVORITE_TOGGLE', id)
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`)
      this.closeModal()
      this.closeModalFavorite()
    }
  },
  computed: {
    ...mapGetters(['BASKET', 'FAVORITE']),
  },
}
</script>

<style scoped lang="scss">
.btn {
  cursor: pointer;
}
.content {
  min-width: 40vw;
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
  margin-bottom: 10px;

  & img {
    max-height: 100px;
    border-radius: 20px;
    margin-right: 15px;
  }
  & button {
    background-color: transparent;
    border: none;
    outline: none;
    margin-left: 15px;
    cursor: pointer;
  }
}

.bar {
  border-bottom: 1px solid rgba(146, 146, 146, 0.5);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &_buttons {
    width: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &_btn {
    width: 30px;
    height: 30px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &_number {
      position: absolute;
      min-width: 20px;
      min-height: 20px;
      padding: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      bottom: -15px;
      left: -10px;
      border-radius: 50%;
      background-color: rgb(230, 230, 230);
    }
  }
}
.material-icons.md-40 {
  font-size: 40px;
}
.material-icons-outlined.md-40 {
  font-size: 40px;
}
</style>
