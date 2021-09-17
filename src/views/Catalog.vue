<template>
  <div>
    <h1 class="center">This is an catalog page</h1>
    <div class="card-wrapper">
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Catalog/Card'

export default {
  name: 'Catalog',
  components: {
    Card,
  }
}
</script>

<style lang="scss">
  .card-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
</style>