<template>
  <div class="bar">
    <div class="bar_logo">
      LOGO
    </div>

    <div class="bar_categories">
      CATEGORIES
    </div>

    <div class="bar_buttons">
      <div class="bar_btn" @click="$router.push('/compare/')">
        <span class="material-icons-outlined md-40 btn">compare_arrows</span>
        <span class="bar_btn_number">{{ COMPARE.length }}</span>
      </div>
      <div class="bar_btn" @click="showModalFavorite = !showModalFavorite">
        <span class="material-icons md-40 btn">favorite_border</span>
        <span class="bar_btn_number">{{ FAVORITE.length }}</span>
      </div>
      <div class="bar_btn" @click="showModalBasket = !showModalBasket">
        <span class="material-icons-outlined md-40 btn">shopping_bag</span>
        <span class="bar_btn_number">{{ BASKET.length }}</span>
      </div>
    </div>

    <Modal v-show="showModalBasket" @close="showModalBasket = !showModalBasket">
      <template v-slot:header>
        <h3>Список товаров в корзине</h3>
      </template>

      <template  v-slot:content>
        <div class="content" v-for="product in BASKET" :key="product.id">
          <img v-if="product.img" :src="product.img[0]" alt="product.title" @click="goToProduct(product.id)">
          <img v-if="!product.img" :src="'https://i.stack.imgur.com/y9DpT.jpg'" alt="product.title" @click="goToProduct(product.id)">
            <p class="text">{{ product.title }} </p>
            <p >{{ product.price }} UAH</p>
            <p class="unselectable">
              <span class="btn" @click="productDecrement(product.id)">-</span> 
                {{ product.count }} 
              <span class="btn" @click="productIncrement(product.id)">+</span>
            </p>
          <button class="unselectable" @click="confrimDelete(product)">
            <span class="material-icons-outlined md-30">delete</span>
          </button>
        </div>
        <div v-if="BASKET.length === 0">
          <p>Корзина пока пуста</p>
        </div>
      </template>
      
      <template v-if="BASKET.length > 0" v-slot:bottom>
          <p>Итого: {{ totalSum }} UAH</p>
      </template>

      <template v-if="BASKET.length > 0" v-slot:footer>
        <button>Продолжить покупки</button>
        <button>Оформить заказ</button>
        <button>Очистить корзину</button>
      </template>

    </Modal>

    <Modal v-show="showModalFavorite" @close="showModalFavorite = !showModalFavorite">
      <template v-slot:header>
        <h3>Список избранных товаров</h3>
      </template>

      <template  v-slot:content>
        <div class="content" v-for="product in FAVORITE" :key="product.id">
          <img v-if="product.img" :src="product.img[0]" alt="product.title" @click="goToProduct(product.id)">
            <p class="text">{{ product.title }}</p>
          <button @click="deleteProductFromFavorite(product.id)">
            <span class="material-icons-outlined md-30">delete</span>
          </button>

        </div>

        <div v-if="FAVORITE.length === 0">
          <p>Списоку пуст</p>
        </div>
      </template>
    
    </Modal>

    <Modal v-show="showModalConfirmDelete" @close="showModalConfirmDelete = !showModalConfirmDelete">
      <template v-slot:content>
        <h3 class="center">Вы уверенны,</h3>
        <p class="center"> что хотите удалить товар <span class="bold">{{ productNameForDelete }}</span> из корзины ?</p>
      </template>
      <template v-slot:footer>
        <button @click="deleteProductFromBasket(productIdForDelete)">Да</button>
        <button @click="showModalConfirmDelete = !showModalConfirmDelete">Отмена</button>
      </template>

    </Modal>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showModalBasket: false,
      showModalFavorite: false,
      showModalConfirmDelete: false,
      productNameForDelete: '',
      productIdForDelete: '',
    }
  },
  methods: {
    closeModalBasket() {
      this.showModalBasket = false
    },
    closeModalFavorite() {
      this.showModalFavorite = false
    },
    confrimDelete(product) {
      this.productNameForDelete = product.title
      this.productIdForDelete = product.id
      this.showModalConfirmDelete = true
    },
    deleteProductFromBasket(id) {
      this.$store.dispatch('DELETE_FROM_BASKET', id)
      this.showModalConfirmDelete = false
      this.productNameForDelete = ''
      this.productIdForDelete = ''
    },
    deleteProductFromFavorite(id) {
      this.$store.dispatch('FAVORITE_TOGGLE', id)
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`)
      this.closeModal()
      this.closeModalFavorite()
    },
    productIncrement(id) {
      this.$store.dispatch('BASKET_PRODUCT_INCREMENT', id)
    },
    productDecrement(id) {
      this.$store.dispatch('BASKET_PRODUCT_DECREMENT', id)
    }

  },
  computed: {
    ...mapGetters(['BASKET', 'FAVORITE', 'COMPARE']),
    totalSum() {
      let sum = 0
      this.BASKET.forEach(item => {
        sum += (+item.price * +item.count)
      })
      return sum
    }
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
    max-width: 100px;
    max-height: 200px;
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
  & .btn {
    margin: 0 10px;
  }
  & .text {
    width: 150px;
    margin-right: 20px;
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
.material-icons-outlined.md-30 {
  font-size: 30px;
}
</style>
