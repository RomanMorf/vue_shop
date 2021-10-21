<template>
  <div class="top-bar">
    ADMIN PANEL
    <button class="top-bar_btn" @click="$router.push('/')">Назад в магазин</button>
  </div>
</template>

<script>

export default {

}
</script>

<style lang='scss'>
  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
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
