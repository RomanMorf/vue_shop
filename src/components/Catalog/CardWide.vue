<template>
  <div class="wide" @mouseover="flag = false" @mouseleave="flag = true" >
    <div class="wide_favorite" @click="favoriteToggle(product)" :style="isFvorite"></div>
    <div class="wide_compare" @click="compareToggle(product)"><span class="wide_active" :style="inCompare"></span></div>

      <div class="wide_img" :style="styleObject">
      </div>
      <div class="wide_info">
        <h3 class="wide_title">{{ product.title }}</h3>
        <div >
          <p class="wide_info_color">Colors</p>
          <span class="wide_info_btn white">First</span>
          <span class="wide_info_btn black">Second</span>
        </div>
        <p class="wide_info_price">{{ product.price }} UAH</p>
        <p v-if="product.categoryName" class="wide_category">{{ product.categoryName }}</p>
      </div>

      <div class="wide_busket" @click="addToBasket(product)">
        <span class="wide_active" :style="inBasket"></span>
        Busket
      </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['product'],
  data() {
    return {
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
          return this.flag
            ? { backgroundImage: `url("${this.product.img[0]}")` }
            : { backgroundImage: `url("${this.product.img[1]}")` }
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

.wide {
  margin: 10px 20px 10px 0;
  width: 100%;
  min-height: 100px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  display: flex;

  &:hover {
    box-shadow: 0 0 2px 3px $bg_color_main;
  }

  &_img {
    background-position: center;
    height: 200px;
    width: 150px;
    background-size: cover;
    background-repeat: no-repeat;
  }

  &_info {
    padding: 10px;

    &_color {
      font-weight: 300;
      font-size: 13px;
    }

    &_btn {
      border: 1px solid gray;
      margin-right: 5px;
      padding: 5px 10px;
      display: inline-block;
      border-radius: 3px;

      &.white {
        background-color: white;
        color: black;
      }

      &.black {
        background-color: black;
        color: white;
      }

      &.brown {
        background-color: rgb(131, 64, 1);
        color: black;
      }

      &:hover {
        box-shadow: 0 0 3px 5px $hover_color_main;
      }
    }

    &_price {
      font-weight: bold;
      margin-top: 15px;
    }
  }

  &_busket {
    border-bottom: 2px solid rgb(165, 165, 165);
    width: 50px;
    font-weight: bold;
    transition: all 0.2s ease-in;
    position: absolute;
    bottom: 20px;
    right: 20px;

    & .wide_active{
      top: -5px;
      right: -15px;
      display: none;
    }

    &:hover {
      color: $hover_color_main;
      transition: all 0.2s ease-in;
        border-bottom: 2px solid $hover_color_main;

    }
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

    & img {
      width: 100%;
    }

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

    & .wide_active{
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

}
</style>
