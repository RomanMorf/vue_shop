<template>
  <transition name="translate">
    <div class="totop" v-show="scY > 300 ">
      <button class="totop_btn"  @click="toTop">To top</button>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'ToTop',
  props: ['scrollTop'],
  data() {
    return {
      scTimer: null,
      scY: 0,
      scX: 0,
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        this.scX = window.innerWidth;
        clearTimeout(this.scTimer);
        this.scTimer = null;
      }, 500);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  },

}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/variables';

.totop {
  position: fixed;
  bottom: 50px;
  right: 30px;
  z-index: 100;

  &_btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    outline: inherit;
    border: none;
    transition: all 0.3s ease 0s;
    background-color: $bg_color_main;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.4);

    &:hover {
      transition: all 0.3s ease 0s;
      background-color: $hover_color_third;
      box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
      color: #fff;
      transform: translateY(-7px);
    }
  }
}

@media screen and (max-width: 580px) {
  .totop {
    &_btn {
      &:hover {
        background-color: $bg_color_main;
        box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.4);
        color: #fff;
      }
    }
  }
}

</style>
