<template>
  <div class="card" @mouseover="flag = false" @mouseleave="flag = true" >
    <div class="card_category_favorite" @click="addToFavorite(product.id)"></div>
    <div class="card_category_check"></div>

    <div class="card_body" @click="$router.push(`/product/${product.id}`)">
      <div class="card_img" :style="styleObject">
        <p class="card_category">{{ product.categoryName }}</p>
      </div>
      <div class="card_info">
        <h3 class="card_title">{{ product.title }}</h3>
        <div >
          <p class="card_info_color">Colors</p>
          <span class="card_info_btn white">First</span>
          <span class="card_info_btn black">Second</span>
        </div>
        <p class="card_info_price">{{ product.price }} UAH</p>
      </div>
    </div>

    <div class="card_info" >
      <div class="card_busket" @click="addToBasket(product.id)">Busket</div>
    </div> 

  </div>
</template>

<script>

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
      console.log(id, ' - добавлен в корзину');
    },
    addToFavorite(id) {
      console.log(id, ' - добавлен в список избранное');
    }
  },
  computed: {
    styleObject: function() { // вычисляемое свойство
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
  },
}
</script>

<style scoped lang="scss">
p {
  padding: 0;
  margin: 0;
}
.card {
  margin: 10px;
  width: 250px;
  min-height: 550px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 2px 3px rgba(206, 201, 201, 0.425);
  }
  &_category {
    position: absolute;
    padding: 5px 10px;
    border-radius: 3px;
    background-color: #fff;
    top: 10px;
    left: 10px;

    &_favorite {
      position: absolute;
      background-image: url(../../assets/favorite_border_black_24dp.svg);
      background-size: cover;
      height: 30px;
      width: 30px;
      right: 10px;
      top: 10px;
      transition: all 0.3s ease-in;

      &:hover {
        transform: scale(1.2);
        transition: all 0.3s ease-in;
      }
    }

    &_check {
      position: absolute;
      background-image: url(../../assets/sync_alt_black_24dp.svg);
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
    }
  }

  &_img {
    background-position: center;
    height: 350px;
    background-size: cover;
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
        box-shadow: 0 0 3px 5px rgba(206, 201, 201, 0.425);
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
    margin: 10px 0;
    font-weight: bold;
    transition: all 0.2s ease-in;

    &:hover {
      color: rgb(165, 165, 165);
      transition: all 0.2s ease-in;
    }
  }
}
</style>
