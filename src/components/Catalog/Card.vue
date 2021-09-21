<template>
  <div class="card">
    <div class="card-image"></div>
    <div class="card-button">
      <button class="card-button-favorites"></button>
      <button class="card-button-comparison"></button>
    </div>
    <div class="card-description">
      <p class="card-description-text">
        DEPP КОЖАНЫЕ ТУФЛИ НА ПЛОСКОЙ ПОДОШВЕ
      </p>
      <p class="card-discription-prise">
        5590 руб
      </p>
      <button class="card-description-busket">В КОРЗИНУ</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      cardItem: [
        {id: 1, name: 'title'}
      ]
    }
  },
}
</script>

<style scoped lang='scss'>
.btn {
  width: 100px;
  height: 100px;
  cursor: pointer;
  display: block;
}
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    border: 1px solid black;
    width: 250px;
    height: 300px;
    padding: 10px;
    margin-bottom: 10px;

    &-description{

      img {
        background-color: transparent;
      }
    }
    &-image{

    }
    &-button{
      
      &-favorites{
        background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Ei-heart.svg/1200px-Ei-heart.svg.png);
        width: 30px;
        height: 30px;
        background-size: cover;
        background-color: transparent;
        border: none;
      }
    }
  }
</style> 