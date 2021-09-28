<template>
  <div class="bar">
    <div class="bar_logo">
      LOGO
    </div>
    <div class="bar_categories">
      CATEGORIIES
    </div>
    <div class="bar_buttons">
      <span class="material-icons-outlined">
        compare_arrows
        <span class="bar_buttons_number"></span>
      </span>
      <span class="material-icons-outlined">
        favorite_border
      </span>      
      <span class="material-icons-outlined">
        shopping_bag
      </span>    </div>
  </div>
</template>

<script>

export default {
  
}
</script>

<style scoped lang='scss'>
.bar {
  border-bottom: 1px solid rgba(128, 128, 128, 0.5);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &_buttons{
    width: 130px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

</style> 