<template>
  <swiper :options="swiperOptions">
    <swiper-slide v-for="(item, index) in itemData" :key="index" class="slide_body">
      <img class="slide_img" :src="item.img" alt="">
      <div class="slide_promo">
        <h2>{{ item.title }}</h2>
        <p>{{ item.text }}</p>
        <a class="slide_btn" @click.prevent="$router.push(item.btnUrl)">{{ item.btnTitle }}</a>
      </div>
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div> -->
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'SwiperPromo',
  props:['itemData'],
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOptions : {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // },
        pagination: {
          clickable: true,
          el: '.swiper-pagination',
        },
      }
    }
  },
}

</script>

<style scoped lang="scss">
h2 {
  margin: 0;
}
.slide {
  &_body {
    position: relative;
    p {
      margin: 20px 0;
      padding: 0 10px 0 0;
    }
  }
  &_img {
    max-width: 100%;
  }
  &_promo {
    position: absolute;
    top: 15%;
    left: 50%;
  }
  &_btn {
    margin-top: 20px;
    display: inline-block;
    padding-bottom: 5px;
    border-bottom: 2px solid rgb(224, 146, 132);
    transition: all ease .5s;

    &:hover {
      color: rgb(197, 109, 94);
      transition: all ease .5s;
    }
  }
}
@media (max-width: 800px) {
  .slide {
    &_body {
      p {
        display: none;
      }
    }
    &_promo {
      position: absolute;
      top: 15%;
      left: 40%;
    }
  }
}
</style>
