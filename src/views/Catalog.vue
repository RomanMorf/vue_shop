<template>
  <div>
    <h1 class="center">This is an catalog page</h1>
    <div class="card">
      <div class="card-image"></div>
      <p class="card-description center">desription</p>
      <p class="card-price">В корзину</p>
      <div>
        <button class="basket"></button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Catalog',
  components: {
  }
}
</script>

<style lang="scss">
  .card {
    width: 250px;
    padding: 10px;
    height: 200px;
    border: 1px solid grey;
  }
</style>
