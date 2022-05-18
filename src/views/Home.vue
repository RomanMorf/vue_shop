<template>
  <div class="home">
    <Loader v-if="isLoading"></Loader>

<!-- ====== SWIPE PROMO ====== -->
    <div class="section">
      <SwiperPromo  :itemData="carusel"/>
    </div>

<!-- ====== CATALOG BLOCK ====== -->
    <div class="section">

      <swiper :options="swiperOptionsCards">
        <swiper-slide v-for="(item, index) in PRODUCTS.slice(getRandomNum(1, 5), getRandomNum(10, PRODUCTS.length))" :key="index">
          <Card :product="item" />
        </swiper-slide>
        <div class="swiper-button-prev color" slot="button-prev"></div>
        <div class="swiper-button-next color" slot="button-next"></div>
      </swiper>
    </div>

<!-- ====== CATEGORY BLOCK ====== -->
    <div class="section mw700">
      <CategoryBlock v-for="(item, index) in categories.slice(1, 4)" :key="index" :data="item"></CategoryBlock>
    </div>

<!-- ====== 'WHY WE' BLOCK ====== -->
    <div class="section colum">
      <h2 class="title">ПОЧЕМУ НАС ВЫБИРАЮТ</h2>
      <div class="cards">
        <div class="card">
          <span class="material-icons-outlined md-48">ring_volume</span>
          <h3 class="card_title">САМАЯ ЛУЧШАЯ РАССЫЛКА</h3>
          <p class="card_description">Всё подскажем и расскажем. Звоните нам в любое время</p>
          <div class="btn bottom-swipe">
            <span class="btn_text">Подробнне</span>
          </div>
        </div>
        <div class="card">
          <span class="material-icons-outlined md-48">airport_shuttle</span>
          <h3 class="card_title">ДОСТАВКА БЫСТРАЯ КАК КОМЕТА</h3>
          <p class="card_description">Доставим в рекордное время</p>
          <div class="btn bottom-swipe">
            <span class="btn_text">Подробнне</span>
          </div>
        </div>
        <div class="card">
          <span class="material-icons-outlined md-48">accessibility_new</span>
          <h3 class="card_title">САМЫЕ ПОСЛЕДНИЕ НОВИНКИ</h3>
          <p class="card_description">Мы еще те модники. Одевайтесь с нами</p>
          <div class="btn bottom-swipe">
            <span class="btn_text">Подробнне</span>
          </div>
        </div>
        <div class="card">
          <span class="material-icons-outlined md-48">account_balance_wallet</span>
          <h3 class="card_title">УДОБНЫЕ СПОСОБЫ ОПЛАТЫ</h3>
          <p class="card_description">Твои кроссы долетят даже до Антарктиды</p>
          <div class="btn bottom-swipe">
            <span class="btn_text">Подробнне</span>
          </div>
          <span></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CategoryBlock from '@/components/CategoryBlock/CategoryBlock.vue'
import CatalogBlock from '@/components/CatalogBlock/CatalogBlock.vue'

import SwiperPromo from '@/components/Swiper/SwiperPromo.vue'

import Card from '@/components/Catalog/Card'

import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      isLoading: false,
      timer: null,
      categories: [],
      carusel:[
        { img:'https://www.helitaly.com/wp-content/uploads/fashion-week-milano-2020-1440x740.jpg',
          title: 'Title for post',
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere minima aspernatur ducimus suscipit nesciunt laborum consequuntur repudiandae nemo? Doloremque nulla totam iusto corrupti voluptas adipisci sunt consequuntur, et inventore vero!',
          btnTitle: 'В каталог',
          btnUrl: '/catalog',
        },
        { img:'https://images3.alphacoders.com/274/thumb-1920-274899.jpg',
          title: 'Title for post',
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere minima aspernatur ducimus suscipit nesciunt laborum consequuntur repudiandae nemo? Doloremque nulla totam iusto corrupti voluptas adipisci sunt consequuntur, et inventore vero!',
          btnTitle: 'В каталог',
          btnUrl: '/catalog',
        },
        { img:'https://browsecat.net/sites/default/files/backgrounds-for-fashion-photography-126871-613871-7963742.png',
          title: 'Title for post',
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere minima aspernatur ducimus suscipit nesciunt laborum consequuntur repudiandae nemo? Doloremque nulla totam iusto corrupti voluptas adipisci sunt consequuntur, et inventore vero!',
          btnTitle: 'В каталог',
          btnUrl: '/catalog',
        },
      ],
      swiperOptionsCards : {
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: false,
        loop: true,
        breakpoints: {
          700: {
            slidesPerView: 2,
            spaceBetween: 2
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 10
          },
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },

      },
      dataForCatalogBlock: [
        { img: 'https://img.joomcdn.net/de0b6cef2a42d2cab9db6641426b3c26452ac793_original.jpeg',
          title: 'Туфли',
          text: 'Текст блока',
          btnTitle: 'Смотреть',
          btnUrl: '/catalog',
        },
        { img: 'https://images.ua.prom.st/2633525721_sapogi-zhenskie-belye.jpg',
          title: 'Туфли',
          text: 'Текст блока',
          btnTitle: 'Смотреть',
          btnUrl: '/catalog',
        },
        { img: 'https://ditto.ua/wa-data/public/shop/products/25/93/9325/images/45156/45156.1400.JPG',
          title: 'Туфли',
          text: 'Текст блока',
          btnTitle: 'Смотреть',
          btnUrl: '/catalog',
        },
      ]
    }
  },
  async mounted() {
    await this.$store.dispatch('FETCH_PRODUCTS')
    this.categories = await this.$store.dispatch('FETCH_CATEGORIES')
    window.addEventListener('resize', this.changeMaxSlidePerPage);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.changeMaxSlidePerPage);
  },
  methods: {
    getRandomNum(min = 5, max = 5) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    changeMaxSlidePerPage() {
      if (this.timer) return;
      this.timer = setTimeout(() => {
        if (window.innerWidth > 700 && window.innerWidth < 1000) {
          this.swiperOptions = {slidesPerView: 3}
          console.log(this.swiperOptions.slidesPerView, 'slidesPerView');
        }
        if (window.innerWidth > 300 && window.innerWidth < 700) {
          this.swiperOptions.slidesPerView = 2
          console.log(this.swiperOptions.slidesPerView, 'slidesPerView');
        }
        clearTimeout(this.timer);
        this.timer = null;
      }, 300);
    },
  },
  computed: {
    ...mapGetters(['PRODUCTS','CATEGORIES']),
  },
  components: {
    CategoryBlock,
    CatalogBlock,

    SwiperPromo,
    swiper,
    swiperSlide,
    Card,
  },
}


</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';

  .section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &.colum {
      flex-direction: column;
    }
  }

  .material-icons-outlined.md-48 {
    font-size: 48px;
  }

  .cards {
    display: flex;
    justify-content: space-between;
  }

  .card {
    width: 100%;
    margin: 10px;
    flex-direction: row;
  }
  .swiper-button-next.color,
  .swiper-button-prev.color {
    color: $bg_color_main;
  }

@media screen and (max-width: 700px) {
  .section.mw700 {
    flex-direction: column;
  }
  .cards {
    flex-direction: column;
  }
}
</style>
