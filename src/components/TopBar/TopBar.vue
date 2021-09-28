<template>
  <div class="bar">
    <div class="bar_logo">
      LOGO
    </div>
    <div class="bar_categories">
      CATEGORIIES
    </div>
    <div class="bar_buttons">
      <div class="bar_btn">
        <span class="material-icons-outlined md-50">
          compare_arrows
        </span>
        <span class="bar_btn_number">0</span>
      </div>
      <span class="material-icons md-50">
        favorite_border
      </span>      
      <span class="material-icons-outlined md-50 btn">
        shopping_bag
      </span>    
    </div>
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
  
  &_btn {
  width: 30px;
  height: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

    &_number {
      position: absolute;
      min-width: 10px;
      min-height: 10px;
      bottom: -5px;
      left: -5px;
    }
  }
}
.material-icons.md-50 {
  font-size: 50px;
}
.material-icons-outlined.md-50 {
    font-size: 50px;
}


</style> 