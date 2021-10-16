<template>
  <div class="carusel_wrapper" :style="{'width': + caruselWidth + 'px'}">
    <div 
      class="carusel"
      :style="{'margin-left': '-' + (100 * currentSlideIndex) + '%'}"
      :class="{transition: isTransition}"
    >
      <CaruselItem 
        v-for="(item, index) in caruselData" 
        :key="index"
        :itemData="item"
        :caruselWidth="caruselWidth"
        :caruselHeiht="caruselHeiht"
      />
    </div>
    <div v-show="caruselData.length > 1">
      <button v-show="isImageBtn" class="btn left" @click="prevSlide">Prev</button>
      <button v-show="isImageBtn" class="btn right" @click="nextSlide">Next</button>
      <div class="dotted_wrapper" :class="{black: dottegBg}" v-show="isDotteg && !isImages">
        <div class="dotted_item" 
          v-for="(item, index) in caruselData" 
          :key="index"
          :class="{active: (currentSlideIndex === index)}"
          @click="currentSlideIndex = index"
        ></div>
      </div>
      <div class="image_wrapper" :class="{black: imageBg}" v-show="isImages">
        <div class="image_item" 
          v-for="(item, index) in caruselData" 
          :key="index"
          :class="{active: (currentSlideIndex === index)}"
          :style="{
            'background-image': 'url(' + item + ')',
          }"          
          @click="currentSlideIndex = index"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import CaruselItem from '@/components/Carusel/Carusel-item.vue'

export default {
  name: 'carusel',
  data() {
    return {
      currentSlideIndex: 0,
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
  },
  props: {
    caruselData: { // массив картинок для карусели
      type: Array,
      default: () => []
    },
    caruselWidth: { // настроить ширину. Изначально 400рх
      type: Number,
      default: 400,
    },
    caruselHeiht: { // настроить высоту. Изначально 300рх
      type: Number,
      default: 300,
    },
    interval: { // включить интервал автоматического передистывания
      type: Number,
    },
    isImageBtn: { // показать кнопки на карусели
      type: Boolean,
      default: true,
    },
    isImages: { // показать кнопки "изображения" на карусели
      type: Boolean,
      default: false,
    },
    imageBg: { // показываеть затемнынный фон у кнопок "изображения"
      type: Boolean,
      default: true,
    },
    isDotteg: { // показывать кнопки "точки" картинок
      type: Boolean,
      default: true,
    },
    dottegBg: { // показываеть затемнынный фон у кнопок "точки"
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
  },
  components: {
    CaruselItem,
  }
}
</script>

<style scoped lang='scss'>
.carusel {
  display: flex;
  &.transition {
    transition: all ease 0.5s;
  }

  &_wrapper {
    overflow: hidden;
    position: relative;
  }
}

.btn {
  position: absolute;
  top: 50%;
  height: 50px;
  width: 50px;
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 50%;
  transition: all ease .5s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 5px rgba(0,0,0,0.24);
  z-index: 5;
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transition: all ease .5s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 15px rgba(0,0,0,0.24);
  }
  &.right {
    right: 10px;
  }
  &.left {
    left: 10px;
  }
}

.dotted {
  &_wrapper {
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.black {
      background-color: rgba(5, 5, 5, 0.37);
    }
  }

  &_item {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    margin-right: 5px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }
    &.active {
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
}

.image {
  &_wrapper {
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.black {
      background-color: rgba(5, 5, 5, 0.37);
    }
  }

  &_item {
    width: 40px;
    height: 40px;
    margin-right: 5px;
    opacity: 0.7;
    background-size: cover;
    transition: all ease .5s;
    border-radius: 10px;

    &:hover {
      opacity: 1;
      transition: all ease .5s;
    }

    &.active {
      opacity: 1;
      transition: all ease .5s;
    }
  }
}

</style> 