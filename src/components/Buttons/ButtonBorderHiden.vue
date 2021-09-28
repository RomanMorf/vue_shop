<template>
    <div class="btn">
      <span class="btn_text">Смотреть</span>
    </div>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="scss">
  .btn {
  display: inline-block;
  overflow: hidden;
  position: relative;
  padding: 10px 0;

  &_text::after {
    content: "";
    border: 1px solid black;
    position: absolute;
    bottom: 5px;
    width: 100%;
    left: 0;
    transition: all 600ms ease;
    z-index: -1;
  }
  &_text:hover::after {
    left: 100px;
    transition: all 800ms ease;
  }
}  
</style>