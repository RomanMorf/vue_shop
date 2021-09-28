<template>
  <div class="home">
    <h1 class="center">This is an home page</h1>
    <Loader></Loader>
    <div class="section">
      <CategoryBlock></CategoryBlock>
      <CategoryBlock></CategoryBlock>
      <CategoryBlock></CategoryBlock>
    </div>
  </div>
</template>

<script>
import CategoryBlock from '@/components/CategoryBlock/CategoryBlock.vue'
export default {
  name: 'Home',
  components: {
    CategoryBlock,
  }
}
</script>

<style scoped lang="scss">
  .section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

</style>
