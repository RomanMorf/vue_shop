<template>
  <swiper :options="swiperOptions">
    <swiper-slide>
      Slide 1
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
  name: 'HomePage',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOptions : {
        slidesPerView: 3,
        spaceBetween: 0,
        freeMode: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
      }
    }
  },

}

</script>

<style scoped>
.swiper-slide{
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.swiper-container {
  height : 600px;
  width : 100%;
}
</style>
