<template>
  <div class="top-bar">
    <span class="top-bar_greetings" v-if="INFO">Здравствуйте, {{ INFO.name }}</span>
    <button class="top-bar_btn modal_btn " @click="$router.push('/')">Назад в магазин</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'INFO',
    ]),
  },
}
</script>

<style lang='scss'>
@import '@/assets/scss/variables.scss';

  .top-bar {
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 20px;
    width: 100%;
    height: 50px;
    background-color: $bg_color_admin;
    z-index: 10;
    position: relative;

    &_btn {
      position: absolute;
      top: 10px;
      right: 50px;
    }
  }
</style>
