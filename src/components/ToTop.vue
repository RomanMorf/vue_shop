<template>
  <transition name="translate">
    <div class="totop" v-show="scY > 300">
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

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/variables';

.totop {
  position: fixed;
  bottom: 30px;
  right: 30px;

  &_btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    outline: inherit;
    border: none;
    transition: all 0.3s ease 0s;
    background-color: $bg_color_main;

    &:hover {
      background-color: #2EE59D;
      box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
      color: #fff;
      transform: translateY(-7px);
    }
  }
}
</style>
