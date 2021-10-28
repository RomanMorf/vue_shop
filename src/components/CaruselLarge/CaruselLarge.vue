<template>
<div class="carusel">
  <div class="carusel_wrapper" :style="{'max-height': + caruselHeiht + 'px', 'max-width': + computedWidth + 'px'}">
    <div
      class="carusel_body"
      :style="{'margin-left': '-' + (100 * currentSlideIndex) + '%'}"
      :class="{transition: isTransition}"
    >
      <CaruseLargelItem
        v-for="(item, index) in caruselData"
        :key="index"
        :itemData="item"
        :caruselWidth="computedWidth"
        :caruselHeiht="caruselHeiht"
      />
    </div>
  </div>
  <div v-show="caruselData.length > 1" class="dashed_wrapper" v-if="isDashed" :style="{'width': + computedWidth + 'px'}">
    <div class="dashed_item"
      v-for="(item, index) in caruselData"
      :key="index"
      :class="{active: (currentSlideIndex === index)}"
      @click="currentSlideIndex = index"
    ></div>
  </div>

</div>
</template>

<script>
import CaruseLargelItem from '@/components/CaruselLarge/CaruselLarge-item.vue'

export default {
  name: 'carusel-large',
  data() {
    return {
      currentSlideIndex: 0,
      sizeTimer: null,
      computedWidth: 0,
    }
  },
  methods: {
    prevSlide() { // предыдущий слайд
      if (this.currentSlideIndex > 0) this.currentSlideIndex--
    },
    nextSlide() { // следующий слайд
      if (this.currentSlideIndex === this.caruselData.length -1) {
        this.currentSlideIndex = 0
      } else {
        this.currentSlideIndex++
      }
    },

    handleResize() {
      if (this.sizeTimer) return;
      this.sizeTimer = setTimeout(() => {
        if (this.caruselWidth < window.innerWidth) {
          this.computedWidth = this.caruselWidth
        }

        if (this.caruselWidth > window.innerWidth) {
          this.computedWidth =  window.innerWidth
        }

        // console.log(this.computedWidth, 'this.computedWidth');

        clearTimeout(this.sizeTimer);
        this.sizeTimer = null;
      }, 100);
    },
  },

  props: {
    caruselData: { // массив картинок для карусели
      type: Array,
      default: () => []
    },
    caruselWidth: { // настроить ширину. Изначально 1100рх
      type: Number,
      default: 1100,
    },
    caruselHeiht: { // настроить высоту. Изначально 700рх
      type: Number,
      default: 700,
    },
    interval: { // включить интервал автоматического передистывания
      type: Number,
    },
    isDashed: { // показывать кнопки "точки" картинок
      type: Boolean,
      default: true,
    },
    isTransition: { // отключает плавный переход картинок
      type: Boolean,
      default: true,
    }
  },

  mounted() {
    if (this.interval > 0) {
      setInterval(() => {
        this.nextSlide()
      }, this.interval)
    }
    window.addEventListener('resize', this.handleResize);
    this.computedWidth = this.caruselWidth;
  },

  components: {
    CaruseLargelItem,
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },

}
</script>

<style scoped lang='scss'>
.carusel {
  position: relative;

  &_body {
    display: flex;
    position: relative;

    &.transition {
      transition: all ease 0.5s;
    }
  }

  &_wrapper {
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
  }
}

.dashed {
  &_wrapper {
    position: absolute;
    bottom: 30px;
    left: 0;
    width: 1100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }

  &_item {
    width: 50px;
    height: 5px;
    border-radius: 2px;
    background-color: rgba(197, 109, 94, 0.5);

    &:not(:last-child) {
      margin-right: 10px;
    }

    &.active {
      background-color: rgb(197, 109, 94);
    }
  }
}

</style>
