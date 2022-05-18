<template>
  <swiper :options="swiperOptions">
    <swiper-slide v-for="(item, index) in itemData" :key="index" class="slide_body unselectable">
      <img class="slide_img" :src="item.img" :alt="item.btnTitle" >
      <div class="slide_promo">
        <h2 class="slide_title">{{ item.title }}</h2>
        <p class="slide_text">{{ item.text }}</p>
        <a class="slide_btn " @click.prevent="$router.push(item.btnUrl)">{{ item.btnTitle }}</a>
      </div>
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
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
.slide {
  &_body {
    position: relative;
    width: 100%;
  }

  &_img {
    max-width: 1500px;
    min-height: 300px;
    max-height: 70vh;
  }

  &_promo {
    position: absolute;
    top: 15%;
    left: 50%;
    background-color: rgb(255 255 255 / 70%);
    border-radius: 5px;
    padding: 5px;
  }

  &_btn {
    margin-top: 20px;
    display: inline-block;
    padding-bottom: 5px;
    border-bottom: 2px solid rgb(224, 146, 132);
    transition: all ease .5s;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      color: rgb(197, 109, 94);
      transition: all ease .5s;
    }
  }

  &_title {
    margin: 0;
    font-size: 40px;
  }

  &_text {
    margin: 20px 0;
    padding: 0 10px 0 0;
    font-size: 20px;
  }
}

@media (max-width: 800px) {
  .slide {
    &_text {
      display: none;
    }
    &_promo {
      position: absolute;
      top: 25%;
      left: 40%;
    }
    &_img {
      max-height: 50vh;
    }
  }
}
@media screen and (max-width: 580px) {
  .slide {
    &_body {
      p {
        display: none;
      }
    }
    &_promo {
      position: absolute;
      top: 25%;
      left: 20%;
    }
    &_img {
      max-height: 40vh;
    }
    &_text {
      font-size: 15px;
    }
    &_btn {
      font-size: 20px;
    }

  }
}

</style>
