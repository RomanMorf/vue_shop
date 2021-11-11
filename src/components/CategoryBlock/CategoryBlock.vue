<template>
  <div class="category" :style="styleObject" @click.prevent="$router.push(`/catalog/${data.id}` || '/catalog')">
    <h2>{{ data.title }}</h2>
    <p>{{ data.description || 'описание категори' }} </p>
    <button @click.prevent="$router.push(`/catalog/${data.id}` || '/catalog')">{{ data.btnTitle || 'Подробнее' }}</button>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    isFvorite() {
      const id = this.product.id
        const index = this.FAVORITE.findIndex((el) => el.id === id)
        if (index !== -1) {
          return { backgroundImage: `url("${require('@/assets/img/favorite_black_24dp.svg')}")` }
        }
    },
    styleObject() {
      return `background-image: linear-gradient(rgba(255, 255, 255, 0.8) 0%, rgba(255, 247, 247, 0.3) 50%, rgba(255, 255, 255, 0.8) 100%), url('${this.data.img}')`
    },
  }
}
</script>

<style scoped lang="scss">
  @import 'CategoryBlock.scss';
</style>
