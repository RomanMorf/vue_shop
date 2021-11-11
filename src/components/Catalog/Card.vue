<template>
  <div class="card" @mouseover="flag = false" @mouseleave="flag = true" >
    <div class="card_favorite" @click="favoriteToggle(product)" :style="isFvorite"></div>
    <div class="card_compare" @click="compareToggle(product)"><span class="card_active" :style="inCompare"></span></div>

    <div class="card_body" @click="$router.push(`/product/${product.id}`)">
      <div class="card_img" :style="styleObject">
        <p v-if=" product.categoryName" class="card_category">{{ product.categoryName }}</p>
      </div>
      <div class="card_info">
        <h3 class="card_title">{{ product.title }}</h3>
        <p class="card_price">{{ product.price }} UAH</p>
      </div>
    </div>

    <div class="card_info" >
      <span class="card_busket" @click="addToBasket(product)">
        <span class="card_active" :style="inBasket"></span>
        Busket
      </span>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['product'],
  data() {
    return {
      // флаг для опеределния наведения мыши. используется для динамического изменения фона
      flag: true,

    }
  },
  methods: {
    addToBasket(id) {
      this.$store.dispatch('ADD_TO_BASKET', id)
    },
    favoriteToggle(id) {
      this.$store.dispatch('FAVORITE_TOGGLE', id)
    },
    compareToggle(id) {
      this.$store.dispatch('COMPARE_TOGGLE', id)
    },
  },
  computed: {
    styleObject() { // вычисляемое свойство
      if (this.product.img) { // если есть ссылки на изображения товара
        if (this.product.img.length >= 2) { // если 2 картинки и больше - используй две
          if (window.innerWidth > 600) { // если ширина жкрана меньше 600px - используй только одну
            return this.flag
              ? { backgroundImage: `url("${this.product.img[0]}")` }
              : { backgroundImage: `url("${this.product.img[1]}")` }
          } else {
            return { backgroundImage: `url("${this.product.img[0]}")` }
          }
        }

        if (this.product.img.length == 1) { // если 1 картинки - используй только одну
          return { backgroundImage: `url("${this.product.img[0]}")` }
        }

      }
      if (!this.product.img) { // если нет ссылок на изображения товара - используй пустую картинку
        return { backgroundImage: `url("https://i.stack.imgur.com/y9DpT.jpg")` }
      }
    },
    isFvorite() { // вычисляемое свойство
    const id = this.product.id
        const index = this.FAVORITE.findIndex((el) => el.id === id)
        if (index !== -1) {
          return { backgroundImage: `url("${require('@/assets/img/favorite_black_24dp.svg')}")` }
        }
    },
    inBasket() { // вычисляемое свойство
    const id = this.product.id
        const index = this.BASKET.findIndex((el) => el.id === id)
        if (index !== -1) {
          return { display: `block` }
        }
    },
    inCompare() { // вычисляемое свойство
    const id = this.product.id
        const index = this.COMPARE.findIndex((el) => el.id === id)
        if (index !== -1) {
          return { display: `block` }
        }
    },

    ...mapGetters(['BASKET', 'FAVORITE' , 'COMPARE']),
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

p {
  padding: 0;
  margin: 0;
}

.card {
  width: 250px;
  margin: 5px;
  min-height: 450px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: $box_shadow_main;
  }

  &_category {
    position: absolute;
    padding: 5px 10px;
    border-radius: 3px;
    background-color: #fff;
    top: 10px;
    left: 10px;
  }

  &_img {
    background-position: center;
    height: 350px;
    background-size: cover;
  }

  &_favorite {
    position: absolute;
    background-image: url(../../assets/img/favorite_border_black_24dp.svg);
    background-size: cover;
    height: 30px;
    width: 30px;
    right: 10px;
    top: 10px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
      transition: transform 0.3s ease-in;
    }
  }

  &_compare {
    position: absolute;
    background-image: url(../../assets/img/sync_alt_black_24dp.svg);
    background-size: cover;
    height: 30px;
    width: 30px;
    right: 10px;
    top: 50px;
    transition: all 0.3s ease-in;

    &:hover {
      transform: scale(1.2);
      transition: all 0.3s ease-in;
    }

    & .card_active{
      top: 15px;
      right: 0px;
      display: none;
    }
  }

  &_active {
    position: absolute;
    top: 0px;
    right: 0px;
    background-image: url('./../../assets/img/checked.png');
    background-size: cover;
    width: 15px;
    height: 15px;
  }

  &_info {
    padding: 10px;
  }

  &_price {
    font-weight: bold;
    margin-top: 15px;
  }

  &_busket {
    margin: 10px 0;
    font-weight: bold;
    transition: all 0.2s ease-in;
    position: relative;
    padding-bottom: 1px;
    margin-top: 10px 0;

    &::after {
      content: '';
      border-bottom: 2px solid black;
      position: absolute;
      height: 1px;
      width: 100%;
      bottom: 0px;
      left: 0;
    }

    &:hover {
      color: $hover_color_main;
      transition: all 0.2s ease-in;
      &::after {
        border-bottom: 2px solid $hover_color_main;
      }
    }

    & .card_active{
      top: -5px;
      right: -15px;
      display: none;
    }

  }
}
@media screen and (max-width: 580px) {
  .card {
    width: 150px;
    min-height: 250px;
    &_category {
      display: none;
    }
    &_img {
      height: 200px;
    }
    &_info {
      padding: 5px;
    }
    &_title {
      margin: 5px 0;
    }
    &_price {
      margin-top: 5px;
    }
  }
}

</style>
