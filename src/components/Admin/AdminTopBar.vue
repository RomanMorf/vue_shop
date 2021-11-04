<template>
  <div class="top-bar">
    <span v-if="INFO">Здравствуйте, {{ INFO.name }}</span>
    <button class="top-bar_btn" @click="$router.push('/')">Назад в магазин</button>
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
  .top-bar {
    position: fixed;
    top: 0px;
    left: 0px;
    text-align: center;
    width: 100%;
    height: 50px;
    background-color: rgb(201, 201, 201);
    z-index: 10;
    position: relative;
    &_btn {
      position: absolute;
      top: 10px;
      right: 50px;
    }
  }
</style>
