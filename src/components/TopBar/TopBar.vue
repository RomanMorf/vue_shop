<template>
  <div class="bar">
    <transition name="scale">

    <div class="breadcrumbs" v-if="$route.path !== '/'">

      <ul class="breadcrumbs_list">
        <transition-group name="scale" class="breadcrumbs_list">
        <li class="breadcrumbs_item" @click="$router.push('/')" :key="0">
          <span class="material-icons-outlined">home</span>
          <span class="material-icons-outlined breadcrumbs_arrow">chevron_right</span>
        </li>
        <li v-show="showCurrentPage" class="breadcrumbs_item" @click="$router.push('/catalog')" :key="1">
          {{currentPage}}
          <span v-if="showCategory" class="material-icons-outlined breadcrumbs_arrow_nex">chevron_right</span>
        </li>
        <li v-if="showCategory" class="breadcrumbs_item" @click="$router.push(`/catalog/${productCategoryId}`)" :key="2">
          {{productCategoryName}}
        </li>
      </transition-group>

      </ul>

    </div>
    </transition>

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
        <transition-group name="translate">
          <div class="content" v-for="product in BASKET" :key="product.id">
            <img v-if="product.img" :src="product.img[0]" alt="product.title" @click="goToProduct(product.id)">
            <img v-if="!product.img" :src="'https://i.stack.imgur.com/y9DpT.jpg'" alt="product.title" @click="goToProduct(product.id)">
              <p class="text">{{ product.title }} </p>
              <p >{{ product.price }} UAH</p>
              <p class="unselectable nowrap">
                <span class="btn" @click="productDecrement(product.id)">-</span>
                  {{ product.count }}
                <span class="btn" @click="productIncrement(product.id)">+</span>
              </p>
            <button class="unselectable" @click="confirmDelete(product)">
              <span class="material-icons-outlined md-30">delete</span>
            </button>
          </div>
        </transition-group>

        <div v-if="BASKET.length === 0">
          <p>Корзина пока пуста</p>
        </div>
      </template>

      <template v-if="BASKET.length > 0" v-slot:bottom>
          <p>Итого: {{ totalSum }} UAH</p>
      </template>

      <template v-if="BASKET.length > 0" v-slot:footer>
        <button class="modal_btn" @click="closeModalBasket">Продолжить покупки</button>
        <button class="modal_btn" @click="createNewOrder">Оформить заказ</button>
        <button class="modal_btn" @click="confirmClearBasket">Очистить корзину</button>
      </template>
    </Modal>

    <Modal v-show="showModalFavorite" @close="showModalFavorite = !showModalFavorite">
      <template v-slot:header>
        <h3>Список избранных товаров</h3>
      </template>

      <template  v-slot:content>
        <transition-group name="translate">
          <div class="content" v-for="product in FAVORITE" :key="product.id">
            <img v-if="product.img" :src="product.img[0]" alt="product.title" @click="goToProduct(product.id)">
              <p class="text">{{ product.title }}</p>
            <button @click="deleteProductFromFavorite(product.id)">
              <span class="material-icons-outlined md-30">delete</span>
            </button>
          </div>
        </transition-group>
        <div v-if="FAVORITE.length === 0">
          <p>Списоку пуст</p>
        </div>
      </template>

      <template v-if="FAVORITE.length > 0" v-slot:footer>
        <button class="modal_btn" @click="closeModalFavorite">Продолжить покупки</button>
        <button class="modal_btn" v-show="FAVORITE.length > 0" @click="addAllToBasket">Добавить в корзину</button>
      </template>

    </Modal>

    <Modal v-show="showModalConfirmDelete" @close="showModalConfirmDelete = !showModalConfirmDelete">
      <template v-slot:content>
        <h3 class="center">Вы уверенны,</h3>
        <p class="center"> что хотите удалить товар <span class="bold">{{ productNameForDelete }}</span> из корзины ?</p>
      </template>
      <template v-slot:footer>
        <button class="modal_btn" @click="deleteProductFromBasket(productIdForDelete)">Да</button>
        <button class="modal_btn" @click="showModalConfirmDelete = !showModalConfirmDelete">Отмена</button>
      </template>
    </Modal>

    <Modal v-show="showConfirmClearBasket" @close="showConfirmClearBasket = !showConfirmClearBasket">
      <template v-slot:content>
        <h3 class="center">Вы уверенны,</h3>
        <p class="center"> что хотите очистить корзину ?</p>
      </template>
      <template v-slot:footer>
        <button v-show="showConfirmClearBasket" class="modal_btn" @click="cleareBasket">Очистить корзину</button>
        <button v-show="showConfirmClearBasket" class="modal_btn" @click="showConfirmClearBasket = !showConfirmClearBasket">Отмена</button>
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
      showConfirmClearBasket: false,
      productNameForDelete: '',
      productIdForDelete: '',

      showCurrentPage: true,
      showCategory: false,
      productCategoryName: '',
      productCategoryId: '',
    }
  },
  methods: {
    closeModalBasket() {
      this.showModalBasket = false
    },
    closeModalFavorite() {
      this.showModalFavorite = false
    },
    confirmDelete(product) {
      this.productNameForDelete = product.title
      this.productIdForDelete = product.id
      this.showModalConfirmDelete = true
    },
    confirmClearBasket() {
      this.closeModalBasket()
      this.showConfirmClearBasket = true
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
    },
    cleareBasket() {
      this.$store.dispatch('CLEARE_BASKET')
      this.showConfirmClearBasket = false
    },
    addAllToBasket() {
      if (this.FAVORITE.length === 1) {
        this.$store.dispatch('ADD_TO_BASKET', this.FAVORITE[0])
        this.$store.dispatch('FAVORITE_CLEAR')
      }

      if (this.FAVORITE.length > 1) {
        this.FAVORITE.forEach(el => {
          this.$store.dispatch('ADD_TO_BASKET', el)
        })
        this.$store.dispatch('FAVORITE_CLEAR')
      }
    },
    createNewOrder() {
      this.$router.push('/order')
      this.closeModalBasket()
    }
  },
  computed: {
    ...mapGetters(['BASKET', 'FAVORITE', 'COMPARE', 'CURRENT_PRODUCT', 'GET_CATEGORIES']),
    totalSum() {
      let sum = 0
      this.BASKET.forEach(item => {
        sum += (+item.price * +item.count)
      })
      return sum
    },
    currentPage() {
      const routeName = this.$route.path.split('/')
      switch (routeName[1]) {
        case 'product':
          if (this.CURRENT_PRODUCT) {
            this.productCategoryId = this.CURRENT_PRODUCT.categoryId
            this.productCategoryName = this.CURRENT_PRODUCT.categoryName
            this.showCategory = true
          }
          return `Каталог`

        case 'catalog':
          if (routeName.length > 2) {
            this.$store.dispatch('FETCH_PRODUCTS')
            const id = this.$route.params.id
            const currentCategory = this.GET_CATEGORIES
            this.productCategoryId = this.CURRENT_PRODUCT.categoryId
            this.productCategoryName = this.CURRENT_PRODUCT.categoryName
            this.showCategory = true
          }
          if (routeName.length <= 2) {
            this.productCategoryId = ''
            this.productCategoryName = ''
            this.showCategory = false
          }
          return `Каталог`

        default:
          this.productCategoryId = ''
          this.productCategoryName = ''
          this.showCategory = false

          return this.$route.name
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.breadcrumbs {
  text-overflow: ellipsis;
  overflow: hidden;
  position: absolute;
  bottom: -45px;
  left: 0;

  &_list {
    display: flex;
    align-items: center;
    padding-left: 0;
  }

  &_item {
    cursor: pointer;
    transition: all .5s ease;
    margin-right: 30px;
    position: relative;

    &:hover {
      color: $hover_color_main;
      transition: all .5s ease;
    }
  }
  &_arrow {
    position: absolute;
    bottom: 3px;
    right: -24px;
  }
  &_arrow_nex {
    position: absolute;
    bottom: -3px;
    right: -24px;
  }

}

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
  border-bottom: 1px solid $bg_color_main;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

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
      background-color: $bg_color_main;
      box-shadow: $box-shadow_main;
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


@media (max-width: 580px){
  .material-icons.md-40 {
    font-size: 30px;
  }
  .material-icons-outlined.md-40 {
    font-size: 30px;
  }
  .material-icons-outlined.md-30 {
    font-size: 30px;
  }
  // .breadcrumbs {
  //   display: none;
  // }
  .bar {
    justify-content: space-around;
  }
  .bar_categories {
    display: none;
  }
  .bar_btn_number {
    bottom: -12px;
    left: 0px;
  }
  .content {
    & img {
      max-width: 50px;
    }
  }
}

</style>
