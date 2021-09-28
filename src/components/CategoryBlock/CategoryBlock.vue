<template>
  <div class="category">
    <img src="https://static-sl.insales.ru/images/products/1/1891/300566371/large_13258025-1-black.jpeg" alt="">
    <h2 class="h2">Название категории</h2>
    <p>Текст блока на главной 1</p>
    <span>Смотреть</span>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="scss">
  .category {
  display: flex;
  flex-direction: column;
  background-color: blanchedalmond;
  border: 1px solid black;
  width: 32%;
  min-height: 250px;
  position: relative;
  
  &:hover {
      color: rgb(53, 43, 26);
      box-shadow: 0 14px 28px rgba(170, 47, 47, 0.363), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
  
  img {
    filter: alpha(Opacity=75); 
    opacity: 0.75; 
  }

  h2 {
    position: absolute;
    top: 20px;
    left: 30px;
  }

  p {
    position: absolute;
    top: 80px;
    left: 30px;
  }

  span {
    position: absolute;
    top: 110px;
    left: 30px;
    border-bottom: 1px solid #000;

  }
}
</style>
