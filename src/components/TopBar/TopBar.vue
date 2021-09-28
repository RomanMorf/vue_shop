<template>
  <div class="bar">
    <div class="bar_logo">
      LOGO
    </div>
    
    <div class="bar_categories">
      CATEGORIES
    </div>

    <div class="bar_buttons">
      <div class="bar_btn">
        <span class="material-icons-outlined md-40">compare_arrows</span>
        <span class="bar_btn_number">0</span>
      </div>
      <div class="bar_btn">
        <span class="material-icons md-40">favorite_border</span>    
        <span class="bar_btn_number">1</span>
      </div>
      <div class="bar_btn">
        <span class="material-icons-outlined md-40 btn">shopping_bag</span>    
        <span class="bar_btn_number">0</span>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  
}
</script>

<style scoped lang='scss'>
.bar {
  border-bottom: 1px solid rgba(146, 146, 146, 0.5);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &_buttons{
    width: 150px;
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
      min-width: 20px;
      min-height: 20px;
      padding: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      bottom: -15px;
      left: -10px;
      border-radius: 50%;
      background-color: rgb(230, 230, 230);
    }
  }
}
.material-icons.md-40 {
  font-size: 40px;
}
.material-icons-outlined.md-40 {
    font-size: 40px;
}


</style> 